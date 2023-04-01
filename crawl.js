const {JSDOM} = require('jsdom')

 async function crawlPage(baseURL,currentURL,pages){
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL)
    console.log(normalizedCurrentURL)
    if(pages[normalizedCurrentURL]>0){
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1

    console.log(`actively crawling ${currentURL}`)
    
    
    try{
        const resp = await fetch(currentURL)
        if(resp.status >399){
            console.log(`error in status code: ${resp.status}, on page: ${currentURL}`)
            return pages
        }
        const contentType = resp.headers.get('content-type')
        if(!contentType.includes('text/html')){
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`)
            return pages
        }

        const htmlBody = await resp.text()
        const nextURLs = getURLFromHTML(htmlBody, baseURL)
        for(const nextURL of nextURLs){
            pages = await crawlPage(baseURL,nextURL,pages)

        } 
    }catch(err){
        console.log(`error in fech: ${err.message}, on page: ${currentURL}`)
    }
    return pages

}

function getURLFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for( const linkElement of linkElements){
        // console.log(linkElement.href)
        if(linkElement.href.slice(0,1) === '/'){
            // relative
            try{
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            }catch(err){
                console.log(`error with relative url: ${err.message}`)
            }
            
        }else{
            // absolute        }
            try{
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            }catch(err){
                console.log(`error with absolute url: ${err.message}`)
            }
        }
    }
    return urls
}

function normalizeURL(urlString){

    const urlObj = new URL(urlString)
    const hostpath =  `${urlObj.host}${urlObj.pathname}`
    if(hostpath.length > 0 && hostpath.slice(-1)==='/'){
        return hostpath.slice(0,-1)
    }
    return hostpath
}

module.exports = {
    normalizeURL,
    getURLFromHTML,
    crawlPage
}
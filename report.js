function printReport(pages){
    console.log("=========")
    console.log("Report")
    console.log("=========")
    const sortedPages = sortPages(pages)
    for(const sortpage of sortedPages){
        const url = sortpage[0]
        const hits = sortpage[1]
        console.log(`Found ${hits} links to page: ${url}`) 
    }
}

function sortPages(pages){
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a,b)=>{
        aHits = a[1]
        bHits = b[1]
        return b[1]-a[1]
    })
    return pagesArr
}

module.exports = {
    sortPages,
    printReport
}
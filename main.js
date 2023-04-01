const urlObj = new URL("https://blog.boot.dev/path/")
console.log(urlObj.hostname)
console.log(urlObj.pathname)
hostpath =  `${urlObj.host}${urlObj.pathname}`
console.log(hostpath)
console.log(hostpath.slice(0,-1))
console.log(hostpath.slice(0,-2))
const { normalizeURL, getURLFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL,strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL,strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL,capitals', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL,strip http', () => {
    const input = 'http://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLFromHTML, absolute', () => {
    const inputHTMLBody =`
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
            Boot.dev.blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev/path/'

    const actual = getURLFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLFromHTML, relative', () => {
    const inputHTMLBody =`
    <html>
        <body>
            <a href="/path/">
            Boot.dev.blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'

    const actual = getURLFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLFromHTML, both', () => {
    const inputHTMLBody =`
    <html>
        <body>
            <a href="/path2/">
            Boot.dev.blog Path Two
            </a>
            <a href="https://blog.boot.dev/path1/">
            Boot.dev.blog Path One
            </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'

    const actual = getURLFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path2/","https://blog.boot.dev/path1/"]
    expect(actual).toEqual(expected)
})

test('getURLFromHTML, invalid', () => {
    const inputHTMLBody =`
    <html>
        <body>
            <a href="invalid">
            Invalid URL
            </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'

    const actual = getURLFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})
const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')

test('sortPages,2 pages', () => {
    const input = {
        'https://wangslane.dev/path':1,
        'https://wangslane.dev':3
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wangslane.dev', 3],
        ['https://wangslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})

test('sortPages,5 pages', () => {
    const input = {
        'https://wangslane.dev/path':1,
        'https://wangslane.dev':3,
        'https://wangslane.dev/path2':5,
        'https://wangslane.dev/path3':2,
        'https://wangslane.dev/path4':9
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wangslane.dev/path4', 9],
        ['https://wangslane.dev/path2', 5],
        ['https://wangslane.dev', 3],
        ['https://wangslane.dev/path3', 2],
        ['https://wangslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})
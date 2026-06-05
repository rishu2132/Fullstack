const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

    const listWithOneBlog = [
        {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
        }
    ]

    const bigList = [
        {
            "title": "the pyshocology of ",
            "author": "me",
            "url": "http://...",
            "likes": 45,
            "id": "6a21a0f7831440817769be52"
        },
        {
            "title": "atomic habits",
            "author": "james clear",
            "url": "http://atomichabits.jamesclear",
            "likes": 1019,
            "id": "6a22281d0b876f626d4012a1"
        },
        {
            "title": "atomic habits",
            "author": "james clear",
            "url": "http://atomichabits.jamesclear",
            "likes": 1019,
            "id": "6a223c14efdef79ca0ae8f11"
        }
    ]

    test('of empty list is zero', () => {
        const blogs = []

        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(bigList)
        assert.strictEqual(result, 2083)
    })
        
})
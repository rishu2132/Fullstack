const {test, describe , after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')


const api = supertest(app)

const initialBlogs = [
    {
        title: "end is a new start",
        author: "everyone",
        url: 'http1',
        likes: 108
    },
     {
        title: " a new start",
        author: "one",
        url: 'http2',
        likes: 112
    }
]

beforeEach(async () =>{
  await  Blog.deleteMany({})
  await  Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
    await api   
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('no of blogs returned' , async () => {
    const response = await api  
                        .get('/api/blogs')
                        .expect(200)
                        .expect('Content-Type',/application\/json/)

    assert.strictEqual(response.body.length , initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
})
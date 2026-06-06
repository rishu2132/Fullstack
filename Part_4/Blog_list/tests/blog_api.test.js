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

test('unique identitifier property of blog posts is Id', async () => {

    const response = await api.get('/api/blogs')
    assert(response.body[0].id)
    //assert.strictEqual(response.body[0]._id, undefined)
    
})

test('create a new blog post' , async () => {
    const newBlog = {
        title: 'a land of fools',
        author: 'welsing',
        url: 'no lnk',
        likes: 68
    }

    await api.post('/api/blogs')
             .send(newBlog)
             .expect(201)
             .expect('Content-Type', /application\/json/)

    const blogAtEnd = await api.get('/api/blogs')
    assert.strictEqual(blogAtEnd.body.length, initialBlogs.length + 1)

    const contents = blogAtEnd.body.map(b => b.title)
    assert(contents.includes('a land of fools'))

})

test('like property is missing from the blog', async () => {
     const newBlog = {
        title: 'a land of fools',
        author: 'welsing',
        url: 'no lnk',
    }

    const response = await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type',/application\/json/)

    assert.strictEqual(response.body.likes, 0)
})


after(async () => {
    await mongoose.connection.close()
})
const {test, describe , after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')




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

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({
        username: 'root',
        name: 'Superuser',
        passwordHash,
    })
    await user.save()
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

describe('creating a blog', () => {
    test('a valid blog can be added with a valid token', async () => {
    const loginResponse = await api
        .post('/api/login')
        .send({
            username: 'root',
            password: 'secret',
        })

    const token = loginResponse.body.token
    const blogsAtStart = await Blog.find({})
    const newBlog = {
        title: 'Testing JWT',
        author: 'Utkarsh',
        url: 'https://example.com',
        likes: 10,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length,blogsAtStart.length + 1)

})
    
    test('adding a blog fails with status code 401 if token is not provided', async () => {
        const newBlog = {
            title: 'Unauthorized Blog',
            author: 'Utkarsh',
            url: 'https://example.com',
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })

    test('like property is missing from the blog', async () => {
        const loginResponse = await api
            .post('/api/login')
            .send({
                username: 'root',
                password: 'secret',
        })

        const token = loginResponse.body.token
        const newBlog = {
            title: 'a land of fools',
            author: 'welsing',
            url: 'no lnk',
        }

        const response = await api
                    .post('/api/blogs')
                    .set('Authorization', `Bearer ${token}`)
                    .send(newBlog)
                    .expect(201)
                    .expect('Content-Type',/application\/json/)

        assert.strictEqual(response.body.likes, 0)
    })

    test('title is missing', async () => {
        const loginResponse = await api
            .post('/api/login')
            .send({
                username: 'root',
                password: 'secret',
        })

        const token = loginResponse.body.token
        const newBlog = {
            author: 'welsing',
            url: 'no lnk',
            likes: 9
        }

        await api.post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newBlog)
                .expect(400)

    })

    test('url is missing',async () => {
        const loginResponse = await api
            .post('/api/login')
            .send({
                username: 'root',
                password: 'secret',
        })

        const token = loginResponse.body.token
        const newBlog = {
            title: 'a land of fools',
            author: 'welsing',
            likes: 7,
        }

        await api.post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newBlog)
                .expect(400)
    })

})

test('a blog can be deleted', async () => {

    const blogAtStart = await api.get('/api/blogs')
    const blogToDelete = blogAtStart.body[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
            .expect(200)
    
    const blogAtEnd = await api.get('/api/blogs')
    assert.strictEqual(blogAtEnd.body.length , blogAtStart.body.length - 1)

    const ids = blogAtEnd.body.map(b => b.id)
    assert(!ids.includes(blogToDelete.id))
})

test.only('update only number of likes', async () => {
    const blogAtStart = await api.get('/api/blogs')
    const blogToUpdate = blogAtStart.body[0]
    const likesAtStart = blogToUpdate.likes
  
    blogToUpdate.likes = blogToUpdate.likes + 1

    const updatedBlog = await api.put(`/api/blogs/${blogToUpdate.id}`)
                                .send(blogToUpdate)
                                .expect(200)
                                .expect('Content-Type', /application\/json/)
    assert.strictEqual(updatedBlog.body.likes, likesAtStart + 1)
    assert.strictEqual(updatedBlog.body.id, blogToUpdate.id)        
})

after(async () => {
    await mongoose.connection.close()
})
const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/',async  (request,response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
    
})

blogRouter.post('/', async (request,response) => {
    const blog = new Blog(request.body)

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
    
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(200).end()
})

blogRouter.put('/:id', async (request, response) => {

    const newBlog = request.body
    const newLikes = newBlog.likes
    
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(404).json({ error: 'blog not found' })
    }
    blog.likes = newLikes
    
    const savedBlog = await blog.save()
    response.json(savedBlog)
})


module.exports = blogRouter
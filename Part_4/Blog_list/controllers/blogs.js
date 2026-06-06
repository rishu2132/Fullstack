const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/',async  (request,response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
    
})

blogRouter.post('/', (request,response) => {
    const blog = new Blog(request.body)

    blog.save().then((result) => {
        response.status(204).json(result)
    })
})


module.exports = blogRouter
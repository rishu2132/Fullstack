const blogRouter = require('express').Router()
const { request } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/',async  (request,response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    response.json(blogs)
    
})

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if( authorization && authorization.startsWith('Bearer ')){
        return authorization.replace('Bearer ','')
    }
    return null
}

blogRouter.post('/', async (request,response) => {
    const blog  = new Blog(request.body)
    const decodedToken = jwt.verify(getTokenFrom(request),process.env.SECRET)

    if(!decodedToken.id){
        return response.status(401).json({error : 'invalid token'})
    }

    const user = await User.findById(decodedToken.id)
    
    if(!user){
        return response.status(400).json({error: 'userId is missing or not valid'})
    }

    blog.user = user._id
   
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save() 
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
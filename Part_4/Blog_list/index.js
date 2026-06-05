require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
console.log('connecting to database')

const MongoURL = process.env.MongoURL

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})

const Blog = mongoose.model('Blog',blogSchema)

mongoose.connect(MongoURL,{family:4})
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => console.log(error.message))


app.use(express.static('dist'))
app.use(express.json())

app.get('/api/blogs', (request,response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs)
    })
})

app.post('/api/blogs', (request,response) => {
    const blog = new Blog(request.body)

    blog.save().then((result) => {
        response.status(204).json(result)
    })
})




const PORT = process.env.PORT

app.listen(PORT , () => {
    console.log(`Server is running on PORT ${PORT}`)
})
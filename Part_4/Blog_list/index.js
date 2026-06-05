const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const app = express()
console.log('connecting to database')


mongoose.connect(config.MongoURL,{family:4})
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



app.listen(config.PORT , () => {
    console.log(`Server is running on PORT ${config.PORT}`)
})
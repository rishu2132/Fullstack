const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const logger = require('./utils/logger')

const app = express()
console.log('connecting to database')


mongoose.connect(config.MongoURL,{family:4})
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch(error => logger.error(error.message))


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
    logger.info(`Server is running on PORT ${config.PORT}`)
})
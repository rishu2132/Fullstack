const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')

const app = express()
console.log('connecting to database')


mongoose.connect(config.MongoURL,{family:4})
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch(error => logger.error(error.message))


app.use(express.static('dist'))
app.use(express.json())


app.use('/api/blogs',blogRouter)


app.listen(config.PORT , () => {
    logger.info(`Server is running on PORT ${config.PORT}`)
})
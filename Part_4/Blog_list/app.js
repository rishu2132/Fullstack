const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()
logger.info('connecting to database')

mongoose.connect(config.MONGODB_URI,{family:4})
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch(error => logger.error('error connecting to database',error.message))


app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/login',loginRouter)
app.use('/api/users',usersRouter)
app.use('/api/blogs',blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
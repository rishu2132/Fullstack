require('dotenv').config()

const MongoURL = process.env.MongoURL
const PORT = process.env.PORT

module.exports = {PORT , MongoURL}
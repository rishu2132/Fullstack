const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to ', url)


mongoose.set('strictQuery',false)
mongoose.connect(url,{family:4})
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch(error =>{
        console.log('error connecting to MongoDB',error.message)
    })

const numberSchema = new mongoose.Schema({
    name:{
        type: String,
        minLength: 3,
        required: true
    },
    number:String,
})

numberSchema.set('toJSON',{
    transform:(document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('PhoneNumber',numberSchema)
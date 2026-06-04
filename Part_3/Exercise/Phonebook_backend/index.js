require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const PhoneNumber = require('./models/person')

const app = express()


app.use(express.static('dist'))

morgan.token('content',(req) => {

  if (req.body){
    const content = {
      name:req.body.name,
      number:req.body.number
    }

    return JSON.stringify(content)
  }

})

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.content(req,res)
  ].join(' ')
}))

app.get('/',(req,res) => {
  res.send('hello world')
})

app.use(express.json())


app.get('/api/persons',(request, response ,next ) => {
  PhoneNumber.find({})
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

app.get('/info', (request,response,next) => {
  let personCount = 0
  const date = new Date().toString()
  PhoneNumber.find({})
    .then(persons => {
      persons.forEach(() => {
        personCount = personCount + 1
      })
      response.send(`<p>Phonebook has info for ${personCount} people. </p><p>${date}</p>`)
    })
    .catch(error => next(error))


})

app.get('/api/persons/:id', (request,response,next) => {
  PhoneNumber.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id',( request,response , next) => {
  PhoneNumber.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))

})

// ? put

app.put('/api/persons/:id',(request,response,next) => {
  const { name , number } = request.body

  PhoneNumber.findById(request.params.id)
    .then(person => {
      if(!person){
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then(updatedPerson => {response.json(updatedPerson)})
    })
    .catch(error => next(error))
})

// # post

app.post('/api/persons',(request, response ,next)  => {
  const body = request.body


  const person = new PhoneNumber({
    name:body.name,
    number:body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))

  // const nameExists = persons.some(p => p.name === body.name)

  // if (nameExists){
  //     return response.status(400).json({
  //         error: 'name already exists'
  //     })
  // }
})

const unknownEndpoint = (request,response) => {
  response.status(404).send({ error : 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({ error: 'misformatted id' })
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

app.use(errorHandler)
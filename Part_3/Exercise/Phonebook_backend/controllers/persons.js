const personRouter = require('express').Router()
const PhoneNumber = require('../models/person')


personRouter.get('/',(request, response ,next ) => {
  PhoneNumber.find({})
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

personRouter.get('/info', (request,response,next) => {
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

personRouter.get('/:id', (request,response,next) => {
  PhoneNumber.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})

personRouter.delete('/:id',( request,response , next) => {
  PhoneNumber.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))

})

// ? put

personRouter.put('/:id',(request,response,next) => {
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

personRouter.post('/',(request, response ,next)  => {
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
})

module.exports = personRouter
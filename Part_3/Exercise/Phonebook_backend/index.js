const express = require('express')
const morgan = require('morgan')

const app = express()

morgan.token('content',(req,res)=> {

    if (req.body){
         const content = {
            name:req.body.name,
            number:req.body.number
        }
    
         return JSON.stringify(content)
    }
   
})

app.use(morgan((tokens, req, res)=> {
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

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]



app.get('/api/persons',(request, response ) => {
    response.json(persons)
})

app.get('/info', (request,response) => {
    const personCount = persons.length 
    const date = new Date().toString()
    response.send(`<p>Phonebook has info for ${personCount} people. </p><p>${date}</p>`)
})

app.get('/api/persons/:id', (request,response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
    }else{
        response.statusMessage="content not found"
        response.status(404).end()
    }
})

app.delete('/api/persons/:id',( request,response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

// # post

app.post('/api/persons',(request, response) => {
    const id = Math.floor(Math.random()*10000)
    const body = request.body

    const person = {
        id:id,
        name:body.name,
        number:body.number
    }

    const nameExists = persons.some(p => p.name === body.name)

    if (nameExists){
        return response.status(400).json({
            error: 'name already exists'
        })
    }

    

    if (!body.name){
        return response.status(404).json({
            error: 'name is missing'
        })
    }else if (!body.number){
        return response.status(404).json({
            error: 'number is missing'
        })
    }

    persons = persons.concat(person)
    response.json(persons)
    
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
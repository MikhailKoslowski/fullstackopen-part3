// first load dotenv to get all envvars.
require('dotenv').config()

// load express and create app
const express = require('express')
const app = express()

// Handle CORS
const cors = require('cors')
app.use(cors())

// use morgan logger with custom function
// sample for POST
// POST /api/persons 200 61 - 4.869 ms {"name":"Mikhail", "number":"12345"}
const morgan = require('morgan')
const customLogger = (tokens, request, response) => {
    return [
        tokens.method(request, response),
        tokens.url(request, response),
        tokens.status(request, response),
        tokens.res(request, response, 'content-length'), '-',
        tokens['response-time'](request, response), 'ms',
        JSON.stringify(request.body)
    ].join(' ')
}
app.use(morgan(customLogger))

// json parser to ease data access on POST requestuests.
app.use(express.json())

// handle static pages.
app.use(express.static('build'))

// mongoose model
const Person = require('./models/person')

// Info
app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        response.send(
            `<p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>`
        )
    })
})

// retrieve all
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

// add new person
/*
const generateId = () => {
    let id = Math.floor(persons.length*2*Math.random())
    while ( persons.find(p => p.id === id) ) {
        console.log(`id ${id} already exists, generating another one..`)
        id = Math.floor(persons.length*2*Math.random())
    }
    return id
}
*/
app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
    const person = Person({
        name: body.name,
        number: body.number,
    })

    // Errors if name or number are missing.
    if (!person.name) {
        return response.status(400).json({error: "Name is missing"})
    }
    if (!person.number) {
        return response.status(400).json({error: "Number is missing"})        
    }

    // Error if name already exists.
    /*
    if (persons.find(p => p.name === person.name)) {
        return response.status(400).json({error: "Name already exists"})
    }
    */

    person.save().then( result => {
            response.json(person)
    })
})

// retrieve single id
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// delete single id
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})


// Define port to list and start listening
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)  
})
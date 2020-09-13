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
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const p = {
        name: request.body.name,
        number: request.body.number
    }
    Person.findByIdAndUpdate(request.params.id, p, { new: true }).then(person => {
        console.log(person)
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

// delete single id
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id).then(person => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

// default handler for unknown endpoints
const unknownEndpoint = (request, response, next) => {
    console.log('unknownEndpoint')
    console.log(request.path)
    response.status(404).send({error:'unknown endpoint'})
}
app.use(unknownEndpoint)

// default error handler
const errorHandler = (error, request, response, next) => {
    console.log(error.message)
    // this error can be thrown when looking up db with an incompatible id.
    if(error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }
    next(error)
}
app.use(errorHandler)
// Define port to list and start listening
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)  
})
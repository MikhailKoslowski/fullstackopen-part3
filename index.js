const express = require('express')
const app = express()

// json parser to ease data access on POST requestuests.
app.use(express.json())

// Hardcoded persons for testing purpose.
let persons = [
        {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
        },
        {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
        },
        {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
        },
        {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
        }
    ]

// Root
app.get('/', (request, response) => {
    response.send('<h1>Persons API at /api/persons</h1>')
})

// Info
app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>`
    )
})

// retrieve all
app.get('/api/persons', (request, response) => {
    response.json(persons)
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

// Define port to list and start listening
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)  
})
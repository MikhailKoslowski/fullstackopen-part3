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

// add new person
const generateId = () => {
    let id = Math.floor(persons.length*2*Math.random())
    while ( persons.find(p => p.id === id) ) {
        console.log(`id ${id} already exists, generating another one..`)
        id = Math.floor(persons.length*2*Math.random())
    }
    return id
}
app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
        date: new Date()
    }
    persons = persons.concat(person)
    response.json(person)
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
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)  
})
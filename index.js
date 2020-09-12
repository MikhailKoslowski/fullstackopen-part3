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
app.get('/', (request, reponse) => {
    reponse.send('<h1>Persons API at /api/persons</h1>')
})

// retrieve all
app.get('/api/persons', (request, reponse) => {
    reponse.json(persons)
})

// Define port to list and start listening
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)  
})
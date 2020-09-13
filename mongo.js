const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const dbname = 'phonebook'
const url = `mongodb+srv://fullstackopen:${password}@cluster0.tmiyy.gcp.mongodb.net/${dbname}?retryWrites=true&w=majority`

const name = process.argv[3]
const number = process.argv[4]

// Init Mongoose
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)


// if name and number were provided, save new person.
if (name && number) {
    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)    
        mongoose.connection.close()
    })
} 
// otherwise, retrieve all entries
else {
    Person.find({}).then( result => {
        console.log('phonebook:')
        result.forEach( r => {
            console.log(`${r.name} ${r.number}`)
        })
        mongoose.connection.close()
    })
}

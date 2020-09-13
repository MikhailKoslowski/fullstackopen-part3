const mongoose = require('mongoose')

// defined as an env var and loaded with dotenv
const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`)

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(result => {
        console.log(`connected to MongoDB`)
    })
    .catch(error => {
        console.log(`error connecting to MongoDB: ${error}`)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

// intercepts data when generating json to remove _id and __v
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
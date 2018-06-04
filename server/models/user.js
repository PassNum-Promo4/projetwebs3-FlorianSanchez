const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {type: String, required: [true, "Veuillez rentrer vote e-mail"], match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "E-mail non valide"]},
    password: String,
    playercard: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'infoplayers'
    }
})

module.exports = mongoose.model('user', userSchema, 'users')
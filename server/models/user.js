const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: String,
    password: String,
    playercard: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'infoplayers'
    }
})

module.exports = mongoose.model('user', userSchema, 'users')
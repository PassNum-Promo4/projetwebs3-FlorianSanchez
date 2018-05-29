const mongoose = require('mongoose')

const Schema = mongoose.Schema
const playerSchema = new Schema({
    pseudo: String,
    rank: String,
    language: String,
    ratio: String,
    creator: String
})

module.exports = mongoose.model('infoplayers', playerSchema);
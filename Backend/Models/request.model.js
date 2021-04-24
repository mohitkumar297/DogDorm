const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    sitter:String,
    user:String,
    charges:String,
    dateBooked:String,
    fullName:String,
    numberOfDays:String,
    message:String,
    profileImage: { data: Buffer, contentType: String },
})

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
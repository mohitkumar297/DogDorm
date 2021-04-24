const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    username: String,
    sitter: String,

    messages: [
        {
            sender:String,
            messageBody: String,
            timestamp: Number
        }],

})

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
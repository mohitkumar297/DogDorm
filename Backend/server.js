const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }));

app.use(session({
    secret: 'Dogdorm secret',
    resave: false,
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())


mongoose.connect('mongodb+srv://mohitkumar297:arshawin@cluster0.s8jmq.mongodb.net/dogdormDB',{useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./Routes/users');
app.use('/users', usersRouter);

const sittersRoute = require('./Routes/sitters')
app.use('/sitters', sittersRoute)

const requestRoute = require('./Routes/requests')
app.use('/request', requestRoute)

const chatRoute = require('./Routes/chats')
app.use('/chat', chatRoute)

app.get('/', (req, res)=>{
    res.send('dogdorm')
})

app.listen(3000, function(){
    console.log('Server started at 3000');
})
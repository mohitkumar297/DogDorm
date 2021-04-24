const router = require('express').Router();
let Request = require('../Models/request.model');
let Chat = require('../Models/chat.model')

router.route('/getRequests').post((req,res)=>{
    Request.find({user:req.body.username}, function(err, docs){
        if(err){
            console.log(err);
        }else{
            res.json(docs)
        }
    })
})

router.route('/getRequestsToSitters').post((req,res)=>{
    console.log('received');
    Request.find({sitter:req.body.sitter}, function(err, docs){
        if(err){
            console.log(err);
        }else{
            res.json(docs)
        }
    })
})


const initiateChat = (username, sitter, message) =>{
const newChat = new Chat({
    username:username,
    sitter:sitter,
    messages:[{
        sender:username,
        messageBody:message,
        timestamp:new Date().getTime() / 1000
    }]
})
newChat.save()
        .then(() => {    
            console.log('Message started')
        })
        .catch(err => res.status(400).json('Error: ' + err));


}


router.route('/addRequest').post((req, res) =>{
    const newRequest = new Request({
        sitter:req.body.sitter,
        user:req.body.username,
        charges:req.body.charges,
        dateBooked:req.body.dateBooked,
        message:req.body.message,
        fullName:req.body.fullName,
        numberOfDays:req.body.numberOfDays,
        profileImage:req.body.profileImage
    })
    console.log(newRequest);

    newRequest.save()
        .then(() => {    
            initiateChat(req.body.username, req.body.sitter, req.body.message)
            res.json('Request added!')
        })
        .catch(err => res.status(400).json('Error: ' + err));





})

module.exports = router
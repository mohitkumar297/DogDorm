const router = require('express').Router();
let Chat = require('../Models/chat.model')

router.route('/getMessages').post((req, res) => {

    Chat.find({ username: req.body.username, sitter: req.body.sitter }, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.json(docs)
        }
    })
})

router.route('/getMessagesForSitter').post((req, res) => {

    Chat.find({ sitter: req.body.sitter, sitter: req.body.sitter }, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.json(docs)
        }
    })
})

router.route('/addMessage').post((req, res) => {
    
    Chat.findOne({ username: req.body.sender, sitter: req.body.receiver }, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            Chat.findByIdAndUpdate(
                docs._id,
                {$push: {"messages": {messageBody: req.body.message, timestamp: new Date().getTime() / 1000, sender:req.body.sender}}},
                {useFindAndModify:false},
                function(err, doc) {
                    if(err){
                    console.log(err);
                    }else{
                        Chat.find({ username: req.body.sender, sitter: req.body.receiver }, function (err, docs) {
                            if (err) {
                                console.log(err);
                            } else {
                                res.json(docs)
                            }
                        })
                    }
                }
            );
        }
    })
})
router.route('/addMessageSitter').post((req, res) => {
    
    Chat.findOne({ username: req.body.receiver, sitter: req.body.sender }, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            Chat.findByIdAndUpdate(
                docs._id,
                {$push: {"messages": {messageBody: req.body.message, timestamp: new Date().getTime() / 1000, sender:req.body.sender}}},
                {useFindAndModify:false},
                function(err, doc) {
                    if(err){
                    console.log(err);
                    }else{
                        Chat.find({ username: req.body.receiver, sitter: req.body.sender }, function (err, docs) {
                            if (err) {
                                console.log(err);
                            } else {
                                res.json(docs)
                            }
                        })
                    }
                }
            );
        }
    })
})

module.exports = router
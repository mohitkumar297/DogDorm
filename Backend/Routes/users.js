const router = require('express').Router();
const passport = require('passport');
let User = require('../Models/users.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json("mohit"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/checkIfAuthenticated').get((req,res) =>{
    if(req.isAuthenticated()){
        res.json(req.user.username)
    }else{
        res.json('No')
    }
})

router.route('/login').post((req,res) =>{
    console.log(req.body);
    const user = new User({
        username:req.body.username,
        password:req.body.password
    })
    req.login(user, function(err) {
        console.log('1');
        if(err){
            console.log('2');
            console.log(err);
        }else{
            passport.authenticate('local')(req, res, function () {
                res.json('Success')
            })
        }
    })
})

router.route('/logout').get((req, res) =>{
    req.logout()
    res.json('Logged Out Successfully')
})

router.route('/register').post((req, res) => {

    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            res.json(err)
        } else {
            passport.authenticate('local')(req, res, function () {
                res.json('Success')
            })
        }
    })
});

module.exports = router;
const router = require('express').Router();
let Sitter = require('../Models/sitters.model');
const multer = require('multer');
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    limits: { fieldSize: 25 * 1024 * 1024 },
    storage: storage
}).single('fileData')



router.route('/').get((req, res) => {
    Sitter.find()
        .then(sitters => res.json(sitters))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post( (req, res) => {
     upload(req, res, (err) => {
        if (err) {
            console.log("the error is" + err);
        } else {
            console.log(req.file);
            console.log(__dirname,'../');
    const username = req.body.username;
    const password = req.body.password;
    const newSitter = new Sitter({ 
        fullName:req.body.fullName,
        username:username,
        password:password,
        preferenceOfDogs:req.body.preferenceOfDogs,
        experience:req.body.experience,
        reviews:[{
            reviews:req.body.review,
            user:req.body.user
        }],
        location:req.body.location,
        rating:req.body.rating,
        charges:req.body.charges,
        aboutMe:req.body.aboutMe,
        profileImage:{
                    data: fs.readFileSync(path.join(__dirname,'../' + '/uploads/' + req.file.filename)),
                    contentType: 'image/png'
                }
     });
         newSitter.save()
        .then(() => res.json('Sitter added!'))
        .catch(err => res.status(400).json('Error: ' + err));
        }
    }) 
});

router.route('/login').post((req,res) =>{
    console.log(req.body);

    Sitter.findOne({username:req.body.username}, function(err, docs){
        if(err){
            console.log(err);
        }else{
            if(docs){
            if(docs.password === req.body.password){
                res.json('Right Password')
            }else{
                res.json('Wrong Password');
            }
        }else{
            res.json('Wrong')
        }
        }
    })
})

router.route('/getSitter').post((req,res)=>{
    console.log(req.body);
    Sitter.findOne({username:req.body.username}, function(err, docs){
        if(err){
            console.log(err);
        }else{
        res.json(docs);
        }
    })
})

router.route('/location').post((req,res)=>{
    Sitter.find({location:req.body.location}, function(err, docs){
        if(err){
            console.log(err);
        }else{
            res.json(docs)
        }
    })
})

router.route('/charges').post((req,res)=>{
    if(req.body.location != ''){
        console.log(req.body.location);
        Sitter.find({}).sort({ charges: 'asc' }).exec(function (err, docs) {
            if (err) {
                console.log(err);
            } else {
                console.log(docs);
                res.json(docs)
            }
        });
}})
    





module.exports = router;






// const router = require('express').Router();
// const passport = require('passport');
// let Sitter = require('../Models/sitters.model');

// router.route('/').get((req, res) => {
//     Sitter.find()
//         .then(sitters => res.json("sitters"))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/checkIfAuthenticated').get((req,res) =>{
//     if(req.isAuthenticated()){
//         res.json(req.user.username)
//     }else{
//         res.json('No')
//     }
// })

// router.route('/login').post((req,res) =>{
//     const user = new Sitter({
//         username:req.body.username,
//         password:req.body.password
//     })
//     req.login(user, function(err) {
//         if(err){
//             console.log(err);
//         }else{
//             passport.authenticate('local')(req, res, function () {
//                 res.json('Success')
//             })
//         }
//     })
// })

// router.route('/register').post((req, res) => {

//     Sitter.register({ username: req.body.username }, req.body.password, function (err, user) {
//         if (err) {
//             res.json(err)
//         } else {
//             passport.authenticate('local')(req, res, function () {
//                 res.json('Success')
//             })
//         }
//     })
// });

// module.exports = router;
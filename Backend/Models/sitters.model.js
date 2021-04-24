// const mongoose = require('mongoose')
// const passportLocalMongoose = require('passport-local-mongoose')
// const passport = require('passport')

// const sitterSchema = new mongoose.Schema({
//     username: String,
//     password: String
// })

// sitterSchema.plugin(passportLocalMongoose)
// const Sitter = mongoose.model('Sitter', sitterSchema);

// passport.use(Sitter.createStrategy())
// passport.serializeUser(Sitter.serializeUser())
// passport.deserializeUser(Sitter.deserializeUser())

// module.exports = Sitter

const mongoose = require('mongoose');

const sitterSchema = new mongoose.Schema({
    fullName:String,
    username: {
        type: String,
        required: true,
    },
    password: String,
    preferenceOfDogs:{type:String, enum:['Weight < 20kgs','Weight < 40kgs','Any Dog']},
    experience:String,
    reviews:[{review:String,user:String}],
    location:String,
    rating:{type: Number, default: 0},
    charges:String,
    aboutMe:String,
    mobile:String,
    profileImage: { data: Buffer, contentType: String },
});

const Sitter = mongoose.model('Sitter', sitterSchema);

module.exports = Sitter;
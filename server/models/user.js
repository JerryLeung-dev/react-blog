const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim:true,
        unique: 1 //true
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role:{
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

UserSchema.pre('save', function(next){
    const user = this;
    // console.log(user);
    const saltRounds = 10;
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next(); //I add it myself
            })
        })
    } else {
        next();
    }
    
})

UserSchema.methods.comparePassword = function(plaintextPassword, cb) {
    bcrypt.compare(plaintextPassword, this.password, (err, isMatch) => {
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

UserSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(this._id.toHexString(), 'secret')
    user.token = token;
    // console.log(token)
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null,user);
    })
}

UserSchema.statics.findByToken = function (token, cb) {
    const user = this;
    jwt.verify(token, 'secret', (err, decoded) => {
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', UserSchema);

module.exports = { User }
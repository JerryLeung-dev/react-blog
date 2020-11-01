const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {User} = require('./models/user');
const { auth } = require('./middlewares/auth');

const app = express();
const config = require('./config/key');
// const user = require('./models/user');

mongoose.connect(config.mongoURI,
                    {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log('DB connected'))
                                            .catch(err => console.log(err))

mongoose.set('useCreateIndex', true); //o have mongooose call the createIndex method on the mongodb native driver.

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); //convert req.body to json
app.use(cookieParser());

app.get('/', (req,res,next) =>{
    res.send('Hello World');
})

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200)
        .json({
            _id: req.user._id,
            isAuth: true,
            email: req.user.email,
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            role: req.user.role
        })
})

app.post('/api/users/register', (req,res) => {
    const user = new User(req.body); //new document
    user.save((err, userData) => { //save the document
        if(err) return res.json({success: false, err});
        return res.status(200).json({
            success:true,
            userData: userData
        });
    });  
})

app.post('/api/users/login', (req, res) => {
    //Find email
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "Email not found"
            })
        }
        //Compare password
    user.comparePassword(req.body.password, (err, isMatch) =>{
        if(!isMatch){
            return res.json({
                loginSuccess: false,
                message: "Password is not correct"
            })
        }
    })
    //generateToken
    user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        res.cookie('x_auth', user.token)
            .status(200)
            .json({
                loginSuccess: true,
                user: user
            })
    })
    })
})
//have to log in before log out , so we have to use the auth middleware
app.get('/api/user/logout',auth, (req, res) => {
    //we log user out by remove their token
    User.findOneAndUpdate({_id:req.user._id},{token:""},{new: true, useFindAndModify: false}, (err, doc)=>{
        if(err) return res.json({success: false, err});
        return res.status(200)
                    .json({
                        success: true,
                        // doc
                    });
    })
})

const port = process.env.PORT || 5000
app.listen(port, () =>{
    console.log(`Server running at ${port}`);
});
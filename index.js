const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {User} = require('./models/user');

const app = express();
const config = require('./config/key')

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

app.post('/api/users/register', (req,res) => {
    const user = new User(req.body); //new document
    user.save((err, userData) => { //save the document
        if(err) return res.json({success: false, err});
        return res.status(200).json({
            success:true
        });
    });  
})

app.listen(5000);
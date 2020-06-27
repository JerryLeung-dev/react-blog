const express = require('express');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://adminUser:Luongvidu123@react-blog.ezdts.mongodb.net/REACT-BLOG?retryWrites=true&w=majority',
                    {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log('DB connected'))
                                            .catch(err => console.log(err))
app.get('/', (req,res,next) =>{
    res.send('Hello World');
})

app.listen(5000);
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport')
const path =require('path')
require('dotenv').config()

const app=express();
app.use(morgan());
app.use(cors());
app.use(express.json());
app.use(passport.initialize())
require('./passport')(passport)

app.use('/api/users',require('./routers/userRouters'));
app.use('/api/transactions',require('./routers/transactionRouter'));


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.get('/',(req,res)=>{
    res.json({
        message:'Welcome to our application...!'
    })
})

const PORT =process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dk8do.mongodb.net/${process.env.DB_PASS}?retryWrites=true&w=majority`,
    {useNewUrlParser: true, useUnifiedTopology: true,},
    ()=>{
        console.log('Database connected successfully...!');
    }
    );  
}) 
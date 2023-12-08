const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors'); //cross-origin resource sharing
const userRouter = require('./routes/userRoutes') //M2-M3: Connect to userRouter.js
const courseRoutes = require('./routes/courseRoutes') //M2-M3: Connect to courseRouter.js
require('dotenv').config(); //use hidden environment variables (PORT, SECRET KEY, MONGO_URI). PLS REMOVE IF IT IS NOT YOUR PREFERENCE.

// middlewares
app.use(express.json()); //parses JSON payloads
app.use(express.urlencoded({extended: true})); //parses URL forms
app.use(cors()); //cross-origin resource sharing

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// initiate connection
let db = mongoose.connection;

// check for error in connection
db.on('error', (error)=>{console.log('Error listening to port ', error)});

// initiate port connection/listening
db.once('open', ()=>{
    app.listen(process.env.PORT, ()=>{
        console.log('Successfully listening to port ', process.env.PORT);
    })
});

//Connect routers
app.use('/users', userRouter);
// M2-M3: Add and group all course routes in the index.js
app.use('/courses', courseRoutes);

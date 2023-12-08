const express = require('express'); // add express making it easier to build web applications and APIs
const mongoose = require('mongoose'); //add mongoose used for connecting working with MongoDB
const app = express(); //initiate express
const cors = require('cors'); //cross-origin resource sharing
const userRouter = require('./routes/userRoutes') //M2-M3: Connect to userRouter.js
const courseRoutes = require('./routes/courseRoutes') //M2-M3: Connect to courseRouter.js
require('dotenv').config(); //use hidden environment variables (PORT, SECRET KEY, MONGO_URI). PLS REMOVE IF IT IS NOT YOUR PREFERENCE.

// Middlewares
app.use(express.json()); //parses income JSON data payloads. Checking for headers such as Content-Type : application/json
app.use(express.urlencoded({extended: true})); //parses and handles URL forms (HTML Forms)
app.use(cors()); //cross-origin resource sharing. CORS is a security feature implemented by web browsers that restricts web pages from making requests to a domain different from the one that served the web page.

// connect to mongoDB connection string
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// initiate connection
let db = mongoose.connection;

// event listener that checks for error during connection
db.on('error', (error)=>{console.log('Error listening to port ', error)});

// one time event listener that checks and initiate port connection/listening
db.once('open', ()=>{
    app.listen(process.env.PORT, ()=>{
        console.log('Successfully listening to port ', process.env.PORT);
    })
});

// MIDDLEWARE - Processing of Request, Response, Authentication, Authorization, Error Handling, and CORS

//Connect routers
// Connect route for userRouter. This is a middleware
app.use('/users', userRouter);
// M2-M3: Add and group all course routes in the index.js
// Connect route for courseRoutes. This is a middleware
app.use('/courses', courseRoutes);

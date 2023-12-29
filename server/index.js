
const express = require('express');
const dotenv = require('dotenv').config(); 
const cors = require('cors'); 
const {mongoose}= require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();



//db connection
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('DB connected'))
.catch((err) => console.log("DB not connected",err));

//middleware
app.use(express.json()); //parse the body for register data
app.use(cookieParser());
app.use(express.urlencoded({extended: false})); //parse the body for login data



app.use('/',require('./routes/authRoutes')); 
const port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`)); 
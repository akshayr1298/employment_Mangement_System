const express = require("express");
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose')
// app
const app = express();


// db
mongoose.connect('mongodb://localhost:27017/employment-mangement-system').then((data,err)=>{
    if(err){
        console.log('database not connected',err);

    }else{
        console.log('database connected');
    }
})

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());





app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});

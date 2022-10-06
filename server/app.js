const express = require("express");
const dotenv = require('dotenv')
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/config");
const colors = require('colors')

dotenv.config()

connectDB()
const app = express();




app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const userRoute = require('./routes/userroute')

app.get('/',(req,res)=>{
    res.send('api is running')
})
app.use('/api/user',userRoute)



app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`.yellow.bold);
});

require('dotenv').config();
const express=require("express")
const mongoose=require('mongoose')
const authroutes = require('./routes/authroutes')
const bodyParser=require("body-parser")
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware');

const app = express()

app.use(bodyParser.urlencoded({
    extended:true,
    useUnifiedTopology:true,
}))
app.use(authroutes)
app.use(express.json());
app.use(cookieParser()); 

mongoose.connect("mongodb://localhost:27017/USERDATA",{useNewUrlParser:true,useUnifiedTopology:true})

app.get('/login',requireAuth,(req,res)=> res.send('success'))
app.listen(9000,function(){
    console.log("server is up")
})
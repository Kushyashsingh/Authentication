require('dotenv').config();
const express=require("express")
const mongoose=require('mongoose')
const authroutes = require('./routes/authroutes')
const bodyParser=require("body-parser")
const cookieParser = require('cookie-parser')

const app = express()

app.use(bodyParser.urlencoded({
    extended:true,
    useUnifiedTopology:true,
}))
app.use(authroutes)
app.use(express.json());
app.use(cookieParser()); 

app.get('get/cookies',(req,res)=>{
    res.cookie('newUser',false)
    res.cookie('isEmployee',true,{maxAge: 1000*60*60*24 })
    res.send('you got the cookies')
})

app.get('/read-cookie',(req,res)=>{

})

mongoose.connect("mongodb://localhost:27017/USERDATA",{useNewUrlParser:true,useUnifiedTopology:true})


app.listen(9000,function(){
    console.log("server is up")
})
const mongoose= require("mongoose")
const {isEmail }=require('validator')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    email:{
        type:'string',
        required:[true,"please enter an email"],
        unique:true,
        validate:[isEmail,'please enter valid email']
},
    password:{
        type:'string',
        required:[true,"please enter an password"],
        minlength:[6,"Minimum password length is a character"]
    },
    resetPasswordToken:{
        type:'String',
        required:false,
    },
    resetPasswordExpires:{
        type:Date,
        required: false
    }
},{timestamps:true}) 


userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt)
    next()
})
userSchema.static.login= async function(email,password){
    const user =await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            return user
        }
        throw Error('incorrect password')   
    }
throw Error('incorrect email')
}
const User =new mongoose.model("User",userSchema);

module.exports=User;
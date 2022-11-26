const User = require("../models/User");
const jwt = require('jsonwebtoken')

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

//incorrect email
if(err.message==='incorrect email'){
  errors.email='that email is not registered'
}

//incorrect password
if(err.message==='incorrect password'){
  errors.password='that email is not registered'
}

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

const JWT_SECRET = 'coding'

const maxAge= 3*24*60*60;
const createToken =(id)=>{
   return jwt.sign({id},JWT_SECRET)
   expiresIn: maxAge
}



// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id)
    res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
    res.status(201).json({user: user._id});
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.reset_post = async(req,res)=>{
  const {email}=req.body;
  //user exist or not
  if(email !== User.email){
    res.send('User not registered')
  }

  //user exist and create one time link
  const secret = JWT_SECRET+ User.password
  const payload = {
    email:User.email,
    id: user.id,
  }
  const token = jwt.sign(payload, secret , {expiresIn: '15m'})

  const link = `http://localhost:9000/password/reset/${token}`
  console.log(link)
  res.send('Password reset link has been sent to your email')
}


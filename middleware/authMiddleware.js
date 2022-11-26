const jwt = require('jsonwebtoken')

const requireAuth =(req,res,next)=>{
    const token =req.cookies.jwt;

    //check json web token exist & is verified
    if(token){
        jwt.verify(token,'cooooddddiiinnngggg',(err,decodedToken)=>{

            if(err){
                console.log('err.message')
            }
            else{
                console.log(decodedToken)
                next();
            }
        });

    }
    else{
        res.send('invalid')
    }
}
module.exports={requireAuth}
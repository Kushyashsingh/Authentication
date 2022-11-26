const {Router}=require('express')
const authController = require("../controllers/authcontroller")

const router =Router();

router.post('/signup',authController.signup_post)

router.post('/login',authController.login_post)

router.post('/password/reset',authController.reset_post)

module.exports=router;
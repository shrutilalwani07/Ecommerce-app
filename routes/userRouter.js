const express=require('express')
const router=express.Router();
const user=require('../controller/userController')
const validate = require('../validators/user/user_validation')

router.post('/signup', validate.registerUserValidation,user.userSignup)
router.post('/login',user.userLogin)
router.post('/forget',user.forgetPassword)
router.post('/reset/:userId/:token',user.resetpassword)
module.exports=router
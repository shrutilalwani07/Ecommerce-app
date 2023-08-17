const userSchema = require("../models/userSchema");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { transpoter }=require('../service/sendmail')

//userSignup API
const userSignup = async (req, res) => {
  const userData = new userSchema(req.body);
  try {
    const existingUser = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (existingUser) {
      //   fs.unlink(req.file.path);  
      res.status(409).json({
        success: false,
        message: "UserEmail already exist",
      });
    } else {
      userData.userPassword = await bcrypt.hash(req.body.userPassword, 10);
      // userData.Profilepic = `/uploads/${req.file.filename}`;
      await userData.save();
      return res.status(200).json({
        success: true,
        message: "Registration successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//API for user login
const userLogin = async (req, res) => {
 const findUser = await userSchema.findOne({userEmail:req.body.userEmail})
  try { 
    if (findUser) { 
      const Password = await bcrypt.compare( 
        req.body.userPassword, 
        findUser.userPassword 
      ); 
      const token = jwt.sign({ userId: findUser._id }, process.env.JWT, { 
        expiresIn: "5d", 
      }); 
      if (findUser && Password) { 
        res.status(200).json({ 
          success: true, 
          message: "Login Successfully", 
          token: token, 
        }); 
      } else { 
        res.status(401).json({ 
          success: false, 
          message: "Invalid email or password", 
        }); 
      } 
    } else { 
      res.status(404).json({ 
        success: false, 
        message: "UserEmail not found", 
      }); 
    } 
  } catch (err) { 
    res.status(500).json({ 
      success: false, 
      error: err.message, 
    }); 
  } 
};

// forget API
const forgetPassword = async(req,res) => {
  
  const User = await userSchema.findOne({ userEmail:req.body.userEmail })
  try {
    if (User != null)  {
      const token = jwt.sign({ userId: User._id}, process.env.JWT,{ expiresIn:"9hr"})
      const resetPasswordLink = `https://127.0.0.1:27017/api/user/resetpassword/${User._id}/${token}`
      await transpoter.sendMail({
        from: "shrutilalwani72@gmail.com",
        to: req.body.userEmail,
        subject: 'Reset password link',
        html: `<p>below link is valid only for 10 minutes</p><a href=${resetPasswordLink}>click on link to reset your password</a>`
      })
      res.status(200).json({
        success: true,
        message: "Mail sent successfully",
        token: token,
        userId: User._id
      })
    }
    else {
      res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }
   } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
   }
  }

  //reset cureent password
  const resetpassword = async(req,res) => {
    const { userId, token } = req.params;
    const { newPassword, confirmPassword } = req.body
    try{
      const User = await userSchema.findById(userId)
      if (User !=null) {
        jwt.verify(token, process.env.JWT);
        if (newPassword === confirmPassword) {
          const hashedPassword = await bcrypt.hash(confirmPassword, 10)
          await userSchema.findByIdAndUpdate(userId), {    
            $set: { userPassword: hashedPassword }               //replace
          }
          res.status(200).json({
            success: true,
            message: "Password updated successfully"
          })
        } else {
          res.status(403).json({
            success: false,
            message: "newPassword and confirmPassword is not matched"
          })
        }
      }else {
        res.status(404).json({
          success: false,
          message: "userid not found"
        })
      }
    } catch (error){
      res.status(500).json({
        success: false,
        error: error.message
      })
    }
  }



  module.exports = { userSignup, userLogin, forgetPassword, resetpassword };


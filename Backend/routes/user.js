const express=require('express')
const nodemailer =require ('nodemailer')
const jwt = require('jsonwebtoken'); // Make sure to import jwt module if it's not already imported
const User = require('../models/userModel'); 

//controller functions
const{signupUser,loginUser}=require('../controllers/userController')

const router=express.Router()

//login route
router.post('/login',loginUser)

//signup router
router.post('/signup',signupUser)

// Route to get user accounts
router.get('/user-accounts', async (req, res) => {
  try {
    // Fetch all user accounts from the database
    const users = await User.find({}, '-password'); // Exclude the password field
    res.json(users);
  } catch (error) {
    console.error('Error fetching user accounts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/forgot-password',async(req,res)=>{
    const {email}=req.body;
try{
    const user=await User.findOne({email})
    if(!user){
        return res.json({message:"user not registered"})
    }
    const token=jwt.sign({id: user._id},process.env.KEY,{expiresIn:'5m'})
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'uvindyajayasundara@gmail.com',
          pass: 'twpw ntzi iwxc hvtj'
        }
      });
      
      var mailOptions = {
        from: 'uvindyajayasundara@gmail.com',
        to: email,
        subject: 'Reset Password',
        text: `http://localhost:3000/resetPassword/${token}`

      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return res.json({message:"error sending email"})
        } else {
          return res.json({status:true,message:"email sent"})
        }
      });

}catch(err){
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
}
})

module.exports=router
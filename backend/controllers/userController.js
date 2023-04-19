const User=require('../models/userModel');
const jwt=require('jsonwebtoken');
require('dotenv').config();
  
const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn: '365d'}); 
} 

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.login(email,password);
        const token=createToken(user._id);
        res.status(200).json({email,token});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

const signupUser=async(req,res)=>{
    const {username,email,password}=req.body;
    try {
        const user=await User.signup(username,email,password);
        const token=createToken(user._id);
        res.status(200).json({email,token});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

module.exports={
    signupUser,
    loginUser
}

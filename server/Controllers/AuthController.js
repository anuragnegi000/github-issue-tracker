const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require("../Models/Users");
const { signUpValidation, loginValidation } = require('../Middlewares/AuthValidation');
require('dotenv').config();

const router = express.Router();

router.post('/signup',signUpValidation,async(req,res)=>{
    
    try{
        const{username,email,password} = req.body;
        const user = await UserModel.findOne({email});

        if(user){
            return res.json({message:"User already exists"});
        }
        console.log(username);
        const hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword);
        const newUser = new UserModel({username,email,password:hashedPassword});
        await newUser.save();
        res.json({message:"User created successfully"});
    }catch(error){
        console.log(error);
        res.json(error);
    }
});

router.post('/login',loginValidation,async(req,res)=>{
    const {email,password} = req.body;
    console.log(email,password);
    const user = await UserModel.findOne({email});
    if(!user){
        return res.json({message:"User not found!"});
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.json({message:"Username or password is incorrect"});
    }
    const token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn: '24h'});

    res.json({token,userId: user._id});
});


module.exports = router;


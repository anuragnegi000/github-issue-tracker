const UserModel = require("../Models/Users");

const nodemailer = require("nodemailer");

const express = require("express");

const router = express.Router();

router.post("/sendmail", async (req, res) => {
  let user = await UserModel.findOne({ email: req.body.email });
  if(!user){
    res.status(400).json({message:"User not found"});
  }
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your email",
      password: "your smtp password from mail",
    },
  });
  
  let mailOptions = {
    from: "your mail",
    to: user,
    subject: "Github Issue Tracker",
    text: "Hello, this is an email from Github Issue Tracker",
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully" + info.response);
      res.json({message:"Email sent successfully"});
    }
  });
});



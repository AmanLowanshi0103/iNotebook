const express = require('express')
const router =express.Router()
const user=require("../Modules/UserMod.js")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SignJWT="Test123" // creating the signature for the jasonwebtoken to convert data in the token
const fectchuser = require('../Middleware/fetchuser.js'); // middleware for extracting userId from the token

//Route 1: Create a new user Post: /api/user/createuser : Post: no login required
router.post("/createuser",[
    // API based validation for user with the help of express validator
    body("Email").isEmail(),
    body("Name","Please enter the name more than 3 characters").isLength({min:2}),
    body("Password","Password should not be less than 5 characters").isLength({min:5})
],async(req,res)=>
{
    let success=false
    // if any error comes up  in the while adding the user in the database then this handle it
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });//sending bad request when error accoured
    }
    try
    {
        // try to find the email id in the database
    let User=await user.findOne({Email:req.body.Email})
    if(User)
    {
            return res.status(400).json({erro:"user already exists"})//sending bad request when error accoured
    }
    const salt = await bcrypt.genSaltSync(10); // creating salt for the password 
    const SecPas= await bcrypt.hashSync(req.body.Password, salt); //adding salt to the password with the the helpof hashSync
    // this syntax will create a new user in the database
    User=await user.create({
      Name: req.body.Name,
      Password:SecPas,
      Email: req.body.Email,
    })
    data={
        user:User.id
    }
    // res.json(User)// sending result response in the API when new user added new user
    const token = jwt.sign(data,SignJWT);// creating a JasonWebToken to generate a unique token for decreasing the chance of a hacker to hack our website later verify that token to login into our website 
    success=true
    res.json({success,token})// sending the toke as a reponse in the API
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({erros:"some error accured"})//catching the miscellaneous error 
    }
})

///Route 2: login Post: /api/user/login : Post no login required
router.post("/login",[
    // API based validation for user with the help of express validator
    body("Email").isEmail(),
    body("Password","Password should not be less than 5 characters").exists()
],async(req,res)=>
{
    let success=false;
    // if any error comes up  in the while adding the user in the database then this handle it
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });//sending bad request when error accoured
    }
    const {Email,Password}=req.body
    try
    {
        // try to find the email id in the database
    let User=await user.findOne({Email})
    if(!User)
    {
        success=false;
        return res.status(400).json({success,erro:"please enter valid credentials"})//sending bad request when error accoured
    }
    const passwordCompare= await bcrypt.compare(Password,User.Password)
    if(!passwordCompare)
    {
        success=false;
        return res.status(400).json({success,erro:"please enter valid credentials"})//sending bad request when error accoured
    }
    data={
        user:User.id
    }
    // res.json(User)// sending result response in the API when new user added new user
    const token = jwt.sign(data,SignJWT);// creating a JasonWebToken to generate a unique token for decreasing the chance of a hacker to hack our website later verify that token to login into our website 
    success=true;
    res.json({success,token})// sending the toke as a reponse in the API
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({erros:"some error accured"})//catching the miscellaneous error 
    }
})


//Route 3: Get an user Post: /api/user/getuser : login required
router.post("/getuser",fectchuser,async(req,res)=>
{
    try {
        let userId= req.user;//assing id in the variable
        // console.log(userId)
        const User=await user.findById(userId).select("-password") // finding the data in the data base 
        // console.log(User)
        res.send(User)//sending the user data to the user 
    } catch (err)
    {
        console.log(err)
        res.status(500).json({erros:"some error accured"})//catching the miscellaneous error 
    }
})
module.exports=router
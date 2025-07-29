const User = require("../models/authModel");
const bcrypt = require("bcryptjs");
const { generateTokenAndCookie } = require("../util/generateTokenAndCookie");

const signup = async(req,res)=>{

   const {email,password,name} = req.body

   try {
    if(!email || !password || !name){
        throw new Error("All fields are required");        
    }
    const exist = await User.findOne({
        email
    })
    
    if(exist){
        return res.status(400).json({message:"User already exists"})
    }

    const pass = await bcrypt.hash(password, 12)
    const verificationToken = Math.floor(100000 + Math.random()*900000).toString()

    const user = new User({
        email,
        password:pass,
        name,
        verificationToken
    })

    await user.save()

    await generateTokenAndCookie(res,user)

    res.status(201).json({
        success:true,
        message:"User Created Successfully",
        ...user._doc
    })

    
   } catch (error) {
    console.log("Error signing up",error)
     
   }
}

const signin = async(req,res)=>{
   
}

const verify = async(req,res)=>{
   
}

const logout = async(req,res)=>{

    res.clearCookie("token")
    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })
}
module.exports = {signup,signin,verify,logout}
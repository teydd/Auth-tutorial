const User = require("../models/authModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto")
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
    const {email,password} = req.body

    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"User does not exist"
            })
        }

        const validPassword = await bcrypt.compare(password,user.password)
            if(!validPassword){
                return res.status(400).json({
                    message:"Invalid password"
                })
            }

            await user.save()

            await generateTokenAndCookie(res,user)

            res.status(200).json({
                success:true,
                message:"User signin successfully",
                ...user._doc,
                password:null
            })
    } catch (error) {
        console.log("Error signing in")
        
    }
   
}

const verify = async(req,res)=>{
    const {code} = req.body

    try {
        const user = await User.findOne({verificationToken:code})

        if(!user){
            return res.status(400).json({
                message:"Invalid verification token"                
            })
        }
        user.isVerified = true

        await user.save()

        res.status(200).json({
            success:true,
            message:"User verified successfully",
            ...user._doc,
            password:null
        })
        
    } catch (error) {
        console.log("Error verifying the account")
        
    }
   
}

const logout = async(req,res)=>{

    res.clearCookie("token")
    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })
}

const forgotPassword = async(req,res)=>{
    const {email} = req.body

    try {
        const user = await User.findOne({
            email
        })

        if(!user){
            return res.status(400).json({
                message:"User doesn't exist"
            })
        }
        const resetToken = await crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt = Date.now() + 1 *60*60*1000

        user.resetPasswordToken = resetToken
        user.resetPasswordTokenExpiresAt= resetTokenExpiresAt

        await user.save()

        res.status(200).json({
            success:true,
            message:"Reset password sent successfuly",
            ...user._doc,
            password:null
        })
    } catch (error) {
        console.log("Error forgot password controller")        
    }
}


module.exports = {signup,signin,verify,logout,forgotPassword}
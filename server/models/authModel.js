const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    verificationToken:String,
    verificationTokenExpiresAt:String,
    resetPasswordToken:String,
    resetPasswordTokenExpiresAt:String
}, {timestamps:true})

const User = mongoose.model("User",authSchema)

module.exports = User
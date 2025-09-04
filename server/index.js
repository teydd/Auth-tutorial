const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const auth = require("./routes/authRoute")

const cookieParser = require("cookie-parser")

PORT = process.env.PORT
const app = express()
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())
app.use(cookieParser())


app.use("/auth",auth)


mongoose.connect(process.env.Test).then(()=>{
    console.log("DB connected successfully")
    app.listen(PORT, ()=>{
        console.log("Server runing on port ", PORT)
    })
}).catch(()=>{
    console.log("DB not connected")
})
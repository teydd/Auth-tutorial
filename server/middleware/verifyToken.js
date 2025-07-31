const jwt = require ("jsonwebtoken")

const verifyToken = async (req,res,next)=>{
    //verify user using token
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Unauthorised user user"
        })
    }
    try {
        const {userId, role} = jwt.verify(token,process.env.JWT)
        
        req.userId = userId
        req.useRole = role
        next()
    } catch (error) {
        
    }

}

module.exports= {verifyToken}
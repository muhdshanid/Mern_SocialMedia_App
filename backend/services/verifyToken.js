import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

 const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
                return res.status(400).json("token verify failed")
            }
            req.user = user
            next()
        })
    }else{
        return res.status(400).json("Invalid token")
    }
}

export default verifyToken
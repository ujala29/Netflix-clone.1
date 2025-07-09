import jwt from 'jsonwebtoken'
import  User  from '../models/user.js'
import dotenv from 'dotenv'
dotenv.config()

export const protectRoutes = async (req, res, next) => {
   try {
     
    const token=req.cookies["jwt-netflix"]
    if(!token) return res.status(401).json({
        success:false,
        message:"Unauthorized no token found"})
   
   const decoded=jwt.verify(token,process.env.JWT_SECRET)
   if(!decoded) return res.status(401).json({
    success:false,
    message:"Unauthorized token expired"})
    const user=await User.findById(decoded.userId).select("-password")
    // find user from userid and exclude password from the result
    // if user not found return unauthorized
    if(!user) return res.status(401).json({
        success:false,
        message:"Unauthorized no user found"})

        req.user=user
        next()
   }
   catch (error) {
    res.status(500).json({
        success:false,
        message:"Internal server error",
        error:error.message})
   }

}
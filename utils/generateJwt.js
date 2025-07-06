import jwt  from "jsonwebtoken";
import { config } from "dotenv";
config()
export const generateToken=(userId)=>{
    const token = jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"30m"})
    return token
}
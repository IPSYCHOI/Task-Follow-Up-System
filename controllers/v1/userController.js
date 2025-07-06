import User from "../../models/UserModel.js"
import { generateToken } from "../../utils/generateJwt.js"
import validator from 'validator'
export const login=()=>{}
export const signUp=async(req,res,next)=>{
    const {username,email,password,password2}=req.body
    if(!username||!email||!password||!password2){
        return res.status(400).json({
            message:"All fields required"
        })
    }
    if(password!==password2){
        return res.status(400).json({
            message:"Passwords dont match"
        })  
    }
    const isStrongPassword=validator.isStrongPassword(password)
    if(!isStrongPassword){
        return res.status(400).json({
            message: "Password must be at least 8 characters long, with at least 1 uppercase letter, 1 number, and 1 symbol"
        })
    }
    try {
        const existsUser=await User.findOne({email})
        if(existsUser){
            return res.status(409).json({
                message:"User already exists"
            })
        }
        const user=new User({
            username,
            email,
            password
        })
        await user.save()
        const token=generateToken(user._id)
        const mappedUser={
            username:user.username,
            email:user.email,
        }
        res.status(201).json({
            message:"user created successfully",
            data:{
                user:mappedUser,
                token
            }

        })
    } catch (error) {
        next(error)
    }

    
}
export default {login,signUp}
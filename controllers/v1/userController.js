import User from "../../models/UserModel.js"
import { generateToken } from "../../utils/generateJwt.js"
import validator from 'validator'
export const login=async(req,res,next)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.status(400).json({
            message:"All fields required"
        })
    }
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
        const passMatch=await user.passCheck(password)
        if(!passMatch){
            return res.status(404).json({

                message:"Invalid credentials"
            })
        }
        const token=generateToken(user._id)
        const mappedUser={
            username:user.username,
            email:user.email,
        }
        res.status(200).json({
            message:"user logged in successfully",
            data:{
                user:mappedUser,
                token
            }
        })
    } catch (error) {
        next(error)
    }
}
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

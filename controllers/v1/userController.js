import User from "../../models/UserModel.js"
import { generateToken } from "../../utils/generateJwt.js"
import userValidation from "../../validations/userValidation.js"
import { BadRequestError ,NotFoundError} from "../../Errors/error.js";

export const login=async(req,res,next)=>{
    const {email,password}=req.body
    let validationArray=[]
    validationArray.push(userValidation.isEmail(email))
    validationArray.push(userValidation.isPassword(password,password))
    for(const v of validationArray){
        if( v !==true){
            throw new BadRequestError(v)
        }
    }
    const lowerEmail=email.toLowerCase()
    try {
        const user=await User.findOne({email:lowerEmail,isDeleted:false})
        if(!user){
            throw new NotFoundError("User Not found")
        }
        const passMatch=await user.passCheck(password)
        if(!passMatch){
            return res.status(401).json({
                message:"Incorrect email or password"
            })
        }
        const token=generateToken(user._id)
        const mappedUser={
            id:user._id,
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
    let validationArray=[]
    validationArray.push(userValidation.isName(username))
    validationArray.push(userValidation.isEmail(email))
    validationArray.push(userValidation.isPassword(password,password2))
    for(const v of validationArray){
        if( v !==true){
            throw new BadRequestError(v)
        }
    }
    const lowerEmail=email.toLowerCase()
    try {
        let user=await User.findOne({email:lowerEmail})
        if(!user){
            user=new User({
                username,
                email:lowerEmail,
                password
            })
            await user.save()
        }
        else if(!user.isDeleted){
            return res.status(409).json({
                message:"User already exists"
            })
        }
        else{
            user.isDeleted=false
            user.username=username
            user.password=password
            await user.save()
        }
        const mappedUser={
            id:user._id,
            username:user.username,
            email:user.email,
        }
        res.status(201).json({
            message:"user registered successfully",
            data:{
                user:mappedUser,
            }

        })
    } catch (error) {
        next(error)
    }

}
export const softDelete=async(req,res,next)=>{
    const userId=req.user.id
    try {
        const user=await User.findById(userId)
        if(!user||user.isDeleted){
            return res.status(404).json({
                message:"user not found"
            })
        }

        await User.findByIdAndUpdate(userId,{isDeleted:true})
        res.status(200).json({message:"user deleted successfully"})
    } catch (error) {
        next(error)
    }
}
export default {login,signUp,softDelete}

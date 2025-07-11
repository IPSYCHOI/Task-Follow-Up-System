import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"
import { NotFoundError } from "../Errors/error.js"
const JWT_SECRET = process.env.JWT_SECRET
export const isAuth = async(req, res, next) => {
    try {
        let token = req.get("Authorization")
        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied. No token provided." })
        }
        token = token.split(' ', 2)[1]
        const decodedToken = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(decodedToken.id)
        if(!user||user.isDeleted){
            return next(new NotFoundError("User not found"))
        }
        const mappedUser={
            id:user._id,
            name:user.name,
            email:user.email

        }
        req.user = mappedUser
        next()
    } catch (error) {
        error.status = 401
        error.message = "Invalid or expired token."
        next(error)
    }
}
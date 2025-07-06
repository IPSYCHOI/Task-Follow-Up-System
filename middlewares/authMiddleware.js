import jwt from "jsonwebtoken"
export const isAuth=(req,res,next)=>{
    let token = req.get("Authorization")
    token=token.split(' ',2)[1]
    
}
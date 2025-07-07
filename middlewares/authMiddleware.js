import jwt from "jsonwebtoken"
const JWT_SECRET = process.env.JWT_SECRET
export const isAuth = (req, res, next) => {
    try {
        let token = req.get("Authorization")
        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied. No token provided." })
        }
        token = token.split(' ', 2)[1]
        const decodedToken = jwt.verify(token, JWT_SECRET)
        req.user = decodedToken
        next()
    } catch (error) {
        error.status = 401
        error.message = "Invalid or expired token."
        next(error)
    }
}
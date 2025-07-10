import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const JWT_SECRET = process.env.JWT_SECRET
export const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1d" })
    return token
}
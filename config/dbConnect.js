
import mongoose from "mongoose"
import { config } from 'dotenv';
config()

const dbconnect=()=>{
    return mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("✅ MongoDB Connected Successfully")})
    .catch(err=>{
        throw new Error("Database Connection Failed: " + err.message)
    })
}
export default dbconnect

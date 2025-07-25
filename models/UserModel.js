import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tasks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Task"
        }
    ],
    isDeleted:{
        type:Boolean,
        default:false
    }
},
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next()

    try {
        this.password = await bcrypt.hash(this.password, 12)
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.passCheck = function (password) {
    return bcrypt.compare(password, this.password)
}
const User = mongoose.model('User', userSchema)
export default User
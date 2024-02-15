import { Schema,model } from "mongoose";
import { emailRegex } from "../helpers/emailRegex.js";
import { passwordRegex } from "../helpers/passwordRegex.js"

const userSchema = new Schema({
    email: {
        type: String, 
        required: true,
        lowercase: true,
        match: [emailRegex]
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String, 
        enum: ["User", "Admin"],
        default: "User"
    }
},{
    timestamps: true
})

export default model ("User", userSchema)
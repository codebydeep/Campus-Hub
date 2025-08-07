import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: true
        },
        role: {
            type: String,
            enum: AvailableUserRoles,
            default: UserRolesEnum.ADMIN
        },
        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10)
    next();
})


userSchema.methods.isPasswordMatched = async function (password){
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        id: this._id,
        role: this.role
    }, 
    process.env.ACCESS_TOKEN_SECRET, 
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}


userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        id: this._id,
        role: this.role
    }, 
    process.env.REFRESH_TOKEN_SECRET, 
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}


const User = mongoose.model("User", userSchema)

export default User;
import User from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";

import jwt from "jsonwebtoken"

const authMiddleware = asyncHandler(async(req, res, next) => {
    const token = req.cookies.accessToken

    if(!token){
        throw new ApiError(
            400,
            "No token provided~"
        )
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    if(!decoded){
        throw new ApiError(
            400,
            "User Unauthorized!"
        )
    }

    const user = await User.findById(decoded.id).select("-password")

    if(!user){
        throw new ApiError(
            400,
            "No user found with token||cookie"
        )
    }

    req.user = user

    next();
})

const checkAdmin = asyncHandler(async(req, res, next) => {
    if(req.user.role !== "admin") throw new ApiError(
        400,
        "Access denied || Admins only"
    )

    next();
})

export { authMiddleware, checkAdmin }
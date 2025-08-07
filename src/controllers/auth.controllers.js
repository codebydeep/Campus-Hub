import User from "../models/user.model.js";

import asyncHandler from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";

const registerUser = asyncHandler(async(req, res) => {
    const { 
        fullname,
        email,
        password
    } = req.body

    if(!fullname || !email || !password){
        return res.status(400).json(
            new ApiError(
                400,
                false,
                ["All the details! are required."]
            )
        )
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
        return res.status(403).json(
            new ApiError(
                403,
                false,
                ["User already exists!"]
            )
        )
    }

    const user = await User.create({
        fullname,
        email,
        password
    })

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "Strict",
        maxAge: 60 * 1000 * 60 * 15
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 1000 * 60 * 15
    })

    res.status(201).json(
        new ApiResponse(
            201,
            "User Created Successfully!",
            { user }
        )
    )
})

const loginUser = asyncHandler(async(req, res) => {
    const { 
        email,
        password
    } = req.body

    if(!email || !password){
        return res.status(400).json(
            new ApiError(
                400,
                false,
                ["Both the details are required!"]
            )
        )
    }

    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json(
            new ApiError(
                400,
                false,
                ["No User found || Please create account or register!"]
            )
        )
    }

    const isMatched = await user.isPasswordMatched(password)

    if(!isMatched){
        return res.status(409).json(
            new ApiError(
                409,
                false,
                ["Invalid credentials~"]
            )
        )
    }

    const accessToken = await user.generateAccessToken()

    const refreshToken = await user.generateRefreshToken()

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 1000 * 15
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 1000 * 60 * 15
    })

    res.status(200).json(
        new ApiResponse(
            200,
            "User LoggedIn Successfully!",
            { user }
        )
    )
})

const logoutUser = asyncHandler(async(req, res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "strict",
    })

    res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "strict",
    })

    res.status(200).json(
        new ApiResponse(
            200,
            "User LogOut Successfully!",
        )
    )
})

const getProfile = asyncHandler(async(req, res) => {
    const user = await User.find({
        _id: req.user._id
    })

    res.status(200).json(
        new ApiResponse(
            200,
            "Profile fetched Successfully!",
            { user }
        )
    )
})

export { registerUser, loginUser, logoutUser, getProfile }
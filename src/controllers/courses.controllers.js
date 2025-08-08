import asyncHandler from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import Course from "../models/courses.model.js";
import User from "../models/user.model.js";

const postCourses = asyncHandler(async(req, res) => {
    const {
        title,
        description
    } = req.body

    if(!title || !description){
        return res.status(400).json(
            new ApiError(
                400,
                false,
                ["Title & Description required!"]
            )
        )
    }

    if(req.user.role === "student" || req.user.role === "faculty"){
        return res.status(400).json(
            new ApiError(
                400,
                false,
                ["Not Authorized to make Courses!"]
            )
        )
    }

    const existingCourse = await Course.findOne({
        title: req.body.title,
        description: req.body.description
    })

    if(existingCourse){
        return res.status(403).json(
            new ApiError(
                403,
                false,
                ["Course already exists!"]
            )
        )
    }

    const getInstructor = await User.findById(req.user._id).select("fullname")


    const course = await Course.create({
        title,
        description,
        instructor: getInstructor
    })

    res.status(201).json(
        new ApiResponse(
            201,
            "Course posted Successfully!",
            { course }
        )
    )    
})

const getCourses = asyncHandler(async(req, res) => {
    const courses = await Course.find({})

    if(!courses){
        return res.status(400).json(
            new ApiError(
                400,
                false,
                ["No Courses are found!"]
            )
        )
    }

    res.status(200).json(
        new ApiResponse(
            200,
            "Courses fetched Successfully!",
            { courses }
        )
    )
})

export { postCourses, getCourses }
import asyncHandler from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js"
import { ApiError } from "../utils/api-error.js";

import Material from "../models/materials.model.js";
import Course from "../models/courses.model.js";

const postMaterial = asyncHandler(async(req, res) => {
    const { courseId } = req.params

    const {
        title,
        // attachments
    } = req.body

    if(!title){
        throw new ApiError(
            400,
            "Title & Attachments must be provided!"
        )
    }
        
    if(req.user.role !== "faculty"){
        return res.status(400).json(
            new ApiError(
                400,
                false,
                ["Access denied! - Students or Admin not allowed!"]
            )
        )
    }
    
    const course = await Course.findById(courseId);

    if (!course) {
        throw new ApiError(
            404,
            "Course not found!"
        )
    }
        
    const material = await Material.create({
        course: course._id,
        title,
        // attachments
        uploadedBy: req.user._id
    })

    res.status(201).json(
        new ApiResponse(
            201,
            "Material created Done!",
            { material }
        )
    )

})


const getMaterial = asyncHandler(async(req, res) => {
    const { courseId } = req.params

    if(req.user.role !== "faculty" || req.user.role !== "student"){
        throw new ApiError(
            400,
            "Access denied! - User not allowed!"
        )
    }
        
    const materials = await Material.find({
        course: courseId
    })

    if(!materials){
        throw new ApiError(
            400,
            "No study materials found for Courses!"
        )
    }

    res.status(200).json(
        new ApiResponse(
            200,
            "Materials fetched Successfully!",
            { materials }
        )
    )
})

export { postMaterial, getMaterial }
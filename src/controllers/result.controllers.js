import Result from "../models/result.model.js";

import asyncHandler from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import User from "../models/user.model.js";

const postResult = asyncHandler(async(req, res) => {
    const {
        student,
        year,
        semester,
        gpa,
        grade,
    } = req.body

    if(!student || !year || !semester || !gpa || !grade){
        return res.status(400).json(
            new ApiError(
                400,
                false,
                ["All the details are required to publish result!"]
            )
        )
    }

    const existingResult = await Result.findOne(
        {
            student: req.body.student,
            year: req.body.year,
            semester: req.body.semester
        }
    );
        
    if(existingResult){
        return res.status(400).json(
            new ApiError(
                400,
                false,
                ["Result already announced! for a student"]
            )
        )
    }

    const studentName = await User.findById(student).select("fullname")
    
    const result = await Result.create({
        student: studentName,
        year,
        semester,
        gpa,
        grade
    })

    res.status(201).json(
        new ApiResponse(
            201,
            "Result posted Successfully!",
            { 
                result
            }
        )
    )
})

const getResult = asyncHandler(async(req, res) => {
    const { studentId } = req.params

    const studentResult = await Result.findOne({
        student: studentId
    })

    if(!studentResult){
        return res.status(409).json(
            new ApiError(
                409,
                false,
                ["No Result found!"]
            )
        )
    }

    res.status(200).json(
        new ApiResponse(
            200,
            "Result fetched Successfully!",
            { studentResult }
        )
    )
})

export { 
    postResult, 
    getResult 
}
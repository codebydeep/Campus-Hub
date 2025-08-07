import asyncHandler from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";

const checkRoleForResult = asyncHandler(async(req, res, next) => {
    if(req.user.role === "admin" || req.user.role === "faculty"){
        return next()
    }

    const { studentId } = req.params

    if((req.user._id.toString() !== studentId) && (req.user.role === "student")){   
        return next()
    }

    throw new ApiError(
        403,
        false,
        ["Access denied: Not allowed to see others Result!"]
    )  
}) 

export default checkRoleForResult
import mongoose, { Schema } from "mongoose";

import { CurrentStatus, ResultStatusEnum } from "../utils/constants.js";

const resultSchema = new mongoose.Schema(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        year: {
            type: String,
            required: true
        },
        semester: {
            type: String,
            required: true
        },
        gpa: {
            type: Number,
            required: true
        },
        grade: {
            type: String,
            required: true,
        },
        resultStatus: {
            type: CurrentStatus,
            default: ResultStatusEnum.PASS
        },
    },
    {
        timestamps: true,
    }
);

const Result = mongoose.model("Result", resultSchema)

export default Result;
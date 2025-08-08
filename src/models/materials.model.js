import mongoose, { Schema } from "mongoose";

import { Attachments, AttachmentsTypeEnum } from "../utils/constants.js";

const materialSchema = new mongoose.Schema(
    {
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course"
        },
        title: {
            type: String,
            required: true,
        },
        attachments: {
            type: String,
            enum: Attachments,
            default: AttachmentsTypeEnum.ASSIGNMENT
        },
        uploadedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

const Material = mongoose.model("Material", materialSchema)

export default Material;
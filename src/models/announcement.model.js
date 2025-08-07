import mongoose, { Schema } from "mongoose";
import { AnnouncementPriorityEnum, AvailablePriority } from "../utils/constants.js";

const announcementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        attachments: {
            type: {
                url: String,
                localpath: String,
            },
            default: {
                url: 'https://placehold.co/600x400',
                localpath: ""
            }
        },
        priority: {
            type: String,
            enum: AvailablePriority,
            default: AnnouncementPriorityEnum.NORMAL
        },
        isActive: {
            type: String,
            default: "Yes"
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true
    }
);

const Announcement = mongoose.model("Announcement", announcementSchema)

export default Announcement
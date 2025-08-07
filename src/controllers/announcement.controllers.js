import Announcement from "../models/announcement.model.js";
import asyncHandler from "../utils/async-handler.js"
import { ApiResponse } from "../utils/api-response.js"
import { ApiError } from "../utils/api-error.js"

const postAnnouncement = asyncHandler(async(req, res) => {
    const {
        title,
        content,
        // attachments
    } = req.body

    if(!title || !content){
        return res.status(400).json(
            new ApiError(
                400,
                false,
                ["All the details are required to make an announcement."]
            )
        )
    }

    const existingAnnouncement = await Announcement.findOne({
        title: req.body.title,
        content: req.body.content,
    })

    if(existingAnnouncement){
        return res.status(400).json(
            new ApiError(
                400,
                false,
                ["Announcement already exists"]
            )
        )
    }

    const announcement = await Announcement.create({
        title,
        content,
        // attachments,
        createdBy: req.user._id,
    })


    res.status(201).json(
        new ApiResponse(
            201,
            "Announcement Created Successfully!",
            {
                "title": announcement.title,
                "content": announcement.content,
                "attachments": announcement.attachments,
                "createdBy": announcement.createdBy,
                "priority": announcement.priority,
            }
        )
    )
})

const getAllAnnouncements = asyncHandler(async(req, res) =>{
    const allAnouncements = await Announcement.find({})

    // if(!allAnouncements){
    //     return res.status(409).json(
    //         new ApiError(
    //             409,
    //             false,
    //             ["No Announcemensts found!"]
    //         )
    //     )
    // }

    res.status(200).json(
        new ApiResponse(
            200,
            "All Announcements fetched successfully!",
            { allAnouncements }
        )
    )
})


export { 
    postAnnouncement, 
    getAllAnnouncements 
}
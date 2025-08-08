import { Router } from "express";

import { authMiddleware, checkAdmin } from "../middlewares/auth.middleware.js";
import { postAnnouncement, getAllAnnouncements } from "../controllers/announcement.controllers.js";

const announcementRoutes = Router()

announcementRoutes.post("/", authMiddleware, checkAdmin, postAnnouncement)
announcementRoutes.get("/", authMiddleware, getAllAnnouncements)

export default announcementRoutes;
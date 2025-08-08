import { Router } from "express";

import { getCourses, postCourses } from "../controllers/courses.controllers.js";
import { authMiddleware, checkAdmin } from "../middlewares/auth.middleware.js";

const coursesRoutes = Router()

coursesRoutes.post("/", authMiddleware, checkAdmin, postCourses)
coursesRoutes.get("/", authMiddleware, getCourses)

export default coursesRoutes;
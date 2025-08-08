import { Router } from "express";

import { getMaterial, postMaterial } from "../controllers/materials.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const materialRoutes = Router()

materialRoutes.post("/:courseId/materials", authMiddleware, postMaterial)
materialRoutes.get("/:courseId/materials", authMiddleware, getMaterial)

export default materialRoutes;
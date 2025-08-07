import { Router } from "express";

import { getResult, postResult } from "../controllers/result.controllers.js";
import { authMiddleware, checkAdmin } from "../middlewares/auth.middleware.js";
import checkRoleForResult from "../middlewares/result.middleware.js";

const resultRoutes = Router()

resultRoutes.post("/", authMiddleware, checkAdmin, postResult)
resultRoutes.get("/:studentId", authMiddleware, checkRoleForResult, getResult)

export default resultRoutes
import { Router } from "express";
import { getProfile, loginUser, logoutUser, registerUser } from "../controllers/auth.controllers.js";
import { authMiddleware, checkAdmin } from "../middlewares/auth.middleware.js";

const authRoutes = Router()

authRoutes.post("/", registerUser)
authRoutes.post("/login", loginUser)
authRoutes.get("/logout", authMiddleware, logoutUser)
authRoutes.get("/get-me", authMiddleware, checkAdmin, getProfile)

export default authRoutes;
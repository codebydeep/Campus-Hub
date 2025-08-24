import { Router } from "express";
import { changeRole, getProfile, loginUser, logoutUser, registerUser } from "../controllers/auth.controllers.js";
import { authMiddleware, checkAdmin } from "../middlewares/auth.middleware.js";

const authRoutes = Router()

authRoutes.post("/register", registerUser)
authRoutes.post("/login", loginUser)
authRoutes.get("/logout", authMiddleware, logoutUser)
authRoutes.get("/get-me", authMiddleware, getProfile)

authRoutes.put("/change-role/:id", authMiddleware, checkAdmin, changeRole)

export default authRoutes;
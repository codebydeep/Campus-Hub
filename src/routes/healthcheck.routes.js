import { Router } from "express";
import healthCheck from "../controllers/healthcheck.controller.js";

const healthCheckRoutes = Router()

healthCheckRoutes.get("/", healthCheck)

export default healthCheckRoutes
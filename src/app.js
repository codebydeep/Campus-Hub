import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"

import healthCheckRoutes from "./routes/healthcheck.routes.js"
import authRoutes from "./routes/auth.routes.js"
import announcementRoutes from "./routes/announcement.routes.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "UPDATE"],
    allowedHeaders: ["Content-type", "Authorization"],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())

app.use("/api/v1/healthcheck", healthCheckRoutes)

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/announcement", announcementRoutes)

export default app;
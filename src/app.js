import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import healthCheckRoutes from "./routes/healthcheck.routes.js"
import authRoutes from "./routes/auth.routes.js"
import announcementRoutes from "./routes/announcement.routes.js"
import resultRoutes from "./routes/result.routes.js"
import coursesRoutes from "./routes/courses.routes.js"

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
app.use("/api/v1/results", resultRoutes) 
app.use("/api/v1/courses", coursesRoutes)

export default app;
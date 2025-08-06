import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"

import healthCheckRoutes from "./routes/healthcheck.routes.js"

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

app.use("/api/v1/health", healthCheckRoutes)

export default app
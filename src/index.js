import app from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/dbConnect.js";

const PORT = process.env.PORT || 4000

connectDB
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);
    })
})
.catch((err) => {
    console.error(`MongoDB Connection error`, err);
    process.exit(1);
})
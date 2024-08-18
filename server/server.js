import express from "express";
import bodyParser from "body-parser";
import { dbConnect } from "./db/conn.js";
import adminRouter from "./routes/adminRoute.js";
import userRouter from "./routes/userRoute.js";

// Initiate the server and connect to the database
const app = express();

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

dbConnect();
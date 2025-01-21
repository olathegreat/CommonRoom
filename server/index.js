import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;
const databaseurl = process.env.DATABASE_URL;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))
app.use("/uploads/profile", express.static("uploads/profile"))

app.use(cookieParser());
app.use(express.json());


app.use("/api/auth",authRoutes )


const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose
  .connect(databaseurl)
  .then(() => console.log("Db connection successful"))
  .catch(err=> console.log(err.message))
  ;

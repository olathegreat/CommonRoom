import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import contactRoutes from "./routes/ContactRoutes.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./routes/MessagesRoute.js";
import channelRoutes from "./routes/ChannelRoutes.js";

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
app.use("/uploads/files", express.static("uploads/files"))

app.use(cookieParser());
app.use(express.json()); 

app.use("/health", (req, res) =>{
    res.send("server is running")
})


app.use("/api/auth",authRoutes )
app.use("/api/contacts", contactRoutes)
app.use("/api/messages", messagesRoutes)
app.use("/api/channels", channelRoutes)


const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


setupSocket(server);
mongoose
  .connect(databaseurl)
  .then(() => console.log("Db connection successful"))
  .catch(err=> console.log(err.message))
  ;

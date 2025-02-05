import { Router } from "express";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import { getMessages, uploadFiles } from "../controllers/MessagesController.js";
import multer from "multer";


const messagesRoutes = Router();
// const upload = multer({ dest: "uploads/files" });

const storage = multer.memoryStorage(); 
 
const upload = multer({ storage, limits:{
    fileSize: 10 * 1024 * 1024 
} }); 


messagesRoutes.post("/get-messages", verifyToken, getMessages)
messagesRoutes.post("/upload-file", verifyToken, upload.single("file"), uploadFiles)

export default messagesRoutes;
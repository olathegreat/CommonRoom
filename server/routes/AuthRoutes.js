import { Router } from "express";
import { signup, login ,getUserInfo, removeProfileImage, updateProfile, addProfileImage, logout} from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import multer from "multer";


const authRoutes = Router();
// const upload = multer({ dest: "uploads/profile" });

const storage = multer.memoryStorage(); 

const upload = multer({ storage, limits:{
    fileSize: 5 * 1024 * 1024 
} }); 

authRoutes.post("/signup", signup)
authRoutes.post("/login", login)
authRoutes.get("/user-info",verifyToken, getUserInfo)
authRoutes.post("/update-profile", verifyToken, updateProfile)
authRoutes.post("/add-profile-image", verifyToken, upload.single("profile-image"), addProfileImage)
authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage);
authRoutes.post("/logout", logout)
export default authRoutes;
import { Router } from "express";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import { getAllContact, getContactForDMList, searchContact } from "../controllers/ContactController.js";

const contactRoutes = Router();

contactRoutes.post("/search", verifyToken, searchContact)
contactRoutes.get("/get-contacts-for-dm", verifyToken, getContactForDMList)
contactRoutes.get("/get-all-contacts", verifyToken, getAllContact)
export default contactRoutes;
import express from "express";
import { createMessage, getMessage } from "../controllers/messageController.js";
import verifyToken from "../services/verifyToken.js";


const messageRouter = express.Router();

messageRouter.post("/new",verifyToken,createMessage)
messageRouter.get("/get-message/:userId1/:userId2",getMessage)

export default messageRouter
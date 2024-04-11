import { addMessage, getMessages } from "../controllers/messageController.js";
import express from 'express';
const messageRoute = express.Router();

messageRoute.post("/addmsg", addMessage);
messageRoute.post("/getmsg", getMessages);

export default messageRoute;

import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { getMessage } from "../controller/message.controller.js";

const router = express.Router();

router.route('/:id/getmessages').get(isAuthenticated, getMessage);

export default router;
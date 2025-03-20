import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { recentUsersList, getMessage } from "../controller/message.controller.js";

const router = express.Router();

router.route('/:id/getmessages').get(isAuthenticated, getMessage);


router.route('/recentUsersList').get(isAuthenticated, recentUsersList);


export default router;
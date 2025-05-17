import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { getNotification, markAsRead } from "../controller/notification.controller.js";

const router = express.Router();

router.route('/').get(isAuthenticated, getNotification);
router.route('/mark-as-read').patch(isAuthenticated, markAsRead);


export default router;
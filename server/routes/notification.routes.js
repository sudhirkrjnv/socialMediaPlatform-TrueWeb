import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { getNotification, markAsRead, markChatListRead, markAllRread } from "../controller/notification.controller.js";

const router = express.Router();

router.route('/').get(isAuthenticated, getNotification);
router.route('/mark-as-read/:notificationId').patch(isAuthenticated, markAsRead);
router.route('/mark-chat-list-read/:chatId').post(isAuthenticated, markChatListRead);
router.route('/mark-all-read').post(isAuthenticated, markAllRread);


export default router;
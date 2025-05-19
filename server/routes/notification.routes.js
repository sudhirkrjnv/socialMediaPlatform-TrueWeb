import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { fetchNotification, markAsRead, markChatListRead, markAllRread } from "../controller/notification.controller.js";

const router = express.Router();

router.route('/').get(isAuthenticated, fetchNotification);
router.route('/mark-as-read/:notificationId').patch(isAuthenticated, markAsRead);
router.route('/mark-chat-list-read/:chatId').post(isAuthenticated, markChatListRead);
router.route('/mark-all-read').get(isAuthenticated, markAllRread);


export default router;
import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { recentUsersList, getMessage, CreateGroup, getGroupMessage } from "../controller/message.controller.js";

const router = express.Router();

router.route('/:id/getmessages').get(isAuthenticated, getMessage);


router.route('/recentUsersList').get(isAuthenticated, recentUsersList);
router.route('/createGroup').post(isAuthenticated, CreateGroup);
router.route('/:id/getgroupmessages').get(isAuthenticated, getGroupMessage);


export default router;
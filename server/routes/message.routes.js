import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { recentUsersList, getMessage, CreateGroup } from "../controller/message.controller.js";

const router = express.Router();

router.route('/:id/getmessages').get(isAuthenticated, getMessage);


router.route('/recentUsersList').get(isAuthenticated, recentUsersList);
router.route('/createGroup').post(isAuthenticated, CreateGroup);


export default router;
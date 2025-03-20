import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { getListofOneToOneOldUsers, getMessage } from "../controller/message.controller.js";

const router = express.Router();

router.route('/:id/getmessages').get(isAuthenticated, getMessage);


router.route('/getListofOneToOneOldUsers').get(isAuthenticated, getListofOneToOneOldUsers);


export default router;
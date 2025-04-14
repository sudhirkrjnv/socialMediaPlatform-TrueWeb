import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import upload from "../middleware/multer.js"

import { register, login, logout, editProfile, getfollowers, getAllMembers, getUserGroups} from "../controller/user.controller.js"

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/profile/editProfile').post(isAuthenticated, upload.fields([{name:'profilePicture', maxCount:'1'}, {name:'coverPicture', maxCount:'1'}]), editProfile);
router.route('/followers').post(isAuthenticated, getfollowers);
router.route('/allMembers').get(isAuthenticated, getAllMembers);

router.route('/recentgroups').get(isAuthenticated, getUserGroups);

export default router;
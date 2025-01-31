import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import upload from "../middleware/multer.js"
import { addPost, getAllPost } from "../controller/post.controller.js";

const router = express.Router();

router.route("/addpost").post(isAuthenticated, upload.single('image'), addPost);
router.route("/posts").get(isAuthenticated, getAllPost);

export default router;
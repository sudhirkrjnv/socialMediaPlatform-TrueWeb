import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import upload from "../middleware/multer.js"
import { addComment, addPost, dislikePost, getAllPost, getPostComment, likePost } from "../controller/post.controller.js";

const router = express.Router();

router.route("/addpost").post(isAuthenticated, upload.single('image'), addPost);
router.route("/posts").get(isAuthenticated, getAllPost);
router.route("/:id/like").get(isAuthenticated, likePost);
router.route("/:id/dislike").get(isAuthenticated, dislikePost);
router.route("/:id/addcomment").post(isAuthenticated, addComment);
router.route("/:id/getpostcomment").post(isAuthenticated, getPostComment);

export default router;
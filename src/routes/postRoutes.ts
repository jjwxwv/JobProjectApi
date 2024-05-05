import express from "express";
import {
  addNewPost,
  editPost,
  getPostByPostId,
  getPosts,
} from "../controllers/postController";
const router = express.Router();

router.route("").get(getPosts).post(addNewPost);
router.route("/:id").get(getPostByPostId).put(editPost);
export { router as postRouter };

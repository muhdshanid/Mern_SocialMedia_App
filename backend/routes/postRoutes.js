import express from "express";
import verifyToken from "../services/verifyToken.js";
import {
  commentPost,
  createPost,
  deletePost,
  dislikePost,
  getPost,
  likePost,
  updatePost,
} from "../controllers/postControllers.js";

const postRouter = express.Router();

postRouter.post("/create-post", verifyToken, createPost);
postRouter.get("/get-post/:id", getPost);
postRouter.put("/update-post/:id", verifyToken, updatePost);
postRouter.put("/like/:id", verifyToken, likePost);
postRouter.put("/dislike/:id", verifyToken, dislikePost);
postRouter.put("/comment-post", verifyToken, commentPost);
postRouter.delete("/delete-post/:id",verifyToken,deletePost)

export default postRouter;

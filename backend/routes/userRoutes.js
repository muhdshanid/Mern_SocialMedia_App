import express from "express";
import {
  allUsers,
  createUser,
  deleteUser,
  followUser,
  forgetPassword,
  getFollowers,
  getFollowingUsers,
  getPostedUser,
  getPosts,
  getSuggestionUsers,
  loginUser,
  resetPassword,
  updateUser,
  verifyEmail,
} from "../controllers/userControllers.js";
import verifyToken from "../services/verifyToken.js";
import {
  loginValidation,
  userValidation,
} from "../validations/userValidations.js";

const userRouter = express.Router();

userRouter.post("/create-user", userValidation, createUser);
userRouter.post("/login", loginValidation, loginUser);
userRouter.post("/verify-email",verifyEmail)
userRouter.post("/forgot-password",forgetPassword)
userRouter.put("/reset-password",resetPassword)
userRouter.put("/following/:id", verifyToken, followUser);
userRouter.get("/flw/:id", verifyToken, getPosts);
userRouter.put("/update-user/:id", verifyToken, updateUser);
userRouter.delete("/delete-user/:id", verifyToken, deleteUser);
userRouter.get("/posted-user/:id", getPostedUser);
userRouter.get("/suggestion-user/:id", getSuggestionUsers);
userRouter.get("/following/:id", getFollowingUsers);
userRouter.get("/followers/:id", getFollowers); 
userRouter.get("/all-users",verifyToken,allUsers)

export default userRouter;

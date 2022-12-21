import express from 'express'
import { createUser, deleteUser, followUser, getPosts, loginUser, updateUser } from '../controllers/userControllers.js'
import verifyToken from '../services/verifyToken.js'
import { loginValidation, userValidation } from '../validations/userValidations.js'

const userRouter = express.Router()

userRouter.post("/create-user",userValidation,createUser)
userRouter.post('/login',loginValidation,loginUser)
userRouter.put("/following/:id",verifyToken,followUser)
userRouter.get("/flw/:id",verifyToken,getPosts)
userRouter.put("/update-user/:id",verifyToken,updateUser)
userRouter.delete("/delete-user/:id",verifyToken,deleteUser)

export default userRouter
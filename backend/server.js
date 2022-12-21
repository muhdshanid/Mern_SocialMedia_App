import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import cors from 'cors'
import userRouter from './routes/userRoutes.js'
import postRouter from './routes/postRoutes.js'
dotenv.config()
const PORT = process.env.PORT || 5000

const app = express() 

connectDB()

app.use(express.json())
app.use(cors()) 
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import cors from 'cors'
import userRouter from './routes/userRoutes.js'
import postRouter from './routes/postRoutes.js'
import messageRouter from './routes/messageRouter.js'
import {Server} from 'socket.io'
dotenv.config()
const PORT = process.env.PORT || 5000

const app = express() 

connectDB()

app.use(express.json())
app.use(cors()) 
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)
app.use("/api/message",messageRouter)


const server = app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})

const io =new  Server(server,{
    cors:{
        origin:"http://localhost:3000",
        credetials:true
    }
})

global.onlineUsers = new Map();
io.on("connection",(socket)=>{
    global.chatsocket = socket;
    socket.on("addUser",(id)=>{
        onlineUsers.set(id,socket.id);
    })

    socket.on("sendMsg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.message)
        }
    })
})
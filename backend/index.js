import cookieParser from "cookie-parser";
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { createServer } from "http"
import { Server } from "socket.io"
import dbConnect from "./DB/dbConnect.js"
import authRouter from "./rout/authUser.js"
import messageRouter from "./rout/messageRout.js"
import userRouter from "./rout/userRout.js"

dotenv.config();
const app = express();
const httpServer = createServer(app)

export const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true
  }
})

// Store online users
const userSocketMap = {}  // { userId: socketId }

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]
}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  const userId = socket.handshake.query.userId
  if (userId) userSocketMap[userId] = socket.id

  io.emit('getOnlineUsers', Object.keys(userSocketMap))

  // ✅ ADD THESE TWO
  socket.on('typing', ({ receiverId }) => {
    const receiverSocketId = getReceiverSocketId(receiverId)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('typing', { senderId: userId })
    }
  })

  socket.on('stopTyping', ({ receiverId }) => {
    const receiverSocketId = getReceiverSocketId(receiverId)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('stopTyping', { senderId: userId })
    }
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
    delete userSocketMap[userId]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter)
app.use('/api/message', messageRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => res.send("Server is working"))

const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
  dbConnect();
  console.log(`Working at ${PORT}`);
})
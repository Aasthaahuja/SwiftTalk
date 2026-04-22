import cookieParser from "cookie-parser";
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { createServer } from "http"
import { Server } from "socket.io"
import path from 'path';
import { fileURLToPath } from 'url';
import dbConnect from "./DB/dbConnect.js"
import authRouter from "./rout/authUser.js"
import messageRouter from "./rout/messageRout.js"
import userRouter from "./rout/userRout.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const httpServer = createServer(app)

export const io = new Server(httpServer, {
  cors: {
    origin: [
      'http://localhost:5173',
      'https://swifttalk-frontend-o1dr.onrender.com'
    ],
    credentials: true
  }
})

const userSocketMap = {}

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]
}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)
  const userId = socket.handshake.query.userId
  if (userId) userSocketMap[userId] = socket.id
  io.emit('getOnlineUsers', Object.keys(userSocketMap))

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
  origin: [
    'http://localhost:5173',
    'https://swifttalk-frontend-o1dr.onrender.com'
  ],
  credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter)
app.use('/api/message', messageRouter)
app.use('/api/user', userRouter)

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
  dbConnect();
  console.log(`Working at ${PORT}`);
})
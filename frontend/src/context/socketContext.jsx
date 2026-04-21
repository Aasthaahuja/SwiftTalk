import { BASE_URL } from '../config'
import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { AuthContext } from './AuthContext'

export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (!user) return

    const newSocket = io(BASE_URL, {  // 👈 only this line changed
      query: { userId: user._id }
    })

    newSocket.on('getOnlineUsers', (users) => {
      setOnlineUsers(users)
    })

    setSocket(newSocket)

    return () => newSocket.close()
  }, [user])

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  )
}
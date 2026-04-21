import { BASE_URL } from '../config'
import { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { SocketContext } from '../context/socketContext'
import MessageInput from './MessageInput'

export default function ChatWindow({ selectedUser }) {
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const { user } = useContext(AuthContext)
  const { socket } = useContext(SocketContext)
  const bottomRef = useRef()
  const typingTimeoutRef = useRef()

  useEffect(() => {
    if (!selectedUser) return
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/message/${selectedUser._id}`,
          { withCredentials: true }
        )
        setMessages(res.data)
      } catch (err) { console.error(err) }
    }
    fetchMessages()
  }, [selectedUser])

  useEffect(() => {
    if (!socket || !selectedUser) return
    const handleNewMessage = (msg) => {
      if (msg.senderId === selectedUser._id) {
        setMessages(prev => [...prev, { ...msg, seen: false }])
        setIsTyping(false)
        setTimeout(() => {
          setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, seen: true } : m))
        }, 1000)
      }
    }
    const handleTyping = ({ senderId }) => { if (senderId === selectedUser._id) setIsTyping(true) }
    const handleStopTyping = ({ senderId }) => { if (senderId === selectedUser._id) setIsTyping(false) }
    socket.on('newMessage', handleNewMessage)
    socket.on('typing', handleTyping)
    socket.on('stopTyping', handleStopTyping)
    return () => {
      socket.off('newMessage', handleNewMessage)
      socket.off('typing', handleTyping)
      socket.off('stopTyping', handleStopTyping)
    }
  }, [socket, selectedUser])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, isTyping])

  const sendMessage = async (text) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/message/send/${selectedUser._id}`,
        { message: text }, { withCredentials: true }
      )
      setMessages(prev => [...prev, { ...res.data, seen: false }])
      setTimeout(() => {
        setMessages(prev => prev.map(m => m._id === res.data._id ? { ...m, seen: true } : m))
      }, 2000)
    } catch (err) { console.error(err) }
  }

  const handleTyping = (isCurrentlyTyping) => {
    if (!socket || !selectedUser) return
    if (isCurrentlyTyping) {
      socket.emit('typing', { receiverId: selectedUser._id })
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('stopTyping', { receiverId: selectedUser._id })
      }, 1500)
    } else {
      socket.emit('stopTyping', { receiverId: selectedUser._id })
    }
  }

  const formatTime = (dateStr) => new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  if (!selectedUser) return (
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#f8f7ff',
      backgroundImage: 'radial-gradient(#e0e7ff 1.5px, transparent 1.5px)',
      backgroundSize: '24px 24px',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '72px', height: '72px', borderRadius: '20px',
          background: 'linear-gradient(135deg, #4F46E5, #7c3aed)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '32px', margin: '0 auto 20px',
          boxShadow: '0 8px 32px rgba(79,70,229,0.3)'
        }}>💬</div>
        <p style={{ fontSize: '18px', fontWeight: '700', color: '#1e1b4b', margin: '0 0 8px' }}>
          Start a conversation
        </p>
        <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
          Select someone from the sidebar to chat
        </p>
      </div>
    </div>
  )

  const recipientInitials = selectedUser.fullname?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div style={{
        padding: '14px 24px',
        borderBottom: '1px solid #ede9fe',
        display: 'flex', alignItems: 'center', gap: '14px',
        background: '#fff',
        boxShadow: '0 1px 3px rgba(79,70,229,0.06)'
      }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            overflow: 'hidden', border: '2px solid #ede9fe',
            background: '#EEF2FF',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {selectedUser.profilepic ? (
              <img src={selectedUser.profilepic} alt={selectedUser.fullname}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#4F46E5' }}>
                {recipientInitials}
              </span>
            )}
          </div>
          <div style={{
            position: 'absolute', bottom: 1, right: 1,
            width: '11px', height: '11px', borderRadius: '50%',
            background: '#22c55e', border: '2px solid #fff'
          }} />
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: '700', fontSize: '15px', color: '#1e1b4b' }}>
            {selectedUser.fullname}
          </p>
          <p style={{
            margin: 0, fontSize: '12px',
            color: isTyping ? '#4F46E5' : '#22c55e',
            fontWeight: '500', transition: 'color 0.2s'
          }}>
            {isTyping ? '✏️ typing...' : '● Online'}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '24px',
        display: 'flex', flexDirection: 'column', gap: '6px',
        background: '#f8f7ff',
        backgroundImage: 'radial-gradient(#e0e7ff 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px',
      }}>
        {messages.map((msg, i) => {
          const isMe = msg.senderId === user._id
          return (
            <div key={msg._id || i} style={{
              display: 'flex',
              justifyContent: isMe ? 'flex-end' : 'flex-start',
              marginBottom: '2px'
            }}>
              <div style={{
                maxWidth: '62%',
                background: isMe ? 'linear-gradient(135deg, #4F46E5, #6d28d9)' : '#fff',
                color: isMe ? '#fff' : '#1e1b4b',
                borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                padding: '10px 14px',
                boxShadow: isMe
                  ? '0 4px 12px rgba(79,70,229,0.3)'
                  : '0 1px 4px rgba(0,0,0,0.08)',
                border: isMe ? 'none' : '1px solid #ede9fe'
              }}>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
                  {msg.message}
                </p>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'flex-end', gap: '4px', marginTop: '4px'
                }}>
                  <span style={{ fontSize: '10px', color: isMe ? 'rgba(255,255,255,0.55)' : '#9ca3af' }}>
                    {formatTime(msg.createdAt)}
                  </span>
                  {isMe && (
                    <span style={{
                      fontSize: '11px',
                      color: msg.seen ? '#93c5fd' : 'rgba(255,255,255,0.4)',
                      transition: 'color 0.3s'
                    }}>
                      {msg.seen ? '✓✓' : '✓'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              background: '#fff', border: '1px solid #ede9fe',
              borderRadius: '18px 18px 18px 4px',
              padding: '12px 18px',
              display: 'flex', alignItems: 'center', gap: '5px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: '#a5b4fc',
                  animation: 'typingBounce 1.2s infinite',
                  animationDelay: `${i * 0.2}s`
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>

      <MessageInput onSend={sendMessage} onTyping={handleTyping} />
    </div>
  )
}
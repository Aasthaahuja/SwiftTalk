import { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import ChatWindow from '../components/ChatWindow.jsx'

export default function Home() {
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <div className="flex h-screen bg-base-200">
      <Sidebar selectedUser={selectedUser} onSelectUser={setSelectedUser} />
      <ChatWindow selectedUser={selectedUser} />
    </div>
  )
}
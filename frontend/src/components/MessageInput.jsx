import { useState } from 'react'

export default function MessageInput({ onSend, onTyping }) {
  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
    onTyping(e.target.value.length > 0)
  }

  const handleSend = () => {
    if (!text.trim()) return
    onSend(text)
    setText('')
    onTyping(false)
  }

  return (
    <div style={{
      padding: '16px 20px',
      background: '#fff',
      borderTop: '1px solid #f0f0f0',
      display: 'flex', alignItems: 'center', gap: '10px',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <input
        type="text"
        placeholder="Message..."
        value={text}
        onChange={handleChange}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
        style={{
          flex: 1, padding: '12px 16px',
          border: '1px solid #e5e7eb',
          borderRadius: '24px', fontSize: '14px',
          outline: 'none', background: '#f9fafb',
          fontFamily: "'DM Sans', sans-serif",
          color: '#1a1a1a'
        }}
      />
      <button
        onClick={handleSend}
        style={{
          width: '42px', height: '42px',
          borderRadius: '50%',
          background: text.trim() ? '#4F46E5' : '#e5e7eb',
          border: 'none', cursor: text.trim() ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s', flexShrink: 0
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M22 2L11 13" stroke={text.trim() ? '#fff' : '#9ca3af'} strokeWidth="2" strokeLinecap="round"/>
          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={text.trim() ? '#fff' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}
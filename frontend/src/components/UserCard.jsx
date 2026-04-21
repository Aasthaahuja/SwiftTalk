import { useContext } from 'react'
import { SocketContext } from '../context/SocketContext'

export default function UserCard({ user, isSelected, onClick }) {
  const { onlineUsers } = useContext(SocketContext)
  const isOnline = onlineUsers.includes(user._id)
  const initials = user.fullname?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '10px 16px', cursor: 'pointer',
        transition: 'background 0.15s',
        background: isSelected ? 'rgba(165,180,252,0.15)' : 'transparent',
        borderLeft: isSelected ? '3px solid #a5b4fc' : '3px solid transparent',
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative'
      }}
      onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
      onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}
    >
      {/* Avatar */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '50%',
          overflow: 'hidden',
          border: isSelected ? '2px solid #a5b4fc' : '2px solid rgba(255,255,255,0.1)',
          background: '#312e81',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'border-color 0.15s'
        }}>
          {user.profilepic ? (
            <img
              src={user.profilepic}
              alt={user.fullname}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={e => {
                e.target.style.display = 'none'
                e.target.parentElement.querySelector('.fallback-initials').style.display = 'flex'
              }}
            />
          ) : null}
          <span
            className="fallback-initials"
            style={{
              display: user.profilepic ? 'none' : 'flex',
              alignItems: 'center', justifyContent: 'center',
              width: '100%', height: '100%',
              fontSize: '13px', fontWeight: '700',
              color: isSelected ? '#a5b4fc' : 'rgba(255,255,255,0.6)'
            }}
          >
            {initials}
          </span>
        </div>

        {/* Online dot */}
        {isOnline && (
          <div style={{
            position: 'absolute', bottom: 1, right: 1,
            width: '10px', height: '10px', borderRadius: '50%',
            background: '#22c55e',
            border: '2px solid #1e1b4b',
            boxShadow: '0 0 0 1px #22c55e'
          }} />
        )}
      </div>

      {/* Text */}
      <div style={{ minWidth: 0, flex: 1 }}>
        <p style={{
          margin: 0, fontSize: '13px', fontWeight: '600',
          color: isSelected ? '#a5b4fc' : '#fff',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          transition: 'color 0.15s'
        }}>
          {user.fullname}
        </p>
        <p style={{
          margin: 0, fontSize: '11px',
          color: isOnline ? '#4ade80' : 'rgba(255,255,255,0.3)',
          fontWeight: isOnline ? '500' : '400'
        }}>
          {isOnline ? '● Online' : 'Offline'}
        </p>
      </div>
    </div>
  )
}
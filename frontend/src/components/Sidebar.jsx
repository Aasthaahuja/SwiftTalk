import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import UserCard from './UserCard'

export default function Sidebar({ selectedUser, onSelectUser }) {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const { user, logout } = useContext(AuthContext)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/user/search?search=${search}`,
          { withCredentials: true }
        )
        setUsers(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchUsers()
  }, [search])

  const initials = user?.fullname?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div style={{
      width: '280px', minWidth: '280px',
      background: 'linear-gradient(180deg, #1e1b4b 0%, #2d2a6e 100%)',
      display: 'flex', flexDirection: 'column',
      height: '100vh',
      fontFamily: "'DM Sans', sans-serif",
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: '-60px', right: '-60px',
        width: '200px', height: '200px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.03)', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-40px',
        width: '160px', height: '160px', borderRadius: '50%',
        background: 'rgba(99,102,241,0.15)', pointerEvents: 'none'
      }} />

      {/* Logo */}
      <div style={{
        padding: '22px 20px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'relative', zIndex: 1
      }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>
          <span style={{ color: '#a5b4fc' }}>Swift</span>
          <span style={{ color: '#fff' }}>Talk</span>
        </h1>
      </div>

      {/* Current user */}
      <div style={{
        padding: '14px 20px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'relative', zIndex: 1
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Avatar with profile pic support */}
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%',
            overflow: 'hidden', flexShrink: 0,
            border: '2px solid rgba(165,180,252,0.4)',
            background: '#312e81',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {user?.profilepic ? (
              <img
                src={user.profilepic}
                alt={user.fullname}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
              />
            ) : null}
            <span style={{
              display: user?.profilepic ? 'none' : 'flex',
              alignItems: 'center', justifyContent: 'center',
              width: '100%', height: '100%',
              fontSize: '13px', fontWeight: '700', color: '#a5b4fc'
            }}>
              {initials}
            </span>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#fff' }}>
              {user?.fullname}
            </p>
            <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
              @{user?.username}
            </p>
          </div>
        </div>
        <button onClick={logout} style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '8px', padding: '5px 10px',
          fontSize: '12px', color: 'rgba(255,255,255,0.6)',
          cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
          transition: 'all 0.15s'
        }}
          onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.08)'}
        >
          Logout
        </button>
      </div>

      {/* Search */}
      <div style={{ padding: '12px 16px', position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'relative' }}>
          <svg style={{
            position: 'absolute', left: '10px', top: '50%',
            transform: 'translateY(-50%)', opacity: 0.4
          }} width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search people..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '8px 12px 8px 30px',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '10px', fontSize: '13px', outline: 'none',
              background: 'rgba(255,255,255,0.08)', boxSizing: 'border-box',
              fontFamily: "'DM Sans', sans-serif", color: '#fff',
            }}
          />
        </div>
      </div>

      {/* Label */}
      <p style={{
        margin: '0 20px 8px', fontSize: '10px', fontWeight: '700',
        color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em',
        textTransform: 'uppercase', position: 'relative', zIndex: 1
      }}>
        People
      </p>

      {/* User list */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 1 }}>
        <style>{`
          .sidebar-scroll::-webkit-scrollbar { width: 4px; }
          .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
          .sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
          input::placeholder { color: rgba(255,255,255,0.3) !important; }
        `}</style>
        {users.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '13px', marginTop: '32px' }}>
            No users found
          </p>
        ) : (
          users.map(u => (
            <UserCard
              key={u._id}
              user={u}
              isSelected={selectedUser?._id === u._id}
              onClick={() => onSelectUser(u)}
            />
          ))
        )}
      </div>
    </div>
  )
}
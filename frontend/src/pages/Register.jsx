import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({
    fullname: '', username: '', email: '', password: '', gender: 'male'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await axios.post(
        'http://localhost:3000/api/auth/register',
        form,
        { withCredentials: true }
      )
      login(res.data)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    border: '1.5px solid #e5e7eb', borderRadius: '10px',
    fontSize: '14px', outline: 'none', boxSizing: 'border-box',
    fontFamily: "'DM Sans', sans-serif", color: '#0f0f0f',
    transition: 'border-color 0.2s', background: '#fff'
  }

  const labelStyle = {
    fontSize: '13px', fontWeight: '500', color: '#374151',
    display: 'block', marginBottom: '6px'
  }

  return (
    <div style={{
      display: 'flex', height: '100vh', width: '100vw',
      fontFamily: "'DM Sans', sans-serif", overflow: 'hidden'
    }}>
      {/* Left Panel */}
      <div style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 70%, #6d28d9 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '60px'
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '320px', height: '320px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '280px', height: '280px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '65%',
          width: '140px', height: '140px', borderRadius: '50%',
          background: 'rgba(167,139,250,0.12)', pointerEvents: 'none'
        }} />

        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px', pointerEvents: 'none'
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', maxWidth: '380px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '18px',
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px', fontSize: '28px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            💬
          </div>
          <h1 style={{
            fontSize: '42px', fontWeight: '800', margin: '0 0 12px',
            letterSpacing: '-1px', lineHeight: 1.1
          }}>
            SwiftTalk
          </h1>
          <p style={{
            fontSize: '16px', color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.6, margin: '0 0 40px'
          }}>
            Join thousands of people already<br />chatting on SwiftTalk.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
            {[['💬', 'Real-time', 'Messaging'], ['🔒', 'End-to-end', 'Privacy'], ['⚡', 'Instant', 'Delivery']].map(([icon, title, sub], i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '14px', padding: '16px 12px',
                textAlign: 'center', flex: 1
              }}>
                <div style={{ fontSize: '22px', marginBottom: '6px' }}>{icon}</div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#fff' }}>{title}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{
        width: '480px', minWidth: '480px',
        background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 56px', overflowY: 'auto'
      }}>
        <div style={{ width: '100%', maxWidth: '340px' }}>
          <h2 style={{
            fontSize: '28px', fontWeight: '700', color: '#0f0f0f',
            margin: '0 0 6px', letterSpacing: '-0.5px'
          }}>
            Create account
          </h2>
          <p style={{ fontSize: '14px', color: '#9ca3af', margin: '0 0 28px' }}>
            Start chatting in seconds
          </p>

          {error && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fecaca',
              borderRadius: '10px', padding: '10px 14px',
              fontSize: '13px', color: '#dc2626', marginBottom: '20px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Full Name + Username side by side */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Full Name</label>
                <input type="text" placeholder="John Doe" style={inputStyle}
                  value={form.fullname}
                  onChange={e => setForm({ ...form, fullname: e.target.value })}
                  onFocus={e => e.target.style.borderColor = '#4F46E5'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  required />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Username</label>
                <input type="text" placeholder="johndoe" style={inputStyle}
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                  onFocus={e => e.target.style.borderColor = '#4F46E5'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  required />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Email address</label>
              <input type="email" placeholder="you@example.com" style={inputStyle}
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                onFocus={e => e.target.style.borderColor = '#4F46E5'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                required />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Password</label>
              <input type="password" placeholder="••••••••" style={inputStyle}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                onFocus={e => e.target.style.borderColor = '#4F46E5'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                required />
            </div>

            {/* Gender toggle */}
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Gender</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['male', 'female'].map(g => (
                  <button
                    key={g} type="button"
                    onClick={() => setForm({ ...form, gender: g })}
                    style={{
                      flex: 1, padding: '10px',
                      border: `1.5px solid ${form.gender === g ? '#4F46E5' : '#e5e7eb'}`,
                      borderRadius: '10px', cursor: 'pointer',
                      background: form.gender === g ? '#EEF2FF' : '#fff',
                      color: form.gender === g ? '#4F46E5' : '#6b7280',
                      fontSize: '13px', fontWeight: '500',
                      fontFamily: "'DM Sans', sans-serif",
                      transition: 'all 0.15s'
                    }}
                  >
                    {g === 'male' ? '👨 Male' : '👩 Female'}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '12px',
                background: loading ? '#a5b4fc' : '#4F46E5',
                color: '#fff', border: 'none', borderRadius: '10px',
                fontSize: '15px', fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'background 0.2s', marginBottom: '20px'
              }}
            >
              {loading ? 'Creating account...' : 'Create account →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#9ca3af', margin: 0 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#4F46E5', fontWeight: '600', textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
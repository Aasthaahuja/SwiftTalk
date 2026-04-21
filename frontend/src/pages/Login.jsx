import { BASE_URL } from '../config'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
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
        '${BASE_URL}/api/auth/login',
        form,
        { withCredentials: true }
      )
      login(res.data)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
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
          position: 'absolute', top: '-80px', left: '-80px',
          width: '320px', height: '320px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', right: '-60px',
          width: '280px', height: '280px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '60%',
          width: '160px', height: '160px', borderRadius: '50%',
          background: 'rgba(167,139,250,0.15)', pointerEvents: 'none'
        }} />

        {/* Grid pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px', pointerEvents: 'none'
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', maxWidth: '380px' }}>
          {/* Logo */}
          <div style={{
            width: '64px', height: '64px', borderRadius: '18px',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
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
            lineHeight: 1.6, margin: '0 0 48px'
          }}>
            Connect instantly. Chat seamlessly.<br />Your conversations, reimagined.
          </p>

          {/* Feature pills */}
          {['⚡ Real-time messaging', '🔒 Secure & private', '👥 See who\'s online'].map((f, i) => (
            <div key={i} style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '100px', padding: '8px 16px',
              fontSize: '13px', color: 'rgba(255,255,255,0.85)',
              margin: '4px', backdropFilter: 'blur(4px)'
            }}>
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div style={{
        width: '480px', minWidth: '480px',
        background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '60px 56px'
      }}>
        <div style={{ width: '100%', maxWidth: '340px' }}>
          <h2 style={{
            fontSize: '28px', fontWeight: '700', color: '#0f0f0f',
            margin: '0 0 6px', letterSpacing: '-0.5px'
          }}>
            Welcome back
          </h2>
          <p style={{ fontSize: '14px', color: '#9ca3af', margin: '0 0 32px' }}>
            Sign in to continue to SwiftTalk
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
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '6px' }}>
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                style={{
                  width: '100%', padding: '11px 14px',
                  border: '1.5px solid #e5e7eb', borderRadius: '10px',
                  fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                  fontFamily: "'DM Sans', sans-serif", color: '#0f0f0f',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = '#4F46E5'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '13px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '6px' }}>
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                style={{
                  width: '100%', padding: '11px 14px',
                  border: '1.5px solid #e5e7eb', borderRadius: '10px',
                  fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                  fontFamily: "'DM Sans', sans-serif", color: '#0f0f0f',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = '#4F46E5'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '12px',
                background: loading ? '#a5b4fc' : '#4F46E5',
                color: '#fff', border: 'none', borderRadius: '10px',
                fontSize: '15px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'background 0.2s', marginBottom: '20px'
              }}
            >
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#9ca3af', margin: 0 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#4F46E5', fontWeight: '600', textDecoration: 'none' }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
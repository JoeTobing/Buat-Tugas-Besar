import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        const savedUser = localStorage.getItem('user')
        
        if (token && savedUser) {
          try {
            setUser(JSON.parse(savedUser))
            // Verify token is still valid
            const { data } = await authService.me()
            if (data.success) {
              setUser(data.data)
              localStorage.setItem('user', JSON.stringify(data.data))
            } else {
              logout()
            }
          } catch (error) {
            // Token invalid, clear everything
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            setUser(null)
          }
        }
      } catch (error) {
        console.error('Auth init error:', error)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email, password) => {
    const { data } = await authService.login({ email, password })
    if (data.success) {
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('user', JSON.stringify(data.data.user))
      setUser(data.data.user)
      return data
    }
    throw new Error(data.message || 'Login failed')
  }

  const register = async (userData) => {
    const { data } = await authService.register(userData)
    if (data.success) {
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('user', JSON.stringify(data.data.user))
      setUser(data.data.user)
      return data
    }
    throw new Error(data.message || 'Registration failed')
  }

  const registerTechnician = async (userData) => {
    const { data } = await authService.registerTechnician(userData)
    if (data.success) {
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('user', JSON.stringify(data.data.user))
      setUser(data.data.user)
      return data
    }
    throw new Error(data.message || 'Registration failed')
  }

  const value = {
    user,
    loading,
    login,
    register,
    registerTechnician,
    logout,
    isAuthenticated: !!user,
    isCustomer: user?.role === 'CUSTOMER',
    isTechnician: user?.role === 'TECHNICIAN',
    isAdmin: user?.role === 'ADMIN',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

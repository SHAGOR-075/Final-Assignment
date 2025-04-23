import { create } from 'zustand'
import axios from 'axios'

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  
  // Register a new user
  register: async (userData) => {
    try {
      const response = await axios.post('/api/auth/register', userData)
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      throw new Error(message)
    }
  },
  
  // Login user
  login: async (credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials)
      const { token, user } = response.data
      
      // Store token in localStorage
      localStorage.setItem('token', token)
      
      // Set auth headers for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      set({ user, isAuthenticated: true, error: null })
      return user
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      set({ error: message })
      throw new Error(message)
    }
  },
  
  // Logout user
  logout: () => {
    // Remove token from localStorage
    localStorage.removeItem('token')
    
    // Remove auth header
    delete axios.defaults.headers.common['Authorization']
    
    set({ user: null, isAuthenticated: false, error: null })
  },
  
  // Check if user is authenticated (on app load)
  checkAuthStatus: async () => {
    set({ isLoading: true })
    
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        set({ isLoading: false })
        return false
      }
      
      // Set auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      // Verify token and get user data
      const response = await axios.get('/api/auth/me')
      set({ 
        user: response.data, 
        isAuthenticated: true, 
        isLoading: false,
        error: null
      })
      
      return true
    } catch (error) {
      // Token is invalid or expired
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: 'Authentication failed'
      })
      
      return false
    }
  }
}))

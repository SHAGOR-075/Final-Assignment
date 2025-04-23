import { create } from 'zustand'
import axios from 'axios'

export const useEventStore = create((set, get) => ({
  events: [],
  userEvents: [],
  savedEvents: [],
  savedEventDetails: [],
  isLoading: false,
  error: null,
  
  // Fetch all events with optional filters
  fetchEvents: async (filters = {}) => {
    set({ isLoading: true })
    
    try {
      let url = '/api/events'
      const params = new URLSearchParams()
      
      if (filters.category) params.append('category', filters.category)
      if (filters.search) params.append('search', filters.search)
      if (filters.sort) params.append('sort', filters.sort)
      if (filters.limit) params.append('limit', filters.limit)
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      const response = await axios.get(url)
      set({ events: response.data, isLoading: false, error: null })
      return response.data
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || 'Failed to fetch events' 
      })
      throw error
    }
  },
  
  // Fetch a single event by ID
  fetchEventById: async (id) => {
    set({ isLoading: true })
    
    try {
      const response = await axios.get(`/api/events/${id}`)
      set({ isLoading: false, error: null })
      return response.data
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || 'Failed to fetch event' 
      })
      throw error
    }
  },
  
  // Fetch events created by the logged-in user
  fetchUserEvents: async () => {
    set({ isLoading: true })
    
    try {
      const response = await axios.get('/api/events/user')
      set({ userEvents: response.data, isLoading: false, error: null })
      return response.data
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || 'Failed to fetch user events' 
      })
      throw error
    }
  },
  
  // Create a new event
  createEvent: async (eventData) => {
    set({ isLoading: true })
    
    try {
      const response = await axios.post('/api/events', eventData)
      
      // Update userEvents state
      set(state => ({ 
        userEvents: [...state.userEvents, response.data],
        isLoading: false, 
        error: null 
      }))
      
      return response.data
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || 'Failed to create event' 
      })
      throw error
    }
  },
  
  // Update an existing event
  updateEvent: async (id, eventData) => {
    set({ isLoading: true })
    
    try {
      const response = await axios.put(`/api/events/${id}`, eventData)
      
      // Update userEvents state
      set(state => ({
        userEvents: state.userEvents.map(event => 
          event._id === id ? response.data : event
        ),
        isLoading: false,
        error: null
      }))
      
      return response.data
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || 'Failed to update event' 
      })
      throw error
    }
  },
  
  // Delete an event
  deleteEvent: async (id) => {
    set({ isLoading: true })
    
    try {
      await axios.delete(`/api/events/${id}`)
      
      // Update userEvents state
      set(state => ({
        userEvents: state.userEvents.filter(event => event._id !== id),
        isLoading: false,
        error: null
      }))
      
      return true
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || 'Failed to delete event' 
      })
      throw error
    }
  },
  
  // Save/unsave an event
  toggleSaveEvent: async (eventId) => {
    try {
      await axios.post(`/api/events/${eventId}/save`)
      
      // Update savedEvents state
      set(state => {
        const isSaved = state.savedEvents.includes(eventId)
        
        if (isSaved) {
          return {
            savedEvents: state.savedEvents.filter(id => id !== eventId),
            savedEventDetails: state.savedEventDetails.filter(event => event._id !== eventId)
          }
        } else {
          return {
            savedEvents: [...state.savedEvents, eventId]
          }
        }
      })
      
      // Refresh saved events details if we just added one
      if (!get().savedEvents.includes(eventId)) {
        get().fetchSavedEvents()
      }
      
      return true
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to save/unsave event' 
      })
      throw error
    }
  },
  
  // Fetch saved events
  fetchSavedEvents: async () => {
    set({ isLoading: true })
    
    try {
      const response = await axios.get('/api/events/saved')
      
      // Extract event IDs and full event details
      const eventIds = response.data.map(event => event._id)
      
      set({ 
        savedEvents: eventIds,
        savedEventDetails: response.data,
        isLoading: false, 
        error: null 
      })
      
      return response.data
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || 'Failed to fetch saved events' 
      })
      throw error
    }
  }
}))

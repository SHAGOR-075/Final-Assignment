
import { users, events } from './mockData.js'

// User Model
export const User = {
  findOne: async (query) => {
    if (query.email) {
      return users.find(user => user.email === query.email) || null
    }
    return null
  },
  
  findById: async (id) => {
    const user = users.find(user => user._id === id)
    
    if (!user) return null
    
    // password, remove password field
    return {
      ...user,
      select: (fields) => {
        if (fields === '-password') {
          const { password, ...userWithoutPassword } = user
          return userWithoutPassword
        }
        return user
      },
      populate: (field) => {
        if (field === 'savedEvents') {
          return {
            ...user,
            savedEvents: user.savedEvents.map(eventId => 
              events.find(event => event._id === eventId)
            ).filter(Boolean)
          }
        }
        return user
      }
    }
  },
  
  create: async (userData) => {
    const newUser = {
      _id: `user_${Date.now()}`,
      ...userData,
      savedEvents: [],
      createdAt: new Date()
    }
    users.push(newUser)
    return newUser
  },
  
  findByIdAndUpdate: async (id, update) => {
    const userIndex = users.findIndex(user => user._id === id)
    
    if (userIndex === -1) return null
    
    if (update.$addToSet && update.$addToSet.savedEvents) {
      if (!users[userIndex].savedEvents.includes(update.$addToSet.savedEvents)) {
        users[userIndex].savedEvents.push(update.$addToSet.savedEvents)
      }
    }
    
    if (update.$pull && update.$pull.savedEvents) {
      users[userIndex].savedEvents = users[userIndex].savedEvents.filter(
        eventId => eventId !== update.$pull.savedEvents
      )
    }
    
    return users[userIndex]
  }
}

// Event Model
export const Event = {
  find: (query = {}) => {
    let filteredEvents = [...events]
    
    // Filter by creator
    if (query.creator) {
      filteredEvents = filteredEvents.filter(event => event.creator === query.creator)
    }
    
    // Filter by category
    if (query.category) {
      filteredEvents = filteredEvents.filter(event => event.category === query.category)
    }
    
    // Text search
    if (query.$or) {
      const searchQueries = query.$or.map(q => {
        const field = Object.keys(q)[0]
        const value = q[field].$regex.toLowerCase()
        return { field, value }
      })
      
      filteredEvents = filteredEvents.filter(event => 
        searchQueries.some(sq => 
          event[sq.field] && event[sq.field].toLowerCase().includes(sq.value)
        )
      )
    }
    
    return {
      sort: (sortOptions) => {
        if (sortOptions.date === 1) {
          filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date))
        } else if (sortOptions.date === -1) {
          filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date))
        } else if (sortOptions.title === 1) {
          filteredEvents.sort((a, b) => a.title.localeCompare(b.title))
        } else if (sortOptions.title === -1) {
          filteredEvents.sort((a, b) => b.title.localeCompare(a.title))
        } else if (sortOptions.createdAt === -1) {
          filteredEvents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        }
        
        return {
          limit: (num) => filteredEvents.slice(0, num),
          exec: async () => filteredEvents
        }
      },
      exec: async () => filteredEvents
    }
  },
  
  findById: async (id) => {
    return events.find(event => event._id === id) || null
  },
  
  create: async (eventData) => {
    const newEvent = {
      _id: `event_${Date.now()}`,
      ...eventData,
      createdAt: new Date()
    }
    events.push(newEvent)
    return newEvent
  },
  
  deleteOne: async function() {
    const eventIndex = events.findIndex(event => event._id === this._id)
    if (eventIndex !== -1) {
      events.splice(eventIndex, 1)
    }
  }
}

// mongoose
export const mongoose = {
  connect: async () => {
    console.log('Mock MongoDB connected')
    return { connection: { host: 'mockdb' } }
  },
  
  Schema: function(schemaObj) {
    this.obj = schemaObj
    this.pre = () => this
    this.methods = {}
    this.index = () => this
    return this
  },
  
  model: (modelName, schema) => {
    if (modelName === 'User') return User
    if (modelName === 'Event') return Event
    return {}
  },
  
  Types: {
    ObjectId: {
      
    }
  }
}

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'

// Import routes
import authRoutes from './routes/authRoutes.js'
import eventRoutes from './routes/eventRoutes.js'

// Load environment variables
dotenv.config()

// Create Express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Event Listing API' })
})

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://eventlistingplatform:event1234@event-listing-platform.yjaugy2.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error.message)
    process.exit(1)
  }
}

// Start server
const PORT = process.env.PORT || 5000

// Call connectDB before starting the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})

export default app

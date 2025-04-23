import express from 'express'
import { 
  getEvents, 
  getEventById, 
  createEvent, 
  updateEvent, 
  deleteEvent,
  getUserEvents,
  toggleSaveEvent,
  getSavedEvents
} from '../controllers/eventController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public routes
router.get('/saved', protect, getSavedEvents)     
router.get('/user', protect, getUserEvents)       
router.get('/', getEvents)
router.get('/:id', getEventById)                  

// Protected routes
router.post('/', protect, createEvent)
router.put('/:id', protect, updateEvent)
router.delete('/:id', protect, deleteEvent)
router.post('/:id/save', protect, toggleSaveEvent)

export default router

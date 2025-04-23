import Event from '../models/Event.js'
import User from '../models/User.js'

// Get all events with optional filters

export const getEvents = async (req, res) => {
  try {
    const { category, search, sort, limit } = req.query
    
    // Build query
    const query = {}
    
    // Filter by category
    if (category) {
      query.category = category
    }
    
    // Search by text
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ]
    }
    
    // Build sort options
    let sortOptions = {}
    
    if (sort) {
      switch (sort) {
        case 'date-asc':
          sortOptions = { date: 1 }
          break
        case 'date-desc':
          sortOptions = { date: -1 }
          break
        case 'title-asc':
          sortOptions = { title: 1 }
          break
        case 'title-desc':
          sortOptions = { title: -1 }
          break
        default:
          sortOptions = { date: 1 }
      }
    } else {
      // Default sort by date ascending
      sortOptions = { date: 1 }
    }
    
    // Execute query
    let eventsQuery = Event.find(query).sort(sortOptions)
    
    // Apply limit if provided
    if (limit) {
      eventsQuery = eventsQuery.limit(parseInt(limit))
    }
    
    const events = await eventsQuery
    
    res.json(events)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get single event by ID

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    
    if (event) {
      res.json(event)
    } else {
      res.status(404).json({ message: 'Event not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Create a new event

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, category, image } = req.body
    
    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      category,
      image,
      creator: req.user._id
    })
    
    res.status(201).json(event)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Update an event

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }
    
    // Check if user is the creator of the event
    if (event.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this event' })
    }
    
    const { title, description, date, time, location, category, image } = req.body
    
    event.title = title || event.title
    event.description = description || event.description
    event.date = date || event.date
    event.time = time || event.time
    event.location = location || event.location
    event.category = category || event.category
    event.image = image || event.image
    
    const updatedEvent = await event.save()
    
    res.json(updatedEvent)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Delete an event

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }
    
    // Check if user is the creator of the event
    if (event.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this event' })
    }
    
    await event.deleteOne()
    
    res.json({ message: 'Event removed' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

//  Get events created by the logged-in user

export const getUserEvents = async (req, res) => {
  try {
    const events = await Event.find({ creator: req.user._id }).sort({ createdAt: -1 })
    
    res.json(events)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Save/unsave an event

export const toggleSaveEvent = async (req, res) => {
  try {
    const eventId = req.params.id
    const userId = req.user._id
    
    // Check if event exists
    const event = await Event.findById(eventId)
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }
    
    const user = await User.findById(userId)
    
    // Check if event is already saved
    const isEventSaved = user.savedEvents.includes(eventId)
    
    if (isEventSaved) {
      // Remove event from saved events
      await User.findByIdAndUpdate(userId, {
        $pull: { savedEvents: eventId }
      })
      
      res.json({ message: 'Event removed from saved events' })
    } else {
      // Add event to saved events
      await User.findByIdAndUpdate(userId, {
        $addToSet: { savedEvents: eventId }
      })
      
      res.json({ message: 'Event saved successfully' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get saved events

export const getSavedEvents = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('savedEvents')
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    res.json(user.savedEvents)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

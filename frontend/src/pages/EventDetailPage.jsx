import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useEventStore } from '../store/eventStore'
import { useAuthStore } from '../store/authStore'

const EventDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { fetchEventById, toggleSaveEvent, savedEvents, isLoading } = useEventStore()
  const { isAuthenticated, user } = useAuthStore()
  const [event, setEvent] = useState(null)
  const [isSaved, setIsSaved] = useState(false)
  
  useEffect(() => {
    const getEvent = async () => {
      try {
        const eventData = await fetchEventById(id)
        setEvent(eventData)
      } catch (error) {
        console.error('Failed to fetch event:', error)
      }
    }
    
    getEvent()
  }, [fetchEventById, id])
  
  useEffect(() => {
    if (savedEvents.length > 0) {
      setIsSaved(savedEvents.includes(id))
    }
  }, [savedEvents, id])
  
  const handleSaveToggle = () => {
    if (isAuthenticated) {
      toggleSaveEvent(id)
    } else {
      navigate('/login', { state: { from: `/events/${id}` } })
    }
  }
  
  const isOwner = event && isAuthenticated && user?._id === event.creator
  
  if (isLoading || !event) {
    return <LoadingSpinner />
  }
  
  return (
    <div className="py-12">
      <Container>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Event Image */}
          <div className="relative h-64 md:h-96 bg-gray-200">
            <img 
              src={event.image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} 
              alt={event.title}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/1200x600/cccccc/333333?text=Event+Image";
              }}
            />
            <div className="absolute top-4 left-4">
              <Badge variant="primary">
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </Badge>
            </div>
          </div>
          
          {/* Event Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">{event.title}</h1>
              
              <div className="flex space-x-2">
                {isOwner && (
                  <>
                    <Link 
                      to={`/dashboard/edit-event/${event._id}`}
                      className="btn btn-outline flex items-center"
                    >
                      <i className="bi bi-pencil mr-1"></i> Edit
                    </Link>
                  </>
                )}
                
                <Button 
                  variant={isSaved ? 'primary' : 'outline'}
                  onClick={handleSaveToggle}
                  className="flex items-center"
                >
                  <i className={`bi ${isSaved ? 'bi-bookmark-fill' : 'bi-bookmark'} mr-1`}></i>
                  {isSaved ? 'Saved' : 'Save Event'}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                  <i className="bi bi-calendar-event text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{format(new Date(event.date), 'MMMM dd, yyyy')}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                  <i className="bi bi-clock text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{event.time}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                  <i className="bi bi-geo-alt text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About This Event</h2>
              <div className="prose max-w-none text-gray-700">
                <p>{event.description}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="mb-4 sm:mb-0">
                  <p className="text-sm text-gray-500">Share this event</p>
                  <div className="flex space-x-4 mt-2">
                    <a href="#" className="text-gray-400 hover:text-primary-600">
                      <i className="bi bi-facebook text-xl"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary-600">
                      <i className="bi bi-twitter text-xl"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary-600">
                      <i className="bi bi-linkedin text-xl"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary-600">
                      <i className="bi bi-envelope text-xl"></i>
                    </a>
                  </div>
                </div>
                
                <Link to="/events" className="btn btn-outline flex items-center justify-center sm:justify-start">
                  <i className="bi bi-arrow-left mr-2"></i>
                  Back to Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default EventDetailPage

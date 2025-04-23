import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { useAuthStore } from '../../store/authStore'
import { useEventStore } from '../../store/eventStore'

const EventCard = ({ event }) => {
  const { isAuthenticated } = useAuthStore()
  const { toggleSaveEvent, savedEvents } = useEventStore()
  
  const isSaved = savedEvents.some(id => id === event._id)
  
  const handleSaveToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isAuthenticated) {
      toggleSaveEvent(event._id)
    }
  }
  
  const getCategoryColor = (category) => {
    const colors = {
      music: 'bg-pink-100 text-pink-800',
      sports: 'bg-blue-100 text-blue-800',
      food: 'bg-yellow-100 text-yellow-800',
      arts: 'bg-purple-100 text-purple-800',
      technology: 'bg-indigo-100 text-indigo-800',
      workshops: 'bg-green-100 text-green-800',
    }
    
    return colors[category] || 'bg-gray-100 text-gray-800'
  }
  
  return (
    <Link to={`/events/${event._id}`}>
      <Card className="h-full transition-all duration-300 hover:translate-y-[-5px]">
        <div className="relative">
          <img 
            src={event.image || `https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`} 
            alt={event.title}
            className="w-full h-48 object-cover"
            crossOrigin="anonymous"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/800x400/cccccc/333333?text=Event+Image";
            }}
          />
          {isAuthenticated && (
            <button 
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center ${
                isSaved ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'
              }`}
              onClick={handleSaveToggle}
            >
              <i className={`bi ${isSaved ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
            </button>
          )}
          <div className="absolute bottom-3 left-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <i className="bi bi-calendar-event mr-1"></i>
            <span>{format(new Date(event.date), 'MMM dd, yyyy')}</span>
            <span className="mx-2">•</span>
            <i className="bi bi-clock mr-1"></i>
            <span>{event.time}</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-500 text-sm">
              <i className="bi bi-geo-alt mr-1"></i>
              <span className="truncate max-w-[150px]">{event.location}</span>
            </div>
            
            <span className="text-primary-600 font-medium flex items-center">
              View Details
              <i className="bi bi-arrow-right ml-1"></i>
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default EventCard

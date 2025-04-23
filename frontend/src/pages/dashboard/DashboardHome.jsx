import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardStats from '../../components/dashboard/DashboardStats'
import EventCard from '../../components/events/EventCard'
import Button from '../../components/ui/Button'
import { useEventStore } from '../../store/eventStore'
import { useAuthStore } from '../../store/authStore'

const DashboardHome = () => {
  const { user } = useAuthStore()
  const { 
    fetchUserEvents, 
    fetchSavedEvents, 
    userEvents, 
    savedEventDetails,
    isLoading 
  } = useEventStore()
  
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    savedEvents: 0
  })
  
  useEffect(() => {
    fetchUserEvents()
    fetchSavedEvents()
  }, [fetchUserEvents, fetchSavedEvents])
  
  useEffect(() => {
    if (userEvents.length > 0 || savedEventDetails.length > 0) {
      // Calculate upcoming events (events with dates in the future)
      const now = new Date()
      const upcoming = userEvents.filter(event => new Date(event.date) >= now).length
      
      setStats({
        totalEvents: userEvents.length,
        upcomingEvents: upcoming,
        savedEvents: savedEventDetails.length
      })
    }
  }, [userEvents, savedEventDetails])
  
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome, {user?.name}!</h2>
        <p className="text-gray-600 mb-6">
          This is your dashboard where you can manage your events, view your saved events, and create new ones.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/dashboard/create-event" className="btn btn-primary">
            <i className="bi bi-plus-circle mr-2"></i>
            Create New Event
          </Link>
          <Link to="/events" className="btn btn-outline">
            <i className="bi bi-search mr-2"></i>
            Browse Events
          </Link>
        </div>
      </div>
      
      <DashboardStats stats={stats} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Events */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Your Recent Events</h3>
            <Link to="/dashboard/my-events" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              View All
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            </div>
          ) : userEvents.length > 0 ? (
            <div className="space-y-4">
              {userEvents.slice(0, 3).map(event => (
                <div key={event._id} className="flex items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <img 
                    src={event.image || "https://placehold.co/100x100/cccccc/333333?text=Event"} 
                    alt={event.title}
                    className="w-16 h-16 rounded object-cover mr-4"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/100x100/cccccc/333333?text=Event";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{event.title}</h4>
                    <p className="text-xs text-gray-500">
                      <i className="bi bi-calendar-event mr-1"></i>
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Link 
                    to={`/events/${event._id}`}
                    className="text-primary-600 hover:text-primary-800"
                  >
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't created any events yet.</p>
              <Link to="/dashboard/create-event" className="btn btn-primary">
                Create Your First Event
              </Link>
            </div>
          )}
        </div>
        
        {/* Saved Events */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Saved Events</h3>
            <Link to="/dashboard/saved-events" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              View All
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            </div>
          ) : savedEventDetails.length > 0 ? (
            <div className="space-y-4">
              {savedEventDetails.slice(0, 3).map(event => (
                <div key={event._id} className="flex items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <img 
                    src={event.image || "https://placehold.co/100x100/cccccc/333333?text=Event"} 
                    alt={event.title}
                    className="w-16 h-16 rounded object-cover mr-4"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/100x100/cccccc/333333?text=Event";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{event.title}</h4>
                    <p className="text-xs text-gray-500">
                      <i className="bi bi-calendar-event mr-1"></i>
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Link 
                    to={`/events/${event._id}`}
                    className="text-primary-600 hover:text-primary-800"
                  >
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't saved any events yet.</p>
              <Link to="/events" className="btn btn-primary">
                Browse Events
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardHome

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import EventCard from '../events/EventCard'
import { useEventStore } from '../../store/eventStore'
import LoadingSpinner from '../ui/LoadingSpinner'
import EmptyState from '../ui/EmptyState'

const UpcomingEvents = () => {
  const { fetchEvents, events, isLoading } = useEventStore()
  const [upcomingEvents, setUpcomingEvents] = useState([])
  
  useEffect(() => {
    fetchEvents({ limit: 6 })
  }, [fetchEvents])
  
  useEffect(() => {
    if (events.length > 0) {
      setUpcomingEvents(events.slice(0, 6))
    }
  }, [events])
  
  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Don't miss out on these exciting upcoming events. Find something for everyone!
            </p>
          </div>
          <Link 
            to="/events" 
            className="mt-4 md:mt-0 btn btn-outline flex items-center"
          >
            View All Events
            <i className="bi bi-arrow-right ml-2"></i>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        ) : upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No upcoming events"
            message="There are no upcoming events at the moment. Check back later or create your own event!"
            action={
              <Link to="/dashboard/create-event" className="btn btn-primary">
                Create Event
              </Link>
            }
          />
        )}
      </Container>
    </section>
  )
}

export default UpcomingEvents

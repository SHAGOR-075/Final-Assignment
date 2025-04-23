import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import EventCard from '../../components/events/EventCard'
import EmptyState from '../../components/ui/EmptyState'
import { useEventStore } from '../../store/eventStore'

const SavedEvents = () => {
  const { fetchSavedEvents, savedEventDetails, isLoading } = useEventStore()
  
  useEffect(() => {
    fetchSavedEvents()
  }, [fetchSavedEvents])
  
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Saved Events</h2>
        <p className="text-gray-600">
          Events you've saved for later. Click on an event to view details or remove it from your saved list.
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
      ) : savedEventDetails.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedEventDetails.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="No saved events"
          message="You haven't saved any events yet. Browse events and save the ones you're interested in."
          action={
            <Link to="/events" className="btn btn-primary">
              Browse Events
            </Link>
          }
        />
      )}
    </div>
  )
}

export default SavedEvents

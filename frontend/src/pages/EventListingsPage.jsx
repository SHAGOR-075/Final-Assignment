import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Container from '../components/ui/Container'
import EventCard from '../components/events/EventCard'
import EventFilters from '../components/events/EventFilters'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'
import { useEventStore } from '../store/eventStore'

const EventListingsPage = () => {
  const [searchParams] = useSearchParams()
  const { fetchEvents, events, isLoading } = useEventStore()
  const [filteredEvents, setFilteredEvents] = useState([])
  
  useEffect(() => {
    const category = searchParams.get('category') || ''
    const search = searchParams.get('search') || ''
    const sort = searchParams.get('sort') || 'date-asc'
    
    fetchEvents({ category, search, sort })
  }, [fetchEvents, searchParams])
  
  useEffect(() => {
    setFilteredEvents(events)
  }, [events])
  
  const handleFilter = (filters) => {
    fetchEvents(filters)
  }
  
  return (
    <div className="py-12 bg-gray-50">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Listings</h1>
          <p className="text-lg text-gray-600">
            Discover and connect with amazing events happening around you.
          </p>
        </div>
        
        <EventFilters onFilter={handleFilter} />
        
        {isLoading ? (
          <LoadingSpinner />
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No events found"
            message="No events match your current filters. Try adjusting your search criteria."
          />
        )}
      </Container>
    </div>
  )
}

export default EventListingsPage

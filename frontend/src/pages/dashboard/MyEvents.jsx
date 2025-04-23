import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EventTable from '../../components/dashboard/EventTable'
import Button from '../../components/ui/Button'
import { useEventStore } from '../../store/eventStore'
import toast from 'react-hot-toast'

const MyEvents = () => {
  const navigate = useNavigate()
  const { fetchUserEvents, deleteEvent, userEvents, isLoading } = useEventStore()
  
  useEffect(() => {
    fetchUserEvents()
  }, [fetchUserEvents])
  
  const handleEdit = (event) => {
    navigate(`/dashboard/edit-event/${event._id}`)
  }
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      try {
        await deleteEvent(id)
        toast.success('Event deleted successfully')
      } catch (error) {
        toast.error('Failed to delete event')
      }
    }
  }
  
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2 sm:mb-0">My Events</h2>
            <Button 
              variant="primary"
              onClick={() => navigate('/dashboard/create-event')}
            >
              <i className="bi bi-plus-circle mr-2"></i>
              Create Event
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <EventTable 
              events={userEvents} 
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default MyEvents

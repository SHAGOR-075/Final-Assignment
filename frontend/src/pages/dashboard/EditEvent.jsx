import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import EventForm from '../../components/events/EventForm'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { useEventStore } from '../../store/eventStore'
import toast from 'react-hot-toast'

const EditEvent = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { fetchEventById, updateEvent } = useEventStore()
  const [event, setEvent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  useEffect(() => {
    const getEvent = async () => {
      try {
        const eventData = await fetchEventById(id)
        setEvent(eventData)
      } catch (error) {
        toast.error('Failed to fetch event details')
        navigate('/dashboard/my-events')
      } finally {
        setIsLoading(false)
      }
    }
    
    getEvent()
  }, [fetchEventById, id, navigate])
  
  const handleSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      await updateEvent(id, data)
      toast.success('Event updated successfully')
      navigate('/dashboard/my-events')
    } catch (error) {
      toast.error('Failed to update event')
      console.error('Error updating event:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (isLoading) {
    return <LoadingSpinner />
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Event</h2>
      <EventForm 
        onSubmit={handleSubmit} 
        initialData={event} 
        isSubmitting={isSubmitting} 
      />
    </div>
  )
}

export default EditEvent

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EventForm from '../../components/events/EventForm'
import { useEventStore } from '../../store/eventStore'
import toast from 'react-hot-toast'

const CreateEvent = () => {
  const navigate = useNavigate()
  const { createEvent } = useEventStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      await createEvent(data)
      toast.success('Event created successfully')
      navigate('/dashboard/my-events')
    } catch (error) {
      toast.error('Failed to create event')
      console.error('Error creating event:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Event</h2>
      <EventForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}

export default CreateEvent

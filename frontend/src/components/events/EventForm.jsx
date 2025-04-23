import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Textarea from '../ui/Textarea'
import Button from '../ui/Button'

const categories = [
  { value: 'music', label: 'Music' },
  { value: 'sports', label: 'Sports' },
  { value: 'food', label: 'Food & Drink' },
  { value: 'arts', label: 'Arts & Culture' },
  { value: 'technology', label: 'Technology' },
  { value: 'workshops', label: 'Workshops' },
]

const EventForm = ({ onSubmit, initialData = null, isSubmitting = false }) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm({
    defaultValues: initialData || {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: 'music',
      image: '',
    }
  })
  
  useEffect(() => {
    if (initialData) {
      // Format date for input field (YYYY-MM-DD)
      const formattedData = {
        ...initialData,
        date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : '',
      }
      reset(formattedData)
    }
  }, [initialData, reset])
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Event Title"
        {...register('title', { 
          required: 'Title is required',
          minLength: { value: 3, message: 'Title must be at least 3 characters' }
        })}
        error={errors.title?.message}
        placeholder="Enter event title"
      />
      
      <Textarea
        label="Description"
        {...register('description', { 
          required: 'Description is required',
          minLength: { value: 10, message: 'Description must be at least 10 characters' }
        })}
        error={errors.description?.message}
        placeholder="Describe your event"
        rows={4}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Date"
          type="date"
          {...register('date', { required: 'Date is required' })}
          error={errors.date?.message}
        />
        
        <Input
          label="Time"
          type="time"
          {...register('time', { required: 'Time is required' })}
          error={errors.time?.message}
        />
      </div>
      
      <Input
        label="Location"
        {...register('location', { required: 'Location is required' })}
        error={errors.location?.message}
        placeholder="Enter event location"
      />
      
      <Select
        label="Category"
        {...register('category', { required: 'Category is required' })}
        error={errors.category?.message}
        options={categories}
      />
      
      <Input
        label="Image URL (optional)"
        {...register('image')}
        error={errors.image?.message}
        placeholder="Enter image URL for your event"
      />
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          variant="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {initialData ? 'Update Event' : 'Create Event'}
        </Button>
      </div>
    </form>
  )
}

export default EventForm

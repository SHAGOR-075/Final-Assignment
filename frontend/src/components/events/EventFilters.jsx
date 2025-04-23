import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from '../ui/Button'
import Select from '../ui/Select'

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'music', label: 'Music' },
  { value: 'sports', label: 'Sports' },
  { value: 'food', label: 'Food & Drink' },
  { value: 'arts', label: 'Arts & Culture' },
  { value: 'technology', label: 'Technology' },
  { value: 'workshops', label: 'Workshops' },
]

const sortOptions = [
  { value: 'date-asc', label: 'Date (Earliest First)' },
  { value: 'date-desc', label: 'Date (Latest First)' },
  { value: 'title-asc', label: 'Title (A-Z)' },
  { value: 'title-desc', label: 'Title (Z-A)' },
]

const EventFilters = ({ onFilter }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    sort: searchParams.get('sort') || 'date-asc',
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Update URL search params
    const newParams = new URLSearchParams()
    
    if (filters.search) newParams.set('search', filters.search)
    if (filters.category) newParams.set('category', filters.category)
    if (filters.sort) newParams.set('sort', filters.sort)
    
    setSearchParams(newParams)
    
    // Call parent filter function
    onFilter(filters)
  }
  
  const handleReset = () => {
    setFilters({
      search: '',
      category: '',
      sort: 'date-asc',
    })
    
    setSearchParams({})
    onFilter({
      search: '',
      category: '',
      sort: 'date-asc',
    })
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Filter Events</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="bi bi-search text-gray-400"></i>
              </div>
              <input
                type="text"
                id="search"
                name="search"
                value={filters.search}
                onChange={handleChange}
                placeholder="Search events..."
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <Select
            label="Category"
            name="category"
            value={filters.category}
            onChange={handleChange}
            options={categories}
          />
          
          <Select
            label="Sort By"
            name="sort"
            value={filters.sort}
            onChange={handleChange}
            options={sortOptions}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleReset}
            className="order-2 sm:order-1"
          >
            Reset Filters
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            className="order-1 sm:order-2"
          >
            Apply Filters
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EventFilters

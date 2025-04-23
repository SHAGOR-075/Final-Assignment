import { useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import Button from '../ui/Button'
import EmptyState from '../ui/EmptyState'

const EventTable = ({ events, onDelete, onEdit }) => {
  const [expandedId, setExpandedId] = useState(null)
  
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }
  
  if (!events || events.length === 0) {
    return (
      <EmptyState 
        title="No events found"
        message="You haven't created any events yet."
        action={
          <Link to="/dashboard/create-event" className="btn btn-primary">
            Create Your First Event
          </Link>
        }
      />
    )
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Event
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date & Time
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {events.map((event) => (
            <tr key={event._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img 
                      className="h-10 w-10 rounded-full object-cover"
                      src={event.image || "https://placehold.co/100x100/cccccc/333333?text=Event"}
                      alt={event.title}
                      crossOrigin="anonymous"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/100x100/cccccc/333333?text=Event";
                      }}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {event.title}
                    </div>
                    <button 
                      className="text-xs text-primary-600 hover:text-primary-800"
                      onClick={() => toggleExpand(event._id)}
                    >
                      {expandedId === event._id ? 'Hide details' : 'Show details'}
                    </button>
                    {expandedId === event._id && (
                      <div className="mt-2 text-sm text-gray-500 max-w-md">
                        {event.description}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {format(new Date(event.date), 'MMM dd, yyyy')}
                </div>
                <div className="text-sm text-gray-500">{event.time}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{event.location}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <Link 
                    to={`/events/${event._id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => onEdit(event)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(event._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EventTable

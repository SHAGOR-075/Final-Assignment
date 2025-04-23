import { NavLink } from 'react-router-dom'

const DashboardNav = () => {
  const navLinkClass = ({ isActive }) => 
    `flex items-center px-4 py-2 rounded-md text-sm font-medium ${
      isActive 
        ? 'bg-primary-100 text-primary-700' 
        : 'text-gray-700 hover:bg-gray-100'
    }`
  
  return (
    <nav className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <NavLink to="/dashboard" className={navLinkClass} end>
          <i className="bi bi-speedometer2 mr-2"></i>
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/my-events" className={navLinkClass}>
          <i className="bi bi-calendar-event mr-2"></i>
          My Events
        </NavLink>
        <NavLink to="/dashboard/saved-events" className={navLinkClass}>
          <i className="bi bi-bookmark-heart mr-2"></i>
          Saved Events
        </NavLink>
        <NavLink to="/dashboard/create-event" className={navLinkClass}>
          <i className="bi bi-plus-circle mr-2"></i>
          Create Event
        </NavLink>
      </div>
    </nav>
  )
}

export default DashboardNav

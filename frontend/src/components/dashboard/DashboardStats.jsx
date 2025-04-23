const DashboardStats = ({ stats }) => {
  const { totalEvents, upcomingEvents, savedEvents } = stats
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-primary-100 text-primary-600">
            <i className="bi bi-calendar-event text-2xl"></i>
          </div>
          <div className="ml-5">
            <p className="text-gray-500 text-sm">Total Events</p>
            <h3 className="text-3xl font-bold text-gray-900">{totalEvents}</h3>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            <i className="bi bi-calendar-check text-2xl"></i>
          </div>
          <div className="ml-5">
            <p className="text-gray-500 text-sm">Upcoming Events</p>
            <h3 className="text-3xl font-bold text-gray-900">{upcomingEvents}</h3>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-secondary-100 text-secondary-600">
            <i className="bi bi-bookmark-heart text-2xl"></i>
          </div>
          <div className="ml-5">
            <p className="text-gray-500 text-sm">Saved Events</p>
            <h3 className="text-3xl font-bold text-gray-900">{savedEvents}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardStats

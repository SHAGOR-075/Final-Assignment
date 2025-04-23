const EmptyState = ({ 
  icon = 'bi-calendar-x', 
  title = 'No data found', 
  message = 'There are no items to display at the moment.', 
  action = null 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <i className={`bi ${icon} text-5xl text-gray-400 mb-4`}></i>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md">{message}</p>
      {action}
    </div>
  )
}

export default EmptyState

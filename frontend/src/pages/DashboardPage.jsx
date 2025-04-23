import { Routes, Route, Navigate } from 'react-router-dom'
import Container from '../components/ui/Container'
import DashboardNav from '../components/dashboard/DashboardNav'
import DashboardHome from '../pages/dashboard/DashboardHome'
import MyEvents from '../pages/dashboard/MyEvents'
import SavedEvents from '../pages/dashboard/SavedEvents'
import CreateEvent from '../pages/dashboard/CreateEvent'
import EditEvent from '../pages/dashboard/EditEvent'

const DashboardPage = () => {
  return (
    <div className="py-12 bg-gray-50">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-lg text-gray-600">
            Manage your events and preferences
          </p>
        </div>
        
        <DashboardNav />
        
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="my-events" element={<MyEvents />} />
          <Route path="saved-events" element={<SavedEvents />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="edit-event/:id" element={<EditEvent />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Container>
    </div>
  )
}

export default DashboardPage

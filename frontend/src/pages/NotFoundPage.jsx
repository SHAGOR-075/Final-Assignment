import { Link } from 'react-router-dom'
import Container from '../components/ui/Container'

const NotFoundPage = () => {
  return (
    <div className="py-20">
      <Container className="text-center">
        <div className="max-w-md mx-auto">
          <i className="bi bi-exclamation-triangle text-primary-600 text-7xl mb-6"></i>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/" className="btn btn-primary px-8 py-3">
              Go to Homepage
            </Link>
            <Link to="/events" className="btn btn-outline px-8 py-3">
              Browse Events
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default NotFoundPage

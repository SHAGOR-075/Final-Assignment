import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  const navLinkClass = ({ isActive }) => 
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive 
        ? 'text-white bg-primary-700' 
        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
    }`

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom mx-auto">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <i className="bi bi-calendar-event text-primary-600 text-3xl"></i>
            <span className="text-xl font-bold text-primary-800">Event_Listing</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className={navLinkClass} end>Home</NavLink>
            <NavLink to="/events" className={navLinkClass}>Events</NavLink>
            
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
                <div className="flex items-center ml-2">
                  <span className="text-sm font-medium text-gray-700 mr-2">Hi, {user?.name}</span>
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-medium">{user?.name?.charAt(0)}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-primary">Login</NavLink>
                <NavLink to="/register" className="btn btn-outline">Register</NavLink>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none" 
            onClick={toggleMenu}
          >
            <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'} text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 pb-5">
            <div className="flex flex-col space-y-2">
              <NavLink 
                to="/" 
                className={navLinkClass} 
                end
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink 
                to="/events" 
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </NavLink>
              
              {isAuthenticated ? (
                <>
                  <NavLink 
                    to="/dashboard" 
                    className={navLinkClass}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                  <button 
                    onClick={handleLogout}
                    className="text-left px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Logout
                  </button>
                  <div className="flex items-center px-3 py-2">
                    <span className="text-sm font-medium text-gray-700 mr-2">Hi, {user?.name}</span>
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-700 font-medium">{user?.name?.charAt(0)}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <NavLink 
                    to="/login" 
                    className="px-3 py-2 rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                  <NavLink 
                    to="/register" 
                    className="px-3 py-2 rounded-md text-sm font-medium border border-primary-600 text-primary-600 hover:bg-primary-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

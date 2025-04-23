import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-dark text-white pt-12 pb-8">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <i className="bi bi-calendar-event text-primary-400 text-3xl"></i>
              <span className="text-xl font-bold text-white">Event_Listing</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Discover and connect with local events happening around you. Find your next adventure!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <i className="bi bi-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <i className="bi bi-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <i className="bi bi-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <i className="bi bi-linkedin text-xl"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-primary-400 transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-primary-400 transition-colors">Dashboard</Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events?category=music" className="text-gray-400 hover:text-primary-400 transition-colors">Music</Link>
              </li>
              <li>
                <Link to="/events?category=sports" className="text-gray-400 hover:text-primary-400 transition-colors">Sports</Link>
              </li>
              <li>
                <Link to="/events?category=food" className="text-gray-400 hover:text-primary-400 transition-colors">Food & Drink</Link>
              </li>
              <li>
                <Link to="/events?category=arts" className="text-gray-400 hover:text-primary-400 transition-colors">Arts & Culture</Link>
              </li>
              <li>
                <Link to="/events?category=technology" className="text-gray-400 hover:text-primary-400 transition-colors">Technology</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <i className="bi bi-geo-alt text-primary-400 mt-1"></i>
                <span className="text-gray-400">House 12, Road 12, Sector 04,
                Uttara, Dhaka - 1230, Bangladesh.</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="bi bi-envelope text-primary-400"></i>
                <span className="text-gray-400">info@eventlisting.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="bi bi-telephone text-primary-400"></i>
                <span className="text-gray-400">+880 178 999 999</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Event_Listing. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Designed by <span className="text-primary-400">Dev Shagor❤️</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

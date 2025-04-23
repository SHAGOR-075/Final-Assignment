import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <div className="relative bg-primary-800 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
          alt="People at a concert"
          className="w-full h-full object-cover opacity-30"
          crossOrigin="anonymous"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/1920x600/1e40af/ffffff?text=Discover+Amazing+Events";
          }}
        />
      </div>
      <div className="relative container-custom mx-auto px-4 py-24 sm:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
            Discover Amazing Events Near You
          </h1>
          <p className="text-xl text-primary-100 mb-8">
            Find and connect with local events happening around you. 
            From concerts to workshops, never miss out on what matters to you.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/events" 
              className="btn btn-primary text-center px-8 py-3 text-base font-medium"
            >
              Browse Events
            </Link>
            <Link 
              to="/register" 
              className="btn bg-white text-primary-800 hover:bg-gray-100 text-center px-8 py-3 text-base font-medium"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner

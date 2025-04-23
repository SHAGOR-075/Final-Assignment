import { Link } from 'react-router-dom'
import Container from '../ui/Container'

const categories = [
  {
    id: 'music',
    name: 'Music',
    icon: 'bi-music-note-beamed',
    color: 'bg-pink-500',
    image: 'https://i.ibb.co.com/My1JYXX3/music.jpg'
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: 'bi-trophy',
    color: 'bg-blue-500',
    image: 'https://i.ibb.co.com/wNF1gmsz/sports.webp'
  },
  {
    id: 'food',
    name: 'Food & Drink',
    icon: 'bi-cup-hot',
    color: 'bg-yellow-500',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'arts',
    name: 'Arts & Culture',
    icon: 'bi-palette',
    color: 'bg-purple-500',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: 'bi-laptop',
    color: 'bg-indigo-500',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'workshops',
    name: 'Workshops',
    icon: 'bi-tools',
    color: 'bg-green-500',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  }
]

const CategorySection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Events by Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover events that match your interests. From music concerts to tech workshops, 
            find exactly what you're looking for.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/events?category=${category.id}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg shadow-md h-64 transition-all duration-300 group-hover:shadow-xl">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/600x400/${category.color.slice(3)}/ffffff?text=${category.name}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center mb-3`}>
                    <i className={`bi ${category.icon} text-white text-xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-primary-200 flex items-center">
                    Explore events <i className="bi bi-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-2"></i>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default CategorySection

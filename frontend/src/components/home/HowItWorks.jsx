import Container from '../ui/Container'

const steps = [
  {
    id: 1,
    title: 'Find Events',
    description: 'Browse through our curated list of events or search for specific ones that match your interests.',
    icon: 'bi-search'
  },
  {
    id: 2,
    title: 'Save Favorites',
    description: 'Save events youre interested in to your personal dashboard for easy access later.',
    icon: 'bi-bookmark-heart'
  },
  {
    id: 3,
    title: 'Attend & Enjoy',
    description: 'Attend the events and enjoy memorable experiences with friends, family, or new connections.',
    icon: 'bi-emoji-smile'
  }
]

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discovering and attending events has never been easier. 
            Follow these simple steps to get started.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                <i className={`bi ${step.icon} text-primary-600 text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                <span className="text-primary-600 mr-2">{step.id}.</span> {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-primary-100 mb-6">
            <span className="px-3 py-1 text-sm font-medium text-primary-800">
              Ready to get started?
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Join thousands of event-goers and create unforgettable memories
          </h3>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="/register" className="btn btn-primary px-8 py-3">
              Sign Up Now
            </a>
            <a href="/events" className="btn btn-outline px-8 py-3">
              Browse Events
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default HowItWorks

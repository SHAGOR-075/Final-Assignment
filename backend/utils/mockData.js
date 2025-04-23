
import bcrypt from 'bcryptjs'

// Users
export const users = [
  {
    _id: '60d0fe4f5311236168a109ca',
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    savedEvents: ['60d0fe4f5311236168a109cb', '60d0fe4f5311236168a109cc'],
    createdAt: new Date('2023-01-01')
  },
  {
    _id: '60d0fe4f5311236168a109cd',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    savedEvents: ['60d0fe4f5311236168a109ce'],
    createdAt: new Date('2023-01-02')
  }
]

// Events
export const events = [
  {
    _id: '60d0fe4f5311236168a109cb',
    title: 'Summer Music Festival',
    description: 'Join us for a weekend of amazing music performances from top artists around the world. Food, drinks, and good vibes guaranteed!',
    date: new Date('2023-07-15'),
    time: '14:00',
    location: 'Central Park, New York',
    category: 'music',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    creator: '60d0fe4f5311236168a109ca',
    createdAt: new Date('2023-01-10')
  },
  {
    _id: '60d0fe4f5311236168a109cc',
    title: 'Tech Conference 2023',
    description: 'The biggest tech conference of the year. Learn about the latest technologies, network with industry professionals, and participate in workshops.',
    date: new Date('2023-08-20'),
    time: '09:00',
    location: 'Convention Center, San Francisco',
    category: 'technology',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    creator: '60d0fe4f5311236168a109ca',
    createdAt: new Date('2023-01-15')
  },
  {
    _id: '60d0fe4f5311236168a109ce',
    title: 'Food & Wine Festival',
    description: 'Experience the best culinary delights and wine tastings from top chefs and wineries. A feast for all your senses!',
    date: new Date('2023-09-10'),
    time: '12:00',
    location: 'Waterfront Park, Seattle',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    creator: '60d0fe4f5311236168a109cd',
    createdAt: new Date('2023-01-20')
  },
  {
    _id: '60d0fe4f5311236168a109cf',
    title: 'Marathon for Charity',
    description: 'Run for a cause! Join our annual marathon to raise funds for childrens education. All fitness levels welcome.',
    date: new Date('2023-10-05'),
    time: '07:00',
    location: 'Downtown, Chicago',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    creator: '60d0fe4f5311236168a109cd',
    createdAt: new Date('2023-01-25')
  },
  {
    _id: '60d0fe4f5311236168a109cg',
    title: 'Art Exhibition: Modern Masters',
    description: 'A curated exhibition featuring works from contemporary artists pushing the boundaries of modern art. Interactive installations and guided tours available.',
    date: new Date('2023-11-15'),
    time: '10:00',
    location: 'Modern Art Museum, Los Angeles',
    category: 'arts',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    creator: '60d0fe4f5311236168a109ca',
    createdAt: new Date('2023-02-01')
  },
  {
    _id: '60d0fe4f5311236168a109ch',
    title: 'Web Development Workshop',
    description: 'Learn the fundamentals of web development in this hands-on workshop. Perfect for beginners and those looking to refresh their skills.',
    date: new Date('2023-12-01'),
    time: '13:00',
    location: 'Tech Hub, Austin',
    category: 'workshops',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    creator: '60d0fe4f5311236168a109cd',
    createdAt: new Date('2023-02-10')
  }
]

import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'

const Layout = () => {
  const { checkAuthStatus } = useAuthStore()
  
  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout

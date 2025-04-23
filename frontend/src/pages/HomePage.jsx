import Banner from '../components/home/Banner'
import CategorySection from '../components/home/CategorySection'
import UpcomingEvents from '../components/home/UpcomingEvents'
import HowItWorks from '../components/home/HowItWorks'

const HomePage = () => {
  return (
    <div>
      <Banner />
      <UpcomingEvents />
      <CategorySection />
      <HowItWorks />
    </div>
  )
}

export default HomePage

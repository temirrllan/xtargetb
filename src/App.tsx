import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import ChannelOwners from './components/ChannelOwners'
import Performers from './components/Performers'
import Tariffs from './components/Tariffs'
import Footer from './components/Footer'
import BottomBar from './components/BottomBar'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <ChannelOwners />
        <Performers />
        <Tariffs />
        <Footer />
      </main>
      <BottomBar />
    </>
  )
}

export default App

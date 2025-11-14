import SearchBar from '../components/SearchBar'
import '../styles/Home.css'

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Make Smarter Food Choices
          </h1>
          <p className="hero-subtitle">
            Discover the nutritional quality and environmental impact of any food item
          </p>
          <SearchBar />
        </div>
      </div>
    </div>
  )
}

export default Home


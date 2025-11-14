import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import '../styles/Navbar.css'

function Navbar() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img 
            src="/logo.png" 
            alt="Know YourPlate Logo" 
            className="logo-image"
            onError={(e) => {
              // Fallback to emoji if image not found
              e.target.style.display = 'none'
              e.target.nextElementSibling.style.display = 'inline-block'
            }}
          />
          <span className="logo-icon" style={{ display: 'none' }}>🌱</span>
          <span className="logo-text">Know YourPlate</span>
        </Link>
        <div className="navbar-right">
          <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


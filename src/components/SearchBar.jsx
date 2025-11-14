import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/SearchBar.css'

function SearchBar({ initialValue = '' }) {
  const [query, setQuery] = useState(initialValue)
  const navigate = useNavigate()

  // Sync query with initialValue when it changes
  useEffect(() => {
    setQuery(initialValue)
  }, [initialValue])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/dashboard?item=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search for any food item..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-button">
        🔍 Search
      </button>
    </form>
  )
}

export default SearchBar


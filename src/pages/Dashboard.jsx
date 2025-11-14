import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFood } from '../contexts/FoodContext'
import FoodCard from '../components/FoodCard'
import EcoScoreCard from '../components/EcoScoreCard'
import NutritionSummaryCard from '../components/NutritionSummaryCard'
import NutritionChart from '../components/NutritionChart'
import AdditivesCard from '../components/AdditivesCard'
import SustainabilityMeter from '../components/SustainabilityMeter'
import OverviewStats from '../components/OverviewStats'
import SearchBar from '../components/SearchBar'
import '../styles/Dashboard.css'

function Dashboard() {
  const [searchParams] = useSearchParams()
  const itemQuery = searchParams.get('item') || ''
  const { foodData, loading, error, searchFood } = useFood()
  const lastQueryRef = useRef('')

  useEffect(() => {
    const trimmedQuery = itemQuery.trim()
    // Only search if query changed and is not empty
    if (trimmedQuery && trimmedQuery !== lastQueryRef.current) {
      lastQueryRef.current = trimmedQuery
      searchFood(trimmedQuery)
    }
  }, [itemQuery, searchFood])

  // Convert eco grade to percentage for display
  const getEcoScorePercent = (grade) => {
    const gradeMap = {
      'a': 90,
      'b': 75,
      'c': 60,
      'd': 45,
      'e': 30,
      'unknown': 0
    }
    return gradeMap[grade?.toLowerCase()] || 0
  }

  // Format additives for display
  const formatAdditives = (additives) => {
    if (!additives || additives.length === 0) return []
    return additives.map(additive => {
      // Remove 'en:' prefix and format
      const clean = additive.replace(/^en:/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      return clean
    })
  }

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <SearchBar initialValue={itemQuery} />
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading food data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <SearchBar initialValue={itemQuery} />
        </div>
        <div className="error-container">
          <p className="error-message">{error}</p>
          <p className="error-hint">Try searching for a different food item.</p>
        </div>
      </div>
    )
  }

  if (!foodData) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <SearchBar initialValue={itemQuery} />
        </div>
        <div className="empty-container">
          <p>Search for a food item to see its details.</p>
        </div>
      </div>
    )
  }

  const ecoScorePercent = getEcoScorePercent(foodData.eco?.grade)

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <SearchBar initialValue={itemQuery} />
      </div>
      <div className="dashboard-grid">
        {/* Food Overview - Full Width */}
        <div className="grid-item full-width">
          <FoodCard food={foodData} />
        </div>

        {/* Eco Score - Half Width */}
        <div className="grid-item half-width">
          <EcoScoreCard 
            ecoGrade={foodData.eco?.grade?.toUpperCase() || 'N/A'} 
            ecoScorePercent={ecoScorePercent} 
          />
        </div>

        {/* Nutrition Summary - Half Width */}
        <div className="grid-item half-width">
          <NutritionSummaryCard nutrition={foodData.nutrition} />
        </div>

        {/* Nutrition Chart - Full Width */}
        <div className="grid-item full-width">
          <NutritionChart nutrition={foodData.nutrition} />
        </div>

        {/* Additives - Half Width */}
        <div className="grid-item half-width">
          <AdditivesCard additives={formatAdditives(foodData.additives)} />
        </div>

        {/* Sustainability Meter - Half Width */}
        <div className="grid-item half-width">
          <SustainabilityMeter 
            ecoScorePercent={ecoScorePercent}
            ecoGrade={foodData.eco?.grade?.toUpperCase() || 'N/A'}
          />
        </div>

        {/* Overview Stats - Full Width */}
        <div className="grid-item full-width">
          <OverviewStats food={foodData} ecoScorePercent={ecoScorePercent} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard


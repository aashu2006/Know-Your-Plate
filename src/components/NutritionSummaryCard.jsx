import Card from './Card'
import '../styles/NutritionSummaryCard.css'

function NutritionSummaryCard({ nutrition }) {
  // Handle null values and format for display
  const formatValue = (value) => {
    if (value === null || value === undefined) return 'N/A'
    return Math.round(value * 10) / 10 // Round to 1 decimal
  }

  const nutrients = [
    { label: 'Calories', value: formatValue(nutrition?.calories), unit: 'kcal' },
    { label: 'Protein', value: formatValue(nutrition?.protien), unit: 'g' },
    { label: 'Fat', value: formatValue(nutrition?.fat), unit: 'g' },
    { label: 'Sugar', value: formatValue(nutrition?.sugar), unit: 'g' },
    { label: 'Salt', value: formatValue(nutrition?.salt), unit: 'g' },
  ]

  return (
    <Card className="nutrition-summary-card">
      <h2 className="card-title">Nutrition Summary</h2>
      <div className="nutrition-grid">
        {nutrients.map((nutrient, index) => (
          <div key={index} className="nutrition-item">
            <div className="nutrition-value">
              {nutrient.value}
              {nutrient.value !== 'N/A' && <span className="nutrition-unit">{nutrient.unit}</span>}
            </div>
            <div className="nutrition-label">{nutrient.label}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default NutritionSummaryCard


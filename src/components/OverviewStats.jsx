import Card from './Card'
import '../styles/OverviewStats.css'

function OverviewStats({ food, ecoScorePercent }) {
  const stats = [
    {
      label: 'Eco Grade',
      value: food?.eco?.grade?.toUpperCase() || 'N/A',
      icon: '🌱',
    },
    {
      label: 'Sustainability',
      value: `${ecoScorePercent || 0}%`,
      icon: '♻️',
    },
    {
      label: 'Calories',
      value: food?.nutrition?.calories ? `${Math.round(food.nutrition.calories)} kcal` : 'N/A',
      icon: '🔥',
    },
    {
      label: 'Additives',
      value: food?.additives?.length || 0,
      icon: '⚠️',
    },
  ]

  return (
    <div className="overview-stats">
      {stats.map((stat, index) => (
        <Card key={index} className="stat-card">
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default OverviewStats


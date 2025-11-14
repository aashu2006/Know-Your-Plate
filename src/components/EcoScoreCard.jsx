import Card from './Card'
import '../styles/EcoScoreCard.css'

function EcoScoreCard({ ecoGrade, ecoScorePercent }) {
  const getGradeColor = (grade) => {
    if (grade?.includes('A')) return '#0b8c48'
    if (grade?.includes('B')) return '#4caf50'
    if (grade?.includes('C')) return '#ff9800'
    if (grade?.includes('D')) return '#f44336'
    return '#757575'
  }

  return (
    <Card className="eco-score-card">
      <h2 className="card-title">Eco Score</h2>
      <div className="eco-score-content">
        <div className="eco-grade-circle" style={{ borderColor: getGradeColor(ecoGrade) }}>
          <span className="eco-grade-text">{ecoGrade || 'N/A'}</span>
        </div>
        <div className="eco-score-details">
          <div className="eco-score-percent">{ecoScorePercent || 0}%</div>
          <div className="eco-score-label">Sustainability Score</div>
        </div>
      </div>
    </Card>
  )
}

export default EcoScoreCard


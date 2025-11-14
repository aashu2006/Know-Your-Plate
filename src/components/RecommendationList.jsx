import Card from './Card'
import '../styles/RecommendationList.css'

function RecommendationList({ recommendations }) {
  const recs = recommendations || []

  const getTagColor = (tag) => {
    if (tag?.includes('Healthier')) return '#0b8c48'
    if (tag?.includes('Eco-friendly')) return '#4caf50'
    if (tag?.includes('Balanced')) return '#2196f3'
    return '#757575'
  }

  return (
    <Card className="recommendation-list-card">
      <h2 className="card-title">Recommended Alternatives</h2>
      {recs.length > 0 ? (
        <div className="recommendations-grid">
          {recs.map((rec, index) => (
            <div key={index} className="recommendation-item">
              <div className="recommendation-header">
                <h3 className="recommendation-name">{rec.name}</h3>
                {rec.tag && (
                  <span 
                    className="recommendation-tag"
                    style={{ backgroundColor: getTagColor(rec.tag) }}
                  >
                    {rec.tag}
                  </span>
                )}
              </div>
              <p className="recommendation-desc">{rec.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-recommendations">No recommendations available</p>
      )}
    </Card>
  )
}

export default RecommendationList


import Card from './Card'
import '../styles/AdditivesCard.css'

function AdditivesCard({ additives }) {
  const additivesList = additives || []

  return (
    <Card className="additives-card">
      <h2 className="card-title">Additives</h2>
      {additivesList.length > 0 ? (
        <ul className="additives-list">
          {additivesList.map((additive, index) => (
            <li key={index} className="additive-item">
              {additive}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-additives">No additives detected</p>
      )}
    </Card>
  )
}

export default AdditivesCard


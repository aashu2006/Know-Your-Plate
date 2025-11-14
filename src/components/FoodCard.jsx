import Card from './Card'
import '../styles/FoodCard.css'

function FoodCard({ food }) {
  const imageUrl = food?.image || 'https://via.placeholder.com/400x300?text=Food+Image'
  
  return (
    <Card className="food-card">
      <div className="food-overview">
        <div className="food-image-container">
          <img 
            src={imageUrl} 
            alt={food?.name || 'Food item'} 
            className="food-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=Food+Image'
            }}
          />
        </div>
        <div className="food-info">
          <h1 className="food-name">{food?.name || 'Food Item'}</h1>
          <p className="food-brand">{food?.brand || 'Brand Name'}</p>
        </div>
      </div>
    </Card>
  )
}

export default FoodCard


import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import Card from './Card'
import '../styles/NutritionChart.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function NutritionChart({ nutrition }) {
  // Handle null values and scale appropriately
  const getValue = (value, scale = 1) => {
    if (value === null || value === undefined) return 0
    return (value || 0) * scale
  }

  const data = {
    labels: ['Calories', 'Protein (g)', 'Fat (g)', 'Sugar (g)', 'Salt (g)'],
    datasets: [
      {
        label: 'Nutrition Values',
        data: [
          getValue(nutrition?.calories, 0.1), // Scale down calories for better visualization
          getValue(nutrition?.protien), // Note: typo in API data (protien instead of protein)
          getValue(nutrition?.fat),
          getValue(nutrition?.sugar),
          getValue(nutrition?.salt),
        ],
        backgroundColor: '#0b8c48',
        borderRadius: 8,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label
            const index = context.dataIndex
            if (label.includes('Calories')) {
              const actualValue = nutrition?.calories || 0
              return `Calories: ${Math.round(actualValue)} kcal`
            }
            // For other nutrients, get actual value from nutrition object
            const nutrients = ['protien', 'fat', 'sugar', 'salt']
            const nutrientKey = nutrients[index - 1] // -1 because calories is index 0
            const actualValue = nutrition?.[nutrientKey] || 0
            return `${label.replace(' (g)', '')}: ${Math.round(actualValue * 10) / 10} g`
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e0e0e0',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <Card className="nutrition-chart-card">
      <h2 className="card-title">Nutrition Breakdown</h2>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </Card>
  )
}

export default NutritionChart


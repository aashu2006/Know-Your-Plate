import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import Card from './Card'
import '../styles/SustainabilityMeter.css'

ChartJS.register(ArcElement, Tooltip, Legend)

function SustainabilityMeter({ ecoScorePercent, ecoGrade }) {
  const score = ecoScorePercent || 0
  const remaining = 100 - score

  const data = {
    labels: ['Sustainability Score', 'Remaining'],
    datasets: [
      {
        data: [score, remaining],
        backgroundColor: ['#0b8c48', '#e0e0e0'],
        borderWidth: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  }

  const getGradeColor = (grade) => {
    if (grade?.includes('A')) return '#0b8c48'
    if (grade?.includes('B')) return '#4caf50'
    if (grade?.includes('C')) return '#ff9800'
    if (grade?.includes('D')) return '#f44336'
    return '#757575'
  }

  return (
    <Card className="sustainability-meter-card">
      <h2 className="card-title">Sustainability Meter</h2>
      <div className="meter-container">
        <div className="meter-chart">
          <Doughnut data={data} options={options} />
          <div className="meter-center">
            <div className="meter-grade" style={{ color: getGradeColor(ecoGrade) }}>
              {ecoGrade || 'N/A'}
            </div>
            <div className="meter-percent">{score}%</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default SustainabilityMeter


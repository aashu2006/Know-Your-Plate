# Sustainable Food Tracker

A modern React application that helps users make healthier, more sustainable food choices by providing instant insights about any food item.

## Features

- **Food Overview**: Display food image, name, and brand
- **Eco Score**: Sustainability grade and percentage score
- **Nutrition Summary**: Calories, carbs, protein, fats, and sugar
- **Additives List**: Complete list of food additives
- **Nutrition Chart**: Interactive bar chart using Chart.js
- **Sustainability Meter**: Circular progress indicator
- **Recommended Alternatives**: Suggestions for healthier options
- **Overview Stats**: Quick metrics at a glance

## Tech Stack

- React 18
- Vite
- React Router
- Chart.js / react-chartjs-2
- CSS Grid for responsive layouts

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── SearchBar.jsx
│   ├── Card.jsx
│   ├── FoodCard.jsx
│   ├── EcoScoreCard.jsx
│   ├── NutritionSummaryCard.jsx
│   ├── AdditivesCard.jsx
│   ├── NutritionChart.jsx
│   ├── SustainabilityMeter.jsx
│   ├── RecommendationList.jsx
│   └── OverviewStats.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   └── Dashboard.jsx
├── styles/             # CSS files
│   ├── index.css
│   ├── App.css
│   └── [component].css
├── api/                # API logic (DO NOT MODIFY)
├── helpers/            # Helper functions (DO NOT MODIFY)
├── App.jsx
└── main.jsx
```

## Important Notes

- The `src/api/` and `src/helpers/` folders contain API logic that must not be modified
- Currently using mock data - connect to API functions when ready
- The dashboard uses a 12-column CSS Grid layout for responsive design
- Theme colors: Primary green (#0b8c48), Background (#f5f7fb)

## Mock Data

The dashboard currently uses mock data. To connect to real API:

1. Import functions from `src/api/` and `src/helpers/`
2. Replace mock data in `Dashboard.jsx` with API calls
3. Handle loading and error states

## License

MIT

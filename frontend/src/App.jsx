import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import GoldPriceChart from './components/GoldPriceChart'
import PredictionCard from './components/PredictionCard'
import Footer from './components/Footer'

function App() {
  const [goldData, setGoldData] = useState({
    currentPrice: 2154.30,
    previousClose: 2148.75,
    prediction: {
      direction: 'up', // 'up' or 'down'
      confidence: 87,
      nextDayPrice: 2168.92,
      weeklyForecast: [2168.92, 2175.45, 2180.10, 2177.80, 2185.30]
    },
    historicalPrices: [
      { date: '2023-06-01', price: 2050.30 },
      { date: '2023-06-02', price: 2055.75 },
      { date: '2023-06-03', price: 2062.40 },
      { date: '2023-06-04', price: 2058.20 },
      { date: '2023-06-05', price: 2070.10 },
      { date: '2023-06-06', price: 2075.85 },
      { date: '2023-06-07', price: 2080.50 },
      { date: '2023-06-08', price: 2085.20 },
      { date: '2023-06-09', price: 2090.75 },
      { date: '2023-06-10', price: 2095.30 },
      { date: '2023-06-11', price: 2100.80 },
      { date: '2023-06-12', price: 2105.45 },
      { date: '2023-06-13', price: 2110.25 },
      { date: '2023-06-14', price: 2115.70 },
      { date: '2023-06-15', price: 2120.40 },
      { date: '2023-06-16', price: 2125.15 },
      { date: '2023-06-17', price: 2130.85 },
      { date: '2023-06-18', price: 2135.60 },
      { date: '2023-06-19', price: 2140.30 },
      { date: '2023-06-20', price: 2145.75 },
      { date: '2023-06-21', price: 2148.75 },
      { date: '2023-06-22', price: 2154.30 },
    ]
  })

  // In a real app, this would be replaced with an API call
  const fetchPredictionData = async () => {
    // Simulating API call
    console.log('Fetching prediction data from API...')
    // In the future, this would fetch data from the AI model API
    // setGoldData(response.data)
  }

  useEffect(() => {
    fetchPredictionData()
  }, [])

  return (
    <div className="app-container">
      <Header currentPrice={goldData.currentPrice} previousClose={goldData.previousClose} />
      <main className="main-content">
        <div className="chart-section">
          <h2>ประวัติราคาทองคำและการคาดการณ์</h2>
          <GoldPriceChart historicalData={goldData.historicalPrices} prediction={goldData.prediction} />
        </div>
        <div className="prediction-section">
          <h2>การทำนายราคาทองคำ</h2>
          <PredictionCard prediction={goldData.prediction} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App

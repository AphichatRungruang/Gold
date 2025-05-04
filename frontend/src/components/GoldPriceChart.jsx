import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { format, parseISO } from 'date-fns'
import './GoldPriceChart.css'

// Register all Chart.js components
Chart.register(...registerables)

const GoldPriceChart = ({ historicalData, prediction }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    // Parse the historical data
    const dates = historicalData.map(item => format(parseISO(item.date), 'dd MMM'))
    const prices = historicalData.map(item => item.price)

    // Get the last historical date to connect with prediction
    const lastHistoricalDate = dates[dates.length - 1]
    const lastHistoricalPrice = prices[prices.length - 1]

    // Create prediction dates (future dates)
    const lastDateObj = parseISO(historicalData[historicalData.length - 1].date)
    const predictionDates = [lastHistoricalDate]
    
    for (let i = 1; i <= prediction.weeklyForecast.length; i++) {
      const nextDate = new Date(lastDateObj)
      nextDate.setDate(lastDateObj.getDate() + i)
      predictionDates.push(format(nextDate, 'dd MMM'))
    }

    // Create prediction data points (starting with last historical point)
    const predictionPrices = [lastHistoricalPrice, ...prediction.weeklyForecast]

    // If there's an existing chart, destroy it
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Create the chart
    const ctx = chartRef.current.getContext('2d')
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [...dates, ...predictionDates.slice(1)],
        datasets: [
          {
            label: 'ราคาทองคำในอดีต',
            data: prices,
            borderColor: 'rgba(212, 175, 55, 1)',
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            borderWidth: 2,
            tension: 0.3,
            pointBackgroundColor: 'rgba(212, 175, 55, 1)',
            fill: true,
          },
          {
            label: 'การคาดการณ์',
            data: Array(dates.length - 1).fill(null).concat(predictionPrices),
            borderColor: 'rgba(76, 175, 80, 0.8)',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            borderWidth: 2,
            borderDash: [5, 5],
            tension: 0.3,
            pointBackgroundColor: 'rgba(76, 175, 80, 0.8)',
            pointRadius: 3,
            pointHoverRadius: 5,
            fill: true,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2,
        layout: {
          padding: {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: true,
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              maxRotation: 45,
              minRotation: 45
            }
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              callback: (value) => `$${value.toFixed(2)}`
            },
            suggestedMin: Math.min(...prices) - 10,
            suggestedMax: Math.max(...prices, ...prediction.weeklyForecast) + 10
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'rgba(255, 255, 255, 0.7)',
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`
              }
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },
        elements: {
          point: {
            radius: 2,
            hoverRadius: 5
          }
        }
      }
    })

    // ปรับขนาดกราฟเมื่อหน้าจอเปลี่ยนขนาด
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    }
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    }
  }, [historicalData, prediction])

  const periodOptions = ['1D', '1W', '1M', '3M', '6M', '1Y', 'All']

  return (
    <div className="chart-container">
      <div className="chart-controls">
        <div className="period-selector">
          {periodOptions.map(period => (
            <button 
              key={period} 
              className={`period-button ${period === '1M' ? 'active' : ''}`}
            >
              {period}
            </button>
          ))}
        </div>
        <div className="chart-options">
          <select className="chart-type-select">
            <option value="line">Line Chart</option>
            <option value="candlestick">Candlestick</option>
          </select>
        </div>
      </div>
      <div className="chart-wrapper">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="chart-footer">
        <div className="prediction-info">
          <span className="prediction-label">AI การทำนายทิศทาง:</span>
          <span className={`prediction-direction ${prediction.direction}`}>
            {prediction.direction === 'up' ? 'ขึ้น ▲' : 'ลง ▼'} 
            <span className="prediction-confidence">({prediction.confidence}% ความมั่นใจ)</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default GoldPriceChart 
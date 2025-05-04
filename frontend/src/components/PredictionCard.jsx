import { format, addDays } from 'date-fns'
import './PredictionCard.css'

const PredictionCard = ({ prediction }) => {
  const today = new Date()
  const isUp = prediction.direction === 'up'
  const tomorrow = addDays(today, 1)
  
  // Generate next 5 days for weekly forecast display
  const nextDays = []
  for (let i = 0; i < prediction.weeklyForecast.length; i++) {
    const nextDay = addDays(today, i + 1)
    nextDays.push({
      date: format(nextDay, 'E, MMM d'),
      price: prediction.weeklyForecast[i]
    })
  }

  // Calculate the accuracy metrics
  const accuracyHistory = [
    { period: '1 เดือน', value: 92 },
    { period: '3 เดือน', value: 88 },
    { period: '6 เดือน', value: 85 },
    { period: '1 ปี', value: 83 }
  ]

  return (
    <div className="prediction-card">
      <div className="prediction-header">
        <div className="prediction-title">AI ทำนายราคาทองคำ</div>
        <div className="prediction-date">สำหรับ {format(tomorrow, 'EEEE, MMMM d, yyyy')}</div>
      </div>

      <div className="main-prediction">
        <div className={`direction-indicator ${isUp ? 'up' : 'down'}`}>
          <div className="direction-arrow">{isUp ? '▲' : '▼'}</div>
          <div className="direction-text">{isUp ? 'ขึ้น' : 'ลง'}</div>
        </div>
        
        <div className="prediction-details">
          <div className="prediction-price">
            <span className="label">ราคาที่คาดการณ์:</span>
            <span className="value">${prediction.nextDayPrice.toFixed(2)}</span>
          </div>
          
          <div className="prediction-confidence">
            <div className="confidence-value">{prediction.confidence}%</div>
            <div className="confidence-bar">
              <div 
                className="confidence-fill"
                style={{ width: `${prediction.confidence}%` }}
              ></div>
            </div>
            <div className="confidence-label">ความมั่นใจ</div>
          </div>
        </div>
      </div>

      <div className="weekly-forecast">
        <div className="section-title">การคาดการณ์รายวัน</div>
        <div className="forecast-days">
          {nextDays.map((day, index) => (
            <div key={index} className="forecast-day">
              <div className="day-name">{day.date}</div>
              <div className={`day-price ${day.price > (index > 0 ? nextDays[index-1].price : prediction.nextDayPrice) ? 'up' : 'down'}`}>
                ${day.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="model-accuracy">
        <div className="section-title">ความแม่นยำของโมเดล</div>
        <div className="accuracy-metrics">
          {accuracyHistory.map((item, index) => (
            <div key={index} className="accuracy-item">
              <div className="accuracy-label">{item.period}</div>
              <div className="accuracy-bar-container">
                <div className="accuracy-bar" style={{ width: `${item.value}%` }}></div>
                <div className="accuracy-value">{item.value}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="prediction-factors">
        <div className="section-title">ปัจจัยที่มีผลต่อการทำนาย</div>
        <ul className="factors-list">
          <li>ความเคลื่อนไหวของดอลลาร์สหรัฐ</li>
          <li>ความไม่แน่นอนทางเศรษฐกิจโลก</li>
          <li>ความต้องการทองคำจากธนาคารกลาง</li>
          <li>อัตราเงินเฟ้อและอัตราดอกเบี้ย</li>
        </ul>
      </div>
    </div>
  )
}

export default PredictionCard 
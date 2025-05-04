import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import './Header.css'

const Header = ({ currentPrice, previousClose }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  const priceChange = currentPrice - previousClose
  const percentChange = ((priceChange / previousClose) * 100).toFixed(2)
  const isUp = priceChange >= 0

  return (
    <header className="header">
      <div className="header-top">
        <h1>GOLD PRICE AI PREDICTION</h1>
        <div className="header-time">
          <p>{format(currentTime, 'MMMM d, yyyy')}</p>
          <p>{format(currentTime, 'HH:mm:ss')}</p>
        </div>
      </div>
      
      <div className="price-display">
        <div className="current-price">
          <span className="price-label">ราคาปัจจุบัน</span>
          <span className="price-value">${currentPrice.toFixed(2)}</span>
        </div>
        
        <div className={`price-change ${isUp ? 'up' : 'down'}`}>
          <span className="change-value">
            {isUp ? '+' : ''}{priceChange.toFixed(2)} ({isUp ? '+' : ''}{percentChange}%)
          </span>
          <span className="direction-arrow">{isUp ? '▲' : '▼'}</span>
        </div>
      </div>
      
      <div className="market-status">
        <span className="status-indicator online"></span>
        <span>ตลาดเปิด</span>
        <span className="update-time">อัพเดทล่าสุด: {format(currentTime, 'HH:mm:ss')}</span>
      </div>
    </header>
  )
}

export default Header 
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p className="disclaimer">
            ข้อมูลและการคาดการณ์ที่แสดงนี้มีวัตถุประสงค์เพื่อเป็นข้อมูลเท่านั้น ไม่ใช่คำแนะนำในการลงทุน
          </p>
          <p className="data-source">
            ข้อมูลราคาทองคำ: <span className="source">World Gold Council</span> | อัพเดทล่าสุด: 22 มิถุนายน 2023
          </p>
        </div>
        
        <div className="footer-links">
          <a href="#" className="footer-link">เกี่ยวกับเรา</a>
          <a href="#" className="footer-link">วิธีการทำนาย</a>
          <a href="#" className="footer-link">ข้อมูลเพิ่มเติม</a>
          <a href="#" className="footer-link">ติดต่อ</a>
        </div>
      </div>
      
      <div className="copyright">
        <p>© 2023 Gold Price AI Prediction. สงวนลิขสิทธิ์.</p>
      </div>
    </footer>
  )
}

export default Footer 
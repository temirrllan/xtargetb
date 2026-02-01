import './PhoneMockup.css'

export default function PhoneMockup() {
  return (
    <div className="phone-mockup">
      <div className="phone-mockup__floating-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      </div>
      <div className="phone-mockup__device">
        <div className="phone-mockup__screen">
          <div className="phone-mockup__header">
            <span className="phone-mockup__logo">
              <span className="phone-mockup__logo-x">X</span>
              Target-X
            </span>
            <svg className="phone-mockup__chart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div className="phone-mockup__metrics">
            <div className="phone-mockup__row">
              <span>Подписчики</span>
              <div className="phone-mockup__bar">
                <div className="phone-mockup__fill" style={{ width: '45%' }} />
              </div>
              <span className="phone-mockup__pct">+12%</span>
            </div>
            <div className="phone-mockup__row">
              <span>Охват</span>
              <div className="phone-mockup__bar">
                <div className="phone-mockup__fill" style={{ width: '68%' }} />
              </div>
              <span className="phone-mockup__pct">+24%</span>
            </div>
            <div className="phone-mockup__row">
              <span>Вовлечённость</span>
              <div className="phone-mockup__bar">
                <div className="phone-mockup__fill" style={{ width: '32%' }} />
              </div>
              <span className="phone-mockup__pct">+8%</span>
            </div>
          </div>
          <button type="button" className="phone-mockup__cta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Купить лайки
          </button>
        </div>
      </div>
    </div>
  )
}

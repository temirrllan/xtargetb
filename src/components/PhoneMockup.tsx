import { useState, useEffect, useRef } from 'react'
import './PhoneMockup.css'

const METRICS = [
  { label: 'Подписчики', target: 12, fillWidth: 45 },
  { label: 'Охват', target: 24, fillWidth: 68 },
  { label: 'Вовлечённость', target: 8, fillWidth: 32 },
]

export default function PhoneMockup() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedMetrics, setAnimatedMetrics] = useState(
    METRICS.map(() => ({ value: 0, width: 0 }))
  )
  const [isMaxed, setIsMaxed] = useState(false)
  const phoneRef = useRef<HTMLDivElement>(null)
  const animationIntervalRef = useRef<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '-50px',
      }
    )

    if (phoneRef.current) {
      observer.observe(phoneRef.current)
    }

    return () => {
      if (phoneRef.current) {
        observer.unobserve(phoneRef.current)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    // Задержка перед началом анимации
    const startDelay = 400 // 400мс задержка для видимости нуля
    
    const delayTimer = setTimeout(() => {
      const duration = 1500 // 1.5 секунды
      const steps = 60
      const stepDuration = duration / steps

      let currentStep = 0

      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        // Easing function для плавности (ease-out)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)

        setAnimatedMetrics(
          METRICS.map((metric) => ({
            value: Math.round(metric.target * easeOutQuart),
            width: metric.fillWidth * easeOutQuart,
          }))
        )

        if (currentStep >= steps) {
          clearInterval(interval)
        }
      }, stepDuration)

      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(delayTimer)
  }, [isVisible])

  const handleBoostClick = () => {
    if (isMaxed) return

    // Останавливаем текущую анимацию если есть
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current)
    }

    setIsMaxed(true)

    const currentValues = animatedMetrics.map(m => m.value)
    const currentWidths = animatedMetrics.map(m => m.width)

    const duration = 2000 // 2 секунды до 100%
    const steps = 80
    const stepDuration = duration / steps

    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      // Ease-out для плавности
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)

      setAnimatedMetrics(
        METRICS.map((metric, index) => {
          const startValue = currentValues[index]
          const startWidth = currentWidths[index]
          
          return {
            value: Math.round(startValue + (100 - startValue) * easeOutCubic),
            width: startWidth + (100 - startWidth) * easeOutCubic,
          }
        })
      )

      if (currentStep >= steps) {
        clearInterval(interval)
      }
    }, stepDuration)

    animationIntervalRef.current = interval
  }

  return (
    <div className="phone-mockup" ref={phoneRef}>
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
            {METRICS.map((_, index) => (
              <div key={METRICS[index].label} className="phone-mockup__row">
                <span>{METRICS[index].label}</span>
                <div className="phone-mockup__bar">
                  <div 
                    className="phone-mockup__fill" 
                    style={{ width: `${animatedMetrics[index].width}%` }} 
                  />
                </div>
                <span className="phone-mockup__pct">
                  +{animatedMetrics[index].value}%
                </span>
              </div>
            ))}
          </div>
          <button 
            type="button" 
            className={`phone-mockup__cta ${isMaxed ? 'phone-mockup__cta--maxed' : ''}`}
            onClick={handleBoostClick}
            disabled={isMaxed}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMaxed ? (
                <path d="M20 6L9 17l-5-5" />
              ) : (
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              )}
            </svg>
            {isMaxed ? 'Максимум достигнут!' : 'Купить лайки'}
          </button>
        </div>
      </div>
    </div>
  )
}
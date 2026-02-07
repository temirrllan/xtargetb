import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import HeroScene from '../scenes/HeroScene'
import { smoothScrollTo } from '../utils/smoothScroll'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__canvas-wrap">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 60 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="hero__content">
        <span className="hero__badge hero__animate hero__animate--1">
          <svg className="hero__badge-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.69 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
          </svg>
          Telegram Mini App
        </span>

        <div className="hero__icon-wrap hero__animate hero__animate--2">
          <div className="hero__icon-waves" aria-hidden>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="hero__wave" style={{ animationDelay: `${i * 0.6}s` }} />
            ))}
          </div>
          <div className="hero__icon-glow hero__icon-bg" />
          <div className="hero__icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </div>
          <span className="hero__icon-telegram" aria-hidden>
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.69 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
            </svg>
          </span>
        </div>

        <h1 className="hero__title hero__animate hero__animate--3">
          Target-<span className="hero__title-x">X</span>
        </h1>
        <p className="hero__slogan hero__animate hero__animate--4">
          Продвигай канал или зарабатывай в Telegram
        </p>
        <p className="hero__desc hero__animate hero__animate--5">
          Уникальная платформа для владельцев каналов и тех, кто хочет зарабатывать на простых заданиях
        </p>

        <div className="hero__cta hero__animate hero__animate--6">
          <a 
            href="https://t.me/TargetXAI_bot" 
            className="hero__btn hero__btn--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
            Открыть бот
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a 
            href="#tariffs" 
            className="hero__btn hero__btn--secondary"
            onClick={(e) => {
              e.preventDefault()
              smoothScrollTo('tariffs')
            }}
          >
            Узнать тарифы
          </a>
        </div>
      </div>
    </section>
  )
}
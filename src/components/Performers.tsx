import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import OrbitalScene from '../scenes/OrbitalScene'
import './Performers.css'

const FEATURES = [
  {
    icon: 'lightning',
    title: 'Простые задания',
    desc: 'Лайки, подписки и просмотры — выполняйте задания за секунды',
  },
  {
    icon: 'infinity',
    title: 'Мгновенные монеты',
    desc: 'Получайте монеты сразу после выполнения каждого задания',
  },
  {
    icon: 'wallet',
    title: 'Вывод в TON',
    desc: 'Конвертируйте монеты в криптовалюту TON и выводите на кошелёк',
  },
  {
    icon: 'gift',
    title: 'Бонусы и рефералы',
    desc: 'Приглашайте друзей и получайте процент с их заработка',
  },
]

function FeatureIcon({ name }: { name: string }) {
  const c = { strokeWidth: 2, fill: 'none', stroke: 'currentColor' }
  if (name === 'lightning')
    return (
      <svg viewBox="0 0 24 24" {...c}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )
  if (name === 'infinity')
    return (
      <svg viewBox="0 0 24 24" {...c}>
        <path d="M12 12c-2-2.67-4-4-6-4-2.5 0-4 1.5-4 4s1.5 4 4 4c2 0 4-1.33 6-4 2 2.67 4 4 6 4 2.5 0 4-1.5 4-4s-1.5-4-4-4c-2 0-4 1.33-6 4z" />
      </svg>
    )
  if (name === 'wallet')
    return (
      <svg viewBox="0 0 24 24" {...c}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <path d="M16 14h.01" />
      </svg>
    )
  if (name === 'gift')
    return (
      <svg viewBox="0 0 24 24" {...c}>
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    )
  return null
}

export default function Performers() {
  return (
    <section className="performers">
      <div className="performers__container">
        <div className="performers__visual">
          <div className="performers__hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span>Перетащите для вращения</span>
          </div>
          <div className="performers__canvas-wrap">
            <Canvas
              camera={{ position: [0, 0, 45], fov: 50 }}
              dpr={[1, 2]}
              gl={{ alpha: true, antialias: true }}
            >
              <Suspense fallback={null}>
                <OrbitalScene />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={Math.PI / 1.5}
                  autoRotate={true}
                  autoRotateSpeed={0.5}
                  rotateSpeed={0.5}
                  dampingFactor={0.05}
                  enableDamping={true}
                />
              </Suspense>
            </Canvas>
          </div>
        </div>
        <div className="performers__content">
          <span className="performers__badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 12c-2-2.67-4-4-6-4-2.5 0-4 1.5-4 4s1.5 4 4 4c2 0 4-1.33 6-4 2 2.67 4 4 6 4 2.5 0 4-1.5 4-4s-1.5-4-4-4c-2 0-4 1.33-6 4z" />
            </svg>
            Для исполнителей
          </span>
          <h2 className="performers__title">
            Зарабатывай <span className="performers__highlight">TON</span> на заданиях
          </h2>
          <p className="performers__desc">
            Выполняй простые задания: лайки, подписки, просмотры. Получай монеты и выводи их в криптовалюту TON на свой кошелёк.
          </p>
          <div className="performers__grid">
            {FEATURES.map((f) => (
              <article key={f.title} className="performers__card">
                <div className="performers__card-icon">
                  <FeatureIcon name={f.icon} />
                </div>
                <h3 className="performers__card-title">{f.title}</h3>
                <p className="performers__card-desc">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
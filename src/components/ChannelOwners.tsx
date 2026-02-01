import PhoneMockup from './PhoneMockup'
import './ChannelOwners.css'

const FEATURES = [
  {
    icon: 'chart',
    title: 'Детальная аналитика',
    desc: 'Отслеживайте рост подписчиков, охваты и вовлечённость в реальном времени',
  },
  {
    icon: 'heart',
    title: 'Покупка лайков',
    desc: 'Быстрое продвижение постов с помощью реальных пользователей платформы',
  },
  {
    icon: 'growth',
    title: 'Рост канала',
    desc: 'Интеллектуальные инструменты для органического роста вашей аудитории',
  },
  {
    icon: 'shield',
    title: 'Безопасность',
    desc: 'Все действия выполняются реальными пользователями без риска бана',
  },
]

function FeatureIcon({ name }: { name: string }) {
  const c = { strokeWidth: 2, fill: 'none', stroke: 'currentColor' }
  if (name === 'chart')
    return (
      <svg viewBox="0 0 24 24" {...c}>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    )
  if (name === 'heart')
    return (
      <svg viewBox="0 0 24 24" {...c}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    )
  if (name === 'growth')
    return (
      <svg viewBox="0 0 24 24" {...c}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    )
  if (name === 'shield')
    return (
      <svg viewBox="0 0 24 24" {...c}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  return null
}

export default function ChannelOwners() {
  return (
    <section className="channel-owners">
      <div className="channel-owners__container">
        <div className="channel-owners__content">
          <span className="channel-owners__badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            Для владельцев каналов
          </span>
          <h2 className="channel-owners__title">
            Развивай свой канал <span className="channel-owners__highlight">эффективно</span>
          </h2>
          <p className="channel-owners__desc">
            Получите полный контроль над ростом вашего канала. Анализируйте статистику, продвигайте посты и привлекайте реальную аудиторию.
          </p>
          <div className="channel-owners__grid">
            {FEATURES.map((f) => (
              <article key={f.title} className="channel-owners__card">
                <div className="channel-owners__card-icon">
                  <FeatureIcon name={f.icon} />
                </div>
                <h3 className="channel-owners__card-title">{f.title}</h3>
                <p className="channel-owners__card-desc">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="channel-owners__visual">
          <PhoneMockup />
        </div>
      </div>
    </section>
  )
}

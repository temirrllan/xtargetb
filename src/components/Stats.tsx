import './Stats.css'

const STATS = [
  {
    icon: 'person',
    value: '50K+',
    label: 'Активных пользователей',
  },
  {
    icon: 'check',
    value: '2M+',
    label: 'Выполненных заданий',
  },
  {
    icon: 'wallet',
    value: '150K+',
    label: 'TON выведено',
  },
  {
    icon: 'broadcast',
    value: '10K+',
    label: 'Каналов подключено',
  },
]

function StatIcon({ name }: { name: string }) {
  const common = { strokeWidth: 2, fill: 'none', stroke: 'currentColor' }
  if (name === 'person')
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
      </svg>
    )
  if (name === 'check')
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M20 6L9 17l-5-5" />
      </svg>
    )
  if (name === 'wallet')
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <path d="M16 14h.01" />
      </svg>
    )
  if (name === 'broadcast')
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M18 8a6 6 0 0 1 0 12M14 11a2 2 0 0 1 0 4M10 12h.01" />
        <circle cx="6" cy="12" r="2" />
      </svg>
    )
  return null
}

export default function Stats() {
  return (
    <section className="stats" id="functions">
      <div className="stats__container">
        {STATS.map((stat) => (
          <article key={stat.label} className="stats__card">
            <div className="stats__icon">
              <StatIcon name={stat.icon} />
            </div>
            <span className="stats__value">{stat.value}</span>
            <span className="stats__label">{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

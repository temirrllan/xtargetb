import './Tariffs.css'

const PLUS_FEATURES = [
  'Базовая аналитика канала',
  'До 5,000 лайков в месяц',
  'Статистика за 30 дней',
  'Поддержка в чате',
  '1 канал',
]

const PRO_FEATURES = [
  'Расширенная аналитика',
  'До 20,000 лайков в месяц',
  'Статистика за всё время',
  'Приоритетная поддержка',
  'До 5 каналов',
  'API доступ',
  'Автоматизация постинга',
]

export default function Tariffs() {
  return (
    <section className="tariffs" id="tariffs">
      <div className="tariffs__container">
        <span className="tariffs__badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          Тарифы
        </span>
        <h2 className="tariffs__title">Выбери свой тариф</h2>
        <p className="tariffs__subtitle">
          Начни развивать свой канал уже сегодня с подходящим тарифом
        </p>

        <div className="tariffs__cards">
          <article className="tariffs__card tariffs__card--plus">
            <h3 className="tariffs__card-name">Plus</h3>
            <p className="tariffs__card-desc">Идеально для начинающих каналов</p>
            <div className="tariffs__price">
              <span className="tariffs__price-value">$150</span>
              <span className="tariffs__price-period">/месяц</span>
            </div>
            <ul className="tariffs__features">
              {PLUS_FEATURES.map((f) => (
                <li key={f}>
                  <span className="tariffs__check" />
                  {f}
                </li>
              ))}
            </ul>
            <a 
              href="https://t.me/TargetXAI_bot" 
              className="tariffs__btn tariffs__btn--outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Выбрать Plus →
            </a>
          </article>

          <article className="tariffs__card tariffs__card--pro">
            <span className="tariffs__popular">Популярный</span>
            <h3 className="tariffs__card-name">Pro</h3>
            <p className="tariffs__card-desc">Максимум возможностей для роста</p>
            <div className="tariffs__price">
              <span className="tariffs__price-value">$280</span>
              <span className="tariffs__price-period">/месяц</span>
            </div>
            <ul className="tariffs__features">
              {PRO_FEATURES.map((f) => (
                <li key={f}>
                  <span className="tariffs__check" />
                  {f}
                </li>
              ))}
            </ul>
            <a 
              href="https://t.me/TargetXAI_bot" 
              className="tariffs__btn tariffs__btn--primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Выбрать Pro →
            </a>
          </article>
        </div>

        <p className="tariffs__payment">
          Все платежи принимаются в криптовалюте TON
        </p>
      </div>
    </section>
  )
}
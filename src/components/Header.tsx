import { useState } from 'react'
import './Header.css'

const NAV_LINKS = [
  { id: 'functions', label: 'Функции', href: '#functions' },
  { id: 'tariffs', label: 'Тарифы', href: '#tariffs' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header__container">
        <a href="#" className="header__logo">
          <span className="header__logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </span>
          <span className="header__logo-text">Target-<span className="header__logo-x">X</span></span>
        </a>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.id} href={link.href} className="header__link" onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#open-bot" className="header__cta header__cta--green">
          <svg className="header__cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
          Открыть бот
        </a>

        <button
          type="button"
          className="header__burger"
          aria-label="Меню"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

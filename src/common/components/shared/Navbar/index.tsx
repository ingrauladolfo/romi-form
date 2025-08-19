import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa6'
import { useTheme, useLanguage } from '../../../context'
import { MX, US } from 'country-flag-icons/react/3x2'
import { getHoverBg } from '../../../assets/styles/Navbar'
import type { imgProps } from '../../../interfaces/components/Navbar'

const Navbar: React.FC<imgProps> = ({ logoSrc = '/Rom.webp', logoAlt = 'Logo' }) => {
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang } = useLanguage()

  return (
    <nav
      className={`w-full flex items-center justify-between gap-4 px-4 py-2 ${
        theme === 'dark' ? 'bg-gray-950' : 'bg-gray-100'
      }`}
    >
      {/* Logo (lado izquierdo) */}
      <div className="flex items-center">
        <img
          src={logoSrc}
          alt={logoAlt}
          className="h-8 w-auto object-contain"
          draggable={false}
        />
      </div>

      {/* Controles (lado derecho) */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`p-2 rounded-full text-sm transition-all ${getHoverBg(theme)}`}
        >
          {theme === 'dark' ? <FaMoon /> : <FaSun />}
        </button>

        <button
          onClick={toggleLang}
          aria-label="Toggle language"
          className={`p-2 rounded-full transition-all ${getHoverBg(theme)}`}
        >
          {lang === 'es' ? <MX className="h-5 w-5" /> : <US className="h-5 w-5" />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar

'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { FaSun, FaMoon } from 'react-icons/fa'

const ThemeToggleButton = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-500" />}
    </button>
  )
}

export default ThemeToggleButton 
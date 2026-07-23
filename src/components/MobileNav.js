'use client'

import { useState } from 'react'
import ThemeToggleButton from './ThemeToggleButton'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md text-foreground hover:bg-accent transition-colors"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
          <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
        </div>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
          {/* Close Button */}
          <button
            onClick={closeMenu}
            className="absolute top-4 right-4 p-2 rounded-md text-foreground hover:bg-accent transition-colors"
            aria-label="Close menu"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="block w-5 h-0.5 bg-current rotate-45 absolute"></span>
              <span className="block w-5 h-0.5 bg-current -rotate-45 absolute"></span>
            </div>
          </button>
          <div className="flex flex-col items-center justify-center min-h-screen space-y-8 p-4">
            <a
              href="#home"
              onClick={closeMenu}
              className="text-2xl font-medium hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#projects"
              onClick={closeMenu}
              className="text-2xl font-medium hover:text-primary transition-colors"
            >
              Case Studies
            </a>
            <a
              href="#about"
              onClick={closeMenu}
              className="text-2xl font-medium hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#skills"
              onClick={closeMenu}
              className="text-2xl font-medium hover:text-primary transition-colors"
            >
              Skills
            </a>
            <a
              href="#testimonials"
              onClick={closeMenu}
              className="text-2xl font-medium hover:text-primary transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="text-2xl font-medium hover:text-primary transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </div>
  )
} 
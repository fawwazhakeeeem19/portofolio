import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, Code2 } from 'lucide-react'
import { CONFIG } from '../../lib/config'

interface NavbarProps {
  isDark: boolean
  toggleTheme: () => void
}

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Stats', href: '#stats' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-2xl ${
          scrolled
            ? 'glass-strong shadow-neon-blue px-6 py-3'
            : 'bg-transparent px-6 py-4'
        }`}
        style={{
          width: scrolled ? 'min(680px, 90vw)' : 'min(800px, 95vw)',
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNav('#hero') }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center">
              <Code2 size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-sm gradient-text hidden sm:block">
              {CONFIG.GITHUB_USERNAME}
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNav(item.href) }}
                className={`px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-all duration-200 ${
                  activeSection === item.href.slice(1)
                    ? 'text-[#00d4ff] bg-[#00d4ff]/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg glass neon-border flex items-center justify-center text-white/70 hover:text-white transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun size={14} /> : <Moon size={14} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <motion.a
              href={CONFIG.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-xs font-display font-semibold text-white shadow-neon-blue"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,212,255,0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Hire Me</span>
            </motion.a>

            {/* Mobile Menu */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 rounded-lg glass neon-border flex items-center justify-center text-white/70"
              whileTap={{ scale: 0.9 }}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-40 glass-strong rounded-2xl p-4 shadow-neon-blue"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNav(item.href) }}
                className="flex items-center px-4 py-3 rounded-xl text-sm font-body text-white/70 hover:text-white hover:bg-white/5 transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

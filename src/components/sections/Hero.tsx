import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ArrowDown, Github, MapPin, Zap, Terminal, Instagram } from 'lucide-react'
import type { GitHubUser } from '../../types'
import { CONFIG } from '../../lib/config'
import { formatNumber } from '../../lib/utils'

interface HeroProps {
  user: GitHubUser | null
  loading: boolean
}

export function Hero({ user, loading }: HeroProps) {
  const scrollToNext = () => {
    document.querySelector('#stats')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Central glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 100%)',
        }}
      />

      <div className="container mx-auto px-4 pt-24 pb-16 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left - Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-6"
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-[#06ffd8]"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs font-mono text-white/70">Available for hire</span>
              <Zap size={12} className="text-[#00d4ff]" />
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
            >
              <span className="text-white">
                {loading ? CONFIG.name : (user?.name || CONFIG.name)}
              </span>
            </motion.h1>

            {/* Typing animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-2 justify-center lg:justify-start mb-6"
            >
              <Terminal size={16} className="text-[#00d4ff]" />
              <span className="font-mono text-lg sm:text-xl text-[#00d4ff]">
                <TypeAnimation
                  sequence={[
                    'Full-Stack Developer',
                    2000,
                    'React Specialist',
                    2000,
                    'UI/UX Engineer',
                    2000,
                    'Open Source Lover',
                    2000,
                    'Problem Solver',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
              <span className="animate-typing-cursor font-mono text-[#00d4ff]">|</span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-white/60 font-body text-base sm:text-lg max-w-lg mx-auto lg:mx-0 mb-4 leading-relaxed"
            >
              {user?.bio || CONFIG.bio}
            </motion.p>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-2 justify-center lg:justify-start mb-8 text-white/40 text-sm font-mono"
            >
              <MapPin size={14} className="text-[#a855f7]" />
              {user?.location || CONFIG.location}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10"
            >
              <motion.a
                href={CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#a855f7] font-display font-semibold text-sm text-white shadow-neon-blue"
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,212,255,0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={16} />
                View GitHub
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl glass neon-border font-display font-semibold text-sm text-white/80 hover:text-white hover:border-[#a855f7]/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              {[
             { icon: Github, url: CONFIG.social.github, label: 'GitHub' },
            { icon: Instagram, url: CONFIG.social.instagram, label: 'Instagram' },
            { 
  icon: () => <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.053a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>, 
  url: CONFIG.social.discord, 
  label: 'Discord' 
},
              ].map(({ icon: Icon, url, label }) => (
                <motion.a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg glass neon-border flex items-center justify-center text-white/50 hover:text-[#00d4ff] transition-all"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  title={label}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right - Avatar Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
            className="relative flex-shrink-0"
          >
            {/* Glow ring */}
            <motion.div
              className="absolute inset-[-16px] rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #00d4ff, #a855f7, #06ffd8, #00d4ff)',
                filter: 'blur(20px)',
                opacity: 0.4,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />

            {/* Border ring */}
            <motion.div
              className="absolute inset-[-3px] rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #00d4ff, #a855f7, #06ffd8, #00d4ff)',
                padding: '2px',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />

            {/* Avatar */}
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-[#030712] z-10">
              {loading ? (
                <div className="w-full h-full bg-[#0a0f1e] animate-pulse flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
              ) : (
                <img
                  src={user?.avatar_url || `https://api.dicebear.com/7.x/identicon/svg?seed=${CONFIG.GITHUB_USERNAME}`}
                  alt={user?.name || CONFIG.name}
                  className="w-full h-full object-cover"
                />
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/20 to-transparent" />
            </div>

            {/* Floating stats badges */}
            <motion.div
              className="absolute -top-4 -right-4 glass neon-border px-3 py-2 rounded-xl text-center z-20"
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="font-display font-bold text-[#00d4ff] text-lg leading-none">
                {loading ? '—' : formatNumber(user?.public_repos || 0)}
              </p>
              <p className="font-mono text-[10px] text-white/50">repos</p>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 glass neon-border px-3 py-2 rounded-xl text-center z-20"
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="font-display font-bold text-[#a855f7] text-lg leading-none">
                {loading ? '—' : formatNumber(user?.followers || 0)}
              </p>
              <p className="font-mono text-[10px] text-white/50">followers</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
          <ArrowDown size={16} />
        </motion.button>
      </div>
    </section>
  )
}

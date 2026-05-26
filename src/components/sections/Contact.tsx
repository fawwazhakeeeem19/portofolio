import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Github, Instagram, Send, MessageSquare, MapPin, Copy, Check } from 'lucide-react'
import { CONFIG } from '../../lib/config'

export function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(CONFIG.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const socials = [
    { icon: Github, label: 'GitHub', url: CONFIG.social.github, color: '#ffffff', handle: '@' + CONFIG.GITHUB_USERNAME },
    { icon: Instagram, label: 'Instagram', url: CONFIG.social.instagram, color: '#e1306c', handle: '@fawwaz.hakeeem' },
    {
      icon: () => (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.053a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
        </svg>
      ),
      label: 'Discord',
      url: CONFIG.social.discord,
      color: '#5865f2',
      handle: 'fawwazhakeeem19',
    },
  ]

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-4">
            <MessageSquare size={14} className="text-[#ff2d78]" />
            <span className="font-mono text-xs text-white/60">get in touch</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text-alt">Let's Build Together</span>
          </h2>
          <p className="text-white/50 font-body max-w-md mx-auto">
            Punya project seru? Mau kolaborasi? Atau sekadar ngobrol soal tech & security?
            Gw selalu terbuka!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left - Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 glass neon-border rounded-2xl p-8 relative overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'radial-gradient(ellipse at 0% 100%, rgba(255,45,120,0.15), transparent 60%), radial-gradient(ellipse at 100% 0%, rgba(168,85,247,0.1), transparent 50%)',
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,45,120,0.2), rgba(168,85,247,0.2))',
                    border: '1px solid rgba(255,45,120,0.3)',
                  }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Mail size={22} className="text-[#ff2d78]" />
                </motion.div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Kirim Email</h3>
                  <p className="font-mono text-xs text-white/40">Gw bales dalam 24 jam</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 glass rounded-xl border border-white/5 mb-6">
                <span className="font-mono text-sm text-white/70 flex-1 truncate">{CONFIG.email}</span>
                <motion.button
                  onClick={copyEmail}
                  className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/50 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {copied ? <Check size={14} className="text-[#06ffd8]" /> : <Copy size={14} />}
                </motion.button>
              </div>

              <motion.a
                href={`mailto:${CONFIG.email}`}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-display font-semibold text-sm text-white"
                style={{
                  background: 'linear-gradient(135deg, #ff2d78, #a855f7)',
                  boxShadow: '0 4px 30px rgba(255,45,120,0.3)',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 6px 40px rgba(255,45,120,0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={16} />
                Kirim Pesan
              </motion.a>

              <div className="flex items-center gap-2 mt-4 text-white/30">
                <MapPin size={12} />
                <span className="font-mono text-xs">{CONFIG.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Socials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 flex flex-col gap-3"
          >
            {socials.map((social, i) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 glass neon-border rounded-xl transition-all"
                  whileHover={{ x: 4, borderColor: social.color + '60' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${social.color}15`, border: `1px solid ${social.color}30` }}
                  >
                    <span style={{ color: social.color }}>
                      <Icon />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-sm text-white">{social.label}</p>
                    <p className="font-mono text-xs text-white/40 truncate">{social.handle}</p>
                  </div>
                  <Send size={12} className="text-white/20" />
                </motion.a>
              )
            })}

            {/* Status card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="p-4 glass rounded-xl border border-[#06ffd8]/20 mt-auto"
              style={{ background: 'rgba(6,255,216,0.04)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#06ffd8]"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-xs text-[#06ffd8]">Open to collaborate</span>
              </div>
              <p className="font-body text-xs text-white/40 leading-relaxed">
                Terbuka untuk project freelance, kolaborasi, dan peluang baru di bidang web dev & cybersecurity.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}

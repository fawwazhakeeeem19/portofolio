import { motion } from 'framer-motion'

// Lightweight custom particles (no heavy tsparticles bundle needed)

export function ParticlesBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-100" />

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -60, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6,255,216,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#a855f7' : '#06ffd8',
            boxShadow: `0 0 ${Math.random() * 10 + 4}px currentColor`,
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            y: [0, -(Math.random() * 100 + 50), 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 8,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)',
        }}
        animate={{ top: ['-5%', '105%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
      />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-30">
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#00d4ff]" />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 opacity-30">
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#00d4ff]" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-30">
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#a855f7]" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-30">
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#a855f7]" />
      </div>
    </div>
  )
}

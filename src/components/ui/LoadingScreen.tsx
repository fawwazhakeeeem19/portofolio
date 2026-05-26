import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG } from '../../lib/config'

interface LoadingScreenProps {
  isLoading: boolean
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#030712] flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Grid bg */}
          <div className="absolute inset-0 grid-bg opacity-50" />

          {/* Central content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
              className="w-20 h-20 rounded-2xl mb-8 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #00d4ff20, #a855f720)',
                border: '2px solid rgba(0,212,255,0.4)',
                boxShadow: '0 0 40px rgba(0,212,255,0.3)',
              }}
            >
              <span className="font-mono text-3xl font-bold gradient-text">&lt;/&gt;</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-display text-2xl font-bold gradient-text mb-2"
            >
              {CONFIG.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-mono text-xs text-white/40 mb-10"
            >
              {CONFIG.title}
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-48 h-0.5 bg-white/5 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #00d4ff, #a855f7)',
                  boxShadow: '0 0 10px rgba(0,212,255,0.8)',
                }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="font-mono text-[10px] text-white/20 mt-4"
            >
              Initializing portfolio...
            </motion.p>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 font-mono text-[10px] text-[#00d4ff]/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            SYS::BOOT
          </motion.div>
          <motion.div
            className="absolute bottom-8 right-8 font-mono text-[10px] text-[#a855f7]/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            v1.0.0
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

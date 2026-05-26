import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, GraduationCap, Trophy, Clock } from 'lucide-react'
import { CONFIG } from '../../lib/config'

const typeConfig = {
  work: { icon: Briefcase, color: '#00d4ff', label: 'Work' },
  education: { icon: GraduationCap, color: '#a855f7', label: 'Education' },
  achievement: { icon: Trophy, color: '#f59e0b', label: 'Achievement' },
}

function TimelineItem({ item, index, isLeft }: {
  item: typeof CONFIG.timeline[0]
  index: number
  isLeft: boolean
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const config = typeConfig[item.type]
  const Icon = config.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex gap-6 items-start ${isLeft ? 'flex-row-reverse text-right' : ''} md:w-1/2 ${
        isLeft ? 'md:pr-12' : 'md:pl-12'
      }`}
    >
      {/* Content */}
      <div className="flex-1">
        <motion.div
          className="glass neon-border rounded-2xl p-5 group hover:border-[#00d4ff]/50 transition-all duration-300"
          whileHover={{ y: -4, boxShadow: `0 8px 40px ${config.color}20` }}
        >
          <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'justify-end' : ''}`}>
            <span
              className="font-mono text-xs px-2 py-0.5 rounded"
              style={{ background: `${config.color}20`, color: config.color, border: `1px solid ${config.color}40` }}
            >
              {config.label}
            </span>
            <div className="flex items-center gap-1 text-white/30">
              <Clock size={10} />
              <span className="font-mono text-[10px]">{item.year}</span>
            </div>
          </div>
          <h3 className="font-display font-bold text-white text-sm mb-1">{item.title}</h3>
          <p className="font-body text-xs font-semibold mb-2" style={{ color: config.color }}>
            {item.company}
          </p>
          <p className="font-body text-xs text-white/50 leading-relaxed mb-3">{item.description}</p>
          <div className={`flex flex-wrap gap-1.5 ${isLeft ? 'justify-end' : ''}`}>
            {item.tags.map(tag => (
              <span
                key={tag}
                className="font-mono text-[10px] px-2 py-0.5 rounded glass border border-white/5 text-white/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Icon node */}
      <div className="flex-shrink-0 hidden md:flex flex-col items-center">
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: `${config.color}20`,
            border: `2px solid ${config.color}`,
            boxShadow: `0 0 20px ${config.color}40`,
          }}
          whileHover={{ scale: 1.2 }}
          animate={inView ? { scale: [0, 1.2, 1] } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
        >
          <Icon size={16} style={{ color: config.color }} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export function Timeline() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="timeline" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-4">
            <Clock size={14} className="text-[#f59e0b]" />
            <span className="font-mono text-xs text-white/60">career journey</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-white/50 font-body max-w-md mx-auto">
            My professional journey and key milestones in software development.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{
              background: 'linear-gradient(180deg, #00d4ff40, #a855f740, #00d4ff40)',
            }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
          />

          <div className="space-y-8">
            {CONFIG.timeline.map((item, i) => (
              <div key={i} className="relative flex justify-center md:block">
                {/* Mobile layout */}
                <div className="md:hidden w-full">
                  <TimelineItem item={item} index={i} isLeft={false} />
                </div>
                {/* Desktop alternating layout */}
                <div className={`hidden md:flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'} w-full`}>
                  <TimelineItem item={item} index={i} isLeft={i % 2 !== 0} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

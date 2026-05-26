import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Cpu } from 'lucide-react'
import { CONFIG } from '../../lib/config'

function SkillBar({ skill, index }: { skill: typeof CONFIG.skills[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: skill.color, boxShadow: `0 0 8px ${skill.color}` }}
          />
          <span className="font-body text-sm text-white/80 group-hover:text-white transition-colors">
            {skill.name}
          </span>
          <span className="font-mono text-[10px] text-white/30 px-2 py-0.5 rounded glass">
            {skill.category}
          </span>
        </div>
        <span className="font-mono text-xs" style={{ color: skill.color }}>{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: 0.3 + index * 0.04, ease: 'easeOut' }}
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
            boxShadow: `0 0 8px ${skill.color}60`,
          }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const categories = Array.from(new Set(CONFIG.skills.map(s => s.category)))

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-4">
            <Cpu size={14} className="text-[#06ffd8]" />
            <span className="font-mono text-xs text-white/60">tech stack</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-white/50 font-body max-w-md mx-auto">
            Technologies I work with daily and the proficiency level I've built over the years.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Skill bars */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass neon-border rounded-2xl p-6"
          >
            <h3 className="font-display font-semibold text-sm text-white/60 mb-6 uppercase tracking-wider">
              Proficiency Levels
            </h3>
            <div className="space-y-4">
              {CONFIG.skills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Categories */}
          <div className="flex flex-col gap-4">
            {categories.map((cat, i) => {
              const catSkills = CONFIG.skills.filter(s => s.category === cat)
              const avgLevel = Math.round(catSkills.reduce((s, sk) => s + sk.level, 0) / catSkills.length)

              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass neon-border rounded-2xl p-4 group hover:border-[#a855f7]/50 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-display font-semibold text-xs text-white/70 uppercase tracking-wider">
                      {cat}
                    </h4>
                    <span className="font-mono text-xs text-[#a855f7]">{avgLevel}%</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {catSkills.map(skill => (
                      <span
                        key={skill.name}
                        className="px-2 py-1 rounded-lg font-mono text-[11px] transition-all group-hover:scale-105"
                        style={{
                          background: `${skill.color}15`,
                          border: `1px solid ${skill.color}40`,
                          color: skill.color,
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}

            {/* Tools bento */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="glass neon-border rounded-2xl p-4"
              style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.05), rgba(168,85,247,0.05))' }}
            >
              <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider mb-3">Tools & Workflow</p>
              <div className="flex flex-wrap gap-1.5">
                {['VS Code', 'Git', 'Figma', 'Vercel', 'Notion', 'Linear', 'Postman'].map(tool => (
                  <span key={tool} className="px-2 py-1 rounded-lg font-mono text-[11px] glass text-white/60 border border-white/5">
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

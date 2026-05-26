import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users, BookOpen, Star, GitFork, TrendingUp, Activity, Code2 } from 'lucide-react'
import type { GitHubUser, GitHubRepo } from '../../types'
import { formatNumber } from '../../lib/utils'
import { CONFIG } from '../../lib/config'
import { getLanguageColor } from '../../hooks/useGitHub'

interface GitHubStatsProps {
  user: GitHubUser | null
  repos: GitHubRepo[]
  totalStars: number
  languages: Record<string, number>
  loading: boolean
}

function StatCard({ icon: Icon, value, label, color, delay }: {
  icon: typeof Users
  value: string | number
  label: string
  color: string
  delay: number
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="glass neon-border rounded-2xl p-5 relative overflow-hidden group hover:border-[#00d4ff]/50 transition-all duration-300"
      whileHover={{ y: -4, boxShadow: '0 8px 40px rgba(0,212,255,0.15)' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 50%, ${color}08, transparent 70%)` }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${color}20`, border: `1px solid ${color}40` }}
          >
            <Icon size={18} style={{ color }} />
          </div>
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
          />
        </div>
        <p className="font-display font-bold text-3xl text-white mb-1">
          {value}
        </p>
        <p className="font-body text-xs text-white/50 uppercase tracking-wider">{label}</p>
      </div>
    </motion.div>
  )
}

export function GitHubStats({ user, repos, totalStars, languages, loading }: GitHubStatsProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  // Top languages
  const topLangs = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
  const totalLangCount = topLangs.reduce((s, [, c]) => s + c, 0)

  const stats = [
    { icon: BookOpen, value: formatNumber(user?.public_repos || 0), label: 'Repositories', color: '#00d4ff' },
    { icon: Users, value: formatNumber(user?.followers || 0), label: 'Followers', color: '#a855f7' },
    { icon: Star, value: formatNumber(totalStars), label: 'Total Stars', color: '#f59e0b' },
    { icon: GitFork, value: formatNumber(repos.reduce((s, r) => s + r.forks_count, 0)), label: 'Total Forks', color: '#06ffd8' },
    { icon: TrendingUp, value: formatNumber(user?.following || 0), label: 'Following', color: '#ff2d78' },
    { icon: Activity, value: repos.filter(r => {
      const d = new Date(r.updated_at)
      return Date.now() - d.getTime() < 30 * 24 * 60 * 60 * 1000
    }).length, label: 'Active 30d', color: '#34d399' },
  ]

  return (
    <section id="stats" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-4">
            <Activity size={14} className="text-[#00d4ff]" />
            <span className="font-mono text-xs text-white/60">live · github.com/{CONFIG.GITHUB_USERNAME}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">GitHub Dashboard</span>
          </h2>
          <p className="text-white/50 font-body max-w-md mx-auto">
            Real-time statistics from GitHub API. Updated on every visit.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass neon-border rounded-2xl p-5 animate-pulse h-32" />
            ))
          ) : (
            stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} delay={i * 0.1} />
            ))
          )}
        </div>

        {/* GitHub contribution-style streak card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Language breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 glass neon-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Code2 size={16} className="text-[#00d4ff]" />
              <h3 className="font-display font-semibold text-sm text-white">Language Distribution</h3>
            </div>

            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-6 bg-white/5 rounded animate-pulse" />
                ))}
              </div>
            ) : (
              <>
                {/* Bar */}
                <div className="flex h-3 rounded-full overflow-hidden mb-6 gap-px">
                  {topLangs.map(([lang, count]) => (
                    <motion.div
                      key={lang}
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / totalLangCount) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      style={{ backgroundColor: getLanguageColor(lang) }}
                      className="h-full first:rounded-l-full last:rounded-r-full"
                    />
                  ))}
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {topLangs.map(([lang, count], i) => (
                    <motion.div
                      key={lang}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: getLanguageColor(lang), boxShadow: `0 0 6px ${getLanguageColor(lang)}` }}
                      />
                      <span className="font-body text-xs text-white/70 truncate">{lang}</span>
                      <span className="font-mono text-xs text-white/30 ml-auto">
                        {Math.round((count / totalLangCount) * 100)}%
                      </span>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>

          {/* GitHub streak card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="glass neon-border rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{ background: 'radial-gradient(circle at 50% 50%, #f59e0b, transparent 70%)' }}
            />
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-5xl mb-3"
            >
              🔥
            </motion.div>
            <p className="font-display font-bold text-5xl text-white mb-1">
              {repos.filter(r => new Date(r.updated_at) > new Date(Date.now() - 7 * 86400000)).length}
            </p>
            <p className="font-mono text-xs text-white/50 uppercase tracking-wider mb-4">Active Repos</p>
            <p className="font-body text-xs text-white/40">Updated in the last 7 days</p>

            <div className="mt-4 flex gap-2">
              <div className="glass rounded-lg px-3 py-1.5 text-center">
                <p className="font-display font-bold text-[#06ffd8] text-sm">{new Date(user?.created_at || '').getFullYear() || '—'}</p>
                <p className="font-mono text-[10px] text-white/40">Joined</p>
              </div>
              <div className="glass rounded-lg px-3 py-1.5 text-center">
                <p className="font-display font-bold text-[#a855f7] text-sm">
                  {Math.round((Date.now() - new Date(user?.created_at || Date.now()).getTime()) / (1000 * 60 * 60 * 24 * 365))}y
                </p>
                <p className="font-mono text-[10px] text-white/40">Experience</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* GitHub stats images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="glass neon-border rounded-2xl overflow-hidden p-4 flex items-center justify-center">
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${CONFIG.GITHUB_USERNAME}&show_icons=true&theme=transparent&title_color=00d4ff&icon_color=a855f7&text_color=ffffff&border_color=00d4ff30&hide_border=false&count_private=true`}
              alt="GitHub Stats"
              className="max-w-full rounded-xl"
              loading="lazy"
            />
          </div>
          <div className="glass neon-border rounded-2xl overflow-hidden p-4 flex items-center justify-center">
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${CONFIG.GITHUB_USERNAME}&theme=transparent&hide_border=false&border=00d4ff30&fire=ff2d78&currStreakLabel=00d4ff&ring=a855f7&sideLabels=ffffff&dates=ffffff60`}
              alt="GitHub Streak"
              className="max-w-full rounded-xl"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, GitFork, ExternalLink, Github, Code2, Grid, List } from 'lucide-react'
import type { GitHubRepo } from '../../types'
import { getLanguageColor } from '../../hooks/useGitHub'
import { timeAgo, formatNumber } from '../../lib/utils'
import { CONFIG } from '../../lib/config'

interface ProjectsProps {
  repos: GitHubRepo[]
  loading: boolean
}

function ProjectCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const langColor = getLanguageColor(repo.language)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="glass neon-border rounded-2xl p-5 group hover:border-[#00d4ff]/50 transition-all duration-300 flex flex-col"
      whileHover={{ y: -6, boxShadow: '0 12px 50px rgba(0,212,255,0.12)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `${langColor}20`, border: `1px solid ${langColor}40` }}
          >
            <Code2 size={14} style={{ color: langColor }} />
          </div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display font-semibold text-sm text-white group-hover:text-[#00d4ff] transition-colors truncate max-w-[140px]"
          >
            {repo.name}
          </a>
        </div>
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-lg glass flex items-center justify-center text-white/60 hover:text-white"
            whileHover={{ scale: 1.1 }}
          >
            <Github size={12} />
          </motion.a>
          {repo.homepage && (
            <motion.a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg glass flex items-center justify-center text-white/60 hover:text-[#00d4ff]"
              whileHover={{ scale: 1.1 }}
            >
              <ExternalLink size={12} />
            </motion.a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-white/50 font-body text-xs leading-relaxed mb-4 flex-1 line-clamp-3">
        {repo.description || 'No description provided.'}
      </p>

      {/* Topics */}
      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.topics.slice(0, 3).map(topic => (
            <span
              key={topic}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono"
              style={{
                background: 'rgba(0,212,255,0.08)',
                border: '1px solid rgba(0,212,255,0.2)',
                color: '#00d4ff',
              }}
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-3">
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: langColor, boxShadow: `0 0 6px ${langColor}` }}
              />
              <span className="font-mono text-[10px] text-white/40">{repo.language}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-white/40">
            <Star size={11} />
            <span className="font-mono text-[10px]">{formatNumber(repo.stargazers_count)}</span>
          </div>
          <div className="flex items-center gap-1 text-white/40">
            <GitFork size={11} />
            <span className="font-mono text-[10px]">{formatNumber(repo.forks_count)}</span>
          </div>
        </div>
        <span className="font-mono text-[10px] text-white/25">{timeAgo(repo.updated_at)}</span>
      </div>
    </motion.div>
  )
}

export function Projects({ repos, loading }: ProjectsProps) {
  const [filter, setFilter] = useState<string>('all')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const languages = ['all', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean)))]

  const filtered = filter === 'all'
    ? repos.slice(0, 12)
    : repos.filter(r => r.language === filter).slice(0, 12)

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-4">
            <Code2 size={14} className="text-[#a855f7]" />
            <span className="font-mono text-xs text-white/60">open source projects</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Work</span>
          </h2>
          <p className="text-white/50 font-body max-w-md mx-auto">
            A collection of projects I've built and contributed to. Click to explore.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {languages.slice(0, 7).map(lang => (
              <motion.button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                  filter === lang
                    ? 'bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/50'
                    : 'glass text-white/50 hover:text-white border border-white/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {lang === 'all' ? 'All' : lang}
              </motion.button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setView('grid')}
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${view === 'grid' ? 'glass neon-border text-[#00d4ff]' : 'glass text-white/40'}`}
              whileTap={{ scale: 0.9 }}
            >
              <Grid size={14} />
            </motion.button>
            <motion.button
              onClick={() => setView('list')}
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${view === 'list' ? 'glass neon-border text-[#00d4ff]' : 'glass text-white/40'}`}
              whileTap={{ scale: 0.9 }}
            >
              <List size={14} />
            </motion.button>
          </div>
        </motion.div>

        {/* Projects grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass neon-border rounded-2xl p-5 h-48 animate-pulse" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={view === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                : 'flex flex-col gap-3'
              }
            >
              {filtered.map((repo, i) => (
                <ProjectCard key={repo.id} repo={repo} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10"
        >
          <motion.a
            href={`https://github.com/${CONFIG.GITHUB_USERNAME}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass neon-border font-display font-semibold text-sm text-white/70 hover:text-white transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <Github size={16} />
            View All Repositories
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

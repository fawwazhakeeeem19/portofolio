import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from './components/layout/Navbar'
import { CustomCursor } from './components/layout/CustomCursor'
import { ParticlesBackground } from './components/layout/ParticlesBackground'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { Hero } from './components/sections/Hero'
import { GitHubStats } from './components/sections/GitHubStats'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Timeline } from './components/sections/Timeline'
import { Contact } from './components/sections/Contact'
import { useGitHub } from './hooks/useGitHub'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const [appLoading, setAppLoading] = useState(true)
  const { isDark, toggleTheme } = useTheme()
  const { user, repos, languages, totalStars, loading } = useGitHub()

  useEffect(() => {
    const timer = setTimeout(() => setAppLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen isLoading={appLoading} />

      {/* Custom cursor (desktop only) */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* Background */}
      <ParticlesBackground />

      {/* Navbar */}
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      {/* Main content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.2 }}
        className="relative z-10"
      >
        <Hero user={user} loading={loading} />
        <GitHubStats user={user} repos={repos} totalStars={totalStars} languages={languages} loading={loading} />
        <Projects repos={repos} loading={loading} />
        <Skills />
        <Timeline />
        <Contact />
      </motion.main>
    </>
  )
}

/// <reference types="vite/client" />
import { useState, useEffect } from 'react'
import type { GitHubUser, GitHubRepo } from '../types'
import { CONFIG, LANGUAGE_COLORS } from '../lib/config'

interface GitHubData {
  user: GitHubUser | null
  repos: GitHubRepo[]
  languages: Record<string, number>
  totalStars: number
  loading: boolean
  error: string | null
}

export function useGitHub(username: string = CONFIG.GITHUB_USERNAME) {
  const [data, setData] = useState<GitHubData>({
    user: null,
    repos: [],
    languages: {},
    totalStars: 0,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }))

        const headers: HeadersInit = {}
        // Add token if available
        const token = import.meta.env.VITE_GITHUB_TOKEN
        if (token) headers['Authorization'] = `token ${token}`

        // Fetch user
        const userRes = await fetch(`https://api.github.com/users/${username}`, { headers })
        if (!userRes.ok) throw new Error(`GitHub user not found: ${userRes.status}`)
        const user: GitHubUser = await userRes.json()

        // Fetch repos (up to 100)
        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
          { headers }
        )
        const repos: GitHubRepo[] = await reposRes.json()
        const publicRepos = repos.filter(r => !r.private)

        // Calculate totals
        const totalStars = publicRepos.reduce((sum, r) => sum + r.stargazers_count, 0)

        // Aggregate languages
        const langCounts: Record<string, number> = {}
        publicRepos.forEach(repo => {
          if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1
          }
        })

        setData({
          user,
          repos: publicRepos,
          languages: langCounts,
          totalStars,
          loading: false,
          error: null,
        })
      } catch (err) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to fetch GitHub data',
        }))
      }
    }

    fetchData()
  }, [username])

  return data
}

export function getLanguageColor(lang: string): string {
  return LANGUAGE_COLORS[lang] || '#888'
}

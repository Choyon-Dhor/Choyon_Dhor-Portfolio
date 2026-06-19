import { useEffect, useMemo, useState } from 'react'
import {
  footerContent,
  homeProjects,
  blogPosts,
  simpleSkillCategories,
  progressSkillCategories,
  contactContent,
  heroContent,
  siteContent,
} from '../content/portfolioContent'

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const initialSections = {
  'site-settings': {
    ...siteContent,
  },
  hero: heroContent,
  projects: homeProjects,
  blogPosts,
  simpleSkills: simpleSkillCategories,
  progressSkills: progressSkillCategories,
  contact: contactContent,
  footer: footerContent,
}

const AdminDashboard = () => {
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [content, setContent] = useState(initialSections)
  const [drafts, setDrafts] = useState({
    projects: JSON.stringify(homeProjects, null, 2),
    blogPosts: JSON.stringify(blogPosts, null, 2),
    simpleSkills: JSON.stringify(simpleSkillCategories, null, 2),
    progressSkills: JSON.stringify(progressSkillCategories, null, 2),
    contact: JSON.stringify(contactContent, null, 2),
    footer: JSON.stringify(footerContent, null, 2),
  })
  const [saveState, setSaveState] = useState('idle')

  useEffect(() => {
    const savedToken = localStorage.getItem('portfolio-admin-token')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  useEffect(() => {
    const loadContent = async () => {
      const response = await fetch(`${apiBaseUrl}/content`)
      const payload = await response.json()
      if (Array.isArray(payload.items)) {
        const nextContent = { ...initialSections }
        for (const item of payload.items) {
          nextContent[item.key] = item.data
        }
        setContent(nextContent)
        setDrafts((current) => ({
          ...current,
          projects: JSON.stringify(nextContent.projects ?? homeProjects, null, 2),
          blogPosts: JSON.stringify(nextContent.blogPosts ?? blogPosts, null, 2),
          simpleSkills: JSON.stringify(nextContent.simpleSkills ?? simpleSkillCategories, null, 2),
          progressSkills: JSON.stringify(nextContent.progressSkills ?? progressSkillCategories, null, 2),
          contact: JSON.stringify(nextContent.contact ?? contactContent, null, 2),
          footer: JSON.stringify(nextContent.footer ?? footerContent, null, 2),
        }))
      }
    }

    loadContent().catch(() => {})
  }, [])

  const isLoggedIn = useMemo(() => Boolean(token), [token])

  const login = async (event) => {
    event.preventDefault()
    setLoginError('')

    const response = await fetch(`${apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const payload = await response.json()
    if (!response.ok) {
      setLoginError(payload.message || 'Login failed')
      return
    }

    localStorage.setItem('portfolio-admin-token', payload.token)
    setToken(payload.token)
  }

  const updateSection = (sectionKey, field, value) => {
    setContent((current) => ({
      ...current,
      [sectionKey]: {
        ...current[sectionKey],
        [field]: value,
      },
    }))
  }

  const updateDraft = (sectionKey, value) => {
    setDrafts((current) => ({
      ...current,
      [sectionKey]: value,
    }))
  }

  const saveSection = async (sectionKey) => {
    setSaveState(sectionKey)
    await fetch(`${apiBaseUrl}/content/${sectionKey}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: content[sectionKey], status: 'published' }),
    })
    setSaveState('idle')
  }

  const saveJsonSection = async (sectionKey) => {
    setSaveState(sectionKey)
    const parsedValue = JSON.parse(drafts[sectionKey])

    await fetch(`${apiBaseUrl}/content/${sectionKey}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: parsedValue, status: 'published' }),
    })

    setContent((current) => ({
      ...current,
      [sectionKey]: parsedValue,
    }))
    setSaveState('idle')
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-deep-charcoal text-white flex items-center justify-center px-4">
        <form onSubmit={login} className="w-full max-w-md project-card p-8 space-y-4">
          <div>
            <p className="text-sm text-purple-400 font-mono">#admin</p>
            <h1 className="text-3xl font-bold mt-2">Portfolio Dashboard</h1>
            <p className="text-gray-400 mt-2">Private content editor for the live portfolio.</p>
          </div>
          <label className="block">
            <span className="text-sm text-gray-300">Admin email</span>
            <input
              className="mt-1 w-full rounded-lg bg-black/30 border border-gray-700 px-4 py-3"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              autoComplete="username"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-300">Password</span>
            <input
              className="mt-1 w-full rounded-lg bg-black/30 border border-gray-700 px-4 py-3"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              autoComplete="current-password"
            />
          </label>
          {loginError ? <p className="text-sm text-red-400">{loginError}</p> : null}
          <button className="btn-primary w-full" type="submit">Enter Dashboard</button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep-charcoal text-white px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="project-card p-6">
          <p className="text-sm text-purple-400 font-mono">#admin / phase one</p>
          <h1 className="text-4xl font-bold mt-2">Portfolio Dashboard</h1>
          <p className="text-gray-400 mt-2">Edit the content that powers the live portfolio. Changes are saved back to MongoDB.</p>
        </header>

        <section className="project-card p-6 space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl font-semibold">Hero section</h2>
              <p className="text-gray-400 text-sm">Homepage intro, headline, CTA text, and badge.</p>
            </div>
            <button className="btn-primary" onClick={() => saveSection('hero')}>
              {saveState === 'hero' ? 'Saving...' : 'Save Hero'}
            </button>
          </div>

          <label className="block">
            <span className="text-sm text-gray-300">Intro</span>
            <input
              className="mt-1 w-full rounded-lg bg-black/30 border border-gray-700 px-4 py-3"
              value={content.hero.intro}
              onChange={(event) => updateSection('hero', 'intro', event.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">Description</span>
            <textarea
              className="mt-1 w-full rounded-lg bg-black/30 border border-gray-700 px-4 py-3 min-h-28"
              value={content.hero.description}
              onChange={(event) => updateSection('hero', 'description', event.target.value)}
            />
          </label>
        </section>

        <section className="project-card p-6">
          <h2 className="text-2xl font-semibold">Site settings</h2>
          <p className="text-gray-400 text-sm mt-1">Owner name, role, and resume link.</p>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-gray-300">Owner name</span>
              <input
                className="mt-1 w-full rounded-lg bg-black/30 border border-gray-700 px-4 py-3"
                value={content['site-settings'].ownerName}
                onChange={(event) => updateSection('site-settings', 'ownerName', event.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-300">Role</span>
              <input
                className="mt-1 w-full rounded-lg bg-black/30 border border-gray-700 px-4 py-3"
                value={content['site-settings'].role}
                onChange={(event) => updateSection('site-settings', 'role', event.target.value)}
              />
            </label>
          </div>
          <button className="btn-primary mt-4" onClick={() => saveSection('site-settings')}>
            {saveState === 'site-settings' ? 'Saving...' : 'Save Settings'}
          </button>
        </section>

        {[
          ['projects', 'Projects', 'Edit the featured project list used on the homepage.', 'projects'],
          ['blogPosts', 'Blog posts', 'Edit blog cards and article content.', 'blogPosts'],
          ['simpleSkills', 'Skills grid', 'Edit the compact skills categories.', 'simpleSkills'],
          ['progressSkills', 'Skill progress', 'Edit the detailed skill progress data.', 'progressSkills'],
          ['contact', 'Contact section', 'Edit social links and contact copy.', 'contact'],
          ['footer', 'Footer', 'Edit footer identity and copyright text.', 'footer'],
        ].map(([sectionKey, title, description, draftKey]) => (
          <section key={sectionKey} className="project-card p-6 space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-2xl font-semibold">{title}</h2>
                <p className="text-gray-400 text-sm">{description}</p>
              </div>
              <button className="btn-primary" onClick={() => saveJsonSection(sectionKey)}>
                {saveState === sectionKey ? 'Saving...' : `Save ${title}`}
              </button>
            </div>

            <textarea
              className="w-full rounded-lg bg-black/30 border border-gray-700 px-4 py-3 min-h-[320px] font-mono text-sm"
              value={drafts[draftKey]}
              onChange={(event) => updateDraft(draftKey, event.target.value)}
              spellCheck="false"
            />
          </section>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard

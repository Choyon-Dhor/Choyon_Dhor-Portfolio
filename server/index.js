import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const localStorePath = path.join(__dirname, 'data', 'content-store.json')
const configuredOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true)
    }

    const isAllowedLocalhost = /^http:\/\/localhost:\d+$/.test(origin)
    if (configuredOrigins.includes(origin) || isAllowedLocalhost) {
      return callback(null, true)
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`))
  },
  credentials: true,
}

app.use(cors(corsOptions))
app.options(/.*/, cors(corsOptions))
app.use(express.json())

const contentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    updatedBy: { type: String, default: 'system' },
  },
  { timestamps: true }
)

const ContentEntry = mongoose.model('ContentEntry', contentSchema)

const siteSettingsContent = {
  ownerName: 'Choyon Dhor',
  role: 'CSE Student | ML Enthusiast',
  resumeUrl: 'https://drive.google.com/uc?export=download&id=1VKOvOCDBXVIL9ajYOMd0dy8Mg-xzuSyl',
}

const heroContent = {
  intro: "Hello, I'm",
  heading: {
    prefix: 'Choyon is a',
    primary: 'CSE Student',
    connector: 'and',
    secondary: 'Machine Learning & AI',
    suffix: 'Enthusiast',
  },
  typingTexts: ['ML Researcher', 'AI Explorer', 'Problem Solver', 'Web Developer', 'Data Structure & Algorithm'],
  description: 'I build intelligent systems and research-driven web applications with structured logic, scalable architecture, and clean design.',
  primaryCta: 'Contact Me',
  secondaryCta: 'Download CV',
  badge: 'Currently working on ML Research & Web Projects',
}

const quoteContent = {
  text: 'Code is not just syntax. It is structured thinking.',
  author: 'Choyon Dhor',
}

const homeProjects = [
  {
    title: 'Portfolio Website',
    tech: ['React', 'Tailwind'],
    description: 'Fully responsive personal portfolio website.',
    live: '#',
    github: '#',
  },
  {
    title: 'Freelancing Website for DBMS Course project',
    tech: ['HTML', 'CSS', 'PHP', 'MYSQL'],
    description: 'FreelanceHub - A complete freelance marketplace web application connecting clients with freelancers for job posting and project management',
    live: '#',
    github: 'https://github.com/Choyon-Dhor/Project-Freelancing_Portal',
  },
  {
    title: 'Hand Written Digit Recognition using CNN',
    tech: ['Python', 'ML'],
    description: 'Deep Learning-based Handwritten Digit Recognition using Convolutional Neural Networks (CNN) on MNIST Dataset with performance evaluation and visualization.',
    live: '#',
    github: 'https://github.com/Choyon-Dhor/handwritten-digit-recognition-cnn',
  },
  {
    title: 'Loan Approval Prediction & Churn Prediction',
    tech: ['Python', 'Scikit-learn'],
    description: 'Decision Tree classifier for financial approval prediction.',
    live: '#',
    github: 'https://github.com/Choyon-Dhor/ml-algorithm-implementations/blob/main/supervised-learning/Decision-tree-classification.ipynb',
  },
]

const projectsPageContent = {
  completeApps: homeProjects,
  smallProjects: [
    {
      title: 'Bot Boilerplate',
      description: 'Start creating scalable discord.js bot with TypeScript in seconds.',
      tech: ['Discord.js', 'TypeScript'],
      links: { github: '#' },
    },
    {
      title: 'My Blog',
      description: 'Front-end of my future blog website written in Vue.js.',
      tech: ['Vue.js', 'CSS', 'JavaScript'],
      links: { github: '#' },
    },
    {
      title: 'Chess Pro',
      description: 'Figma landing page about service for viewing chess tournaments.',
      tech: ['Figma', 'UI/UX'],
      links: { github: '#' },
    },
    {
      title: 'URL Shortener',
      description: 'Simple link shortener with authentication.',
      tech: ['Python', 'Quart', 'HTML'],
      links: { live: '#' },
    },
  ],
}

const simpleSkills = [
  { title: 'Languages', rows: [['TypeScript', 'Lua'], ['Python', 'JavaScript']] },
  { title: 'Other', rows: [['HTML', 'CSS', 'EJS', 'SCSS'], ['REST', 'Jinja']] },
  { title: 'Tools', rows: [['VSCode', 'Neovim', 'Linux'], ['Figma', 'XFCE', 'Arch'], ['Git', 'Font Awesome'], ['KDE', 'fish']] },
  { title: 'Databases', rows: [['SQLite', 'PostgreSQL'], ['Mongo']] },
  { title: 'Frameworks', rows: [['React', 'Vue'], ['Disnake', 'Discord.js'], ['Flask', 'Express.js']] },
]

const progressSkills = [
  {
    title: 'Programming Languages',
    icon: '💻',
    skills: [
      { name: 'C', level: 85, proficiency: 'Advanced', tooltip: 'Systems programming, data structures' },
      { name: 'C++', level: 88, proficiency: 'Advanced', tooltip: 'OOP, STL, competitive programming' },
      { name: 'Java', level: 80, proficiency: 'Proficient', tooltip: 'Android basics, OOP concepts' },
      { name: 'Python', level: 95, proficiency: 'Advanced', tooltip: 'ML, scripting, backend (Flask)' },
      { name: 'JavaScript', level: 92, proficiency: 'Advanced', tooltip: 'ES6+, DOM, async' },
    ],
  },
  {
    title: 'Web Development',
    icon: '🌐',
    skills: [
      { name: 'HTML', level: 95, proficiency: 'Advanced', tooltip: 'Semantic markup, accessibility' },
      { name: 'CSS', level: 92, proficiency: 'Advanced', tooltip: 'Flexbox, Grid, animations' },
      { name: 'Tailwind CSS', level: 90, proficiency: 'Intermediate', tooltip: 'Utility-first, responsive' },
      { name: 'React', level: 88, proficiency: 'Intermediate', tooltip: 'Hooks, context, custom components' },
    ],
  },
  {
    title: 'Database & Backend',
    icon: '🗄️',
    skills: [
      { name: 'MySQL', level: 85, proficiency: 'Advanced', tooltip: 'Complex queries, joins, optimization' },
      { name: 'PHP', level: 80, proficiency: 'Proficient', tooltip: 'ACID, indexing, JSONB' },
    ],
  },
  {
    title: 'Machine Learning Foundations',
    icon: '🤖',
    skills: [
      { name: 'Scikit-learn', level: 88, proficiency: 'Advanced', tooltip: 'Classification, regression, pipelines, model tuning' },
      { name: 'NumPy', level: 80, proficiency: 'Intermediate', tooltip: 'Array operations, linear algebra, numerical computing' },
      { name: 'Pandas', level: 85, proficiency: 'Advanced', tooltip: 'Data cleaning, preprocessing, feature engineering' },
      { name: 'Matplotlib', level: 82, proficiency: 'Advanced', tooltip: 'Data visualization, plotting, performance analysis' },
      { name: 'Model Evaluation', level: 88, proficiency: 'Advanced', tooltip: 'Cross-validation, metrics, hyperparameter tuning' },
    ],
  },
]

const skillStats = [
  { value: '5+', label: 'Programming Languages' },
  { value: '10+', label: 'Projects Built' },
  { value: '2+', label: 'ML Research Works' },
]

const activitiesPageContent = [
  {
    title: 'Campus Coordinator – YUNet',
    organization: 'Youth Upskill Network (YUNet)',
    period: '2026 – Present',
    description: 'Representing YUNet on campus to bridge the gap between learning and real-world skills. Leading workshops, building partnerships with university clubs, and driving youth engagement through skill development initiatives aligned with SDGs.',
    achievements: ['Organizing skill development workshops and seminars on campus', 'Building partnerships with university clubs and student organizations', 'Driving student engagement through tech and innovation programs', 'Contributing to YUNet national initiatives and growth tracker milestones'],
    tags: ['Leadership', 'Workshops', 'Youth Empowerment', 'Community Building'],
    link: 'https://www.facebook.com/photo?fbid=122194083116459019&set=a.122106430832459019',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Cultural Secretary – MU CSE Society',
    organization: 'Metropolitan University CSE Society',
    period: '2024 – 2025',
    description: 'Organized national-level university tech and cultural fest, managed events with 500+ participants.',
    achievements: ['Successfully organized MU CSE FEST 2025', 'Led a team of 60 volunteers', 'Coordinated with sponsors and guest speakers'],
    tags: ['Leadership', 'Event Management'],
    link: 'https://www.facebook.com/mucsefest2024',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Campus Ambassador – Bdapps',
    organization: 'Bdapps (Robi)',
    period: '2025 – 2026',
    description: 'Conducted workshops and promoted tech learning initiatives in our university.',
    achievements: ['Reached 1000+ students through workshops', 'Top 20 ambassador in quarterly performance', 'Facilitated hands-on sessions on app development'],
    tags: ['Workshops', 'Outreach'],
    link: '#',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Assistant – CSPI',
    organization: 'Center for Strategy and Policy Initiatives',
    period: '2025 – Dec',
    description: 'Involved in strategy and policy research discussions, contributed to policy briefs.',
    achievements: ['Co-authored a policy brief on digital education'],
    tags: ['Research', 'Policy'],
    link: 'https://www.facebook.com/photo/?fbid=122222831504188613&set=pcb.122222831624188613',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Disaster Response Volunteer – Sylhet Flood',
    organization: 'Voluntary Association',
    period: '2022',
    description: 'Participated in humanitarian flood response operations, distributed relief goods.',
    achievements: ['Assisted in relief distribution to 300+ families', 'Coordinated with local NGOs for efficient response'],
    tags: ['Volunteering', 'Relief'],
    link: 'https://www.facebook.com/share/v/1Fx1SMNqDQ/',
    color: 'from-orange-500 to-red-500',
  },
]

const contactContent = {
  sectionTag: '#contacts',
  title: 'Connect',
  description: "I'm open to academic collaborations, research discussions, and technology-based projects. Feel free to reach out!",
  introTitle: 'Get in Touch',
  introBody: "Whether you have a question about research opportunities, collaboration ideas, or just want to say hi, I'll try my best to get back to you!",
  locationLabel: 'Bangladesh',
  locationSubtext: 'Available for remote work',
  responseText: 'Usually responds within 24 hours',
  socialLinks: [
    { name: 'Email', iconName: 'FiMail', href: 'mailto:choyondhorshuvo@gmail.com', label: 'choyondhorshuvo@gmail.com', description: 'Drop me an email' },
    { name: 'GitHub', iconName: 'FiGithub', href: 'https://github.com/choyon-dhor', label: '@choyon-dhor', description: 'Check my code' },
    { name: 'LinkedIn', iconName: 'FiLinkedin', href: 'https://linkedin.com/in/choyondhor', label: 'Choyondhor', description: "Let's connect" },
  ],
}

const footerContent = {
  name: siteSettingsContent.ownerName,
  role: siteSettingsContent.role,
  copyright: '© 2026 Choyon Dhor. All rights reserved.',
}

const blogPosts = [
  {
    slug: 'understanding-decision-trees',
    title: 'Understanding Decision Trees in Machine Learning',
    date: 'Feb 15, 2026',
    excerpt: 'A deep dive into how decision trees work, their advantages, and practical implementation with Scikit-learn.',
    content: '<p>Decision trees are one of the most intuitive machine learning algorithms...</p><h2>How Decision Trees Work</h2><p>A decision tree splits data into branches based on feature values...</p><pre><code>from sklearn.tree import DecisionTreeClassifier</code></pre><p>...</p>',
    tags: ['Machine Learning', 'Python', 'Tutorial'],
  },
  {
    slug: 'energy-load-forecasting',
    title: 'Short-Term Energy Load Forecasting: A Research Overview',
    date: 'Jan 28, 2026',
    excerpt: 'Exploring methods and challenges in predicting energy demand using time series and ML models.',
    content: '<p>Energy load forecasting is a critical task in power system operation...</p><h2>Time Series Methods</h2><p>Traditional time series approaches like ARIMA have been widely used...</p><pre><code>import pandas as pd</code></pre><p>...</p>',
    tags: ['Research', 'Energy', 'Forecasting'],
  },
  {
    slug: 'css-grid-vs-flexbox',
    title: 'CSS Grid vs Flexbox: When to Use Which',
    date: 'Dec 10, 2025',
    excerpt: 'A practical guide to choosing between Grid and Flexbox for modern web layouts.',
    content: '<p>CSS Grid and Flexbox are two powerful layout systems in modern CSS...</p><h2>When to Use Flexbox</h2><p>Flexbox is perfect for one-dimensional layouts...</p><h2>When to Use Grid</h2><p>CSS Grid excels at two-dimensional layouts...</p><p>...</p>',
    tags: ['CSS', 'Web Development'],
  },
  {
    slug: 'getting-started-with-react',
    title: 'Getting Started with React and Vite',
    date: 'Nov 5, 2025',
    excerpt: 'Step-by-step tutorial to set up a React project with Vite and Tailwind CSS.',
    content: '<p>React with Vite is the modern way to build fast web applications...</p><h2>Setting Up Your Project</h2><p>First, create a new Vite project with React...</p><pre><code>npm create vite@latest my-app -- --template react</code></pre><p>...</p>',
    tags: ['React', 'JavaScript', 'Tutorial'],
  },
]

const fallbackContent = [
  {
    key: 'site-settings',
    data: siteSettingsContent,
  },
  {
    key: 'hero',
    data: heroContent,
  },
  {
    key: 'quote',
    data: quoteContent,
  },
  {
    key: 'projects',
    data: homeProjects,
  },
  {
    key: 'projectsPage',
    data: projectsPageContent,
  },
  {
    key: 'simpleSkills',
    data: simpleSkills,
  },
  {
    key: 'progressSkills',
    data: progressSkills,
  },
  {
    key: 'skillStats',
    data: skillStats,
  },
  {
    key: 'activitiesPage',
    data: activitiesPageContent,
  },
  {
    key: 'contact',
    data: contactContent,
  },
  {
    key: 'footer',
    data: footerContent,
  },
  {
    key: 'blogPosts',
    data: blogPosts,
  },
]

const ensureLocalStore = async () => {
  await mkdir(path.dirname(localStorePath), { recursive: true })

  try {
    await readFile(localStorePath, 'utf8')
  } catch {
    await writeFile(localStorePath, JSON.stringify(fallbackContent, null, 2), 'utf8')
  }
}

const readLocalStore = async () => {
  await ensureLocalStore()
  const raw = await readFile(localStorePath, 'utf8')
  return JSON.parse(raw)
}

const writeLocalStore = async (items) => {
  await ensureLocalStore()
  await writeFile(localStorePath, JSON.stringify(items, null, 2), 'utf8')
}

const connectMongo = async () => {
  if (mongoose.connection.readyState === 1) return
  const mongoUri = process.env.MONGODB_URI
  if (!mongoUri) {
    throw new Error('MONGODB_URI is missing')
  }
  await mongoose.connect(mongoUri)
}

const requireAdmin = (req, res, next) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''

  if (!token) {
    return res.status(401).json({ message: 'Missing admin token' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.admin = payload
    return next()
  } catch {
    return res.status(401).json({ message: 'Invalid admin token' })
  }
}

const seedIfEmpty = async () => {
  const count = await ContentEntry.countDocuments()
  if (count > 0) return

  await ContentEntry.insertMany([
    ...fallbackContent,
  ])
}

const getContentItems = async () => {
  try {
    await connectMongo()
    await seedIfEmpty()
    return await ContentEntry.find().sort({ key: 1 }).lean()
  } catch {
    return await readLocalStore()
  }
}

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body || {}
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword || !process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'Admin auth is not configured yet' })
  }

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' })
  res.json({ token })
})

app.get('/content', async (_req, res) => {
  try {
    const docs = await getContentItems()
    res.json({ items: docs })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.put('/content/:key', requireAdmin, async (req, res) => {
  try {
    const { key } = req.params
    const { data, status } = req.body || {}

    try {
      await connectMongo()
      const updated = await ContentEntry.findOneAndUpdate(
        { key },
        {
          key,
          data,
          status: status || 'published',
          updatedBy: req.admin.email,
        },
        { new: true, upsert: true }
      ).lean()

      res.json({ item: updated, source: 'mongo' })
      return
    } catch {
      const currentItems = await readLocalStore()
      const nextItems = currentItems.filter((item) => item.key !== key)
      nextItems.push({
        key,
        data,
        status: status || 'published',
        updatedBy: req.admin.email,
      })
      nextItems.sort((left, right) => left.key.localeCompare(right.key))
      await writeLocalStore(nextItems)
      res.json({ item: nextItems.find((item) => item.key === key), source: 'local' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`)
})

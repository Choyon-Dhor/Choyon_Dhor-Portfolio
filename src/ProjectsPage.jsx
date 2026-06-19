import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { usePortfolioContent } from './content/portfolioContent'

// Project Card Component (reusable)
const ProjectCard = ({ project, idx, showLive = true }) => {
  const liveLink = project.links?.live ?? project.live
  const githubLink = project.links?.github ?? project.github
  const cachedLink = project.links?.cached

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: idx * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="project-card rounded-xl p-6 flex flex-col"
    >
      {/* Project Title */}
      <h3 className="text-xl font-semibold project-title mb-3">
        {project.title}
      </h3>

      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, techIdx) => (
          <span key={techIdx} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed flex-grow mb-6">
        {project.description}
      </p>

      {/* Buttons */}
      <div className="flex gap-3 mt-auto">
        {showLive && liveLink && (
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Live <span className="arrow">→</span>
          </a>
        )}
        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            GitHub <span className="arrow">→</span>
          </a>
        )}
        {cachedLink && (
          <a
            href={cachedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Cached <span className="arrow">→</span>
          </a>
        )}
      </div>
    </motion.div>
  )
}

const ProjectsPage = () => {
  const content = usePortfolioContent()
  const projectsData = {
    completeApps: content.projects ?? [],
    smallProjects: content.projectsPage?.smallProjects ?? [],
  }

  return (
    <div className="min-h-screen bg-deep-charcoal text-gray-200">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative projects-section-bg">
        <div className="relative z-10">
          
          {/* Page Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Projects
            </h1>
            <p className="text-gray-400 text-lg">
              Complete collection of technical and research-based projects.
            </p>
          </motion.div>

          {/* Complete Apps / Research Projects */}
          <section className="mb-20">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-header text-2xl md:text-3xl font-semibold text-white mb-8"
            >
              Projects & Research Works
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsData.completeApps.map((project, idx) => (
                <ProjectCard 
                  key={idx} 
                  project={project} 
                  idx={idx}
                  showLive={true}
                />
              ))}
            </div>
          </section>

          {/* Small Projects */}
          <section className="mb-16">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-header text-2xl md:text-3xl font-semibold text-white mb-8"
            >
              Small Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsData.smallProjects.map((project, idx) => (
                <ProjectCard 
                  key={idx} 
                  project={project} 
                  idx={idx}
                  showLive={false}
                />
              ))}
            </div>
          </section>

          {/* Back to Home */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mt-12"
          >
            <Link 
              to="/" 
              className="view-all-link text-base font-medium inline-flex items-center gap-2"
            >
              ← Back to Home <span className="arrow"></span>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProjectsPage

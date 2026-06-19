import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { usePortfolioContent } from '../content/portfolioContent'

const BlogPostPage = () => {
  const content = usePortfolioContent()
  const blogPosts = content.blogPosts

  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-deep-charcoal text-gray-200">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-purple-light transition-colors mb-8"
            >
              <span>←</span>
              
              <span>Back to blog</span>
              <br/>
            </Link>
            
            <div className="project-card p-8 text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Post not found</h1>
              <p className="text-gray-400 mb-6">The article you're looking for doesn't exist.</p>
              <Link 
                to="/blog" 
                className="btn-primary inline-flex items-center gap-2"
              >
                <span>Browse all posts</span>
                <span>→</span>
              </Link>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep-charcoal text-gray-200">
      <Navbar />
      
      {/* Article Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 hero-grid opacity-10" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-purple-dark/5 rounded-full blur-[80px]" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-purple-light transition-colors mb-8 group"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to blog</span>
            </Link>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="tech-tag"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-6 max-w-4xl">
              <span className="neon-gradient-text">{post.title}</span>
            </h1>
            
            {/* Meta info */}
            <div className="flex items-center gap-4 text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neon-purple rounded-full animate-pulse" />
                <span>{post.date}</span>
              </div>
              <span className="text-gray-600">•</span>
              <span>5 min read</span>
            </div>
            
            <div className="w-24 h-1 bg-gradient-to-r from-neon-purple-light via-neon-purple to-neon-purple-dark mt-8 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {/* Article card */}
          <div className="glass-dark p-8 md:p-12 rounded-2xl">
            <div 
              className="prose prose-invert prose-purple max-w-none
                prose-headings:font-bold prose-headings:text-white
                prose-p:text-gray-300 prose-p:leading-relaxed
                prose-a:text-neon-purple-light prose-a:no-underline hover:prose-a:text-neon-purple
                prose-code:text-neon-purple-light prose-code:bg-neon-purple/10 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-pre:bg-dark-blue prose-pre:border prose-pre:border-neon-purple/20
                prose-blockquote:border-l-neon-purple prose-blockquote:bg-neon-purple/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r
                prose-li:text-gray-300 prose-li:marker:text-neon-purple"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Bottom navigation */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex justify-between items-center">
              <Link 
                to="/blog" 
                className="btn-secondary inline-flex items-center gap-2"
              >
                <span>←</span>
                <span>All Posts</span>
              </Link>
              
              <div className="flex gap-4">
                <button className="text-gray-400 hover:text-neon-purple-light transition-colors text-sm">
                  Share →
                </button>
              </div>
            </div>
          </div>
        </motion.article>
      </main>
      
      <Footer />
    </div>
  )
}

export default BlogPostPage

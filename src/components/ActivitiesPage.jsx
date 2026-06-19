import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiExternalLink,
  FiCalendar,
  FiAward,
} from "react-icons/fi";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { usePortfolioContent } from '../content/portfolioContent'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const ActivitiesPage = () => {
  const content = usePortfolioContent()
  const activitiesData = content.activitiesPage

  return (
    <div className="min-h-screen bg-deep-charcoal text-gray-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 hero-grid opacity-20" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-purple-light transition-colors mb-8"
            >
              <FiArrowLeft />
              <span>Back to Home</span>
              <br />
            </Link>
            <br />
            <span className="text-sm font-mono text-neon-purple-light tracking-widest uppercase">
              #activities
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              Leadership &{" "}
              <span className="neon-gradient-text">Involvement</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              A detailed look at my extracurricular activities, leadership
              roles, and contributions to the community.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-purple-light via-neon-purple to-neon-purple-dark mt-6 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Activities List */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {activitiesData.map((activity, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative overflow-hidden"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-dark-blue/60 to-deep-charcoal/60 backdrop-blur-sm rounded-2xl border border-neon-purple/10 group-hover:border-neon-purple/30 transition-all duration-300" />

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/5 to-transparent rounded-2xl" />
              </div>

              <div className="relative p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activity.color} flex items-center justify-center`}
                  >
                    <FiAward className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <FiCalendar className="w-4 h-4" />
                    <span className="text-sm">{activity.period}</span>
                  </div>
                </div>

                {/* Title & Organization */}
                <h3 className="text-xl font-bold text-white group-hover:text-neon-purple-light transition-colors mb-1">
                  {activity.title}
                </h3>
                <p className="text-sm text-neon-purple-light mb-4">
                  {activity.organization}
                </p>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-6">
                  {activity.description}
                </p>

                {/* Achievements */}
                {activity.achievements.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-neon-purple rounded-full" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {activity.achievements.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-400"
                        >
                          <span className="text-neon-purple mt-1">▹</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {activity.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs border border-neon-purple/30 text-neon-purple-light rounded-full hover:bg-neon-purple/10 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                {activity.link && activity.link !== "#" && (
                  <a
                    href={activity.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-neon-purple-light hover:text-white transition-colors text-sm group/link"
                  >
                    <span>Learn more</span>
                    <FiExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                  </a>
                )}

                {/* Bottom accent */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${activity.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ActivitiesPage;

import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { usePortfolioContent } from '../content/portfolioContent'

const Footer = () => {
  const content = usePortfolioContent()
  const footerContent = content.footer
  const contactLinks = content.contact.socialLinks

  return (
    <footer className="border-t border-gray-800 mt-20 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-bold text-purple">{footerContent.name}</p>
            <p className="text-sm text-gray-400">{footerContent.role}</p>
          </div>
          <div className="flex gap-6 text-2xl">
            <a href={contactLinks.find((link) => link.name === 'GitHub')?.href || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-purple transition-colors"><FiGithub /></a>
            <a href={contactLinks.find((link) => link.name === 'LinkedIn')?.href || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-purple transition-colors"><FiLinkedin /></a>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-6">
          {footerContent.copyright}
        </div>
      </div>
    </footer>
  )
}

export default Footer
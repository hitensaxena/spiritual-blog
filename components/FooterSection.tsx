import { motion } from 'motion/react'
import { Heart, Eye, Feather, Mail, Twitter, Instagram } from 'lucide-react'

const navigationCategories = [
  {
    id: 'being',
    title: 'Being',
    description: 'The essence of existence',
    icon: Heart,
    color: '#ec4899'
  },
  {
    id: 'seeing',
    title: 'Seeing',
    description: 'Perception and awareness',
    icon: Eye,
    color: '#3b82f6'
  },
  {
    id: 'writing',
    title: 'Writing',
    description: 'Words as pointers',
    icon: Feather,
    color: '#22d3ee'
  }
]

const socialLinks = [
  { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' }
]

export function FooterSection() {
  return (
    <footer 
      data-section="footer"
      className="relative py-16 lg:py-24 overflow-hidden"
    >
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="space-y-4 mb-12">
            <motion.h2 
              className="text-section heading-pulse text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              These are not teachings.
            </motion.h2>
            
            <motion.h3 
              className="text-section heading-glow text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                background: 'linear-gradient(135deg, #a1a1aa 0%, #22d3ee 50%, #3b82f6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              They are reflections of being.
            </motion.h3>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-body text-base sm:text-lg text-[#a1a1aa] max-w-3xl mx-auto leading-relaxed"
          >
            May these words serve as gentle pointers toward the ineffable truth that resides not in concepts, but in the living awareness of this moment.
          </motion.p>
        </motion.div>

        {/* Navigation categories */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 mb-12 lg:mb-16"
        >
          {navigationCategories.map((category, index) => {
            const Icon = category.icon
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group cursor-pointer"
              >
                <motion.div
                  className="relative backdrop-blur-[25px] border border-white/15 rounded-2xl p-8 text-center"
                  style={{
                    background: `linear-gradient(145deg, 
                      rgba(244, 244, 245, 0.08) 0%, 
                      rgba(244, 244, 245, 0.04) 25%,
                      ${category.color}20 50%,
                      rgba(244, 244, 245, 0.04) 75%,
                      rgba(244, 244, 245, 0.08) 100%)`,
                    boxShadow: `
                      0 20px 40px -12px rgba(0, 0, 0, 0.4),
                      0 0 0 1px ${category.color}20,
                      inset 0 1px 0 rgba(244, 244, 245, 0.1)
                    `
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    boxShadow: `
                      0 25px 50px -12px rgba(0, 0, 0, 0.5),
                      0 0 0 1px ${category.color}40,
                      inset 0 1px 0 rgba(244, 244, 245, 0.15)
                    `
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                    style={{
                      background: `radial-gradient(circle, ${category.color}40 0%, transparent 70%)`,
                      border: `1px solid ${category.color}60`
                    }}
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    <Icon size={28} style={{ color: category.color }} />
                  </motion.div>

                  {/* Content */}
                  <motion.h3 
                    className="text-article-title text-xl sm:text-2xl mb-3 group-hover:scale-105 transition-all duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${category.color} 0%, #f4f4f5 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                    whileHover={{ 
                      textShadow: `0 0 20px ${category.color}40`
                    }}
                  >
                    {category.title}
                  </motion.h3>
                  
                  <p className="text-body text-sm text-[#a1a1aa] group-hover:text-[#f4f4f5]/80 transition-colors duration-300">
                    {category.description}
                  </p>

                  {/* Floating element */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-40"
                    style={{
                      background: `radial-gradient(circle, ${category.color}60 0%, transparent 70%)`
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{
                      duration: 3 + index * 0.5,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="flex items-center justify-center mb-16"
        >
          <div className="h-px w-32 bg-gradient-to-r from-transparent to-[#3b82f6]" />
          <div className="mx-8 w-3 h-3 rounded-full bg-[#22d3ee] shadow-lg shadow-[#22d3ee]/50" />
          <div className="h-px w-32 bg-gradient-to-l from-transparent to-[#a855f7]" />
        </motion.div>

        {/* Social links and footer info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center space-y-8"
        >
          {/* Social links */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center text-[#a1a1aa] hover:text-[#f4f4f5] hover:border-white/40 transition-all duration-300"
                  style={{
                    background: 'rgba(244, 244, 245, 0.05)'
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -3,
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </motion.a>
              )
            })}
          </div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-[#a1a1aa] text-sm"
          >
            © 2025 • A space for contemplation and reflection
          </motion.p>

          {/* Closing quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-base italic text-[#3b82f6] max-w-2xl mx-auto"
          >
            "In the beginning was the Word, and the Word was with consciousness, and consciousness was the Word."
          </motion.blockquote>
        </motion.div>

        {/* Final floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#22d3ee]/60"
              style={{
                left: `${20 + i * 30}%`,
                bottom: `${10 + i * 20}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 1, 0.3],
                scale: [1, 2, 1]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.7
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  )
}
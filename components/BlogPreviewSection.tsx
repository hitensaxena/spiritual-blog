import { motion } from 'motion/react'
import { Calendar, ArrowRight } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useMemo } from 'react'

const articles = [
  {
    id: 1,
    title: 'Layers of Maya - A Journey Home',
    subtitle: 'Peeling back the veils of perception to discover what was never hidden',
    date: 'Jan 15, 2025',
    readTime: '12 min',
    depth: 'Profound Inquiry',
    gradient: 'from-blue-500/20 to-purple-500/10'
  },
  {
    id: 2,
    title: 'The Ontology of Love - Distinguishing sentiment from spiritual ontogenesis',
    subtitle: 'Beyond emotional attachment toward love as the fundamental nature of being',
    date: 'Jan 12, 2025',
    readTime: '15 min',
    depth: 'Sacred Ontology',
    gradient: 'from-purple-500/20 to-pink-500/10'
  },
  {
    id: 3,
    title: 'The Epistemology of Labels and Direct Perception',
    subtitle: 'An integrative inquiry across psychology, spirituality and philosophy',
    date: 'Jan 10, 2025',
    readTime: '18 min',
    depth: 'Epistemic Exploration',
    gradient: 'from-cyan-500/20 to-blue-500/10'
  },
  {
    id: 4,
    title: 'Thought Experiment - Examining perception and cognition across varying levels of labelling',
    subtitle: 'A guided exploration into the mechanics of consciousness and categorization',
    date: 'Jan 8, 2025',
    readTime: '10 min',
    depth: 'Experiential Inquiry',
    gradient: 'from-indigo-500/20 to-purple-500/10'
  },
  {
    id: 5,
    title: 'The Dialectic of Epistemic Expansion and Apophatic Un-knowing',
    subtitle: 'Toward a post-conceptual hermeneutics of reality',
    date: 'Jan 5, 2025',
    readTime: '22 min',
    depth: 'Meta-philosophical',
    gradient: 'from-yellow-500/20 to-cyan-500/10'
  }
]

export function BlogPreviewSection() {
  // Optimize animations for better performance
  const springConfig = useMemo(() => ({
    type: "spring" as const,
    damping: 25,
    stiffness: 100
  }), [])

  const cardHoverEffect = useMemo(() => ({
    scale: 1.015,
    y: -6
  }), [])

  const buttonHoverEffect = useMemo(() => ({
    x: 4
  }), [])

  return (
    <section 
      data-section="blog"
      className="relative py-16 lg:py-24 overflow-hidden"
    >
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ ...springConfig, delay: 0.1 }}
          className="text-center mb-12 lg:mb-16"
          style={{ willChange: 'transform, opacity' }}
        >
          <motion.h2 
            className="text-section heading-shimmer text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6"
            whileInView={{ scale: [0.98, 1, 0.98] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            Recent Inquiries
          </motion.h2>
          <p className="text-body text-base sm:text-lg text-secondary max-w-2xl mx-auto">
            Explorations at the intersection of consciousness, philosophy, and direct experience
          </p>
        </motion.div>

        {/* Articles grid */}
        <div className="grid gap-6 md:gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ ...springConfig, delay: index * 0.05 }}
              className="group"
              style={{ willChange: 'transform, opacity' }}
            >
              <motion.div
                className="relative backdrop-blur-[25px] border border-white/15 rounded-2xl overflow-hidden h-full"
                style={{
                  background: `linear-gradient(145deg, 
                    rgba(244, 244, 245, 0.08) 0%, 
                    rgba(244, 244, 245, 0.04) 25%,
                    rgba(59, 130, 246, 0.08) 50%,
                    rgba(244, 244, 245, 0.04) 75%,
                    rgba(244, 244, 245, 0.08) 100%)`,
                  boxShadow: `
                    0 20px 40px -12px rgba(0, 0, 0, 0.4),
                    0 0 0 1px rgba(59, 130, 246, 0.1),
                    inset 0 1px 0 rgba(244, 244, 245, 0.1)`,
                  willChange: 'transform'
                }}
                whileHover={{ 
                  ...cardHoverEffect,
                  boxShadow: `
                    0 25px 50px -12px rgba(0, 0, 0, 0.5),
                    0 0 0 1px rgba(59, 130, 246, 0.2),
                    inset 0 1px 0 rgba(244, 244, 245, 0.15)
                  `
                }}
                transition={{ ...springConfig, duration: 0.4 }}
              >
                <div className="md:flex">
                  {/* Image section */}
                  <div className="md:w-2/5">
                    <div className="relative h-64 md:h-full min-h-[240px]">
                      <ImageWithFallback
                        src={`https://images.unsplash.com/photo-${
                          article.id === 1 ? '1419242902214-272b3f66cea0' :
                          article.id === 2 ? '1506905925346-21bda4d32df4' :
                          article.id === 3 ? '1451187580459-43490279c0fa' :
                          article.id === 4 ? '1559827260-ec07e8e0c3a9' :
                          '1446776877081-d75354382f16'
                        }?auto=format&fit=crop&w=800&q=80`}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient} opacity-60`} />
                      
                      {/* Depth indicator */}
                      <motion.div
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-caption backdrop-blur-md"
                        style={{
                          background: 'rgba(244, 244, 245, 0.15)',
                          border: '1px solid rgba(244, 244, 245, 0.2)',
                          willChange: 'transform'
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ ...springConfig, duration: 0.2 }}
                      >
                        {article.depth}
                      </motion.div>
                      
                      {/* Floating geometric elements - optimized */}
                      <div className="absolute bottom-4 right-4">
                        <motion.div
                          className="w-8 h-8 border border-white/30 rounded-full"
                          animate={{
                            rotate: 360,
                            scale: [1, 1.05, 1]
                          }}
                          transition={{
                            duration: 8 + index * 1.5, // Faster animations
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatType: "loop"
                          }}
                          style={{ willChange: 'transform' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      {/* Article meta */}
                      <div className="flex items-center space-x-4 text-meta mb-6">
                        <div className="flex items-center space-x-2">
                          <Calendar size={14} />
                          <span>{article.date}</span>
                        </div>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      {/* Title */}
                      <motion.h3 
                        className="text-article-title text-lg sm:text-xl lg:text-2xl mb-3 group-hover:scale-105 transition-all duration-300"
                        whileHover={{ 
                          textShadow: "0 0 20px rgba(59, 130, 246, 0.4)"
                        }}
                      >
                        {article.title}
                      </motion.h3>

                      {/* Subtitle */}
                      <p className="text-body text-sm sm:text-base text-secondary mb-6">
                        {article.subtitle}
                      </p>
                    </div>

                    {/* Read more button */}
                    <motion.button
                      className="inline-flex items-center space-x-2 text-button text-[#3b82f6] hover:text-[#60a5fa] transition-colors duration-300 self-start"
                      whileHover={buttonHoverEffect}
                      whileTap={{ scale: 0.96 }}
                      transition={{ ...springConfig, duration: 0.2 }}
                      style={{ willChange: 'transform' }}
                    >
                      <span>Continue Reading</span>
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </div>

                {/* Sacred geometry overlay - optimized */}
                <div className="absolute top-8 right-8 w-12 h-12 opacity-20 pointer-events-none">
                  <motion.div
                    className="w-full h-full"
                    style={{
                      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                      background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.2))',
                      willChange: 'transform'
                    }}
                    animate={{
                      rotate: [0, 180, 360],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 12 + index * 1.5, // Faster animations
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatType: "loop"
                    }}
                  />
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
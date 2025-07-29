import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { useCallback, useMemo } from 'react'

export function HeroSection() {
  const scrollToNext = useCallback(() => {
    try {
      const nextSection = document.getElementById('awakening-section')
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } catch (error) {
      console.warn('Scroll error:', error)
    }
  }, [])

  // Optimize animations for better performance
  const titleVariants = useMemo(() => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  }), [])

  const transitionConfig = useMemo(() => ({
    type: "spring",
    damping: 25,
    stiffness: 100
  }), [])

  return (
    <section 
      data-section="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      
      {/* Main content */}
      <div 
        className="relative text-center px-6 max-w-6xl mx-auto"
        style={{ 
          zIndex: 50,
          position: 'relative'
        }}
      >
        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionConfig, delay: 0.1 }}
          className="mb-8"
          style={{ willChange: 'transform, opacity' }}
        >
          <h1 className="mb-4 tracking-tight leading-none">
            <motion.div
              {...titleVariants}
              transition={{ ...transitionConfig, delay: 0.2 }}
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl"
              style={{ 
                willChange: 'transform, opacity',
                color: '#f8fafc',
                fontWeight: 300,
                letterSpacing: '-0.02em'
              }}
            >
              A mind stretched
            </motion.div>
            
            <motion.div
              {...titleVariants}
              transition={{ ...transitionConfig, delay: 0.4 }}
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl"
              style={{ 
                willChange: 'transform, opacity',
                color: '#e2e8f0',
                fontWeight: 300,
                letterSpacing: '-0.02em'
              }}
            >
              by thought
            </motion.div>
            
            <motion.div
              {...titleVariants}
              transition={{ ...transitionConfig, delay: 0.6 }}
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl"
              style={{ 
                willChange: 'transform, opacity',
                background: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 50%, #94a3b8 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 300,
                letterSpacing: '-0.02em'
              }}
            >
              returns altered
            </motion.div>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionConfig, delay: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-[#a1a1aa] max-w-4xl mx-auto leading-relaxed"
          style={{ 
            fontWeight: 300, 
            letterSpacing: '-0.01em',
            willChange: 'transform, opacity'
          }}
        >
          Welcome to a space where consciousness meets contemplation, and thoughts unfold into understanding.
        </motion.p>

        {/* Decorative lines */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ 
            type: "spring",
            damping: 20,
            stiffness: 80,
            delay: 1.0
          }}
          className="mt-12 flex justify-center items-center space-x-8"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#cbd5e1]" />
          <div className="w-2 h-2 rounded-full bg-[#f1f5f9] shadow-lg shadow-[#f1f5f9]/30" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#94a3b8]" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transitionConfig, delay: 1.2 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 z-10 text-[#cbd5e1] hover:text-[#f1f5f9] transition-colors duration-300"
        style={{ 
          transform: 'translateX(-50%)',
          willChange: 'transform, opacity'
        }}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to next section"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            repeatType: "loop"
          }}
          style={{ willChange: 'transform' }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.button>
    </section>
  )
}
import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Eye, Brain, Circle, Heart, Sparkles } from 'lucide-react'

const awakeningStages = [
  {
    id: 'recognition',
    stage: 'STAGE ONE',
    title: 'Recognition',
    subtitle: 'The first glimpse beyond the veil',
    content: 'In the midst of ordinary experience, something shifts. A recognition dawns that the one who has been seeking is the very awareness being sought. This is not an achievement but a remembering—like suddenly noticing the sky that was always there.',
    inquiry: 'What is aware of your thoughts and experiences right now?',
    icon: Eye,
    colors: {
      from: 'rgba(15, 23, 42, 0.95)',
      to: 'rgba(30, 41, 59, 0.85)',
      accent: '#64748b',
      border: 'rgba(100, 116, 139, 0.3)',
      glow: 'rgba(100, 116, 139, 0.1)'
    }
  },
  {
    id: 'investigation',
    stage: 'STAGE TWO',
    title: 'Investigation',
    subtitle: 'Looking more closely at what you are',
    content: 'The mind, so used to seeking elsewhere, begins to turn its attention to its own source. What seemed solid and separate reveals itself as transparent and interconnected. Every belief about identity becomes an invitation to look deeper.',
    inquiry: 'Can you find the boundaries of your awareness?',
    icon: Brain,
    colors: {
      from: 'rgba(17, 24, 39, 0.95)',
      to: 'rgba(31, 41, 55, 0.85)',
      accent: '#6b7280',
      border: 'rgba(107, 114, 128, 0.3)',
      glow: 'rgba(107, 114, 128, 0.1)'
    }
  },
  {
    id: 'dissolution',
    stage: 'STAGE THREE',
    title: 'Dissolution',
    subtitle: 'The boundaries begin to fade',
    content: 'Like sugar dissolving in water, the sense of being a separate self begins to dissolve. What remains is not nothing, but everything—a vast, open awareness in which all experience arises and passes away.',
    inquiry: 'What remains when you let go of being someone?',
    icon: Circle,
    colors: {
      from: 'rgba(20, 20, 31, 0.95)',
      to: 'rgba(30, 30, 46, 0.85)',
      accent: '#94a3b8',
      border: 'rgba(148, 163, 184, 0.3)',
      glow: 'rgba(148, 163, 184, 0.1)'
    }
  },
  {
    id: 'integration',
    stage: 'STAGE FOUR',
    title: 'Integration',
    subtitle: 'Living from this understanding',
    content: 'The extraordinary becomes ordinary. Daily life continues, but from a fundamentally different understanding. There is no one who has awakened—awakeness itself is living through this apparent form.',
    inquiry: 'How does life live itself through you?',
    icon: Heart,
    colors: {
      from: 'rgba(22, 22, 22, 0.95)',
      to: 'rgba(38, 38, 38, 0.85)',
      accent: '#71717a',
      border: 'rgba(113, 113, 122, 0.3)',
      glow: 'rgba(113, 113, 122, 0.1)'
    }
  },
  {
    id: 'embodiment',
    stage: 'STAGE FIVE',
    title: 'Embodiment',
    subtitle: 'The ordinary becomes sacred',
    content: 'Every moment becomes a celebration of being. The simplest activities—breathing, walking, listening—reveal themselves as expressions of the infinite. Nothing special, everything sacred.',
    inquiry: 'What if this moment is already perfect?',
    icon: Sparkles,
    colors: {
      from: 'rgba(12, 12, 18, 0.95)',
      to: 'rgba(25, 25, 35, 0.85)',
      accent: '#52525b',
      border: 'rgba(82, 82, 91, 0.3)',
      glow: 'rgba(82, 82, 91, 0.1)'
    }
  }
]

export function WorkingAwakeningSection() {
  const [expandedStage, setExpandedStage] = useState<string | null>(null)

  const toggleStage = useCallback((stageId: string) => {
    setExpandedStage(prev => prev === stageId ? null : stageId)
  }, [])

  // Optimize animation configurations
  const cardVariants = useMemo(() => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  }), [])

  const contentVariants = useMemo(() => ({
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 }
  }), [])

  const springConfig = useMemo(() => ({
    type: "spring" as const,
    damping: 25,
    stiffness: 120
  }), [])

  return (
    <section 
      id="awakening-section"
      data-section="awakening"
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
            whileInView={{ y: [5, 0, 5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            The Awakening
          </motion.h2>
          <p className="text-body text-base sm:text-lg text-[#a1a1aa] max-w-2xl mx-auto">
            A journey beyond the mind into the heart of what you truly are
          </p>
        </motion.div>

        {/* Awakening stages */}
        <div className="space-y-8">
          {awakeningStages.map((stage, index) => {
            const Icon = stage.icon
            const isExpanded = expandedStage === stage.id
            
            return (
              <motion.div
                key={stage.id}
                {...cardVariants}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ ...springConfig, delay: index * 0.05 }}
                className="relative"
                style={{ willChange: 'transform, opacity' }}
              >
                <motion.div
                  className="relative backdrop-blur-[10px] border rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, 
                      ${stage.colors.from} 0%, 
                      ${stage.colors.to} 100%)`,
                    borderColor: stage.colors.border,
                    boxShadow: `
                      0 8px 32px -8px rgba(0, 0, 0, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.05),
                      0 0 0 1px ${stage.colors.border}
                    `
                  }}
                  whileHover={{ 
                    scale: 1.01, 
                    y: -2,
                    boxShadow: `
                      0 12px 40px -8px rgba(0, 0, 0, 0.4),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1),
                      0 0 0 1px ${stage.colors.accent}80,
                      0 0 20px ${stage.colors.glow}
                    `
                  }}
                  onClick={() => toggleStage(stage.id)}
                  layout
                >
                  {/* Card header */}
                  <div className="p-8">
                    <div className="flex items-start space-x-6">
                      {/* Icon */}
                      <motion.div
                        className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)`,
                          border: `1px solid ${stage.colors.border}`,
                          boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                        }}
                        animate={isExpanded ? { rotate: 360, scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon size={28} style={{ color: stage.colors.accent }} />
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="text-sm font-medium text-[#a1a1aa] mb-2 tracking-wider">
                          {stage.stage}
                        </div>
                        <motion.h3 
                          className="text-article-title text-xl sm:text-2xl md:text-3xl mb-2"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          {stage.title}
                        </motion.h3>
                        <p className="text-body text-sm sm:text-base text-[#a1a1aa]">
                          {stage.subtitle}
                        </p>
                      </div>

                      {/* Expand indicator */}
                      <motion.div
                        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          border: `1px solid ${stage.colors.border}`,
                          background: `linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)`
                        }}
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div 
                          className="w-3 h-3 border-r border-b transform rotate-45" 
                          style={{ borderColor: stage.colors.accent }}
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="border-t border-white/10"
                      >
                        <div className="p-8 pt-6">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <p className="text-body text-base leading-relaxed mb-6 text-[#f4f4f5]/90">
                              {stage.content}
                            </p>
                            
                            <div 
                              className="p-6 rounded-xl"
                              style={{
                                background: `linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)`,
                                border: `1px solid ${stage.colors.border}`,
                                boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.05)`
                              }}
                            >
                              <h4 className="text-sm font-medium text-[#a1a1aa] mb-3 tracking-wider uppercase">
                                Inquiry
                              </h4>
                              <p className="text-base italic" style={{ color: stage.colors.accent }}>
                                {stage.inquiry}
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Floating elements */}
                <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full opacity-20 pointer-events-none">
                  <motion.div
                    className="w-full h-full rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${stage.colors.accent}40 0%, transparent 70%)`,
                      border: `1px solid ${stage.colors.border}`
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      duration: 4 + index * 0.5,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
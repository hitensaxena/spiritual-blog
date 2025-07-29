import { motion } from 'framer-motion'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useMemo } from 'react'

export function SimpleVisualSection() {
  // Optimize animations for better performance
  const springConfig = useMemo(() => ({
    type: "spring" as const,
    damping: 25,
    stiffness: 100
  }), [])

  const floatingAnimations = useMemo(() => ({
    y: [-8, 8, -8],
    opacity: [0.3, 0.6, 0.3],
    scale: [1, 1.03, 1]
  }), [])

  return (
    <section 
      data-section="visual"
      className="relative py-16 lg:py-24 overflow-hidden"
    >
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ ...springConfig, delay: 0.1 }}
          className="text-center mb-16"
          style={{ willChange: 'transform, opacity' }}
        >
          <motion.h2 
            className="text-section heading-float text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8"
            whileInView={{ scale: [0.95, 1, 0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Beyond the Gateway of Perception
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ ...springConfig, delay: 0.2 }}
            className="space-y-8"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="space-y-6">
              <p className="text-body text-base sm:text-lg leading-relaxed text-[#f4f4f5]">
                At the threshold between the known and the infinite, consciousness encounters its own boundless nature. The individual dissolves into the cosmic, revealing that separation was always an illusion.
              </p>
              
              <motion.div
                className="relative p-8 rounded-2xl backdrop-blur-[25px] border border-white/15"
                style={{
                  background: `linear-gradient(145deg, 
                    rgba(34, 211, 238, 0.08) 0%, 
                    rgba(244, 244, 245, 0.04) 25%,
                    rgba(14, 165, 233, 0.08) 50%,
                    rgba(244, 244, 245, 0.04) 75%,
                    rgba(34, 211, 238, 0.08) 100%)`,
                  boxShadow: `
                    0 20px 40px -12px rgba(0, 0, 0, 0.4),
                    0 0 0 1px rgba(34, 211, 238, 0.1),
                    inset 0 1px 0 rgba(244, 244, 245, 0.1)
                  `
                }}
                whileHover={{ scale: 1.015, y: -3 }}
                transition={{ ...springConfig, duration: 0.3 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-1 h-16 bg-gradient-to-b from-[#22d3ee] to-[#0ea5e9] rounded-full" />
                  <div>
                    <p className="text-base italic text-[#22d3ee] mb-2">
                      "The portal opens not to another place, but to another way of seeing. What we call reality is but the first layer of an infinite truth."
                    </p>
                    <cite className="text-sm text-[#a1a1aa]">— Ancient Wisdom</cite>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="flex justify-center space-x-8 pt-8">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${
                      i === 0 ? '#22d3ee' : i === 1 ? '#0ea5e9' : '#3b82f6'
                    }80 0%, transparent 70%)`
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    repeatType: "loop"
                  }}
                  style={{ willChange: 'transform' }}
                />
              ))}
            </div>
          </motion.div>

          {/* Image section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ ...springConfig, delay: 0.3 }}
            className="relative"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="relative">
              {/* Glass morphism frame */}
              <motion.div
                className="relative backdrop-blur-[25px] border border-white/15 rounded-3xl overflow-hidden p-4"
                style={{
                  background: `linear-gradient(145deg, 
                    rgba(244, 244, 245, 0.08) 0%, 
                    rgba(244, 244, 245, 0.04) 25%,
                    rgba(34, 211, 238, 0.08) 50%,
                    rgba(244, 244, 245, 0.04) 75%,
                    rgba(244, 244, 245, 0.08) 100%)`,
                  boxShadow: `
                    0 25px 50px -12px rgba(0, 0, 0, 0.5),
                    0 0 0 1px rgba(34, 211, 238, 0.1),
                    inset 0 1px 0 rgba(244, 244, 245, 0.1)
                  `
                }}
                whileHover={{ 
                  scale: 1.03, 
                  rotateY: 3,
                  boxShadow: `
                    0 35px 70px -12px rgba(0, 0, 0, 0.6),
                    0 0 0 1px rgba(34, 211, 238, 0.2),
                    inset 0 1px 0 rgba(244, 244, 245, 0.15)
                  `
                }}
                transition={{ ...springConfig, duration: 0.4 }}
                style={{ willChange: 'transform' }}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
                    alt="Cosmic consciousness portal with triangular gateway"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Cosmic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#22d3ee]/30 via-transparent to-[#3b82f6]/30" />
                  
                  {/* Energy rings */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute border border-white/20 rounded-full"
                        style={{
                          width: `${60 + i * 40}%`,
                          height: `${60 + i * 40}%`,
                        }}
                        animate={{
                          rotate: 360,
                          scale: [1, 1.03, 1],
                          opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                          duration: 15 + i * 3, // Faster animations
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.3,
                          repeatType: "loop"
                        }}
                        style={{ willChange: 'transform' }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating geometric elements */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${10 + i * 20}%`,
                      top: `${20 + i * 15}%`,
                      width: `${20 + i * 5}px`,
                      height: `${20 + i * 5}px`,
                    }}
                    animate={floatingAnimations}
                    transition={{
                      duration: 6 + i * 1.5, // Faster animations
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                      repeatType: "loop"
                    }}
                    style={{ willChange: 'transform' }}
                  >
                    {i % 2 === 0 ? (
                      <div
                        className="w-full h-full"
                        style={{
                          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                          background: 'linear-gradient(45deg, rgba(34, 211, 238, 0.4), rgba(59, 130, 246, 0.3))'
                        }}
                      />
                    ) : (
                      <div
                        className="w-full h-full rounded-full border"
                        style={{
                          border: '1px solid rgba(34, 211, 238, 0.4)',
                          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, transparent 70%)'
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Cosmic light beams */}
              <motion.div
                className="absolute -inset-4 opacity-50 pointer-events-none"
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-px h-32 bg-gradient-to-t from-transparent via-[#22d3ee]/30 to-transparent"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) rotate(${i * 60}deg)`,
                        transformOrigin: 'center bottom'
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
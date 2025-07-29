import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { motion } from 'motion/react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
  life: number
  maxLife: number
}

interface DynamicBackgroundProps {
  variant?: 'cosmic' | 'philosophical' | 'transcendent'
  intensity?: 'low' | 'medium' | 'high'
  className?: string
}

const variants = {
  cosmic: {
    colors: ['#3b82f6', '#a855f7', '#22d3ee'],
    gradients: [
      { x: 20, y: 80, color: '#3b82f6' },
      { x: 80, y: 20, color: '#a855f7' },
      { x: 40, y: 40, color: '#22d3ee' }
    ],
    hueRange: [220, 280],
    particleCount: { low: 6, medium: 20, high: 30 }
  },
  philosophical: {
    colors: ['#818cf8', '#a855f7'],
    gradients: [
      { x: 30, y: 70, color: '#818cf8' },
      { x: 70, y: 30, color: '#a855f7' }
    ],
    hueRange: [260, 300],
    particleCount: { low: 4, medium: 15, high: 20 }
  },
  transcendent: {
    colors: ['#22d3ee', '#0ea5e9'],
    gradients: [
      { x: 50, y: 20, color: '#22d3ee' },
      { x: 50, y: 80, color: '#0ea5e9' }
    ],
    hueRange: [180, 260],
    particleCount: { low: 4, medium: 15, high: 20 }
  }
}

export function DynamicBackground({ 
  variant = 'cosmic', 
  intensity = 'medium',
  className = ''
}: DynamicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const lastTimeRef = useRef<number>(0)
  const observerRef = useRef<IntersectionObserver>()
  const [isClient, setIsClient] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    const checkReducedMotion = () => {
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }
    
    checkMobile()
    checkReducedMotion()
    
    const resizeHandler = checkMobile
    const motionHandler = () => checkReducedMotion()
    
    window.addEventListener('resize', resizeHandler, { passive: true })
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', motionHandler)
    
    return () => {
      window.removeEventListener('resize', resizeHandler)
      window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', motionHandler)
    }
  }, [])

  useEffect(() => {
    if (!isClient || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) return

    const config = variants[variant]
    const actualIntensity = isMobile ? 'low' : intensity
    const particleCount = config.particleCount[actualIntensity]
    
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    const createParticle = (): Particle => {
      const maxLife = 5000 + Math.random() * 5000
      return {
        x: Math.random() * canvas.getBoundingClientRect().width,
        y: Math.random() * canvas.getBoundingClientRect().height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        hue: config.hueRange[0] + Math.random() * (config.hueRange[1] - config.hueRange[0]),
        life: 0,
        maxLife
      }
    }

    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, createParticle)
    }

    // Define animate function with proper error handling
    const animate = (currentTime: number) => {
      // Safety checks
      if (!isVisible || isReducedMotion || !ctx || !canvas) return

      try {
        const deltaTime = currentTime - lastTimeRef.current
        
        // Maintain 60fps with performance throttling
        if (deltaTime < 16.67) {
          animationRef.current = requestAnimationFrame(animate)
          return
        }

        lastTimeRef.current = currentTime
        const rect = canvas.getBoundingClientRect()
        
        // Use efficient clearing
        ctx.clearRect(0, 0, rect.width, rect.height)

        // Batch particle updates for better performance
        const particles = particlesRef.current
        const currentParticleCount = particles.length
        
        for (let i = 0; i < currentParticleCount; i++) {
          const particle = particles[i]
          
          // Update position
          particle.x += particle.vx
          particle.y += particle.vy
          particle.life += deltaTime

          // Efficient boundary wrapping
          const bounds = 50
          if (particle.x < -bounds) particle.x = rect.width + bounds
          else if (particle.x > rect.width + bounds) particle.x = -bounds
          if (particle.y < -bounds) particle.y = rect.height + bounds
          else if (particle.y > rect.height + bounds) particle.y = -bounds

          // Optimized lifecycle calculation
          const lifeRatio = particle.life / particle.maxLife
          let alpha = particle.opacity
          
          if (lifeRatio > 0.8) {
            alpha *= (1 - (lifeRatio - 0.8) * 5) // Faster calculation
          } else if (lifeRatio < 0.2) {
            alpha *= lifeRatio * 5
          }

          // Reset particle if dead
          if (particle.life >= particle.maxLife) {
            Object.assign(particle, createParticle())
          }

          // Optimized drawing with reduced shadow blur for performance
          if (alpha > 0.01) { // Skip nearly invisible particles
            ctx.globalAlpha = alpha
            ctx.fillStyle = `hsl(${particle.hue}, 70%, 65%)`
            ctx.shadowBlur = isMobile ? 10 : 15 // Reduced for mobile
            ctx.shadowColor = `hsl(${particle.hue}, 70%, 65%)`
            
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fill()
          }
        }

        animationRef.current = requestAnimationFrame(animate)
      } catch (error) {
        console.warn('Animation error:', error)
        // Restart animation after a brief delay
        setTimeout(() => {
          if (isVisible && !isReducedMotion) {
            animationRef.current = requestAnimationFrame(animate)
          }
        }, 100)
      }
    }

    // Optimized Intersection Observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting
        setIsVisible(isIntersecting)
        
        if (isIntersecting && !animationRef.current && !isReducedMotion) {
          lastTimeRef.current = performance.now()
          animationRef.current = requestAnimationFrame(animate)
        } else if (!isIntersecting && animationRef.current) {
          cancelAnimationFrame(animationRef.current)
          animationRef.current = undefined
        }
      },
      { 
        threshold: 0,
        rootMargin: '50px' // Start animation slightly before element is visible
      }
    )

    observerRef.current.observe(canvas)
    resizeCanvas()
    initParticles()
    
    // Only start animation if visible and motion is allowed
    if (!isReducedMotion) {
      lastTimeRef.current = performance.now()
      animationRef.current = requestAnimationFrame(animate)
    }

    const resizeHandler = resizeCanvas
    window.addEventListener('resize', resizeHandler, { passive: true })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      window.removeEventListener('resize', resizeHandler)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = undefined
      }
    }
  }, [isClient, variant, intensity, isMobile, isVisible, isReducedMotion])

  const config = useMemo(() => variants[variant], [variant])
  const gradientStyle = useMemo(() => ({
    background: `
      radial-gradient(circle at ${config.gradients[0].x}% ${config.gradients[0].y}%, ${config.gradients[0].color}40 0%, transparent 50%),
      radial-gradient(circle at ${config.gradients[1].x}% ${config.gradients[1].y}%, ${config.gradients[1].color}40 0%, transparent 50%)
      ${config.gradients[2] ? `, radial-gradient(circle at ${config.gradients[2].x}% ${config.gradients[2].y}%, ${config.gradients[2].color}40 0%, transparent 50%)` : ''}
    `,
    willChange: 'transform'
  }), [config])

  if (!isClient) {
    return (
      <div className={`absolute inset-0 opacity-20 ${className}`}>
        <div style={gradientStyle} className="w-full h-full" />
      </div>
    )
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Static gradient background */}
      <div style={gradientStyle} className="absolute inset-0 opacity-20" />
      
      {/* Animated canvas overlay */}
      {!isReducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ 
            mixBlendMode: 'screen',
            willChange: 'contents'
          }}
        />
      )}
      
      {/* Sacred geometry elements - optimized for performance */}
      {!isReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(isMobile ? 2 : 3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 border border-cyan-400/20 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
                willChange: 'transform'
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {[...Array(isMobile ? 1 : 2)].map((_, i) => (
            <motion.div
              key={`triangle-${i}`}
              className="absolute w-16 h-16 opacity-20"
              style={{
                right: `${10 + i * 20}%`,
                bottom: `${20 + i * 30}%`,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                background: `linear-gradient(45deg, ${config.colors[0]}60, ${config.colors[1]}40)`,
                willChange: 'transform'
              }}
              animate={{
                rotate: [0, 180, 360],
                y: [-15, 15, -15]
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
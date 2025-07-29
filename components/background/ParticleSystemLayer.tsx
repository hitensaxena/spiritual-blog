import { useEffect, useRef, useState } from 'react'

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
  trail: { x: number; y: number; alpha: number }[]
}

interface ParticleSystemLayerProps {
  variant?: 'cosmic' | 'philosophical' | 'transcendent'
  intensity?: 'low' | 'medium' | 'high'
  isVisible: boolean
  isMobile: boolean
  isReducedMotion: boolean
}

const particleConfigs = {
  cosmic: {
    hueRange: [220, 280],
    count: { low: 15, medium: 30, high: 50 },
    colors: ['#3b82f6', '#a855f7', '#22d3ee']
  },
  philosophical: {
    hueRange: [260, 300],
    count: { low: 10, medium: 20, high: 35 },
    colors: ['#818cf8', '#a855f7']
  },
  transcendent: {
    hueRange: [180, 240],
    count: { low: 12, medium: 25, high: 40 },
    colors: ['#22d3ee', '#0ea5e9']
  }
}

export function ParticleSystemLayer({ 
  variant = 'cosmic', 
  intensity = 'medium',
  isVisible,
  isMobile,
  isReducedMotion 
}: ParticleSystemLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !canvasRef.current || isReducedMotion) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) return

    const config = particleConfigs[variant]
    const actualIntensity = isMobile ? 'low' : intensity
    const particleCount = config.count[actualIntensity]

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    const createParticle = (): Particle => {
      const maxLife = 8000 + Math.random() * 4000
      return {
        x: Math.random() * canvas.getBoundingClientRect().width,
        y: Math.random() * canvas.getBoundingClientRect().height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.3,
        hue: config.hueRange[0] + Math.random() * (config.hueRange[1] - config.hueRange[0]),
        life: 0,
        maxLife,
        trail: []
      }
    }

    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, createParticle)
    }

    const animate = (currentTime: number) => {
      if (!isVisible || !ctx) return

      const deltaTime = currentTime - lastTimeRef.current
      
      if (deltaTime < 16.67) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      lastTimeRef.current = currentTime
      const rect = canvas.getBoundingClientRect()
      
      ctx.clearRect(0, 0, rect.width, rect.height)

      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life += deltaTime

        // Add to trail
        particle.trail.push({ x: particle.x, y: particle.y, alpha: particle.opacity })
        if (particle.trail.length > 8) {
          particle.trail.shift()
        }

        // Boundary wrapping
        const bounds = 50
        if (particle.x < -bounds) particle.x = rect.width + bounds
        else if (particle.x > rect.width + bounds) particle.x = -bounds
        if (particle.y < -bounds) particle.y = rect.height + bounds
        else if (particle.y > rect.height + bounds) particle.y = -bounds

        // Lifecycle
        const lifeRatio = particle.life / particle.maxLife
        let alpha = particle.opacity
        
        if (lifeRatio > 0.8) {
          alpha *= (1 - (lifeRatio - 0.8) * 5)
        } else if (lifeRatio < 0.2) {
          alpha *= lifeRatio * 5
        }

        // Reset if dead
        if (particle.life >= particle.maxLife) {
          Object.assign(particle, createParticle())
        }

        // Draw trail
        particle.trail.forEach((point, index) => {
          const trailAlpha = (alpha * (index / particle.trail.length)) * 0.3
          if (trailAlpha > 0.01) {
            ctx.globalAlpha = trailAlpha
            ctx.fillStyle = `hsl(${particle.hue}, 70%, 65%)`
            ctx.beginPath()
            ctx.arc(point.x, point.y, particle.size * 0.5, 0, Math.PI * 2)
            ctx.fill()
          }
        })

        // Draw main particle
        if (alpha > 0.01) {
          ctx.globalAlpha = alpha
          ctx.fillStyle = `hsl(${particle.hue}, 80%, 70%)`
          ctx.shadowBlur = particle.size * 3
          ctx.shadowColor = `hsl(${particle.hue}, 80%, 70%)`
          
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()

          // Add inner glow
          ctx.globalAlpha = alpha * 0.5
          ctx.fillStyle = `hsl(${particle.hue}, 90%, 85%)`
          ctx.shadowBlur = 0
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    
    if (isVisible) {
      lastTimeRef.current = performance.now()
      animationRef.current = requestAnimationFrame(animate)
    }

    const resizeHandler = () => {
      resizeCanvas()
      initParticles()
    }
    
    window.addEventListener('resize', resizeHandler, { passive: true })

    return () => {
      window.removeEventListener('resize', resizeHandler)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isClient, variant, intensity, isVisible, isMobile, isReducedMotion])

  if (!isClient || isReducedMotion) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: -4,
        mixBlendMode: 'screen',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
        willChange: 'contents'
      }}
    />
  )
}
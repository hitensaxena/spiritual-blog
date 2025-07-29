import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

interface Star {
  x: number
  y: number
  size: number
  brightness: number
  twinkleSpeed: number
  twinklePhase: number
}

interface CelestialObject {
  x: number
  y: number
  size: number
  speed: number
  type: 'asteroid' | 'comet' | 'planet'
  color: string
  trail?: { x: number; y: number; alpha: number }[]
}

export function SimplifiedSpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const celestialObjectsRef = useRef<CelestialObject[]>([])
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const [isClient, setIsClient] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Check for reduced motion preference
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setIsReducedMotion(mediaQuery.matches)
      
      const handleChange = () => setIsReducedMotion(mediaQuery.matches)
      mediaQuery.addEventListener('change', handleChange)
      
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  useEffect(() => {
    if (!isClient || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) return

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      // Use document height to cover the full page, not just viewport
      const fullHeight = Math.max(
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.body.clientHeight,
        document.body.scrollHeight,
        window.innerHeight
      )
      canvas.width = window.innerWidth * dpr
      canvas.height = fullHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = fullHeight + 'px'
    }

    const createStar = (): Star => {
      const fullHeight = Math.max(
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.body.clientHeight,
        document.body.scrollHeight,
        window.innerHeight
      )
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * fullHeight,
        size: Math.random() * 3 + 0.5,
        brightness: Math.random() * 0.8 + 0.2,
        twinkleSpeed: 0.01 + Math.random() * 0.02,
        twinklePhase: Math.random() * Math.PI * 2
      }
    }

    const createCelestialObject = (): CelestialObject => {
      const types: ('asteroid' | 'comet' | 'planet')[] = ['asteroid', 'comet', 'planet']
      const type = types[Math.floor(Math.random() * types.length)]
      
      const colors = {
        asteroid: '#8b7355',
        comet: '#22d3ee',
        planet: '#a855f7'
      }

      const fullHeight = Math.max(
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.body.clientHeight,
        document.body.scrollHeight,
        window.innerHeight
      )

      const obj: CelestialObject = {
        x: -50,
        y: Math.random() * fullHeight,
        size: type === 'planet' ? Math.random() * 8 + 4 : Math.random() * 4 + 2,
        speed: type === 'planet' ? 0.1 + Math.random() * 0.2 : 0.3 + Math.random() * 0.7,
        type,
        color: colors[type]
      }

      if (type === 'comet') {
        obj.trail = []
      }

      return obj
    }

    const initializeObjects = () => {
      // Responsive star count based on device capabilities
      const isMobile = window.innerWidth < 768
      const baseStarCount = isMobile ? 150 : 300
      const starCount = Math.min(baseStarCount, window.innerWidth * 0.25)
      starsRef.current = Array.from({ length: starCount }, createStar)

      // Fewer celestial objects on mobile
      const celestialCount = isMobile ? 4 : 8
      celestialObjectsRef.current = Array.from({ length: celestialCount }, createCelestialObject)
    }

    const animate = (currentTime: number) => {
      if (!isVisible || !ctx) return

      const deltaTime = currentTime - lastTimeRef.current
      
      if (deltaTime < 16.67) { // 60fps throttle
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      lastTimeRef.current = currentTime
      
      // Clear canvas with space gradient - use full document height
      const fullHeight = Math.max(
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.body.clientHeight,
        document.body.scrollHeight,
        window.innerHeight
      )
      const gradient = ctx.createLinearGradient(0, 0, 0, fullHeight)
      gradient.addColorStop(0, '#0a0a0f')
      gradient.addColorStop(0.5, '#1a1a2e')
      gradient.addColorStop(1, '#16213e')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, window.innerWidth, fullHeight)

      // Draw and animate stars
      starsRef.current.forEach(star => {
        if (!isReducedMotion) {
          star.twinklePhase += star.twinkleSpeed
        }
        const twinkle = isReducedMotion ? 0.5 : (Math.sin(star.twinklePhase) + 1) * 0.5
        const alpha = star.brightness * (0.3 + twinkle * 0.7)

        ctx.globalAlpha = alpha
        ctx.fillStyle = '#ffffff'
        ctx.shadowBlur = star.size * 2
        ctx.shadowColor = '#ffffff'
        
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        // Add sparkle effect for larger stars
        if (star.size > 2 && twinkle > 0.8) {
          ctx.globalAlpha = alpha * 0.5
          ctx.fillStyle = '#22d3ee'
          ctx.shadowBlur = star.size * 4
          ctx.shadowColor = '#22d3ee'
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 0.3, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Draw and animate celestial objects
      celestialObjectsRef.current.forEach((obj, index) => {
        if (!isReducedMotion) {
          obj.x += obj.speed
        }

        // Reset position when off screen
        if (obj.x > window.innerWidth + 100) {
          const fullHeight = Math.max(
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.body.clientHeight,
            document.body.scrollHeight,
            window.innerHeight
          )
          obj.x = -50
          obj.y = Math.random() * fullHeight
        }

        // Update comet trail (skip if reduced motion)
        if (obj.type === 'comet' && obj.trail && !isReducedMotion) {
          obj.trail.push({ x: obj.x, y: obj.y, alpha: 1 })
          if (obj.trail.length > 20) {
            obj.trail.shift()
          }

          // Draw trail
          obj.trail.forEach((point, trailIndex) => {
            const trailAlpha = (trailIndex / obj.trail!.length) * 0.6
            ctx.globalAlpha = trailAlpha
            ctx.fillStyle = obj.color
            ctx.shadowBlur = 2
            ctx.shadowColor = obj.color
            ctx.beginPath()
            ctx.arc(point.x, point.y, obj.size * 0.3, 0, Math.PI * 2)
            ctx.fill()
          })
        }

        // Draw main object
        ctx.globalAlpha = obj.type === 'planet' ? 0.7 : 0.8
        ctx.fillStyle = obj.color
        ctx.shadowBlur = obj.size * 2
        ctx.shadowColor = obj.color

        if (obj.type === 'asteroid') {
          // Draw irregular asteroid shape
          ctx.beginPath()
          const points = 6
          for (let i = 0; i < points; i++) {
            const angle = (i / points) * Math.PI * 2
            const radius = obj.size * (0.8 + Math.random() * 0.4)
            const x = obj.x + Math.cos(angle) * radius
            const y = obj.y + Math.sin(angle) * radius
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          ctx.fill()
        } else {
          // Draw circular objects (comets and planets)
          ctx.beginPath()
          ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2)
          ctx.fill()

          // Add inner glow for planets
          if (obj.type === 'planet') {
            ctx.globalAlpha = 0.4
            ctx.fillStyle = '#ffffff'
            ctx.shadowBlur = 0
            ctx.beginPath()
            ctx.arc(obj.x, obj.y, obj.size * 0.6, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      })

      // Reset shadow and alpha
      ctx.shadowBlur = 0
      ctx.globalAlpha = 1

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initializeObjects()
    
    if (isVisible) {
      lastTimeRef.current = performance.now()
      animationRef.current = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      resizeCanvas()
      initializeObjects()
    }

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isClient, isVisible])

  if (!isClient) {
    return (
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)'
        }}
      />
    )
  }

  return (
    <>
      {/* Static space gradient fallback */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)'
        }}
      />
      
      {/* Animated canvas layer */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          width: '100vw',
          height: '100%',
          minHeight: '100vh',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      />

      {/* Subtle atmospheric overlay */}
      <div 
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)'
        }}
      />
    </>
  )
}
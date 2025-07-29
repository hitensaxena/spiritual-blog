import { useEffect, useRef, useState } from 'react'

interface Star {
  x: number
  y: number
  size: number
  brightness: number
  twinkleSpeed: number
  color: string
}

interface StarFieldLayerProps {
  variant?: 'cosmic' | 'philosophical' | 'transcendent'
  isVisible: boolean
  isMobile: boolean
  isReducedMotion: boolean
}

const starConfigs = {
  cosmic: {
    count: { mobile: 80, desktop: 150 },
    colors: ['#ffffff', '#3b82f6', '#22d3ee', '#a855f7'],
    brightness: { min: 0.3, max: 1 }
  },
  philosophical: {
    count: { mobile: 60, desktop: 120 },
    colors: ['#ffffff', '#818cf8', '#a855f7'],
    brightness: { min: 0.4, max: 0.9 }
  },
  transcendent: {
    count: { mobile: 70, desktop: 130 },
    colors: ['#ffffff', '#22d3ee', '#0ea5e9'],
    brightness: { min: 0.3, max: 1 }
  }
}

export function StarFieldLayer({ variant = 'cosmic', isVisible, isMobile, isReducedMotion }: StarFieldLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number>()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !canvasRef.current || isReducedMotion) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const config = starConfigs[variant]
    const starCount = isMobile ? config.count.mobile : config.count.desktop

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    const createStar = (): Star => ({
      x: Math.random() * canvas.getBoundingClientRect().width,
      y: Math.random() * canvas.getBoundingClientRect().height,
      size: Math.random() * 2 + 0.5,
      brightness: config.brightness.min + Math.random() * (config.brightness.max - config.brightness.min),
      twinkleSpeed: 0.02 + Math.random() * 0.03,
      color: config.colors[Math.floor(Math.random() * config.colors.length)]
    })

    const initStars = () => {
      starsRef.current = Array.from({ length: starCount }, createStar)
    }

    const animate = (currentTime: number) => {
      if (!isVisible || !ctx) return

      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      starsRef.current.forEach(star => {
        const twinkle = Math.sin(currentTime * star.twinkleSpeed) * 0.3 + 0.7
        const alpha = star.brightness * twinkle

        ctx.globalAlpha = alpha
        ctx.fillStyle = star.color
        ctx.shadowBlur = star.size * 2
        ctx.shadowColor = star.color
        
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initStars()
    
    if (isVisible) {
      animationRef.current = requestAnimationFrame(animate)
    }

    const resizeHandler = () => {
      resizeCanvas()
      initStars()
    }
    
    window.addEventListener('resize', resizeHandler, { passive: true })

    return () => {
      window.removeEventListener('resize', resizeHandler)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isClient, variant, isVisible, isMobile, isReducedMotion])

  if (!isClient || isReducedMotion) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: -2,
        opacity: isVisible ? 0.6 : 0,
        transition: 'opacity 1s ease-in-out',
        willChange: 'contents'
      }}
    />
  )
}
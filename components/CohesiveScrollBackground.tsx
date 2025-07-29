import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { motion } from 'motion/react'
import { MeshGradientLayer } from './background/MeshGradientLayer'
import { NebulaLayer } from './background/NebulaLayer'
import { EnergyWaveLayer } from './background/EnergyWaveLayer'
import { StarFieldLayer } from './background/StarFieldLayer'
import { ParticleSystemLayer } from './background/ParticleSystemLayer'

interface SectionConfig {
  id: string
  variant: 'cosmic' | 'philosophical' | 'transcendent'
  intensity: 'low' | 'medium' | 'high'
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  backgroundOpacity: number
  particleCount: number
}

interface CohesiveScrollBackgroundProps {
  className?: string
}

const sectionConfigs: Record<string, SectionConfig> = {
  hero: {
    id: 'hero',
    variant: 'cosmic',
    intensity: 'high',
    colors: {
      primary: '#3b82f6',
      secondary: '#a855f7', 
      accent: '#22d3ee'
    },
    backgroundOpacity: 1,
    particleCount: 40
  },
  awakening: {
    id: 'awakening',
    variant: 'philosophical',
    intensity: 'medium',
    colors: {
      primary: '#818cf8',
      secondary: '#a855f7',
      accent: '#c084fc'
    },
    backgroundOpacity: 0.8,
    particleCount: 25
  },
  blog: {
    id: 'blog',
    variant: 'transcendent',
    intensity: 'medium',
    colors: {
      primary: '#22d3ee',
      secondary: '#0ea5e9',
      accent: '#06b6d4'
    },
    backgroundOpacity: 0.9,
    particleCount: 30
  },
  visual: {
    id: 'visual',
    variant: 'cosmic',
    intensity: 'low',
    colors: {
      primary: '#8b5cf6',
      secondary: '#3b82f6',
      accent: '#22d3ee'
    },
    backgroundOpacity: 0.7,
    particleCount: 20
  },
  footer: {
    id: 'footer',
    variant: 'philosophical',
    intensity: 'low',
    colors: {
      primary: '#64748b',
      secondary: '#475569',
      accent: '#94a3b8'
    },
    backgroundOpacity: 0.5,
    particleCount: 15
  }
}

export function CohesiveScrollBackground({ className = '' }: CohesiveScrollBackgroundProps) {
  // All hooks must be called unconditionally and in the same order
  const [currentSection, setCurrentSection] = useState('hero')
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const observersRef = useRef<Map<string, IntersectionObserver>>(new Map())
  const sectionElementsRef = useRef<Map<string, Element>>(new Map())
  const animationFrameRef = useRef<number>()
  const lastScrollTimeRef = useRef<number>(0)

  // Always call useMemo hooks in the same order
  const currentConfig = useMemo(() => sectionConfigs[currentSection] || sectionConfigs.hero, [currentSection])
  
  const layerProps = useMemo(() => ({
    variant: currentConfig.variant,
    isVisible: isVisible && !isReducedMotion,
    isMobile,
    isReducedMotion
  }), [currentConfig.variant, isVisible, isReducedMotion, isMobile])

  const particleProps = useMemo(() => ({
    ...layerProps,
    intensity: isMobile ? 'low' : currentConfig.intensity
  }), [layerProps, isMobile, currentConfig.intensity])

  // Get background gradient based on current section
  const getBackgroundGradient = useCallback((sectionId: string) => {
    switch (sectionId) {
      case 'hero':
        return 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)'
      case 'awakening':
        return 'linear-gradient(180deg, #0a0a0f 0%, #1a1530 50%, #1a1845 100%)'
      case 'blog':
        return 'linear-gradient(180deg, #0a0a12 0%, #152838 50%, #1a2332 100%)'
      case 'visual':
        return 'linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)'
      case 'footer':
        return 'linear-gradient(180deg, #0a0a0a 0%, #151515 50%, #1a1a1a 100%)'
      default:
        return 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)'
    }
  }, [])

  const getGlassmorphismGradient = useCallback((sectionId: string) => {
    switch (sectionId) {
      case 'hero':
        return `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
                radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.06) 0%, transparent 40%),
                radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.05) 0%, transparent 60%)`
      case 'awakening':
        return `radial-gradient(circle at 30% 40%, rgba(129, 140, 248, 0.06) 0%, transparent 40%),
                radial-gradient(circle at 70% 60%, rgba(168, 85, 247, 0.08) 0%, transparent 40%)`
      case 'blog':
        return `radial-gradient(circle at 40% 20%, rgba(34, 211, 238, 0.07) 0%, transparent 40%),
                radial-gradient(circle at 60% 80%, rgba(14, 165, 233, 0.05) 0%, transparent 40%)`
      case 'visual':
        return `radial-gradient(circle at 25% 75%, rgba(139, 92, 246, 0.06) 0%, transparent 40%),
                radial-gradient(circle at 75% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 40%)`
      case 'footer':
        return `radial-gradient(circle at 50% 50%, rgba(100, 116, 139, 0.04) 0%, transparent 50%)`
      default:
        return `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
                radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.06) 0%, transparent 40%)`
    }
  }, [])

  // Performance-optimized environment detection
  useEffect(() => {
    setIsClient(true)
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    const checkReducedMotion = () => {
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }
    
    checkMobile()
    checkReducedMotion()

    const resizeHandler = () => {
      checkMobile()
      // Debounce resize for performance
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      animationFrameRef.current = requestAnimationFrame(checkMobile)
    }
    
    const motionHandler = () => checkReducedMotion()
    
    window.addEventListener('resize', resizeHandler, { passive: true })
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', motionHandler)
    
    return () => {
      window.removeEventListener('resize', resizeHandler)
      window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', motionHandler)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Optimized section detection with Intersection Observer
  useEffect(() => {
    if (!isClient) return

    const cleanup = () => {
      observersRef.current.forEach(observer => observer.disconnect())
      observersRef.current.clear()
      sectionElementsRef.current.clear()
    }

    // Find section elements
    const sections = [
      { id: 'hero', selector: '[data-section="hero"]' },
      { id: 'awakening', selector: '[data-section="awakening"]' },
      { id: 'blog', selector: '[data-section="blog"]' },
      { id: 'visual', selector: '[data-section="visual"]' },
      { id: 'footer', selector: '[data-section="footer"]' }
    ]

    sections.forEach(({ id, selector }) => {
      const element = document.querySelector(selector)
      if (element) {
        sectionElementsRef.current.set(id, element)
        
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              setCurrentSection(id)
            }
          },
          {
            threshold: [0.3],
            rootMargin: '-10% 0px -10% 0px'
          }
        )
        
        observer.observe(element)
        observersRef.current.set(id, observer)
      }
    })

    return cleanup
  }, [isClient])

  // Background visibility optimization
  useEffect(() => {
    if (!isClient || !containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0, rootMargin: '100px' }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [isClient])

  // Simple scroll progress tracking for smooth transitions
  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      const now = performance.now()
      if (now - lastScrollTimeRef.current < 16) return // 60fps throttle
      
      lastScrollTimeRef.current = now
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const progress = Math.min(scrollY / (documentHeight - windowHeight), 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isClient])

  if (!isClient) {
    // SSR fallback with basic gradient
    return (
      <div 
        ref={containerRef}
        className={`fixed inset-0 -z-10 ${className}`}
        style={{
          background: getBackgroundGradient('hero'),
          opacity: 0.8
        }}
      />
    )
  }

  return (
    <motion.div 
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden ${className}`}
      style={{ zIndex: -10 }}
      style={{ 
        background: getBackgroundGradient(currentSection),
        willChange: 'background',
        zIndex: -10
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {/* Base depth gradient with smooth transitions */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, #000000 100%)',
          opacity: 0.6 + (scrollProgress * 0.2)
        }}
        animate={{
          opacity: 0.6 + (scrollProgress * 0.2)
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Layered background system with performance optimization */}
      {isVisible && (
        <>
          {/* Multiple mesh gradient layers for depth - only render if visible */}
          {[0, 1, 2].map(layer => (
            <MeshGradientLayer
              key={`mesh-${layer}`}
              variant={currentConfig.variant}
              layer={layer}
              isVisible={isVisible}
            />
          ))}

          {/* Star field - deepest layer */}
          <StarFieldLayer {...layerProps} />

          {/* Energy waves - mid layer */}
          <EnergyWaveLayer {...layerProps} />

          {/* Enhanced particle system - active layer */}
          <ParticleSystemLayer {...particleProps} />

          {/* Nebula clouds - atmospheric layer */}
          <NebulaLayer {...layerProps} />
        </>
      )}

      {/* Section-aware glassmorphism reflection layer */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: getGlassmorphismGradient(currentSection),
          opacity: 1 - (scrollProgress * 0.4)
        }}
        animate={{
          background: getGlassmorphismGradient(currentSection),
          opacity: 1 - (scrollProgress * 0.4)
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* Performance indicator (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 z-50 text-xs bg-black/50 text-white p-2 rounded">
          Section: {currentSection} | Mobile: {isMobile ? 'Y' : 'N'} | Motion: {isReducedMotion ? 'Reduced' : 'Full'}
        </div>
      )}
    </motion.div>
  )
}
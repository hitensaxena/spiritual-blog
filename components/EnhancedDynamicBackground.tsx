import { useEffect, useState, useRef } from 'react'
import { MeshGradientLayer } from './background/MeshGradientLayer'
import { NebulaLayer } from './background/NebulaLayer'
import { EnergyWaveLayer } from './background/EnergyWaveLayer'
import { StarFieldLayer } from './background/StarFieldLayer'
import { ParticleSystemLayer } from './background/ParticleSystemLayer'

interface EnhancedDynamicBackgroundProps {
  variant?: 'cosmic' | 'philosophical' | 'transcendent'
  intensity?: 'low' | 'medium' | 'high'
  className?: string
}

export function EnhancedDynamicBackground({ 
  variant = 'cosmic', 
  intensity = 'medium',
  className = ''
}: EnhancedDynamicBackgroundProps) {
  const [isClient, setIsClient] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const observerRef = useRef<IntersectionObserver>()
  const containerRef = useRef<HTMLDivElement>(null)

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
    if (!isClient || !containerRef.current) return

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { 
        threshold: 0,
        rootMargin: '100px'
      }
    )

    observerRef.current.observe(containerRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [isClient])

  if (!isClient) {
    // Fallback static background for SSR
    return (
      <div 
        ref={containerRef}
        className={`absolute inset-0 ${className}`}
        style={{
          background: 'radial-gradient(circle at 30% 70%, #3b82f620 0%, transparent 50%), radial-gradient(circle at 70% 30%, #a855f720 0%, transparent 50%)',
          opacity: 0.3
        }}
      />
    )
  }

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ 
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        willChange: 'contents'
      }}
    >
      {/* Base depth gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, #000000 100%)',
          opacity: 0.6,
          zIndex: 0
        }}
      />

      {/* Multiple mesh gradient layers for depth */}
      {[0, 1, 2].map(layer => (
        <MeshGradientLayer
          key={`mesh-${layer}`}
          variant={variant}
          layer={layer}
          isVisible={isVisible}
        />
      ))}

      {/* Star field - deepest layer */}
      <StarFieldLayer
        variant={variant}
        isVisible={isVisible}
        isMobile={isMobile}
        isReducedMotion={isReducedMotion}
      />

      {/* Energy waves - mid layer */}
      <EnergyWaveLayer
        variant={variant}
        isVisible={isVisible}
        isMobile={isMobile}
      />

      {/* Enhanced particle system - active layer */}
      <ParticleSystemLayer
        variant={variant}
        intensity={intensity}
        isVisible={isVisible}
        isMobile={isMobile}
        isReducedMotion={isReducedMotion}
      />

      {/* Nebula clouds - atmospheric layer */}
      <NebulaLayer
        variant={variant}
        isVisible={isVisible}
        isMobile={isMobile}
      />

      {/* Glassmorphism reflection layer */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.03) 0%, transparent 60%)
          `,
          zIndex: 10,
          mixBlendMode: 'overlay'
        }}
      />
    </div>
  )
}
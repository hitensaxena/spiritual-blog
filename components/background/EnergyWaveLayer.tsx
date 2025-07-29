import { motion } from 'motion/react'
import { useMemo, useState, useEffect } from 'react'

interface EnergyWaveLayerProps {
  variant?: 'cosmic' | 'philosophical' | 'transcendent'
  isVisible: boolean
  isMobile: boolean
}

const waveConfigs = {
  cosmic: {
    waves: [
      { amplitude: 50, frequency: 0.02, phase: 0, color: '#3b82f6', opacity: 0.1 },
      { amplitude: 30, frequency: 0.03, phase: Math.PI, color: '#a855f7', opacity: 0.08 },
      { amplitude: 40, frequency: 0.025, phase: Math.PI / 2, color: '#22d3ee', opacity: 0.12 }
    ]
  },
  philosophical: {
    waves: [
      { amplitude: 45, frequency: 0.025, phase: 0, color: '#818cf8', opacity: 0.1 },
      { amplitude: 35, frequency: 0.035, phase: Math.PI, color: '#a855f7', opacity: 0.09 }
    ]
  },
  transcendent: {
    waves: [
      { amplitude: 55, frequency: 0.02, phase: 0, color: '#22d3ee', opacity: 0.11 },
      { amplitude: 25, frequency: 0.04, phase: Math.PI / 3, color: '#0ea5e9', opacity: 0.08 }
    ]
  }
}

export function EnergyWaveLayer({ variant = 'cosmic', isVisible, isMobile }: EnergyWaveLayerProps) {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  const [isClient, setIsClient] = useState(false)
  
  const config = waveConfigs[variant]
  
  useEffect(() => {
    setIsClient(true)
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
      
      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight })
      }
      
      window.addEventListener('resize', handleResize, { passive: true })
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  const createWavePath = (wave: typeof config.waves[0], width: number, height: number, time: number) => {
    const points = []
    const steps = isMobile ? 30 : 50
    
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * width
      const y = height / 2 + Math.sin(x * wave.frequency + time + wave.phase) * wave.amplitude
      points.push(`${x},${y}`)
    }
    
    return `M 0,${height} L ${points.join(' L ')} L ${width},${height} Z`
  }

  if (!isClient) {
    return null
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -3 }}>
      <svg width="100%" height="100%" className="absolute inset-0">
        {config.waves.map((wave, index) => (
          <motion.path
            key={`wave-${index}`}
            fill={`${wave.color}${Math.floor(wave.opacity * 255).toString(16)}`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible && isClient ? {
              pathLength: 1,
              opacity: 1,
              d: [
                createWavePath(wave, dimensions.width, dimensions.height, 0),
                createWavePath(wave, dimensions.width, dimensions.height, Math.PI * 2),
                createWavePath(wave, dimensions.width, dimensions.height, Math.PI * 4)
              ]
            } : {
              pathLength: 0,
              opacity: 0
            }}
            transition={{
              pathLength: { duration: 2, delay: index * 0.5 },
              opacity: { duration: 1, delay: index * 0.5 },
              d: {
                duration: 20 + index * 3,
                repeat: Infinity,
                ease: 'linear'
              }
            }}
            style={{
              filter: 'blur(2px)',
              mixBlendMode: 'screen'
            }}
          />
        ))}
      </svg>
    </div>
  )
}
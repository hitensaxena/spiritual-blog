import { motion } from 'motion/react'
import { useMemo } from 'react'

interface NebulaLayerProps {
  variant?: 'cosmic' | 'philosophical' | 'transcendent'
  isVisible: boolean
  isMobile: boolean
}

const nebulaConfigs = {
  cosmic: {
    nebulae: [
      { x: 15, y: 25, size: 400, color: '#3b82f6', opacity: 0.15 },
      { x: 70, y: 60, size: 350, color: '#a855f7', opacity: 0.12 },
      { x: 40, y: 80, size: 300, color: '#22d3ee', opacity: 0.18 }
    ]
  },
  philosophical: {
    nebulae: [
      { x: 30, y: 40, size: 350, color: '#818cf8', opacity: 0.14 },
      { x: 65, y: 20, size: 280, color: '#a855f7', opacity: 0.16 }
    ]
  },
  transcendent: {
    nebulae: [
      { x: 50, y: 30, size: 320, color: '#22d3ee', opacity: 0.13 },
      { x: 25, y: 70, size: 380, color: '#0ea5e9', opacity: 0.15 }
    ]
  }
}

export function NebulaLayer({ variant = 'cosmic', isVisible, isMobile }: NebulaLayerProps) {
  const config = nebulaConfigs[variant]
  
  const nebulaElements = useMemo(() => 
    config.nebulae.map((nebula, index) => ({
      ...nebula,
      size: isMobile ? nebula.size * 0.7 : nebula.size,
      id: `nebula-${index}`
    })), [config, isMobile]
  )

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -5 }}>
      {nebulaElements.map((nebula, index) => (
        <motion.div
          key={nebula.id}
          className="absolute rounded-full"
          style={{
            left: `${nebula.x}%`,
            top: `${nebula.y}%`,
            width: `${nebula.size}px`,
            height: `${nebula.size}px`,
            background: `radial-gradient(circle, ${nebula.color}${Math.floor(nebula.opacity * 255).toString(16)} 0%, ${nebula.color}20 30%, transparent 70%)`,
            filter: 'blur(40px)',
            transform: 'translate(-50%, -50%)',
            willChange: 'transform, opacity'
          }}
          initial={{ 
            opacity: 0,
            scale: 0.8,
            rotate: 0
          }}
          animate={isVisible ? {
            opacity: [0, 1, 0.7, 1],
            scale: [0.8, 1.2, 1, 1.1],
            rotate: [0, 180, 360],
            x: [0, Math.sin(index * 45) * 20, 0],
            y: [0, Math.cos(index * 45) * 15, 0]
          } : {
            opacity: 0,
            scale: 0.8
          }}
          transition={{
            duration: 30 + index * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 2
          }}
        />
      ))}
    </div>
  )
}
import { motion } from 'motion/react'
import { useMemo } from 'react'

interface MeshGradientLayerProps {
  variant?: 'cosmic' | 'philosophical' | 'transcendent'
  layer: number
  isVisible: boolean
}

const gradientConfigs = {
  cosmic: {
    colors: ['#3b82f6', '#a855f7', '#22d3ee', '#8b5cf6', '#0ea5e9'],
    meshPoints: [
      { x: 20, y: 30, color: '#3b82f6' },
      { x: 80, y: 20, color: '#a855f7' },
      { x: 40, y: 70, color: '#22d3ee' },
      { x: 70, y: 80, color: '#8b5cf6' },
      { x: 10, y: 60, color: '#0ea5e9' }
    ]
  },
  philosophical: {
    colors: ['#818cf8', '#a855f7', '#c084fc', '#7c3aed'],
    meshPoints: [
      { x: 30, y: 40, color: '#818cf8' },
      { x: 70, y: 30, color: '#a855f7' },
      { x: 50, y: 70, color: '#c084fc' },
      { x: 20, y: 80, color: '#7c3aed' }
    ]
  },
  transcendent: {
    colors: ['#22d3ee', '#0ea5e9', '#06b6d4', '#0891b2'],
    meshPoints: [
      { x: 40, y: 20, color: '#22d3ee' },
      { x: 60, y: 80, color: '#0ea5e9' },
      { x: 80, y: 40, color: '#06b6d4' },
      { x: 20, y: 70, color: '#0891b2' }
    ]
  }
}

export function MeshGradientLayer({ variant = 'cosmic', layer, isVisible }: MeshGradientLayerProps) {
  const config = gradientConfigs[variant]
  
  const meshGradient = useMemo(() => {
    const points = config.meshPoints
    return points.map((point, index) => 
      `radial-gradient(ellipse ${800 + layer * 200}px ${600 + layer * 150}px at ${point.x}% ${point.y}%, ${point.color}${Math.floor(40 - layer * 8).toString(16)} 0%, transparent 50%)`
    ).join(', ')
  }, [config, layer])

  const animationDelay = layer * 0.5
  const animationDuration = 25 + layer * 5

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={isVisible ? { 
        opacity: 1
      } : { opacity: 0 }}
      transition={{
        opacity: { duration: 1, delay: animationDelay }
      }}
      style={{
        background: meshGradient,
        zIndex: -1 - layer,
        willChange: 'transform, opacity',
        animation: isVisible ? `meshFlow ${animationDuration}s linear infinite ${animationDelay}s` : 'none'
      }}
    />
  )
}
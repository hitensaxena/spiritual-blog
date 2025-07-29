import React, { useEffect } from 'react'
import { motion } from 'motion/react'
import { HeroSection } from './components/HeroSection'
import { WorkingAwakeningSection } from './components/WorkingAwakeningSection'
import { BlogPreviewSection } from './components/BlogPreviewSection'
import { SimpleVisualSection } from './components/SimpleVisualSection'
import { FooterSection } from './components/FooterSection'
import { SimplifiedSpaceBackground } from './components/SimplifiedSpaceBackground'

export default function App() {
  useEffect(() => {
    // Add smooth scroll behavior to the document
    document.documentElement.style.scrollBehavior = 'smooth'
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <main className="relative text-[#f4f4f5] min-h-screen overflow-x-hidden">
      {/* Fixed space background that stays in place */}
      <SimplifiedSpaceBackground />
      
      {/* Scrollable content container that moves over the background */}
      <div className="relative z-10 w-full">
        {/* Each section will scroll naturally over the fixed background */}
        <HeroSection />
        <WorkingAwakeningSection />
        <BlogPreviewSection />
        <SimpleVisualSection />
        <FooterSection />
      </div>
    </main>
  )
}
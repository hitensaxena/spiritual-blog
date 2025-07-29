import React from 'react'

// Simple test component to verify basic functionality
export function DebugTest() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f4f4f5] p-8">
      <h1 className="text-4xl mb-4">Debug Test</h1>
      <p className="text-xl mb-4">This is a simple test component.</p>
      <div className="bg-blue-500/20 p-4 rounded">
        <p>If you can see this, basic rendering is working.</p>
      </div>
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
        onClick={() => alert('Button clicked!')}
      >
        Test Click
      </button>
    </div>
  )
}
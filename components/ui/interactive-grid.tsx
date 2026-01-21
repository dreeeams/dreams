'use client';

import { m } from 'framer-motion';
import { useState, useEffect } from 'react';

export function InteractiveGrid() {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const gridSize = 20;
  const cells = Array.from({ length: gridSize * gridSize }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
      <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
        {cells.map((cell) => {
          const row = Math.floor(cell / gridSize);
          const col = cell % gridSize;
          const cellX = (col / gridSize) * window.innerWidth;
          const cellY = (row / gridSize) * window.innerHeight;

          const distance = Math.sqrt(
            Math.pow(mousePosition.x - cellX, 2) +
            Math.pow(mousePosition.y - cellY, 2)
          );

          const maxDistance = 300;
          const opacity = Math.max(0, 1 - distance / maxDistance);

          return (
            <m.div
              key={cell}
              className="border border-brand"
              animate={{
                backgroundColor: `rgba(120, 120, 120, ${opacity * 0.2})`,
                scale: hoveredCell === cell ? 1.5 : 1,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
              onMouseEnter={() => setHoveredCell(cell)}
              onMouseLeave={() => setHoveredCell(null)}
            />
          );
        })}
      </div>
    </div>
  );
}

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Animated gradient orbs */}
      <m.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/5 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <m.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <m.div
        className="absolute top-1/2 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}

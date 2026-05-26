import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 350 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }

    const onEnter = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.matches('a, button, [role="button"]')) {
        if (cursorRef.current) {
          cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1.8)'
          cursorRef.current.style.borderColor = '#a855f7'
          cursorRef.current.style.boxShadow = '0 0 25px rgba(168,85,247,0.6)'
        }
      }
    }

    const onLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
        cursorRef.current.style.borderColor = '#00d4ff'
        cursorRef.current.style.boxShadow = '0 0 15px rgba(0,212,255,0.4)'
      }
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [mouseX, mouseY, dotX, dotY])

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9998] rounded-full"
        style={{
          x,
          y,
          width: 28,
          height: 28,
          translateX: '-50%',
          translateY: '-50%',
          border: '1px solid #00d4ff',
          boxShadow: '0 0 15px rgba(0,212,255,0.4)',
          transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
        }}
      />
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          width: 5,
          height: 5,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: '#00d4ff',
          boxShadow: '0 0 10px rgba(0,212,255,1)',
        }}
      />
    </>
  )
}

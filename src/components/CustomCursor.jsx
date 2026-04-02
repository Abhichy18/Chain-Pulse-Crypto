import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    setIsVisible(true);
    let ctx = gsap.context(() => {});
    
    // Quick setters for performance
    const xSetDot = gsap.quickSetter(dotRef.current, "x", "px");
    const ySetDot = gsap.quickSetter(dotRef.current, "y", "px");
    
    const onMouseMove = (e) => {
      // Direct update for dot
      if (dotRef.current) {
        xSetDot(e.clientX);
        ySetDot(e.clientY);
      }
      
      // Lerp follow for ring
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: 'power3.out'
        });
      }
    };

    const handleHover = (e) => {
      if (!ringRef.current || !dotRef.current) return;
      const target = e.target;
      const isClickable = target.closest('button, a, input, select, .magnetic');
      const isText = target.closest('h1, h2, h3, p, span:not(.magnetic)');

      if (isClickable) {
        gsap.to(ringRef.current, { scale: 1.8, opacity: 0.1, duration: 0.3 });
        gsap.to(dotRef.current, { scale: 0.5, duration: 0.3 });
      } else if (isText) {
        gsap.to(ringRef.current, { scale: 0.3, opacity: 0.5, duration: 0.3 });
      } else {
        gsap.to(ringRef.current, { scale: 1, opacity: 0.3, backgroundColor: 'transparent', duration: 0.3 });
        gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
      }
    };

    const handleMouseDown = () => {
      if (dotRef.current) gsap.to(dotRef.current, { scale: 0.6, duration: 0.1 });
    };

    const handleMouseUp = () => {
      if (dotRef.current) gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      ctx.revert();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-acid rounded-full pointer-events-none z-[10000] opacity-30 origin-center -translate-x-1/2 -translate-y-1/2 will-change-transform mix-blend-exclusion"
      />
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-acid rounded-full pointer-events-none z-[10001] origin-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />
    </>
  );
}

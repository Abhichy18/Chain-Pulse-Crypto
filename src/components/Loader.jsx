import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if(onComplete) onComplete();
        }
      });
      
      const chars = textRef.current.querySelectorAll('.char');
      
      tl.from(chars, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out'
      })
      .to({}, { duration: 0.3 }) // brief hold
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut'
      });
    }, loaderRef);
    return () => ctx.revert();
  }, [onComplete]);

  const brand = "CHAINPULSE";
  
  return (
    <div ref={loaderRef} className="fixed inset-0 z-[2000] bg-void flex items-center justify-center font-display text-4xl md:text-6xl font-bold tracking-[0.15em] text-acid">
      <div ref={textRef} className="flex overflow-hidden pb-4">
        {brand.split('').map((char, i) => (
          <span key={i} className="char inline-block will-change-transform">{char}</span>
        ))}
      </div>
    </div>
  );
}

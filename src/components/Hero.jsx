import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import NetworkParticles from './NetworkParticles';
import MagneticButton from './MagneticButton';

export default function Hero({ loaded, onConnect }) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!loaded) return;
    
    // Add matchMedia check for prefers-reduced-motion to avoid animating if user prefers static
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let ctx = gsap.context(() => {
      const elements = containerRef.current.querySelectorAll('.hero-anim');
      
      if (prefersReducedMotion) {
        gsap.set(elements, { opacity: 1, y: 0 });
        gsap.set('.hero-canvas', { opacity: 1 });
      } else {
        gsap.fromTo(elements, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.12, 
            duration: 1, 
            ease: 'power3.out',
            delay: 0.1
          }
        );
        
        gsap.fromTo('.hero-canvas',
          { opacity: 0 },
          { opacity: 1, duration: 1.5, delay: 0.4, ease: 'power2.inOut' }
        );
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, [loaded]);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full flex items-end pb-16 md:pb-24 pl-6 md:pl-16 mt-[-8rem]">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none hero-canvas opacity-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]}>
          <NetworkParticles count={1500} />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-transparent z-10 w-1/2" />
      </div>
      
      <div className="relative z-10 max-w-4xl text-left pointer-events-auto">
        <div className="hero-anim text-electric font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-6 flex items-center space-x-3 opacity-0">
          <span className="w-2 h-2 bg-electric rounded-full animate-pulse shadow-[0_0_10px_#00FF87]" />
          <span>System Online • 0ms Latency</span>
        </div>
        
        <h1 className="hero-anim text-[clamp(2.5rem,6vw,6rem)] leading-[1.1] font-display font-extrabold text-white mb-2 opacity-0 tracking-tight">
          CHAIN<span className="text-acid">PULSE</span>
        </h1>
        
        <h2 className="hero-anim text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.95] font-drama italic text-gradient mb-8 opacity-0">
          Omniscience over your portfolio.
        </h2>
        
        <p className="hero-anim text-lg md:text-xl text-offwhite/70 max-w-[500px] font-sans mb-12 opacity-0 leading-relaxed">
          Track every wallet across every chain simultaneously. Real-time PnL, gas fee breakdowns, and market signals powered by on-chain data.
        </p>
        
        <div className="hero-anim opacity-0">
          <MagneticButton 
            onClick={onConnect}
            className="bg-electric text-void font-bold text-base md:text-lg px-8 py-4 rounded-full hover:bg-electric/90 transition-all shadow-[0_0_30px_rgba(0,255,135,0.2)] hover:shadow-[0_0_50px_rgba(0,255,135,0.4)] truncate"
          >
            Connect your wallet
          </MagneticButton>
          <span className="block mt-4 text-offwhite/40 font-mono text-xs pl-4">{"//"} live in 60 seconds</span>
        </div>
      </div>
    </section>
  );
}

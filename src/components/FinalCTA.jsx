import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA({ onConnect }) {
  const ctaRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 80%',
        },
        scale: 0.95,
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, ctaRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={ctaRef} className="py-24 px-6 md:px-16 w-full flex justify-center mt-12 mb-12">
        <div className="cta-content w-full max-w-5xl rounded-[3rem] bg-brand-gradient p-12 md:p-24 text-center relative overflow-hidden shadow-[0_0_80px_rgba(0,255,135,0.15)] flex flex-col items-center justify-center min-h-[450px]">
          {/* Subtle bg pattern */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(8,10,6,0.6)_1px,transparent_1px)] bg-[size:24px_24px] mix-blend-multiply" />
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-drama italic text-void mb-8 tracking-tight font-bold">
              Stop guessing. Start executing.
            </h2>
            <p className="font-sans text-void/80 text-lg md:text-xl font-medium mb-12 max-w-lg">
              Connect your wallet and gain omniscience over your portfolio in 60 seconds.
            </p>
            
            <MagneticButton 
              onClick={onConnect}
              className="bg-void text-electric font-bold text-lg px-10 py-5 rounded-full hover:bg-[#0A0D08] hover:scale-[1.02] transition-transform shadow-2xl flex items-center space-x-3"
            >
              <span className="w-2 h-2 bg-electric rounded-full animate-pulse" />
              <span>Go Live Now</span>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#070905] rounded-t-[3.5rem] pt-24 pb-8 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-12 lg:space-y-0 mb-16">
          <div className="flex flex-col space-y-4">
            <div className="font-display font-extrabold text-2xl tracking-tight text-white flex items-center space-x-1 cursor-none pointer-events-auto">
              <span>CHAIN</span><span className="text-acid">PULSE</span>
            </div>
            <p className="text-offwhite/40 font-mono text-xs w-56 leading-relaxed">
              Precision market telemetry for the synchronized trader.
            </p>
          </div>

          <div className="flex space-x-16 lg:space-x-32">
            <div className="flex flex-col space-y-5">
              <span className="text-white/80 font-mono text-[10px] tracking-widest uppercase">Platform</span>
              <a href="#features" className="text-offwhite/50 hover:text-acid font-sans text-sm transition-colors magnetic inline-block origin-left w-fit cursor-none">Features</a>
              <a href="#pricing" className="text-offwhite/50 hover:text-acid font-sans text-sm transition-colors magnetic inline-block origin-left w-fit cursor-none">Pricing</a>
              <a href="#changelog" className="text-offwhite/50 hover:text-acid font-sans text-sm transition-colors magnetic inline-block origin-left w-fit cursor-none">Changelog</a>
            </div>
            <div className="flex flex-col space-y-5">
              <span className="text-white/80 font-mono text-[10px] tracking-widest uppercase">Company</span>
              <a href="#philosophy" className="text-offwhite/50 hover:text-acid font-sans text-sm transition-colors magnetic inline-block origin-left w-fit cursor-none">Manifesto</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-offwhite/30 text-xs font-sans">
            © {new Date().getFullYear()} ChainPulse. Built for the grid.
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4 px-4">
              <a 
                href="https://github.com/Abhichy18" 
                target="_blank" 
                rel="noopener noreferrer"
                title="GitHub"
                className="text-offwhite/50 hover:text-acid transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_#00FF87] p-2 magnetic cursor-none"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/abhishek-choudhary18/" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Connect on LinkedIn"
                className="text-offwhite/50 hover:text-acid transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_#00FF87] p-2 magnetic cursor-none"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>

            <div className="flex items-center space-x-3 bg-void/50 px-4 py-2 rounded-full border border-white/5 shadow-inner">
              <span className="w-2 h-2 bg-electric rounded-full animate-pulse shadow-[0_0_8px_#00FF87]" />
              <span className="text-electric font-mono text-[10px] tracking-widest uppercase">System Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

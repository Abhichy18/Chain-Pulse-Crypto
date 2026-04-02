import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophyAndStats() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const countersRef = useRef([]);
  countersRef.current = [];

  const addToRefs = (el) => {
    if (el && !countersRef.current.includes(el)) {
      countersRef.current.push(el);
    }
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const words = textRef.current.querySelectorAll('.word');
      
      gsap.from(words, {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 20,
        stagger: 0.04,
        duration: 0.8,
        ease: 'power3.out'
      });

      countersRef.current.forEach((counter) => {
        const targetValue = parseInt(counter.getAttribute('data-value'), 10);
        
        gsap.fromTo(counter, 
          { innerHTML: 0 },
          {
            innerHTML: targetValue,
            duration: 2,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            scrollTrigger: {
              trigger: counter.parentNode,
              start: 'top 85%',
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const philosophyText = "Most trackers show you the history. We focus on: ".split(' ');

  return (
    <section ref={containerRef} id="philosophy" className="w-full relative bg-void pb-32 mt-12">
      <div className="py-24 px-6 md:px-16 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[50vh] text-center relative z-10">
        <h2 ref={textRef} className="text-3xl md:text-5xl lg:text-6xl font-display font-medium text-offwhite/60 leading-tight">
          {philosophyText.map((word, i) => (
            <span key={i} className="word inline-block mr-3 md:mr-4 will-change-transform">{word}</span>
          ))}
          <br className="hidden lg:block"/>
          <span className="word inline-block font-drama italic text-[1.25em] text-white tracking-widest mt-4 lg:mt-2">
            the <span className="text-gradient drop-shadow-[0_0_15px_rgba(200,244,0,0.3)]">next block.</span>
          </span>
        </h2>
      </div>

      <div className="px-6 md:px-16 max-w-6xl mx-auto relative z-10 mt-8">
        <div className="bg-[#0A0D08] border border-[#161C12] rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-around gap-12 md:gap-8 shadow-2xl relative overflow-hidden">
          
          {/* Subtle noise inside stats box */}
          <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] pointer-events-none" />

          <div className="text-center relative z-10">
            <div className="text-5xl md:text-7xl font-display font-bold text-white mb-2 flex justify-center tracking-tighter">
              $<span ref={addToRefs} data-value="2">0</span>.4B+
            </div>
            <div className="text-acid font-mono text-xs md:text-sm uppercase tracking-widest opacity-80">Daily Vol Tracked</div>
          </div>

          <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent relative z-10" />

          <div className="text-center relative z-10">
            <div className="text-5xl md:text-7xl font-display font-bold text-white mb-2 flex justify-center tracking-tighter">
              <span className="text-electric mr-1">&lt;</span><span ref={addToRefs} data-value="40">100</span><span className="text-3xl mt-4 ml-1">ms</span>
            </div>
            <div className="text-acid font-mono text-xs md:text-sm uppercase tracking-widest opacity-80">Execution Latency</div>
          </div>

          <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent relative z-10" />

          <div className="text-center relative z-10">
            <div className="text-5xl md:text-7xl font-display font-bold text-white mb-2 flex justify-center tracking-tighter">
              <span ref={addToRefs} data-value="12">0</span>
            </div>
            <div className="text-acid font-mono text-xs md:text-sm uppercase tracking-widest opacity-80">Networks Supported</div>
          </div>

        </div>
      </div>
    </section>
  );
}

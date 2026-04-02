import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Line animation scrubs with scroll
      gsap.fromTo(pathRef.current, 
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1
          }
        }
      );

      // Cards fade up
      gsap.from('.step-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    { num: '01', title: 'CONNECT', desc: 'Securely link wallets via strict read-only APIs or non-custodial Web3 connections.' },
    { num: '02', title: 'ANALYZE', desc: 'Our engine parses unconfirmed mempool blocks to synthesize your live exposure.' },
    { num: '03', title: 'EXECUTE', desc: 'Receive instant signals and execute cross-chain without leaving the terminal.' }
  ];

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 md:px-16 w-full max-w-6xl mx-auto relative overflow-hidden">
      <div className="absolute top-[35%] left-[5%] w-[90%] hidden md:block z-0 pointer-events-none">
        <svg className="w-full h-24" preserveAspectRatio="none" viewBox="0 0 100 10">
          <path 
            ref={pathRef}
            d="M0 5 L100 5" 
            fill="none" 
            stroke="#C8F400" 
            strokeWidth="0.2" 
            strokeDasharray="2" 
            strokeDashoffset="100"
            className="opacity-40"
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative z-10">
        {steps.map((step, i) => (
          <div key={i} className="step-card flex flex-col space-y-4 bg-void">
            <div className="text-acid font-mono text-5xl md:text-7xl font-bold opacity-20 bg-void inline-block">
              {step.num}
            </div>
            <h3 className="font-display font-bold text-xl tracking-wider text-white uppercase mt-4">
              {step.title}
            </h3>
            <p className="font-sans text-offwhite/60 text-base leading-relaxed max-w-[280px]">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

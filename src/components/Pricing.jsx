import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Pricing({ onConnect }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.pricing-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const tiers = [
    {
      name: "Terminal",
      price: "$29",
      period: "/month",
      desc: "For the active degenerate.",
      features: [
        "Up to 5 wallets tracked",
        "15-minute PnL updates",
        "Basic entry/exit signals",
        "Ethereum + Solana support"
      ],
      featured: false
    },
    {
      name: "Professional",
      price: "$149",
      period: "/month",
      desc: "For the systematic trader.",
      features: [
        "Unlimited wallets tracked",
        "Sub-second PnL updates",
        "Advanced predictive mechanics",
        "All 12 networks supported",
        "Smart contract audit scans"
      ],
      featured: true
    },
    {
      name: "Institutional",
      price: "Custom",
      period: "",
      desc: "For funds and prop desks.",
      features: [
        "Dedicated RPC nodes",
        "API access to raw telemetry",
        "Custom signal definitions",
        "Sub-account delegation",
        "White-glove onboarding"
      ],
      featured: false
    }
  ];

  return (
    <section id="pricing" ref={containerRef} className="py-24 md:py-32 px-6 md:px-16 w-full max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-[3.5rem] font-drama italic text-white mb-6">
          Access the <span className="text-gradient">Engine</span>.
        </h2>
        <p className="font-sans text-offwhite/60 text-lg">No bloat. Only edge. Select your bandwidth.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center lg:px-8">
        {tiers.map((tier, i) => (
          <div 
            key={i} 
            className={`pricing-card rounded-[2.5rem] p-10 flex flex-col ${
              tier.featured 
                ? 'bg-[#0D110C] border-2 border-acid/50 shadow-[0_0_50px_rgba(200,244,0,0.06)] transform lg:scale-105 z-10' 
                : 'bg-void border border-white/10 opacity-90'
            }`}
          >
            {tier.featured && (
              <div className="text-void bg-acid font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full self-start mb-8">
                Most Deployed
              </div>
            )}
            {!tier.featured && <div className="h-[28px] mb-8" />} {/* Spacer to align headings */}
            
            <h3 className={`font-display font-bold text-2xl ${tier.featured ? 'text-white' : 'text-offwhite/80'} mb-2`}>
              {tier.name}
            </h3>
            <p className="font-sans text-offwhite/50 text-sm mb-8">{tier.desc}</p>
            
            <div className="flex items-baseline space-x-1 mb-10">
              <span className="text-5xl font-display font-extrabold text-white">{tier.price}</span>
              <span className="text-offwhite/40 font-mono text-xs">{tier.period}</span>
            </div>

            <div className="flex-1">
              <ul className="space-y-5 mb-12">
                {tier.features.map((feat, j) => (
                  <li key={j} className="flex items-start space-x-3 text-offwhite/70 font-sans text-sm">
                    <Check size={18} className="text-electric shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <MagneticButton 
              onClick={onConnect}
              className={`w-full py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 ${
                tier.featured 
                  ? 'bg-acid text-void hover:bg-electric shadow-[0_0_20px_rgba(200,244,0,0.2)]' 
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
              }`}
            >
              Initialize {tier.name}
            </MagneticButton>
          </div>
        ))}
      </div>
    </section>
  );
}

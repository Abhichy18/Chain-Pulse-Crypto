import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Shuffler = () => {
  const [index, setIndex] = useState(0);
  const items = [
    { label: "WALLET: 0x8a...9c", chain: "ETHEREUM", status: "SYNCED" },
    { label: "WALLET: Hr3...z9", chain: "SOLANA", status: "SYNCED" },
    { label: "WALLET: 0x4f...bb", chain: "BASE", status: "SYNCED" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-40 md:h-48 overflow-hidden relative flex flex-col justify-center perspective-[800px]">
      <div className="relative w-full h-16">
        {items.map((item, i) => {
          const isActive = i === index;
          const isPrev = i === (index - 1 + items.length) % items.length;
          
          let yTransform = 'translateY(100%)';
          let rotation = 'rotateX(-20deg)';
          let opacity = 'opacity-0';
          
          if (isActive) {
            yTransform = 'translateY(0)';
            rotation = 'rotateX(0)';
            opacity = 'opacity-100';
          } else if (isPrev) {
            yTransform = 'translateY(-100%)';
            rotation = 'rotateX(20deg)';
            opacity = 'opacity-0';
          }
          
          return (
            <div 
              key={i} 
              className={`absolute top-0 w-full p-4 border border-white/10 bg-void/50 rounded-lg flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${opacity}`}
              style={{ transform: `${yTransform} ${rotation}`, transformOrigin: 'center center' }}
            >
              <div className="flex flex-col space-y-1">
                <span className="text-acid font-mono text-xs uppercase">{item.label}</span>
                <span className="text-offwhite/60 font-sans text-[10px]">NETWORK: {item.chain}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-electric rounded-full animate-pulse shadow-[0_0_8px_#00FF87]" />
                <span className="text-electric font-mono text-[10px]">{item.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Typewriter = () => {
  const [text, setText] = useState('');
  const [msgIndex, setMsgIndex] = useState(0);
  const messages = [
    "> SCANNING ON-CHAIN...",
    "[SIGNAL] ETH ENTRY OK @ $3450",
    "GAS: 14 GWEI. OPTIMAL.",
    "PNL: +4.2% (1h)"
  ];

  useEffect(() => {
    let currentMsg = messages[msgIndex];
    let i = 0;
    
    setText('!#&*@^%');
    let typeInterval;
    
    const timeout = setTimeout(() => {
      setText('');
      typeInterval = setInterval(() => {
        setText(prev => currentMsg.slice(0, i + 1));
        i++;
        if (i >= currentMsg.length) {
          clearInterval(typeInterval);
          setTimeout(() => {
            setMsgIndex(prev => (prev + 1) % messages.length);
          }, 3000);
        }
      }, 40);
    }, 400);

    return () => {
      clearTimeout(timeout);
      clearInterval(typeInterval);
    };
  }, [msgIndex]);

  return (
    <div className="h-40 md:h-48 rounded-lg bg-[#050704] border border-acid/10 p-4 font-mono text-xs md:text-sm flex flex-col justify-end">
      <div className="text-acid/80 drop-shadow-[0_0_8px_rgba(200,244,0,0.4)]">
        {text}<span className="inline-block w-2 bg-acid/80 ml-1 pb-1 animate-pulse" />
      </div>
    </div>
  );
};

const Graph = () => {
  const pathRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pathRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(pathRef.current,
            { strokeDashoffset: 100 },
            { strokeDashoffset: 0, duration: 2, ease: "power2.out" }
          );
        }
      });
    }, pathRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="h-40 md:h-48 rounded-lg relative flex items-end pb-4 pt-8">
      <div className="absolute top-2 right-2 text-electric font-mono text-[10px] md:text-xs tracking-widest opacity-60">WHALE IDX</div>
      <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
        <path 
          ref={pathRef}
          d="M0 45 L15 40 L25 42 L35 25 L50 30 L65 10 L80 15 L100 5"
          fill="none"
          stroke="#00FF87"
          strokeWidth="1.5"
          strokeDasharray="100"
          strokeDashoffset="100"
          className="drop-shadow-[0_0_5px_rgba(0,255,135,0.8)]"
        />
        <circle cx="65" cy="10" r="1.5" fill="#C8F400" className="animate-pulse drop-shadow-[0_0_5px_rgba(200,244,0,1)]" />
        <circle cx="100" cy="5" r="1.5" fill="#C8F400" className="animate-pulse drop-shadow-[0_0_5px_rgba(200,244,0,1)]" />
      </svg>
    </div>
  );
};

export default function Features() {
  const sectionRef = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-[4rem] leading-[1] font-drama italic text-white mb-20 text-center">
        The complete arsenal for <br className="hidden md:block"/>
        <span className="text-gradient">precision trading</span>.
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="feature-card glass-panel rounded-[2rem] p-8 shadow-xl flex flex-col justify-between">
          <div className="mb-8">
            <h3 className="font-display font-bold text-xl text-white mb-3">Omni-Chain Aggregation</h3>
            <p className="text-offwhite/60 text-sm font-sans">
              Track every wallet across Ethereum, Solana, Base, and Arbitrum in one unified live feed.
            </p>
          </div>
          <Shuffler />
        </div>

        <div className="feature-card glass-panel rounded-[2rem] p-8 shadow-xl flex flex-col justify-between">
          <div className="mb-8">
            <h3 className="font-display font-bold text-xl text-white mb-3">Instant Telemetry</h3>
            <p className="text-offwhite/60 text-sm font-sans">
              Real-time PnL, gas fee breakdowns, and entry/exit signals analyzed via raw on-chain nodes.
            </p>
          </div>
          <Typewriter />
        </div>

        <div className="feature-card glass-panel rounded-[2rem] p-8 shadow-xl flex flex-col justify-between">
          <div className="mb-8">
            <h3 className="font-display font-bold text-xl text-white mb-3">Predictive Alerts</h3>
            <p className="text-offwhite/60 text-sm font-sans">
              Smart alerts for whale movements, price thresholds, and liquidation risks before they hit.
            </p>
          </div>
          <Graph />
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Activity, Zap, Shield, Globe2, Layers, Cpu, Server, Lock } from 'lucide-react';

const stats = [
  { icon: Activity, label: "2.4B+ Volume Tracked" },
  { icon: Globe2, label: "12 Networks Supported" },
  { icon: Zap, label: "0ms Execution Latency" },
  { icon: Shield, label: "Bank-Grade Encryption" },
  { icon: Layers, label: "Real-Time PnL" },
  { icon: Cpu, label: "Smart Contract Audits" },
  { icon: Server, label: "99.999% Uptime" },
  { icon: Lock, label: "Non-Custodial Architecture" },
];

const networks = ["ETHEREUM", "SOLANA", "BASE", "ARBITRUM", "OPTIMISM", "POLYGON", "AVALANCHE", "BINANCE"];

export default function SocialProofBar() {
  const StatGroup = () => (
    <div className="flex items-center whitespace-nowrap min-w-max space-x-12 px-6">
      {stats.map((stat, i) => (
        <div key={i} className="flex items-center space-x-3 text-offwhite/50 text-sm font-mono uppercase tracking-wider">
          <stat.icon size={16} className="text-acid/70" />
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );

  const NetworkGroup = () => (
    <div className="flex items-center whitespace-nowrap min-w-max space-x-16 px-8">
      {networks.map((network, i) => (
        <div key={i} className="flex items-center space-x-3 text-white/80 font-display font-bold text-xl md:text-2xl tracking-widest">
          <div className="w-2 h-2 rounded-full bg-electric opacity-50 shadow-[0_0_10px_#00FF87]" />
          <span>{network}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative w-full py-16 md:py-24 bg-void border-y border-white/5 overflow-hidden flex flex-col space-y-12 md:space-y-16">
      {/* Gradient Masks */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />
      
      {/* Top Row: Networks */}
      <div className="relative flex w-[200%] md:w-[150%] xl:w-max animate-scroll-left hover:[animation-play-state:paused] transition-all">
        <NetworkGroup />
        <NetworkGroup />
      </div>
      
      {/* Bottom Row: Stats */}
      <div className="relative flex w-[200%] md:w-[150%] xl:w-max animate-scroll-left hover:[animation-play-state:paused]" style={{ animationDirection: 'reverse', animationDuration: '40s' }}>
        <StatGroup />
        <StatGroup />
      </div>
    </section>
  );
}

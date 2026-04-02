import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import SocialProofBar from './components/SocialProofBar';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import PhilosophyAndStats from './components/PhilosophyAndStats';
import Pricing from './components/Pricing';
import FinalCTA from './components/FinalCTA';
import WalletModal from './components/WalletModal';
import ChatbotWidget from './components/ChatbotWidget';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loaded, setLoaded] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  useEffect(() => {
    // Initialize standard smooth scroll (Lenis)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Loader onComplete={() => setLoaded(true)} />
      <WalletModal isOpen={isWalletOpen} onClose={() => setIsWalletOpen(false)} />
      <ChatbotWidget />
      
      {/* Main Content wrapped directly to body root, standard approach */}
      <main className="relative z-10 w-full overflow-x-hidden pt-32">
        <NavBar onConnect={() => setIsWalletOpen(true)} />
        
        <Hero loaded={loaded} onConnect={() => setIsWalletOpen(true)} />
        <SocialProofBar />
        <Features />
        <HowItWorks />
        <PhilosophyAndStats />
        <Pricing onConnect={() => setIsWalletOpen(true)} />
        <FinalCTA onConnect={() => setIsWalletOpen(true)} />
      </main>
    </>
  );
}

export default App;

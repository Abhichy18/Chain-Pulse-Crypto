import React, { useEffect, useState } from 'react';
import MagneticButton from './MagneticButton';

export default function NavBar({ onConnect }) {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        if (!scrolled) setScrolled(true);
      } else {
        if (scrolled) setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-out flex items-center justify-between px-6 py-3 rounded-full ${scrolled ? 'w-[90%] lg:w-[800px] bg-void/70 backdrop-blur-xl border border-white/10' : 'w-[90%] lg:w-[800px] bg-transparent border-transparent'}`}>
      <div className="font-display font-extrabold text-xl tracking-tight text-offwhite flex items-center space-x-1 cursor-none pointer-events-auto">
        <span>Chain</span><span className="text-acid">Pulse</span>
      </div>
      
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-offwhite/70">
        {[
          { id: 'features', label: 'Platform' },
          { id: 'philosophy', label: 'Manifesto' },
          { id: 'testimonials', label: 'Testimonials' },
          { id: 'pricing', label: 'Access' }
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-acid transition-colors pointer-events-auto cursor-pointer"
          >
            {item.label}
          </a>
        ))}
      </div>
      
      <MagneticButton 
        onClick={onConnect}
        className="bg-acid/10 border border-acid/30 text-acid px-6 py-2 rounded-full text-sm font-bold tracking-wide hover:bg-acid hover:text-void transition-colors truncate"
      >
        Connect Wallet
      </MagneticButton>
    </div>
  );
}

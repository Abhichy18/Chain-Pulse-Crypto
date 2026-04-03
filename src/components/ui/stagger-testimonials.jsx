"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "ChainPulse gives us complete omniscience over our DeFi portfolio. Execution speed is up 5x.",
    by: "Alex, Lead Trader at QuantBlock",
    imgSrc: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    tempId: 1,
    testimonial: "The non-custodial read-only API integration guarantees security. I wouldn't trust my data with anyone else.",
    by: "Dan, CTO at SecureNode",
    imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    tempId: 2,
    testimonial: "We were flying blind navigating multiple chains. ChainPulse unified our entire cross-chain strategy.",
    by: "Stephanie, Head of Operations at YieldGurus",
    imgSrc: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    tempId: 3,
    testimonial: "The gas fee forecasting alone has saved us thousands. Absolutely imperative for any serious Web3 fund.",
    by: "Marie, CFO at AlphaVentures",
    imgSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    tempId: 4,
    testimonial: "If there was a 100x leverage button for productivity, this terminal is exactly it.",
    by: "Andre, Web3 Developer at 0xLabs",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    tempId: 5,
    testimonial: "The Oracle chatbot responds with sub-millisecond precision. Unreal engineering.",
    by: "Jeremy, DevOps at ChronosChain",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

const TestimonialCard = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border p-8 transition-all duration-500 ease-in-out backdrop-blur-md",
        isCenter 
          ? "z-10 bg-panel border-acid text-void" 
          : "z-0 bg-void/80 border-white/5 text-offwhite hover:border-acid/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(200, 244, 0, 0.2)" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className={cn(
          "absolute block origin-top-right rotate-45",
          isCenter ? "bg-acid" : "bg-white/5"
        )}
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-4 h-14 w-14 border border-white/10 object-cover object-center rounded-sm"
        style={{
          boxShadow: isCenter ? "3px 3px 0px #C8F400" : "3px 3px 0px rgba(200, 244, 0, 0.2)"
        }}
      />
      <h3 className={cn(
        "text-base sm:text-xl font-medium tracking-tight font-sans",
        isCenter ? "text-acid" : "text-white"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic font-mono",
        isCenter ? "text-offwhite" : "text-offwhite/50"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section id="testimonials" className="flex flex-col items-center justify-center w-full relative z-10 py-16 gap-8 mb-20 px-4 scroll-mt-[100px]">
      {/* Heading Flowing Naturally */}
      <div className="text-center z-20 pointer-events-none shrink-0">
        <h2 className="font-drama text-5xl md:text-6xl text-offwhite bg-clip-text">Alpha Leaks</h2>
        <p className="text-offwhite/50 font-mono mt-3 uppercase tracking-widest text-xs">Oracle's Verified Nodes</p>
      </div>

      {/* Cards Container */}
      <div
        className="relative w-full overflow-hidden bg-transparent shrink-0 flex justify-center items-center"
        style={{ height: 480 }}
      >
        {testimonialsList.map((testimonial, index) => {
          const position = testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
          return (
            <TestimonialCard
              key={testimonial.tempId}
              testimonial={testimonial}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}
        
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-20">
          <button
            onClick={() => handleMove(-1)}
            className={cn(
              "flex h-12 w-12 items-center justify-center text-xl transition-all magnetic cursor-none",
              "bg-void border border-white/5 text-offwhite hover:border-acid hover:text-acid"
            )}
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => handleMove(1)}
            className={cn(
              "flex h-12 w-12 items-center justify-center text-xl transition-all magnetic cursor-none",
              "bg-void border border-white/5 text-offwhite hover:border-acid hover:text-acid"
            )}
            aria-label="Next testimonial"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default StaggerTestimonials;

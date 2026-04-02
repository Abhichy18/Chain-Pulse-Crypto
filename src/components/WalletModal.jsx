import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, ShieldCheck, Zap } from 'lucide-react';

export default function WalletModal({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const [connecting, setConnecting] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out', display: 'flex' });
      gsap.fromTo(modalRef.current, 
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.2)' }
      );
    } else {
      gsap.to(modalRef.current, { scale: 0.95, opacity: 0, y: 10, duration: 0.2, ease: 'power2.in' });
      gsap.to(overlayRef.current, { 
        opacity: 0, 
        duration: 0.3, 
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(overlayRef.current, { display: 'none' });
          setConnecting(false);
          setStep(0);
        }
      });
    }
  }, [isOpen]);

  const handleConnect = () => {
    setConnecting(true);
    // Simulating cinematic connection sequence
    setTimeout(() => setStep(1), 1000);
    setTimeout(() => setStep(2), 2500);
    setTimeout(() => {
      onClose();
    }, 4500);
  };

  const wallets = [
    { name: "MetaMask" },
    { name: "Phantom" },
    { name: "WalletConnect" }
  ];

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[5000] bg-void/80 backdrop-blur-md items-center justify-center hidden">
      <div className="absolute inset-0 pointer-events-auto" onClick={!connecting ? onClose : undefined} />
      
      <div ref={modalRef} className="bg-panel border border-white/5 w-full max-w-md rounded-[2rem] p-8 shadow-[0_0_80px_rgba(200,244,0,0.06)] relative overflow-hidden z-10 pointer-events-auto">
        
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] pointer-events-none" />

        {!connecting && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-offwhite/50 hover:text-white transition-colors cursor-pointer magnetic z-10"
          >
            <X size={20} />
          </button>
        )}

        <div className="relative z-10">
          <h3 className="font-display font-bold text-2xl text-white mb-2 tracking-tight">Initialize Payload</h3>
          <p className="text-offwhite/50 text-sm font-sans mb-8">Select your cryptographic provider to mount the dashboard.</p>

          {!connecting ? (
            <div className="space-y-3">
              {wallets.map((wallet, i) => (
                <button 
                  key={i} 
                  onClick={handleConnect}
                  className="w-full bg-[#0A0D08] border border-white/5 hover:border-acid/30 p-4 rounded-2xl flex items-center space-x-4 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-void border border-white/5 flex items-center justify-center group-hover:bg-acid/10 group-hover:border-acid/20 transition-all">
                    <div className="w-2.5 h-2.5 bg-offwhite/20 group-hover:bg-acid rounded-full transition-colors" />
                  </div>
                  <span className="font-sans font-medium text-offwhite/80 group-hover:text-white transition-colors">{wallet.name}</span>
                  <div className="flex-1" />
                  <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-electric group-hover:shadow-[0_0_10px_#00FF87] transition-all" />
                </button>
              ))}
            </div>
          ) : (
            <div className="py-10 flex flex-col items-center justify-center space-y-6">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-white/5" />
                {step < 2 ? (
                  <div className="absolute inset-0 rounded-full border-t-2 border-acid animate-spin" />
                ) : (
                  <div className="absolute inset-0 rounded-full border-2 border-electric bg-electric/10 shadow-[0_0_20px_rgba(0,255,135,0.3)]" />
                )}
                
                {step < 2 ? <Zap size={28} className="text-acid/70 animate-pulse" /> : <ShieldCheck size={32} className="text-electric animate-pulse" />}
              </div>
              
              <div className="flex flex-col items-center space-y-2 text-center h-12">
                <div className="font-mono text-sm uppercase tracking-widest text-[#E6FF66] drop-shadow-[0_0_5px_rgba(200,244,0,0.5)]">
                  {step === 0 && "Handshaking..."}
                  {step === 1 && "Verifying Block Signature..."}
                  {step === 2 && "Telemetry Synced!"}
                </div>
                <div className="font-sans text-xs text-offwhite/40">
                  {step === 2 ? "Redirecting to command center..." : "Awaiting cryptographic approval from provider"}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

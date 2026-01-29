import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING');

  useEffect(() => {
    // Random loading time between 1-3 seconds
    const loadingTime = Math.random() * 2000 + 1000;
    
    const texts = ['INITIALIZING', 'LOADING MODULES', 'CONNECTING', 'VERIFYING', 'READY'];
    let textIndex = 0;
    
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % texts.length;
      setLoadingText(texts[textIndex]);
    }, 400);

    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 15 + 5;
        const newProgress = Math.min(prev + increment, 100);
        return newProgress;
      });
    }, 100);

    // Complete loading
    const timeout = setTimeout(() => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
      setProgress(100);
      setLoadingText('READY');
      
      // Exit animation
      gsap.to('.loading-screen', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete
      });
    }, loadingTime);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="loading-screen fixed inset-0 z-[10000] bg-[#050605] flex flex-col items-center justify-center">
      {/* Matrix rain effect background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <MatrixRain />
      </div>
      
      {/* Logo */}
      <div className="relative z-10 mb-12">
        <div className="w-32 h-32 relative">
          <img 
            src="/logo.png" 
            alt="Nerdy Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      
      {/* Loading text */}
      <div className="relative z-10 text-center">
        <p className="font-mono text-sm tracking-[0.3em] text-[#2CFF2C] mb-6">
          {loadingText}
        </p>
        
        {/* Progress bar container */}
        <div className="w-80 h-1 bg-[#0B120B] relative overflow-hidden">
          {/* Progress fill */}
          <div 
            className="h-full bg-[#2CFF2C] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          >
            {/* Glow effect on progress bar */}
            <div className="absolute right-0 top-0 w-4 h-full bg-[#2CFF2C] blur-sm" />
          </div>
          
          {/* Corner brackets */}
          <div className="absolute -top-1 -left-1 w-2 h-2 border-l-2 border-t-2 border-[#2CFF2C]" />
          <div className="absolute -top-1 -right-1 w-2 h-2 border-r-2 border-t-2 border-[#2CFF2C]" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-l-2 border-b-2 border-[#2CFF2C]" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r-2 border-b-2 border-[#2CFF2C]" />
        </div>
        
        {/* Progress percentage */}
        <p className="font-mono text-xs text-[#5A6B5A] mt-3">
          {Math.round(progress)}%
        </p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-8 left-8 font-mono text-xs text-[#5A6B5A]">
        NERDY EXTERNAL
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-xs text-[#5A6B5A]">
        SECURE CONNECTION
      </div>
    </div>
  );
}

// Matrix rain component
function MatrixRain() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
  
  return (
    <div className="absolute inset-0 flex justify-around">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="text-[#2CFF2C] text-xs font-mono opacity-30"
          style={{
            animation: `matrix-fall ${Math.random() * 3 + 2}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          {Array.from({ length: 20 }).map((_, j) => (
            <div key={j}>
              {chars[Math.floor(Math.random() * chars.length)]}
            </div>
          ))}
        </div>
      ))}
      
      <style>{`
        @keyframes matrix-fall {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

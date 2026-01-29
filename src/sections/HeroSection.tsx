import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Download, Zap, MessageCircle, Sparkles, Flame, Shield } from 'lucide-react';
import { useAccount } from '@/context/AccountContext';

gsap.registerPlugin(ScrollTrigger);

// Discord invite link - replace with your actual invite
const DISCORD_INVITE = 'https://discord.gg/yourserver';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const { setShowAuthModal, setAuthMode, isLoggedIn } = useAccount();

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const product = productRef.current;

    if (!section || !headline || !product) return;

    const ctx = gsap.context(() => {
      // Entrance animation on load
      const loadTl = gsap.timeline({ delay: 0.3 });

      // Headline animation
      loadTl.fromTo(
        headline.querySelectorAll('.word'),
        { opacity: 0, y: 24, rotateX: 35 },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0, 
          duration: 0.8, 
          ease: 'power2.out',
          stagger: 0.04
        }
      );

      // Subheadline + CTAs
      loadTl.fromTo(
        headline.querySelectorAll('.fade-in'),
        { opacity: 0, y: 18 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: 'power2.out',
          stagger: 0.08
        },
        '-=0.4'
      );

      // Product image
      loadTl.fromTo(
        product,
        { opacity: 0, x: '12vw', scale: 0.92, rotateY: -18 },
        { 
          opacity: 1, 
          x: 0, 
          scale: 1, 
          rotateY: 0, 
          duration: 1, 
          ease: 'power2.out'
        },
        '-=0.8'
      );

      // Scroll hint
      loadTl.fromTo(
        '.scroll-hint',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 },
        '-=0.3'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set(headline.querySelectorAll('.word'), { opacity: 1, x: 0 });
            gsap.set(headline.querySelectorAll('.fade-in'), { opacity: 1, x: 0 });
            gsap.set(product, { opacity: 1, x: 0, scale: 1 });
          }
        }
      });

      // ENTRANCE (0-30%): Keep visible (already entered via load)
      // SETTLE (30-70%): Hold
      // EXIT (70-100%): Animate out
      scrollTl.fromTo(
        headline,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        product,
        { x: 0, scale: 1, opacity: 1 },
        { x: '18vw', scale: 0.92, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        '.scroll-hint',
        { opacity: 1 },
        { opacity: 0 },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleDownloadClick = () => {
    if (!isLoggedIn) {
      setAuthMode('login');
      setShowAuthModal(true);
    } else {
      document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFeaturesClick = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDiscordClick = () => {
    window.open(DISCORD_INVITE, '_blank');
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#050605]"
    >
      {/* Background with animated gradient */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(44, 255, 44, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(44, 255, 44, 0.08) 0%, transparent 40%),
              linear-gradient(180deg, #050605 0%, #0B120B 100%)
            `
          }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(44, 255, 44, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(44, 255, 44, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Vignette */}
        <div className="vignette" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#2CFF2C] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Attention-grabbing banner */}
      <div className="absolute top-20 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <div className="fade-in flex items-center gap-2 px-4 py-2 bg-[#2CFF2C]/10 border border-[#2CFF2C]/40 backdrop-blur-sm">
          <Sparkles size={14} className="text-[#2CFF2C] animate-pulse" />
          <span className="font-mono text-xs text-[#2CFF2C] tracking-wider">
            NEW RELEASE — DOWNLOAD NOW
          </span>
          <Sparkles size={14} className="text-[#2CFF2C] animate-pulse" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Headline */}
            <div ref={headlineRef} className="text-left">
              {/* Micro label */}
              <p className="fade-in font-mono text-xs tracking-[0.3em] text-[#2CFF2C] mb-4">
                ROBLOX EXTERNAL SCRIPT
              </p>

              {/* Main headline */}
              <h1 className="font-heading font-bold text-responsive-h1 tracking-wider text-[#F2FFF2] mb-6">
                <span className="word inline-block">NERDY</span>{' '}
                <span className="word inline-block text-glow text-[#2CFF2C]">EXTERNAL</span>
              </h1>

              {/* Subheadline */}
              <p className="fade-in text-lg sm:text-xl text-[#A8B5A8] max-w-xl mb-8 leading-relaxed">
                The most advanced external script for Roblox. 
                Dominate every game with precision aim, wall detection, and more.
              </p>

              {/* CTA buttons */}
              <div className="fade-in flex flex-wrap gap-4">
                <button
                  onClick={handleDownloadClick}
                  className="group flex items-center gap-3 px-6 py-3 bg-[#2CFF2C] text-black font-heading font-bold tracking-wider hover:bg-[#4FFF4F] transition-all btn-cyber"
                >
                  <Download size={18} />
                  DOWNLOAD FREE
                </button>
                <button
                  onClick={handleFeaturesClick}
                  className="group flex items-center gap-3 px-6 py-3 border border-[#2CFF2C] text-[#2CFF2C] font-heading font-bold tracking-wider hover:bg-[#2CFF2C]/10 transition-all"
                >
                  <Zap size={18} />
                  SEE FEATURES
                </button>
                <button
                  onClick={handleDiscordClick}
                  className="group flex items-center gap-3 px-6 py-3 border border-[#5865F2] text-[#5865F2] font-heading font-bold tracking-wider hover:bg-[#5865F2]/10 transition-all"
                >
                  <MessageCircle size={18} />
                  JOIN DISCORD
                </button>
              </div>

              {/* Stats */}
              <div className="fade-in flex flex-wrap gap-8 mt-10">
                <div>
                  <p className="font-heading text-3xl font-bold text-[#2CFF2C] text-glow">100%</p>
                  <p className="font-mono text-xs text-[#5A6B5A] tracking-wider">FREE</p>
                </div>
                <div>
                  <p className="font-heading text-3xl font-bold text-[#2CFF2C] text-glow">UNDETECTED</p>
                  <p className="font-mono text-xs text-[#5A6B5A] tracking-wider">EXTERNAL ONLY</p>
                </div>
                <div>
                  <p className="font-heading text-3xl font-bold text-[#2CFF2C] text-glow">15+</p>
                  <p className="font-mono text-xs text-[#5A6B5A] tracking-wider">FEATURES</p>
                </div>
              </div>

              {/* Always free badge */}
              <div className="fade-in mt-6 inline-flex items-center gap-2 px-4 py-2 border border-[#2CFF2C]/30 bg-[#2CFF2C]/5">
                <Flame size={14} className="text-[#2CFF2C]" />
                <span className="font-mono text-xs text-[#A8B5A8] tracking-wider">
                  ALWAYS FREE — NO PAYWALLS, EVER
                </span>
              </div>
            </div>

            {/* Right: Product image */}
            <div 
              ref={productRef}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[#2CFF2C] blur-[100px] opacity-20" />
                
                {/* Product container */}
                <div className="relative cyber-card corner-brackets p-2">
                  <div className="corner-brackets-inner" />
                  
                  {/* Script UI preview - using actual image */}
                  <div className="relative w-full max-w-lg overflow-hidden">
                    <img 
                      src="/script-preview.png" 
                      alt="Nerdy Script Interface"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 px-3 py-1 bg-[#2CFF2C] text-black font-mono text-xs font-bold flex items-center gap-1">
                  <Shield size={12} />
                  EXTERNAL
                </div>
                <div className="absolute -bottom-4 -left-4 px-3 py-1 border border-[#2CFF2C] text-[#2CFF2C] font-mono text-xs flex items-center gap-1">
                  <Flame size={12} />
                  FREE
                </div>
                
                {/* Attention badge */}
                <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 px-3 py-2 bg-[#FF4444] text-white font-mono text-xs font-bold rotate-[-12deg] animate-pulse">
                  HOT!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-xs text-[#5A6B5A] tracking-wider">SCROLL</span>
        <ChevronDown className="text-[#2CFF2C] animate-bounce" size={20} />
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, FileArchive, Rocket, Check, Lock, MessageCircle, Gift } from 'lucide-react';
import { useAccount } from '@/context/AccountContext';

gsap.registerPlugin(ScrollTrigger);

// Discord invite link - replace with your actual invite
const DISCORD_INVITE = 'https://discord.com/invite/SkfgAXYHGY';

const steps = [
  { number: '1', title: 'Download', description: 'Get the latest version', icon: Download },
  { number: '2', title: 'Extract', description: 'Unzip to any folder', icon: FileArchive },
  { number: '3', title: 'Launch', description: 'Run and dominate', icon: Rocket },
];

export default function DownloadSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isLoggedIn, setShowAuthModal, setAuthMode } = useAccount();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.download-header',
        { opacity: 0, y: -40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Product animation
      gsap.fromTo(
        '.download-product',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Steps animation
      gsap.fromTo(
        '.step-card',
        { opacity: 0, x: (i) => i === 0 ? -40 : i === 1 ? 40 : 0, y: (i) => i === 2 ? 40 : 0 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.steps-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleDownload = async () => {
    if (!isLoggedIn) {
      setAuthMode('login');
      setShowAuthModal(true);
      return;
    }

    setIsDownloading(true);
    
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsDownloading(false);
    setDownloadComplete(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setDownloadComplete(false);
    }, 3000);
  };

  const handleDiscordClick = () => {
    window.open(DISCORD_INVITE, '_blank');
  };

  return (
    <section 
      id="download"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-[#050605] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 50%, rgba(44, 255, 44, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 20% 20%, rgba(44, 255, 44, 0.04) 0%, transparent 40%)
            `
          }}
        />
        
        {/* Animated grid */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(44, 255, 44, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(44, 255, 44, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="download-header text-center mb-16">
          <p className="font-mono text-xs tracking-[0.3em] text-[#2CFF2C] mb-4">
            GET STARTED
          </p>
          <h2 className="font-heading font-bold text-responsive-h2 tracking-wider text-[#F2FFF2] mb-4">
            SETUP IN <span className="text-[#2CFF2C] text-glow">60 SECONDS</span>
          </h2>
          <p className="text-lg text-[#A8B5A8] max-w-xl mx-auto">
            Download. Extract. Run. No installers, no bloat.
          </p>
          
          {/* Free badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#2CFF2C]/10 border border-[#2CFF2C]/30">
            <Gift size={16} className="text-[#2CFF2C]" />
            <span className="font-mono text-sm text-[#2CFF2C] tracking-wider">
              ALWAYS FREE — NO PAYWALLS EVER
            </span>
          </div>
        </div>

        {/* Product showcase */}
        <div className="download-product flex justify-center mb-16">
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 bg-[#2CFF2C] blur-[100px] opacity-15" />
            
            {/* Product card */}
            <div className="relative cyber-card corner-brackets p-6">
              <div className="corner-brackets-inner" />
              
              <div className="flex flex-col items-center">
                {/* Logo */}
                <div className="w-24 h-24 mb-4">
                  <img 
                    src="/logo.png" 
                    alt="Nerdy Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <h3 className="font-heading font-bold text-2xl text-[#F2FFF2] mb-2">
                  NERDY EXTERNAL
                </h3>
                <p className="font-mono text-sm text-[#2CFF2C] mb-4">
                  EXTERNAL SCRIPT
                </p>
                
                <div className="flex items-center gap-4 text-sm text-[#A8B5A8]">
                  <span className="flex items-center gap-2">
                    <Check size={14} className="text-[#2CFF2C]" />
                    Windows 10/11
                  </span>
                  <span className="flex items-center gap-2">
                    <Check size={14} className="text-[#2CFF2C]" />
                    64-bit
                  </span>
                  <span className="flex items-center gap-2">
                    <Check size={14} className="text-[#2CFF2C]" />
                    2.4 MB
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="steps-container grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-card cyber-card corner-brackets p-6 text-center group hover:border-[#2CFF2C]/60 transition-all"
            >
              <div className="corner-brackets-inner" />
              
              {/* Step number */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#050605] border border-[#2CFF2C] text-[#2CFF2C] font-mono text-xs">
                STEP {step.number}
              </div>
              
              {/* Icon */}
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center border border-[#2CFF2C]/30 group-hover:border-[#2CFF2C] group-hover:bg-[#2CFF2C]/10 transition-all">
                <step.icon className="text-[#2CFF2C]" size={28} />
              </div>
              
              {/* Title */}
              <h4 className="font-heading font-bold text-lg text-[#F2FFF2] mb-2">
                {step.title}
              </h4>
              
              {/* Description */}
              <p className="text-sm text-[#A8B5A8]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Download CTA */}
        <div className="text-center mb-8">
          {!isLoggedIn ? (
            <div className="inline-block">
              <div className="mb-4 p-4 border border-[#2CFF2C]/30 bg-[#2CFF2C]/5">
                <div className="flex items-center gap-3 text-[#A8B5A8]">
                  <Lock size={18} className="text-[#2CFF2C]" />
                  <span className="font-mono text-sm">
                    Sign in required to download
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#2CFF2C] text-black font-heading font-bold text-lg tracking-wider hover:bg-[#4FFF4F] transition-all btn-cyber"
              >
                <Lock size={20} />
                SIGN IN TO DOWNLOAD
              </button>
            </div>
          ) : (
            <div className="inline-block">
              <button
                onClick={handleDownload}
                disabled={isDownloading || downloadComplete}
                className={`inline-flex items-center gap-3 px-8 py-4 font-heading font-bold text-lg tracking-wider transition-all btn-cyber ${
                  downloadComplete
                    ? 'bg-[#2CFF2C]/20 border-2 border-[#2CFF2C] text-[#2CFF2C]'
                    : 'bg-[#2CFF2C] text-black hover:bg-[#4FFF4F]'
                }`}
              >
                {isDownloading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    DOWNLOADING...
                  </>
                ) : downloadComplete ? (
                  <>
                    <Check size={24} />
                    DOWNLOADED!
                  </>
                ) : (
                  <>
                    <Download size={24} />
                    DOWNLOAD NERDY
                  </>
                )}
              </button>
              
              {downloadComplete && (
                <p className="mt-4 font-mono text-sm text-[#2CFF2C]">
                  Check your downloads folder!
                </p>
              )}
            </div>
          )}
        </div>

        {/* Discord CTA */}
        <div className="text-center mb-8">
          <p className="text-sm text-[#5A6B5A] mb-4">
            Need help or have questions?
          </p>
          <button
            onClick={handleDiscordClick}
            className="inline-flex items-center gap-3 px-6 py-3 border border-[#5865F2] text-[#5865F2] font-heading font-bold tracking-wider hover:bg-[#5865F2]/10 transition-all"
          >
            <MessageCircle size={18} />
            JOIN OUR DISCORD
          </button>
        </div>

        {/* Additional links */}
        <div className="flex flex-wrap justify-center gap-6">
          <span className="flex items-center gap-2 text-sm text-[#5A6B5A]">
            <Gift size={14} className="text-[#2CFF2C]" />
            Free forever
          </span>
          <span className="flex items-center gap-2 text-sm text-[#5A6B5A]">
            <Check size={14} className="text-[#2CFF2C]" />
            No ads
          </span>
          <span className="flex items-center gap-2 text-sm text-[#5A6B5A]">
            <Check size={14} className="text-[#2CFF2C]" />
            External & Script
          </span>
        </div>
      </div>
    </section>
  );
}

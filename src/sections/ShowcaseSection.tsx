import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Gift, Sparkles, Flame, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  'Silent launch on startup',
  'Profile auto-sync to cloud',
  'Hotkey-driven switching',
  'Minimal CPU/GPU footprint',
  'Signature-resistant design',
  'One-click panic reset',
];

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const showcase = showcaseRef.current;

    if (!section || !showcase) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.showcase-header',
        { opacity: 0, y: 40 },
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

      // Showcase container animation
      gsap.fromTo(
        showcase,
        { opacity: 0, y: 80, rotateZ: -2 },
        {
          opacity: 1,
          y: 0,
          rotateZ: -1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: showcase,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Capabilities animation
      gsap.fromTo(
        '.capability-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.capabilities-list',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="showcase"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-[#050605] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 80% 50%, rgba(44, 255, 44, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 20% 80%, rgba(44, 255, 44, 0.04) 0%, transparent 40%)
            `
          }}
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="showcase-header text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={16} className="text-[#2CFF2C]" />
            <p className="font-mono text-xs tracking-[0.3em] text-[#2CFF2C]">
              SCRIPT PREVIEW
            </p>
            <Sparkles size={16} className="text-[#2CFF2C]" />
          </div>
          <h2 className="font-heading font-bold text-responsive-h2 tracking-wider text-[#F2FFF2] mb-4">
            BUILT FOR THE <span className="text-[#2CFF2C] text-glow">FIELD</span>
          </h2>
          <p className="text-lg text-[#A8B5A8] max-w-2xl mx-auto">
            Clean, intuitive interface designed for quick adjustments mid-game.
          </p>
          
          {/* Attention badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#FF4444]/20 border border-[#FF4444]/50">
            <Flame size={16} className="text-[#FF4444] animate-pulse" />
            <span className="font-mono text-sm text-[#FF4444] tracking-wider">
              MOST POPULAR FREE SCRIPT
            </span>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left: Script UI Preview with actual image */}
          <div 
            ref={showcaseRef}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[#2CFF2C] blur-[80px] opacity-10" />
            
            {/* Script container */}
            <div className="relative cyber-card corner-brackets p-1 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="corner-brackets-inner" />
              
              {/* Actual script image */}
              <div className="relative w-full overflow-hidden">
                <img 
                  src="/script-preview.png" 
                  alt="Nerdy Script Interface"
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#2CFF2C]" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#2CFF2C]" />
            
            {/* Rating badge */}
            <div className="absolute -bottom-6 right-4 px-3 py-2 bg-[#050605] border border-[#2CFF2C] flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={12} className="text-[#2CFF2C] fill-[#2CFF2C]" />
                ))}
              </div>
              <span className="font-mono text-xs text-[#2CFF2C]">5.0 RATING</span>
            </div>
          </div>

          {/* Right: Capabilities */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h3 className="font-heading font-bold text-xl tracking-wider text-[#F2FFF2]">
                CAPABILITIES
              </h3>
              <div className="px-2 py-1 bg-[#2CFF2C]/20 border border-[#2CFF2C]/40">
                <span className="font-mono text-[10px] text-[#2CFF2C]">EXTERNAL ONLY</span>
              </div>
            </div>
            
            <div className="capabilities-list space-y-4">
              {capabilities.map((capability, index) => (
                <div
                  key={index}
                  className="capability-item flex items-center gap-4 p-4 cyber-card group hover:border-[#2CFF2C]/50 transition-all"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-[#2CFF2C]/10 border border-[#2CFF2C]/30 group-hover:bg-[#2CFF2C]/20 transition-all">
                    <Check className="text-[#2CFF2C]" size={16} />
                  </div>
                  <span className="text-[#A8B5A8] group-hover:text-[#F2FFF2] transition-colors">
                    {capability}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Additional info */}
            <div className="mt-8 p-4 border border-[#2CFF2C]/30 bg-[#2CFF2C]/5">
              <p className="font-mono text-xs text-[#2CFF2C] mb-2">PRO TIP</p>
              <p className="text-sm text-[#A8B5A8]">
                Use the hotkey system to toggle features instantly during gameplay. 
                Default panic key is <span className="text-[#2CFF2C]">INSERT</span>.
              </p>
            </div>

            {/* Free forever */}
            <div className="mt-4 p-4 border border-[#2CFF2C]/30 bg-[#2CFF2C]/5 flex items-center gap-3">
              <Gift size={20} className="text-[#2CFF2C]" />
              <div>
                <p className="font-mono text-xs text-[#2CFF2C] mb-1">FREE FOREVER</p>
                <p className="text-sm text-[#A8B5A8]">
                  All features included. No premium tiers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

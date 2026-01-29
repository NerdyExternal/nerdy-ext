import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Target, 
  Shield, 
  Zap, 
  Cpu, 
  Eye, 
  Fingerprint,
  Keyboard,
  Lock,
  Gift
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Target,
    title: 'PRECISION AIMLOCK',
    description: 'Advanced targeting with customizable FOV, smoothness, and bone selection for pixel-perfect accuracy.',
  },
  {
    icon: Shield,
    title: 'UNDETECTED',
    description: 'External architecture keeps you safe. No memory injection, no traces left behind.',
  },
  {
    icon: Zap,
    title: 'ZERO LAG',
    description: 'Optimized for minimal CPU/GPU footprint. Run at 240+ FPS without drops.',
  },
  {
    icon: Eye,
    title: 'WALL CHECK',
    description: 'Smart visibility detection ensures you only target when it counts.',
  },
  {
    icon: Fingerprint,
    title: 'TEAM CHECK',
    description: 'Never accidentally target allies. Automatic team detection built-in.',
  },
  {
    icon: Cpu,
    title: 'PREDICTION ENGINE',
    description: 'Advanced movement prediction keeps you on target even at range.',
  },
  {
    icon: Keyboard,
    title: 'HOTKEY SYSTEM',
    description: 'Fully customizable keybinds. Toggle features on the fly without menus.',
  },
  {
    icon: Gift,
    title: 'ALWAYS FREE',
    description: 'No paywalls, no premium tiers. Every feature is free for everyone.',
  },
  {
    icon: Lock,
    title: 'PANIC RESET',
    description: 'One-click instant disable. Return to clean state in milliseconds.',
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.features-header',
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

      // Cards stagger animation
      const cardElements = cards.querySelectorAll('.feature-card');
      gsap.fromTo(
        cardElements,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="features"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-[#050605]"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 0%, rgba(44, 255, 44, 0.05) 0%, transparent 50%)
            `
          }}
        />
        
        {/* Grid lines */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(44, 255, 44, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(44, 255, 44, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="features-header text-center mb-16">
          <p className="font-mono text-xs tracking-[0.3em] text-[#2CFF2C] mb-4">
            FEATURE SPOTLIGHT
          </p>
          <h2 className="font-heading font-bold text-responsive-h2 tracking-wider text-[#F2FFF2] mb-4">
            TOTAL <span className="text-[#2CFF2C] text-glow">CONTROL</span>
          </h2>
          <p className="text-lg text-[#A8B5A8] max-w-2xl mx-auto">
            Bind actions to your setup. Switch profiles on the fly. 
            No interruptions, no clutter. Just pure performance.
          </p>
          
          {/* Free badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#2CFF2C]/10 border border-[#2CFF2C]/30">
            <Gift size={16} className="text-[#2CFF2C]" />
            <span className="font-mono text-sm text-[#2CFF2C] tracking-wider">
              100% FREE — NO HIDDEN COSTS
            </span>
          </div>
        </div>

        {/* Features grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card cyber-card corner-brackets p-6 group hover:border-[#2CFF2C]/60 transition-all duration-300"
            >
              <div className="corner-brackets-inner" />
              
              {/* Icon */}
              <div className="w-12 h-12 mb-4 flex items-center justify-center border border-[#2CFF2C]/30 group-hover:border-[#2CFF2C] group-hover:bg-[#2CFF2C]/10 transition-all">
                <feature.icon 
                  className="text-[#2CFF2C] group-hover:scale-110 transition-transform" 
                  size={24} 
                />
              </div>
              
              {/* Title */}
              <h3 className="font-heading font-bold text-lg tracking-wider text-[#F2FFF2] mb-2 group-hover:text-[#2CFF2C] transition-colors">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-[#A8B5A8] leading-relaxed">
                {feature.description}
              </p>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#2CFF2C]/0 group-hover:border-[#2CFF2C] transition-all" />
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 lg:gap-16">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center border border-[#2CFF2C]/30">
              <Target className="text-[#2CFF2C]" size={32} />
            </div>
            <p className="font-heading text-2xl font-bold text-[#F2FFF2]">15+</p>
            <p className="font-mono text-xs text-[#5A6B5A] tracking-wider">AIM FEATURES</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center border border-[#2CFF2C]/30">
              <Shield className="text-[#2CFF2C]" size={32} />
            </div>
            <p className="font-heading text-2xl font-bold text-[#F2FFF2]">100%</p>
            <p className="font-mono text-xs text-[#5A6B5A] tracking-wider">SAFE</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center border border-[#2CFF2C]/30">
              <Gift className="text-[#2CFF2C]" size={32} />
            </div>
            <p className="font-heading text-2xl font-bold text-[#F2FFF2]">FREE</p>
            <p className="font-mono text-xs text-[#5A6B5A] tracking-wider">FOREVER</p>
          </div>
        </div>
      </div>
    </section>
  );
}

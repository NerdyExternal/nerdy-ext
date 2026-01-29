import { useState } from 'react';
import { useAccount } from '@/context/AccountContext';
import { 
  MessageCircle, 
  ChevronDown, 
  ChevronUp,
  Send,
  Download,
  Gift
} from 'lucide-react';

// Discord invite link - replace with your actual invite
const DISCORD_INVITE = 'https://discord.com/invite/SkfgAXYHGY';

const faqs = [
  {
    question: 'Is it really free?',
    answer: 'Yes! Nerdy External is and always will be 100% free. No paywalls, no premium tiers, no ads. Every feature is available to everyone.',
  },
  {
    question: 'Is it detectable?',
    answer: 'Nerdy External is designed with a signature-resistant external architecture. As an external tool, it operates without injecting into game memory, significantly reducing detection risk. However, always use at your own discretion.',
  },
  {
    question: 'What are the system requirements?',
    answer: 'Nerdy External requires Windows 10 or 11 (64-bit), 4GB RAM, and a stable internet connection. It runs on both AMD and Intel processors.',
  },
  {
    question: 'How do I get support?',
    answer: 'Join our Discord server for quick support from the community and developers. Average response time is under a few hours.',
  },
];

export default function FooterSection() {
  const { isLoggedIn, setShowAuthModal, setAuthMode } = useAccount();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const handleDiscordClick = () => {
    window.open(DISCORD_INVITE, '_blank');
  };

  return (
    <footer className="relative w-full bg-[#0B120B] border-t border-[#2CFF2C]/20">
      {/* Main footer content */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Support column */}
            <div>
              <h3 className="font-heading font-bold text-xl tracking-wider text-[#F2FFF2] mb-4">
                SUPPORT
              </h3>
              <p className="text-sm text-[#A8B5A8] mb-4">
                Need help? Join our Discord for quick assistance from the community.
              </p>
              
              <button
                onClick={handleDiscordClick}
                className="flex items-center gap-2 text-[#5865F2] hover:text-[#7289DA] mb-6 transition-colors"
              >
                <MessageCircle size={16} />
                Join Discord Server
              </button>
              
              {/* Social links */}
              <div className="flex gap-3">
                <button 
                  className="w-10 h-10 flex items-center justify-center border border-[#5865F2]/30 text-[#5865F2] hover:border-[#5865F2] hover:bg-[#5865F2]/10 transition-all"
                  onClick={handleDiscordClick}
                >
                  <MessageCircle size={18} />
                </button>
              </div>

              {/* Free badge */}
              <div className="mt-6 p-3 border border-[#2CFF2C]/30 bg-[#2CFF2C]/5">
                <div className="flex items-center gap-2">
                  <Gift size={16} className="text-[#2CFF2C]" />
                  <span className="font-mono text-xs text-[#2CFF2C]">
                    FREE FOREVER
                  </span>
                </div>
              </div>
            </div>

            {/* FAQ column */}
            <div>
              <h3 className="font-heading font-bold text-xl tracking-wider text-[#F2FFF2] mb-4">
                FAQ
              </h3>
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <div 
                    key={index}
                    className="border border-[#2CFF2C]/20 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-[#2CFF2C]/5 transition-colors"
                    >
                      <span className="text-sm text-[#F2FFF2]">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp size={16} className="text-[#2CFF2C]" />
                      ) : (
                        <ChevronDown size={16} className="text-[#5A6B5A]" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-3 pb-3">
                        <p className="text-sm text-[#A8B5A8]">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter column */}
            <div>
              <h3 className="font-heading font-bold text-xl tracking-wider text-[#F2FFF2] mb-4">
                STAY UPDATED
              </h3>
              <p className="text-sm text-[#A8B5A8] mb-4">
                Get notified about new updates and features.
              </p>
              
              <form onSubmit={handleSubscribe} className="mb-6">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 text-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#2CFF2C] text-black hover:bg-[#4FFF4F] transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
                {subscribed && (
                  <p className="mt-2 text-sm text-[#2CFF2C]">
                    Thanks for subscribing!
                  </p>
                )}
              </form>

              {/* Final CTA */}
              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    setAuthMode('login');
                    setShowAuthModal(true);
                  } else {
                    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-[#2CFF2C] text-[#2CFF2C] font-heading font-bold tracking-wider hover:bg-[#2CFF2C] hover:text-black transition-all"
              >
                <Download size={18} />
                DOWNLOAD NERDY
              </button>

              {/* Discord CTA */}
              <button
                onClick={handleDiscordClick}
                className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 border border-[#5865F2] text-[#5865F2] font-heading font-bold tracking-wider hover:bg-[#5865F2]/10 transition-all"
              >
                <MessageCircle size={18} />
                JOIN DISCORD
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2CFF2C]/10">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6">
                <img 
                  src="/logo.png" 
                  alt="Nerdy Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-heading font-bold text-sm tracking-wider text-[#F2FFF2]">
                NERDY
              </span>
            </div>

            {/* Copyright */}
            <p className="text-xs text-[#5A6B5A]">
              © 2026 Nerdy External. All rights reserved.
            </p>

            {/* Free badge */}
            <div className="flex items-center gap-2 text-xs text-[#2CFF2C]">
              <Gift size={12} />
              <span className="font-mono tracking-wider">FREE FOREVER</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

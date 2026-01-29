import { useState, useEffect } from 'react';
import { useAccount } from '@/context/AccountContext';
import { User, LogOut, Menu, X, MessageCircle } from 'lucide-react';
import { gsap } from 'gsap';

// Discord invite link - replace with your actual invite
const DISCORD_INVITE = 'https://discord.gg/yourserver';

export default function Navigation() {
  const { isLoggedIn, user, logout, setShowAuthModal, setAuthMode } = useAccount();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
    gsap.fromTo('.auth-modal-content', 
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
  };

  const handleDiscordClick = () => {
    window.open(DISCORD_INVITE, '_blank');
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Features', id: 'features' },
    { label: 'Showcase', id: 'showcase' },
    { label: 'Download', id: 'download' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#050605]/90 backdrop-blur-md border-b border-[#2CFF2C]/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 group"
            >
              <div className="w-8 h-8">
                <img 
                  src="/logo.png" 
                  alt="Nerdy Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-heading font-bold text-xl tracking-wider text-[#F2FFF2] hidden sm:block">
                NERDY
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="nav-link font-mono text-sm text-[#A8B5A8] hover:text-[#2CFF2C] transition-colors tracking-wider"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={handleDiscordClick}
                className="nav-link font-mono text-sm text-[#5865F2] hover:text-[#7289DA] transition-colors tracking-wider flex items-center gap-1"
              >
                <MessageCircle size={14} />
                DISCORD
              </button>
            </div>

            {/* Auth buttons */}
            <div className="hidden md:flex items-center gap-4">
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[#A8B5A8]">
                    <User size={16} className="text-[#2CFF2C]" />
                    <span className="font-mono text-sm">{user?.username}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 text-[#5A6B5A] hover:text-[#2CFF2C] transition-colors"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="font-mono text-sm text-[#A8B5A8] hover:text-[#2CFF2C] transition-colors tracking-wider"
                  >
                    SIGN IN
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="px-4 py-2 bg-[#2CFF2C] text-black font-heading font-bold text-sm tracking-wider hover:bg-[#4FFF4F] transition-all btn-cyber"
                  >
                    GET STARTED
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#A8B5A8] hover:text-[#2CFF2C] transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#050605]/95 backdrop-blur-md border-t border-[#2CFF2C]/20">
            <div className="px-4 py-4 space-y-4">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left font-mono text-sm text-[#A8B5A8] hover:text-[#2CFF2C] transition-colors tracking-wider py-2"
                >
                  {link.label}
                </button>
              ))}
              
              <button
                onClick={handleDiscordClick}
                className="block w-full text-left font-mono text-sm text-[#5865F2] hover:text-[#7289DA] transition-colors tracking-wider py-2 flex items-center gap-2"
              >
                <MessageCircle size={14} />
                JOIN DISCORD
              </button>
              
              <div className="border-t border-[#2CFF2C]/20 pt-4">
                {isLoggedIn ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#A8B5A8]">
                      <User size={16} className="text-[#2CFF2C]" />
                      <span className="font-mono text-sm">{user?.username}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 text-[#5A6B5A] hover:text-[#2CFF2C] transition-colors"
                    >
                      <LogOut size={18} />
                      <span className="font-mono text-sm">LOGOUT</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleAuthClick('login')}
                      className="block w-full text-left font-mono text-sm text-[#A8B5A8] hover:text-[#2CFF2C] transition-colors tracking-wider"
                    >
                      SIGN IN
                    </button>
                    <button
                      onClick={() => handleAuthClick('register')}
                      className="w-full px-4 py-2 bg-[#2CFF2C] text-black font-heading font-bold text-sm tracking-wider"
                    >
                      GET STARTED
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

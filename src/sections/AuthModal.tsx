import { useState } from 'react';
import { useAccount } from '@/context/AccountContext';
import { X, User, Lock, Mail, Eye, EyeOff, Gift } from 'lucide-react';
import { gsap } from 'gsap';

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, authMode, setAuthMode, login, register } = useAccount();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!showAuthModal) return null;

  const handleClose = () => {
    gsap.to('.auth-modal-content', {
      scale: 0.9,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setShowAuthModal(false);
        setError('');
        setUsername('');
        setEmail('');
        setPassword('');
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let success;
      if (authMode === 'login') {
        success = await login(username, password);
      } else {
        success = await register(username, email, password);
      }

      if (success) {
        gsap.to('.auth-modal-content', {
          scale: 0.9,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            setShowAuthModal(false);
            setUsername('');
            setEmail('');
            setPassword('');
          }
        });
      } else {
        setError(authMode === 'login' 
          ? 'Invalid credentials. Try demo/demo' 
          : 'Username or email already exists'
        );
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      style={{ background: 'rgba(5, 6, 5, 0.9)' }}
      onClick={handleClose}
    >
      <div 
        className="auth-modal-content cyber-card corner-brackets w-full max-w-md p-8 relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="corner-brackets-inner" />
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#5A6B5A] hover:text-[#2CFF2C] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4">
            <img 
              src="/logo.png" 
              alt="Nerdy Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="font-heading text-2xl font-bold text-[#F2FFF2] tracking-wider">
            {authMode === 'login' ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
          </h2>
          <p className="font-mono text-xs text-[#5A6B5A] mt-2">
            {authMode === 'login' 
              ? 'Sign in to access downloads' 
              : 'Join Nerdy External today'}
          </p>
          
          {/* Free badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 border border-[#2CFF2C]/30 bg-[#2CFF2C]/5">
            <Gift size={12} className="text-[#2CFF2C]" />
            <span className="font-mono text-xs text-[#2CFF2C]">
              100% FREE
            </span>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 border border-red-500/50 bg-red-500/10 text-red-400 text-sm font-mono">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-[#A8B5A8] mb-2 tracking-wider">
              USERNAME
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6B5A]" size={18} />
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          {authMode === 'register' && (
            <div>
              <label className="block font-mono text-xs text-[#A8B5A8] mb-2 tracking-wider">
                EMAIL
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6B5A]" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm"
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-mono text-xs text-[#A8B5A8] mb-2 tracking-wider">
              PASSWORD
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6B5A]" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 text-sm"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6B5A] hover:text-[#2CFF2C] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#2CFF2C] text-black font-heading font-bold tracking-wider hover:bg-[#4FFF4F] transition-all disabled:opacity-50 disabled:cursor-not-allowed btn-cyber"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                PROCESSING...
              </span>
            ) : (
              authMode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'
            )}
          </button>
        </form>

        {/* Toggle mode */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[#5A6B5A]">
            {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => {
                setAuthMode(authMode === 'login' ? 'register' : 'login');
                setError('');
              }}
              className="ml-2 text-[#2CFF2C] hover:underline"
            >
              {authMode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Demo hint */}
        {authMode === 'login' && (
          <div className="mt-4 p-3 border border-[#2CFF2C]/30 bg-[#2CFF2C]/5">
            <p className="font-mono text-xs text-[#A8B5A8] text-center">
              Demo: username <span className="text-[#2CFF2C]">demo</span> / password <span className="text-[#2CFF2C]">demo</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

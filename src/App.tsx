import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AccountProvider } from '@/context/AccountContext';

// Sections
import LoadingScreen from '@/sections/LoadingScreen';
import Navigation from '@/sections/Navigation';
import AuthModal from '@/sections/AuthModal';
import HeroSection from '@/sections/HeroSection';
import FeaturesSection from '@/sections/FeaturesSection';
import ShowcaseSection from '@/sections/ShowcaseSection';
import DownloadSection from '@/sections/DownloadSection';
import FooterSection from '@/sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize GSAP defaults
    gsap.defaults({
      ease: 'power2.out',
      duration: 0.6,
    });

    // Setup global snap after all sections are mounted
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    // Delay snap setup to ensure all ScrollTriggers are created
    const snapTimeout = setTimeout(setupGlobalSnap, 1000);

    return () => {
      clearTimeout(snapTimeout);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Refresh ScrollTrigger after loading screen disappears
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <div className="relative min-h-screen bg-[#050605]">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Auth Modal */}
      <AuthModal />

      {/* Main content */}
      <main className="relative">
        <HeroSection />
        <FeaturesSection />
        <ShowcaseSection />
        <DownloadSection />
        <FooterSection />
      </main>
    </div>
  );
}

function App() {
  return (
    <AccountProvider>
      <AppContent />
    </AccountProvider>
  );
}

export default App;

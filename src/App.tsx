import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CustomCursor } from './components/CustomCursor';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { TechSection } from './components/TechSection';
import { ContactSection } from './components/ContactSection';

export function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-zinc-800 dark:selection:bg-white selection:text-white dark:selection:text-black relative transition-colors duration-250">
        
        {/* Interactive Magnetic Custom Cursor */}
        <CustomCursor />

        {/* Ambient Cosmic Particles */}
        <ParticleCanvas />

        {/* Progressive Top Scroll Blur Mask (Fades and blurs content smoothly as user scrolls down) */}
        <div 
          className="pointer-events-none fixed top-0 inset-x-0 h-24 sm:h-32 z-40 backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black_30%,rgba(0,0,0,0.6)_65%,transparent)] transition-all duration-300"
          aria-hidden="true" 
        />

        {/* Minimalist Navigation with Theme Switcher */}
        <Navigation />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <TechSection />
          <ContactSection />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;

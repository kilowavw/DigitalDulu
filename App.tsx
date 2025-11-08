import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import AboutSection from './components/sections/AboutSection';
import PortfolioSection from './components/sections/PortfolioSection';
import WhatWeCanDoSection from './components/sections/WhatWeCanDoSection';
import WhoWeAreSection from './components/sections/WhoWeAreSection'; // Import WhoWeAreSection
import HowWeWorkSection from './components/sections/HowWeWorkSection';
import TechAndAISection from './components/sections/TechAndAISection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

const MainContent: React.FC = () => {
  return (
    <div className="bg-background-white dark:bg-dark-bg text-primary-black dark:text-dark-text font-sans transition-colors duration-300">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <HowWeWorkSection />
        <WhoWeAreSection /> {/* Add WhoWeAreSection here */}
        <WhatWeCanDoSection />
        <PortfolioSection />
        <TechAndAISection />
      </main>
      <Footer />
    </div>
  );
};

export default App;

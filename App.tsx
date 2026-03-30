
import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Certificates } from './components/Certificates';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const navigateTo = (view: 'home' | 'certificates') => {
    if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.location.hash = '';
    } else {
      const el = document.getElementById('certificados');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentView="home" navigateTo={navigateTo} />
      
      <main className="flex-grow">
        <div className="animate-fade-in">
          <Hero />
          <Services />
          <Certificates />
          <About />
          <Contact />
        </div>
      </main>

      <Footer navigateTo={navigateTo} />
    </div>
  );
};

export default App;

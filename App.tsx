
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Certificates } from './components/Certificates';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export type ViewType = 'home' | 'certificates';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  // Controlar el cambio de hash en la URL para navegación directa
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#certificados') {
        setCurrentView('certificates');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Verificar al cargar

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: ViewType) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = '#certificados';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentView={currentView} navigateTo={navigateTo} />
      
      <main className="flex-grow">
        {currentView === 'home' ? (
          <div className="animate-fade-in">
            <Hero />
            <Services />
            <About />
            <Contact />
          </div>
        ) : (
          <div className="animate-fade-in pt-20 bg-slate-50 min-h-[80vh]">
            <Certificates />
          </div>
        )}
      </main>

      <Footer navigateTo={navigateTo} />
    </div>
  );
};

export default App;

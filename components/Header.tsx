
import React, { useState, useEffect } from 'react';
import { BRAND } from '../constants';
import { ViewType } from '../App';

interface HeaderProps {
  currentView: ViewType;
  navigateTo: (view: ViewType) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, navigateTo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isTab: boolean) => {
    if (isTab) {
      e.preventDefault();
      navigateTo('certificates');
    } else {
      if (currentView !== 'home') {
        // Si estamos en certificados y queremos ir a una sección de inicio
        navigateTo('home');
        // El scroll se manejará automáticamente por el ID una vez renderizado
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Inicio', href: '#', isTab: false },
    { name: 'Servicios', href: '#servicios', isTab: false },
    { name: 'Certificados', href: '#certificados', isTab: true },
    { name: 'Nosotros', href: '#nosotros', isTab: false },
    { name: 'Contacto', href: '#contacto', isTab: false },
  ];

  const logoColorClass = isScrolled || currentView === 'certificates' ? 'text-brand-blue' : 'text-slate-800 md:text-white';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || currentView === 'certificates' ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <button onClick={() => navigateTo('home')} className="flex flex-col group transition-transform hover:scale-105 text-left">
          <div className="flex items-baseline">
            <span className={`font-display font-bold text-3xl tracking-tight leading-none ${logoColorClass}`}>
              Pro
            </span>
            <span className="font-display font-bold text-3xl tracking-tight leading-none text-brand-orange">
              lider
            </span>
          </div>
          <div className={`text-[10px] font-bold tracking-[0.3em] uppercase mt-0.5 ${isScrolled || currentView === 'certificates' ? 'text-brand-blue' : 'text-slate-600 md:text-blue-100/90'}`}>
            CONSULTORES
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavLink(e, link.href, link.isTab)}
              className={`font-medium transition-colors hover:text-brand-orange ${
                isScrolled || currentView === 'certificates' ? 'text-slate-600' : 'text-white'
              } ${currentView === 'certificates' && link.isTab ? 'text-brand-orange' : ''}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href={`https://wa.me/51${BRAND.contact.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-orange text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-orange-600 transition-all transform hover:-translate-y-1"
          >
            Campus Virtual
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl ${!(isScrolled || currentView === 'certificates') && !isMobileMenuOpen ? 'text-white' : 'text-brand-blue'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 border-t' : 'max-h-0'}`}>
        <div className="p-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavLink(e, link.href, link.isTab)}
              className={`text-lg font-medium hover:text-brand-blue ${currentView === 'certificates' && link.isTab ? 'text-brand-orange' : 'text-slate-600'}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href={`https://wa.me/51${BRAND.contact.phone}`}
            className="bg-brand-blue text-white px-6 py-3 rounded-xl font-bold text-center"
          >
            Campus Virtual
          </a>
        </div>
      </div>
    </header>
  );
};

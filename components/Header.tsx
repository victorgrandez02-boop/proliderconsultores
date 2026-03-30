
import React, { useState, useEffect } from 'react';
import { BRAND } from '../constants';

interface HeaderProps {
  currentView: 'home' | 'certificates';
  navigateTo: (view: 'home' | 'certificates') => void;
}

export const Header: React.FC<HeaderProps> = ({ navigateTo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#') {
      e.preventDefault();
      navigateTo('home');
    } else if (href === '#certificados') {
      e.preventDefault();
      navigateTo('certificates');
    }
    // Para otros hashes, el navegador manejará el scroll-smooth de forma nativa por el id
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Certificados', href: '#certificados' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const logoColorClass = isScrolled ? 'text-brand-blue' : 'text-slate-800 md:text-white';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
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
          <div className={`text-[10px] font-bold tracking-[0.3em] uppercase mt-0.5 ${isScrolled ? 'text-brand-blue' : 'text-slate-600 md:text-blue-100/90'}`}>
            CONSULTORES
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavLink(e, link.href)}
              className={`font-medium transition-colors hover:text-brand-orange ${
                isScrolled ? 'text-slate-600' : 'text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://aula.proliderconsultores.com/escritorio/"
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
          <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl ${!isScrolled && !isMobileMenuOpen ? 'text-white' : 'text-brand-blue'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 border-t' : 'max-h-0'}`}>
        <div className="p-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavLink(e, link.href)}
              className="text-lg font-medium hover:text-brand-blue text-slate-600"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://aula.proliderconsultores.com/escritorio/"
            className="bg-brand-blue text-white px-6 py-3 rounded-xl font-bold text-center"
          >
            Campus Virtual
          </a>
        </div>
      </div>
    </header>
  );
};

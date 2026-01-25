
import React from 'react';
import { BRAND } from '../constants';

interface FooterProps {
  navigateTo: (view: 'home' | 'certificates') => void;
}

export const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  const handleLink = (e: React.MouseEvent, view: 'home' | 'certificates') => {
    e.preventDefault();
    navigateTo(view);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Branding & Socials */}
          <div className="space-y-6">
            <button onClick={() => navigateTo('home')} className="flex flex-col group text-left">
              <div className="flex items-baseline">
                <span className="font-display font-bold text-3xl tracking-tight leading-none text-white">
                  Pro
                </span>
                <span className="font-display font-bold text-3xl tracking-tight leading-none text-brand-orange">
                  lider
                </span>
              </div>
              <div className="text-[10px] font-bold tracking-[0.3em] uppercase mt-0.5 text-blue-200/80">
                CONSULTORES
              </div>
            </button>
            <p className="text-slate-400 leading-relaxed">
              {BRAND.description} Especialistas en formación humana y profesional en Lima, Perú.
            </p>
            <div className="flex space-x-4">
               {['facebook', 'instagram', 'linkedin', 'whatsapp'].map(social => (
                 <a key={social} href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors text-white">
                    <i className={`fa-brands fa-${social}`}></i>
                 </a>
               ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-4">
              <li><button onClick={(e) => handleLink(e, 'home')} className="hover:text-brand-orange transition-colors">Inicio</button></li>
              <li><a href="#servicios" onClick={(e) => { if(window.location.hash !== '#servicios') handleLink(e, 'home') }} className="hover:text-brand-orange transition-colors">Nuestros Servicios</a></li>
              <li><button onClick={(e) => handleLink(e, 'certificates')} className="hover:text-brand-orange transition-colors">Certificados Oficiales</button></li>
              <li><a href="#nosotros" onClick={(e) => { if(window.location.hash !== '#nosotros') handleLink(e, 'home') }} className="hover:text-brand-orange transition-colors">Sobre Nosotros</a></li>
              <li><a href="#contacto" onClick={(e) => { if(window.location.hash !== '#contacto') handleLink(e, 'home') }} className="hover:text-brand-orange transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6">Contacto Directo</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                 <i className="fa-solid fa-location-dot mt-1 text-brand-orange"></i>
                 <span>{BRAND.contact.address}, Lince</span>
              </li>
              <li className="flex items-center space-x-3">
                 <i className="fa-solid fa-phone text-brand-orange"></i>
                 <span>{BRAND.contact.phone}</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                 <i className="fa-solid fa-envelope text-brand-orange"></i>
                 <span className="break-all">{BRAND.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
           <p>© {new Date().getFullYear()} PROLIDER CONSULTORES. Todos los derechos reservados.</p>
           <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Libro de Reclamaciones</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

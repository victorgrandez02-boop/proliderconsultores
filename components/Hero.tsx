
import React from 'react';
import { BRAND } from '../constants';

export const Hero: React.FC = () => {
  const cards = [
    {
      title: "100% Online",
      subtitle: "Flexibilidad total",
      icon: "fa-laptop",
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
      translate: "translate-y-8"
    },
    {
      title: "Certificación",
      subtitle: "Valor curricular",
      icon: "fa-certificate",
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
      translate: ""
    },
    {
      title: "Salud Mental",
      subtitle: "Enfoque integral",
      icon: "fa-heart-pulse",
      img: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=600&auto=format&fit=crop",
      translate: "translate-y-8"
    },
    {
      title: "Presencial",
      subtitle: "Lince, Lima",
      icon: "fa-user-group",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
      translate: ""
    }
  ];

  return (
    <section className="relative min-h-[95vh] flex items-center pt-24 pb-16 overflow-hidden bg-brand-blue">
      {/* Background Image using CSS to prevent broken icon if load fails */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop')`,
          backgroundColor: '#00619B'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/85 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="text-white space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
            <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase">Líderes en Capacitación 2024</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-[1.1]">
            {BRAND.slogan.split(' ').map((word, i) => (
              <span key={i} className={word === 'Capacitación' || word === 'Psicológica' || word === 'Mental' ? 'text-brand-orange' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-50 max-w-xl leading-relaxed opacity-90 font-light">
            {BRAND.description} <span className="font-semibold">Transformamos vidas</span> a través del conocimiento especializado y el bienestar emocional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={`https://wa.me/51${BRAND.contact.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl shadow-orange-900/30 transition-all flex items-center justify-center space-x-3 group"
            >
              <span>Sabe más</span>
              <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-2"></i>
            </a>
          </div>
        </div>

        {/* Right Content: Enhanced Interactive Cards */}
        <div className="hidden lg:block relative animate-fade-in">
          <div className="grid grid-cols-2 gap-6 p-4">
            {cards.map((card, idx) => (
              <div 
                key={idx}
                className={`group relative h-64 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 transition-all duration-500 hover:scale-[1.03] hover:-rotate-1 ${card.translate}`}
              >
                {/* Card Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${card.img}')` }}
                ></div>
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-lg group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-300">
                      <i className={`fa-solid ${card.icon} text-xl`}></i>
                    </div>
                  </div>
                  
                  <div className="space-y-1 transform transition-transform duration-300 group-hover:-translate-y-2">
                    <h3 className="text-2xl font-bold text-white leading-none">{card.title}</h3>
                    <p className="text-white/70 text-sm font-medium">{card.subtitle}</p>
                    <div className="w-8 h-1 bg-brand-orange rounded-full mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange/20 rounded-full blur-[80px] -z-10 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-blue/40 rounded-full blur-[100px] -z-10"></div>
        </div>
      </div>
    </section>
  );
};

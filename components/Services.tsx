
import React from 'react';
import { SERVICES, BRAND } from '../constants';

export const Services: React.FC = () => {
  return (
    <section id="servicios" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-brand-blue font-bold tracking-widest uppercase text-sm">Nuestros Servicios</h2>
          <h3 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900">Soluciones Integrales para tu Desarrollo</h3>
          <p className="text-slate-600">Ofrecemos modalidades que se adaptan a tus tiempos y necesidades actuales.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              className="group relative p-8 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 opacity-5 rounded-bl-full transition-all duration-300 group-hover:scale-150 ${service.color === 'blue' ? 'bg-brand-blue' : 'bg-brand-orange'}`}></div>
              
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                service.color === 'blue' ? 'bg-blue-100 text-brand-blue' : 'bg-orange-100 text-brand-orange'
              }`}>
                <i className={`fa-solid ${service.icon}`}></i>
              </div>

              <h4 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h4>
              <p className="text-slate-600 mb-2 leading-relaxed flex-grow">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4">
                 <h4 className="text-2xl font-bold">¿Necesitas una propuesta personalizada para tu empresa?</h4>
                 <p className="text-slate-400">Diseñamos programas de capacitación en RRHH a medida de tus objetivos corporativos.</p>
              </div>
              <a 
                href={`https://wa.me/51${BRAND.contact.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold whitespace-nowrap hover:bg-slate-100 transition-colors inline-block text-center"
              >
                 Solicitar Cotización
              </a>
           </div>
           {/* Decor */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
        </div>
      </div>
    </section>
  );
};

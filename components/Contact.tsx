
import React from 'react';
import { BRAND } from '../constants';
import { ObfuscatedEmail } from './ObfuscatedEmail';

export const Contact: React.FC = () => {
  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-brand-blue font-bold tracking-widest uppercase text-sm">Contáctanos</h2>
          <h3 className="text-4xl font-display font-extrabold text-slate-900 leading-tight">¿Tienes alguna duda? Estamos para ayudarte</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">Nuestro equipo está listo para brindarte toda la información que necesites sobre nuestros cursos y atenciones.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue text-2xl">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Ubicación</h4>
              <p className="text-slate-600">{BRAND.contact.address}<br/>{BRAND.contact.city}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue text-2xl">
              <i className="fa-solid fa-phone"></i>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Teléfono</h4>
              <p className="text-slate-600">{BRAND.contact.phone}</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue text-2xl">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Correo Electrónico</h4>
              <p className="text-slate-600">
                <ObfuscatedEmail user={BRAND.contact.emailUser} domain={BRAND.contact.emailDomain} />
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto p-8 bg-brand-blue/5 rounded-3xl border border-brand-blue/10 text-center">
           <h4 className="font-bold text-brand-blue mb-6 text-xl">Horario de Atención</h4>
           <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-slate-600">
              <div className="space-y-2">
                <span className="block text-sm uppercase tracking-wider font-semibold">Lunes a Viernes</span> 
                <span className="block font-bold text-slate-900 text-lg">9:00 AM - 5:00 PM</span>
              </div>
              <div className="hidden sm:block w-px h-12 bg-brand-blue/20"></div>
              <div className="space-y-2">
                <span className="block text-sm uppercase tracking-wider font-semibold">Sábados</span> 
                <span className="block font-bold text-slate-900 text-lg">9:00 AM - 1:00 PM</span>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};


import React from 'react';
import { BRAND } from '../constants';

export const About: React.FC = () => {
  return (
    <section id="nosotros" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Image Grid Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* Image 1: Professional Latina Psychologist/Leader */}
                <div className="rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" 
                    className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500" 
                    alt="Líder Profesional Latina" 
                  />
                </div>
                {/* Image 2: Latino team collaboration / Training */}
                <div className="rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" 
                    className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500" 
                    alt="Capacitación de equipo" 
                  />
                </div>
              </div>
              
              <div className="space-y-6 pt-12">
                {/* Image 3: Educational context / Presentation */}
                <div className="rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200">
                  <img 
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop" 
                    className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500" 
                    alt="Ambiente educativo" 
                  />
                </div>
                {/* Image 4: Latino consultant in professional setting */}
                <div className="rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200">
                  <img 
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop" 
                    className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500" 
                    alt="Consultoría profesional" 
                  />
                </div>
              </div>
            </div>
            
            {/* Experience Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-orange px-8 py-6 rounded-[2rem] shadow-2xl border-[6px] border-white text-white text-center min-w-[220px] z-20">
              <span className="block text-5xl font-extrabold mb-1">+10</span>
              <span className="text-sm font-bold uppercase tracking-wider leading-tight">Años de experiencia profesional</span>
            </div>

            {/* Decorative background blobs for aesthetics */}
            <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-brand-orange/10 rounded-full blur-3xl"></div>
          </div>

          {/* Text Content Side */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <div className="inline-block bg-orange-100 px-4 py-1.5 rounded-full">
                <h2 className="text-brand-orange font-bold tracking-widest uppercase text-[10px]">Sobre Nosotros</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 leading-tight">Expertos en Capacitación de Psicología y Educación</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                {BRAND.description} En <span className="text-brand-blue font-bold">PROLIDER CONSULTORES</span>, creemos que la educación y la salud mental son pilares fundamentales para el éxito en cualquier ámbito de la vida.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-brand-blue mb-4">
                   <i className="fa-solid fa-bullseye text-xl"></i>
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Misión</h4>
                <p className="text-sm text-slate-500">Democratizar el acceso a educación psicológica de alta calidad.</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-brand-orange mb-4">
                   <i className="fa-solid fa-eye text-xl"></i>
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Visión</h4>
                <p className="text-sm text-slate-500">Ser referentes regionales en capacitación integral y bienestar.</p>
              </div>
            </div>

            <ul className="grid sm:grid-cols-2 gap-y-4 gap-x-6">
              {[
                "Profesionales altamente calificados",
                "Metodologías de enseñanza innovadoras",
                "Certificaciones reconocidas en el mercado",
                "Seguimiento personalizado de cada alumno"
              ].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-slate-700 font-medium bg-white p-3 rounded-2xl border border-slate-50 shadow-sm">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px]">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

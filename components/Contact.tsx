
import React, { useState, useEffect } from 'react';
import { BRAND } from '../constants';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    interes: 'Clases Online',
    mensaje: '',
    _honeypot: '' // Campo invisible para bots
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    let timer: number;
    if (cooldown > 0) {
      timer = window.setInterval(() => setCooldown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Honeypot check
    if (formData._honeypot) {
      console.warn("Bot detected via honeypot");
      return;
    }

    // 2. Time validation (Min 4 seconds to fill form)
    const timeTaken = (Date.now() - startTime) / 1000;
    if (timeTaken < 4) {
      alert("Por favor, tómate un momento para completar el formulario.");
      return;
    }

    // 3. Cooldown check
    if (cooldown > 0) {
      alert(`Por favor, espera ${cooldown} segundos antes de enviar otro mensaje.`);
      return;
    }

    setIsSubmitting(true);
    
    const subject = encodeURIComponent(`Consulta desde la Web: ${formData.interes}`);
    const body = encodeURIComponent(
      `Nombre: ${formData.nombre}\n` +
      `Teléfono: ${formData.telefono}\n` +
      `Interés: ${formData.interes}\n\n` +
      `Mensaje:\n${formData.mensaje}`
    );

    window.location.href = `mailto:${BRAND.contact.email}?subject=${subject}&body=${body}`;
    
    setCooldown(60); // 1 minuto de cooldown
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-brand-blue font-bold tracking-widest uppercase text-sm">Contáctanos</h2>
              <h3 className="text-4xl font-display font-extrabold text-slate-900 leading-tight">¿Tienes alguna duda? Estamos para ayudarte</h3>
              <p className="text-slate-600">Nuestro equipo está listo para brindarte toda la información que necesites sobre nuestros cursos y atenciones.</p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-brand-blue text-xl flex-shrink-0">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Ubicación</h4>
                  <p className="text-slate-600">{BRAND.contact.address}, {BRAND.contact.city}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-brand-blue text-xl flex-shrink-0">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Teléfono</h4>
                  <p className="text-slate-600">{BRAND.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-brand-blue text-xl flex-shrink-0">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Correo Electrónico</h4>
                  <p className="text-slate-600">{BRAND.contact.email}</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-brand-blue/5 rounded-3xl border border-brand-blue/10">
               <h4 className="font-bold text-brand-blue mb-4">Horario de Atención</h4>
               <ul className="space-y-2 text-slate-600">
                  <li className="flex justify-between border-b border-slate-100 pb-2">
                    <span>Lunes a Viernes:</span> 
                    <span className="font-semibold text-slate-900">9:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between pt-1">
                    <span>Sábados:</span> 
                    <span className="font-semibold text-slate-900">9:00 AM - 1:00 PM</span>
                  </li>
               </ul>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-slate-100">
             <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Honeypot field (hidden from users) */}
                <div className="hidden" aria-hidden="true">
                  <input 
                    type="text" 
                    name="_honeypot" 
                    value={formData._honeypot} 
                    onChange={handleChange} 
                    tabIndex={-1} 
                    autoComplete="off" 
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Nombre Completo</label>
                    <input 
                      type="text" 
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Ej. Juan Perez" 
                      className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Teléfono / WhatsApp</label>
                    <input 
                      type="tel" 
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      placeholder="987 654 321" 
                      className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Interés</label>
                  <select 
                    name="interes"
                    value={formData.interes}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                  >
                    <option>Clases Online</option>
                    <option>Atención Psicológica</option>
                    <option>Clases Presenciales</option>
                    <option>Capacitación Corporativa</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Mensaje</label>
                  <textarea 
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={4} 
                    placeholder="Cuéntanos cómo podemos ayudarte..." 
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting || cooldown > 0}
                  className="w-full bg-brand-orange hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cooldown > 0 ? `Esperar ${cooldown}s` : 'Enviar Mensaje'}
                </button>
                <p className="text-center text-xs text-slate-400">
                   Al enviar se abrirá tu gestor de correo para completar el envío.
                </p>
             </form>
          </div>
        </div>
      </div>
    </section>
  );
};

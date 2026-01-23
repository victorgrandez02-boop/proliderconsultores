
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BRAND } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: '¡Hola! Soy el asistente virtual de Prolider Consultores. ¿En qué puedo ayudarte hoy?'}
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const sanitizeInput = (str: string) => {
    return str.replace(/[<>]/g, '').slice(0, 250); // Eliminar tags básicos y limitar a 250 caracteres
  };

  const handleSend = async () => {
    const now = Date.now();
    
    // Rate limiting: 3 segundos entre mensajes
    if (now - lastMessageTime < 3000) {
      return;
    }

    if (!input.trim() || loading) return;
    
    const userMsg = sanitizeInput(input.trim());
    setInput('');
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setLoading(true);
    setLastMessageTime(now);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Eres el asistente virtual de la empresa ${BRAND.name}.
        Información de la empresa:
        Slogan: ${BRAND.slogan}
        Descripción: ${BRAND.description}
        Servicios: Clases online, Atención psicológica, Clases presenciales.
        Dirección: ${BRAND.contact.address}
        Teléfono: ${BRAND.contact.phone}
        Email: ${BRAND.contact.email}
        Responde de forma amable y profesional en español. Mantén tus respuestas concisas (máximo 3 frases).
        Si preguntan por el Campus Virtual, indica que pueden acceder mediante el botón naranja de la cabecera o contactando por WhatsApp.
        El usuario pregunta: ${userMsg}`,
      });

      const botText = response.text || 'Lo siento, no pude procesar tu solicitud.';
      setMessages(prev => [...prev, {role: 'bot', text: botText}]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, {role: 'bot', text: 'Lo siento, hubo un error conectando con mi sistema. Por favor contáctanos directamente por WhatsApp.'}]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="w-80 md:w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-200 mb-4 flex flex-col overflow-hidden animate-fade-in-up">
           <div className="bg-brand-blue p-4 text-white flex justify-between items-center">
              <div className="flex items-center space-x-2">
                 <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-robot"></i>
                 </div>
                 <div>
                    <h4 className="font-bold text-sm leading-none">Asistente Prolider</h4>
                    <span className="text-[10px] opacity-70">En línea ahora</span>
                 </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70">
                 <i className="fa-solid fa-xmark"></i>
              </button>
           </div>
           
           <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                     m.role === 'user' ? 'bg-brand-blue text-white rounded-tr-none' : 'bg-white shadow-sm border text-slate-700 rounded-tl-none'
                   }`}>
                      {m.text}
                   </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                   <div className="bg-white shadow-sm border p-3 rounded-2xl rounded-tl-none space-x-1 flex">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                   </div>
                </div>
              )}
           </div>

           <div className="p-3 border-t bg-white flex flex-col space-y-2">
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe tu mensaje..."
                  maxLength={250}
                  className="flex-grow bg-slate-100 px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue/30"
                />
                <button 
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 bg-brand-orange text-white rounded-xl flex items-center justify-center hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                   <i className="fa-solid fa-paper-plane text-sm"></i>
                </button>
              </div>
              <div className="flex justify-between items-center px-1">
                <span className={`text-[9px] ${input.length >= 240 ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
                  {input.length}/250 caracteres
                </span>
                <span className="text-[9px] text-slate-400">Powered by Prolider AI</span>
              </div>
           </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat con asistente"
        className="w-16 h-16 bg-brand-blue text-white rounded-full shadow-2xl flex items-center justify-center text-2xl hover:scale-110 transition-transform active:scale-95 group relative"
      >
        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-comment-dots'}`}></i>
        {!isOpen && (
           <span className="absolute right-full mr-4 bg-slate-800 text-white text-xs py-2 px-4 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              ¿En qué podemos ayudarte?
           </span>
        )}
      </button>
    </div>
  );
};

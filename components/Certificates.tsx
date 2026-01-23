
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const URL_CERTIFICADOS = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvNLRnNnFr2K8XupkMGL6fqERIJRuLL2HijIViLn8Udah9IpwwuZmkw5hiRjmCb-lJ7rN0JgomCnUY/pub?output=xlsx';
const URL_ACTIVACION = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTPlmHnRLdNhhBjN6w1HOJJU5dDm5p9dfNpjwwvmprno-FQcWTq6jy1d2hVmXrl7sJRRIpG42BvBaoj/pub?output=xlsx';

interface CertificateResult {
  label: string;
  value: string;
}

export const Certificates: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'active' | 'expired' | 'error'>('checking');
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{valid: boolean, data?: CertificateResult[]} | null>(null);

  useEffect(() => {
    checkVigencia();
  }, []);

  const checkVigencia = async () => {
    try {
      const res = await fetch(URL_ACTIVACION);
      const ab = await res.arrayBuffer();
      const wb = XLSX.read(ab, { type: 'buffer', cellDates: true });
      const data = XLSX.utils.sheet_to_json<any[]>(wb.Sheets[wb.SheetNames[0]], { header: 1 });
      
      const fechaVencimiento = new Date(data[1][2]); // Celda C2
      const hoy = new Date();
      hoy.setHours(0,0,0,0);
      fechaVencimiento.setHours(0,0,0,0);

      if (hoy <= fechaVencimiento) {
        setStatus('active');
      } else {
        setStatus('expired');
      }
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigo.trim() || status !== 'active') return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(URL_CERTIFICADOS);
      const ab = await res.arrayBuffer();
      const wb = XLSX.read(ab, { type: 'buffer', cellDates: true });
      const data = XLSX.utils.sheet_to_json<any>(wb.Sheets[wb.SheetNames[0]]);
      
      if (data.length === 0) throw new Error("No data");

      const headers = Object.keys(data[0]);
      const colA = headers[0];
      const registro = data.find(r => String(r[colA]).toLowerCase() === codigo.trim().toLowerCase());

      if (registro) {
        const extractedData: CertificateResult[] = [];
        for (let i = 1; i <= 6; i++) {
          const h = headers[i];
          let val = registro[h] || '---';
          if (val instanceof Date) val = val.toLocaleDateString('es-PE');
          extractedData.push({ label: h, value: String(val) });
        }
        setResult({ valid: true, data: extractedData });
      } else {
        setResult({ valid: false });
      }
    } catch (e) {
      console.error(e);
      alert("Error técnico al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="certificados" className="py-12 md:py-20 bg-slate-50 relative overflow-hidden">
      {/* Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <h2 className="text-brand-blue font-bold tracking-widest uppercase text-xs">Consulta de Registros</h2>
            <h3 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 leading-tight">Sistema de Certificación</h3>
            <p className="text-slate-500 max-w-lg mx-auto">Verifica la validez de tus documentos académicos emitidos por Prolider Consultores.</p>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 transition-all">
            <div className="bg-brand-blue p-8 text-white text-center">
              <h4 className="text-lg font-bold uppercase tracking-wider mb-1">Verificación de Autenticidad</h4>
              <p className="text-blue-100 text-xs opacity-80">Cumpliendo con los estándares de transparencia del Estado Peruano</p>
            </div>

            <div className="p-6 md:p-12 space-y-8">
              <div className="flex justify-center">
                {status === 'checking' && (
                  <span className="bg-slate-100 text-slate-500 px-6 py-2 rounded-full text-[10px] font-bold animate-pulse">
                    SINCRONIZANDO SERVIDOR...
                  </span>
                )}
                {status === 'active' && (
                  <span className="bg-green-50 text-green-600 border border-green-100 px-6 py-2 rounded-full text-[10px] font-bold">
                    <i className="fa-solid fa-circle-check mr-2"></i> SISTEMA ACTIVO Y VIGENTE
                  </span>
                )}
                {(status === 'expired' || status === 'error') && (
                  <span className="bg-red-50 text-red-600 border border-red-100 px-6 py-2 rounded-full text-[10px] font-bold">
                    <i className="fa-solid fa-circle-exclamation mr-2"></i> ACCESO RESTRINGIDO
                  </span>
                )}
              </div>

              {status === 'active' ? (
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-grow relative">
                    <i className="fa-solid fa-key absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
                    <input 
                      type="text" 
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value)}
                      placeholder="Ingrese código de documento..." 
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue transition-all text-lg font-medium"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={loading || !codigo.trim()}
                    className="bg-brand-blue hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-brand-blue/20 disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <i className="fa-solid fa-circle-notch animate-spin"></i>
                    ) : (
                      <>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <span>VALIDAR</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="p-8 bg-red-50/50 border-2 border-dashed border-red-100 rounded-3xl text-center space-y-2">
                  <p className="text-red-600 font-bold uppercase tracking-tight">Servicio Suspendido</p>
                  <p className="text-slate-500 text-xs">Por favor, comuníquese con el área de soporte para más información.</p>
                </div>
              )}

              {result && (
                <div className="animate-fade-in-up">
                  {result.valid ? (
                    <div className="bg-brand-blue/[0.02] border border-brand-blue/10 rounded-3xl p-6 md:p-10 space-y-8">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-xl">
                          <i className="fa-solid fa-shield-check"></i>
                        </div>
                        <div>
                          <h5 className="text-xl font-bold text-slate-900">Documento Verificado</h5>
                          <p className="text-green-600 text-xs font-bold uppercase tracking-widest">Información Oficial Confirmada</p>
                        </div>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
                        {result.data?.map((item, idx) => (
                          <div key={idx} className="border-b border-slate-100 pb-2">
                            <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-widest mb-1">{item.label}</span>
                            <span className="block font-bold text-slate-700">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white border border-red-100 rounded-3xl p-8 text-center space-y-4 shadow-lg">
                      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto text-2xl">
                        <i className="fa-solid fa-search-minus"></i>
                      </div>
                      <h5 className="text-xl font-bold text-red-900 uppercase">Sin coincidencias</h5>
                      <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                        El código <span className="font-mono font-bold text-red-600">"{codigo}"</span> no se encuentra en nuestra base de datos. Verifique mayúsculas, minúsculas y caracteres especiales.
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-8 border-t border-slate-100">
                <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <i className="fa-solid fa-circle-info text-brand-blue mt-1"></i>
                  <p className="text-[10px] text-slate-500 leading-relaxed text-justify">
                    <strong>Aviso Legal:</strong> La información contenida en este sistema es confidencial y para fines de validación institucional. Prolider Consultores garantiza que los datos mostrados corresponden fielmente a los registros físicos y digitales de nuestra institución académica. Para cualquier rectificación, contactar al área administrativa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

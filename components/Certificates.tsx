
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
    <section id="certificados" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-brand-blue font-bold tracking-widest uppercase text-sm">Transparencia Oficial</h2>
            <h3 className="text-4xl font-display font-extrabold text-slate-900 leading-tight">Verificación de Autenticidad</h3>
            <p className="text-slate-600">Valida tus certificados y constancias emitidas por nuestra institución de manera inmediata.</p>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 transition-all hover:shadow-brand-blue/5">
            <div className="bg-brand-blue p-8 text-white text-center">
              <h4 className="text-xl font-bold uppercase tracking-wider mb-2">Sistema de Validación</h4>
              <p className="text-blue-100 text-sm opacity-80">Consulta registros oficiales en tiempo real</p>
            </div>

            <div className="p-8 md:p-12 space-y-8">
              <div className="flex justify-center">
                {status === 'checking' && (
                  <span className="bg-slate-100 text-slate-500 px-6 py-2 rounded-full text-xs font-bold animate-pulse">
                    VALIDANDO SERVIDOR...
                  </span>
                )}
                {status === 'active' && (
                  <span className="bg-green-100 text-green-700 border border-green-200 px-6 py-2 rounded-full text-xs font-bold">
                    <i className="fa-solid fa-circle-check mr-2"></i> SISTEMA ACTIVO
                  </span>
                )}
                {(status === 'expired' || status === 'error') && (
                  <span className="bg-red-100 text-red-700 border border-red-200 px-6 py-2 rounded-full text-xs font-bold">
                    <i className="fa-solid fa-circle-exclamation mr-2"></i> SISTEMA SUSPENDIDO
                  </span>
                )}
              </div>

              {status === 'active' ? (
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="text" 
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    placeholder="Ingrese código del documento..." 
                    className="flex-grow px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue transition-all text-lg"
                  />
                  <button 
                    type="submit"
                    disabled={loading || !codigo.trim()}
                    className="bg-brand-blue hover:bg-slate-800 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-brand-blue/20 disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <i className="fa-solid fa-circle-notch animate-spin"></i>
                    ) : (
                      <>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <span>BUSCAR</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="p-6 bg-red-50 border-2 border-dashed border-red-200 rounded-2xl text-center">
                  <p className="text-red-600 font-bold uppercase tracking-tight">Acceso Suspendido Temporalmente</p>
                </div>
              )}

              {result && (
                <div className="animate-fade-in-up">
                  {result.valid ? (
                    <div className="bg-green-50/50 border border-green-200 rounded-3xl p-8 space-y-6">
                      <div className="flex items-center space-x-3 text-green-700">
                        <i className="fa-solid fa-certificate text-2xl"></i>
                        <h5 className="text-xl font-bold">CERTIFICADO VÁLIDO</h5>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        {result.data?.map((item, idx) => (
                          <div key={idx} className="border-b border-green-900/10 pb-2">
                            <span className="block text-[10px] uppercase font-bold text-green-800/60 tracking-widest">{item.label}</span>
                            <span className="block font-semibold text-slate-800">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-100 rounded-3xl p-8 text-center space-y-4">
                      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                      </div>
                      <h5 className="text-xl font-bold text-red-900 uppercase">Código no encontrado</h5>
                      <p className="text-red-700/80 text-sm max-w-sm mx-auto leading-relaxed">
                        El código ingresado no figura en nuestra base de datos oficial. Por favor, verifique el código e intente nuevamente.
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-8 border-t border-slate-100">
                <div className="flex items-start space-x-4">
                  <i className="fa-solid fa-shield-halved text-slate-400 mt-1"></i>
                  <p className="text-[11px] text-slate-400 leading-relaxed text-justify">
                    <strong>Aviso de Seguridad:</strong> Esta plataforma permite la validación de documentos emitidos institucionalmente. Los datos mostrados corresponden a la información oficial registrada en nuestra base de datos. Para efectos legales en entidades públicas del Perú, este sistema cumple con los criterios de transparencia y acceso a la información según la normativa vigente del Estado.
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

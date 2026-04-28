import { useState } from 'react';
import { useNavigate } from 'react-router';
import { WebsiteLayout } from '../../components/website/WebsiteLayout';
import { ChevronRight, CheckCircle2, MapPin, Mail, Phone } from 'lucide-react';

export function WebsiteContactScreen() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [contactMethod, setContactMethod] = useState<'bel' | 'mail'>('mail');
  const [form, setForm] = useState({ parentName: '', childName: '', email: '', phone: '', location: '', reachability: '', subject: '', message: '' });

  if (submitted) {
    return (
      <WebsiteLayout>
        <div className="max-w-[600px] mx-auto text-center py-24 px-4">
          <div className="w-20 h-20 rounded-full bg-[#27AE60]/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} color="#27AE60" />
          </div>
          <h2 className="text-[#1A1A2E] mb-3" style={{ fontSize: 28, fontWeight: 700 }}>Bericht verzonden!</h2>
          <p className="text-[#6B7B94] mb-6" style={{ fontSize: 15 }}>Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.</p>
          <button onClick={() => navigate('/website')} className="px-6 py-3 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)', fontSize: 15, fontWeight: 700 }}>Terug naar home</button>
        </div>
      </WebsiteLayout>
    );
  }

  return (
    <WebsiteLayout>
      {/* Hero */}
      <section className="relative h-[200px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)' }}>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 w-full">
            <h1 className="text-white" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>Contact</h1>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full block"><path d="M0,20 C360,40 720,0 1080,20 C1260,30 1380,35 1440,30 L1440,40 L0,40 Z" fill="white" /></svg>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-4 mb-4">
        <div className="flex items-center gap-2 text-[#8E9BB3]" style={{ fontSize: 13 }}>
          <button onClick={() => navigate('/website')} className="hover:text-[#0365C4]">Home</button>
          <ChevronRight size={12} />
          <span className="text-[#1A1A2E]" style={{ fontWeight: 600 }}>Contact</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="text-[#1A1A2E] mb-6" style={{ fontSize: 28, fontWeight: 700 }}>Neem contact op</h2>
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-white rounded-2xl p-6 lg:p-8 space-y-4" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #F0F4FA' }}>
              <input type="text" placeholder="Naam ouders" required value={form.parentName} onChange={e => setForm({...form, parentName: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] transition-colors text-[#1A1A2E] placeholder:text-[#A0AEC0]" style={{ fontSize: 14 }} />
              <input type="text" placeholder="Voor- en achternaam kind" value={form.childName} onChange={e => setForm({...form, childName: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] transition-colors text-[#1A1A2E] placeholder:text-[#A0AEC0]" style={{ fontSize: 14 }} />
              <input type="email" placeholder="E-mailadres" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] transition-colors text-[#1A1A2E] placeholder:text-[#A0AEC0]" style={{ fontSize: 14 }} />
              <input type="tel" placeholder="Telefoonnummer" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] transition-colors text-[#1A1A2E] placeholder:text-[#A0AEC0]" style={{ fontSize: 14 }} />
              <select value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] transition-colors text-[#1A1A2E]" style={{ fontSize: 14 }}>
                <option value="">Locatie</option>
                {['De Bilt - Utrecht','Garderen','Mierlo','Nijkerk','Wolfheze','Dordrecht','Soest'].map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <input type="text" placeholder="Bereikbaarheid" value={form.reachability} onChange={e => setForm({...form, reachability: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] transition-colors text-[#1A1A2E] placeholder:text-[#A0AEC0]" style={{ fontSize: 14 }} />
              <input type="text" placeholder="Onderwerp" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] transition-colors text-[#1A1A2E] placeholder:text-[#A0AEC0]" style={{ fontSize: 14 }} />
              <textarea placeholder="Bericht" rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] transition-colors text-[#1A1A2E] placeholder:text-[#A0AEC0] resize-none" style={{ fontSize: 14 }} />
              
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="method" checked={contactMethod === 'bel'} onChange={() => setContactMethod('bel')} className="accent-[#FF5C00]" />
                  <span className="text-[#1A1A2E]" style={{ fontSize: 14 }}>Bel mij terug</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="method" checked={contactMethod === 'mail'} onChange={() => setContactMethod('mail')} className="accent-[#FF5C00]" />
                  <span className="text-[#1A1A2E]" style={{ fontSize: 14 }}>Mail mij terug</span>
                </label>
              </div>

              <button type="submit" className="px-8 py-3.5 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)', fontSize: 15, fontWeight: 700, boxShadow: '0 8px 24px rgba(255,92,0,0.3)' }}>
                Verzenden
              </button>
            </form>
          </div>

          {/* Info sidebar */}
          <div className="space-y-6">
            <div className="bg-[#F4F7FC] rounded-2xl p-6">
              <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 18, fontWeight: 700 }}>Contactgegevens</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} color="#0365C4" className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Adres</p>
                    <p className="text-[#6B7B94]" style={{ fontSize: 13 }}>Broerswetering 36, 3752AM Bunschoten-Spakenburg</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} color="#0365C4" className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>E-mail</p>
                    <p className="text-[#6B7B94]" style={{ fontSize: 13 }}>info@zwemschoolsnorkeltje.nl</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} color="#0365C4" className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Telefoon</p>
                    <p className="text-[#6B7B94]" style={{ fontSize: 13 }}>Via contactformulier</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#F4F7FC] rounded-2xl p-6">
              <h3 className="text-[#1A1A2E] mb-2" style={{ fontSize: 18, fontWeight: 700 }}>Bedrijfsgegevens</h3>
              <p className="text-[#6B7B94]" style={{ fontSize: 13, lineHeight: 1.8 }}>
                Zwemschool Snorkeltje<br />
                Walter van de Geest h.o.d.n.<br />
                KvK: 63317419
              </p>
            </div>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}

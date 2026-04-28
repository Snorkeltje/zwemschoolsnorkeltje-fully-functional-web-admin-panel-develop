import { useNavigate } from 'react-router';
import { WebsiteLayout } from '../../components/website/WebsiteLayout';
import { ChevronRight, MapPin, Clock, Heart } from 'lucide-react';

const vacatures = [
  { title: 'Zwemleraar/-lerares', location: 'Diverse locaties', type: 'Parttime / Flexibel', desc: 'Ben jij enthousiast, sportief en wil je kinderen leren zwemmen? Wij zijn op zoek naar gekwalificeerde zwemleraren voor onze locaties.' },
  { title: 'Survival zwemleraar/-lerares', location: 'De Bilt - Utrecht / Dordrecht', type: 'Parttime', desc: 'Voor onze survival lessen zijn we op zoek naar een ervaren survival instructeur.' },
];

export function WebsiteVacaturesScreen() {
  const navigate = useNavigate();

  return (
    <WebsiteLayout>
      <section className="relative h-[200px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)' }}>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 w-full">
            <h1 className="text-white" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>Vacatures</h1>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full block"><path d="M0,20 C360,40 720,0 1080,20 C1260,30 1380,35 1440,30 L1440,40 L0,40 Z" fill="white" /></svg>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-4">
        <div className="flex items-center gap-2 text-[#8E9BB3]" style={{ fontSize: 13 }}>
          <button onClick={() => navigate('/website')} className="hover:text-[#0365C4]">Home</button>
          <ChevronRight size={12} />
          <span className="text-[#1A1A2E]" style={{ fontWeight: 600 }}>Vacatures</span>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 sm:px-8 pb-16">
        <p className="text-[#4A5568] mb-8" style={{ fontSize: 15, lineHeight: 1.7 }}>
          Wil jij onderdeel worden van het Snorkeltje team? Bekijk onze openstaande vacatures hieronder. Staat jouw functie er niet bij? Stuur dan een open sollicitatie via onze contactpagina.
        </p>

        <div className="space-y-6">
          {vacatures.map((v, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 lg:p-8" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #F0F4FA' }}>
              <h3 className="text-[#1A1A2E] mb-3" style={{ fontSize: 22, fontWeight: 700 }}>{v.title}</h3>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-[#6B7B94]" style={{ fontSize: 13 }}>
                  <MapPin size={14} /> {v.location}
                </div>
                <div className="flex items-center gap-1.5 text-[#6B7B94]" style={{ fontSize: 13 }}>
                  <Clock size={14} /> {v.type}
                </div>
              </div>
              <p className="text-[#4A5568] mb-5" style={{ fontSize: 14, lineHeight: 1.6 }}>{v.desc}</p>
              <button onClick={() => navigate('/website/contact')} className="px-6 py-2.5 rounded-lg text-white" style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)', fontSize: 14, fontWeight: 700 }}>
                Solliciteer nu
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#F4F7FC] rounded-2xl p-8 text-center">
          <Heart size={32} color="#FF5C00" className="mx-auto mb-4" />
          <h3 className="text-[#1A1A2E] mb-2" style={{ fontSize: 20, fontWeight: 700 }}>Open sollicitatie?</h3>
          <p className="text-[#6B7B94] mb-4" style={{ fontSize: 14 }}>Neem contact met ons op via de contactpagina.</p>
          <button onClick={() => navigate('/website/contact')} className="px-6 py-2.5 rounded-lg text-[#0365C4]" style={{ fontSize: 14, fontWeight: 700, background: '#E8F4FD' }}>
            Contact opnemen
          </button>
        </div>
      </div>
    </WebsiteLayout>
  );
}

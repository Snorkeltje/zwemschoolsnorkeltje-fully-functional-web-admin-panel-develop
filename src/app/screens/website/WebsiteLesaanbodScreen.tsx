import { useParams, useNavigate } from 'react-router';
import { WebsiteLayout } from '../../components/website/WebsiteLayout';
import { ChevronRight, Users, Clock, Award, Star, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

const learnImg = 'https://images.unsplash.com/photo-1662977015922-740114372ff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGxlYXJuaW5nJTIwc3dpbSUyMGluc3RydWN0b3J8ZW58MXx8fHwxNzc0NTMwNjgzfDA&ixlib=rb-4.1.0&q=80&w=1080';
const poolImg = 'https://images.unsplash.com/photo-1770967307107-446055488c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBob3RlbCUyMHN3aW1taW5nJTIwcG9vbCUyMGJsdWUlMjB3YXRlcnxlbnwxfHx8fDE3NzQ1MzA2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080';

const content: Record<string, { title: string; subtitle: string; img: string; badge: string; badgeColor: string; intro: string; bullets: string[]; pricing: { type: string; price: string }[]; locations: string[] }> = {
  'abc-zwemles': {
    title: 'ABC Zwemles',
    subtitle: 'De gouden zwemles methode',
    img: learnImg,
    badge: 'POPULAIR',
    badgeColor: '#FF5C00',
    intro: 'Walter zag in zijn beginjaren als zwemleraar hoe een reguliere zwemles wordt gegeven, besloot dat dit beter kon en ging op onderzoek uit. Door veel te kijken, te praten en gewoon te ontdekken wat werkt, rolde er een gouden zwemles methode uit.',
    bullets: [
      'Wij staan naast de kinderen in het water. Zo leert het kind snel te vertrouwen op het water en op zichzelf.',
      'Jouw zwemles, jouw zwemtijd. Leren zwemmen is ook doorzwemmen. Hoe kun je oefenen als je continu op je beurt moet wachten?',
      'Wij zien alles! Geen zwemslag ontgaat ons, want we staan ernaast. Daarom leert ieder kind zwemmen, precies zoals het hoort.',
      'Zwemmen op je snelst. Ieder kind is uniek en ieder uniek kind mag leren zwemmen in zijn eigen tempo. Maar met onze 100% aandacht kan niemand sneller leren zwemmen.',
    ],
    pricing: [
      { type: '1-op-1 zwemles', price: '€38,00 per les' },
      { type: '1-op-2 zwemles', price: '€27,00 per les (p.p.)' },
      { type: 'Inschrijfgeld (eenmalig)', price: '€25,00' },
    ],
    locations: ['De Bilt - Utrecht', 'Garderen', 'Mierlo', 'Nijkerk', 'Wolfheze', 'Dordrecht', 'Soest'],
  },
  'mini-survival': {
    title: 'Mini Survival Zwemles',
    subtitle: 'Veiligheid in het water',
    img: poolImg,
    badge: 'SURVIVAL',
    badgeColor: '#00C1FF',
    intro: 'De Mini Survival zwemles is speciaal voor kinderen die al een zwemdiploma hebben. Kinderen leren hoe ze zich moeten redden in onverwachte situaties in het water. Veiligheid staat altijd voorop!',
    bullets: [
      'Gericht op zelfredzaamheid in het water bij onverwachte situaties.',
      'Zwemmen met kleding aan — leren hoe het voelt en hoe je je moet bewegen.',
      'Onderdeel van het ENVOZ diplomasysteem (internationaal IFSTA erkend).',
      'Na het behalen van het A en/of B diploma kan je starten met mini-survival.',
    ],
    pricing: [
      { type: 'Mini-survival zwemles', price: '€25,00 per les' },
      { type: 'Inschrijfgeld (eenmalig)', price: '€25,00' },
    ],
    locations: ['De Bilt - Utrecht', 'Dordrecht'],
  },
};

export function WebsiteLesaanbodScreen() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = content[slug || 'abc-zwemles'] || content['abc-zwemles'];

  return (
    <WebsiteLayout>
      <section className="relative h-[300px] lg:h-[380px] overflow-hidden">
        <ImageWithFallback src={data.img} alt={data.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(3,101,196,0.85), rgba(0,193,255,0.7))' }} />
        <div className="absolute inset-0 flex flex-col justify-end pb-12">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 w-full">
            <span className="inline-block px-3 py-1.5 rounded-full text-white mb-4" style={{ background: data.badgeColor, fontSize: 12, fontWeight: 700 }}>{data.badge}</span>
            <h1 className="text-white mb-2" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800 }}>{data.title}</h1>
            <p className="text-white/80" style={{ fontSize: 18 }}>{data.subtitle}</p>
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
          <span className="text-[#1A1A2E]" style={{ fontWeight: 600 }}>{data.title}</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="text-[#4A5568] mb-6" style={{ fontSize: 15, lineHeight: 1.8 }}>{data.intro}</p>
            
            <blockquote className="border-l-4 border-[#FF5C00] pl-4 my-8">
              <p className="text-[#1A1A2E] italic" style={{ fontSize: 15, lineHeight: 1.7 }}>
                "Wij halen het beste eruit en zijn enthousiast over iedere vordering, maar het gaat erom dat het kind met vertrouwen in het water ligt!"
              </p>
              <p className="text-[#8E9BB3] mt-2" style={{ fontSize: 13 }}>Walter van de Geest, eigenaar en zwemleraar</p>
            </blockquote>

            <div className="space-y-4 mb-8">
              {data.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} color="#27AE60" className="flex-shrink-0 mt-0.5" />
                  <span className="text-[#4A5568]" style={{ fontSize: 14, lineHeight: 1.6 }}>{b}</span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 22, fontWeight: 700 }}>Tarieven</h3>
            <div className="bg-[#F4F7FC] rounded-xl overflow-hidden">
              {data.pricing.map((p, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-4" style={{ borderTop: i > 0 ? '1px solid #E8ECF4' : 'none' }}>
                  <span className="text-[#1A1A2E]" style={{ fontSize: 15 }}>{p.type}</span>
                  <span className="text-[#FF5C00]" style={{ fontSize: 15, fontWeight: 700 }}>{p.price}</span>
                </div>
              ))}
            </div>

            {/* Locations */}
            <h3 className="text-[#1A1A2E] mt-8 mb-4" style={{ fontSize: 22, fontWeight: 700 }}>Beschikbaar op</h3>
            <div className="flex flex-wrap gap-2">
              {data.locations.map(l => (
                <button key={l} onClick={() => navigate(`/website/locatie/${l.toLowerCase().replace(/\s*-\s*/g, '-').replace(/\s/g, '-')}`)} className="px-4 py-2 rounded-lg bg-[#0365C4]/8 text-[#0365C4] hover:bg-[#0365C4] hover:text-white transition-all" style={{ fontSize: 13, fontWeight: 600 }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-[100px] h-fit">
            <button onClick={() => navigate('/website/inschrijven')} className="w-full py-3.5 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)', fontSize: 15, fontWeight: 700, boxShadow: '0 8px 24px rgba(255,92,0,0.3)' }}>
              Inschrijven
            </button>
            <button onClick={() => navigate('/website/reserveren')} className="w-full py-3.5 rounded-xl text-[#1A1A2E] border-2 border-[#E8ECF4] hover:border-[#0365C4] transition-colors" style={{ fontSize: 15, fontWeight: 600 }}>
              Reserveren en afmelden
            </button>
            <button onClick={() => navigate('/website/over-ons')} className="w-full py-3.5 rounded-xl text-[#1A1A2E] border-2 border-[#E8ECF4] hover:border-[#0365C4] transition-colors" style={{ fontSize: 15, fontWeight: 600 }}>
              Over ons
            </button>
            <button onClick={() => navigate('/website/contact')} className="w-full py-3.5 rounded-xl text-[#1A1A2E] border-2 border-[#E8ECF4] hover:border-[#0365C4] transition-colors" style={{ fontSize: 15, fontWeight: 600 }}>
              Neem contact op
            </button>

            <div className="bg-[#F4F7FC] rounded-xl p-5 text-center mt-4">
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="#FFD700" color="#FFD700" />)}
              </div>
              <p className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>... / 10</p>
              <button onClick={() => navigate('/website/reviews')} className="mt-2 text-[#0365C4]" style={{ fontSize: 13, fontWeight: 600 }}>alle ... reviews &gt;</button>
            </div>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}

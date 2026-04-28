import { useParams, useNavigate } from 'react-router';
import { useState } from 'react';
import { WebsiteLayout } from '../../components/website/WebsiteLayout';
import { MapPin, Clock, CreditCard, Users, ChevronRight, Star, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

const poolImg = 'https://images.unsplash.com/photo-1770967307107-446055488c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBob3RlbCUyMHN3aW1taW5nJTIwcG9vbCUyMGJsdWUlMjB3YXRlcnxlbnwxfHx8fDE3NzQ1MzA2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080';

interface LocationData {
  name: string;
  venue: string;
  address: string;
  days: string;
  times: string;
  types: string;
  price: string;
  staff: string[];
}

const locationData: Record<string, LocationData> = {
  'de-bilt-utrecht': { name: 'De Bilt - Utrecht', venue: 'Van der Valk Hotel', address: 'De Holle Bilt 1, 3732 HM De Bilt', days: 'Maandag t/m Zaterdag', times: 'Ma-Vr 12:00-19:00, Za 08:00-13:00', types: '1-op-1, 1-op-2, Mini-survival', price: '€27,00', staff: ['Juf Hester', 'Meester Gerrit', 'Juf Kelsy', 'Meester Gert', 'Juf Lydia'] },
  'garderen': { name: 'Garderen', venue: 'Bilderberg Hotel t\' Speulderbos', address: 'Speulderbosweg 54, 3886 AP Garderen', days: 'Maandag t/m Vrijdag', times: 'Tijden in overleg', types: '1-op-1, 1-op-2', price: '€27,00', staff: ['Meester Gert', 'Juf Janine', 'Juf Kelsy'] },
  'mierlo': { name: 'Mierlo', venue: 'HUP Hotel', address: 'Arkweg 3, 5731 PD Mierlo', days: 'Maandag en Vrijdag', times: '13:00-19:00', types: '1-op-1, 1-op-2', price: '€27,00', staff: ['Meester Gert'] },
  'nijkerk': { name: 'Nijkerk', venue: 'Ampt Van Nijkerk', address: 'Berencamperweg 4, 3861 MC Nijkerk', days: 'Woensdag, Donderdag, Vrijdag', times: 'Wo-Vr tot 19:00', types: '1-op-1, 1-op-2', price: '€27,00', staff: ['Juf Jorike', 'Meester Jimmy', 'Juf Hester'] },
  'wolfheze': { name: 'Wolfheze', venue: 'Fletcher Hotel De Buunderkamp', address: 'Buunderkamp 8, 6874 NC Wolfheze', days: 'Woensdag, Vrijdag, Zaterdag', times: 'Wo-Vr 13:00-19:00, Za 09:00-14:00', types: '1-op-1, 1-op-2', price: '€27,00', staff: ['Meester Jimmy'] },
  'dordrecht': { name: 'Dordrecht', venue: 'EuroParcs De Biesbosch', address: 'Rijksstraatweg 186, 3316 EJ Dordrecht', days: 'Maandag t/m Donderdag', times: '13:00-18:00', types: '1-op-1, 1-op-2, Mini-survival', price: '€27,00', staff: ['Juf Yvette'] },
  'soest': { name: 'Soest', venue: 'Hilton Royal Parc Soestduinen', address: 'Van Weerden Poelmanweg 4-6, 3768 MN Soest', days: 'Dinsdag en Donderdag', times: 'Di 12:00-19:30, Do 13:00-19:00', types: '1-op-1, 1-op-2', price: '€27,00', staff: ['Meester Jimmy', 'Meester Gert'] },
};

const tabs = ['Lesmethode', 'Lesaanbod', 'Medewerkers', 'Waarom?', 'Tijden & Tarieven', 'Meer informatie'];

export function WebsiteLocationScreen() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const loc = locationData[slug || ''] || locationData['de-bilt-utrecht'];

  const tabContent = [
    // Lesmethode
    <div key="0">
      <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 22, fontWeight: 700 }}>Lesmethode</h3>
      <p className="text-[#4A5568] mb-4" style={{ fontSize: 15, lineHeight: 1.8 }}>
        Onze methode is uniek en het toverwoord is aandacht! Walter zag in zijn beginjaren als zwemleraar hoe een reguliere zwemles wordt gegeven, besloot dat dit beter kon en ging op onderzoek uit. Door veel te kijken, te praten en gewoon te ontdekken wat werkt, rolde er een <strong>gouden zwemles methode</strong> uit.
      </p>
      <p className="text-[#4A5568] mb-4" style={{ fontSize: 15, lineHeight: 1.8 }}>
        Leren lopen is lastig, maar leren zwemmen zonder vaste grond onder je voeten is helemaal ingewikkeld.
      </p>
      <blockquote className="border-l-4 border-[#FF5C00] pl-4 my-6">
        <p className="text-[#1A1A2E] italic" style={{ fontSize: 15, lineHeight: 1.7 }}>
          "Wij halen het beste eruit en zijn enthousiast over iedere vordering, maar het gaat erom dat het kind met vertrouwen in het water ligt!"
        </p>
        <p className="text-[#8E9BB3] mt-2" style={{ fontSize: 13 }}>Walter van de Geest, eigenaar en zwemleraar</p>
      </blockquote>
      <ul className="space-y-3 mt-6">
        {[
          'Wij staan naast de kinderen in het water. Zo leert het kind snel te vertrouwen op het water en op zichzelf.',
          'Jouw zwemles, jouw zwemtijd. Leren zwemmen is ook doorzwemmen.',
          'Wij zien alles! Geen zwemslag ontgaat ons, want we staan ernaast.',
          'Zwemmen op je snelst. Ieder kind is uniek en ieder uniek kind mag leren zwemmen in zijn eigen tempo.',
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#FF5C00] mt-2 flex-shrink-0" />
            <span className="text-[#4A5568]" style={{ fontSize: 14, lineHeight: 1.6 }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>,
    // Lesaanbod
    <div key="1">
      <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 22, fontWeight: 700 }}>Lesaanbod in {loc.name}</h3>
      <div className="space-y-4">
        {[
          { type: '1-op-1 Zwemles', price: '€38,00 per les', desc: 'Individuele les. Maximale aandacht voor je kind.', available: true },
          { type: '1-op-2 Zwemles', price: '€27,00 per les (p.p.)', desc: 'Les met 2 kinderen tegelijk. Samen leren is leuk!', available: true },
          { type: 'Mini-Survival Zwemles', price: '€25,00 per les', desc: 'Survival technieken in het water. Na behalen A/B diploma.', available: loc.types.includes('Mini-survival') },
        ].map((item, i) => (
          <div key={i} className={`p-5 rounded-xl border ${item.available ? 'border-[#E8ECF4] bg-white' : 'border-[#E8ECF4] bg-[#F8F9FC] opacity-60'}`}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>{item.type}</h4>
              <span className="text-[#FF5C00]" style={{ fontSize: 15, fontWeight: 700 }}>{item.price}</span>
            </div>
            <p className="text-[#6B7B94]" style={{ fontSize: 13 }}>{item.desc}</p>
            {!item.available && <p className="text-[#E74C3C] mt-1" style={{ fontSize: 12, fontWeight: 600 }}>Niet beschikbaar op deze locatie</p>}
          </div>
        ))}
      </div>
    </div>,
    // Medewerkers
    <div key="2">
      <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 22, fontWeight: 700 }}>Medewerkers in {loc.name}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {loc.staff.map((name, i) => (
          <div key={i} className="bg-[#F4F7FC] rounded-xl p-4 text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${i % 2 === 0 ? '#0365C4' : '#FF5C00'}, ${i % 2 === 0 ? '#00C1FF' : '#F5A623'})` }}>
              <span className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>{name.split(' ').pop()?.[0]}</span>
            </div>
            <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>{name}</p>
          </div>
        ))}
      </div>
    </div>,
    // Waarom
    <div key="3">
      <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 22, fontWeight: 700 }}>Waarom Zwemschool Snorkeltje?</h3>
      <div className="space-y-4">
        {[
          { title: 'Persoonlijke aandacht', desc: 'Maximaal 1 of 2 kinderen per instructeur.' },
          { title: 'Snelle resultaten', desc: 'Kinderen leren sneller door individuele begeleiding.' },
          { title: 'Luxe locaties', desc: 'Zwembaden in mooie hotels, rustige en veilige omgeving.' },
          { title: 'ENVOZ diploma', desc: 'Internationaal erkend zwemdiploma (IFSTA).' },
          { title: 'Ervaren instructeurs', desc: 'Alle instructeurs zijn gecertificeerd en ervaren.' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#F4F7FC]">
            <div className="w-8 h-8 rounded-lg bg-[#0365C4]/10 flex items-center justify-center flex-shrink-0">
              <Star size={16} color="#0365C4" />
            </div>
            <div>
              <h4 className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>{item.title}</h4>
              <p className="text-[#6B7B94] mt-0.5" style={{ fontSize: 13 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>,
    // Tijden & Tarieven
    <div key="4">
      <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 22, fontWeight: 700 }}>Tijden & Tarieven</h3>
      <div className="bg-[#F4F7FC] rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <Calendar size={18} color="#0365C4" />
          <div>
            <p className="text-[#8E9BB3]" style={{ fontSize: 12 }}>Lesdagen</p>
            <p className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 600 }}>{loc.days}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock size={18} color="#0365C4" />
          <div>
            <p className="text-[#8E9BB3]" style={{ fontSize: 12 }}>Lestijden</p>
            <p className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 600 }}>{loc.times}</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E8ECF4]">
              <th className="text-left py-3 text-[#8E9BB3]" style={{ fontSize: 13, fontWeight: 600 }}>Type les</th>
              <th className="text-right py-3 text-[#8E9BB3]" style={{ fontSize: 13, fontWeight: 600 }}>Prijs per les</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#F0F4FA]"><td className="py-3 text-[#1A1A2E]" style={{ fontSize: 14 }}>1-op-1 zwemles</td><td className="py-3 text-right text-[#FF5C00]" style={{ fontSize: 14, fontWeight: 700 }}>€38,00</td></tr>
            <tr className="border-b border-[#F0F4FA]"><td className="py-3 text-[#1A1A2E]" style={{ fontSize: 14 }}>1-op-2 zwemles</td><td className="py-3 text-right text-[#FF5C00]" style={{ fontSize: 14, fontWeight: 700 }}>€27,00</td></tr>
            <tr className="border-b border-[#F0F4FA]"><td className="py-3 text-[#1A1A2E]" style={{ fontSize: 14 }}>Mini-survival</td><td className="py-3 text-right text-[#FF5C00]" style={{ fontSize: 14, fontWeight: 700 }}>€25,00</td></tr>
            <tr className="border-b border-[#F0F4FA]"><td className="py-3 text-[#1A1A2E]" style={{ fontSize: 14 }}>Inschrijfgeld (eenmalig)</td><td className="py-3 text-right text-[#FF5C00]" style={{ fontSize: 14, fontWeight: 700 }}>€25,00</td></tr>
          </tbody>
        </table>
      </div>
    </div>,
    // Meer informatie
    <div key="5">
      <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 22, fontWeight: 700 }}>Meer informatie</h3>
      <p className="text-[#4A5568] mb-4" style={{ fontSize: 15, lineHeight: 1.8 }}>
        Wij werken keihard aan de leukste zwemtoekomst van kinderen. Veiligheid is belangrijk, maar een bommetje kunnen maken is dat ook.
      </p>
      <p className="text-[#4A5568] mb-4" style={{ fontSize: 15, lineHeight: 1.8 }}>
        Heeft u vragen over deze locatie? Neem dan gerust contact met ons op via de contactpagina of bekijk onze veelgestelde vragen.
      </p>
      <div className="flex flex-wrap gap-3 mt-6">
        <button onClick={() => navigate('/website/faq')} className="px-5 py-2.5 rounded-lg text-[#0365C4] bg-[#0365C4]/8 hover:bg-[#0365C4]/15 transition-colors" style={{ fontSize: 14, fontWeight: 600 }}>
          Veelgestelde vragen
        </button>
        <button onClick={() => navigate('/website/contact')} className="px-5 py-2.5 rounded-lg text-[#FF5C00] bg-[#FF5C00]/8 hover:bg-[#FF5C00]/15 transition-colors" style={{ fontSize: 14, fontWeight: 600 }}>
          Contact opnemen
        </button>
      </div>
    </div>,
  ];

  return (
    <WebsiteLayout>
      {/* Hero */}
      <section className="relative h-[300px] lg:h-[360px] overflow-hidden">
        <ImageWithFallback src={poolImg} alt={loc.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(3,101,196,0.85), rgba(0,193,255,0.7))' }} />
        <div className="absolute inset-0 flex flex-col justify-end pb-10">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 w-full">
            <h1 className="text-white mb-2" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>
              {loc.name} — {loc.venue}
            </h1>
            <p className="text-white/80 italic" style={{ fontSize: 16, fontWeight: 500 }}>
              Nu en later, vol vertrouwen in het water!
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0,20 C360,40 720,0 1080,20 C1260,30 1380,35 1440,30 L1440,40 L0,40 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-4">
        <div className="flex items-center gap-2 text-[#8E9BB3]" style={{ fontSize: 13 }}>
          <button onClick={() => navigate('/website')} className="hover:text-[#0365C4]">Home</button>
          <ChevronRight size={12} />
          <span className="text-[#1A1A2E]" style={{ fontWeight: 600 }}>{loc.name}</span>
        </div>
      </div>

      {/* Quick info bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Users, label: loc.types, sub: 'Type les' },
            { icon: CreditCard, label: `Vanaf ${loc.price} per les`, sub: 'Prijs' },
            { icon: Calendar, label: loc.days, sub: 'Lesdagen' },
            { icon: MapPin, label: loc.address.split(',')[0], sub: 'Adres' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="bg-[#F4F7FC] rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                  <Icon size={18} color="#0365C4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[#8E9BB3]" style={{ fontSize: 11 }}>{item.sub}</p>
                  <p className="text-[#1A1A2E] truncate" style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex overflow-x-auto gap-1 mb-8 pb-2" style={{ scrollbarWidth: 'none' }}>
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className="px-4 py-2.5 rounded-lg whitespace-nowrap transition-all"
                  style={{
                    fontSize: 13,
                    fontWeight: activeTab === i ? 700 : 500,
                    background: activeTab === i ? '#0365C4' : '#F4F7FC',
                    color: activeTab === i ? '#fff' : '#4A5568',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            {tabContent[activeTab]}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <button
              onClick={() => navigate(`/website/inschrijven?locatie=${slug}`)}
              className="w-full py-3.5 rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)', fontSize: 15, fontWeight: 700, boxShadow: '0 8px 24px rgba(255,92,0,0.3)' }}
            >
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

            {/* Reviews widget */}
            <div className="bg-[#F4F7FC] rounded-xl p-5 text-center mt-6">
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="#FFD700" color="#FFD700" />)}
              </div>
              <p className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>... / 10</p>
              <button onClick={() => navigate('/website/reviews')} className="mt-2 text-[#0365C4]" style={{ fontSize: 13, fontWeight: 600 }}>
                alle ... reviews &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}
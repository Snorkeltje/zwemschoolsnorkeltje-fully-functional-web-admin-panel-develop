import { useState } from 'react';
import { useNavigate } from 'react-router';
import { WebsiteLayout } from '../../components/website/WebsiteLayout';
import { ChevronRight, ChevronDown, Search, HelpCircle, CreditCard, Calendar, MapPin, Award, Shield } from 'lucide-react';

const categories = [
  { id: 'all', label: 'Alles', icon: HelpCircle, color: '#0365C4' },
  { id: 'inschrijving', label: 'Inschrijving', icon: MapPin, color: '#FF5C00' },
  { id: 'betaling', label: 'Betaling', icon: CreditCard, color: '#27AE60' },
  { id: 'les', label: 'Lessen', icon: Calendar, color: '#00C1FF' },
  { id: 'diploma', label: "Diploma's", icon: Award, color: '#8E44AD' },
  { id: 'beleid', label: 'Beleid', icon: Shield, color: '#E67E22' },
];

const faqs = [
  { q: 'Hoe kan ik mijn kind inschrijven?', a: 'Ga naar de inschrijvenpagina, kies een locatie en vul het formulier in. Je kind komt op de wachtlijst en we nemen zo snel mogelijk contact met je op. Je kunt je kind ook op meerdere locaties inschrijven om de wachttijd te verkorten.', cat: 'inschrijving' },
  { q: 'Hoe lang is de wachtlijst?', a: 'De wachtlijst varieert per locatie. Schrijf je kind vroeg in zodat je niet te lang hoeft te wachten. We adviseren om je kind op meerdere locaties in te schrijven. Gemiddeld is de wachttijd 3-6 maanden, afhankelijk van de locatie.', cat: 'inschrijving' },
  { q: 'Kan ik mijn kind op meerdere locaties inschrijven?', a: 'Ja, het is mogelijk om je kind op meerdere locaties in te schrijven en lessen te volgen. Dit kan de wachttijd aanzienlijk verkorten.', cat: 'inschrijving' },
  { q: 'Wat kost een zwemles?', a: '1-op-1 zwemles: \u20AC38,00 per les.\n1-op-2 zwemles: \u20AC27,00 per les per persoon.\nMini-survival: \u20AC25,00 per les.\nInschrijfgeld (eenmalig): \u20AC25,00.', cat: 'betaling' },
  { q: 'Hoe werkt het knipkaartensysteem?', a: 'Je koopt een knipkaart met 10, 5 of 3 lessen. Bij elke les wordt er een les van je kaart afgehaald. Een 10-lessenkaart kost \u20AC380, 5-lessenkaart \u20AC190 en 3-lessenkaart \u20AC114 voor 1-op-1 lessen. Knipkaarten zijn 365 dagen geldig na aankoop.', cat: 'betaling' },
  { q: 'Welke betaalmethoden worden geaccepteerd?', a: 'Wij accepteren betalingen via iDEAL, creditcard (Visa/Mastercard), Bancontact en Apple Pay. Alle online betalingen verlopen veilig via Mollie.', cat: 'betaling' },
  { q: 'Kan ik een les annuleren?', a: 'Ja, je kunt een les tot 24 uur van tevoren kosteloos annuleren. Tijdens schoolvakanties geldt een annuleringstermijn van 96 uur (4 dagen). Bij niet-tijdige annulering wordt de les in rekening gebracht.', cat: 'beleid' },
  { q: 'Hoe lang duurt een zwemles?', a: 'Een zwemles duurt 10 minuten. Dit lijkt kort, maar door de individuele aandacht (1-op-1 of 1-op-2) is dit zeer effectief. De instructeur staat naast het kind in het water, dus elke seconde wordt benut.', cat: 'les' },
  { q: 'Wat is de auto-conversie van 1-op-1 naar 1-op-2?', a: 'Als je een 1-op-1 knipkaart hebt en er wordt een geschikt koppel gevonden, kan je automatisch overgaan naar 1-op-2 lessen. Het verschil in prijs (\u20AC11 per les) wordt automatisch teruggestort. Je kunt dit ook uitschakelen als je alleen 1-op-1 wilt.', cat: 'beleid' },
  { q: 'Welk diplomasysteem gebruiken jullie?', a: 'Wij gebruiken het ENVOZ diplomasysteem, dat internationaal erkend is door IFSTA. Kinderen werken toe naar Diploma A, Diploma B en vervolgens Survival.', cat: 'diploma' },
  { q: 'Hoe kan ik een les reserveren of afmelden?', a: 'Via onze app of website kun je eenvoudig lessen reserveren en afmelden. Log in met je account, ga naar "Reserveren" en kies je product, datum en tijdslot. Afmelden kan via "Mijn reserveringen".', cat: 'les' },
  { q: 'Wat moet mijn kind meenemen naar zwemles?', a: 'Zwembroek/badpak, handdoek en eventueel een zwembril. Badmutsen zijn niet verplicht. Oorbellen moeten verwijderd worden. Verder wordt alles door ons verzorgd.', cat: 'les' },
  { q: 'Moet ik 14 dagen van tevoren reserveren?', a: 'Ja, standaard geldt een minimale boekingstermijn van 14 dagen. Dit helpt ons om de planning optimaal in te richten. In speciale gevallen kan de admin deze regel overrulen.', cat: 'beleid' },
  { q: 'Hoe lang duurt het om af te zwemmen?', a: 'Dit varieert per kind. Gemiddeld halen kinderen hun Diploma A binnen 6-12 maanden bij wekelijkse lessen. Door de individuele aandacht is dit vaak sneller dan bij reguliere zwemscholen.', cat: 'diploma' },
  { q: 'Wat is het verschil tussen 1-op-1 en 1-op-2?', a: 'Bij 1-op-1 krijgt je kind de volledige aandacht van de instructeur. Bij 1-op-2 zwemmen twee kinderen tegelijk met \u00e9\u00e9n instructeur. Het voordeel is een lagere prijs (\u20AC27 vs \u20AC38 per les) en de kinderen stimuleren elkaar.', cat: 'les' },
];

export function WebsiteFAQScreen() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = faqs.filter(f => {
    if (activeCategory !== 'all' && f.cat !== activeCategory) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <WebsiteLayout>
      <section className="relative h-[200px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)' }}>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 w-full">
            <h1 className="text-white" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>Veelgestelde vragen</h1>
            <p className="text-white/80 mt-2" style={{ fontSize: 16 }}>{faqs.length} antwoorden op de meest gestelde vragen</p>
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
          <span className="text-[#1A1A2E]" style={{ fontWeight: 600 }}>FAQ</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 pb-16">
        {/* Search */}
        <div className="relative max-w-[600px] mx-auto mb-8">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0AEC0]" />
          <input placeholder="Zoek een vraag..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]"
            style={{ fontSize: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }} />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setOpen(null); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${isActive ? 'text-white shadow-md' : 'bg-white text-[#6B7B94] hover:bg-[#F4F7FC]'}`}
                style={{ fontSize: 13, fontWeight: 600, background: isActive ? cat.color : undefined, border: isActive ? 'none' : '1px solid #E8ECF4' }}>
                <Icon size={15} /> {cat.label}
              </button>
            );
          })}
        </div>

        <p className="text-[#6B7B94] mb-4 text-center" style={{ fontSize: 13 }}>{filtered.length} resultaten</p>

        {/* FAQ list */}
        <div className="max-w-[800px] mx-auto space-y-3">
          {filtered.map((faq, i) => {
            const isOpen = open === i;
            const catData = categories.find(c => c.id === faq.cat);
            return (
              <div key={i} className="bg-white rounded-xl overflow-hidden transition-all" style={{ boxShadow: isOpen ? '0 4px 24px rgba(0,0,0,0.08)' : '0 1px 6px rgba(0,0,0,0.04)', border: isOpen ? `1px solid ${catData?.color || '#E8ECF4'}20` : '1px solid #F0F4FA' }}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: catData?.color || '#A0AEC0' }} />
                    <span className="text-[#1A1A2E] truncate" style={{ fontSize: 15, fontWeight: 600 }}>{faq.q}</span>
                  </div>
                  <ChevronDown size={18} className={`text-[#A0AEC0] transition-transform flex-shrink-0 ml-3 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <div className="pl-5 border-l-2" style={{ borderColor: catData?.color || '#E8ECF4' }}>
                      <p className="text-[#4A5568] whitespace-pre-line" style={{ fontSize: 14, lineHeight: 1.8 }}>{faq.a}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle size={48} className="text-[#D0D5DD] mx-auto mb-3" />
              <p className="text-[#6B7B94]" style={{ fontSize: 16, fontWeight: 600 }}>Geen resultaten gevonden</p>
              <p className="text-[#A0AEC0] mt-1" style={{ fontSize: 14 }}>Probeer een andere zoekterm of categorie</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="max-w-[800px] mx-auto mt-12 bg-[#F4F7FC] rounded-2xl p-8 text-center">
          <HelpCircle size={36} className="text-[#0365C4] mx-auto mb-3" />
          <h3 className="text-[#1A1A2E] mb-2" style={{ fontSize: 20, fontWeight: 700 }}>Staat je vraag er niet bij?</h3>
          <p className="text-[#6B7B94] mb-5 max-w-[400px] mx-auto" style={{ fontSize: 14 }}>Neem gerust contact met ons op. We helpen je graag verder!</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate('/website/contact')} className="px-6 py-3 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)', fontSize: 14, fontWeight: 700 }}>
              Contact opnemen
            </button>
            <button onClick={() => navigate('/website/inschrijven')} className="px-6 py-3 rounded-xl text-[#FF5C00]" style={{ fontSize: 14, fontWeight: 700, background: '#FFF7ED', border: '1px solid #FDDCB5' }}>
              Direct inschrijven
            </button>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}

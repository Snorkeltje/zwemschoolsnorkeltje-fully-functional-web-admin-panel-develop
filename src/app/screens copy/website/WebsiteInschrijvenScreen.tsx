import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { WebsiteLayout } from '../../components/website/WebsiteLayout';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

const heroImg = 'https://images.unsplash.com/photo-1691253104600-ccfd27782f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHN3aW1taW5nJTIwcG9vbCUyMGxlc3NvbnN8ZW58MXx8fHwxNzc0NTMwNjc2fDA&ixlib=rb-4.1.0&q=80&w=1080';

const locations = [
  { name: 'De Bilt - Utrecht', slug: 'de-bilt-utrecht' },
  { name: 'Garderen', slug: 'garderen' },
  { name: 'Mierlo', slug: 'mierlo' },
  { name: 'Nijkerk', slug: 'nijkerk' },
  { name: 'Wolfheze', slug: 'wolfheze' },
  { name: 'Dordrecht', slug: 'dordrecht' },
  { name: 'Soest', slug: 'soest' },
];

const steps = [
  { title: 'Schrijf je in!', desc: 'Wil jouw kind samen met een vriendje of uitdaagmatje op zwemles? Dat kan natuurlijk ook! Schrijf dan een van beide kinderen in en kies voor de optie één-op-twee. Klik op \'ja\' bij de vraag of je een eigen koppel hebt en je krijgt de optie om nog een naam in te vullen.' },
  { title: 'Je komt op de algemene wachtlijst.', desc: 'Is de eerste zwemles toch nog wat te vroeg — misschien is het kind nog niet voldoende watervij of nog te jong — dan houd je je plekje op de algemene wachtlijst totdat jouw kind er wel aan toe is. Er verloopt elke 3 maanden een mail ter herinnering waarin wordt gevraagd of je nog bij ons op de wachtlijst wilt blijven staan.' },
  { title: 'Is je kind ouder is dan 4 jaar?', desc: 'Dan krijg je maandelijks per mail de keuze om je beschikbaarheid en de mate van watervij zijn van je kind aan te geven. Door dit te doen kom je op de definitieve wachtlijst. Hierop staan alle kinderen die zouden willen starten met de zwemlessen in volgende van inschrijfdatum.' },
  { title: 'Het is mogelijk om je kind op meerdere locaties in te schrijven.', desc: '' },
  { title: 'Tip: Onze wachtlijsten zijn lang!', desc: 'Schrijf je kind vroeg in, zo weet je zeker dat je niet te lang hoeft te wachten als jullie er klaar voor zijn!' },
];

export function WebsiteInschrijvenScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedLocation = searchParams.get('locatie') || '';
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    childFirstName: '',
    childLastName: '',
    parentName: '',
    phone: '',
    email: '',
    birthDate: '',
    startDate: '',
    lessonType: '',
    location: preselectedLocation,
    remarks: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <WebsiteLayout>
      {/* Hero */}
      <section className="relative h-[240px] lg:h-[300px] overflow-hidden">
        <ImageWithFallback src={heroImg} alt="Inschrijven" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(3,101,196,0.85), rgba(0,193,255,0.7))' }} />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 w-full">
            <h1 className="text-white" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>Inschrijven</h1>
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
          <span className="text-[#1A1A2E]" style={{ fontWeight: 600 }}>Inschrijven</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 pb-16">
        {!preselectedLocation ? (
          // Location selection
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-[#1A1A2E] mb-4" style={{ fontSize: 28, fontWeight: 700 }}>Inschrijven</h2>
              <p className="text-[#4A5568] mb-6" style={{ fontSize: 15, lineHeight: 1.7 }}>
                Inschrijven voor de zwemlessen van Zwemschool Snorkeltje is heel simpel en je zit nergens aan vast. Laat je gegevens achter en je staat bij ons op de lijst. Kies hieronder de gewenste locatie!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {locations.map(loc => (
                  <button
                    key={loc.slug}
                    onClick={() => navigate(`/website/inschrijven?locatie=${loc.slug}`)}
                    className="px-5 py-3.5 rounded-xl text-white text-left transition-all hover:scale-[1.02]"
                    style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)', fontSize: 15, fontWeight: 600, boxShadow: '0 4px 16px rgba(255,92,0,0.25)' }}
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-[#F4F7FC] rounded-2xl p-6 lg:p-8">
                <h3 className="text-[#0365C4] mb-4" style={{ fontSize: 20, fontWeight: 700 }}>Zo werkt het!</h3>
                <div className="space-y-4">
                  {steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#FF5C00] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white" style={{ fontSize: 11, fontWeight: 700 }}>{i + 1}</span>
                      </div>
                      <div>
                        <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{step.title}</p>
                        {step.desc && <p className="text-[#6B7B94] mt-1" style={{ fontSize: 13, lineHeight: 1.6 }}>{step.desc}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : submitted ? (
          // Success
          <div className="max-w-[600px] mx-auto text-center py-12">
            <div className="w-20 h-20 rounded-full bg-[#27AE60]/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} color="#27AE60" />
            </div>
            <h2 className="text-[#1A1A2E] mb-3" style={{ fontSize: 28, fontWeight: 700 }}>Inschrijving ontvangen!</h2>
            <p className="text-[#6B7B94] mb-6" style={{ fontSize: 15, lineHeight: 1.6 }}>
              Bedankt voor je inschrijving. Je staat nu op onze wachtlijst. We nemen zo snel mogelijk contact met je op.
            </p>
            <button onClick={() => navigate('/website')} className="px-6 py-3 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)', fontSize: 15, fontWeight: 700 }}>
              Terug naar home
            </button>
          </div>
        ) : (
          // Registration form
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-[#1A1A2E] mb-2" style={{ fontSize: 28, fontWeight: 700 }}>
                Inschrijven {locations.find(l => l.slug === preselectedLocation)?.name}
              </h2>
              <p className="text-[#4A5568] mb-8" style={{ fontSize: 15, lineHeight: 1.7 }}>
                Inschrijven voor de zwemlessen van Zwemschool Snorkeltje is heel simpel en je zit nergens aan vast. Laat je gegevens achter en je staat bij ons op de lijst.
              </p>

              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 lg:p-8 space-y-4" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #F0F4FA' }}>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Voornaam van het kind" required value={formData.childFirstName} onChange={e => setFormData({...formData, childFirstName: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E8ECF4] bg-white text-[#1A1A2E] placeholder:text-[#A0AEC0] outline-none focus:border-[#0365C4] transition-colors" style={{ fontSize: 14 }} />
                  <input type="text" placeholder="Achternaam van het kind" required value={formData.childLastName} onChange={e => setFormData({...formData, childLastName: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E8ECF4] bg-white text-[#1A1A2E] placeholder:text-[#A0AEC0] outline-none focus:border-[#0365C4] transition-colors" style={{ fontSize: 14 }} />
                </div>
                <input type="text" placeholder="Naam ouder" required value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E8ECF4] bg-white text-[#1A1A2E] placeholder:text-[#A0AEC0] outline-none focus:border-[#0365C4] transition-colors" style={{ fontSize: 14 }} />
                <input type="tel" placeholder="Telefoonnummer" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E8ECF4] bg-white text-[#1A1A2E] placeholder:text-[#A0AEC0] outline-none focus:border-[#0365C4] transition-colors" style={{ fontSize: 14 }} />
                <input type="email" placeholder="E-mailadres" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E8ECF4] bg-white text-[#1A1A2E] placeholder:text-[#A0AEC0] outline-none focus:border-[#0365C4] transition-colors" style={{ fontSize: 14 }} />
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" placeholder="Geboortedatum" value={formData.birthDate} onChange={e => setFormData({...formData, birthDate: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E8ECF4] bg-white text-[#1A1A2E] outline-none focus:border-[#0365C4] transition-colors" style={{ fontSize: 14 }} />
                  <input type="date" placeholder="Gewenste startdatum" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E8ECF4] bg-white text-[#1A1A2E] outline-none focus:border-[#0365C4] transition-colors" style={{ fontSize: 14 }} />
                </div>
                <select value={formData.lessonType} onChange={e => setFormData({...formData, lessonType: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E8ECF4] bg-white text-[#1A1A2E] outline-none focus:border-[#0365C4] transition-colors" style={{ fontSize: 14 }}>
                  <option value="">Type les</option>
                  <option value="1-op-1">1-op-1 Zwemles</option>
                  <option value="1-op-2">1-op-2 Zwemles</option>
                  <option value="mini-survival">Mini Survival Zwemles</option>
                </select>
                <textarea placeholder="Opmerkingen of vragen" rows={4} value={formData.remarks} onChange={e => setFormData({...formData, remarks: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E8ECF4] bg-white text-[#1A1A2E] placeholder:text-[#A0AEC0] outline-none focus:border-[#0365C4] transition-colors resize-none" style={{ fontSize: 14 }} />
                <button type="submit" className="px-8 py-3.5 rounded-xl text-white transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)', fontSize: 15, fontWeight: 700, boxShadow: '0 8px 24px rgba(255,92,0,0.3)' }}>
                  Verzenden
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="bg-[#F4F7FC] rounded-2xl p-6 lg:p-8 h-fit lg:sticky lg:top-[100px]">
              <h3 className="text-[#0365C4] mb-4" style={{ fontSize: 20, fontWeight: 700 }}>Zo werkt het!</h3>
              <div className="space-y-4">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF5C00] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white" style={{ fontSize: 11, fontWeight: 700 }}>{i + 1}</span>
                    </div>
                    <div>
                      <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{step.title}</p>
                      {step.desc && <p className="text-[#6B7B94] mt-1" style={{ fontSize: 13, lineHeight: 1.6 }}>{step.desc}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </WebsiteLayout>
  );
}
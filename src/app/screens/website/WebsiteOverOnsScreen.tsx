import { useNavigate } from 'react-router';
import { WebsiteLayout } from '../../components/website/WebsiteLayout';
import { ChevronRight, Heart, Zap, Eye } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

const heroImg = 'https://images.unsplash.com/photo-1758532744403-1ed39c509f38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGZhbWlseSUyMHN3aW1taW5nJTIwcG9vbCUyMHN1bW1lcnxlbnwxfHx8fDE3NzQ1MzA2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080';

const instructors = [
  { name: 'Meester Walter', role: 'Eigenaar & Hoofdinstructeur', bio: 'Walter is de oprichter van Zwemschool Snorkeltje. Sinds 2007 geeft hij zwemles en in 2015 startte hij zijn eigen zwemschool. Hij ontwikkelde de gouden zwemles methode.', color: '#FF5C00' },
  { name: 'Juf Hester', role: 'Instructeur', bio: 'Hester is de vrouw van Walter en een ervaren zwemlerares. Ze geeft les op meerdere locaties.', color: '#0365C4' },
  { name: 'Meester Gert', role: 'Instructeur', bio: 'Gert is een ervaren zwemleraar die op meerdere locaties actief is.', color: '#00C1FF' },
  { name: 'Juf Yvette', role: 'Instructeur', bio: 'Yvette geeft les in Dordrecht met passie en toewijding.', color: '#FF5C00' },
  { name: 'Meester Jimmy', role: 'Instructeur', bio: 'Jimmy is actief op meerdere locaties en geeft les met veel energie.', color: '#0365C4' },
  { name: 'Juf Jorike', role: 'Instructeur (Juf Jojo)', bio: 'Jorike, ook wel Juf Jojo, geeft les in Nijkerk.', color: '#00C1FF' },
  { name: 'Juf Janine', role: 'Instructeur', bio: 'Janine geeft les in Garderen met veel aandacht.', color: '#FF5C00' },
  { name: 'Meester Gerrit', role: 'Instructeur', bio: 'Gerrit geeft les in De Bilt - Utrecht.', color: '#0365C4' },
  { name: 'Juf Corry', role: 'Survival Instructeur', bio: 'Corry is gespecialiseerd in survival zwemlessen.', color: '#00C1FF' },
  { name: 'Juf Lydia', role: 'Instructeur (sinds jan 2023)', bio: 'Lydia versterkt het team sinds januari 2023.', color: '#FF5C00' },
  { name: 'Juf Kelsy', role: 'Instructeur (sinds jan 2023)', bio: 'Kelsy is sinds januari 2023 onderdeel van het Snorkeltje team.', color: '#0365C4' },
];

export function WebsiteOverOnsScreen() {
  const navigate = useNavigate();

  return (
    <WebsiteLayout>
      {/* Hero */}
      <section className="relative h-[240px] lg:h-[300px] overflow-hidden">
        <ImageWithFallback src={heroImg} alt="Over ons" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(3,101,196,0.85), rgba(0,193,255,0.7))' }} />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 w-full">
            <h1 className="text-white" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>Over ons</h1>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full block"><path d="M0,20 C360,40 720,0 1080,20 C1260,30 1380,35 1440,30 L1440,40 L0,40 Z" fill="white" /></svg>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-4">
        <div className="flex items-center gap-2 text-[#8E9BB3]" style={{ fontSize: 13 }}>
          <button onClick={() => navigate('/website')} className="hover:text-[#0365C4]">Home</button>
          <ChevronRight size={12} />
          <span className="text-[#1A1A2E]" style={{ fontWeight: 600 }}>Over ons</span>
        </div>
      </div>

      {/* Story */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 pb-16">
        <div className="max-w-[800px]">
          <h2 className="text-[#1A1A2E] mb-6" style={{ fontSize: 32, fontWeight: 700 }}>Ons verhaal</h2>
          <p className="text-[#4A5568] mb-4" style={{ fontSize: 15, lineHeight: 1.8 }}>
            Walter zag in zijn beginjaren als zwemleraar hoe een reguliere zwemles wordt gegeven, besloot dat dit beter kon en ging op onderzoek uit. Door veel te kijken, te praten en gewoon te ontdekken wat werkt, rolde er een <strong>gouden zwemles methode</strong> uit.
          </p>
          <p className="text-[#4A5568] mb-4" style={{ fontSize: 15, lineHeight: 1.8 }}>
            Leren lopen is lastig, maar leren zwemmen zonder vaste grond onder je voeten is helemaal ingewikkeld. Wij halen het beste eruit en zijn enthousiast over iedere vordering, maar het gaat erom dat het kind met vertrouwen in het water ligt!
          </p>
          <p className="text-[#4A5568] mb-8" style={{ fontSize: 15, lineHeight: 1.8 }}>
            Wij werken keihard aan de leukste zwemtoekomst van kinderen. Veiligheid is belangrijk, maar een bommetje kunnen maken is dat ook.
          </p>
        </div>

        {/* USPs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Heart, title: 'Aandacht', desc: 'Persoonlijke aandacht voor ieder kind. Maximaal 1 of 2 kinderen per instructeur.', color: '#FF5C00' },
            { icon: Zap, title: 'Snelheid', desc: 'Door individuele begeleiding leren kinderen sneller en effectiever zwemmen.', color: '#0365C4' },
            { icon: Eye, title: 'Duidelijk', desc: 'Wij staan naast de kinderen. Geen zwemslag ontgaat ons.', color: '#00C1FF' },
          ].map(usp => {
            const Icon = usp.icon;
            return (
              <div key={usp.title} className="bg-[#F4F7FC] rounded-2xl p-6 text-center">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${usp.color}12` }}>
                  <Icon size={26} color={usp.color} />
                </div>
                <h3 className="text-[#1A1A2E] mb-2" style={{ fontSize: 18, fontWeight: 700 }}>{usp.title}</h3>
                <p className="text-[#6B7B94]" style={{ fontSize: 14, lineHeight: 1.6 }}>{usp.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Team */}
        <h2 className="text-[#1A1A2E] mb-8" style={{ fontSize: 32, fontWeight: 700 }}>Ons team</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {instructors.map((inst, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 text-center" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${inst.color}, ${inst.color}99)` }}>
                <span className="text-white" style={{ fontSize: 24, fontWeight: 700 }}>{inst.name.split(' ').pop()?.[0]}</span>
              </div>
              <h4 className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>{inst.name}</h4>
              <p className="text-[#0365C4] mt-0.5" style={{ fontSize: 12, fontWeight: 600 }}>{inst.role}</p>
              <p className="text-[#8E9BB3] mt-2" style={{ fontSize: 12, lineHeight: 1.5 }}>{inst.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </WebsiteLayout>
  );
}

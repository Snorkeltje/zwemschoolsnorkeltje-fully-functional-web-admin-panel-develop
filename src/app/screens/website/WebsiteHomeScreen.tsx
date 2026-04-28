import { useNavigate } from 'react-router';
import { WebsiteLayout } from '../../components/website/WebsiteLayout';
import { Star, ChevronRight, MapPin, Clock, Users, Award, Heart, Shield, Zap } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import snorkeltjeLogo from '../../../imports/logo-3.svg';
import snorkeltjeLogoPng from 'figma:asset/9b639bb791c2a6aa104eacafd5c0253b9d1ddf3e.png';

const heroImg = 'https://images.unsplash.com/photo-1691253104600-ccfd27782f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHN3aW1taW5nJTIwcG9vbCUyMGxlc3NvbnN8ZW58MXx8fHwxNzc0NTMwNjc2fDA&ixlib=rb-4.1.0&q=80&w=1080';
const poolImg = 'https://images.unsplash.com/photo-1770967307107-446055488c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBob3RlbCUyMHN3aW1taW5nJTIwcG9vbCUyMGJsdWUlMjB3YXRlcnxlbnwxfHx8fDE3NzQ1MzA2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080';
const learnImg = 'https://images.unsplash.com/photo-1662977015922-740114372ff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGxlYXJuaW5nJTIwc3dpbSUyMGluc3RydWN0b3J8ZW58MXx8fHwxNzc0NTMwNjgzfDA&ixlib=rb-4.1.0&q=80&w=1080';

const heroVideoUrl = 'https://player.vimeo.com/external/430694949.hd.mp4?s=fb7d3181a89db7b500942bc9f3bad0ea89a74e05&profile_id=174&download=1';

const locations = [
  { name: 'De Bilt - Utrecht', venue: 'Van der Valk Hotel', slug: 'de-bilt-utrecht' },
  { name: 'Garderen', venue: 'Bilderberg Hotel', slug: 'garderen' },
  { name: 'Mierlo', venue: 'HUP Hotel', slug: 'mierlo' },
  { name: 'Nijkerk', venue: 'Ampt Van Nijkerk', slug: 'nijkerk' },
  { name: 'Wolfheze', venue: 'Fletcher Hotel', slug: 'wolfheze' },
  { name: 'Dordrecht', venue: 'EuroParcs De Biesbosch', slug: 'dordrecht' },
  { name: 'Soest', venue: 'Hilton Royal Parc', slug: 'soest' },
];

const reviews = [
  { name: 'Marlene, Putten', text: '"Zo\'n ontzettende fijne en goede zwemschool. Mijn zoontje wilde nooit naar de vorige zwemschool en hij ging maar heel traag vooruit. Hij bleek zoveel verder te zijn, maar daar werd er niet individueel naar gekeken. Nu gaat hij iedere week met zoveel plezier en zwemt hij binnenkort af voor zijn B diploma!"', rating: 10 },
  { name: 'Familie De Vries', text: '"Persoonlijke aandacht en snelle vooruitgang. Onze dochter heeft in 6 maanden meer geleerd dan in 2 jaar bij een andere zwemschool."', rating: 9.5 },
  { name: 'Sandra, Nijkerk', text: '"Top zwemschool! De instructeurs zijn geduldig en professioneel. Mijn kinderen gaan met plezier naar zwemles."', rating: 10 },
];

export function WebsiteHomeScreen() {
  const navigate = useNavigate();

  return (
    <WebsiteLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ minHeight: 600 }}>
        <div className="absolute inset-0">
          {/* Fallback image while video loads */}
          <ImageWithFallback src={heroImg} alt="Zwemschool Snorkeltje" className="w-full h-full object-cover" />
          {/* Background video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src={heroVideoUrl}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(3,101,196,0.75) 0%, rgba(0,193,255,0.55) 50%, rgba(3,101,196,0.75) 100%)' }} />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 py-20 lg:py-28">
          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm mb-6">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#FFD700" color="#FFD700" />)}
              <span className="text-white ml-1" style={{ fontSize: 13, fontWeight: 600 }}>Hoogst beoordeelde zwemschool</span>
            </div>
            <h1 className="text-white mb-4" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.1 }}>
              Nu en later, vol vertrouwen in het water!
            </h1>
            <p className="text-white/90 mb-8 max-w-[500px]" style={{ fontSize: 18, lineHeight: 1.6 }}>
              De gouden zwemles methode. Persoonlijke aandacht, snel resultaat. 1-op-1 en 1-op-2 zwemlessen op 7 locaties door heel Nederland.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/website/inschrijven')}
                className="px-8 py-4 rounded-xl text-white transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)', fontSize: 16, fontWeight: 700, boxShadow: '0 8px 32px rgba(255,92,0,0.4)' }}
              >
                Inschrijven
              </button>
              <button
                onClick={() => navigate('/website/reserveren')}
                className="px-8 py-4 rounded-xl bg-white text-[#0365C4] transition-all hover:scale-[1.02]"
                style={{ fontSize: 16, fontWeight: 700, boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
              >
                Reserveren / Afmelden
              </button>
            </div>
          </div>
        </div>
        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,70 1440,60 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* USPs */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: Heart, title: 'Persoonlijke aandacht', desc: 'Wij staan naast de kinderen in het water. Zo leert het kind snel te vertrouwen op het water en op zichzelf.', color: '#FF5C00' },
              { icon: Zap, title: 'Snelheid', desc: 'Jouw zwemles, jouw zwemtijd. Leren zwemmen is ook doorzwemmen. Geen wachten op je beurt!', color: '#0365C4' },
              { icon: Shield, title: 'Duidelijkheid', desc: 'Wij zien alles! Geen zwemslag ontgaat ons, want we staan ernaast. Daarom leert ieder kind zwemmen, precies zoals het hoort.', color: '#00C1FF' },
            ].map((usp) => {
              const Icon = usp.icon;
              return (
                <div key={usp.title} className="bg-white rounded-2xl p-8 transition-all hover:translate-y-[-4px]" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${usp.color}12` }}>
                    <Icon size={26} color={usp.color} />
                  </div>
                  <h3 className="text-[#1A1A2E] mb-3" style={{ fontSize: 20, fontWeight: 700 }}>{usp.title}</h3>
                  <p className="text-[#6B7B94]" style={{ fontSize: 15, lineHeight: 1.7 }}>{usp.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lesaanbod */}
      <section className="py-16 lg:py-20 bg-[#F4F7FC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#0365C4]/10 text-[#0365C4] mb-4" style={{ fontSize: 13, fontWeight: 700 }}>ONS LESAANBOD</span>
            <h2 className="text-[#1A1A2E]" style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800 }}>De gouden zwemles methode</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ABC Zwemles */}
            <div className="bg-white rounded-2xl overflow-hidden group cursor-pointer hover:translate-y-[-4px] transition-all" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }} onClick={() => navigate('/website/lesaanbod/abc-zwemles')}>
              <div className="h-[240px] relative overflow-hidden">
                <ImageWithFallback src={learnImg} alt="ABC Zwemles" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="px-3 py-1.5 rounded-full bg-[#FF5C00] text-white" style={{ fontSize: 12, fontWeight: 700 }}>POPULAIR</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-[#1A1A2E] mb-2" style={{ fontSize: 22, fontWeight: 700 }}>ABC Zwemles</h3>
                <p className="text-[#6B7B94] mb-4" style={{ fontSize: 14, lineHeight: 1.6 }}>
                  Onze methode is uniek en het toverwoord is aandacht! Walter ontwikkelde een gouden zwemles methode die elk kind snel en met vertrouwen leert zwemmen.
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-[#6B7B94]" style={{ fontSize: 13 }}>
                    <Users size={15} /> 1-op-1 / 1-op-2
                  </div>
                  <div className="flex items-center gap-1.5 text-[#6B7B94]" style={{ fontSize: 13 }}>
                    <Clock size={15} /> 10 min per les
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#FF5C00]" style={{ fontSize: 16, fontWeight: 700 }}>Vanaf €27,00 per les</span>
                  <ChevronRight size={20} color="#0365C4" />
                </div>
              </div>
            </div>

            {/* Mini Survival */}
            <div className="bg-white rounded-2xl overflow-hidden group cursor-pointer hover:translate-y-[-4px] transition-all" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }} onClick={() => navigate('/website/lesaanbod/mini-survival')}>
              <div className="h-[240px] relative overflow-hidden">
                <ImageWithFallback src={poolImg} alt="Mini Survival" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="px-3 py-1.5 rounded-full bg-[#00C1FF] text-white" style={{ fontSize: 12, fontWeight: 700 }}>SURVIVAL</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-[#1A1A2E] mb-2" style={{ fontSize: 22, fontWeight: 700 }}>Mini Survival Zwemles</h3>
                <p className="text-[#6B7B94] mb-4" style={{ fontSize: 14, lineHeight: 1.6 }}>
                  Speciaal voor kinderen die al een zwemdiploma hebben. Leer overleven in onverwachte situaties in het water. Veiligheid staat voorop!
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-[#6B7B94]" style={{ fontSize: 13 }}>
                    <Users size={15} /> Kleine groepen
                  </div>
                  <div className="flex items-center gap-1.5 text-[#6B7B94]" style={{ fontSize: 13 }}>
                    <Award size={15} /> ENVOZ diploma
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#FF5C00]" style={{ fontSize: 16, fontWeight: 700 }}>€25,00 per les</span>
                  <ChevronRight size={20} color="#0365C4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locaties */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF5C00]/10 text-[#FF5C00] mb-4" style={{ fontSize: 13, fontWeight: 700 }}>7 LOCATIES</span>
            <h2 className="text-[#1A1A2E]" style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800 }}>Door heel Nederland</h2>
            <p className="text-[#6B7B94] mt-3 max-w-[500px] mx-auto" style={{ fontSize: 15 }}>
              Zwemles op prachtige locaties in luxe hotels met eigen zwembaden.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {locations.map(loc => (
              <button
                key={loc.slug}
                onClick={() => navigate(`/website/locatie/${loc.slug}`)}
                className="bg-white rounded-xl p-5 text-left transition-all hover:translate-y-[-2px] group"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid #F0F4FA' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)' }}>
                  <MapPin size={18} color="#fff" />
                </div>
                <h4 className="text-[#1A1A2E] group-hover:text-[#0365C4] transition-colors" style={{ fontSize: 16, fontWeight: 700 }}>
                  {loc.name}
                </h4>
                <p className="text-[#8E9BB3] mt-1" style={{ fontSize: 13 }}>{loc.venue}</p>
                <div className="flex items-center gap-1 mt-3 text-[#0365C4]">
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Bekijk locatie</span>
                  <ChevronRight size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quote from Walter */}
      <section className="py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)' }} />
        <div className="relative max-w-[800px] mx-auto px-4 sm:px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-6">
            <img src={snorkeltjeLogo} alt="" className="h-10 w-auto brightness-0 invert" onError={(e) => { e.currentTarget.src = snorkeltjeLogoPng; e.currentTarget.classList.remove('brightness-0', 'invert'); }} />
          </div>
          <blockquote className="text-white mb-6" style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 500, lineHeight: 1.6, fontStyle: 'italic' }}>
            "Wij halen het beste eruit en zijn enthousiast over iedere vordering, maar het gaat erom dat het kind met vertrouwen in het water ligt!"
          </blockquote>
          <p className="text-white/80" style={{ fontSize: 16, fontWeight: 600 }}>
            Walter van de Geest — Eigenaar en zwemleraar
          </p>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 lg:py-20 bg-[#F4F7FC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#0365C4]/10 text-[#0365C4] mb-4" style={{ fontSize: 13, fontWeight: 700 }}>REVIEWS</span>
            <h2 className="text-[#1A1A2E]" style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800 }}>Wat ouders zeggen</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="#FFD700" color="#FFD700" />)}
                  <span className="text-[#1A1A2E] ml-2" style={{ fontSize: 14, fontWeight: 700 }}>{review.rating}/10</span>
                </div>
                <p className="text-[#4A5568] mb-4" style={{ fontSize: 14, lineHeight: 1.7 }}>{review.text}</p>
                <p className="text-[#8E9BB3]" style={{ fontSize: 13, fontWeight: 600 }}>— {review.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button onClick={() => navigate('/website/reviews')} className="px-6 py-3 rounded-xl text-[#0365C4] bg-white hover:bg-[#0365C4] hover:text-white transition-all" style={{ fontSize: 14, fontWeight: 700, border: '2px solid #0365C4' }}>
              Bekijk alle reviews
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[900px] mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-[#1A1A2E] mb-4" style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800 }}>
            Klaar om te beginnen?
          </h2>
          <p className="text-[#6B7B94] mb-8 max-w-[500px] mx-auto" style={{ fontSize: 16, lineHeight: 1.6 }}>
            Schrijf je kind vandaag nog in en ontdek de gouden zwemles methode van Zwemschool Snorkeltje.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate('/website/inschrijven')} className="px-8 py-4 rounded-xl text-white transition-all hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)', fontSize: 16, fontWeight: 700, boxShadow: '0 8px 32px rgba(255,92,0,0.3)' }}>
              Inschrijven
            </button>
            <button onClick={() => navigate('/website/contact')} className="px-8 py-4 rounded-xl text-[#0365C4] transition-all hover:scale-[1.02]" style={{ fontSize: 16, fontWeight: 700, background: '#F4F7FC' }}>
              Neem contact op
            </button>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
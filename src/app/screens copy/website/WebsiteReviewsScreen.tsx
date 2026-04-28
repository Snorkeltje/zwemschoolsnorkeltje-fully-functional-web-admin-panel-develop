import { useState } from 'react';
import { useNavigate } from 'react-router';
import { WebsiteLayout } from '../../components/website/WebsiteLayout';
import { ChevronRight, Star, Search, CheckCircle2, MapPin, ThumbsUp } from 'lucide-react';

const allReviews = [
  { name: 'Marlene, Putten', rating: 10, text: 'Zo\'n ontzettende fijne en goede zwemschool. Mijn zoontje wilde nooit naar de vorige zwemschool en hij ging maar heel traag vooruit. Hij bleek zoveel verder te zijn, maar daar werd er niet individueel naar gekeken. Nu gaat hij iedere week met zoveel plezier en zwemt hij binnenkort af voor zijn B diploma!', location: 'Nijkerk', date: '15-03-2026', verified: true },
  { name: 'Familie De Vries', rating: 9.5, text: 'Persoonlijke aandacht en snelle vooruitgang. Onze dochter heeft in 6 maanden meer geleerd dan in 2 jaar bij een andere zwemschool.', location: 'De Bilt', date: '10-03-2026', verified: true },
  { name: 'Sandra, Nijkerk', rating: 10, text: 'Top zwemschool! De instructeurs zijn geduldig en professioneel. Mijn kinderen gaan met plezier naar zwemles.', location: 'Nijkerk', date: '05-03-2026', verified: true },
  { name: 'Peter, De Bilt', rating: 9, text: 'Geweldige methode. Onze zoon was eerst bang voor water, maar nu zwemt hij als een vis. Dankzij de persoonlijke aandacht.', location: 'De Bilt', date: '01-03-2026', verified: true },
  { name: 'Annemiek, Wolfheze', rating: 10, text: 'Wij zijn super tevreden over Snorkeltje. De locatie is prachtig en de instructeurs zijn heel lief voor de kinderen.', location: 'Wolfheze', date: '25-02-2026', verified: true },
  { name: 'Mark & Lisa, Garderen', rating: 9.5, text: 'Beide kinderen doen hier zwemles. De flexibiliteit van het systeem is top, en de kwaliteit van het onderwijs is uitstekend.', location: 'Garderen', date: '20-02-2026', verified: true },
  { name: 'Jolien, Dordrecht', rating: 10, text: 'Juf Yvette is fantastisch! Onze dochter heeft in korte tijd enorm veel vooruitgang geboekt. Aanrader!', location: 'Dordrecht', date: '15-02-2026', verified: true },
  { name: 'Rob, Mierlo', rating: 9, text: 'Goede ervaring met Zwemschool Snorkeltje in Mierlo. Meester Gert is kundig en geduldig. Zeker een aanrader.', location: 'Mierlo', date: '10-02-2026', verified: false },
  { name: 'Eva, Soest', rating: 10, text: 'Het Hilton zwembad is een geweldige locatie. Kinderen voelen zich speciaal en leren snel. Heel blij met onze keuze!', location: 'Soest', date: '05-02-2026', verified: true },
  { name: 'Jan-Willem, Nijkerk', rating: 9.5, text: 'Walter is een geweldige instructeur. Onze zoon heeft in record tijd zijn A-diploma gehaald. Het knipkaartensysteem is ook erg handig.', location: 'Nijkerk', date: '01-02-2026', verified: true },
  { name: 'Simone, Garderen', rating: 10, text: 'Fantastische zwemschool! De 1-op-1 methode werkt echt. Ons dochtertje is in een half jaar van waterangst naar drijven gegaan.', location: 'Garderen', date: '25-01-2026', verified: true },
  { name: 'Henk & Maria, Dordrecht', rating: 8.5, text: 'Goede zwemschool, alleen de wachtlijst is wel lang. Maar het wachten was het zeker waard!', location: 'Dordrecht', date: '20-01-2026', verified: false },
];

const ratingDistribution = [
  { stars: '10', count: 512, pct: 60 },
  { stars: '9-9.5', count: 213, pct: 25 },
  { stars: '8-8.5', count: 85, pct: 10 },
  { stars: '7-7.5', count: 30, pct: 4 },
  { stars: '<7', count: 7, pct: 1 },
];

export function WebsiteReviewsScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest'>('recent');
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', location: '', rating: 10, text: '' });

  const avgRating = (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1);

  const filtered = allReviews
    .filter(r => {
      if (search && !r.text.toLowerCase().includes(search.toLowerCase()) && !r.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (locationFilter && r.location !== locationFilter) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'highest') return b.rating - a.rating;
      if (sortBy === 'lowest') return a.rating - b.rating;
      return 0;
    });

  return (
    <WebsiteLayout>
      <section className="relative h-[200px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)' }}>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 w-full">
            <h1 className="text-white" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>Reviews</h1>
            <p className="text-white/80 mt-2" style={{ fontSize: 16 }}>Wat ouders zeggen over Zwemschool Snorkeltje</p>
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
          <span className="text-[#1A1A2E]" style={{ fontWeight: 600 }}>Reviews</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 pb-16">
        {/* Score summary + breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#F4F7FC] rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[1,2,3,4,5].map(i => <Star key={i} size={28} fill="#FFD700" color="#FFD700" />)}
            </div>
            <p className="text-[#1A1A2E]" style={{ fontSize: 48, fontWeight: 800 }}>{avgRating}</p>
            <p className="text-[#6B7B94]" style={{ fontSize: 14 }}>van 10</p>
            <p className="text-[#6B7B94] mt-2" style={{ fontSize: 14, fontWeight: 600 }}>Gebaseerd op 847 reviews</p>
            <button onClick={() => setShowForm(true)} className="mt-4 px-6 py-2.5 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)', fontSize: 14, fontWeight: 700 }}>
              Schrijf een review
            </button>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Beoordeling verdeling</h3>
            <div className="space-y-3">
              {ratingDistribution.map(r => (
                <div key={r.stars} className="flex items-center gap-3">
                  <span className="text-[#1A1A2E] w-[60px] text-right" style={{ fontSize: 13, fontWeight: 600 }}>{r.stars}</span>
                  <div className="flex items-center gap-1"><Star size={14} fill="#FFD700" color="#FFD700" /></div>
                  <div className="flex-1 h-3 rounded-full bg-[#F0F4FA] overflow-hidden">
                    <div className="h-full rounded-full bg-[#FFD700]" style={{ width: `${r.pct}%` }} />
                  </div>
                  <span className="text-[#6B7B94] w-[50px]" style={{ fontSize: 12 }}>{r.count}</span>
                  <span className="text-[#A0AEC0] w-[35px]" style={{ fontSize: 12 }}>{r.pct}%</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-[#F0F4FA]">
              <div className="text-center"><p className="text-[#0365C4]" style={{ fontSize: 24, fontWeight: 800 }}>98%</p><p className="text-[#6B7B94]" style={{ fontSize: 12 }}>Beveelt aan</p></div>
              <div className="text-center"><p className="text-[#FF5C00]" style={{ fontSize: 24, fontWeight: 800 }}>847</p><p className="text-[#6B7B94]" style={{ fontSize: 12 }}>Totaal reviews</p></div>
              <div className="text-center"><p className="text-[#27AE60]" style={{ fontSize: 24, fontWeight: 800 }}>725</p><p className="text-[#6B7B94]" style={{ fontSize: 12 }}>Geverifieerd</p></div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]" />
            <input placeholder="Zoek in reviews..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }} />
          </div>
          <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="px-4 py-2.5 rounded-xl bg-white border border-[#E8ECF4] text-[#1A1A2E] outline-none" style={{ fontSize: 14 }}>
            <option value="">Alle locaties</option>
            {['Nijkerk', 'De Bilt', 'Garderen', 'Wolfheze', 'Dordrecht', 'Mierlo', 'Soest'].map(l => <option key={l}>{l}</option>)}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="px-4 py-2.5 rounded-xl bg-white border border-[#E8ECF4] text-[#1A1A2E] outline-none" style={{ fontSize: 14 }}>
            <option value="recent">Meest recent</option>
            <option value="highest">Hoogste eerst</option>
            <option value="lowest">Laagste eerst</option>
          </select>
        </div>

        <p className="text-[#6B7B94] mb-4" style={{ fontSize: 13 }}>{filtered.length} reviews gevonden</p>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 transition-all hover:translate-y-[-2px]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#FFD700" color="#FFD700" />)}
                  <span className="text-[#1A1A2E] ml-2" style={{ fontSize: 14, fontWeight: 700 }}>{r.rating}/10</span>
                </div>
                {r.verified && (
                  <span className="flex items-center gap-1 text-[#27AE60]" style={{ fontSize: 11, fontWeight: 600 }}>
                    <CheckCircle2 size={12} /> Geverifieerd
                  </span>
                )}
              </div>
              <p className="text-[#4A5568] mb-4" style={{ fontSize: 14, lineHeight: 1.7 }}>"{r.text}"</p>
              <div className="flex items-center justify-between pt-3 border-t border-[#F0F4FA]">
                <div>
                  <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>{r.name}</p>
                  <p className="flex items-center gap-1 text-[#A0AEC0]" style={{ fontSize: 11 }}><MapPin size={10} /> {r.location} — {r.date}</p>
                </div>
                <button className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#A0AEC0] hover:text-[#0365C4]"><ThumbsUp size={14} /></button>
              </div>
            </div>
          ))}
        </div>

        {/* Review form modal */}
        {showForm && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => { setShowForm(false); setSubmitted(false); }} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[520px] mx-4 max-h-[90vh] overflow-y-auto">
              {submitted ? (
                <div className="p-8 text-center">
                  <CheckCircle2 size={48} className="text-[#27AE60] mx-auto mb-4" />
                  <h3 className="text-[#1A1A2E] mb-2" style={{ fontSize: 22, fontWeight: 700 }}>Bedankt voor je review!</h3>
                  <p className="text-[#6B7B94] mb-6" style={{ fontSize: 14 }}>Je review wordt na goedkeuring geplaatst.</p>
                  <button onClick={() => { setShowForm(false); setSubmitted(false); }} className="px-6 py-2.5 rounded-xl text-white" style={{ background: '#0365C4', fontSize: 14, fontWeight: 700 }}>Sluiten</button>
                </div>
              ) : (
                <>
                  <div className="px-6 py-5 border-b border-[#F0F4FA]">
                    <h3 className="text-[#1A1A2E]" style={{ fontSize: 20, fontWeight: 700 }}>Schrijf een review</h3>
                    <p className="text-[#6B7B94] mt-1" style={{ fontSize: 13 }}>Deel je ervaring met Zwemschool Snorkeltje</p>
                  </div>
                  <div className="px-6 py-5 space-y-4">
                    <div>
                      <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Naam *</label>
                      <input value={reviewForm.name} onChange={e => setReviewForm(p => ({ ...p, name: e.target.value }))} placeholder="Je naam" className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }} />
                    </div>
                    <div>
                      <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Locatie *</label>
                      <select value={reviewForm.location} onChange={e => setReviewForm(p => ({ ...p, location: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none text-[#1A1A2E]" style={{ fontSize: 14 }}>
                        <option value="">Kies een locatie</option>
                        {['Nijkerk', 'De Bilt', 'Garderen', 'Wolfheze', 'Dordrecht', 'Mierlo', 'Soest'].map(l => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[#6B7B94] block mb-2" style={{ fontSize: 12, fontWeight: 600 }}>Beoordeling *</label>
                      <div className="flex items-center gap-2">
                        {[6,7,8,9,10].map(r => (
                          <button key={r} onClick={() => setReviewForm(p => ({ ...p, rating: r }))}
                            className={`w-10 h-10 rounded-lg border-2 transition-all ${reviewForm.rating === r ? 'border-[#FFD700] bg-[#FFD700]/10 text-[#1A1A2E]' : 'border-[#E8ECF4] text-[#6B7B94]'}`}
                            style={{ fontSize: 14, fontWeight: 700 }}>{r}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Je review *</label>
                      <textarea value={reviewForm.text} onChange={e => setReviewForm(p => ({ ...p, text: e.target.value }))} rows={4} placeholder="Vertel over je ervaring..." className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E] resize-none" style={{ fontSize: 14 }} />
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-[#F0F4FA] flex justify-end gap-2">
                    <button onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-lg text-[#6B7B94] border border-[#E8ECF4]" style={{ fontSize: 14, fontWeight: 600 }}>Annuleer</button>
                    <button onClick={() => setSubmitted(true)} disabled={!reviewForm.name || !reviewForm.location || !reviewForm.text} className="px-6 py-2.5 rounded-xl text-white disabled:opacity-40" style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)', fontSize: 14, fontWeight: 700 }}>
                      Plaatsen
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </WebsiteLayout>
  );
}

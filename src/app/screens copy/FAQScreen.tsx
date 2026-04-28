import { useState } from 'react';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { Header } from '../components/layout/Header';
import { useLanguage } from '../config/LanguageContext';

type CatKey = 'all' | 'booking' | 'payment' | 'lessons' | 'account';

const faqsData: { q_nl: string; q_en: string; a_nl: string; a_en: string; cat: CatKey }[] = [
  { q_nl: 'Hoe boek ik een vast tijdstip?', q_en: 'How do I book a fixed slot?', a_nl: 'Log in en ga naar Boeken → Vast tijdstip. Kies een locatie, dag en tijd.', a_en: 'Log in and go to Book → Fixed slot. Choose a location, day and time.', cat: 'booking' },
  { q_nl: 'Kan ik een les annuleren?', q_en: 'Can I cancel a lesson?', a_nl: 'Ja, tot 24 uur van tevoren voor standaard lessen en 96 uur voor vakantielessen.', a_en: 'Yes, up to 24 hours before for standard lessons and 96 hours for holiday lessons.', cat: 'booking' },
  { q_nl: 'Hoe werken knipkaarten?', q_en: 'How do punch cards work?', a_nl: 'Koop een knipkaart met een aantal lessen. Per les wordt 1 credit afgeschreven.', a_en: 'Buy a punch card with a number of lessons. 1 credit is deducted per lesson.', cat: 'payment' },
  { q_nl: 'Wat is een inhaalles?', q_en: 'What is a catch-up lesson?', a_nl: 'Een les die u kunt boeken als vervanging voor een gemiste les (mits tijdig geannuleerd).', a_en: 'A lesson you can book as replacement for a missed lesson (if cancelled in time).', cat: 'lessons' },
  { q_nl: 'Hoe zie ik de voortgang van mijn kind?', q_en: 'How do I see my child\'s progress?', a_nl: 'Ga naar Thuis → Voortgang om niveaus, vaardigheden en stappen te bekijken.', a_en: 'Go to Home → Progress to view levels, skills and steps.', cat: 'lessons' },
  { q_nl: 'Hoe bekijk ik de voortgang?', q_en: 'How do I view progress?', a_nl: 'Ga naar het tabblad Voortgang op het startscherm om de niveaus en vaardigheden van uw kind te bekijken.', a_en: 'Go to the Progress tab on the home screen to view your child\'s levels and skills.', cat: 'lessons' },
  { q_nl: '14-dagenregel: hoe werkt dit?', q_en: '14-day rule: how does it work?', a_nl: 'Binnen 14 dagen worden beschikbare plekken opengesteld voor alle ouders, niet alleen vaste leerlingen. Zo kan iedereen profiteren van vrije plekken.', a_en: 'Within 14 days, available spots are opened to all parents, not just regular students. This way everyone can benefit from free spots.', cat: 'booking' },
];

export function FAQScreen() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState<CatKey>('all');
  const [open, setOpen] = useState<number>(0);
  const [search, setSearch] = useState('');

  const catLabels: Record<CatKey, string> = {
    all: t('common.all'),
    booking: t('faq.booking'),
    payment: t('faq.payment'),
    lessons: t('faq.lessons'),
    account: t('faq.account'),
  };

  const faqs = faqsData.map(f => ({
    q: lang === 'en' ? f.q_en : f.q_nl,
    a: lang === 'en' ? f.a_en : f.a_nl,
    cat: f.cat,
  }));

  const filtered = faqs.filter(f =>
    (filter === 'all' || f.cat === filter) &&
    (search === '' || f.q.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-24">
        <Header title={t('faq.title')} showBack />

        <div className="px-5 pt-2">
          {/* Search */}
          <div className="bg-white rounded-[10px] border border-[#E5E7EB] h-[44px] flex items-center px-4 mb-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`🔍  ${t('faq.search')}`}
              className="w-full bg-transparent text-[#131827] placeholder-[#818EA6] focus:outline-none"
              style={{ fontSize: 14 }}
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-3">
            {(Object.keys(catLabels) as CatKey[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 h-[30px] rounded-[15px] flex-shrink-0 ${filter === cat ? 'bg-[#0365C4] text-white' : 'bg-white text-[#818EA6]'}`}
                style={{ fontSize: 12, fontWeight: filter === cat ? 700 : 400 }}
              >
                {catLabels[cat]}
              </button>
            ))}
          </div>

          {/* FAQ items */}
          <div className="space-y-2">
            {filtered.map((faq, i) => (
              <div key={i} className="bg-white rounded-[10px]">
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full px-4 py-4 flex items-center justify-between text-left"
                >
                  <span className="text-[#131827]" style={{ fontSize: 14, fontWeight: open === i ? 700 : 400 }}>{faq.q}</span>
                  <span className="text-[#818EA6] flex-shrink-0 ml-2" style={{ fontSize: 14 }}>{open === i ? '▲' : '▼'}</span>
                </button>
                {open === i && (
                  <div className="px-4 pb-4">
                    <p className="text-[#44516B]" style={{ fontSize: 12 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

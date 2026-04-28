import { useState } from 'react';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { ChevronLeft, Star, ThumbsUp, Filter } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../config/LanguageContext';

const reviews = [
  { id: 1, name: 'Familie De Vries', rating: 10, date: '2 weken geleden', text: 'Fantastische zwemschool! Onze dochter Lisa heeft in recordtijd haar A-diploma gehaald. Walter en zijn team zijn geweldig met kinderen.', helpful: 24, location: 'De Bilt' },
  { id: 2, name: 'M. Jansen', rating: 9, date: '1 maand geleden', text: 'Heel persoonlijke aanpak. De 1-op-1 lessen maken echt het verschil. Ons zoontje gaat met plezier naar zwemles!', helpful: 18, location: 'Nijkerk' },
  { id: 3, name: 'Familie Bakker', rating: 10, date: '1 maand geleden', text: 'Beste zwemschool van Nederland! De instructeurs zijn geduldig en deskundig. Beide kinderen hebben hier hun diploma behaald.', helpful: 31, location: 'Garderen' },
  { id: 4, name: 'A. van Dijk', rating: 9, date: '2 maanden geleden', text: 'Snorkeltje is echt top! De app is ook heel handig om lessen te boeken en voortgang te volgen. Aanrader!', helpful: 15, location: 'Mierlo' },
  { id: 5, name: 'Familie Smit', rating: 10, date: '2 maanden geleden', text: 'Al onze 3 kinderen zwemmen bij Snorkeltje. De kwaliteit is constant hoog en het team is super vriendelijk.', helpful: 27, location: 'Wolfheze' },
  { id: 6, name: 'R. Peters', rating: 8, date: '3 maanden geleden', text: 'Goede ervaring. Soms lastig om een tijdslot te vinden maar de kwaliteit van de lessen is uitstekend.', helpful: 9, location: 'Dordrecht' },
  { id: 7, name: 'Familie Visser', rating: 10, date: '3 maanden geleden', text: 'Wij zijn enorm tevreden! De voortgangsrapportages zijn heel duidelijk en je ziet echt de groei van je kind.', helpful: 22, location: 'Soest' },
  { id: 8, name: 'K. de Groot', rating: 9, date: '4 maanden geleden', text: 'Professioneel en kindvriendelijk. De knipkaartsysteem werkt heel goed. Duidelijke communicatie via de app.', helpful: 14, location: 'De Bilt' },
];

type FilterType = 'Alle' | '10' | '9' | '8';

export function ReviewsScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [filter, setFilter] = useState<FilterType>('Alle');

  const filtered = filter === 'Alle' ? reviews : reviews.filter(r => r.rating === parseInt(filter));
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-28">
        {/* Header */}
        <div
          className="relative px-5 pt-[58px] pb-8 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FF5C00 0%, #F5A623 100%)',
            borderRadius: '0 0 32px 32px',
          }}
        >
          <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 430 30" fill="none" style={{ opacity: 0.12 }}>
            <path d="M0 15 Q107 0 215 15 Q322 30 430 15 L430 30 L0 30 Z" fill="#fff" />
          </svg>
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-[12px] flex items-center justify-center mb-3"
            style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}
          >
            <ChevronLeft size={20} color="#fff" />
          </button>
          <p className="text-white relative z-10" style={{ fontSize: 22, fontWeight: 700 }}>{t('reviews.title')}</p>
          <p className="text-white/70 mt-1 relative z-10" style={{ fontSize: 13 }}>{t('reviews.subtitle')}</p>
        </div>

        {/* Stats card */}
        <div className="px-5 -mt-4">
          <div className="bg-white rounded-[18px] p-5 flex items-center gap-5" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
            <div className="flex flex-col items-center">
              <p className="text-[#1A1A2E]" style={{ fontSize: 40, fontWeight: 700 }}>{avg}</p>
              <div className="flex mt-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={14} color="#FFD700" fill="#FFD700" />
                ))}
              </div>
              <p className="text-[#8E9BB3] mt-1" style={{ fontSize: 11 }}>{reviews.length} reviews</p>
            </div>
            <div className="flex-1 space-y-1.5">
              {[
                { score: '10', count: reviews.filter(r => r.rating === 10).length },
                { score: '9', count: reviews.filter(r => r.rating === 9).length },
                { score: '8', count: reviews.filter(r => r.rating === 8).length },
              ].map(bar => (
                <div key={bar.score} className="flex items-center gap-2">
                  <span className="text-[#8E9BB3] w-5 text-right" style={{ fontSize: 11, fontWeight: 600 }}>{bar.score}</span>
                  <div className="flex-1 h-[6px] bg-[#F0F4FA] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(bar.count / reviews.length) * 100}%`, background: 'linear-gradient(90deg, #FF5C00, #F5A623)' }} />
                  </div>
                  <span className="text-[#8E9BB3] w-5" style={{ fontSize: 11 }}>{bar.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-5 mt-5 flex items-center gap-2">
          <Filter size={14} color="#8E9BB3" />
          {(['Alle', '10', '9', '8'] as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="rounded-full px-3.5 py-1.5 transition-all"
              style={{
                background: filter === f ? 'linear-gradient(135deg, #0365C4, #00C1FF)' : '#fff',
                color: filter === f ? '#fff' : '#4A5568',
                fontSize: 12,
                fontWeight: 600,
                boxShadow: filter === f ? '0 4px 12px rgba(3,101,196,0.25)' : '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              {f === 'Alle' ? 'Alle' : `${f}/10`}
            </button>
          ))}
        </div>

        {/* Reviews list */}
        <div className="px-5 mt-4 space-y-3">
          {filtered.map(review => (
            <div key={review.id} className="bg-white rounded-[18px] p-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)' }}>
                    <span className="text-white" style={{ fontSize: 15, fontWeight: 700 }}>{review.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 700 }}>{review.name}</p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#8E9BB3]" style={{ fontSize: 10 }}>{review.location}</span>
                      <span className="text-[#C4CDD9]">·</span>
                      <span className="text-[#8E9BB3]" style={{ fontSize: 10 }}>{review.date}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-full px-2.5 py-1" style={{ background: review.rating >= 9 ? '#E8F8F0' : '#FEF0E7' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: review.rating >= 9 ? '#27AE60' : '#FF5C00' }}>{review.rating}/10</span>
                </div>
              </div>
              <p className="text-[#4A5568] mt-3" style={{ fontSize: 13, lineHeight: 1.5 }}>{review.text}</p>
              <div className="flex items-center gap-1.5 mt-3">
                <ThumbsUp size={13} color="#8E9BB3" />
                <span className="text-[#8E9BB3]" style={{ fontSize: 11 }}>{review.helpful} {t('reviews.helpful')}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="h-4" />
      </div>
      <BottomNav />
    </MobileFrame>
  );
}
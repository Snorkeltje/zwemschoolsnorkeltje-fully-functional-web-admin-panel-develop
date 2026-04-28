import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';
import { ChevronLeft, CreditCard, Waves, Check, Star, ShieldCheck, Clock, ChevronRight } from 'lucide-react';
import { useLanguage } from '../config/LanguageContext';

type CardType = '1-op-1' | '1-op-2';

const pricingData: Record<CardType, { count: number; price: number; perLesson: number; savings: string | null }[]> = {
  '1-op-1': [
    { count: 10, price: 380, perLesson: 38, savings: null },
    { count: 5, price: 190, perLesson: 38, savings: null },
    { count: 3, price: 114, perLesson: 38, savings: null },
  ],
  '1-op-2': [
    { count: 10, price: 270, perLesson: 27, savings: '29%' },
    { count: 5, price: 135, perLesson: 27, savings: '29%' },
    { count: 3, price: 81, perLesson: 27, savings: '29%' },
  ],
};

export function PunchCardOrderScreen() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [cardType, setCardType] = useState<CardType>('1-op-1');
  const [selected, setSelected] = useState<number>(0);
  const options = pricingData[cardType];
  const current = options[selected];

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-28">
        {/* Hero Header */}
        <div
          className="relative px-5 pt-[58px] pb-10 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0365C4 0%, #0D7FE8 50%, #00C1FF 100%)',
            borderRadius: '0 0 32px 32px',
          }}
        >
          <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 430 40" fill="none" style={{ opacity: 0.12 }}>
            <path d="M0 20 Q107 0 215 20 Q322 40 430 20 L430 40 L0 40 Z" fill="#fff" />
          </svg>
          <Waves size={120} className="absolute top-8 right-[-20px] text-white/5" />

          <div className="flex items-center gap-3 relative z-10">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
              <ChevronLeft size={20} color="#fff" />
            </button>
            <div className="flex-1">
              <p className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>
                {lang === 'en' ? 'Order Punch Card' : 'Bestel Knipkaart'}
              </p>
              <p className="text-white/60" style={{ fontSize: 12 }}>
                {lang === 'en' ? 'Choose your ideal package' : 'Kies uw ideale pakket'}
              </p>
            </div>
          </div>

          {/* Card Type Toggle */}
          <div className="mt-5 flex rounded-[14px] p-[3px] relative z-10" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
            {(['1-op-1', '1-op-2'] as CardType[]).map(ct => (
              <button
                key={ct}
                onClick={() => { setCardType(ct); setSelected(0); }}
                className="flex-1 h-[40px] rounded-[11px] flex items-center justify-center gap-1.5 transition-all"
                style={{
                  background: cardType === ct ? '#fff' : 'transparent',
                  boxShadow: cardType === ct ? '0 4px 12px rgba(0,0,0,0.12)' : 'none',
                }}
              >
                <CreditCard size={14} color={cardType === ct ? '#0365C4' : 'rgba(255,255,255,0.7)'} />
                <span style={{ fontSize: 13, fontWeight: 700, color: cardType === ct ? '#0365C4' : 'rgba(255,255,255,0.7)' }}>
                  {ct === '1-op-1' ? (lang === 'en' ? '1-on-1' : '1-op-1') : (lang === 'en' ? '1-on-2' : '1-op-2')}
                </span>
                {ct === '1-op-2' && (
                  <span className="rounded-full px-1.5 py-0.5" style={{ fontSize: 8, fontWeight: 700, background: '#FF5C00', color: '#fff' }}>
                    {lang === 'en' ? 'SAVE' : 'KORTING'}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="px-5 -mt-5">
          <div className="space-y-3">
            {options.map((opt, i) => {
              const isSelected = selected === i;
              const isBest = i === 0;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className="w-full rounded-[20px] relative overflow-hidden text-left transition-all active:scale-[0.98]"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, #0365C4 0%, #0D7FE8 100%)'
                      : '#fff',
                    boxShadow: isSelected
                      ? '0 12px 32px rgba(3,101,196,0.25)'
                      : '0 4px 16px rgba(0,0,0,0.06)',
                    border: isSelected ? 'none' : '2px solid transparent',
                  }}
                >
                  {/* Best value badge */}
                  {isBest && (
                    <div
                      className="absolute top-0 right-0 rounded-bl-[14px] px-3 py-1.5 flex items-center gap-1"
                      style={{ background: isSelected ? 'rgba(255,255,255,0.2)' : 'linear-gradient(135deg, #FF5C00, #F5A623)' }}
                    >
                      <Star size={10} color={isSelected ? '#fff' : '#fff'} fill={isSelected ? '#fff' : '#fff'} />
                      <span style={{ fontSize: 9, fontWeight: 700, color: '#fff' }}>
                        {lang === 'en' ? 'BEST VALUE' : 'BESTE KEUZE'}
                      </span>
                    </div>
                  )}

                  <div className="p-5 flex items-center gap-4">
                    {/* Count badge */}
                    <div
                      className="w-[72px] h-[72px] rounded-[18px] flex flex-col items-center justify-center flex-shrink-0"
                      style={{
                        background: isSelected
                          ? 'rgba(255,255,255,0.15)'
                          : `linear-gradient(135deg, ${cardType === '1-op-1' ? '#E8F0FE' : '#FEF0E7'}, ${cardType === '1-op-1' ? '#F0F6FF' : '#FFF8F0'})`,
                      }}
                    >
                      <span style={{
                        fontSize: 28, fontWeight: 700,
                        color: isSelected ? '#fff' : (cardType === '1-op-1' ? '#0365C4' : '#FF5C00'),
                      }}>{opt.count}x</span>
                      <span style={{
                        fontSize: 11, fontWeight: 600,
                        color: isSelected ? 'rgba(255,255,255,0.7)' : '#8E9BB3',
                      }}>{lang === 'en' ? 'lessons' : 'lessen'}</span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: 16, fontWeight: 700, color: isSelected ? '#fff' : '#1A1A2E' }}>
                        {lang === 'en'
                          ? `${opt.count}x ${cardType === '1-op-1' ? '1-on-1' : '1-on-2'} Lessons`
                          : `${opt.count}x ${cardType} Zwemlessen`
                        }
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span style={{ fontSize: 22, fontWeight: 700, color: isSelected ? '#fff' : '#0365C4' }}>
                          €{opt.price}
                        </span>
                        {opt.savings && (
                          <span className="rounded-full px-2 py-0.5" style={{
                            fontSize: 10, fontWeight: 700,
                            background: isSelected ? 'rgba(255,92,0,0.3)' : '#FEF0E7',
                            color: isSelected ? '#FFB380' : '#FF5C00',
                          }}>
                            -{opt.savings}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span style={{ fontSize: 11, color: isSelected ? 'rgba(255,255,255,0.6)' : '#8E9BB3' }}>
                          €{opt.perLesson} {lang === 'en' ? 'per lesson' : 'per les'}
                        </span>
                        <span style={{ fontSize: 11, color: isSelected ? 'rgba(255,255,255,0.6)' : '#8E9BB3' }}>
                          · 365 {lang === 'en' ? 'days valid' : 'dagen geldig'}
                        </span>
                      </div>
                    </div>

                    {/* Check */}
                    <div
                      className="w-[28px] h-[28px] rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isSelected ? '#fff' : '#F0F4FA',
                        boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                      }}
                    >
                      {isSelected && <Check size={16} color="#0365C4" strokeWidth={3} />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Trust badges */}
        <div className="px-5 mt-5">
          <div className="flex items-center justify-around bg-white rounded-[16px] py-3.5 px-2" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            {[
              { icon: ShieldCheck, label: lang === 'en' ? 'Secure payment' : 'Veilig betalen', color: '#27AE60' },
              { icon: Clock, label: lang === 'en' ? '365 days valid' : '365 dagen geldig', color: '#0365C4' },
              { icon: CreditCard, label: lang === 'en' ? 'Direct start' : 'Direct starten', color: '#FF5C00' },
            ].map(badge => {
              const Icon = badge.icon;
              return (
                <div key={badge.label} className="flex flex-col items-center gap-1">
                  <Icon size={16} color={badge.color} />
                  <span className="text-[#4A5568] text-center" style={{ fontSize: 9, fontWeight: 600, lineHeight: '12px' }}>{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* What's included */}
        <div className="px-5 mt-5">
          <p className="text-[#1A1A2E] mb-2.5" style={{ fontSize: 15, fontWeight: 700 }}>
            {lang === 'en' ? 'What\'s included' : 'Wat zit erin'}
          </p>
          <div className="bg-white rounded-[18px] p-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            {[
              lang === 'en' ? `${current.count} swimming lessons (${cardType === '1-op-1' ? '1-on-1' : '1-on-2'})` : `${current.count} zwemlessen (${cardType})`,
              lang === 'en' ? 'Valid for 365 days from purchase' : 'Geldig 365 dagen na aankoop',
              lang === 'en' ? 'Book flexibly — any time, any location' : 'Flexibel boeken — elk moment, elke locatie',
              lang === 'en' ? 'Progress tracking included' : 'Voortgangsrapportage inbegrepen',
              lang === 'en' ? 'Free cancellation up to 24h before' : 'Gratis annuleren tot 24 uur van tevoren',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 py-2" style={{ borderTop: i > 0 ? '1px solid #F0F4FA' : 'none' }}>
                <div className="w-[20px] h-[20px] rounded-full bg-[#E8F8F0] flex items-center justify-center flex-shrink-0">
                  <Check size={12} color="#27AE60" strokeWidth={3} />
                </div>
                <span className="text-[#4A5568]" style={{ fontSize: 13 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-conversion note for 1-op-1 */}
        {cardType === '1-op-1' && (
          <div className="px-5 mt-4">
            <button
              onClick={() => navigate('/auto-conversion/1')}
              className="w-full rounded-[14px] px-4 py-3 flex items-center gap-3 active:scale-[0.98] transition-all"
              style={{ background: 'linear-gradient(135deg, #FFF8F0, #FFF5E8)', border: '1.5px solid #F5DCC0' }}
            >
              <div className="w-[32px] h-[32px] rounded-[10px] bg-[#FF5C00]/10 flex items-center justify-center flex-shrink-0">
                <CreditCard size={14} color="#FF5C00" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 700 }}>
                  {lang === 'en' ? 'Auto-conversion available' : 'Auto-omzetting beschikbaar'}
                </p>
                <p className="text-[#8E9BB3]" style={{ fontSize: 10 }}>
                  {lang === 'en' ? '1-on-1 → 1-on-2 with refund' : '1-op-1 → 1-op-2 met restitutie'}
                </p>
              </div>
              <ChevronRight size={14} color="#FF5C00" />
            </button>
          </div>
        )}
      </div>

      {/* Sticky bottom CTA */}
      <div className="absolute bottom-[82px] left-0 right-0 z-20 px-5 pb-3">
        <div
          className="rounded-[20px] p-4 flex items-center justify-between"
          style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 -4px 24px rgba(0,0,0,0.1)',
          }}
        >
          <div>
            <p className="text-[#8E9BB3]" style={{ fontSize: 10 }}>{t('common.total')}</p>
            <p className="text-[#1A1A2E]" style={{ fontSize: 26, fontWeight: 700 }}>€{current.price}</p>
            <p className="text-[#8E9BB3]" style={{ fontSize: 10 }}>{current.count}x {cardType}</p>
          </div>
          <button
            onClick={() => navigate('/confirm-order')}
            className="h-[52px] rounded-[16px] px-7 flex items-center gap-2 transition-all active:scale-[0.97]"
            style={{
              background: 'linear-gradient(135deg, #FF5C00, #F5A623)',
              boxShadow: '0 8px 24px rgba(255,92,0,0.35)',
            }}
          >
            <CreditCard size={18} color="#fff" />
            <span className="text-white" style={{ fontSize: 15, fontWeight: 700 }}>
              {lang === 'en' ? 'Order now' : 'Bestellen'}
            </span>
          </button>
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
}
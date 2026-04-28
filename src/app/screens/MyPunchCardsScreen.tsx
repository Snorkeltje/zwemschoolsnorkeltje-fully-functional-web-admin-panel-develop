import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { useNavigate } from 'react-router';
import { ChevronLeft, CreditCard, ChevronRight, ShoppingCart, Waves } from 'lucide-react';
import { useLanguage } from '../config/LanguageContext';

const purchaseOptions = [
  { type: '1-op-1', color: '#0365C4', gradient: 'linear-gradient(135deg, #0365C4, #00C1FF)', prices: '10x €380  ·  5x €190  ·  3x €114' },
  { type: '1-op-2', color: '#FF5C00', gradient: 'linear-gradient(135deg, #FF5C00, #F5A623)', prices: '10x €270  ·  5x €135  ·  3x €81' },
  { type: '1-op-3', color: '#27AE60', gradient: 'linear-gradient(135deg, #27AE60, #2ECC71)', prices: '10x €200  ·  5x €100  ·  3x €60' },
  { type: 'Survival', color: '#8E44AD', gradient: 'linear-gradient(135deg, #8E44AD, #9B59B6)', prices: '10x €250  ·  5x €125  ·  3x €75' },
];

export function MyPunchCardsScreen() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-28">
        {/* Header */}
        <div 
          className="px-5 pt-[58px] pb-5"
          style={{ 
            background: 'linear-gradient(135deg, #0365C4 0%, #00C1FF 100%)',
            borderRadius: '0 0 24px 24px',
          }}
        >
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.18)' }}>
              <ChevronLeft size={20} color="#fff" />
            </button>
            <div>
              <p className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>{t('cards.title')}</p>
              <p className="text-white/60" style={{ fontSize: 12 }}>{lang === 'en' ? 'Balance & orders' : 'Saldo & bestellingen'}</p>
            </div>
          </div>
        </div>

        <div className="px-5 pt-4">
          {/* Primary punch card */}
          <button 
            onClick={() => navigate('/punch-card/22976')}
            className="w-full rounded-[22px] p-5 relative overflow-hidden text-left active:scale-[0.98] transition-all"
            style={{ 
              background: 'linear-gradient(135deg, #0365C4 0%, #034DA9 100%)',
              boxShadow: '0 12px 32px rgba(3,101,196,0.3)',
            }}
          >
            <Waves size={80} className="absolute top-1 right-2 text-white/8" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard size={18} color="#00C1FF" />
                  <p className="text-white/80" style={{ fontSize: 13, fontWeight: 600 }}>{lang === 'en' ? '1-on-1 Swimming Lessons' : '1-op-1 Zwemlessen'}</p>
                </div>
                <ChevronRight size={18} color="rgba(255,255,255,0.4)" />
              </div>
              <p className="text-white mt-4" style={{ fontSize: 36, fontWeight: 700 }}>8 <span style={{ fontSize: 16, fontWeight: 500, opacity: 0.7 }}>/ 10 credits</span></p>
              <div className="mt-2 h-[8px] bg-white/15 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: '80%', background: 'linear-gradient(90deg, #00C1FF, #fff)' }} />
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-white/50" style={{ fontSize: 11 }}>{lang === 'en' ? 'Valid until' : 'Geldig tot'}: 24 {lang === 'en' ? 'Mar' : 'mrt'} 2027</p>
                <p className="text-white/50" style={{ fontSize: 11 }}>{lang === 'en' ? 'Card' : 'Kaart'} #22976</p>
              </div>
            </div>
          </button>

          {/* Secondary card */}
          <button
            onClick={() => navigate('/punch-card/22980')}
            className="w-full rounded-[18px] p-4 mt-3 relative overflow-hidden text-left active:scale-[0.98] transition-all"
            style={{ 
              background: 'linear-gradient(135deg, #27AE60 0%, #1E8C4E 100%)',
              boxShadow: '0 8px 24px rgba(39,174,96,0.25)',
            }}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard size={16} color="#A0F0C0" />
                  <p className="text-white/80" style={{ fontSize: 12, fontWeight: 600 }}>{lang === 'en' ? '1-on-2 Swimming Lessons' : '1-op-2 Zwemlessen'}</p>
                </div>
                <ChevronRight size={16} color="rgba(255,255,255,0.4)" />
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-white" style={{ fontSize: 24, fontWeight: 700 }}>5 <span style={{ fontSize: 14, fontWeight: 400, opacity: 0.7 }}>/ 5 credits</span></p>
                <p className="text-white/50" style={{ fontSize: 11 }}>{lang === 'en' ? 'Valid until' : 'Geldig tot'}: 15 jun 2027</p>
              </div>
            </div>
          </button>

          {/* Purchase section */}
          <div className="flex items-center justify-between mt-6 mb-3">
            <p className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>{t('home.order_card')}</p>
            <button onClick={() => navigate('/all-punch-card-prices')} className="text-[#0365C4]" style={{ fontSize: 12, fontWeight: 600 }}>
              {lang === 'en' ? 'All prices' : 'Alle prijzen'} →
            </button>
          </div>

          <div className="space-y-2.5">
            {purchaseOptions.map((opt) => (
              <button
                key={opt.type}
                onClick={() => navigate('/punch-card-order')}
                className="w-full bg-white rounded-[16px] px-4 py-3.5 flex items-center gap-3.5 text-left active:scale-[0.99] transition-all"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <div 
                  className="w-[42px] h-[42px] rounded-[12px] flex items-center justify-center flex-shrink-0"
                  style={{ background: opt.gradient }}
                >
                  <CreditCard size={18} color="#fff" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{opt.type}</p>
                  <p className="text-[#8E9BB3] mt-0.5" style={{ fontSize: 11 }}>{opt.prices}</p>
                </div>
                <div 
                  className="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center"
                  style={{ backgroundColor: `${opt.color}12` }}
                >
                  <ShoppingCart size={14} color={opt.color} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}
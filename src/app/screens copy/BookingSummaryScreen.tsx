import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { ChevronLeft, Clock, MapPin, User, Calendar, CreditCard, ChevronDown, Shield, ChevronRight } from 'lucide-react';

export function BookingSummaryScreen() {
  const navigate = useNavigate();

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
              <p className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>Overzicht</p>
              <p className="text-white/60" style={{ fontSize: 12 }}>Controleer en bevestig</p>
            </div>
          </div>
        </div>

        <div className="px-5 -mt-3">
          {/* Lesson card */}
          <div className="bg-white rounded-[18px] p-5 relative overflow-hidden" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            <div className="absolute left-0 top-4 bottom-4 w-[4px] rounded-r-full" style={{ background: 'linear-gradient(180deg, #0365C4, #00C1FF)' }} />
            
            <div className="flex items-center justify-between ml-2 mb-4">
              <p className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>1-op-1 Zwemles</p>
              <div className="rounded-full px-3 py-1" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)' }}>
                <span className="text-white" style={{ fontSize: 11, fontWeight: 700 }}>1-op-1</span>
              </div>
            </div>

            <div className="ml-2 space-y-3">
              {[
                { icon: MapPin, label: 'De Bilt Zwembad', color: '#0365C4' },
                { icon: Calendar, label: 'Maandag 21 april 2026', color: '#FF5C00' },
                { icon: Clock, label: '15:00 – 15:30 (30 min)', color: '#00C1FF' },
                { icon: User, label: 'Jan de Vries', color: '#27AE60' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[8px] flex items-center justify-center" style={{ backgroundColor: `${item.color}12` }}>
                      <Icon size={15} color={item.color} />
                    </div>
                    <span className="text-[#4A5568]" style={{ fontSize: 13 }}>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Child */}
          <div className="mt-4">
            <p className="text-[#8E9BB3] mb-2" style={{ fontSize: 12, fontWeight: 600 }}>Kind</p>
            <div className="bg-white rounded-[14px] px-4 py-3.5 flex items-center gap-3" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)' }}>
                <span className="text-white" style={{ fontSize: 14, fontWeight: 700 }}>S</span>
              </div>
              <span className="text-[#1A1A2E] flex-1" style={{ fontSize: 14, fontWeight: 600 }}>Sami Khilji (7 jaar)</span>
              <ChevronDown size={16} color="#8E9BB3" />
            </div>
          </div>

          {/* Payment */}
          <div className="mt-4">
            <p className="text-[#8E9BB3] mb-2" style={{ fontSize: 12, fontWeight: 600 }}>Betaalmethode</p>
            
            <button
              onClick={() => navigate('/payment-method')}
              className="w-full bg-white rounded-[14px] p-4 flex items-center gap-3 active:scale-[0.99] transition-all"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '2px solid #0365C4' }}
            >
              <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)' }}>
                <CreditCard size={18} color="#fff" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>Knipkaart #22976</p>
                <p className="text-[#8E9BB3]" style={{ fontSize: 11 }}>8/10 credits resterend</p>
              </div>
              <ChevronRight size={16} color="#0365C4" />
            </button>
          </div>

          {/* Price */}
          <div className="bg-white rounded-[16px] p-4 mt-5" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <p className="text-[#1A1A2E] mb-3" style={{ fontSize: 14, fontWeight: 700 }}>Prijsoverzicht</p>
            <div className="flex items-center justify-between">
              <span className="text-[#6B7B94]" style={{ fontSize: 13 }}>Les:</span>
              <span className="text-[#27AE60]" style={{ fontSize: 13, fontWeight: 600 }}>€0 (knipkaart)</span>
            </div>
            <div className="h-px bg-[#F0F4FA] my-2.5" />
            <div className="flex items-center justify-between">
              <span className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>Totaal:</span>
              <span className="text-[#0365C4]" style={{ fontSize: 15, fontWeight: 700 }}>1 credit inhouden</span>
            </div>
          </div>

          {/* Confirm */}
          <button
            onClick={() => navigate('/booking-success')}
            className="w-full h-[56px] rounded-[16px] text-white mt-5 transition-all active:scale-[0.98]"
            style={{ 
              background: 'linear-gradient(135deg, #0365C4, #0D7FE8)',
              fontSize: 16, fontWeight: 700,
              boxShadow: '0 8px 24px rgba(3,101,196,0.3)',
            }}
          >
            Bevestigen & Boeken ✓
          </button>

          <div className="flex items-center justify-center gap-2 mt-3 pb-4">
            <Shield size={13} color="#8E9BB3" />
            <p className="text-[#8E9BB3]" style={{ fontSize: 11 }}>Beveiligde transactie · SSL versleuteld</p>
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

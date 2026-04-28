import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';
import { CheckCircle, Calendar, MapPin, User, Clock, CreditCard } from 'lucide-react';

export function BookingSuccessScreen() {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="h-full flex flex-col bg-white relative overflow-hidden">
        {/* Top decoration */}
        <div className="absolute top-0 left-0 right-0 h-[300px]" style={{ background: 'linear-gradient(180deg, #E8F8F0 0%, #FFFFFF 100%)' }} />
        <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(39,174,96,0.1), transparent 70%)', transform: 'translate(30%, -30%)' }} />

        <div className="relative z-10 flex-1 flex flex-col px-5 pt-[80px]">
          {/* Success icon */}
          <div className="flex justify-center mb-5">
            <div 
              className="w-[100px] h-[100px] rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #E8F8F0, #D4F5E0)', boxShadow: '0 12px 32px rgba(39,174,96,0.15)' }}
            >
              <CheckCircle size={50} color="#27AE60" strokeWidth={1.5} />
            </div>
          </div>

          <p className="text-[#1A1A2E] text-center" style={{ fontSize: 26, fontWeight: 700 }}>Les geboekt! 🎉</p>
          <p className="text-[#6B7B94] text-center mt-1" style={{ fontSize: 14 }}>Uw les is succesvol bevestigd.</p>

          {/* Details */}
          <div 
            className="bg-white rounded-[20px] p-5 mt-6 relative overflow-hidden"
            style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
          >
            <div className="absolute left-0 top-4 bottom-4 w-[4px] rounded-r-full bg-[#27AE60]" />
            
            <p className="text-[#1A1A2E] ml-2 mb-4" style={{ fontSize: 16, fontWeight: 700 }}>1-op-1 Zwemles</p>
            
            <div className="ml-2 space-y-2.5">
              {[
                { icon: Calendar, label: 'Maandag 21 april 2026', color: '#FF5C00' },
                { icon: Clock, label: '15:00 – 15:30', color: '#00C1FF' },
                { icon: MapPin, label: 'De Bilt Zwembad', color: '#0365C4' },
                { icon: User, label: 'Jan de Vries', color: '#27AE60' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-[7px] flex items-center justify-center" style={{ backgroundColor: `${item.color}12` }}>
                      <Icon size={14} color={item.color} />
                    </div>
                    <span className="text-[#4A5568]" style={{ fontSize: 13 }}>{item.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 pt-3 ml-2 border-t border-[#F0F4FA] flex items-center gap-2">
              <CreditCard size={14} color="#27AE60" />
              <span className="text-[#27AE60]" style={{ fontSize: 12, fontWeight: 600 }}>Knipkaart: nog 7 credits resterend</span>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center mt-5">
            <div 
              className="w-[140px] h-[140px] rounded-[16px] flex items-center justify-center p-3"
              style={{ background: '#F4F7FC', border: '2px dashed #D0E4F7' }}
            >
              <div className="grid grid-cols-5 gap-1 w-full h-full">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-[3px]"
                    style={{
                      backgroundColor: [0, 1, 2, 5, 6, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22, 24].includes(i)
                        ? '#0365C4'
                        : 'transparent',
                    }}
                  />
                ))}
              </div>
            </div>
            <p className="text-[#8E9BB3] mt-2" style={{ fontSize: 12 }}>Toon bij de ingang</p>
          </div>

          {/* Buttons */}
          <div className="mt-auto pb-6 space-y-3">
            <button
              onClick={() => navigate('/reservations')}
              className="w-full h-[56px] rounded-[16px] text-white transition-all active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #0365C4, #0D7FE8)', fontSize: 16, fontWeight: 700, boxShadow: '0 8px 24px rgba(3,101,196,0.3)' }}
            >
              Mijn reserveringen
            </button>
            <button
              onClick={() => navigate('/home')}
              className="w-full h-[52px] rounded-[14px] transition-all active:scale-[0.98]"
              style={{ background: '#F4F7FC', fontSize: 14, fontWeight: 600, color: '#0365C4' }}
            >
              Terug naar Thuis
            </button>
          </div>
          
          <div className="flex justify-center pb-3 opacity-30">
            <SnorkeltjeLogo size="tiny" />
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}

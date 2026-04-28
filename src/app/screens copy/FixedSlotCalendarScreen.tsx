import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { ChevronLeft, ChevronRight, Clock, MapPin, User, Info } from 'lucide-react';

const DAYS = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];

const calendarData: Record<number, 'available' | 'full'> = {
  7: 'available', 14: 'available', 21: 'available', 22: 'available', 23: 'full', 28: 'available',
};

export function FixedSlotCalendarScreen() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(21);

  const firstDay = 2;
  const daysInMonth = 30;
  const today = 25; // March 25 is today but we show April

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
              <p className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>Vast Tijdstip</p>
              <p className="text-white/60" style={{ fontSize: 12 }}>Selecteer een datum</p>
            </div>
          </div>
        </div>

        <div className="px-5">
          {/* Fixed slot info */}
          <div className="bg-white rounded-[16px] px-4 py-3.5 -mt-3 flex items-center gap-3" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)' }}>
              <Clock size={18} color="#fff" />
            </div>
            <div>
              <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>Maandag 15:00</p>
              <p className="text-[#8E9BB3]" style={{ fontSize: 12 }}>De Bilt Zwembad · Wekelijks</p>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-[20px] mt-4 overflow-hidden" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            {/* Month header */}
            <div className="flex items-center justify-between px-4 py-3" style={{ background: 'linear-gradient(135deg, #0365C4, #034DA9)' }}>
              <button className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                <ChevronLeft size={16} color="#fff" />
              </button>
              <p className="text-white" style={{ fontSize: 16, fontWeight: 700 }}>april 2026</p>
              <button className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                <ChevronRight size={16} color="#fff" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 px-2 pt-3 pb-1">
              {DAYS.map(d => (
                <div key={d} className="text-center text-[#8E9BB3]" style={{ fontSize: 11, fontWeight: 600 }}>{d}</div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 px-2 pb-3">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} className="h-[44px]" />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const status = calendarData[day];
                const isSelected = day === selectedDate;
                const isAvailable = status === 'available';
                const isFull = status === 'full';

                return (
                  <button
                    key={day}
                    onClick={() => {
                      if (!isFull) setSelectedDate(day);
                    }}
                    className="h-[44px] flex items-center justify-center"
                  >
                    <div 
                      className="w-[38px] h-[38px] rounded-[12px] flex items-center justify-center transition-all"
                      style={{
                        background: isSelected ? 'linear-gradient(135deg, #0365C4, #00C1FF)' : isAvailable ? '#E8F8F0' : isFull ? '#FDE8E8' : 'transparent',
                        boxShadow: isSelected ? '0 4px 12px rgba(3,101,196,0.3)' : 'none',
                      }}
                    >
                      <span style={{ 
                        fontSize: 13, 
                        fontWeight: isSelected || isAvailable || isFull ? 700 : 400,
                        color: isSelected ? '#fff' : isAvailable ? '#27AE60' : isFull ? '#E74C3C' : '#1A1A2E',
                      }}>
                        {day}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-5 px-4 py-3 border-t border-[#F0F4FA]">
              {[
                { color: '#27AE60', bg: '#E8F8F0', label: 'Beschikbaar' },
                { color: '#0365C4', bg: '#0365C4', label: 'Geselecteerd', isWhite: true },
                { color: '#E74C3C', bg: '#FDE8E8', label: 'Vol' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-[3px]" style={{ backgroundColor: l.bg }} />
                  <span className="text-[#8E9BB3]" style={{ fontSize: 10 }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected date details */}
          <div className="bg-white rounded-[18px] p-4 mt-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#0365C4]" />
              <p className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>
                Maandag, {selectedDate} april 2026
              </p>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[8px] bg-[#E8F4FD] flex items-center justify-center">
                  <Clock size={15} color="#0365C4" />
                </div>
                <span className="text-[#4A5568]" style={{ fontSize: 13 }}>15:00 – 15:30 (30 min)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[8px] bg-[#E8F4FD] flex items-center justify-center">
                  <MapPin size={15} color="#0365C4" />
                </div>
                <span className="text-[#4A5568]" style={{ fontSize: 13 }}>De Bilt Zwembad</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[8px] bg-[#E8F4FD] flex items-center justify-center">
                  <User size={15} color="#0365C4" />
                </div>
                <span className="text-[#4A5568]" style={{ fontSize: 13 }}>Jan de Vries</span>
              </div>
            </div>
          </div>

          {/* Book button */}
          <button
            onClick={() => navigate('/booking-summary')}
            className="w-full h-[56px] rounded-[16px] text-white mt-5 transition-all active:scale-[0.98]"
            style={{ 
              background: 'linear-gradient(135deg, #0365C4, #0D7FE8)',
              fontSize: 16, fontWeight: 700,
              boxShadow: '0 8px 24px rgba(3,101,196,0.3)',
            }}
          >
            Deze les boeken →
          </button>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

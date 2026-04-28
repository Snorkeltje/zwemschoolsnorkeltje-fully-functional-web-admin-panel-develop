import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';

const weekDays = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];

const weeks = [
  { wk: 14, days: [null, null, 1, 2, 3, 4, 5] },
  { wk: 15, days: [6, 7, 8, 9, 10, 11, 12] },
  { wk: 16, days: [13, 14, 15, 16, 17, 18, 19] },
  { wk: 17, days: [20, 21, 22, 23, 24, 25, 26] },
  { wk: 18, days: [27, 28, 29, 30, null, null, null] },
];

// Tuesdays (di) are available (green) - index 1 in each week
const availableDays = [7, 14, 21, 28];

export function CalendarAvailableScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <MobileFrame>
      <div className="min-h-full bg-white flex flex-col">
        {/* Snorkeltje Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[#E8ECF4]">
          <SnorkeltjeLogo size="small" />
        </div>

        {/* Breadcrumb */}
        <div className="bg-[#F8FAFC] px-4 py-2">
          <p className="text-[#4A6072]" style={{ fontSize: 11 }}>🏠 / Boek een les / Kalender</p>
        </div>

        {/* Calendar header */}
        <div className="bg-[#196FBF] mx-4 mt-4 rounded h-[32px] flex items-center justify-between px-3">
          <span className="text-white" style={{ fontSize: 14 }}>←</span>
          <span className="text-white" style={{ fontSize: 14, fontWeight: 700 }}>april 2026</span>
          <span className="text-white" style={{ fontSize: 14 }}>→</span>
        </div>

        {/* Day headers */}
        <div className="px-4 mt-4">
          <div className="grid grid-cols-8 gap-0">
            <p className="text-[#4A6072] text-center" style={{ fontSize: 12, fontWeight: 700 }}>Wk</p>
            {weekDays.map(d => (
              <p key={d} className="text-[#4A6072] text-center" style={{ fontSize: 12, fontWeight: 700 }}>{d}</p>
            ))}
          </div>

          {/* Weeks */}
          {weeks.map((week) => (
            <div key={week.wk} className="grid grid-cols-8 gap-0 mt-3">
              <p className="text-[#8E9EAD] text-center self-center" style={{ fontSize: 12 }}>{week.wk}</p>
              {week.days.map((day, i) => {
                if (day === null) return <div key={i} />;
                const isAvailable = availableDays.includes(day);
                const isSelected = selected === day;
                return (
                  <button
                    key={i}
                    onClick={() => isAvailable && setSelected(day)}
                    className={`h-[36px] rounded flex items-center justify-center mx-auto w-[36px] ${
                      isAvailable ? (isSelected ? 'bg-[#196FBF]' : 'bg-[#22B847]') : ''
                    }`}
                  >
                    <span
                      className={isAvailable ? 'text-white' : 'text-[#26323F]'}
                      style={{ fontSize: 15, fontWeight: isAvailable ? 700 : 400 }}
                    >
                      {day}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mx-4 mt-6 border border-[#8E9EAD] rounded">
          <div className="bg-[#C7D1D1] rounded-t px-3 py-1">
            <p className="text-[#26323F]" style={{ fontSize: 12, fontWeight: 700 }}>LEGENDA</p>
          </div>
          <div className="px-3 py-2 flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#22B847]" />
            <p className="text-[#26323F]" style={{ fontSize: 13 }}>Beschikbaar</p>
          </div>
        </div>

        <p className="px-4 mt-3 text-[#4A6072]" style={{ fontSize: 13 }}>
          Selecteer een beschikbare datum om te reserveren.
        </p>

        {selected && (
          <div className="px-4 mt-4">
            <button
              onClick={() => navigate('/confirm-order')}
              className="w-full h-[44px] bg-[#196FBF] rounded flex items-center justify-center"
            >
              <span className="text-white" style={{ fontSize: 14, fontWeight: 700 }}>Reserveer {selected} april →</span>
            </button>
          </div>
        )}

        {/* Footer wave */}
        <div className="flex-1" />
        <div className="mt-8 relative">
          <svg viewBox="0 0 430 50" className="w-full">
            <ellipse cx="215" cy="25" rx="265" ry="25" fill="#0380D0" />
          </svg>
          <div className="bg-[#0360A6] h-[60px] flex items-center justify-center">
            <p className="text-[#B2D9FF]" style={{ fontSize: 11 }}>snorkeltje.i</p>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';

const DAYS_HEADER = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
const calendarRows = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
];

const submissions = [
  { label: 'Ma-vr 21-25 apr', status: 'Goedgekeurd', statusColor: '#27AE60', statusBg: '#1D3028' },
  { label: 'Ma-wo 7-9 apr', status: 'In behandeling', statusColor: '#F5A623', statusBg: '#322F22' },
];

export function AvailabilityRequestScreen() {
  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 3, 5, 8, 10]);
  const [notes, setNotes] = useState('Beschikbaar alle 5 geselecteerde dagen voor extra lessen');

  const toggleDay = (d: number) => {
    setSelectedDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  };

  return (
    <MobileFrame theme="dark">
      <div className="min-h-full bg-[#0F1117] pb-24">
        {/* Header */}
        <div className="bg-[#1C1F27] px-5 pt-14 pb-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-white" style={{ fontSize: 22 }}>←</button>
          <p className="text-white flex-1 text-center" style={{ fontSize: 18, fontWeight: 700 }}>Mijn Beschikbaarheid</p>
          <div style={{ width: 22 }} />
        </div>

        <div className="px-5 mt-3">
          <p className="text-[#818EA6]" style={{ fontSize: 13 }}>Dien uw beschikbaarheid in voor planning</p>

          {/* Month title */}
          <p className="text-white text-center mt-4" style={{ fontSize: 16, fontWeight: 700 }}>April 2026</p>

          {/* Calendar header */}
          <div className="flex justify-around mt-2">
            {DAYS_HEADER.map(d => (
              <span key={d} className="text-[#818EA6] w-9 text-center" style={{ fontSize: 12, fontWeight: 500 }}>{d}</span>
            ))}
          </div>

          {/* Calendar rows */}
          {calendarRows.map((row, ri) => (
            <div key={ri} className="flex justify-around mt-2">
              {row.map(day => {
                const selected = selectedDays.includes(day);
                return (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`w-9 h-9 rounded-[18px] flex items-center justify-center ${selected ? 'bg-[#FF5C00]' : ''}`}
                  >
                    <span style={{ fontSize: 14, fontWeight: selected ? 700 : 400 }} className={selected ? 'text-white' : 'text-[#818EA6]'}>{day}</span>
                  </button>
                );
              })}
            </div>
          ))}

          {/* Time Range */}
          <p className="text-[#818EA6] mt-6 mb-2" style={{ fontSize: 13, fontWeight: 500 }}>Tijdbereik voor geselecteerde dagen</p>
          <div className="flex gap-3">
            <div className="flex-1 bg-[#1C1F27] rounded-lg px-4 py-3">
              <p className="text-[#FF5C00]" style={{ fontSize: 14 }}>Van: 13:00</p>
            </div>
            <div className="flex-1 bg-[#1C1F27] rounded-lg px-4 py-3">
              <p className="text-[#FF5C00]" style={{ fontSize: 14 }}>Tot: 18:00</p>
            </div>
          </div>

          {/* Notes */}
          <p className="text-[#818EA6] mt-4 mb-1" style={{ fontSize: 13, fontWeight: 500 }}>Notities (optioneel)</p>
          <div className="bg-[#1C1F27] rounded-lg px-4 py-3">
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-transparent text-[#818EA6] focus:outline-none"
              style={{ fontSize: 12 }}
            />
          </div>

          {/* Submit */}
          <button className="w-full h-[52px] rounded-xl bg-[#FF5C00] mt-5 flex items-center justify-center">
            <span className="text-white" style={{ fontSize: 15, fontWeight: 700 }}>Beschikbaarheid indienen</span>
          </button>

          {/* Previous submissions */}
          <p className="text-[#818EA6] mt-6 mb-2" style={{ fontSize: 14, fontWeight: 500 }}>Eerdere inzendingen</p>
          <div className="space-y-2">
            {submissions.map((s) => (
              <div key={s.label} className="bg-[#1C1F27] rounded-lg px-4 py-3 flex items-center justify-between">
                <p className="text-white" style={{ fontSize: 13 }}>{s.label}</p>
                <span className="px-3 py-1 rounded-xl" style={{ fontSize: 11, fontWeight: 700, color: s.statusColor, backgroundColor: s.statusBg }}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instructor Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#1C1F27] z-30">
        <div className="h-[82px] flex items-start justify-around pt-2">
          {[
            { emoji: '📅', label: 'Rooster', active: true },
            { emoji: '👥', label: 'Leerlingen', active: false },
            { emoji: '💬', label: 'Berichten', active: false },
            { emoji: '👤', label: 'Profiel', active: false },
          ].map((item) => (
            <button key={item.label} className="flex flex-col items-center min-w-[60px] relative">
              {item.active && <div className="absolute -top-2 w-9 h-[3px] bg-[#FF5C00] rounded-full" />}
              <span style={{ fontSize: 22, opacity: item.active ? 1 : 0.5 }}>{item.emoji}</span>
              <span style={{ fontSize: 11, fontWeight: item.active ? 700 : 400 }} className={item.active ? 'text-[#FF5C00]' : 'text-[#818EA6]'}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </MobileFrame>
  );
}

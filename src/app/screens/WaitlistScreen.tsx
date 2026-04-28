import { useState } from 'react';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { Header } from '../components/layout/Header';

const DAYS = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
const locations = ['De Bilt', 'Bad Hulckesteijn', 'Garderen', 'Wolfheze'];

export function WaitlistScreen() {
  const [selectedDays, setSelectedDays] = useState<string[]>(['Ma', 'Wo', 'Vr']);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(['De Bilt', 'Bad Hulckesteijn']);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]);
  };

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) => prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]);
  };

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-24">
        <Header title="Wachtlijst" showBack />

        <div className="px-5 pt-2">
          <p className="text-[#44516B] mb-4" style={{ fontSize: 14 }}>
            Wij melden u automatisch als er een plek vrijkomt.
          </p>

          {/* Lesson type */}
          <p className="text-[#818EA6] mb-1" style={{ fontSize: 12, fontWeight: 500 }}>Lestype</p>
          <div className="bg-white rounded-xl border-[1.5px] border-[#DCE4F0] px-4 py-3 mb-4">
            <p className="text-[#131827]" style={{ fontSize: 14 }}>1-op-1 Zwemles  ▼</p>
          </div>

          {/* Preferred locations */}
          <p className="text-[#818EA6] mb-2" style={{ fontSize: 12, fontWeight: 500 }}>Voorkeursloc.</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {locations.map((loc) => {
              const selected = selectedLocations.includes(loc);
              return (
                <button
                  key={loc}
                  onClick={() => toggleLocation(loc)}
                  className={`h-[34px] rounded-lg flex items-center justify-center ${
                    selected ? 'bg-[#F0F4FC] border-2 border-[#0365C4]' : 'bg-white border border-[#DCE4F0]'
                  }`}
                >
                  <span style={{ fontSize: 13, fontWeight: selected ? 700 : 400, color: selected ? '#0365C4' : '#818EA6' }}>
                    {selected ? '✓ ' : ''}{loc}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Preferred days */}
          <p className="text-[#818EA6] mb-2" style={{ fontSize: 12, fontWeight: 500 }}>Voorkeursdagen</p>
          <div className="flex gap-1.5 mb-4">
            {DAYS.map((day) => {
              const selected = selectedDays.includes(day);
              return (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`w-[44px] h-[44px] rounded-lg flex items-center justify-center ${
                    selected ? 'bg-[#0365C4]' : 'bg-white'
                  }`}
                >
                  <span style={{ fontSize: 13, fontWeight: selected ? 700 : 400, color: selected ? '#fff' : '#818EA6' }}>{day}</span>
                </button>
              );
            })}
          </div>

          {/* Time preference */}
          <p className="text-[#818EA6] mb-2" style={{ fontSize: 12, fontWeight: 500 }}>Tijdvoorkeur</p>
          <div className="flex gap-3 mb-4">
            <div className="flex-1 bg-white rounded-xl px-4 py-3">
              <p className="text-[#131827]" style={{ fontSize: 14 }}>Van: 14:00</p>
            </div>
            <div className="flex-1 bg-white rounded-xl px-4 py-3">
              <p className="text-[#131827]" style={{ fontSize: 14 }}>Tot: 18:00</p>
            </div>
          </div>

          {/* Info */}
          <div className="bg-[#FEF3DB] rounded-xl px-4 py-3 mb-4">
            <p className="text-[#FCAA00]" style={{ fontSize: 13, fontWeight: 500 }}>ℹ️  Bij een vrije plek krijgt u direct bericht</p>
          </div>

          {/* Submit */}
          <button className="w-full h-[48px] rounded-[14px] bg-[#0365C4] text-white" style={{ fontSize: 15, fontWeight: 700 }}>
            Aanmelden voor wachtlijst
          </button>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

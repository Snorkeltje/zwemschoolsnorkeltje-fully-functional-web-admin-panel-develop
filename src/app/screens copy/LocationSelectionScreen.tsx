import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { Header } from '../components/layout/Header';

const locations = [
  { name: 'De Bilt', city: 'Utrecht', slots: 12, status: 'available' as const },
  { name: 'Bad Hulckesteijn', city: 'Nijkerk', slots: 8, status: 'available' as const },
  { name: 'Garderen', city: 'Barneveld', slots: 5, status: 'few' as const },
  { name: 'Wolfheze', city: 'Renkum', slots: 0, status: 'full' as const },
  { name: 'Dordrecht', city: 'Dordrecht', slots: 3, status: 'available' as const },
  { name: 'Soestduinen', city: 'Soest', slots: 6, status: 'available' as const },
];

export function LocationSelectionScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = locations.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.city.toLowerCase().includes(search.toLowerCase())
  );

  const statusConfig = {
    available: { text: 'beschikbaar', color: '#18BB68', bg: '#E0F9EC' },
    few: { text: 'beschikbaar', color: '#F5A623', bg: '#FEF3DB' },
    full: { text: 'Vol deze week', color: '#E74C3C', bg: '#FCE8E8' },
  };

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-24">
        <Header title="Kies locatie" showBack />
        <p className="px-6 text-[#818EA6] mt-1" style={{ fontSize: 13 }}>Extra 1-op-1 les</p>

        {/* Search */}
        <div className="px-5 pt-4 pb-2">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#818EA6]" style={{ fontSize: 14 }}>🔍</span>
            <input
              placeholder="Locatie zoeken..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[44px] pl-10 pr-4 rounded-xl border border-[#e5e7eb] bg-white focus:outline-none focus:border-[#0365C4]"
              style={{ fontSize: 14 }}
            />
          </div>
        </div>

        {/* Locations */}
        <div className="px-5 space-y-2 pt-2">
          {filtered.map((loc) => {
            const cfg = statusConfig[loc.status];
            return (
              <button
                key={loc.name}
                onClick={() => loc.status !== 'full' && navigate('/fixed-slot-calendar')}
                className="w-full bg-white rounded-xl border border-[#e5e7eb] px-4 py-3 flex items-center gap-3 text-left"
              >
                <span style={{ fontSize: 22 }}>🏊</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1a1a2e]" style={{ fontSize: 15, fontWeight: 700 }}>{loc.name}</p>
                  <p className="text-[#818EA6]" style={{ fontSize: 12 }}>{loc.city}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className="px-2.5 py-1 rounded-full"
                    style={{ fontSize: 10, fontWeight: 700, color: cfg.color, backgroundColor: cfg.bg }}
                  >
                    {loc.status === 'full' ? cfg.text : `${loc.slots} ${cfg.text}`}
                  </span>
                  <span className="text-[#818EA6]" style={{ fontSize: 18 }}>→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';

const orderOptions = [
  { type: '1-op-1', prices: '10x €380  |  5x €190  |  3x €114', color: '#3282AE' },
  { type: '1-op-2', prices: '10x €270  |  5x €135  |  3x €81', color: '#3282AE' },
  { type: '1-op-3', prices: '10x €200  |  5x €100  |  3x €60', color: '#3282AE' },
  { type: 'Survival', prices: '10x €250  |  5x €125  |  3x €75  (84 dgn)', color: '#3282AE' },
];

export function MyPunchCardsWebScreen() {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="min-h-full bg-white flex flex-col">
        {/* Snorkeltje Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[#E8ECF4]">
          <SnorkeltjeLogo size="small" />
        </div>

        <div className="bg-[#F8FAFC] px-4 py-2">
          <p className="text-[#4A6072]" style={{ fontSize: 11 }}>🏠 / Knipkaarten overzicht</p>
        </div>

        <div className="px-4 pt-4">
          <p className="text-[#26323F]" style={{ fontSize: 22, fontWeight: 700 }}>Mijn Knipkaarten</p>

          {/* Table header */}
          <div className="grid grid-cols-5 gap-1 mt-4 bg-[#DBE6F0] rounded px-2 py-1.5">
            {['Knipka.', 'Knip', 'Knipkaart', 'Geldig vanaf', 'Geldig tot'].map(h => (
              <p key={h} className="text-[#26323F]" style={{ fontSize: 10, fontWeight: 700 }}>{h}</p>
            ))}
          </div>

          {/* Table row */}
          <div className="grid grid-cols-5 gap-1 bg-white px-2 py-2 border-b border-[#DBE6F0]">
            <p className="text-[#0380D0]" style={{ fontSize: 11, fontWeight: 700 }}>22976</p>
            <p className="text-[#26323F]" style={{ fontSize: 11 }}>390</p>
            <p className="text-[#26323F]" style={{ fontSize: 11 }}>10x 1-op-1 zwemles</p>
            <p className="text-[#26323F]" style={{ fontSize: 11 }}>di mrt. 24</p>
            <p className="text-[#26323F]" style={{ fontSize: 11 }}>wo mrt. 24, 2027</p>
          </div>
          <div className="px-2 py-1.5">
            <p className="text-[#26323F]" style={{ fontSize: 11 }}>count</p>
          </div>

          {/* Progress card */}
          <p className="text-[#26323F] mt-3" style={{ fontSize: 14, fontWeight: 700 }}>Kaart #22976 — Voortgang</p>
          <div className="bg-[#196FBF] rounded-[12px] px-4 py-4 mt-2">
            <p className="text-white" style={{ fontSize: 14, fontWeight: 700 }}>10x 1-op-1 zwemles</p>
            <p className="text-white mt-1" style={{ fontSize: 20, fontWeight: 700 }}>390 punten resterend</p>
            <div className="mt-3 h-[10px] bg-[#80A6D9] rounded-full overflow-hidden">
              <div className="h-full w-[90%] bg-[#B2D9FF] rounded-full" />
            </div>
            <p className="text-[#B2D9FF] text-right mt-1" style={{ fontSize: 11 }}>Geldig tot: wo 24 mrt. 2027</p>
          </div>

          {/* Order section */}
          <p className="text-[#26323F] mt-5" style={{ fontSize: 14, fontWeight: 700 }}>Nieuwe knipkaart bestellen</p>
          <div className="space-y-2 mt-2">
            {orderOptions.map((opt) => (
              <div key={opt.type} className="bg-[#E8F4FC] rounded-[8px] px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-[#3282AE]" style={{ fontSize: 14, fontWeight: 700 }}>{opt.type}</p>
                  <p className="text-[#4A6072]" style={{ fontSize: 11 }}>{opt.prices}</p>
                </div>
                <button onClick={() => navigate('/punch-card-order')} className="bg-[#5492B5] rounded-[6px] px-5 py-2.5">
                  <span className="text-white" style={{ fontSize: 14, fontWeight: 700 }}>Bestellen</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-1" />
        <div className="mt-8 relative">
          <svg viewBox="0 0 430 50" className="w-full"><ellipse cx="215" cy="25" rx="265" ry="25" fill="#0380D0" /></svg>
          <div className="bg-[#0360A6] h-[60px]" />
        </div>
      </div>
    </MobileFrame>
  );
}
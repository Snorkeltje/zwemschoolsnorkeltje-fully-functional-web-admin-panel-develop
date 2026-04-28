import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';

const categories = [
  {
    title: '1-op-1 Zwemles', color: '#196FBF',
    rows: [
      { pkg: '10x', price: '€380', validity: '365 dgn' },
      { pkg: '5x', price: '€190', validity: '365 dgn' },
      { pkg: '3x', price: '€114', validity: '365 dgn' },
    ],
  },
  {
    title: '1-op-2 Zwemles', color: '#0380D0',
    rows: [
      { pkg: '10x', price: '€270', validity: '365 dgn' },
      { pkg: '5x', price: '€135', validity: '365 dgn' },
      { pkg: '3x', price: '€81', validity: '365 dgn' },
    ],
  },
  {
    title: '1-op-3 Zwemles', color: '#198080',
    rows: [
      { pkg: '10x', price: '€200', validity: '365 dgn' },
      { pkg: '5x', price: '€100', validity: '365 dgn' },
      { pkg: '3x', price: '€60', validity: '365 dgn' },
    ],
  },
  {
    title: 'Survival', color: '#325A99',
    rows: [
      { pkg: '10x', price: '€250', validity: '84 dgn' },
      { pkg: '5x', price: '€125', validity: '84 dgn' },
      { pkg: '3x', price: '€75', validity: '84 dgn' },
    ],
  },
];

export function AllPunchCardPricesScreen() {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="min-h-full bg-white flex flex-col">
        {/* Snorkeltje Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[#E8ECF4]">
          <SnorkeltjeLogo size="small" />
        </div>

        <div className="bg-[#F8FAFC] px-4 py-2">
          <p className="text-[#4A6072]" style={{ fontSize: 11 }}>🏠 / Bestel Knipkaart</p>
        </div>

        <div className="px-4 pt-4">
          <p className="text-[#26323F]" style={{ fontSize: 20, fontWeight: 700 }}>Alle Knipkaart Prijzen</p>
          <p className="text-[#4A6072] mt-1" style={{ fontSize: 13 }}>Kies het juiste pakket voor uw kind</p>

          {categories.map((cat) => (
            <div key={cat.title} className="mt-4">
              {/* Category header */}
              <div className="rounded-[6px] h-[36px] flex items-center px-3" style={{ backgroundColor: cat.color }}>
                <p className="text-white" style={{ fontSize: 15, fontWeight: 700 }}>{cat.title}</p>
              </div>

              {/* Table header */}
              <div className="bg-[#DBE5F0] grid grid-cols-4 gap-1 px-3 py-1">
                {['Pakket', 'Prijs', 'Geldigheid', 'Bestellen'].map(h => (
                  <p key={h} className="text-[#26323F]" style={{ fontSize: 11, fontWeight: 700 }}>{h}</p>
                ))}
              </div>

              {/* Rows */}
              {cat.rows.map((row, i) => (
                <div key={row.pkg} className={`grid grid-cols-4 gap-1 px-3 py-2 items-center ${i % 2 === 1 ? 'bg-[#F8FAFC]' : 'bg-white'}`}>
                  <p className="text-[#26323F]" style={{ fontSize: 13 }}>{row.pkg}</p>
                  <p className="text-[#26323F]" style={{ fontSize: 13, fontWeight: 700 }}>{row.price}</p>
                  <p className="text-[#4A6072]" style={{ fontSize: 13 }}>{row.validity}</p>
                  <button onClick={() => navigate('/punch-card-order')} className="bg-[#5492B5] rounded px-2 py-1 self-center">
                    <span className="text-white" style={{ fontSize: 11, fontWeight: 700 }}>Bestellen!</span>
                  </button>
                </div>
              ))}
            </div>
          ))}

          {/* Special cards */}
          <div className="flex gap-2 mt-4">
            <div className="flex-1 bg-[#E8F4FC] rounded-[6px] px-3 py-2.5">
              <p className="text-[#3282AE]" style={{ fontSize: 13, fontWeight: 700 }}>📝 Inschrijfgeld</p>
              <p className="text-[#4A6072]" style={{ fontSize: 11 }}>€25 — 1 dag</p>
            </div>
            <div className="flex-1 bg-[#E8F4FC] rounded-[6px] px-3 py-2.5">
              <p className="text-[#3282AE]" style={{ fontSize: 13, fontWeight: 700 }}>🔄 Wijzigen dag/tijd</p>
              <p className="text-[#4A6072]" style={{ fontSize: 11 }}>€60 — 1 dag</p>
            </div>
          </div>
        </div>

        <div className="flex-1" />
        <div className="mt-8 relative">
          <svg viewBox="0 0 430 50" className="w-full"><ellipse cx="215" cy="25" rx="265" ry="25" fill="#0380D0" /></svg>
          <div className="bg-[#0360A6] h-[60px] flex items-center justify-center">
            <p className="text-[#B2D9FF]" style={{ fontSize: 11 }}>snorkeltje.i</p>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';

const reservations = [
  { id: '232508', product: 'DE BILT 1-op-2 wo 16:00', date: '22 apr', from: '16:00', to: '16:30', status: 'Gepland' },
  { id: '232507', product: 'BadHulck 1-op-1 di 16:00', date: '26 mei', from: '16:00', to: '16:30', status: 'Gepland' },
];

export function ReservationsPlannedScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'planned' | 'history'>('planned');

  return (
    <MobileFrame>
      <div className="min-h-full bg-white flex flex-col">
        {/* Snorkeltje Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[#E8ECF4]">
          <SnorkeltjeLogo size="small" />
        </div>

        <div className="bg-[#F8FAFC] px-4 py-2">
          <p className="text-[#4A6072]" style={{ fontSize: 11 }}>🏠 / Mijn Reserveringen</p>
        </div>

        <div className="px-4 pt-4">
          <p className="text-[#26323F]" style={{ fontSize: 20, fontWeight: 700 }}>Mijn Reserveringen - Gepland</p>
          <p className="text-[#4A6072] mt-1" style={{ fontSize: 12 }}>Bekijk hier uw reserveringen voor de geplande zwemlessen.</p>

          {/* Cancellation info */}
          <div className="bg-[#E8F4FC] rounded-[6px] px-3 py-2.5 mt-3">
            <p className="text-[#4A6072]" style={{ fontSize: 11 }}>
              Wilt u een zwemles annuleren? Dit kan kosteloos tot 24 uur voor de zwemles. Heeft u betaald via een knipkaart dan wordt het saldo automatisch teruggestort.
            </p>
            <p className="text-[#0380D0] mt-1" style={{ fontSize: 11 }}>📧 info@zwemschoolsnorkeltje.nl</p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => setTab('planned')}
              className={`rounded px-4 h-[32px] flex items-center ${tab === 'planned' ? 'bg-[#5492B5]' : ''}`}
            >
              <span className={tab === 'planned' ? 'text-white' : 'text-[#3282AE]'} style={{ fontSize: 12, fontWeight: tab === 'planned' ? 700 : 400 }}>
                📅 Gepland
              </span>
            </button>
            <button onClick={() => setTab('history')}>
              <span className="text-[#3282AE]" style={{ fontSize: 12 }}>Geschiedenis →</span>
            </button>
          </div>

          {/* Table header */}
          <div className="bg-[#DBE6F0] rounded px-2 py-1.5 mt-3 grid grid-cols-6 gap-1">
            {['Reservering ID', 'Product', 'Vanaf', 'Vanaf tijd', 'Tot tijd', 'Status'].map(h => (
              <p key={h} className="text-[#26323F]" style={{ fontSize: 10, fontWeight: 700 }}>{h}</p>
            ))}
          </div>

          {/* Rows */}
          {reservations.map((r, i) => (
            <div key={r.id} className={`grid grid-cols-6 gap-1 px-2 py-2.5 ${i % 2 === 1 ? 'bg-[#F8FAFC]' : 'bg-white'} rounded`}>
              <p className="text-[#3282AE]" style={{ fontSize: 11, fontWeight: 700 }}>{r.id}</p>
              <p className="text-[#26323F]" style={{ fontSize: 10 }}>{r.product}</p>
              <p className="text-[#26323F]" style={{ fontSize: 10 }}>{r.date}</p>
              <p className="text-[#26323F]" style={{ fontSize: 10 }}>{r.from}</p>
              <p className="text-[#26323F]" style={{ fontSize: 10 }}>{r.to}</p>
              <div className="bg-[#E0F9E6] rounded px-1.5 py-0.5 self-center">
                <p className="text-[#22B847]" style={{ fontSize: 9, fontWeight: 700 }}>{r.status}</p>
              </div>
            </div>
          ))}

          {/* History button */}
          <button
            onClick={() => setTab('history')}
            className="w-full h-[44px] bg-[#5492B5] rounded-[6px] mt-4 flex items-center justify-center"
          >
            <span className="text-white" style={{ fontSize: 13, fontWeight: 700 }}>Mijn Reserveringen - Geschiedenis</span>
          </button>
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
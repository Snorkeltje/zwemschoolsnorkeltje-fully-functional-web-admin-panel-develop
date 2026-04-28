import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';

const usageHistory = [
  { date: '28 apr 2026', detail: '1-on-1 · De Bilt · 15:00' },
  { date: '22 mrt 2026', detail: '1-on-1 · De Bilt · 15:00' },
  { date: '15 mrt 2026', detail: '1-on-1 · De Bilt · 15:00' },
];

export function PunchCardDetailScreen() {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F8F9FA] pb-24">
        {/* Header */}
        <div className="bg-white px-5 pt-14 pb-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-[#1A1A2E]" style={{ fontSize: 22 }}>←</button>
          <p className="text-[#1A1A2E] flex-1 text-center" style={{ fontSize: 18, fontWeight: 700 }}>Kaartdetails</p>
          <div style={{ width: 22 }} />
        </div>

        <div className="px-5 pt-3">
          {/* Card visual */}
          <div className="bg-[#1A6FBF] rounded-[20px] px-6 py-5 relative overflow-hidden">
            <p className="text-white" style={{ fontSize: 15, fontWeight: 700 }}>💳  1-op-1 Zwemlessen</p>
            <p className="text-[#B2D9FF] mt-1" style={{ fontSize: 12 }}>Zwemschool Snorkeltje</p>
            <div className="flex items-end gap-3 mt-2">
              <span className="text-white" style={{ fontSize: 56, fontWeight: 700, lineHeight: 1 }}>8</span>
              <span className="text-[#B2D9FF] pb-2" style={{ fontSize: 14 }}>lessen resterend</span>
            </div>
            {/* Progress bar */}
            <div className="mt-4 h-3 bg-[#80A6D9] rounded-full overflow-hidden">
              <div className="h-full w-[80%] bg-white rounded-full" />
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-[#B2D9FF]" style={{ fontSize: 11 }}>Kaart #22976</span>
              <span className="text-[#B2D9FF]" style={{ fontSize: 11 }}>Geldig: 24 mrt 2027</span>
            </div>
          </div>

          {/* Usage History */}
          <p className="text-[#1A1A2E] mt-5 mb-3" style={{ fontSize: 16, fontWeight: 700 }}>Gebruiksgeschiedenis</p>
          <div className="space-y-0">
            {usageHistory.map((item, i) => (
              <div key={i}>
                <div className="bg-white rounded-[10px] px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{item.date}</p>
                    <p className="text-[#8E8EA0]" style={{ fontSize: 12 }}>{item.detail}</p>
                  </div>
                  <span className="text-[#E74C3C]" style={{ fontSize: 16, fontWeight: 700 }}>-1</span>
                </div>
                {i < usageHistory.length - 1 && <div className="h-px bg-[#E5E7EB] mx-4" />}
              </div>
            ))}
          </div>

          {/* Purchase another */}
          <button
            onClick={() => navigate('/punch-card-order')}
            className="w-full h-[52px] rounded-[12px] bg-[#E8F4FD] mt-5 flex items-center justify-center"
          >
            <span className="text-[#1A6FBF]" style={{ fontSize: 14, fontWeight: 700 }}>Nog een knipkaart kopen →</span>
          </button>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { Header } from '../components/layout/Header';

const locations = [
  { name: 'De Bilt', type: '1-on-1 Extra Vakantie', desc: 'Inhaal of extra tijdens vakantie' },
  { name: 'Bad Hulckesteijn', type: '1-on-1 Extra Vakantie', desc: 'Inhaal of extra tijdens vakantie' },
  { name: 'Garderen', type: '1-on-1 Extra Vakantie', desc: 'Inhaal of extra tijdens zomervakantie' },
  { name: 'Garderen', type: '1-on-2 Extra Vakantie', desc: 'Gedeelde les tijdens zomervakantie' },
];

export function HolidayLessonsScreen() {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F8F9FA] pb-24">
        <Header title="Vakantielessen" showBack />

        <div className="px-5 pt-2">
          {/* Holiday banner */}
          <div className="bg-[#FEF3DB] rounded-[10px] px-4 py-3 mb-4">
            <p className="text-[#F5A623]" style={{ fontSize: 14, fontWeight: 700 }}>🌤️  Voorjaarsvakantie — 28 apr t/m 9 mei</p>
            <p className="text-[#4A4A6A] mt-1" style={{ fontSize: 11 }}>Annuleren tot 4 dagen van tevoren | Geen standaard knipkaart</p>
          </div>

          {/* Location cards */}
          <div className="space-y-2.5">
            {locations.map((loc, i) => (
              <div key={i} className="bg-white rounded-[12px] border border-[#E5E7EB] px-4 py-4 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F5A623] rounded-[2px]" />
                <div className="flex items-start justify-between">
                  <div className="pl-2">
                    <p className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>🏊  {loc.name}</p>
                    <p className="text-[#F5A623] mt-0.5" style={{ fontSize: 13, fontWeight: 500 }}>{loc.type}</p>
                    <p className="text-[#8E8EA0] mt-0.5" style={{ fontSize: 11 }}>{loc.desc}</p>
                  </div>
                  <button onClick={() => navigate('/fixed-slot-calendar')} className="flex-shrink-0">
                    <span className="text-[#1A6FBF]" style={{ fontSize: 13, fontWeight: 700 }}>Boek →</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

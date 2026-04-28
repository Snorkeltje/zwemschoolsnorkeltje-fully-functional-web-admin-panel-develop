import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';

const cachedLessons = [
  { time: '13:00', location: 'De Bilt', students: '2 lln' },
  { time: '15:00', location: 'De Bilt', students: '3 lln' },
  { time: '16:00', location: 'Bad Hulck.', students: '2 lln' },
];

export function OfflineModeScreen() {
  const navigate = useNavigate();

  return (
    <MobileFrame theme="dark">
      <div className="min-h-full bg-[#0F1117] pb-24">
        {/* Offline banner */}
        <div className="bg-[#992E1A] h-[34px] flex items-center justify-center">
          <p className="text-white" style={{ fontSize: 12, fontWeight: 700 }}>📵  Offline — Gecachede gegevens</p>
        </div>

        {/* Header */}
        <div className="bg-[#1C1F27] px-5 pt-10 pb-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-white" style={{ fontSize: 22 }}>←</button>
          <p className="text-white flex-1 text-center" style={{ fontSize: 18, fontWeight: 700 }}>Rooster (Offline)</p>
          <div style={{ width: 22 }} />
        </div>

        <div className="px-5 mt-4">
          <p className="text-[#818EA6]" style={{ fontSize: 12 }}>Gecacheed rooster  ·  Sync: 2 uur geleden</p>

          {/* Cached lessons */}
          <div className="space-y-3 mt-4">
            {cachedLessons.map((lesson) => (
              <div key={lesson.time} className="bg-[#1C1F27] rounded-xl px-4 py-3 flex items-center relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF5C00]" />
                <span className="text-[#FF5C00] w-14 flex-shrink-0" style={{ fontSize: 14, fontWeight: 700 }}>{lesson.time}</span>
                <div className="flex-1">
                  <p className="text-white" style={{ fontSize: 13 }}>{lesson.location}</p>
                  <p className="text-[#818EA6]" style={{ fontSize: 12 }}>{lesson.students}</p>
                </div>
                <span className="bg-[#2E333F] text-[#818EA6] px-3 py-1 rounded-xl" style={{ fontSize: 10 }}>Gecached</span>
              </div>
            ))}
          </div>

          {/* Sync Queue */}
          <div className="bg-[#1C1F27] rounded-[14px] px-4 py-4 mt-6">
            <p className="text-[#FF5C00]" style={{ fontSize: 14, fontWeight: 700 }}>⏳  Synchronisatiewachtrij</p>
            <p className="text-[#818EA6] mt-1" style={{ fontSize: 13 }}>3 voortgangsupdates wachten</p>
            <div className="mt-2 h-[10px] bg-[#2E333F] rounded-[5px] overflow-hidden">
              <div className="h-full w-[30%] bg-[#FF5C00] rounded-[5px]" />
            </div>
            <p className="text-[#818EA6] mt-2" style={{ fontSize: 11 }}>Automatisch gesynchroniseerd bij verbinding</p>
          </div>

          {/* Retry button */}
          <button className="w-full h-[48px] rounded-[14px] bg-[#0F2E4F] mt-5 flex items-center justify-center">
            <span className="text-[#0365C4]" style={{ fontSize: 14, fontWeight: 700 }}>📶  Verbinding proberen</span>
          </button>
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

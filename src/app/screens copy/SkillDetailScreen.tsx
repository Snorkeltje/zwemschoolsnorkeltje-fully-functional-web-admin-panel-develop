import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';

const steps = [
  { name: 'Vangfase met hoge elleboog', done: true },
  { name: 'Trekfase met volledige extensie', done: true },
  { name: 'Herstel over water', done: true },
  { name: 'Beiderzijdse armcoördinatie 25m', done: false },
];

export function SkillDetailScreen() {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-24">
        {/* Header */}
        <div className="bg-white px-5 pt-14 pb-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-[#131827]" style={{ fontSize: 22 }}>←</button>
          <p className="text-[#131827] flex-1 text-center" style={{ fontSize: 18, fontWeight: 700 }}>Vrije slag armen</p>
          <div style={{ width: 22 }} />
        </div>

        <div className="px-5 pt-2">
          {/* Level info */}
          <div className="bg-[#F0F4FC] rounded-xl px-4 py-3 mb-5">
            <p className="text-[#131827]" style={{ fontSize: 14, fontWeight: 700 }}>Niveau: Gevorderd Beginner</p>
            <p className="text-[#818EA6] mt-1" style={{ fontSize: 12 }}>Voortgang: 3 van 4 stappen afgerond</p>
          </div>

          {/* Steps */}
          <p className="text-[#131827] mb-3" style={{ fontSize: 15, fontWeight: 700 }}>Stappen</p>

          <div className="space-y-2.5">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`rounded-[10px] px-4 py-3.5 flex items-center gap-3 ${step.done ? 'bg-[#E0F9EC]' : 'bg-white'}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? 'bg-[#18BB67]' : 'bg-[#DCE4F0]'}`}
                >
                  {step.done && <span className="text-white" style={{ fontSize: 13, fontWeight: 700 }}>✓</span>}
                </div>
                <span className={step.done ? 'text-[#131827]' : 'text-[#818EA6]'} style={{ fontSize: 13, fontWeight: step.done ? 500 : 400 }}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>

          {/* Instructor Notes */}
          <p className="text-[#131827] mt-6 mb-3" style={{ fontSize: 15, fontWeight: 700 }}>Instructeursnotitie</p>
          <div className="bg-white rounded-xl px-4 py-3">
            <p className="text-[#818EA6]" style={{ fontSize: 12 }}>💬  Jan de Vries  ·  22 maart 2026</p>
            <p className="text-[#44516B] mt-1" style={{ fontSize: 13 }}>Goede verbetering vandaag. Focus op hoge elleboog in de vangfase.</p>
          </div>

          {/* Goals */}
          <p className="text-[#131827] mt-6 mb-3" style={{ fontSize: 15, fontWeight: 700 }}>Doel voor volgende les</p>
          <div className="bg-[#FEF3DB] rounded-xl px-4 py-3">
            <p className="text-[#FCAA00]" style={{ fontSize: 13, fontWeight: 500 }}>🎯  Beiderzijdse armcoördinatie 25m halen</p>
          </div>

          {/* Practice at home link */}
          <button onClick={() => navigate('/practice-home')} className="mt-4">
            <div className="bg-[#E0F9EC] rounded-[14px] px-4 py-3">
              <p className="text-[#18BB67]" style={{ fontSize: 14, fontWeight: 700 }}>📚  Oefeningen voor thuis →</p>
            </div>
          </button>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

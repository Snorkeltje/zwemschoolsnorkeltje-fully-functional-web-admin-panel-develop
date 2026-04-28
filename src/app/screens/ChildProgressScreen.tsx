import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { ChevronLeft, ChevronRight, Trophy, BookOpen, Star, TrendingUp } from 'lucide-react';

const skills = [
  { name: 'Vrije slag armen', level: 'Goed', pct: 75, color: '#0365C4', gradient: 'linear-gradient(90deg, #0365C4, #00C1FF)', steps: '3/4 stappen' },
  { name: 'Ademhaling', level: 'Bezig', pct: 50, color: '#FF5C00', gradient: 'linear-gradient(90deg, #FF5C00, #F5A623)', steps: '2/4 stappen' },
  { name: 'Rugslag basis', level: 'Start', pct: 25, color: '#27AE60', gradient: 'linear-gradient(90deg, #27AE60, #2ECC71)', steps: '1/4 stappen' },
  { name: 'Keerbocht', level: 'Nieuw', pct: 10, color: '#8E44AD', gradient: 'linear-gradient(90deg, #8E44AD, #9B59B6)', steps: '0/3 stappen' },
];

export function ChildProgressScreen() {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-28">
        {/* Header */}
        <div 
          className="px-5 pt-[58px] pb-8 relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, #0365C4 0%, #034DA9 100%)',
            borderRadius: '0 0 32px 32px',
          }}
        >
          <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 430 30" fill="none" style={{ opacity: 0.1 }}>
            <path d="M0 15 Q107 0 215 15 Q322 30 430 15 L430 30 L0 30 Z" fill="#fff" />
          </svg>

          <div className="flex items-center gap-3 mb-5">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.18)' }}>
              <ChevronLeft size={20} color="#fff" />
            </button>
            <p className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>Sami's Voortgang</p>
          </div>

          {/* Child avatar & level */}
          <div className="flex items-center gap-4">
            <div className="w-[64px] h-[64px] rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)', boxShadow: '0 0 0 3px rgba(255,255,255,0.2)' }}>
              <span className="text-white" style={{ fontSize: 26, fontWeight: 700 }}>S</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Trophy size={16} color="#F5A623" />
                <p className="text-white" style={{ fontSize: 16, fontWeight: 700 }}>Gevorderd Beginner</p>
              </div>
              <p className="text-white/60 mt-0.5" style={{ fontSize: 12 }}>Totale voortgang</p>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex-1 h-[8px] bg-white/15 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: '65%', background: 'linear-gradient(90deg, #00C1FF, #fff)' }} />
                </div>
                <span className="text-white" style={{ fontSize: 14, fontWeight: 700 }}>65%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 -mt-4">
          {/* Stats row */}
          <div className="bg-white rounded-[18px] p-4 flex items-center justify-around" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            {[
              { icon: Star, value: '24', label: 'Lessen', color: '#F5A623' },
              { icon: TrendingUp, value: '4', label: 'Skills', color: '#0365C4' },
              { icon: Trophy, value: '2', label: 'Badges', color: '#27AE60' },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex flex-col items-center">
                  <Icon size={18} color={s.color} />
                  <span className="text-[#1A1A2E] mt-1" style={{ fontSize: 20, fontWeight: 700 }}>{s.value}</span>
                  <span className="text-[#8E9BB3]" style={{ fontSize: 10 }}>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active skills */}
        <div className="px-5 mt-5">
          <p className="text-[#1A1A2E] mb-3" style={{ fontSize: 16, fontWeight: 700 }}>Actieve Vaardigheden</p>

          <div className="space-y-3">
            {skills.map(skill => (
              <button
                key={skill.name}
                onClick={() => navigate(`/skill/${encodeURIComponent(skill.name)}`)}
                className="w-full bg-white rounded-[16px] px-4 py-3.5 text-left active:scale-[0.99] transition-all"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: skill.color }} />
                    <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{skill.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full px-2.5 py-0.5" style={{ backgroundColor: `${skill.color}12` }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: skill.color }}>{skill.level}</span>
                    </div>
                    <ChevronRight size={16} color="#C4CDD9" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2.5">
                  <div className="flex-1 h-[6px] bg-[#F0F4FA] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${skill.pct}%`, background: skill.gradient }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: skill.color }}>{skill.pct}%</span>
                </div>
                <p className="text-[#8E9BB3] mt-1" style={{ fontSize: 11 }}>{skill.steps}</p>
              </button>
            ))}
          </div>

          {/* Practice at home */}
          <button
            onClick={() => navigate('/practice-home')}
            className="w-full rounded-[16px] p-4 mt-4 flex items-center gap-3 active:scale-[0.98] transition-all"
            style={{ 
              background: 'linear-gradient(135deg, #E8F8F0, #D4F5E0)',
              border: '1.5px solid #B8E8CB',
            }}
          >
            <div className="w-[44px] h-[44px] rounded-[14px] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #27AE60, #2ECC71)' }}>
              <BookOpen size={20} color="#fff" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[#27AE60]" style={{ fontSize: 14, fontWeight: 700 }}>Oefeningen voor thuis</p>
              <p className="text-[#5BB17A]" style={{ fontSize: 12 }}>3 nieuwe oefeningen beschikbaar</p>
            </div>
            <ChevronRight size={18} color="#27AE60" />
          </button>

          {/* Last lesson info */}
          <div className="bg-white rounded-[12px] px-4 py-3 mt-4 flex items-center justify-between" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            <p className="text-[#8E9BB3]" style={{ fontSize: 12 }}>Laatste les: 22 maart</p>
            <p className="text-[#8E9BB3]" style={{ fontSize: 12 }}>Instructeur: Jan de Vries</p>
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

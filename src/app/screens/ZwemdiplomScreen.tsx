import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { ChevronLeft, Award, Star, Lock, Check, ChevronRight, Download } from 'lucide-react';

const diplomas = [
  {
    id: 'A', name: 'Zwemdiploma A', status: 'in_progress', progress: 72, color: '#0365C4',
    description: 'Basiszwemvaardigheden: zelfstandig zwemmen, onderwater zwemmen, drijven.',
    skills: [
      { name: 'Borst- en rugcrawl (25m)', done: true },
      { name: 'Schoolslag (25m)', done: true },
      { name: 'Rugslag (25m)', done: true },
      { name: 'Onderwater zwemmen (10m)', done: true },
      { name: 'Drijven op buik en rug (30s)', done: false },
      { name: 'Trap watertrappen (1 min)', done: false },
      { name: 'Spring vanaf rand + 25m zwemmen', done: false },
    ],
  },
  {
    id: 'B', name: 'Zwemdiploma B', status: 'locked', progress: 0, color: '#FF5C00',
    description: 'Verdieping: grotere afstanden, gekleed zwemmen, schrikeffecten.',
    skills: [
      { name: 'Gekleed zwemmen (50m)', done: false },
      { name: 'Duiken vanaf startblok', done: false },
      { name: 'Onderwater zwemmen (15m)', done: false },
      { name: 'Borstcrawl (50m)', done: false },
      { name: 'Survival zwemmen', done: false },
    ],
  },
  {
    id: 'C', name: 'Zwemdiploma C', status: 'locked', progress: 0, color: '#27AE60',
    description: 'Expert: noodsituaties, reddend zwemmen, alle slagen perfectioneren.',
    skills: [
      { name: 'Reddend zwemmen', done: false },
      { name: 'Alle slagen 100m', done: false },
      { name: 'Survival parcours', done: false },
      { name: 'Duiken + objecten ophalen', done: false },
    ],
  },
];

export function ZwemdiplomScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('A');
  const diploma = diplomas.find(d => d.id === selected)!;

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-28">
        {/* Header */}
        <div
          className="relative px-5 pt-[58px] pb-6"
          style={{ background: 'linear-gradient(135deg, #0365C4 0%, #0D7FE8 60%, #00C1FF 100%)', borderRadius: '0 0 28px 28px' }}
        >
          <div className="flex items-center gap-3 relative z-10">
            <button onClick={() => navigate(-1)} className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <ChevronLeft size={20} color="#fff" />
            </button>
            <div className="flex-1">
              <p className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>Zwemdiploma's</p>
              <p className="text-white/60" style={{ fontSize: 12 }}>Sami Khilji — Voortgang</p>
            </div>
            <Award size={24} color="rgba(255,255,255,0.3)" />
          </div>
        </div>

        {/* Diploma tabs */}
        <div className="px-5 -mt-3">
          <div className="bg-white rounded-[18px] p-2 flex gap-2" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            {diplomas.map(d => (
              <button
                key={d.id}
                onClick={() => d.status !== 'locked' && setSelected(d.id)}
                className="flex-1 py-3 rounded-[14px] flex flex-col items-center gap-1 transition-all"
                style={{
                  background: selected === d.id ? `linear-gradient(135deg, ${d.color}, ${d.color}CC)` : 'transparent',
                  opacity: d.status === 'locked' ? 0.4 : 1,
                }}
              >
                {d.status === 'locked' ? (
                  <Lock size={16} color={selected === d.id ? '#fff' : '#8E9BB3'} />
                ) : (
                  <Award size={16} color={selected === d.id ? '#fff' : d.color} />
                )}
                <span style={{ fontSize: 13, fontWeight: 700, color: selected === d.id ? '#fff' : '#1A1A2E' }}>
                  Diploma {d.id}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Progress ring */}
        <div className="flex flex-col items-center mt-6">
          <div className="relative w-[120px] h-[120px]">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#E8ECF4" strokeWidth="8" />
              <circle cx="60" cy="60" r="52" fill="none" stroke={diploma.color} strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${2 * Math.PI * 52 * (1 - diploma.progress / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[#1A1A2E]" style={{ fontSize: 28, fontWeight: 800 }}>{diploma.progress}%</span>
              <span className="text-[#8E9BB3]" style={{ fontSize: 10 }}>Voltooid</span>
            </div>
          </div>
          <p className="text-[#1A1A2E] mt-3" style={{ fontSize: 18, fontWeight: 700 }}>{diploma.name}</p>
          <p className="text-[#8E9BB3] text-center px-10 mt-1" style={{ fontSize: 12 }}>{diploma.description}</p>
        </div>

        {/* Skills checklist */}
        <div className="px-5 mt-6">
          <p className="text-[#1A1A2E] mb-3" style={{ fontSize: 14, fontWeight: 700 }}>
            Vaardigheden ({diploma.skills.filter(s => s.done).length}/{diploma.skills.length})
          </p>
          <div className="space-y-2">
            {diploma.skills.map((skill, i) => (
              <div
                key={i}
                className="bg-white rounded-[14px] px-4 py-3.5 flex items-center gap-3"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}
              >
                <div
                  className="w-[28px] h-[28px] rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: skill.done ? diploma.color : '#F4F7FC', border: skill.done ? 'none' : '2px solid #E8ECF4' }}
                >
                  {skill.done ? <Check size={14} color="#fff" /> : <span className="text-[#C4CDD9]" style={{ fontSize: 11, fontWeight: 700 }}>{i + 1}</span>}
                </div>
                <span
                  className="flex-1"
                  style={{ fontSize: 13, fontWeight: 500, color: skill.done ? '#27AE60' : '#4A5568', textDecoration: skill.done ? 'line-through' : 'none' }}
                >
                  {skill.name}
                </span>
                {skill.done && <Star size={14} color="#F5A623" fill="#F5A623" />}
              </div>
            ))}
          </div>
        </div>

        {/* Certificate download (future) */}
        {diploma.progress === 100 && (
          <div className="px-5 mt-5">
            <button className="w-full bg-[#27AE60] rounded-[16px] py-4 flex items-center justify-center gap-2 text-white active:scale-[0.98] transition-all">
              <Download size={18} />
              <span style={{ fontSize: 15, fontWeight: 700 }}>Certificaat downloaden</span>
            </button>
          </div>
        )}

        {/* Info card */}
        <div className="px-5 mt-5">
          <button
            onClick={() => navigate('/child-progress')}
            className="w-full bg-[#E8F4FD] rounded-[16px] p-4 flex items-center gap-3 active:scale-[0.99] transition-all"
          >
            <div className="w-[40px] h-[40px] rounded-[12px] bg-[#0365C4] flex items-center justify-center">
              <Star size={18} color="#fff" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[#0365C4]" style={{ fontSize: 13, fontWeight: 700 }}>Gedetailleerde voortgang</p>
              <p className="text-[#6B99C7]" style={{ fontSize: 11 }}>Bekijk alle skills per niveau</p>
            </div>
            <ChevronRight size={16} color="#0365C4" />
          </button>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

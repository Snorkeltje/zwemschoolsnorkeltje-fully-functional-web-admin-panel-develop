import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { InstructorBottomNav } from '../components/layout/InstructorBottomNav';
import { ChevronLeft, ChevronRight, Users, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../config/LanguageContext';

const daysNl = [
  { day: 'Ma', date: 28 },
  { day: 'Di', date: 29 },
  { day: 'Wo', date: 30 },
  { day: 'Do', date: 1 },
  { day: 'Vr', date: 2 },
  { day: 'Za', date: 3 },
  { day: 'Zo', date: 4 },
];
const daysEn = [
  { day: 'Mo', date: 28 },
  { day: 'Tu', date: 29 },
  { day: 'We', date: 30 },
  { day: 'Th', date: 1 },
  { day: 'Fr', date: 2 },
  { day: 'Sa', date: 3 },
  { day: 'Su', date: 4 },
];

const scheduleByDay: Record<number, { time: string; end: string; location: string; students: number; type: string; names: string[] }[]> = {
  28: [
    { time: '09:00', end: '09:30', location: 'De Bilt', students: 1, type: '1-op-1', names: ['Emma J.'] },
    { time: '09:30', end: '10:00', location: 'De Bilt', students: 2, type: '1-op-2', names: ['Sami K.', 'Noor K.'] },
    { time: '13:00', end: '13:30', location: 'De Bilt', students: 2, type: '1-op-2', names: ['Lisa B.', 'Tim v.D.'] },
    { time: '14:00', end: '14:30', location: 'De Bilt', students: 1, type: '1-op-1', names: ['Daan B.'] },
    { time: '15:00', end: '15:30', location: 'De Bilt', students: 3, type: '1-op-3', names: ['Sophie d.W.', 'Finn M.', 'Max V.'] },
    { time: '16:00', end: '16:30', location: 'Bad Hulck.', students: 2, type: '1-op-2', names: ['Eva K.', 'Luuk S.'] },
    { time: '16:30', end: '17:00', location: 'Bad Hulck.', students: 1, type: '1-op-1', names: ['Anna P.'] },
    { time: '17:00', end: '17:30', location: 'Bad Hulck.', students: 1, type: '1-op-1', names: ['Noah B.'] },
  ],
  29: [
    { time: '09:00', end: '09:30', location: 'Garderen', students: 2, type: '1-op-2', names: ['Mila D.', 'Sem J.'] },
    { time: '10:00', end: '10:30', location: 'Garderen', students: 1, type: '1-op-1', names: ['Lotte V.'] },
    { time: '14:00', end: '14:30', location: 'De Bilt', students: 2, type: '1-op-2', names: ['Sami K.', 'Lisa B.'] },
  ],
  30: [
    { time: '09:00', end: '09:30', location: 'Ampt v. Nijkerk', students: 1, type: '1-op-1', names: ['Tim v.D.'] },
    { time: '14:00', end: '14:30', location: 'Bad Hulck.', students: 2, type: '1-op-2', names: ['Emma J.', 'Daan B.'] },
    { time: '15:00', end: '15:30', location: 'Bad Hulck.', students: 1, type: '1-op-1', names: ['Sophie d.W.'] },
    { time: '16:00', end: '16:30', location: 'Bad Hulck.', students: 2, type: '1-op-2', names: ['Finn M.', 'Noah B.'] },
  ],
  1: [
    { time: '10:00', end: '10:30', location: 'Ampt v. Nijkerk', students: 1, type: '1-op-1', names: ['Tim v.D.'] },
    { time: '11:00', end: '11:30', location: 'Ampt v. Nijkerk', students: 1, type: '1-op-1', names: ['Finn M.'] },
  ],
  2: [
    { time: '14:00', end: '14:30', location: 'De Bilt', students: 2, type: '1-op-2', names: ['Sami K.', 'Noor K.'] },
    { time: '15:00', end: '15:30', location: 'De Bilt', students: 1, type: '1-op-1', names: ['Lisa B.'] },
    { time: '16:00', end: '16:30', location: 'De Bilt', students: 1, type: '1-op-1', names: ['Emma J.'] },
  ],
  3: [],
  4: [],
};

const typeColors: Record<string, string> = {
  '1-op-1': '#0365C4',
  '1-op-2': '#FF5C00',
  '1-op-3': '#27AE60',
};

export function InstructorScheduleScreen() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [selectedDay, setSelectedDay] = useState(28);
  const days = lang === 'en' ? daysEn : daysNl;
  const schedule = scheduleByDay[selectedDay] || [];
  const totalStudents = schedule.reduce((sum, s) => sum + s.students, 0);

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#0F1117] pb-28">
        {/* Header */}
        <div
          className="px-5 pt-[58px] pb-5"
          style={{ background: 'linear-gradient(135deg, #1A1D27, #252836)' }}
        >
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/instructor/home')} className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <ChevronLeft size={20} color="#E2E8F0" />
            </button>
            <div className="flex-1">
              <p className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>
                {lang === 'en' ? 'My Schedule' : 'Mijn Rooster'}
              </p>
              <p className="text-[#8E9BB3]" style={{ fontSize: 12 }}>
                {lang === 'en' ? 'April — May 2026' : 'April — Mei 2026'}
              </p>
            </div>
          </div>

          {/* Week navigation */}
          <div className="flex items-center justify-between mt-4">
            <button className="w-[32px] h-[32px] rounded-[10px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <ChevronLeft size={16} color="#E2E8F0" />
            </button>
            <p className="text-[#E2E8F0]" style={{ fontSize: 13, fontWeight: 600 }}>
              {lang === 'en' ? 'Week 18' : 'Week 18'}
            </p>
            <button className="w-[32px] h-[32px] rounded-[10px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <ChevronRight size={16} color="#E2E8F0" />
            </button>
          </div>
        </div>

        {/* Day selector */}
        <div className="px-3 -mt-2 flex gap-1.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {days.map(d => {
            const isSelected = selectedDay === d.date;
            const lessonsCount = (scheduleByDay[d.date] || []).length;
            const isToday = d.date === 28;
            return (
              <button
                key={d.date}
                onClick={() => setSelectedDay(d.date)}
                className="flex flex-col items-center rounded-[16px] px-3 py-3 flex-shrink-0 transition-all min-w-[50px]"
                style={{
                  background: isSelected ? 'linear-gradient(135deg, #FF5C00, #F5A623)' : '#1A1D27',
                  boxShadow: isSelected ? '0 6px 16px rgba(255,92,0,0.3)' : 'none',
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 500, color: isSelected ? 'rgba(255,255,255,0.7)' : '#8E9BB3' }}>{d.day}</span>
                <span className="mt-1" style={{ fontSize: 20, fontWeight: 700, color: isSelected ? '#fff' : (isToday ? '#FF5C00' : '#E2E8F0') }}>{d.date}</span>
                {lessonsCount > 0 ? (
                  <span className="mt-1 rounded-full px-2 py-0.5" style={{
                    fontSize: 9, fontWeight: 700,
                    background: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(255,92,0,0.12)',
                    color: isSelected ? '#fff' : '#FF5C00',
                  }}>
                    {lessonsCount}
                  </span>
                ) : (
                  <span className="mt-1 text-[#4A5568]" style={{ fontSize: 9 }}>—</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Day summary */}
        <div className="px-5 mt-4 flex items-center justify-between">
          <p className="text-[#E2E8F0]" style={{ fontSize: 16, fontWeight: 700 }}>
            {schedule.length} {lang === 'en' ? 'lessons' : 'lessen'}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Users size={12} color="#8E9BB3" />
              <span className="text-[#8E9BB3]" style={{ fontSize: 12 }}>{totalStudents}</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="px-5 mt-3">
          {schedule.length === 0 ? (
            <div className="rounded-[18px] py-12 flex flex-col items-center" style={{ background: '#1A1D27' }}>
              <span style={{ fontSize: 40 }}>🏖️</span>
              <p className="text-[#8E9BB3] mt-3" style={{ fontSize: 14, fontWeight: 600 }}>
                {lang === 'en' ? 'No lessons today' : 'Geen lessen vandaag'}
              </p>
              <p className="text-[#4A5568] mt-1" style={{ fontSize: 12 }}>
                {lang === 'en' ? 'Enjoy your day off!' : 'Geniet van uw vrije dag!'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {schedule.map((item, i) => {
                const accentColor = typeColors[item.type] || '#FF5C00';
                return (
                  <button
                    key={i}
                    onClick={() => navigate('/instructor/lesson/1')}
                    className="w-full rounded-[16px] p-4 text-left relative overflow-hidden transition-all active:scale-[0.98]"
                    style={{ background: '#1A1D27' }}
                  >
                    {/* Left accent */}
                    <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full" style={{ backgroundColor: accentColor }} />

                    <div className="flex items-start gap-3 ml-1">
                      {/* Time */}
                      <div className="flex-shrink-0 text-center" style={{ width: 50 }}>
                        <p style={{ fontSize: 14, fontWeight: 700, color: accentColor }}>{item.time}</p>
                        <p className="text-[#4A5568]" style={{ fontSize: 10 }}>{item.end}</p>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[#E2E8F0]" style={{ fontSize: 13, fontWeight: 700 }}>{item.location}</span>
                          <span className="rounded-full px-2 py-0.5" style={{ fontSize: 9, fontWeight: 700, backgroundColor: `${accentColor}15`, color: accentColor }}>
                            {item.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Users size={11} color="#8E9BB3" />
                          <span className="text-[#8E9BB3]" style={{ fontSize: 11 }}>
                            {item.names.join(', ')}
                          </span>
                        </div>
                      </div>

                      <ChevronRight size={16} color="#4A5568" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <InstructorBottomNav />
    </MobileFrame>
  );
}

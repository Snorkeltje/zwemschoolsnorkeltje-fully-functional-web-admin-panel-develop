import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { InstructorBottomNav } from '../components/layout/InstructorBottomNav';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';
import { Bell, Users, Clock, MapPin, ChevronRight, Wifi, TrendingUp, Calendar, MessageCircle } from 'lucide-react';
import { useLanguage } from '../config/LanguageContext';

const schedule = [
  { time: '13:00', end: '13:30', location: 'De Bilt', students: 2, done: true, type: '1-op-2' },
  { time: '14:00', end: '14:30', location: 'De Bilt', students: 1, done: true, type: '1-op-1' },
  { time: '15:00', end: '15:30', location: 'De Bilt', students: 3, done: false, current: true, type: '1-op-3' },
  { time: '16:00', end: '16:30', location: 'Bad Hulck.', students: 2, done: false, type: '1-op-2' },
  { time: '16:30', end: '17:00', location: 'Bad Hulck.', students: 1, done: false, type: '1-op-1' },
];

export function InstructorHomeScreen() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const hour = new Date().getHours();
  const greeting = hour < 12
    ? (lang === 'en' ? 'Good morning' : 'Goedemorgen')
    : hour < 18
      ? (lang === 'en' ? 'Good afternoon' : 'Goedemiddag')
      : (lang === 'en' ? 'Good evening' : 'Goedenavond');

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#0F1117] pb-28">
        {/* Header */}
        <div
          className="px-5 pt-[58px] pb-5 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1A1D27 0%, #252836 100%)' }}
        >
          <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,92,0,0.08), transparent 70%)', transform: 'translate(30%, -30%)' }} />

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div
                className="w-[48px] h-[48px] rounded-[16px] flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)', boxShadow: '0 6px 16px rgba(255,92,0,0.3)' }}
              >
                <span className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>J</span>
              </div>
              <div>
                <p className="text-[#8E9BB3]" style={{ fontSize: 12 }}>{greeting},</p>
                <p className="text-white" style={{ fontSize: 17, fontWeight: 700 }}>Jan de Vries</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/instructor/messages')}
                className="w-[44px] h-[44px] rounded-[14px] flex items-center justify-center relative"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <MessageCircle size={20} color="#E2E8F0" />
                <div className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-[#00C1FF] flex items-center justify-center" style={{ boxShadow: '0 2px 6px rgba(0,193,255,0.4)' }}>
                  <span className="text-white" style={{ fontSize: 9, fontWeight: 700 }}>3</span>
                </div>
              </button>
              <button
                onClick={() => navigate('/notifications')}
                className="w-[44px] h-[44px] rounded-[14px] flex items-center justify-center relative"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <Bell size={20} color="#E2E8F0" />
                <div className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-[#FF5C00] flex items-center justify-center" style={{ boxShadow: '0 2px 6px rgba(255,92,0,0.4)' }}>
                  <span className="text-white" style={{ fontSize: 9, fontWeight: 700 }}>5</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Stats banner */}
        <div className="mx-5 -mt-1">
          <div
            className="rounded-[20px] p-5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FF5C00 0%, #F5A623 100%)',
              boxShadow: '0 12px 32px rgba(255,92,0,0.3)',
            }}
          >
            <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-white/8 -translate-y-1/3 translate-x-1/4" />
            <p className="text-white/70 relative z-10" style={{ fontSize: 12, fontWeight: 500 }}>
              {lang === 'en' ? 'Today — Monday April 28' : 'Vandaag — Maandag 28 april'}
            </p>
            <div className="flex items-center gap-8 mt-3 relative z-10">
              <div>
                <p className="text-white" style={{ fontSize: 40, fontWeight: 700 }}>8</p>
                <p className="text-white/60" style={{ fontSize: 12 }}>{lang === 'en' ? 'lessons' : 'lessen'}</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <p className="text-white" style={{ fontSize: 40, fontWeight: 700 }}>12</p>
                <p className="text-white/60" style={{ fontSize: 12 }}>{lang === 'en' ? 'students' : 'leerlingen'}</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <p className="text-white" style={{ fontSize: 40, fontWeight: 700 }}>2</p>
                <p className="text-white/60" style={{ fontSize: 12 }}>{lang === 'en' ? 'locations' : 'locaties'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next lesson */}
        <div className="px-5 mt-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-white" style={{ fontSize: 16, fontWeight: 700 }}>
              {lang === 'en' ? 'Next lesson' : 'Volgende les'}
            </p>
            <div className="flex items-center gap-1.5">
              <Clock size={12} color="#FF5C00" />
              <span className="text-[#FF5C00]" style={{ fontSize: 12, fontWeight: 600 }}>
                {lang === 'en' ? 'In 45 min' : 'Over 45 min'}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/instructor/lesson/1')}
            className="w-full rounded-[18px] p-4 text-left active:scale-[0.98] transition-all"
            style={{ background: '#1A1D27', border: '1px solid rgba(255,92,0,0.2)', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#FF5C00]" style={{ fontSize: 16, fontWeight: 700 }}>15:00 – 15:30</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <MapPin size={13} color="#8E9BB3" />
                  <span className="text-[#E2E8F0]" style={{ fontSize: 13 }}>De Bilt Zwembad</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <Users size={13} color="#8E9BB3" />
                  <span className="text-[#8E9BB3]" style={{ fontSize: 12 }}>
                    3 {lang === 'en' ? 'students' : 'leerlingen'} · 1-op-3
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex -space-x-2">
                  {[
                    { letter: 'S', bg: 'linear-gradient(135deg, #0365C4, #00C1FF)' },
                    { letter: 'K', bg: 'linear-gradient(135deg, #27AE60, #2ECC71)' },
                    { letter: 'L', bg: 'linear-gradient(135deg, #F5A623, #FF5C00)' },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="w-[32px] h-[32px] rounded-full flex items-center justify-center border-2 border-[#1A1D27]"
                      style={{ background: s.bg }}
                    >
                      <span className="text-white" style={{ fontSize: 12, fontWeight: 700 }}>{s.letter}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[#FF5C00]" style={{ fontSize: 12, fontWeight: 600 }}>{lang === 'en' ? 'Details' : 'Details'}</span>
                  <ChevronRight size={14} color="#FF5C00" />
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Schedule */}
        <div className="px-5 mt-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-white" style={{ fontSize: 16, fontWeight: 700 }}>
              {lang === 'en' ? "Today's schedule" : 'Rooster vandaag'}
            </p>
            <button onClick={() => navigate('/instructor/schedule')} className="text-[#FF5C00]" style={{ fontSize: 12, fontWeight: 600 }}>
              {lang === 'en' ? 'Full schedule' : 'Volledig rooster'} →
            </button>
          </div>
          <div className="space-y-2">
            {schedule.map(item => (
              <button
                key={item.time}
                onClick={() => navigate('/instructor/lesson/1')}
                className="w-full rounded-[14px] px-4 py-3 flex items-center relative overflow-hidden transition-all active:scale-[0.99]"
                style={{
                  background: item.current ? 'linear-gradient(135deg, rgba(255,92,0,0.12), rgba(245,166,35,0.06))' : '#1A1D27',
                  border: item.current ? '1px solid rgba(255,92,0,0.3)' : '1px solid transparent',
                }}
              >
                {item.current && <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full bg-[#FF5C00]" />}
                <div className="w-[56px] flex-shrink-0">
                  <span className={item.done ? 'text-[#4A5568]' : item.current ? 'text-[#FF5C00]' : 'text-[#E2E8F0]'} style={{ fontSize: 14, fontWeight: 700 }}>{item.time}</span>
                </div>
                <div className="flex-1 text-left">
                  <p className={item.done ? 'text-[#4A5568]' : 'text-[#E2E8F0]'} style={{ fontSize: 13, fontWeight: 500 }}>{item.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#4A5568] rounded-full px-2 py-0.5" style={{ fontSize: 10, background: 'rgba(255,255,255,0.05)' }}>{item.type}</span>
                  <div className="flex items-center gap-1">
                    <Users size={12} color={item.done ? '#4A5568' : '#8E9BB3'} />
                    <span style={{ fontSize: 12, color: item.done ? '#4A5568' : '#8E9BB3' }}>{item.students}</span>
                  </div>
                  {item.done && (
                    <div className="rounded-full px-2 py-0.5 bg-[#27AE60]/15">
                      <span className="text-[#27AE60]" style={{ fontSize: 10, fontWeight: 600 }}>✓</span>
                    </div>
                  )}
                  {item.current && (
                    <div className="rounded-full px-2 py-0.5 bg-[#FF5C00]/15">
                      <span className="text-[#FF5C00]" style={{ fontSize: 10, fontWeight: 700 }}>
                        {lang === 'en' ? 'NOW' : 'NU'}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="px-5 mt-5">
          <p className="text-white mb-3" style={{ fontSize: 16, fontWeight: 700 }}>
            {lang === 'en' ? 'Quick actions' : 'Snelle acties'}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Calendar, label: lang === 'en' ? 'Full schedule' : 'Volledig rooster', path: '/instructor/schedule', gradient: 'linear-gradient(135deg, #0365C4, #00C1FF)', shadow: 'rgba(3,101,196,0.2)' },
              { icon: Users, label: lang === 'en' ? 'My students' : 'Mijn leerlingen', path: '/instructor/students', gradient: 'linear-gradient(135deg, #FF5C00, #F5A623)', shadow: 'rgba(255,92,0,0.2)' },
              { icon: MessageCircle, label: lang === 'en' ? 'Messages' : 'Berichten', path: '/instructor/messages', gradient: 'linear-gradient(135deg, #27AE60, #2ECC71)', shadow: 'rgba(39,174,96,0.2)' },
              { icon: TrendingUp, label: lang === 'en' ? 'Availability' : 'Beschikbaarheid', path: '/instructor/availability', gradient: 'linear-gradient(135deg, #9B59B6, #8E44AD)', shadow: 'rgba(155,89,182,0.2)' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="rounded-[18px] p-4 flex flex-col items-center justify-center gap-2.5 h-[100px] transition-all active:scale-[0.97]"
                  style={{ background: '#1A1D27', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <div
                    className="w-[44px] h-[44px] rounded-[14px] flex items-center justify-center"
                    style={{ background: item.gradient, boxShadow: `0 6px 16px ${item.shadow}` }}
                  >
                    <Icon size={20} color="#fff" strokeWidth={2} />
                  </div>
                  <span className="text-[#E2E8F0]" style={{ fontSize: 12, fontWeight: 600 }}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sync */}
        <div className="mx-5 mt-4 rounded-[12px] px-4 py-2.5 flex items-center gap-2" style={{ background: 'rgba(39,174,96,0.1)' }}>
          <Wifi size={14} color="#27AE60" />
          <p className="text-[#27AE60]" style={{ fontSize: 12, fontWeight: 500 }}>
            {lang === 'en' ? 'Online — All data synced' : 'Online — Alle data gesynchroniseerd'}
          </p>
        </div>

        {/* Logo footer */}
        <div className="flex justify-center mt-4 opacity-20">
          <SnorkeltjeLogo size="tiny" />
        </div>
      </div>

      <InstructorBottomNav />
    </MobileFrame>
  );
}

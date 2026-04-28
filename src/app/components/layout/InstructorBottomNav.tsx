import { useNavigate, useLocation } from 'react-router';
import { Calendar, Users, MessageCircle, User } from 'lucide-react';
import { useLanguage } from '../../config/LanguageContext';

export function InstructorBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLanguage();

  const navItems = [
    { icon: Calendar, label: lang === 'en' ? 'Schedule' : 'Rooster', path: '/instructor/home' },
    { icon: Users, label: lang === 'en' ? 'Students' : 'Leerlingen', path: '/instructor/students' },
    { icon: MessageCircle, label: lang === 'en' ? 'Messages' : 'Berichten', path: '/instructor/messages' },
    { icon: User, label: lang === 'en' ? 'Profile' : 'Profiel', path: '/instructor/profile' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30">
      <div
        className="mx-3 mb-3 rounded-[20px] overflow-hidden"
        style={{
          background: 'rgba(26,29,39,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 -4px 30px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(255,255,255,0.06)',
        }}
      >
        <div className="h-[70px] flex items-center justify-around px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path === '/instructor/home' && ['/instructor/schedule', '/instructor/lesson'].some(p => location.pathname.startsWith(p))) ||
              (item.path === '/instructor/messages' && location.pathname.startsWith('/instructor/chat')) ||
              (item.path === '/instructor/students' && location.pathname.startsWith('/instructor/progress-update'));

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center relative transition-all"
                style={{ minWidth: 64 }}
              >
                {isActive && (
                  <div
                    className="absolute -top-0.5 w-8 h-[3px] rounded-full"
                    style={{ background: 'linear-gradient(90deg, #FF5C00, #F5A623)' }}
                  />
                )}
                <div
                  className="w-10 h-10 rounded-[12px] flex items-center justify-center transition-all"
                  style={{
                    background: isActive ? 'linear-gradient(135deg, #FF5C00, #F5A623)' : 'transparent',
                    boxShadow: isActive ? '0 4px 12px rgba(255,92,0,0.3)' : 'none',
                  }}
                >
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    color={isActive ? '#fff' : '#4A5568'}
                  />
                  {item.path === '/instructor/messages' && !isActive && (
                    <div className="absolute top-1 right-3 w-[8px] h-[8px] rounded-full bg-[#FF5C00]" />
                  )}
                </div>
                <span
                  style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, marginTop: 2 }}
                  className={isActive ? 'text-[#FF5C00]' : 'text-[#4A5568]'}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

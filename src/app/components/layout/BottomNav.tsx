import { useNavigate, useLocation } from 'react-router';
import { Home, CalendarPlus, Ticket, User } from 'lucide-react';
import { useLanguage } from '../../config/LanguageContext';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { icon: Home, label: t('nav.home'), path: '/home' },
    { icon: CalendarPlus, label: t('nav.book'), path: '/book-lesson' },
    { icon: Ticket, label: t('nav.cards'), path: '/punch-cards' },
    { icon: User, label: t('nav.profile'), path: '/profile' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30">
      {/* Glass effect background */}
      <div 
        className="mx-3 mb-3 rounded-[20px] overflow-hidden"
        style={{ 
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 -4px 30px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.05)',
        }}
      >
        <div className="h-[70px] flex items-center justify-around px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path === '/home' && location.pathname === '/') ||
              (item.path === '/book-lesson' && ['/fixed-slot-calendar', '/booking-summary', '/location-selection', '/extra-lesson-calendar'].includes(location.pathname));

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
                    style={{ background: 'linear-gradient(90deg, #0365C4, #00C1FF)' }}
                  />
                )}
                <div 
                  className="w-10 h-10 rounded-[12px] flex items-center justify-center transition-all"
                  style={{ 
                    background: isActive ? 'linear-gradient(135deg, #0365C4, #00C1FF)' : 'transparent',
                    boxShadow: isActive ? '0 4px 12px rgba(3,101,196,0.25)' : 'none',
                  }}
                >
                  <Icon 
                    size={20} 
                    strokeWidth={isActive ? 2.2 : 1.8}
                    color={isActive ? '#ffffff' : '#8E9BB3'} 
                  />
                </div>
                <span
                  style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, marginTop: 2 }}
                  className={isActive ? 'text-[#0365C4]' : 'text-[#8E9BB3]'}
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

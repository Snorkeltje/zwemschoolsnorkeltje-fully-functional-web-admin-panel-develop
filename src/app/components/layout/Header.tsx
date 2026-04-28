import { ChevronLeft, Bell } from 'lucide-react';
import { useNavigate } from 'react-router';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showBell?: boolean;
  bellCount?: number;
  transparent?: boolean;
  theme?: 'light' | 'dark';
}

export function Header({ 
  title, 
  showBack = false, 
  showBell = false,
  bellCount = 0,
  transparent = false,
  theme = 'light'
}: HeaderProps) {
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  
  return (
    <div 
      className="px-4 pt-[58px] pb-4 flex items-center justify-between"
      style={{ 
        background: transparent ? 'transparent' : isDark ? '#1A1D27' : '#fff',
        boxShadow: transparent ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <div className="flex items-center gap-3 flex-1">
        {showBack && (
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-[12px] flex items-center justify-center transition-all active:scale-95"
            style={{ background: isDark ? '#2D3748' : '#F4F7FC' }}
          >
            <ChevronLeft size={20} color={isDark ? '#E2E8F0' : '#1A1A2E'} />
          </button>
        )}
        {title && (
          <p style={{ fontSize: 18, fontWeight: 700, color: isDark ? '#E2E8F0' : '#1A1A2E' }}>{title}</p>
        )}
      </div>
      
      {showBell && (
        <button 
          onClick={() => navigate('/notifications')}
          className="w-10 h-10 rounded-[12px] flex items-center justify-center relative"
          style={{ background: isDark ? '#2D3748' : '#F4F7FC' }}
        >
          <Bell size={20} color={isDark ? '#E2E8F0' : '#1A1A2E'} />
          {bellCount > 0 && (
            <div className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-[#FF5C00] text-white rounded-full flex items-center justify-center" style={{ fontSize: 9, fontWeight: 700, boxShadow: '0 2px 6px rgba(255,92,0,0.4)' }}>
              {bellCount > 9 ? '9+' : bellCount}
            </div>
          )}
        </button>
      )}
    </div>
  );
}

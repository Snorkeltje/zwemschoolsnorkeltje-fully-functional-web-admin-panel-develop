import { ReactNode } from 'react';

interface MobileFrameProps {
  children: ReactNode;
  theme?: 'light' | 'dark';
  hideStatusBar?: boolean;
}

export function MobileFrame({ children, theme = 'light', hideStatusBar = false }: MobileFrameProps) {
  const bgColor = theme === 'dark' ? '#0F1117' : '#F4F7FC';
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #0365C4 0%, #00C1FF 50%, #FF5C00 100%)' }}>
      {/* iPhone 17 Pro Max Frame */}
      <div 
        className="relative w-[430px] h-[932px] rounded-[56px] p-[12px]"
        style={{ 
          background: 'linear-gradient(145deg, #2A2A2E 0%, #1A1A1E 50%, #0D0D0F 100%)',
          boxShadow: '0 50px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08) inset, 0 25px 50px rgba(0,0,0,0.3)',
        }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-[16px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-50" style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.05)' }} />
        
        {/* Side buttons visual */}
        <div className="absolute -right-[2px] top-[180px] w-[3px] h-[36px] rounded-r-sm" style={{ background: 'linear-gradient(180deg, #3A3A3E, #2A2A2E)' }} />
        <div className="absolute -left-[2px] top-[160px] w-[3px] h-[28px] rounded-l-sm" style={{ background: 'linear-gradient(180deg, #3A3A3E, #2A2A2E)' }} />
        <div className="absolute -left-[2px] top-[210px] w-[3px] h-[50px] rounded-l-sm" style={{ background: 'linear-gradient(180deg, #3A3A3E, #2A2A2E)' }} />
        <div className="absolute -left-[2px] top-[270px] w-[3px] h-[50px] rounded-l-sm" style={{ background: 'linear-gradient(180deg, #3A3A3E, #2A2A2E)' }} />
        
        {/* Screen */}
        <div 
          className="w-full h-full rounded-[44px] overflow-hidden relative"
          style={{ backgroundColor: bgColor }}
        >
          {/* Status bar */}
          {!hideStatusBar && (
            <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 pt-[14px]" style={{ height: 54 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: theme === 'dark' ? '#fff' : '#1A1A2E' }}>9:41</span>
              <div className="flex items-center gap-1.5">
                {/* Signal */}
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                  <rect x="0" y="8" width="3" height="4" rx="0.5" fill={theme === 'dark' ? '#fff' : '#1A1A2E'} />
                  <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" fill={theme === 'dark' ? '#fff' : '#1A1A2E'} />
                  <rect x="9" y="3" width="3" height="9" rx="0.5" fill={theme === 'dark' ? '#fff' : '#1A1A2E'} />
                  <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill={theme === 'dark' ? '#fff' : '#1A1A2E'} />
                </svg>
                {/* WiFi */}
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M8 12c.6 0 1.1-.5 1.1-1.1S8.6 9.8 8 9.8s-1.1.5-1.1 1.1S7.4 12 8 12z" fill={theme === 'dark' ? '#fff' : '#1A1A2E'} />
                  <path d="M5.3 9.3c.7-.7 1.7-1.2 2.7-1.2s2 .5 2.7 1.2" stroke={theme === 'dark' ? '#fff' : '#1A1A2E'} strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M3 6.8c1.3-1.3 3.1-2.1 5-2.1s3.7.8 5 2.1" stroke={theme === 'dark' ? '#fff' : '#1A1A2E'} strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M.7 4.5C2.7 2.5 5.2 1.3 8 1.3s5.3 1.2 7.3 3.2" stroke={theme === 'dark' ? '#fff' : '#1A1A2E'} strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                {/* Battery */}
                <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
                  <rect x="0.5" y="0.5" width="22" height="12" rx="2.5" stroke={theme === 'dark' ? '#fff' : '#1A1A2E'} strokeOpacity="0.35" />
                  <rect x="2" y="2" width="19" height="9" rx="1.5" fill="#27AE60" />
                  <path d="M24 4.5v4c.8-.4 1.3-1.2 1.3-2s-.5-1.6-1.3-2z" fill={theme === 'dark' ? '#fff' : '#1A1A2E'} fillOpacity="0.4" />
                </svg>
              </div>
            </div>
          )}
          
          {/* Content */}
          <div className="w-full h-full overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            {children}
          </div>
          
          {/* Home Indicator */}
          <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full z-40" style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.18)' }} />
        </div>
      </div>
    </div>
  );
}

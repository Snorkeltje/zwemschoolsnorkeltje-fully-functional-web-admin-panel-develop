import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import snorkeltjeLogo from '../../imports/logo-3.svg';
import snorkeltjeLogoPng from 'figma:asset/9b639bb791c2a6aa104eacafd5c0253b9d1ddf3e.png';

export function SplashScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => Math.min(p + 2, 100));
    }, 40);
    const timer = setTimeout(() => navigate('/onboarding'), 2500);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, [navigate]);
  
  return (
    <MobileFrame hideStatusBar>
      <div className="h-full flex flex-col items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0365C4 0%, #034DA9 40%, #023B82 100%)' }}>
        {/* Animated wave shapes */}
        <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 430 220" fill="none" style={{ opacity: 0.2 }}>
          <path d="M0 120 Q107 60 215 120 Q322 180 430 120 L430 220 L0 220 Z" fill="#00C1FF" />
          <path d="M0 150 Q107 90 215 150 Q322 210 430 150 L430 220 L0 220 Z" fill="#5BC1DB" />
          <path d="M0 180 Q107 140 215 180 Q322 220 430 180 L430 220 L0 220 Z" fill="#00AEFF" />
        </svg>

        {/* Decorative circles */}
        <div className="absolute top-[15%] left-[10%] w-[180px] h-[180px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,193,255,0.15), transparent 70%)' }} />
        <div className="absolute top-[25%] right-[5%] w-[120px] h-[120px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,92,0,0.12), transparent 70%)' }} />

        {/* Logo */}
        <div className="z-10 flex flex-col items-center">
          <img src={snorkeltjeLogo} alt="Zwemschool Snorkeltje" className="h-[100px] w-auto" onError={(e) => { e.currentTarget.src = snorkeltjeLogoPng; }} />
        </div>
        
        {/* Tagline */}
        <p className="text-[#B2D9FF] z-10 mt-6 text-center" style={{ fontSize: 16, fontWeight: 500, letterSpacing: 0.5 }}>
          Jouw zwemlessen, altijd bij je.
        </p>
        
        {/* Loading bar */}
        <div className="absolute bottom-[120px] w-[200px] z-10">
          <div className="w-full h-[3px] bg-white/15 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all"
              style={{ 
                width: `${progress}%`, 
                background: 'linear-gradient(90deg, #00C1FF, #FF5C00)',
                transition: 'width 0.1s linear'
              }} 
            />
          </div>
        </div>
        
        {/* Version */}
        <p className="absolute bottom-[60px] text-[#6898C9] z-10" style={{ fontSize: 11, letterSpacing: 1 }}>
          Snorkeltje v2.0
        </p>
      </div>
    </MobileFrame>
  );
}
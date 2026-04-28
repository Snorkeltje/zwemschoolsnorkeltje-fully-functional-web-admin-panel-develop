import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';
import { SwimCharacterLeft, SwimCharacterRight } from '../components/SwimmingCharacters';
import { Eye, EyeOff, Mail, Lock, Globe, User, Briefcase } from 'lucide-react';
import { useLanguage, Lang } from '../config/LanguageContext';

export function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState<string | null>(null);
  const [mode, setMode] = useState<'parent' | 'instructor'>('parent');
  const navigate = useNavigate();
  const { t, lang, setLang } = useLanguage();
  
  return (
    <MobileFrame>
      <div className="h-full flex flex-col bg-white relative overflow-hidden">
        {/* Top decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-[200px]" style={{ background: 'linear-gradient(180deg, #F0F6FF 0%, #FFFFFF 100%)' }} />
        <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,193,255,0.08), transparent 70%)', transform: 'translate(30%, -30%)' }} />
        
        {/* Swimming characters decorative */}
        <div className="absolute bottom-[100px] left-[-20px] z-[1] opacity-15 pointer-events-none">
          <SwimCharacterLeft size={100} />
        </div>
        <div className="absolute bottom-[80px] right-[-20px] z-[1] opacity-15 pointer-events-none">
          <SwimCharacterRight size={100} />
        </div>

        {/* Language toggle - top right */}
        <button
          onClick={() => setLang(lang === 'nl' ? 'en' : 'nl')}
          className="absolute top-[54px] right-5 z-20 flex items-center gap-1.5 rounded-full px-3 py-1.5 active:scale-95 transition-all"
          style={{ background: 'rgba(3,101,196,0.08)', border: '1.5px solid rgba(3,101,196,0.15)' }}
        >
          <Globe size={14} color="#0365C4" />
          <span className="text-[#0365C4]" style={{ fontSize: 12, fontWeight: 700 }}>
            {lang === 'nl' ? '🇳🇱 NL' : '🇬🇧 EN'}
          </span>
        </button>
        
        {/* Logo */}
        <div className="flex justify-center pt-[72px] pb-2 relative z-10">
          <SnorkeltjeLogo size="large" />
        </div>
        
        {/* Content */}
        <div className="flex-1 px-6 relative z-10">
          {/* Role toggle */}
          <div className="flex bg-[#F0F4FA] rounded-[16px] p-1 mb-5">
            <button
              onClick={() => setMode('parent')}
              className="flex-1 h-[44px] rounded-[13px] flex items-center justify-center gap-2 transition-all"
              style={{
                background: mode === 'parent' ? '#fff' : 'transparent',
                boxShadow: mode === 'parent' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              <User size={16} color={mode === 'parent' ? '#0365C4' : '#A0AEC0'} />
              <span style={{ fontSize: 13, fontWeight: mode === 'parent' ? 700 : 500, color: mode === 'parent' ? '#0365C4' : '#A0AEC0' }}>
                {lang === 'en' ? 'Parent' : 'Ouder'}
              </span>
            </button>
            <button
              onClick={() => setMode('instructor')}
              className="flex-1 h-[44px] rounded-[13px] flex items-center justify-center gap-2 transition-all"
              style={{
                background: mode === 'instructor' ? '#fff' : 'transparent',
                boxShadow: mode === 'instructor' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              <Briefcase size={16} color={mode === 'instructor' ? '#FF5C00' : '#A0AEC0'} />
              <span style={{ fontSize: 13, fontWeight: mode === 'instructor' ? 700 : 500, color: mode === 'instructor' ? '#FF5C00' : '#A0AEC0' }}>
                {lang === 'en' ? 'Instructor' : 'Instructeur'}
              </span>
            </button>
          </div>

          <h1 className="text-[#1A1A2E]" style={{ fontSize: 24, fontWeight: 800 }}>
            {mode === 'parent'
              ? (lang === 'en' ? 'Welcome, Parent!' : 'Welkom, Ouder!')
              : (lang === 'en' ? 'Instructor Login' : 'Instructeur Inloggen')
            }
          </h1>
          <p className="text-[#6B7B94] mt-1" style={{ fontSize: 13 }}>
            {mode === 'parent'
              ? (lang === 'en' ? 'Book lessons & track your child\'s progress' : 'Boek lessen & volg de voortgang van uw kind')
              : (lang === 'en' ? 'Manage your schedule & students' : 'Beheer uw rooster & leerlingen')
            }
          </p>
          
          {/* Email */}
          <div className="mt-7">
            <label className="block text-[#4A5568] mb-1.5" style={{ fontSize: 13, fontWeight: 600 }}>{t('login.email')}</label>
            <div 
              className="relative rounded-[14px] transition-all"
              style={{ 
                border: `2px solid ${focused === 'email' ? '#0365C4' : '#E8ECF4'}`,
                boxShadow: focused === 'email' ? '0 0 0 4px rgba(3,101,196,0.08)' : 'none',
              }}
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Mail size={18} color={focused === 'email' ? '#0365C4' : '#A0AEC0'} />
              </div>
              <input
                type="email"
                placeholder={t('login.email.placeholder')}
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                className="w-full h-[52px] pl-11 pr-4 bg-transparent text-[#1A1A2E] placeholder:text-[#A0AEC0] outline-none"
                style={{ fontSize: 14, borderRadius: 14 }}
              />
            </div>
          </div>
          
          {/* Password */}
          <div className="mt-4">
            <label className="block text-[#4A5568] mb-1.5" style={{ fontSize: 13, fontWeight: 600 }}>{t('login.password')}</label>
            <div 
              className="relative rounded-[14px] transition-all"
              style={{ 
                border: `2px solid ${focused === 'pass' ? '#0365C4' : '#E8ECF4'}`,
                boxShadow: focused === 'pass' ? '0 0 0 4px rgba(3,101,196,0.08)' : 'none',
              }}
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Lock size={18} color={focused === 'pass' ? '#0365C4' : '#A0AEC0'} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocused('pass')}
                onBlur={() => setFocused(null)}
                className="w-full h-[52px] pl-11 pr-12 bg-transparent text-[#1A1A2E] placeholder:text-[#A0AEC0] outline-none"
                style={{ fontSize: 14, borderRadius: 14 }}
              />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2">
                {showPassword ? <EyeOff size={18} color="#A0AEC0" /> : <Eye size={18} color="#A0AEC0" />}
              </button>
            </div>
          </div>
          
          {/* Forgot */}
          <div className="flex justify-end mt-3">
            <button onClick={() => navigate('/forgot-password')} className="text-[#0365C4]" style={{ fontSize: 13, fontWeight: 600 }}>
              {t('login.forgot')}
            </button>
          </div>
          
          {/* Login button */}
          <button
            onClick={() => navigate(mode === 'parent' ? '/home' : '/instructor/home')}
            className="w-full h-[56px] rounded-[16px] text-white mt-7 transition-all active:scale-[0.98]"
            style={{ 
              background: mode === 'parent'
                ? 'linear-gradient(135deg, #0365C4 0%, #0D7FE8 100%)'
                : 'linear-gradient(135deg, #FF5C00 0%, #F5A623 100%)',
              fontSize: 16,
              fontWeight: 700,
              boxShadow: mode === 'parent'
                ? '0 8px 24px rgba(3,101,196,0.3)'
                : '0 8px 24px rgba(255,92,0,0.3)',
              letterSpacing: 0.3,
            }}
          >
            {mode === 'parent'
              ? (lang === 'en' ? 'Log in as Parent' : 'Inloggen als Ouder')
              : (lang === 'en' ? 'Log in as Instructor' : 'Inloggen als Instructeur')
            }
          </button>
          
          {/* Register link - only for parents */}
          {mode === 'parent' && (
            <div className="flex items-center justify-center gap-1 mt-5">
              <span className="text-[#6B7B94]" style={{ fontSize: 13 }}>
                {lang === 'en' ? 'New here?' : 'Nieuw hier?'}
              </span>
              <button onClick={() => navigate('/register')} className="text-[#0365C4]" style={{ fontSize: 13, fontWeight: 700 }}>
                {lang === 'en' ? 'Create account' : 'Account aanmaken'}
              </button>
            </div>
          )}

          {mode === 'instructor' && (
            <p className="text-center text-[#A0AEC0] mt-4" style={{ fontSize: 11 }}>
              {lang === 'en'
                ? 'Only for Snorkeltje certified instructors'
                : 'Alleen voor gecertificeerde Snorkeltje instructeurs'
              }
            </p>
          )}
          
          {/* Footer */}
          <div className="mt-auto pb-6 pt-6 text-center">
            <p className="text-[#0365C4] mt-2" style={{ fontSize: 11, fontWeight: 500 }}>snorkeltje.nl</p>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}
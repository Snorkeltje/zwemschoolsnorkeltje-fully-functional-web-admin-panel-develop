import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { InstructorBottomNav } from '../components/layout/InstructorBottomNav';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';
import { Moon, Globe, Bell, HelpCircle, FileText, LogOut, ChevronRight, Award, MapPin, Calendar, Shield, Wifi, Edit3, Star, Check, X } from 'lucide-react';
import { useLanguage, Lang } from '../config/LanguageContext';

export function InstructorProfileScreen() {
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage();
  const [showLangModal, setShowLangModal] = useState(false);

  const stats = [
    { label: lang === 'en' ? 'This week' : 'Deze week', value: '24', icon: Calendar, color: '#00C1FF' },
    { label: lang === 'en' ? 'Students' : 'Leerlingen', value: '38', icon: Award, color: '#F5A623' },
    { label: lang === 'en' ? 'Locations' : 'Locaties', value: '3', icon: MapPin, color: '#27AE60' },
  ];

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#0F1117] pb-28">
        {/* Header */}
        <div
          className="relative px-5 pt-[58px] pb-8 overflow-hidden text-center"
          style={{ background: 'linear-gradient(135deg, #1A1D27 0%, #252836 100%)' }}
        >
          <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,92,0,0.06), transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute top-0 left-0 w-[150px] h-[150px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,193,255,0.04), transparent 70%)', transform: 'translate(-30%, -30%)' }} />

          <p className="text-white relative z-10" style={{ fontSize: 18, fontWeight: 700 }}>
            {lang === 'en' ? 'My Profile' : 'Mijn Profiel'}
          </p>

          <div className="relative mt-4 inline-block">
            <div
              className="w-[88px] h-[88px] rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)', boxShadow: '0 8px 24px rgba(255,92,0,0.3)' }}
            >
              <span className="text-white" style={{ fontSize: 32, fontWeight: 700 }}>JV</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-[28px] h-[28px] rounded-full bg-[#27AE60] border-[3px] border-[#252836] flex items-center justify-center">
              <Check size={14} color="#fff" strokeWidth={3} />
            </div>
          </div>

          <p className="text-white mt-3 relative z-10" style={{ fontSize: 20, fontWeight: 700 }}>Jan de Vries</p>
          <p className="text-[#8E9BB3] mt-0.5" style={{ fontSize: 13 }}>
            {lang === 'en' ? 'Swimming Instructor' : 'Zweminstructeur'}
          </p>
          <p className="text-[#4A5568]" style={{ fontSize: 12 }}>jan.devries@snorkeltje.nl</p>

          {/* Rating */}
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <div className="flex">
              {[1,2,3,4,5].map(i => <Star key={i} size={12} color="#FFD700" fill="#FFD700" />)}
            </div>
            <span className="text-[#F5A623]" style={{ fontSize: 12, fontWeight: 700 }}>4.9</span>
            <span className="text-[#4A5568]" style={{ fontSize: 11 }}>· 120 {lang === 'en' ? 'reviews' : 'reviews'}</span>
          </div>
        </div>

        <div className="px-5 -mt-4">
          {/* Stats */}
          <div
            className="rounded-[18px] p-4 flex items-center justify-around"
            style={{ background: '#1A1D27', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
          >
            {stats.map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex flex-col items-center">
                  <Icon size={16} color={s.color} />
                  <span className="text-[#E2E8F0] mt-1" style={{ fontSize: 20, fontWeight: 700 }}>{s.value}</span>
                  <span className="text-[#4A5568]" style={{ fontSize: 10 }}>{s.label}</span>
                </div>
              );
            })}
          </div>

          {/* Settings */}
          <div className="mt-4 rounded-[18px] overflow-hidden" style={{ background: '#1A1D27', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            {[
              { icon: Edit3, label: lang === 'en' ? 'Edit profile' : 'Profiel bewerken', action: () => {}, color: '#0365C4' },
              { icon: Bell, label: lang === 'en' ? 'Notifications' : 'Meldingen', action: () => navigate('/notification-settings'), color: '#FF5C00', badge: lang === 'en' ? 'ON' : 'AAN' },
              { icon: Globe, label: lang === 'en' ? 'Language' : 'Taal', action: () => setShowLangModal(true), color: '#00C1FF', badge: lang === 'nl' ? 'NL' : 'EN' },
              { icon: Calendar, label: lang === 'en' ? 'Availability' : 'Beschikbaarheid', action: () => navigate('/instructor/availability'), color: '#27AE60' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-[#252836] transition-colors"
                  style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                >
                  <div className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center" style={{ background: `${item.color}15` }}>
                    <Icon size={17} color={item.color} />
                  </div>
                  <span className="flex-1 text-left text-[#E2E8F0]" style={{ fontSize: 14 }}>{item.label}</span>
                  {item.badge && (
                    <span className="rounded-full px-2.5 py-0.5" style={{
                      fontSize: 11, fontWeight: 700,
                      background: item.badge === 'AAN' || item.badge === 'ON' ? 'rgba(39,174,96,0.15)' : 'rgba(255,255,255,0.06)',
                      color: item.badge === 'AAN' || item.badge === 'ON' ? '#27AE60' : '#8E9BB3',
                    }}>
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight size={16} color="#4A5568" />
                </button>
              );
            })}
          </div>

          {/* Support */}
          <div className="mt-4 rounded-[18px] overflow-hidden" style={{ background: '#1A1D27', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            {[
              { icon: HelpCircle, label: lang === 'en' ? 'Help & Support' : 'Hulp & Support', action: () => navigate('/faq'), color: '#F5A623' },
              { icon: Shield, label: lang === 'en' ? 'Privacy policy' : 'Privacybeleid', action: () => {}, color: '#8E44AD' },
              { icon: FileText, label: lang === 'en' ? 'Terms' : 'Voorwaarden', action: () => navigate('/terms-conditions'), color: '#4A5568' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-[#252836] transition-colors"
                  style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                >
                  <div className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center" style={{ background: `${item.color}15` }}>
                    <Icon size={17} color={item.color} />
                  </div>
                  <span className="flex-1 text-left text-[#E2E8F0]" style={{ fontSize: 14 }}>{item.label}</span>
                  <ChevronRight size={16} color="#4A5568" />
                </button>
              );
            })}
          </div>

          {/* Sync */}
          <div className="mt-4 rounded-[12px] px-4 py-3 flex items-center gap-3" style={{ background: '#1A1D27' }}>
            <Wifi size={14} color="#27AE60" />
            <div className="flex-1">
              <p className="text-[#8E9BB3]" style={{ fontSize: 12 }}>
                {lang === 'en' ? 'Last sync: today 14:32' : 'Laatste sync: vandaag 14:32'}
              </p>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#27AE60]" />
          </div>

          {/* Logout */}
          <button
            onClick={() => navigate('/login')}
            className="w-full h-[52px] rounded-[16px] mt-4 mb-4 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{ border: '1.5px solid rgba(231,76,60,0.3)', background: 'rgba(231,76,60,0.08)' }}
          >
            <LogOut size={18} color="#E74C3C" />
            <span className="text-[#E74C3C]" style={{ fontSize: 15, fontWeight: 700 }}>
              {lang === 'en' ? 'Log out' : 'Uitloggen'}
            </span>
          </button>

          <div className="flex flex-col items-center gap-1 pb-4">
            <div className="opacity-20">
              <SnorkeltjeLogo size="tiny" />
            </div>
            <p className="text-[#4A5568]" style={{ fontSize: 11 }}>
              {lang === 'en' ? 'Snorkeltje Instructor App v1.0.0' : 'Snorkeltje Instructeur App v1.0.0'}
            </p>
          </div>
        </div>

        {/* Language Modal */}
        {showLangModal && (
          <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
            <div
              className="w-full max-w-[430px] rounded-t-[28px] p-6 pb-10"
              style={{ background: '#1A1D27', boxShadow: '0 -8px 40px rgba(0,0,0,0.4)' }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-[40px] h-[4px] rounded-full bg-[#2D3748]" />
              </div>
              <div className="flex items-center justify-between mb-5">
                <p className="text-[#E2E8F0]" style={{ fontSize: 18, fontWeight: 700 }}>
                  {lang === 'en' ? 'Choose language' : 'Kies uw taal'}
                </p>
                <button onClick={() => setShowLangModal(false)} className="w-8 h-8 rounded-full bg-[#2D3748] flex items-center justify-center">
                  <X size={16} color="#8E9BB3" />
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { code: 'nl' as Lang, flag: '🇳🇱', name: lang === 'en' ? 'Dutch' : 'Nederlands', sub: 'Nederlands' },
                  { code: 'en' as Lang, flag: '🇬🇧', name: lang === 'en' ? 'English' : 'Engels', sub: 'English' },
                ].map(option => (
                  <button
                    key={option.code}
                    onClick={() => { setLang(option.code); setShowLangModal(false); }}
                    className="w-full rounded-[16px] px-4 py-4 flex items-center gap-4 transition-all active:scale-[0.98]"
                    style={{
                      background: lang === option.code ? 'rgba(255,92,0,0.1)' : '#252836',
                      border: lang === option.code ? '2px solid #FF5C00' : '2px solid transparent',
                      boxShadow: lang === option.code ? '0 4px 16px rgba(255,92,0,0.15)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: 32 }}>{option.flag}</span>
                    <div className="flex-1 text-left">
                      <p className="text-[#E2E8F0]" style={{ fontSize: 15, fontWeight: 700 }}>{option.name}</p>
                      <p className="text-[#4A5568]" style={{ fontSize: 12 }}>{option.sub}</p>
                    </div>
                    {lang === option.code && (
                      <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)' }}>
                        <Check size={16} color="#fff" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <InstructorBottomNav />
    </MobileFrame>
  );
}

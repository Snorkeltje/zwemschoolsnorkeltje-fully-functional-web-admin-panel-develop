import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';
import { Edit3, Bell, Globe, HelpCircle, Shield, LogOut, ChevronRight, UserPlus, CreditCard, Calendar, Award, AlertTriangle, Receipt, Info, Phone, Star, Facebook, Instagram, Check, X } from 'lucide-react';
import { useLanguage, Lang } from '../config/LanguageContext';

export function ProfileScreen() {
  const navigate = useNavigate();
  const { t, lang, setLang } = useLanguage();
  const [showLangModal, setShowLangModal] = useState(false);

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    setShowLangModal(false);
  };

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-28">
        {/* Header */}
        <div 
          className="relative px-5 pt-[58px] pb-8 overflow-hidden text-center"
          style={{ 
            background: 'linear-gradient(135deg, #0365C4 0%, #0D7FE8 60%, #00C1FF 100%)',
            borderRadius: '0 0 32px 32px',
          }}
        >
          <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 430 30" fill="none" style={{ opacity: 0.1 }}>
            <path d="M0 15 Q107 0 215 15 Q322 30 430 15 L430 30 L0 30 Z" fill="#fff" />
          </svg>
          
          <p className="text-white relative z-10" style={{ fontSize: 18, fontWeight: 700 }}>{t('profile.title')}</p>
          
          <div className="relative mt-4 inline-block">
            <div 
              className="w-[88px] h-[88px] rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.2)', boxShadow: '0 0 0 3px rgba(255,255,255,0.3)' }}
            >
              <span className="text-white" style={{ fontSize: 34, fontWeight: 700 }}>A</span>
            </div>
            <button 
              onClick={() => navigate('/edit-profile')}
              className="absolute -bottom-1 -right-1 w-[32px] h-[32px] rounded-full bg-[#FF5C00] flex items-center justify-center border-[3px] border-[#0365C4]"
              style={{ boxShadow: '0 4px 8px rgba(255,92,0,0.3)' }}
            >
              <Edit3 size={13} color="#fff" />
            </button>
          </div>
          <p className="text-white mt-3 relative z-10" style={{ fontSize: 20, fontWeight: 700 }}>Ahmed Khilji</p>
          <p className="text-white/60 mt-0.5" style={{ fontSize: 13 }}>ahmed@snorkeltje.nl</p>
        </div>

        <div className="px-5 -mt-4">
          {/* Stats row */}
          <div className="bg-white rounded-[18px] p-4 flex items-center justify-around" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            {[
              { value: '24', label: t('profile.lessons'), icon: Calendar, color: '#0365C4' },
              { value: '8', label: t('profile.credits'), icon: CreditCard, color: '#FF5C00' },
              { value: '72%', label: t('home.progress'), icon: Award, color: '#27AE60' },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex flex-col items-center">
                  <Icon size={18} color={s.color} />
                  <span className="text-[#1A1A2E] mt-1" style={{ fontSize: 18, fontWeight: 700 }}>{s.value}</span>
                  <span className="text-[#8E9BB3]" style={{ fontSize: 10 }}>{s.label}</span>
                </div>
              );
            })}
          </div>

          {/* Children */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{t('profile.my_children')}</p>
              <button onClick={() => navigate('/add-child')} className="flex items-center gap-1 text-[#0365C4]">
                <UserPlus size={14} />
                <span style={{ fontSize: 12, fontWeight: 600 }}>{t('common.add')}</span>
              </button>
            </div>
            <button 
              onClick={() => navigate('/child-progress')}
              className="w-full bg-white rounded-[16px] px-4 py-3.5 flex items-center gap-3 active:scale-[0.99] transition-all"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)' }}>
                <span className="text-white" style={{ fontSize: 18, fontWeight: 700 }}>S</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>Sami Khilji</p>
                <p className="text-[#8E9BB3]" style={{ fontSize: 11 }}>{lang === 'en' ? 'Adv. Beginner' : 'Gev. Beginner'} · 7 {t('child.year')}</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-[6px] h-[6px] rounded-full bg-[#27AE60]" />
                <span className="text-[#27AE60]" style={{ fontSize: 11, fontWeight: 600 }}>{t('common.active')}</span>
              </div>
              <ChevronRight size={16} color="#C4CDD9" />
            </button>
          </div>

          {/* Settings */}
          <div className="mt-5 bg-white rounded-[18px] overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            {[
              { icon: Edit3, label: t('profile.edit_profile'), to: '/edit-profile', color: '#0365C4' },
              { icon: Bell, label: t('profile.notifications'), to: '/notification-settings', color: '#FF5C00', badge: t('profile.on') },
              { icon: Globe, label: t('profile.language'), to: '#lang', color: '#00C1FF', badge: lang === 'nl' ? 'NL' : 'EN' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.to === '#lang') {
                      setShowLangModal(true);
                    } else {
                      navigate(item.to);
                    }
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-[#F8FAFE] transition-colors"
                  style={{ borderTop: i > 0 ? '1px solid #F0F4FA' : 'none' }}
                >
                  <div className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center" style={{ backgroundColor: `${item.color}12` }}>
                    <Icon size={17} color={item.color} />
                  </div>
                  <span className="flex-1 text-left text-[#1A1A2E]" style={{ fontSize: 14 }}>{item.label}</span>
                  {item.badge && (
                    <span 
                      className="rounded-full px-2.5 py-0.5" 
                      style={{ 
                        fontSize: 11, fontWeight: 700,
                        backgroundColor: item.badge === t('profile.on') ? '#E8F8F0' : '#F0F4FA',
                        color: item.badge === t('profile.on') ? '#27AE60' : '#8E9BB3',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight size={16} color="#C4CDD9" />
                </button>
              );
            })}
          </div>

          {/* Support */}
          <div className="mt-4 bg-white rounded-[18px] overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            {[
              { icon: Award, label: t('profile.diplomas'), to: '/zwemdiploma', color: '#0365C4' },
              { icon: Receipt, label: t('profile.invoices'), to: '/invoices', color: '#FF5C00' },
              { icon: AlertTriangle, label: t('profile.emergency'), to: '/emergency-contacts', color: '#E74C3C' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.to)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-[#F8FAFE] transition-colors"
                  style={{ borderTop: i > 0 ? '1px solid #F0F4FA' : 'none' }}
                >
                  <div className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center" style={{ backgroundColor: `${item.color}12` }}>
                    <Icon size={17} color={item.color} />
                  </div>
                  <span className="flex-1 text-left text-[#1A1A2E]" style={{ fontSize: 14 }}>{item.label}</span>
                  <ChevronRight size={16} color="#C4CDD9" />
                </button>
              );
            })}
          </div>

          {/* Snorkeltje Info */}
          <div className="mt-4 bg-white rounded-[18px] overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            {[
              { icon: Info, label: t('profile.about'), to: '/about', color: '#0365C4' },
              { icon: Phone, label: t('profile.contact'), to: '/contact', color: '#27AE60' },
              { icon: Star, label: t('profile.reviews'), to: '/reviews', color: '#F5A623' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.to)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-[#F8FAFE] transition-colors"
                  style={{ borderTop: i > 0 ? '1px solid #F0F4FA' : 'none' }}
                >
                  <div className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center" style={{ backgroundColor: `${item.color}12` }}>
                    <Icon size={17} color={item.color} />
                  </div>
                  <span className="flex-1 text-left text-[#1A1A2E]" style={{ fontSize: 14 }}>{item.label}</span>
                  <ChevronRight size={16} color="#C4CDD9" />
                </button>
              );
            })}
          </div>

          {/* Social Media */}
          <div className="mt-4">
            <p className="text-[#8E9BB3] mb-2 px-1" style={{ fontSize: 12, fontWeight: 600 }}>{t('profile.follow_us')}</p>
            <div className="flex items-center gap-3">
              <button className="flex-1 bg-white rounded-[14px] py-3 flex items-center justify-center gap-2 active:scale-[0.97] transition-all" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <Facebook size={18} color="#1877F2" />
                <span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>Facebook</span>
              </button>
              <button className="flex-1 bg-white rounded-[14px] py-3 flex items-center justify-center gap-2 active:scale-[0.97] transition-all" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <Instagram size={18} color="#E4405F" />
                <span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>Instagram</span>
              </button>
            </div>
          </div>

          {/* Help & Legal */}
          <div className="mt-4 bg-white rounded-[18px] overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            {[
              { icon: HelpCircle, label: t('profile.help'), to: '/faq', color: '#F5A623' },
              { icon: Shield, label: t('profile.terms'), to: '/terms-conditions', color: '#8E44AD' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.to)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-[#F8FAFE] transition-colors"
                  style={{ borderTop: i > 0 ? '1px solid #F0F4FA' : 'none' }}
                >
                  <div className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center" style={{ backgroundColor: `${item.color}12` }}>
                    <Icon size={17} color={item.color} />
                  </div>
                  <span className="flex-1 text-left text-[#1A1A2E]" style={{ fontSize: 14 }}>{item.label}</span>
                  <ChevronRight size={16} color="#C4CDD9" />
                </button>
              );
            })}
          </div>

          {/* Logout */}
          <button
            onClick={() => navigate('/login')}
            className="w-full h-[52px] rounded-[16px] mt-5 mb-4 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{ background: '#FEE4E4' }}
          >
            <LogOut size={18} color="#E74C3C" />
            <span className="text-[#E74C3C]" style={{ fontSize: 15, fontWeight: 700 }}>{t('profile.logout')}</span>
          </button>

          {/* Logo footer */}
          <div className="flex justify-center pb-4 opacity-40">
            <SnorkeltjeLogo size="tiny" />
          </div>
        </div>

        {/* Language Modal */}
        {showLangModal && (
          <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <div 
              className="w-full max-w-[430px] bg-white rounded-t-[28px] p-6 pb-10"
              style={{ boxShadow: '0 -8px 40px rgba(0,0,0,0.15)' }}
            >
              {/* Handle */}
              <div className="flex justify-center mb-4">
                <div className="w-[40px] h-[4px] rounded-full bg-[#E0E5EC]" />
              </div>

              {/* Close */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>{t('lang.title')}</p>
                <button onClick={() => setShowLangModal(false)} className="w-8 h-8 rounded-full bg-[#F4F7FC] flex items-center justify-center">
                  <X size={16} color="#8E9BB3" />
                </button>
              </div>

              {/* Language Options */}
              <div className="space-y-3">
                {[
                  { code: 'nl' as Lang, flag: '🇳🇱', name: t('lang.dutch'), sub: 'Nederlands' },
                  { code: 'en' as Lang, flag: '🇬🇧', name: t('lang.english'), sub: 'English' },
                ].map(option => (
                  <button
                    key={option.code}
                    onClick={() => handleLangChange(option.code)}
                    className="w-full rounded-[16px] px-4 py-4 flex items-center gap-4 transition-all active:scale-[0.98]"
                    style={{
                      background: lang === option.code ? 'linear-gradient(135deg, #E8F4FD, #F0F6FF)' : '#F8FAFE',
                      border: lang === option.code ? '2px solid #0365C4' : '2px solid transparent',
                      boxShadow: lang === option.code ? '0 4px 16px rgba(3,101,196,0.12)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: 32 }}>{option.flag}</span>
                    <div className="flex-1 text-left">
                      <p className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>{option.name}</p>
                      <p className="text-[#8E9BB3]" style={{ fontSize: 12 }}>{option.sub}</p>
                    </div>
                    {lang === option.code && (
                      <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)' }}>
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
      <BottomNav />
    </MobileFrame>
  );
}

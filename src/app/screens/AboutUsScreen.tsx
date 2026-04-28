import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';
import { SwimCharactersBoth } from '../components/SwimmingCharacters';
import { ChevronLeft, Eye, Zap, CheckCircle, Heart, Target, Award, Users, Star, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../config/LanguageContext';

export function AboutUsScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-28">
        {/* Hero Header */}
        <div
          className="relative px-5 pt-[58px] pb-10 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0365C4 0%, #0D7FE8 50%, #00C1FF 100%)',
            borderRadius: '0 0 32px 32px',
          }}
        >
          {/* Wave decoration */}
          <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 430 40" fill="none" style={{ opacity: 0.12 }}>
            <path d="M0 20 Q107 0 215 20 Q322 40 430 20 L430 40 L0 40 Z" fill="#fff" />
          </svg>

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-[12px] flex items-center justify-center mb-4"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
          >
            <ChevronLeft size={20} color="#fff" />
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-3">
            <div className="w-[60px] h-[60px] rounded-[18px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)' }}>
              <SnorkeltjeLogo size="tiny" />
            </div>
          </div>

          <p className="text-white text-center relative z-10" style={{ fontSize: 22, fontWeight: 700 }}>
            {t('about.title')}
          </p>
          <p className="text-white/70 text-center mt-1 relative z-10" style={{ fontSize: 13 }}>
            {t('about.tagline')}
          </p>

          {/* Rating badge */}
          <div className="flex justify-center mt-4 relative z-10">
            <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)' }}>
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={14} color="#FFD700" fill="#FFD700" />
                ))}
              </div>
              <span className="text-white" style={{ fontSize: 13, fontWeight: 700 }}>9.6/10</span>
              <span className="text-white/60" style={{ fontSize: 11 }}>· 240+ {t('about.reviews')}</span>
            </div>
          </div>
        </div>

        {/* USP Banner — from website */}
        <div className="px-5 -mt-5">
          <div className="bg-white rounded-[18px] p-4 flex items-center justify-around" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
            {[
              { icon: Eye, label: t('about.attention'), color: '#0365C4' },
              { icon: Zap, label: t('about.speed'), color: '#FF5C00' },
              { icon: CheckCircle, label: t('about.clarity'), color: '#27AE60' },
            ].map(usp => {
              const Icon = usp.icon;
              return (
                <div key={usp.label} className="flex flex-col items-center gap-1.5">
                  <div className="w-[42px] h-[42px] rounded-[12px] flex items-center justify-center" style={{ backgroundColor: `${usp.color}14` }}>
                    <Icon size={20} color={usp.color} />
                  </div>
                  <span className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 700 }}>{usp.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Who is Walter */}
        <div className="px-5 mt-6">
          <p className="text-[#1A1A2E] mb-3" style={{ fontSize: 16, fontWeight: 700 }}>{t('about.who_walter')}</p>
          <div className="bg-white rounded-[18px] p-5" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)' }}>
                <span className="text-white" style={{ fontSize: 22, fontWeight: 700 }}>W</span>
              </div>
              <div>
                <p className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>Walter Van De Geest</p>
                <p className="text-[#8E9BB3]" style={{ fontSize: 12 }}>{t('about.walter_role')}</p>
              </div>
            </div>
            <p className="text-[#4A5568]" style={{ fontSize: 13, lineHeight: 1.6 }}>
              {t('about.walter_bio')}
            </p>
          </div>
        </div>

        {/* Missie & Visie */}
        <div className="px-5 mt-5">
          <p className="text-[#1A1A2E] mb-3" style={{ fontSize: 16, fontWeight: 700 }}>{t('about.mission_vision')}</p>
          <div className="space-y-3">
            <div className="bg-white rounded-[18px] p-5" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Target size={18} color="#FF5C00" />
                <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{t('about.our_mission')}</p>
              </div>
              <p className="text-[#4A5568]" style={{ fontSize: 13, lineHeight: 1.6 }}>
                {t('about.mission_text')}
              </p>
            </div>
            <div className="bg-white rounded-[18px] p-5" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Heart size={18} color="#E74C3C" />
                <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{t('about.our_vision')}</p>
              </div>
              <p className="text-[#4A5568]" style={{ fontSize: 13, lineHeight: 1.6 }}>
                {t('about.vision_text')}
              </p>
            </div>
          </div>
        </div>

        {/* Waarom Snorkeltje */}
        <div className="px-5 mt-5">
          <p className="text-[#1A1A2E] mb-3" style={{ fontSize: 16, fontWeight: 700 }}>{t('about.why_snorkeltje')}</p>
          <div className="space-y-2.5">
            {[
              { icon: Users, title: t('about.personal_lessons'), desc: t('about.personal_desc'), color: '#0365C4' },
              { icon: Award, title: t('about.certified'), desc: t('about.certified_desc'), color: '#FF5C00' },
              { icon: Zap, title: t('about.fast_results'), desc: t('about.fast_desc'), color: '#27AE60' },
              { icon: MapPin, title: t('about.locations'), desc: t('about.locations_desc'), color: '#9B59B6' },
              { icon: Heart, title: t('about.fun_first'), desc: t('about.fun_desc'), color: '#E74C3C' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white rounded-[16px] px-4 py-3.5 flex items-start gap-3" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                  <div className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}12` }}>
                    <Icon size={18} color={item.color} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 700 }}>{item.title}</p>
                    <p className="text-[#8E9BB3] mt-0.5" style={{ fontSize: 11 }}>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cijfers */}
        <div className="px-5 mt-5">
          <p className="text-[#1A1A2E] mb-3" style={{ fontSize: 16, fontWeight: 700 }}>{t('about.in_numbers')}</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: '2.500+', label: t('about.diplomas_issued'), gradient: 'linear-gradient(135deg, #0365C4, #00C1FF)' },
              { value: '7+', label: t('about.locations_nl'), gradient: 'linear-gradient(135deg, #FF5C00, #F5A623)' },
              { value: '9.6', label: t('about.avg_rating'), gradient: 'linear-gradient(135deg, #27AE60, #2ECC71)' },
              { value: '15+', label: t('about.experience'), gradient: 'linear-gradient(135deg, #9B59B6, #8E44AD)' },
            ].map((stat, i) => (
              <div key={i} className="rounded-[18px] p-4 flex flex-col items-center justify-center h-[100px] relative overflow-hidden" style={{ background: stat.gradient, boxShadow: '0 6px 20px rgba(0,0,0,0.12)' }}>
                <p className="text-white relative z-10" style={{ fontSize: 24, fontWeight: 700 }}>{stat.value}</p>
                <p className="text-white/80 text-center relative z-10 mt-0.5" style={{ fontSize: 11 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bedrijfsgegevens */}
        <div className="px-5 mt-5">
          <div className="bg-white rounded-[18px] p-5" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
            <p className="text-[#1A1A2E] mb-3" style={{ fontSize: 14, fontWeight: 700 }}>{t('about.company_info')}</p>
            <div className="space-y-2">
              {[
                { label: t('about.kvk'), value: '63317419' },
                { label: t('about.vat'), value: 'NL001234567B01' },
                { label: t('about.founded'), value: '2010, De Bilt' },
                { label: t('about.owner'), value: 'Walter Van De Geest' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-1.5" style={{ borderTop: i > 0 ? '1px solid #F0F4FA' : 'none' }}>
                  <span className="text-[#8E9BB3]" style={{ fontSize: 12 }}>{item.label}</span>
                  <span className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Swimming Characters */}
        <div className="px-5 mt-5 pb-4 flex justify-center">
          <SwimCharactersBoth size={160} />
        </div>

        {/* Footer logo */}
        <div className="flex justify-center pb-4 opacity-40">
          <SnorkeltjeLogo size="tiny" />
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}
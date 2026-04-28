import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { useNavigate } from 'react-router';
import { ChevronLeft, Clock, Users, UserCheck, Sun, ChevronRight, Info } from 'lucide-react';
import { useLanguage } from '../config/LanguageContext';

export function BookLessonScreen() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const lessonTypes = [
    {
      icon: Clock,
      title: t('book.fixed_slot'),
      subtitle: t('book.fixed_slot_desc'),
      gradient: 'linear-gradient(135deg, #0365C4, #0D7FE8)',
      shadow: 'rgba(3,101,196,0.2)',
      bgLight: '#E8F4FD',
      path: '/fixed-slot-calendar',
      badge: null,
    },
    {
      icon: UserCheck,
      title: t('book.extra_1on1'),
      subtitle: t('book.extra_1on1_desc'),
      gradient: 'linear-gradient(135deg, #FF5C00, #F5A623)',
      shadow: 'rgba(255,92,0,0.2)',
      bgLight: '#FEF0E7',
      path: '/extra-lesson-calendar',
      badge: '€38',
    },
    {
      icon: Users,
      title: t('book.extra_1on2'),
      subtitle: t('book.extra_1on2_desc'),
      gradient: 'linear-gradient(135deg, #00C1FF, #0D9FE8)',
      shadow: 'rgba(0,193,255,0.2)',
      bgLight: '#E0F3FF',
      path: '/location-selection',
      badge: '€19',
    },
    {
      icon: Sun,
      title: t('book.holiday'),
      subtitle: t('book.holiday_desc'),
      gradient: 'linear-gradient(135deg, #27AE60, #2ECC71)',
      shadow: 'rgba(39,174,96,0.2)',
      bgLight: '#E0F9EC',
      path: '/holiday-lessons',
      badge: null,
    },
  ];

  const perLesson = lang === 'en' ? '/lesson' : '/les';

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-28">
        {/* Header */}
        <div 
          className="px-5 pt-[58px] pb-5"
          style={{ 
            background: 'linear-gradient(135deg, #0365C4 0%, #00C1FF 100%)',
            borderRadius: '0 0 24px 24px',
          }}
        >
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.18)' }}>
              <ChevronLeft size={20} color="#fff" />
            </button>
            <div>
              <p className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>{t('book.title')}</p>
              <p className="text-white/60" style={{ fontSize: 12 }}>{t('book.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* 14-day rule banner */}
        <div className="mx-5 -mt-3 bg-white rounded-[14px] px-4 py-3 flex items-start gap-3" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <div className="w-8 h-8 rounded-[10px] bg-[#FEF3DC] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info size={16} color="#F5A623" />
          </div>
          <p className="text-[#6B7B94]" style={{ fontSize: 12, lineHeight: '18px' }}>
            <span style={{ fontWeight: 700, color: '#F5A623' }}>{t('book.rule_14days')}:</span> {t('book.rule_14days_desc')}
          </p>
        </div>

        {/* Lesson types */}
        <div className="px-5 pt-5 space-y-3">
          {lessonTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.title}
                onClick={() => navigate(type.path)}
                className="w-full bg-white rounded-[18px] p-4 flex items-center gap-4 text-left transition-all active:scale-[0.98]"
                style={{ boxShadow: `0 4px 16px ${type.shadow}` }}
              >
                <div 
                  className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center flex-shrink-0"
                  style={{ background: type.gradient, boxShadow: `0 6px 16px ${type.shadow}` }}
                >
                  <Icon size={24} color="#fff" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>{type.title}</p>
                    {type.badge && (
                      <div className="rounded-full px-2 py-0.5" style={{ backgroundColor: type.bgLight }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: type.gradient.includes('FF5C00') ? '#FF5C00' : '#00C1FF' }}>{type.badge}{perLesson}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[#8E9BB3] mt-0.5" style={{ fontSize: 12, lineHeight: '17px' }}>{type.subtitle}</p>
                </div>
                <ChevronRight size={18} color="#C4CDD9" />
              </button>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

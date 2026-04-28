import { useState } from 'react';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';
import { SwimCharacterLeft, SwimCharacterRight } from '../components/SwimmingCharacters';
import { useNavigate } from 'react-router';
import { Bell, CalendarPlus, ClipboardList, CreditCard, BarChart3, MapPin, Clock, ChevronRight, Waves, ChevronDown, Star } from 'lucide-react';
import { useLanguage } from '../config/LanguageContext';

const children = [
  { id: 1, name: 'Sami Khilji', initial: 'S', age: 7, level_nl: 'Gevorderd Beginner', level_en: 'Advanced Beginner', progress: 72, gradient: 'linear-gradient(135deg, #0365C4, #00C1FF)' },
  { id: 2, name: 'Noor Khilji', initial: 'N', age: 5, level_nl: 'Beginner', level_en: 'Beginner', progress: 35, gradient: 'linear-gradient(135deg, #FF5C00, #F5A623)' },
];

export function HomeScreen() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [selectedChild, setSelectedChild] = useState(0);
  const [showChildPicker, setShowChildPicker] = useState(false);
  const child = children[selectedChild];
  const childLevel = lang === 'en' ? child.level_en : child.level_nl;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? t('greeting.morning') : hour < 18 ? t('greeting.afternoon') : t('greeting.evening');

  return (
    <MobileFrame>
      <div className="min-h-full pb-28" style={{ background: '#F4F7FC' }}>
        {/* Header */}
        <div 
          className="relative px-5 pt-[58px] pb-5 overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, #0365C4 0%, #0D7FE8 60%, #00C1FF 100%)',
            borderRadius: '0 0 28px 28px',
          }}
        >
          <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 430 40" fill="none" style={{ opacity: 0.15 }}>
            <path d="M0 20 Q107 0 215 20 Q322 40 430 20 L430 40 L0 40 Z" fill="#fff" />
          </svg>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div 
                className="w-[48px] h-[48px] rounded-[16px] flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)' }}
              >
                <span className="text-white" style={{ fontSize: 22, fontWeight: 700 }}>A</span>
              </div>
              <div>
                <p className="text-white/70" style={{ fontSize: 12 }}>{greeting},</p>
                <p className="text-white" style={{ fontSize: 18, fontWeight: 700 }}>Ahmed Khilji</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/notifications')} 
              className="w-[44px] h-[44px] rounded-[14px] flex items-center justify-center relative"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
            >
              <Bell size={20} color="#fff" />
              <div className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-[#FF5C00] flex items-center justify-center" style={{ boxShadow: '0 2px 6px rgba(255,92,0,0.4)' }}>
                <span className="text-white" style={{ fontSize: 9, fontWeight: 700 }}>3</span>
              </div>
            </button>
          </div>

          {/* Logo watermark */}
          <div className="absolute top-3 right-3 opacity-10">
            <SnorkeltjeLogo size="tiny" />
          </div>
        </div>

        {/* Multi-child switcher */}
        {children.length > 1 && (
          <div className="px-5 mt-4">
            <button
              onClick={() => setShowChildPicker(!showChildPicker)}
              className="w-full bg-white rounded-[16px] px-4 py-3 flex items-center gap-3 active:scale-[0.99] transition-all"
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1.5px solid #E8F0FE' }}
            >
              <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center" style={{ background: child.gradient }}>
                <span className="text-white" style={{ fontSize: 15, fontWeight: 700 }}>{child.initial}</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{child.name}</p>
                <p className="text-[#8E9BB3]" style={{ fontSize: 11 }}>{childLevel} · {child.age} {t('child.year')}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#E8F0FE] rounded-full px-2 py-0.5">
                  <span className="text-[#0365C4]" style={{ fontSize: 10, fontWeight: 700 }}>{children.length} {t('home.children')}</span>
                </div>
                <ChevronDown size={16} color="#8E9BB3" style={{ transform: showChildPicker ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </div>
            </button>

            {showChildPicker && (
              <div className="mt-2 bg-white rounded-[14px] overflow-hidden" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                {children.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => { setSelectedChild(i); setShowChildPicker(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 active:bg-[#F8FAFE] transition-colors"
                    style={{ borderTop: i > 0 ? '1px solid #F0F4FA' : 'none', background: i === selectedChild ? '#F0F6FF' : 'transparent' }}
                  >
                    <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center" style={{ background: c.gradient }}>
                      <span className="text-white" style={{ fontSize: 13, fontWeight: 700 }}>{c.initial}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</p>
                      <p className="text-[#8E9BB3]" style={{ fontSize: 10 }}>{lang === 'en' ? c.level_en : c.level_nl}</p>
                    </div>
                    {i === selectedChild && (
                      <div className="w-[20px] h-[20px] rounded-full bg-[#0365C4] flex items-center justify-center">
                        <span className="text-white" style={{ fontSize: 11 }}>✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Next Lesson Card */}
        <div className="px-5 mt-4">
          <div 
            className="rounded-[20px] p-5 relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, #FF5C00 0%, #F5A623 100%)',
              boxShadow: '0 12px 32px rgba(255,92,0,0.25)',
            }}
          >
            <Waves size={80} className="absolute top-2 right-3 text-white/10" />
            <div className="flex items-start justify-between relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Clock size={13} color="#fff" />
                  </div>
                  <p className="text-white/80" style={{ fontSize: 12, fontWeight: 500 }}>{t('home.next_lesson')} — {child.name}</p>
                </div>
                <p className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>{lang === 'en' ? 'Monday, April 28' : 'Maandag, 28 april'}</p>
                <p className="text-white/90 mt-0.5" style={{ fontSize: 15 }}>15:00 – 15:30</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <MapPin size={14} color="rgba(255,255,255,0.7)" />
                  <span className="text-white/70" style={{ fontSize: 13 }}>De Bilt</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                  <span className="text-white" style={{ fontSize: 11, fontWeight: 700 }}>1-op-1</span>
                </div>
                <button
                  onClick={() => navigate('/reservation/1')}
                  className="bg-white rounded-full px-4 py-2 flex items-center gap-1 mt-auto"
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                >
                  <span className="text-[#FF5C00]" style={{ fontSize: 12, fontWeight: 700 }}>{t('common.view')}</span>
                  <ChevronRight size={14} color="#FF5C00" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-5 pt-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>{t('home.quick_actions')}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: CalendarPlus, label: t('home.book_lesson'), gradient: 'linear-gradient(135deg, #0365C4, #00C1FF)', shadow: 'rgba(3,101,196,0.2)', path: '/book-lesson' },
              { icon: ClipboardList, label: t('home.reservations'), gradient: 'linear-gradient(135deg, #FF5C00, #F5A623)', shadow: 'rgba(255,92,0,0.2)', path: '/reservations' },
              { icon: CreditCard, label: t('home.punch_cards'), gradient: 'linear-gradient(135deg, #27AE60, #2ECC71)', shadow: 'rgba(39,174,96,0.2)', path: '/punch-cards' },
              { icon: BarChart3, label: t('home.progress'), gradient: 'linear-gradient(135deg, #9B59B6, #8E44AD)', shadow: 'rgba(155,89,182,0.2)', path: '/child-progress' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="rounded-[18px] p-4 flex flex-col items-center justify-center gap-2.5 h-[110px] bg-white transition-all active:scale-[0.97]"
                  style={{ boxShadow: `0 4px 16px ${item.shadow}` }}
                >
                  <div 
                    className="w-[48px] h-[48px] rounded-[14px] flex items-center justify-center"
                    style={{ background: item.gradient, boxShadow: `0 6px 16px ${item.shadow}` }}
                  >
                    <Icon size={22} color="#fff" strokeWidth={2} />
                  </div>
                  <span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 700 }}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Child Progress Summary */}
        <div className="px-5 pt-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>{t('home.progress_of')} {child.name.split(' ')[0]}</p>
            <button onClick={() => navigate('/child-progress')} className="text-[#0365C4]" style={{ fontSize: 12, fontWeight: 600 }}>
              {t('common.details')} →
            </button>
          </div>
          <div 
            className="bg-white rounded-[18px] p-4"
            style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center" style={{ background: child.gradient }}>
                <span className="text-white" style={{ fontSize: 18, fontWeight: 700 }}>{child.initial}</span>
              </div>
              <div className="flex-1">
                <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{child.name}</p>
                <p className="text-[#8E9BB3]" style={{ fontSize: 12 }}>{t('home.level')}: {childLevel}</p>
              </div>
              <div className="text-right">
                <p className="text-[#0365C4]" style={{ fontSize: 20, fontWeight: 700 }}>{child.progress}%</p>
                <p className="text-[#8E9BB3]" style={{ fontSize: 10 }}>{t('common.total')}</p>
              </div>
            </div>
            <div className="mt-3 h-[6px] bg-[#E8F0FE] rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${child.progress}%`, background: 'linear-gradient(90deg, #0365C4, #00C1FF)' }} />
            </div>
            <div className="flex items-center justify-between mt-2">
              {[
                { label: t('home.breathing'), pct: selectedChild === 0 ? 100 : 50, color: '#27AE60' },
                { label: t('home.floating'), pct: selectedChild === 0 ? 80 : 30, color: '#0365C4' },
                { label: t('home.frontcrawl'), pct: selectedChild === 0 ? 45 : 10, color: '#FF5C00' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-[#8E9BB3]" style={{ fontSize: 10 }}>{s.label} {s.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="px-5 pt-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>{t('home.recent')}</p>
            <button onClick={() => navigate('/notifications')} className="text-[#0365C4]" style={{ fontSize: 12, fontWeight: 600 }}>
              {t('home.all')} →
            </button>
          </div>
          <div className="space-y-2.5">
            {[
              { icon: CalendarPlus, title: t('home.lesson_reminder'), subtitle: `${t('home.tomorrow')} 15:00 — De Bilt`, time: t('home.now'), color: '#0365C4', bg: '#E8F4FD' },
              { icon: BarChart3, title: t('home.progress_updated'), subtitle: `${child.name.split(' ')[0]}: ${t('home.breathing')} ${t('home.completed')} ✓`, time: '2u', color: '#27AE60', bg: '#E8F8F0' },
              { icon: CreditCard, title: t('home.punch_card'), subtitle: `${t('home.still')} 8 ${t('home.lessons_remaining')}`, time: '1d', color: '#FF5C00', bg: '#FEF0E7' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-[14px] px-4 py-3.5 flex items-center gap-3 transition-all active:scale-[0.99]"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}
                >
                  <div className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: item.bg }}>
                    <Icon size={18} color={item.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 700 }}>{item.title}</p>
                    <p className="text-[#8E9BB3]" style={{ fontSize: 11 }}>{item.subtitle}</p>
                  </div>
                  <span className="text-[#A0AEC0] flex-shrink-0" style={{ fontSize: 11 }}>{item.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Punch card banner */}
        <div className="px-5 pt-6 pb-4">
          <button 
            onClick={() => navigate('/punch-card-order')}
            className="w-full rounded-[18px] p-4 flex items-center gap-4 active:scale-[0.98] transition-all"
            style={{ 
              background: 'linear-gradient(135deg, #E8F4FD, #F0F6FF)',
              border: '1.5px solid #D0E4F7',
            }}
          >
            <div className="w-[44px] h-[44px] rounded-[14px] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)' }}>
              <CreditCard size={20} color="#fff" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[#0365C4]" style={{ fontSize: 14, fontWeight: 700 }}>{t('home.order_card')}</p>
              <p className="text-[#6B99C7]" style={{ fontSize: 12 }}>{t('home.from_price')}</p>
            </div>
            <ChevronRight size={18} color="#0365C4" />
          </button>
        </div>

        {/* Swimming characters decoration */}
        <div className="px-5 pb-4">
          <div className="rounded-[20px] p-4 flex items-center justify-center gap-4 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #E8F8FF 0%, #F0F6FF 100%)', border: '1.5px solid #D0E8F7' }}
          >
            <SwimCharacterLeft size={65} />
            <div className="text-center z-10">
              <p className="text-[#0365C4]" style={{ fontSize: 13, fontWeight: 700 }}>{t('home.learn_swim')}</p>
              <p className="text-[#0365C4]" style={{ fontSize: 11, opacity: 0.6 }}>{t('home.with_fun')}</p>
            </div>
            <SwimCharacterRight size={65} />
          </div>
        </div>

        {/* Reviews banner */}
        <div className="px-5 pb-4">
          <button
            onClick={() => navigate('/reviews')}
            className="w-full rounded-[18px] p-4 flex items-center gap-3 active:scale-[0.98] transition-all"
            style={{ background: 'linear-gradient(135deg, #FFF8F0, #FFF5E8)', border: '1.5px solid #F5DCC0' }}
          >
            <div className="w-[44px] h-[44px] rounded-[14px] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)' }}>
              <Star size={20} color="#fff" fill="#fff" />
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>9.6/10</span>
                <div className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} size={11} color="#FFD700" fill="#FFD700" />)}
                </div>
              </div>
              <p className="text-[#8E9BB3]" style={{ fontSize: 11 }}>240+ {t('home.satisfied_parents')}</p>
            </div>
            <ChevronRight size={18} color="#FF5C00" />
          </button>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

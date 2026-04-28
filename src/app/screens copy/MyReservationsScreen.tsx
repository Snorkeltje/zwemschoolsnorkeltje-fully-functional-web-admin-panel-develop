import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { ChevronLeft, Clock, MapPin, User, Calendar, X, ChevronRight } from 'lucide-react';
import { useLanguage } from '../config/LanguageContext';

const reservations = [
  { id: '1', date: 'Ma 28 apr', time: '15:00–15:30', location: 'De Bilt', instructor: 'Jan de Vries', type: 'Vast' as const, color: '#0365C4' },
  { id: '2', date: 'Wo 30 apr', time: '16:00–16:30', location: 'Bad Hulckesteijn', instructor: 'Maria Jansen', type: 'Extra' as const, color: '#FF5C00' },
  { id: '3', date: 'Ma 5 mei', time: '15:00–15:30', location: 'De Bilt', instructor: 'Jan de Vries', type: 'Vast' as const, color: '#0365C4' },
  { id: '4', date: 'Wo 7 mei', time: '10:00–10:30', location: 'Ampt v. Nijkerk', instructor: 'Pieter Bakker', type: 'Extra' as const, color: '#FF5C00' },
];

type FilterType = 'all' | 'fixed' | 'extra' | 'holiday';

export function MyReservationsScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [tab, setTab] = useState<'upcoming' | 'history'>('upcoming');
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = filter === 'all' ? reservations : reservations.filter(r => r.type === (filter === 'fixed' ? 'Vast' : filter === 'extra' ? 'Extra' : 'Vakantie'));

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
              <p className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>{t('reservations.title')}</p>
              <p className="text-white/60" style={{ fontSize: 12 }}>{filtered.length} {t('home.book_lesson').toLowerCase()}</p>
            </div>
          </div>
        </div>

        <div className="px-5 -mt-3">
          {/* Tab switcher */}
          <div 
            className="bg-white rounded-[16px] h-[48px] flex p-[4px]"
            style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
          >
            {(['upcoming', 'history'] as const).map(tb => (
              <button
                key={tb}
                onClick={() => setTab(tb)}
                className="flex-1 rounded-[12px] flex items-center justify-center gap-1.5 transition-all"
                style={{
                  background: tab === tb ? 'linear-gradient(135deg, #0365C4, #00C1FF)' : 'transparent',
                  boxShadow: tab === tb ? '0 4px 12px rgba(3,101,196,0.2)' : 'none',
                  fontSize: 13,
                  fontWeight: tab === tb ? 700 : 500,
                  color: tab === tb ? '#fff' : '#8E9BB3',
                }}
              >
                {tb === 'upcoming' ? <Calendar size={14} /> : <Clock size={14} />}
                {tb === 'upcoming' ? t('reservations.upcoming') : t('reservations.history')}
              </button>
            ))}
          </div>

          {/* Filter pills */}
          <div className="pt-4 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {[
              { key: 'all' as FilterType, label: t('common.all') },
              { key: 'fixed' as FilterType, label: t('reservations.fixed') },
              { key: 'extra' as FilterType, label: t('reservations.extra') },
              { key: 'holiday' as FilterType, label: t('reservations.holiday') },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="px-4 h-[32px] rounded-full flex-shrink-0 transition-all"
                style={{
                  background: filter === f.key ? 'linear-gradient(135deg, #0365C4, #00C1FF)' : '#fff',
                  color: filter === f.key ? '#fff' : '#6B7B94',
                  fontSize: 12,
                  fontWeight: filter === f.key ? 700 : 500,
                  boxShadow: filter === f.key ? '0 4px 12px rgba(3,101,196,0.2)' : '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="pt-4 space-y-3">
            {filtered.map(res => (
              <button
                key={res.id}
                onClick={() => navigate(`/reservation/${res.id}`)}
                className="w-full bg-white rounded-[18px] p-4 text-left relative overflow-hidden transition-all active:scale-[0.99]"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                {/* Left accent */}
                <div className="absolute left-0 top-3 bottom-3 w-[4px] rounded-r-full" style={{ backgroundColor: res.color }} />
                
                <div className="flex items-start gap-3 ml-2">
                  {/* Date box */}
                  <div 
                    className="w-[52px] h-[52px] rounded-[14px] flex flex-col items-center justify-center flex-shrink-0"
                    style={{ background: `${res.color}10` }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 600, color: res.color }}>{res.date.split(' ')[0]}</span>
                    <span style={{ fontSize: 18, fontWeight: 700, color: res.color }}>{res.date.split(' ')[1]}</span>
                    <span style={{ fontSize: 10, color: res.color }}>{res.date.split(' ')[2]}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} color="#8E9BB3" />
                        <span className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{res.time}</span>
                      </div>
                      <div className="rounded-full px-2.5 py-0.5" style={{ backgroundColor: `${res.color}12` }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: res.color }}>{res.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <MapPin size={13} color="#8E9BB3" />
                      <span className="text-[#6B7B94]" style={{ fontSize: 12 }}>{res.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <User size={13} color="#8E9BB3" />
                      <span className="text-[#6B7B94]" style={{ fontSize: 12 }}>{res.instructor}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <ChevronRight size={16} color="#C4CDD9" />
                    <div 
                      role="button"
                      onClick={(e) => { e.stopPropagation(); navigate(`/cancellation-confirm/${res.id}`); }}
                      className="flex items-center gap-1 text-[#E74C3C] mt-auto cursor-pointer"
                    >
                      <X size={12} />
                      <span style={{ fontSize: 11, fontWeight: 600 }}>{t('common.cancel')}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}
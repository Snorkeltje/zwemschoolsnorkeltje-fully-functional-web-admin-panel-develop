import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { ChevronLeft, ChevronRight, MapPin, Clock, User, Info, Waves, Calendar, Check } from 'lucide-react';
import { useLanguage } from '../config/LanguageContext';

const weekDaysNl = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
const weekDaysEn = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const weeks = [
  [null, null, null, null, null, null, 1],
  [2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28, 29],
  [30, 31, null, null, null, null, null],
];
const weekNums = [10, 11, 12, 13, 14, 15];

const availableDays = [4, 5, 6, 11, 12, 13, 18, 19, 20, 25, 26, 27, 28, 29];
const fullDays = [27];
const fewLeftDays = [20, 26];

const timeSlots = [
  { time: '09:00', end: '09:30', available: true, spots: 3 },
  { time: '09:30', end: '10:00', available: true, spots: 2 },
  { time: '10:00', end: '10:30', available: true, spots: 1 },
  { time: '10:30', end: '11:00', available: false, spots: 0 },
  { time: '14:00', end: '14:30', available: true, spots: 3 },
  { time: '14:30', end: '15:00', available: true, spots: 2 },
  { time: '15:00', end: '15:30', available: false, spots: 0 },
  { time: '16:00', end: '16:30', available: true, spots: 1 },
];

export function ExtraLessonCalendarScreen() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const weekDays = lang === 'en' ? weekDaysEn : weekDaysNl;

  const getDayStatus = (day: number) => {
    if (day < 25) return 'past';
    if (fullDays.includes(day)) return 'full';
    if (fewLeftDays.includes(day)) return 'few';
    if (availableDays.includes(day)) return 'available';
    return 'none';
  };

  const getDayColors = (day: number) => {
    const status = getDayStatus(day);
    const isSelected = selectedDate === day;
    const isToday = day === 25;
    if (isSelected) return { bg: 'linear-gradient(135deg, #0365C4, #00C1FF)', text: '#fff', shadow: '0 4px 12px rgba(3,101,196,0.35)' };
    switch (status) {
      case 'available': return { bg: '#E8F8F0', text: '#27AE60', shadow: 'none' };
      case 'full': return { bg: '#FEE4E4', text: '#E74C3C', shadow: 'none' };
      case 'few': return { bg: '#FEF3DC', text: '#F39C12', shadow: 'none' };
      case 'past': return { bg: 'transparent', text: '#C4CDD9', shadow: 'none' };
      default: return { bg: isToday ? '#E8F0FE' : 'transparent', text: isToday ? '#0365C4' : '#1A1A2E', shadow: 'none' };
    }
  };

  const monthName = lang === 'en' ? 'March' : 'maart';

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-6">
        {/* Header */}
        <div
          className="relative px-5 pt-[58px] pb-6 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0365C4 0%, #0D7FE8 60%, #00C1FF 100%)',
            borderRadius: '0 0 28px 28px',
          }}
        >
          <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 430 30" fill="none" style={{ opacity: 0.12 }}>
            <path d="M0 15 Q107 0 215 15 Q322 30 430 15 L430 30 L0 30 Z" fill="#fff" />
          </svg>
          <Waves size={100} className="absolute top-6 right-[-10px] text-white/5" />

          <div className="flex items-center gap-3 relative z-10">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
              <ChevronLeft size={20} color="#fff" />
            </button>
            <div className="flex-1">
              <p className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>
                {lang === 'en' ? 'Extra 1-on-1 Lesson' : 'Extra 1-op-1 Les'}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin size={12} color="rgba(255,255,255,0.6)" />
                <span className="text-white/60" style={{ fontSize: 12 }}>Ampt van Nijkerk</span>
              </div>
            </div>
            <div className="rounded-full px-3 py-1.5" style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)' }}>
              <span className="text-white" style={{ fontSize: 11, fontWeight: 700 }}>1-op-1</span>
            </div>
          </div>
        </div>

        {/* 14-day rule info */}
        <div className="mx-5 -mt-3 bg-white rounded-[16px] px-4 py-3.5 flex items-start gap-3" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
          <div className="w-[32px] h-[32px] rounded-[10px] bg-[#E8F0FE] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info size={15} color="#0365C4" />
          </div>
          <p className="text-[#4A5568]" style={{ fontSize: 12, lineHeight: 1.5 }}>
            <span style={{ fontWeight: 700, color: '#0365C4' }}>
              {lang === 'en' ? '14-day rule:' : '14-dagenregel:'}
            </span>{' '}
            {lang === 'en'
              ? 'Extra lessons are available within 14 days. Book any day and time of your choice.'
              : 'Extra lessen zijn beschikbaar binnen 14 dagen. Boek op een dag en tijd naar keuze.'
            }
          </p>
        </div>

        {/* Calendar */}
        <div className="mx-5 mt-4 bg-white rounded-[20px] overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          {/* Month header */}
          <div className="flex items-center justify-between px-5 py-4" style={{ background: 'linear-gradient(135deg, #0365C4, #0D7FE8)' }}>
            <button className="w-[36px] h-[36px] rounded-[12px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.18)' }}>
              <ChevronLeft size={18} color="#fff" />
            </button>
            <div className="flex items-center gap-2">
              <Calendar size={16} color="rgba(255,255,255,0.7)" />
              <p className="text-white" style={{ fontSize: 17, fontWeight: 700 }}>{monthName} 2026</p>
            </div>
            <button className="w-[36px] h-[36px] rounded-[12px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.18)' }}>
              <ChevronRight size={18} color="#fff" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-8 px-3 pt-4 pb-2">
            <p className="text-center text-[#C4CDD9]" style={{ fontSize: 9, fontWeight: 600 }}>
              {lang === 'en' ? 'Wk' : 'Wk'}
            </p>
            {weekDays.map(d => (
              <p key={d} className="text-center text-[#8E9BB3]" style={{ fontSize: 11, fontWeight: 700 }}>{d}</p>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="px-3 pb-4">
            {weeks.map((week, wi) => (
              <div key={wi} className="grid grid-cols-8 gap-[3px] mt-[3px]">
                <div className="flex items-center justify-center">
                  <span className="text-[#C4CDD9]" style={{ fontSize: 9, fontWeight: 500 }}>{weekNums[wi]}</span>
                </div>
                {week.map((day, di) => {
                  if (day === null) return <div key={di} />;
                  const colors = getDayColors(day);
                  const isClickable = getDayStatus(day) === 'available' || getDayStatus(day) === 'few';
                  const isSelected = selectedDate === day;
                  return (
                    <button
                      key={di}
                      onClick={() => {
                        if (isClickable) {
                          setSelectedDate(day);
                          setSelectedSlot(null);
                        }
                      }}
                      disabled={!isClickable}
                      className="flex items-center justify-center mx-auto rounded-[12px] transition-all"
                      style={{
                        width: 40, height: 40,
                        background: colors.bg,
                        boxShadow: colors.shadow,
                      }}
                    >
                      <span style={{ fontSize: 14, fontWeight: isSelected ? 700 : 500, color: colors.text }}>{day}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 px-4 py-3.5" style={{ borderTop: '1px solid #F0F4FA' }}>
            {[
              { color: '#27AE60', bg: '#E8F8F0', label: lang === 'en' ? 'Available' : 'Beschikbaar' },
              { color: '#F39C12', bg: '#FEF3DC', label: lang === 'en' ? 'Few left' : 'Bijna vol' },
              { color: '#E74C3C', bg: '#FEE4E4', label: lang === 'en' ? 'Full' : 'Vol' },
              { color: '#C4CDD9', bg: '#F4F7FC', label: lang === 'en' ? 'Past' : 'Verleden' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-[14px] h-[14px] rounded-[4px]" style={{ backgroundColor: l.bg, border: `1.5px solid ${l.color}` }} />
                <span className="text-[#8E9BB3]" style={{ fontSize: 10, fontWeight: 500 }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Time slots — shown when date selected */}
        {selectedDate && (
          <div className="mx-5 mt-5">
            <p className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>
              {lang === 'en'
                ? `Available times — ${selectedDate} March`
                : `Beschikbare tijden — ${selectedDate} maart`
              }
            </p>
            <p className="text-[#8E9BB3] mt-0.5" style={{ fontSize: 12 }}>
              {lang === 'en' ? 'Select a time slot' : 'Selecteer een tijdslot'}
            </p>

            <div className="grid grid-cols-3 gap-2 mt-3">
              {timeSlots.map(slot => {
                const isSelected = selectedSlot === slot.time;
                const isFew = slot.spots === 1 && slot.available;
                return (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && setSelectedSlot(slot.time)}
                    disabled={!slot.available}
                    className="rounded-[14px] py-3 flex flex-col items-center gap-1 transition-all active:scale-[0.96]"
                    style={{
                      background: isSelected
                        ? 'linear-gradient(135deg, #0365C4, #00C1FF)'
                        : slot.available ? '#fff' : '#F4F7FC',
                      boxShadow: isSelected
                        ? '0 6px 20px rgba(3,101,196,0.3)'
                        : slot.available ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                      border: isFew && !isSelected ? '1.5px solid #F39C12' : '1.5px solid transparent',
                      opacity: slot.available ? 1 : 0.5,
                    }}
                  >
                    <Clock size={14} color={isSelected ? '#fff' : slot.available ? '#0365C4' : '#C4CDD9'} />
                    <span style={{
                      fontSize: 14, fontWeight: 700,
                      color: isSelected ? '#fff' : slot.available ? '#1A1A2E' : '#C4CDD9',
                    }}>{slot.time}</span>
                    {slot.available && (
                      <span style={{
                        fontSize: 9, fontWeight: 600,
                        color: isSelected ? 'rgba(255,255,255,0.7)' : isFew ? '#F39C12' : '#8E9BB3',
                      }}>
                        {slot.spots} {lang === 'en' ? (slot.spots === 1 ? 'spot' : 'spots') : (slot.spots === 1 ? 'plek' : 'plekken')}
                      </span>
                    )}
                    {isSelected && (
                      <div className="w-[16px] h-[16px] rounded-full bg-white/25 flex items-center justify-center mt-0.5">
                        <Check size={10} color="#fff" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Selected slot detail & Book button */}
        {selectedDate && selectedSlot && (
          <div className="mx-5 mt-4 bg-white rounded-[20px] p-5" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
            <p className="text-[#1A1A2E] mb-3" style={{ fontSize: 15, fontWeight: 700 }}>
              {lang === 'en' ? 'Lesson details' : 'Lesdetails'}
            </p>
            <div className="space-y-3">
              {[
                { icon: Clock, label: lang === 'en' ? 'Time' : 'Tijd', value: `${selectedSlot} – ${timeSlots.find(s => s.time === selectedSlot)?.end}`, color: '#0365C4' },
                { icon: MapPin, label: lang === 'en' ? 'Location' : 'Locatie', value: 'Ampt van Nijkerk', color: '#FF5C00' },
                { icon: User, label: lang === 'en' ? 'Instructor' : 'Instructeur', value: lang === 'en' ? 'To be assigned' : 'Wordt toegewezen', color: '#27AE60' },
              ].map(d => {
                const Icon = d.icon;
                return (
                  <div key={d.label} className="flex items-center gap-3">
                    <div className="w-[38px] h-[38px] rounded-[12px] flex items-center justify-center" style={{ backgroundColor: `${d.color}12` }}>
                      <Icon size={16} color={d.color} />
                    </div>
                    <div>
                      <p className="text-[#8E9BB3]" style={{ fontSize: 10, fontWeight: 500 }}>{d.label}</p>
                      <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>{d.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid #F0F4FA' }}>
              <div>
                <p className="text-[#8E9BB3]" style={{ fontSize: 10 }}>{lang === 'en' ? 'Price per lesson' : 'Prijs per les'}</p>
                <p className="text-[#1A1A2E]" style={{ fontSize: 24, fontWeight: 700 }}>€38<span className="text-[#8E9BB3]" style={{ fontSize: 14, fontWeight: 400 }}>,00</span></p>
              </div>
              <button
                onClick={() => navigate('/booking-summary')}
                className="h-[52px] rounded-[16px] px-7 flex items-center gap-2 transition-all active:scale-[0.97]"
                style={{
                  background: 'linear-gradient(135deg, #FF5C00, #F5A623)',
                  boxShadow: '0 8px 24px rgba(255,92,0,0.35)',
                }}
              >
                <span className="text-white" style={{ fontSize: 15, fontWeight: 700 }}>
                  {lang === 'en' ? 'Book now' : 'Boek nu'} →
                </span>
              </button>
            </div>
          </div>
        )}

        <div className="h-4" />
      </div>
    </MobileFrame>
  );
}

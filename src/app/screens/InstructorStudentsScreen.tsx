import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { InstructorBottomNav } from '../components/layout/InstructorBottomNav';
import { Search, ChevronRight, BarChart3, MapPin, Calendar, Filter, TrendingUp } from 'lucide-react';
import { useLanguage } from '../config/LanguageContext';

const students = [
  { id: 1, name: 'Sami Khilji', initial: 'S', age: 7, level_nl: 'Gevorderd Beginner', level_en: 'Adv. Beginner', progress: 72, gradient: 'linear-gradient(135deg, #0365C4, #00C1FF)', location: 'De Bilt', nextLesson: 'Ma 28 apr · 15:00', parent: 'Ahmed Khilji', lessonsTotal: 24, trend: 'up' },
  { id: 2, name: 'Noor Khilji', initial: 'N', age: 5, level_nl: 'Beginner', level_en: 'Beginner', progress: 35, gradient: 'linear-gradient(135deg, #FF5C00, #F5A623)', location: 'De Bilt', nextLesson: 'Ma 28 apr · 15:30', parent: 'Ahmed Khilji', lessonsTotal: 12, trend: 'up' },
  { id: 3, name: 'Lisa Bos', initial: 'L', age: 8, level_nl: 'Gevorderd', level_en: 'Advanced', progress: 88, gradient: 'linear-gradient(135deg, #27AE60, #2ECC71)', location: 'Bad Hulckesteijn', nextLesson: 'Wo 30 apr · 14:00', parent: 'Maria Bos', lessonsTotal: 42, trend: 'up' },
  { id: 4, name: 'Tim van Dijk', initial: 'T', age: 6, level_nl: 'Beginner', level_en: 'Beginner', progress: 20, gradient: 'linear-gradient(135deg, #9B59B6, #8E44AD)', location: 'Ampt v. Nijkerk', nextLesson: 'Do 1 mei · 10:00', parent: 'Kees van Dijk', lessonsTotal: 8, trend: 'stable' },
  { id: 5, name: 'Emma Jansen', initial: 'E', age: 9, level_nl: 'Diploma A', level_en: 'Diploma A', progress: 95, gradient: 'linear-gradient(135deg, #E74C3C, #C0392B)', location: 'De Bilt', nextLesson: 'Vr 2 mei · 16:00', parent: 'Pieter Jansen', lessonsTotal: 56, trend: 'up' },
  { id: 6, name: 'Daan Bakker', initial: 'D', age: 7, level_nl: 'Beginner', level_en: 'Beginner', progress: 45, gradient: 'linear-gradient(135deg, #F39C12, #E67E22)', location: 'Garderen', nextLesson: 'Ma 28 apr · 16:00', parent: 'Anna Bakker', lessonsTotal: 18, trend: 'up' },
  { id: 7, name: 'Sophie de Wit', initial: 'So', age: 6, level_nl: 'Beginner', level_en: 'Beginner', progress: 30, gradient: 'linear-gradient(135deg, #1ABC9C, #16A085)', location: 'Bad Hulckesteijn', nextLesson: 'Wo 30 apr · 15:00', parent: 'Jan de Wit', lessonsTotal: 10, trend: 'stable' },
  { id: 8, name: 'Finn Mulder', initial: 'F', age: 10, level_nl: 'Gevorderd Beginner', level_en: 'Adv. Beginner', progress: 60, gradient: 'linear-gradient(135deg, #3498DB, #2980B9)', location: 'Ampt v. Nijkerk', nextLesson: 'Do 1 mei · 11:00', parent: 'Tom Mulder', lessonsTotal: 28, trend: 'up' },
];

type FilterType = 'all' | 'beginner' | 'advanced' | 'diploma';

export function InstructorStudentsScreen() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const filterLabels: Record<FilterType, string> = {
    all: lang === 'en' ? 'All' : 'Alle',
    beginner: 'Beginner',
    advanced: lang === 'en' ? 'Advanced' : 'Gevorderd',
    diploma: 'Diploma',
  };

  const filtered = students.filter(s => {
    const matchesSearch = search === '' || s.name.toLowerCase().includes(search.toLowerCase()) || s.parent.toLowerCase().includes(search.toLowerCase());
    const level = lang === 'en' ? s.level_en : s.level_nl;
    const matchesFilter = filter === 'all' ||
      (filter === 'beginner' && level.includes('Beginner')) ||
      (filter === 'advanced' && (level.includes('Gevorderd') || level.includes('Adv'))) ||
      (filter === 'diploma' && level.includes('Diploma'));
    return matchesSearch && matchesFilter;
  });

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#0F1117] pb-28">
        {/* Header */}
        <div
          className="relative px-5 pt-[58px] pb-6 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1A1D27 0%, #252836 100%)' }}
        >
          <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,92,0,0.08), transparent 70%)', transform: 'translate(30%, -30%)' }} />

          <div className="relative z-10">
            <p className="text-white" style={{ fontSize: 22, fontWeight: 700 }}>
              {lang === 'en' ? 'My Students' : 'Mijn Leerlingen'}
            </p>
            <p className="text-[#8E9BB3] mt-0.5" style={{ fontSize: 13 }}>
              {students.length} {lang === 'en' ? 'active students' : 'actieve leerlingen'}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 mt-4 relative z-10">
            {[
              { value: students.length.toString(), label: lang === 'en' ? 'Students' : 'Leerlingen', color: '#FF5C00' },
              { value: '3', label: lang === 'en' ? 'Locations' : 'Locaties', color: '#00C1FF' },
              { value: '85%', label: lang === 'en' ? 'Avg progress' : 'Gem. voortgang', color: '#27AE60' },
            ].map(stat => (
              <div
                key={stat.label}
                className="flex-1 rounded-[14px] py-2.5 flex flex-col items-center"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <span style={{ fontSize: 18, fontWeight: 700, color: stat.color }}>{stat.value}</span>
                <span className="text-[#8E9BB3]" style={{ fontSize: 9, fontWeight: 500 }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="px-5 -mt-3">
          <div
            className="rounded-[16px] h-[48px] flex items-center px-4 gap-3"
            style={{ background: '#1A1D27', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <Search size={18} color="#8E9BB3" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={lang === 'en' ? 'Search students or parents...' : 'Zoek leerlingen of ouders...'}
              className="flex-1 bg-transparent text-[#E2E8F0] placeholder-[#4A5568] outline-none"
              style={{ fontSize: 14 }}
            />
          </div>
        </div>

        {/* Filter pills */}
        <div className="px-5 mt-3 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {(Object.keys(filterLabels) as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 h-[32px] rounded-full flex-shrink-0 transition-all"
              style={{
                background: filter === f ? 'linear-gradient(135deg, #FF5C00, #F5A623)' : 'rgba(255,255,255,0.06)',
                color: filter === f ? '#fff' : '#8E9BB3',
                fontSize: 12,
                fontWeight: filter === f ? 700 : 500,
                boxShadow: filter === f ? '0 4px 12px rgba(255,92,0,0.25)' : 'none',
              }}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>

        {/* Student Cards */}
        <div className="px-5 mt-4 space-y-2.5">
          {filtered.map(student => (
            <button
              key={student.id}
              onClick={() => navigate(`/instructor/progress-update/${student.initial}`)}
              className="w-full rounded-[18px] p-4 text-left relative overflow-hidden transition-all active:scale-[0.98]"
              style={{ background: '#1A1D27', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            >
              {/* Left accent */}
              <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full" style={{ background: student.gradient }} />

              <div className="flex items-center gap-3 ml-1">
                {/* Avatar */}
                <div
                  className="w-[48px] h-[48px] rounded-[14px] flex items-center justify-center flex-shrink-0"
                  style={{ background: student.gradient, boxShadow: `0 4px 12px rgba(0,0,0,0.2)` }}
                >
                  <span className="text-white" style={{ fontSize: 18, fontWeight: 700 }}>{student.initial}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[#E2E8F0]" style={{ fontSize: 14, fontWeight: 700 }}>{student.name}</p>
                    {student.trend === 'up' && <TrendingUp size={12} color="#27AE60" />}
                  </div>
                  <p className="text-[#8E9BB3] mt-0.5" style={{ fontSize: 11 }}>
                    {lang === 'en' ? student.level_en : student.level_nl} · {student.age} {lang === 'en' ? 'yrs' : 'jr'}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <MapPin size={10} color="#4A5568" />
                      <span className="text-[#4A5568]" style={{ fontSize: 10 }}>{student.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={10} color="#4A5568" />
                      <span className="text-[#4A5568]" style={{ fontSize: 10 }}>{student.nextLesson}</span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#FF5C00' }}>{student.progress}%</span>
                  <div className="w-[40px] h-[4px] bg-[#2D3748] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${student.progress}%`, background: 'linear-gradient(90deg, #FF5C00, #F5A623)' }} />
                  </div>
                  <span className="text-[#4A5568]" style={{ fontSize: 9 }}>{student.lessonsTotal} {lang === 'en' ? 'lessons' : 'lessen'}</span>
                </div>

                <ChevronRight size={16} color="#4A5568" />
              </div>
            </button>
          ))}
        </div>
      </div>
      <InstructorBottomNav />
    </MobileFrame>
  );
}

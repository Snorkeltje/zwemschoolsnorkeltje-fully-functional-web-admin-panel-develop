import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { InstructorBottomNav } from '../components/layout/InstructorBottomNav';
import { ChevronLeft, Clock, MapPin, Users, ChevronRight, MessageCircle, TrendingUp, CheckCircle } from 'lucide-react';
import { useLanguage } from '../config/LanguageContext';

const students = [
  { initial: 'S', name: 'Sami Khilji', age: 7, level_nl: 'Gev. Beginner', level_en: 'Adv. Beginner', progress: 72, goal_nl: 'Ademhaling & vrije slag', goal_en: 'Breathing & front crawl', gradient: 'linear-gradient(135deg, #0365C4, #00C1FF)', parent: 'Ahmed Khilji' },
  { initial: 'L', name: 'Lisa Bos', age: 8, level_nl: 'Beginner', level_en: 'Beginner', progress: 45, goal_nl: 'Drijven & schoppen', goal_en: 'Floating & kicking', gradient: 'linear-gradient(135deg, #27AE60, #2ECC71)', parent: 'Maria Bos' },
];

export function LessonDetailScreen() {
  const navigate = useNavigate();
  const { lang } = useLanguage();

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#0F1117] pb-28">
        {/* Header */}
        <div
          className="px-5 pt-[58px] pb-5"
          style={{ background: 'linear-gradient(135deg, #1A1D27, #252836)' }}
        >
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <ChevronLeft size={20} color="#E2E8F0" />
            </button>
            <div className="flex-1">
              <p className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>
                {lang === 'en' ? 'Lesson Details' : 'Lesdetails'}
              </p>
              <p className="text-[#8E9BB3]" style={{ fontSize: 12 }}>De Bilt — 15:00</p>
            </div>
          </div>
        </div>

        {/* Lesson info banner */}
        <div className="mx-5 -mt-1">
          <div
            className="rounded-[20px] p-5 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)', boxShadow: '0 8px 24px rgba(255,92,0,0.3)' }}
          >
            <div className="absolute top-0 right-0 w-[100px] h-[100px] rounded-full bg-white/8 -translate-y-1/3 translate-x-1/4" />
            <div className="flex items-center gap-2 mb-2">
              <Clock size={14} color="rgba(255,255,255,0.7)" />
              <span className="text-white/70" style={{ fontSize: 12 }}>
                {lang === 'en' ? 'Monday April 28, 2026' : 'Maandag 28 april 2026'}
              </span>
            </div>
            <p className="text-white" style={{ fontSize: 22, fontWeight: 700 }}>15:00 – 15:30</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <MapPin size={13} color="rgba(255,255,255,0.7)" />
                <span className="text-white/80" style={{ fontSize: 13 }}>De Bilt Zwembad</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={13} color="rgba(255,255,255,0.7)" />
                <span className="text-white/80" style={{ fontSize: 13 }}>1-op-2 · 2/2</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <CheckCircle size={13} color="#fff" />
              <span className="text-white" style={{ fontSize: 12, fontWeight: 600 }}>
                {lang === 'en' ? 'All present' : 'Allen aanwezig'}
              </span>
            </div>
          </div>
        </div>

        {/* Students */}
        <div className="px-5 mt-5">
          <p className="text-[#E2E8F0] mb-3" style={{ fontSize: 16, fontWeight: 700 }}>
            {lang === 'en' ? "Today's students" : 'Leerlingen vandaag'}
          </p>

          <div className="space-y-3">
            {students.map(student => (
              <div key={student.name} className="rounded-[18px] p-4 relative overflow-hidden" style={{ background: '#1A1D27' }}>
                <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full" style={{ background: student.gradient }} />

                <div className="flex items-center gap-3 ml-1">
                  <div
                    className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center flex-shrink-0"
                    style={{ background: student.gradient, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                  >
                    <span className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>{student.initial}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#E2E8F0]" style={{ fontSize: 15, fontWeight: 700 }}>{student.name}</p>
                    <p className="text-[#8E9BB3]" style={{ fontSize: 12 }}>
                      {student.age} {lang === 'en' ? 'yrs' : 'jr'} · {lang === 'en' ? student.level_en : student.level_nl}
                    </p>
                  </div>
                  <div className="text-right">
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#FF5C00' }}>{student.progress}%</span>
                    <div className="w-[40px] h-[4px] bg-[#2D3748] rounded-full overflow-hidden mt-1">
                      <div className="h-full rounded-full" style={{ width: `${student.progress}%`, background: 'linear-gradient(90deg, #FF5C00, #F5A623)' }} />
                    </div>
                  </div>
                </div>

                {/* Goal */}
                <div className="ml-1 mt-3 rounded-[12px] px-3 py-2.5 flex items-center gap-2" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <TrendingUp size={14} color="#00C1FF" />
                  <div className="flex-1">
                    <p className="text-[#4A5568]" style={{ fontSize: 10 }}>{lang === 'en' ? 'Lesson goal' : 'Lesdoel'}</p>
                    <p className="text-[#E2E8F0]" style={{ fontSize: 12, fontWeight: 600 }}>{lang === 'en' ? student.goal_en : student.goal_nl}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="ml-1 mt-3 flex gap-2">
                  <button
                    onClick={() => navigate(`/instructor/progress-update/${student.initial}`)}
                    className="flex-1 h-[44px] rounded-[12px] flex items-center justify-center gap-2 transition-all active:scale-[0.97]"
                    style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)', boxShadow: '0 4px 12px rgba(255,92,0,0.25)' }}
                  >
                    <TrendingUp size={15} color="#fff" />
                    <span className="text-white" style={{ fontSize: 13, fontWeight: 700 }}>
                      {lang === 'en' ? 'Update progress' : 'Voortgang bijwerken'}
                    </span>
                  </button>
                  <button
                    onClick={() => navigate('/instructor/messages')}
                    className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center"
                    style={{ background: 'rgba(0,193,255,0.12)' }}
                  >
                    <MessageCircle size={18} color="#00C1FF" />
                  </button>
                </div>

                {/* Parent info */}
                <div className="ml-1 mt-2 flex items-center gap-1.5">
                  <span className="text-[#4A5568]" style={{ fontSize: 10 }}>{lang === 'en' ? 'Parent' : 'Ouder'}:</span>
                  <span className="text-[#8E9BB3]" style={{ fontSize: 10, fontWeight: 600 }}>{student.parent}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <InstructorBottomNav />
    </MobileFrame>
  );
}

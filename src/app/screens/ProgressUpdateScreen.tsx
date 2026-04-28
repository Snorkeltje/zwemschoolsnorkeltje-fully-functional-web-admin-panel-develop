import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { InstructorBottomNav } from '../components/layout/InstructorBottomNav';
import { ChevronLeft, Check, ChevronDown, Save, Send, Star } from 'lucide-react';
import { useLanguage } from '../config/LanguageContext';

const levels = [
  { nl: 'Beginner', en: 'Beginner' },
  { nl: 'Gevorderd Beginner', en: 'Advanced Beginner' },
  { nl: 'Gevorderd', en: 'Advanced' },
  { nl: 'Diploma A', en: 'Diploma A' },
  { nl: 'Diploma B', en: 'Diploma B' },
];

export function ProgressUpdateScreen() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [showLevelPicker, setShowLevelPicker] = useState(false);
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);
  const [mood, setMood] = useState<number | null>(null);

  const [skills, setSkills] = useState([
    { name_nl: 'Vrije slag armen', name_en: 'Freestyle arms', checked: true },
    { name_nl: 'Ademhaling links/rechts', name_en: 'Breathing left/right', checked: true },
    { name_nl: 'Rugslag', name_en: 'Backstroke', checked: false },
    { name_nl: 'Drijven op rug', name_en: 'Floating on back', checked: false },
    { name_nl: 'Schoolslag benen', name_en: 'Breaststroke legs', checked: false },
  ]);

  const [steps, setSteps] = useState([
    { name_nl: 'Beiderzijds ademen', name_en: 'Bilateral breathing', done: true },
    { name_nl: '10m vrije slag zonder stop', name_en: '10m freestyle without stopping', done: false },
    { name_nl: '5m rugslag', name_en: '5m backstroke', done: false },
  ]);

  const toggleSkill = (i: number) => {
    const updated = [...skills];
    updated[i].checked = !updated[i].checked;
    setSkills(updated);
  };

  const toggleStep = (i: number) => {
    const updated = [...steps];
    updated[i].done = !updated[i].done;
    setSteps(updated);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => navigate(-1), 1500);
  };

  if (saved) {
    return (
      <MobileFrame>
        <div className="h-full bg-[#0F1117] flex flex-col items-center justify-center px-8">
          <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #27AE60, #2ECC71)', boxShadow: '0 8px 24px rgba(39,174,96,0.3)' }}>
            <Check size={40} color="#fff" strokeWidth={3} />
          </div>
          <p className="text-[#E2E8F0] mt-5" style={{ fontSize: 22, fontWeight: 700 }}>
            {lang === 'en' ? 'Progress saved!' : 'Voortgang opgeslagen!'}
          </p>
          <p className="text-[#8E9BB3] mt-2 text-center" style={{ fontSize: 14 }}>
            {lang === 'en' ? 'Parent has been notified automatically.' : 'Ouder is automatisch op de hoogte gebracht.'}
          </p>
        </div>
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#0F1117] pb-28">
        {/* Header */}
        <div className="px-5 pt-[58px] pb-5" style={{ background: 'linear-gradient(135deg, #1A1D27, #252836)' }}>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <ChevronLeft size={20} color="#E2E8F0" />
            </button>
            <div className="flex-1">
              <p className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>
                {lang === 'en' ? 'Update Progress' : 'Voortgang Bijwerken'}
              </p>
            </div>
          </div>
        </div>

        {/* Student info */}
        <div className="mx-5 -mt-1">
          <div
            className="rounded-[18px] p-4 flex items-center gap-3 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)', boxShadow: '0 6px 20px rgba(255,92,0,0.25)' }}
          >
            <div className="w-[48px] h-[48px] rounded-[14px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <span className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>S</span>
            </div>
            <div>
              <p className="text-white" style={{ fontSize: 16, fontWeight: 700 }}>Sami Khilji · 7 {lang === 'en' ? 'yrs' : 'jr'}</p>
              <p className="text-white/70" style={{ fontSize: 12 }}>
                {lang === 'en' ? 'Current' : 'Huidig'}: {lang === 'en' ? levels[selectedLevel].en : levels[selectedLevel].nl} · 28 apr
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 mt-5">
          {/* Level update */}
          <p className="text-[#8E9BB3] mb-2" style={{ fontSize: 12, fontWeight: 600 }}>
            {lang === 'en' ? 'Level update' : 'Niveauupdate'}
          </p>
          <button
            onClick={() => setShowLevelPicker(!showLevelPicker)}
            className="w-full rounded-[14px] px-4 py-3.5 flex items-center justify-between transition-all"
            style={{ background: '#1A1D27', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span className="text-[#FF5C00]" style={{ fontSize: 14, fontWeight: 600 }}>
              {lang === 'en' ? levels[selectedLevel].en : levels[selectedLevel].nl}
            </span>
            <ChevronDown size={16} color="#8E9BB3" style={{ transform: showLevelPicker ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
          {showLevelPicker && (
            <div className="mt-2 rounded-[14px] overflow-hidden" style={{ background: '#1A1D27', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
              {levels.map((level, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedLevel(i); setShowLevelPicker(false); }}
                  className="w-full px-4 py-3 flex items-center justify-between active:bg-[#252836] transition-colors"
                  style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                >
                  <span className={i === selectedLevel ? 'text-[#FF5C00]' : 'text-[#E2E8F0]'} style={{ fontSize: 13, fontWeight: i === selectedLevel ? 700 : 400 }}>
                    {lang === 'en' ? level.en : level.nl}
                  </span>
                  {i === selectedLevel && <Check size={16} color="#FF5C00" />}
                </button>
              ))}
            </div>
          )}

          {/* Skills */}
          <p className="text-[#8E9BB3] mb-2 mt-5" style={{ fontSize: 12, fontWeight: 600 }}>
            {lang === 'en' ? 'Skills worked on' : 'Gewerkte vaardigheden'}
          </p>
          <div className="space-y-2">
            {skills.map((s, i) => (
              <button
                key={i}
                onClick={() => toggleSkill(i)}
                className="w-full rounded-[12px] px-4 py-3 flex items-center gap-3 transition-all active:scale-[0.98]"
                style={{
                  background: s.checked ? 'rgba(3,101,196,0.1)' : '#1A1D27',
                  border: s.checked ? '1px solid rgba(3,101,196,0.3)' : '1px solid transparent',
                }}
              >
                <div
                  className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background: s.checked ? 'linear-gradient(135deg, #0365C4, #00C1FF)' : '#2D3748',
                    boxShadow: s.checked ? '0 2px 8px rgba(3,101,196,0.3)' : 'none',
                  }}
                >
                  {s.checked && <Check size={14} color="#fff" strokeWidth={3} />}
                </div>
                <span className={s.checked ? 'text-[#E2E8F0]' : 'text-[#8E9BB3]'} style={{ fontSize: 13, fontWeight: s.checked ? 600 : 400 }}>
                  {lang === 'en' ? s.name_en : s.name_nl}
                </span>
              </button>
            ))}
          </div>

          {/* Steps */}
          <p className="text-[#8E9BB3] mb-2 mt-5" style={{ fontSize: 12, fontWeight: 600 }}>
            {lang === 'en' ? 'Steps completed' : 'Stappen afgerond'}
          </p>
          <div className="space-y-2">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => toggleStep(i)}
                className="w-full rounded-[12px] px-4 py-3 flex items-center gap-3 transition-all active:scale-[0.98]"
                style={{
                  background: s.done ? 'rgba(39,174,96,0.1)' : '#1A1D27',
                  border: s.done ? '1px solid rgba(39,174,96,0.3)' : '1px solid transparent',
                }}
              >
                <div
                  className="w-[24px] h-[24px] rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background: s.done ? 'linear-gradient(135deg, #27AE60, #2ECC71)' : '#2D3748',
                    boxShadow: s.done ? '0 2px 8px rgba(39,174,96,0.3)' : 'none',
                  }}
                >
                  {s.done && <Check size={14} color="#fff" strokeWidth={3} />}
                </div>
                <span className={s.done ? 'text-[#E2E8F0]' : 'text-[#8E9BB3]'} style={{ fontSize: 13, fontWeight: s.done ? 600 : 400 }}>
                  {lang === 'en' ? s.name_en : s.name_nl}
                </span>
              </button>
            ))}
          </div>

          {/* Student mood */}
          <p className="text-[#8E9BB3] mb-2 mt-5" style={{ fontSize: 12, fontWeight: 600 }}>
            {lang === 'en' ? "Student's mood" : 'Stemming leerling'}
          </p>
          <div className="flex items-center gap-3 justify-center py-3 rounded-[14px]" style={{ background: '#1A1D27' }}>
            {[
              { emoji: '😊', label: lang === 'en' ? 'Great' : 'Geweldig' },
              { emoji: '🙂', label: lang === 'en' ? 'Good' : 'Goed' },
              { emoji: '😐', label: lang === 'en' ? 'Okay' : 'Oké' },
              { emoji: '😟', label: lang === 'en' ? 'Difficult' : 'Moeilijk' },
              { emoji: '😢', label: lang === 'en' ? 'Upset' : 'Verdrietig' },
            ].map((m, i) => (
              <button
                key={i}
                onClick={() => setMood(i)}
                className="flex flex-col items-center gap-1 transition-all"
                style={{
                  opacity: mood === null ? 0.7 : mood === i ? 1 : 0.3,
                  transform: mood === i ? 'scale(1.2)' : 'scale(1)',
                }}
              >
                <span style={{ fontSize: 28 }}>{m.emoji}</span>
                <span className="text-[#8E9BB3]" style={{ fontSize: 9 }}>{m.label}</span>
              </button>
            ))}
          </div>

          {/* Notes */}
          <p className="text-[#8E9BB3] mb-2 mt-5" style={{ fontSize: 12, fontWeight: 600 }}>
            {lang === 'en' ? 'Notes (optional)' : 'Notities (optioneel)'}
          </p>
          <div className="rounded-[14px] overflow-hidden" style={{ background: '#1A1D27', border: '1px solid rgba(255,255,255,0.06)' }}>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder={lang === 'en' ? 'Great session today, Sami improved a lot on...' : 'Geweldige sessie vandaag, Sami is echt verbeterd in...'}
              rows={3}
              className="w-full px-4 py-3 bg-transparent text-[#E2E8F0] placeholder-[#4A5568] outline-none resize-none"
              style={{ fontSize: 13 }}
            />
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            className="w-full h-[52px] rounded-[16px] mt-6 flex items-center justify-center gap-2 transition-all active:scale-[0.97]"
            style={{
              background: 'linear-gradient(135deg, #27AE60, #2ECC71)',
              boxShadow: '0 8px 24px rgba(39,174,96,0.3)',
            }}
          >
            <Send size={18} color="#fff" />
            <span className="text-white" style={{ fontSize: 15, fontWeight: 700 }}>
              {lang === 'en' ? 'Save & Notify Parent' : 'Opslaan & Ouder Melden'}
            </span>
          </button>
          <p className="text-[#4A5568] text-center mt-2 mb-4" style={{ fontSize: 11 }}>
            {lang === 'en' ? 'Parent will receive an automatic notification' : 'Ouder krijgt automatisch melding'}
          </p>
        </div>
      </div>
      <InstructorBottomNav />
    </MobileFrame>
  );
}

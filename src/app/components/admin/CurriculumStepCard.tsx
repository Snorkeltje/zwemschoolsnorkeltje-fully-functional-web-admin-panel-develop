import { useState } from 'react';
import { Info, X, ChevronDown, ChevronRight, Lock, BookOpen, Dumbbell, GraduationCap, Trophy } from 'lucide-react';
import type { CurriculumStep } from '../../../lib/data/admin-repository';

/// Walter 2026-04-30 — UI specifications:
///   • Each step renders ONLY its checklist by default (clean UI)
///   • An (i) icon next to the step title opens a modal with the full
///     pedagogical explanation (definition / why / progression criteria)
///   • Each checklist item shows 4 phase-circles, not a binary checkbox:
///       Phase 1 = Nog niet geoefend (not practiced)
///       Phase 2 = Wordt geoefend (currently practicing)
///       Phase 3 = Bijna onder de knie (almost mastered)
///       Phase 4 = Goed beheerst / automatisch (well mastered)
///   • Step 3+ has a prerequisite chain — locked until previous step done
const PHASES = [
  { value: 1, label: 'Nog niet geoefend', tone: '#A0AEC0' },
  { value: 2, label: 'Wordt geoefend',    tone: '#FF5C00' },
  { value: 3, label: 'Bijna onder de knie', tone: '#F5A623' },
  { value: 4, label: 'Goed beheerst',     tone: '#27AE60' },
] as const;

interface PhaseCirclesProps {
  /// Currently filled phase (1-4). 1 = first circle filled only.
  value: number;
  onChange?: (newValue: number) => void;
  size?: number;
  readOnly?: boolean;
}

/// 4 small circles that fill progressively as the child masters the skill.
export function PhaseCircles({ value, onChange, size = 16, readOnly = false }: PhaseCirclesProps) {
  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Voortgangsfase">
      {PHASES.map(p => {
        const filled = p.value <= value;
        return (
          <button
            key={p.value}
            type="button"
            disabled={readOnly}
            onClick={() => onChange?.(p.value === value ? Math.max(1, value - 1) : p.value)}
            className={`rounded-full transition-all ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
            style={{
              width: size, height: size,
              background: filled ? p.tone : 'transparent',
              border: `1.5px solid ${filled ? p.tone : '#D0D5DD'}`,
              boxShadow: filled ? `0 0 0 1px ${p.tone}30` : 'none',
            }}
            title={`${p.value}. ${p.label}`}
            aria-label={`Fase ${p.value}: ${p.label}`}
          />
        );
      })}
    </div>
  );
}

interface CurriculumStepCardProps {
  step: CurriculumStep;
  /// Map of skill_step_id → current phase (1-4), null if not set.
  phases?: Record<string, number>;
  /// Called when a phase circle is tapped (admin/instructor mode).
  onPhaseChange?: (stepItemId: string, newPhase: number) => void;
  /// Locked = prerequisite step not yet completed.
  locked?: boolean;
  /// Index/number for the step header chip (e.g. "1", "2").
  stepNumber: number;
  readOnly?: boolean;
}

export function CurriculumStepCard({
  step, phases = {}, onPhaseChange, locked = false, stepNumber, readOnly = false,
}: CurriculumStepCardProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Walter 2026-05-03 — diploma rows look distinct from step rows.
  const isDiploma = step.level.startsWith('Diploma ');
  const diplomaLetter = step.level.replace('Diploma ', '').trim();
  const accent = isDiploma ? '#FF7A00' : '#0365C4';
  const accentGradient = isDiploma
    ? 'linear-gradient(135deg, #F5A623 0%, #FF7A00 100%)'
    : 'linear-gradient(135deg, #0365C4 0%, #00C1FF 100%)';

  return (
    <>
      <div
        className="bg-white rounded-2xl border transition-all"
        style={{
          borderColor: locked ? '#E8ECF4' : accent,
          opacity: locked ? 0.55 : 1,
          boxShadow: locked ? 'none' : `0 4px 12px -4px ${accent}1A`,
        }}
      >
        {/* Header */}
        <div
          className="flex items-start gap-3 p-5 cursor-pointer"
          onClick={() => !locked && setCollapsed(c => !c)}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: locked ? '#F4F7FC' : accentGradient }}
          >
            {locked ? (
              <Lock size={18} className="text-[#A0AEC0]" />
            ) : isDiploma ? (
              <span className="text-white" style={{ fontSize: 18, fontWeight: 800 }}>
                {diplomaLetter}
              </span>
            ) : (
              <span className="text-white" style={{ fontSize: 16, fontWeight: 800 }}>
                {stepNumber}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>
                {step.name}
              </h3>
              {/* (i) icon — opens modal */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowInfo(true); }}
                disabled={locked}
                className="p-1 rounded-full hover:bg-[#0365C4]/10 text-[#0365C4] transition-all disabled:opacity-30"
                aria-label="Meer informatie over deze stap"
                title="Meer informatie">
                <Info size={16} />
              </button>
              {locked && (
                <span className="px-2 py-0.5 rounded-full bg-[#F4F7FC] text-[#A0AEC0]" style={{ fontSize: 10, fontWeight: 700 }}>
                  Vergrendeld
                </span>
              )}
            </div>
            {step.shortDescription && (
              <p className="text-[#6B7B94] mt-1" style={{ fontSize: 12, lineHeight: 1.5 }}>
                {step.shortDescription}
              </p>
            )}
            {step.childrenLanguage && (
              <p className="text-[#FF5C00] mt-1.5 italic" style={{ fontSize: 12, fontWeight: 600 }}>
                Kindertaal: "{step.childrenLanguage}"
              </p>
            )}
          </div>
          {!locked && (
            collapsed ? <ChevronRight size={20} className="text-[#A0AEC0]" /> : <ChevronDown size={20} className="text-[#A0AEC0]" />
          )}
        </div>

        {/* Diploma B — 3-fasen lesson plan timeline (Walter 2026-05-03) */}
        {!locked && !collapsed && isDiploma && diplomaLetter === 'B' && (
          <div className="px-5 pt-4 border-t border-[#F0F4FA]">
            <BDiplomaPhaseTimeline />
          </div>
        )}

        {/* Checklist groups */}
        {!locked && !collapsed && (
          <div className={`px-5 pb-5 ${isDiploma && diplomaLetter === 'B' ? '' : 'border-t border-[#F0F4FA]'}`}>
            {step.groups.map((g, gi) => (
              <div key={g.category} className={gi === 0 ? 'pt-4' : 'pt-5'}>
                <div className="mb-3">
                  <h4 className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 700 }}>
                    {g.label}
                  </h4>
                  {g.subtitle && (
                    <p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>{g.subtitle}</p>
                  )}
                </div>
                <div className="space-y-2.5">
                  {g.items.map(item => {
                    const phase = phases[item.id] ?? 1;
                    return (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-[#F8FAFC] hover:bg-[#F0F4FA] transition-all"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-[#1A1A2E]" style={{ fontSize: 13, lineHeight: 1.5 }}>
                            {item.description}
                          </p>
                          <p className="text-[#A0AEC0] mt-0.5" style={{ fontSize: 10 }}>
                            Fase {phase} — {PHASES[phase - 1]?.label ?? PHASES[0].label}
                          </p>
                        </div>
                        <PhaseCircles
                          value={phase}
                          onChange={(v) => onPhaseChange?.(item.id, v)}
                          readOnly={readOnly}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info modal */}
      {showInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(15,17,23,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowInfo(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-start justify-between p-5 border-b border-[#F0F4FA]">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: accentGradient }}
                >
                  <BookOpen size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[#A0AEC0]" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>
                    {step.level.toUpperCase()}
                  </p>
                  <h2 className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 800 }}>
                    {step.name.replace(/^Stap \d+:\s*/, '').replace(/^Diploma [A-Z]\s*[—–-]\s*/, '')}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"
                aria-label="Sluiten"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal body */}
            <div className="overflow-y-auto p-6 space-y-3">
              {step.extendedDescription
                .split('\n\n')
                .filter(Boolean)
                .map((para, i) => {
                  // Convert **bold** Markdown spans to inline strong elements.
                  const parts = para.split(/(\*\*[^*]+\*\*)/g);
                  return (
                    <p
                      key={i}
                      className="text-[#1A1A2E]"
                      style={{ fontSize: 14, lineHeight: 1.7 }}
                    >
                      {parts.map((p, j) =>
                        p.startsWith('**') && p.endsWith('**')
                          ? <strong key={j} className="text-[#0365C4]">{p.slice(2, -2)}</strong>
                          : <span key={j}>{p}</span>
                      )}
                    </p>
                  );
                })}
            </div>

            {/* Modal footer with phase legend */}
            <div className="border-t border-[#F0F4FA] p-4 bg-[#F8FAFC]">
              <p className="text-[#A0AEC0] mb-2" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>
                VOORTGANGSFASES
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PHASES.map(p => (
                  <div key={p.value} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ background: p.tone, border: `1.5px solid ${p.tone}` }}
                    />
                    <span className="text-[#1A1A2E]" style={{ fontSize: 11 }}>
                      {p.value}. {p.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/// Walter 2026-05-03 — Diploma B opleidings-traject in 3 fasen.
/// "This structure should be clearly reflected in the app, showing the
///  transition from strength → technique → full exam preparation."
const B_DIPLOMA_PHASES = [
  { key: 'kracht',   label: 'Fase 1 · Kracht',       lessons: 'Les 1 – 4',
    kleding: 'Met volledige kleding',
    focus:   'Uithoudingsvermogen + kracht. Nog niet op crawl of duiken.',
    color:   '#FF5C00', icon: Dumbbell },
  { key: 'techniek', label: 'Fase 2 · Techniek',     lessons: 'Vanaf Les 5',
    kleding: 'Zonder kleding',
    focus:   'Borstcrawl, rugcrawl, duiken.',
    color:   '#0365C4', icon: GraduationCap },
  { key: 'examen',   label: 'Eindfase · Examen',     lessons: 'Wanneer techniek beheerst',
    kleding: 'Kleding terug',
    focus:   'Volledig programma 2× succesvol → examen-rijp.',
    color:   '#27AE60', icon: Trophy },
] as const;

function BDiplomaPhaseTimeline() {
  return (
    <div className="rounded-xl p-4 mb-4" style={{ background: '#FFF7EE', border: '1px solid #FFE0BB' }}>
      <p className="text-[#FF5C00] mb-3 flex items-center gap-1.5"
         style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.6 }}>
        <Trophy size={12} /> OPLEIDINGS-TRAJECT B-DIPLOMA
      </p>

      {/* Connector + 3 circle icons */}
      <div className="flex items-center justify-between mb-3">
        {B_DIPLOMA_PHASES.map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={p.key} className="flex items-center flex-1">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mx-auto"
                style={{ background: p.color + '20', border: `2px solid ${p.color}` }}
              >
                <Icon size={18} color={p.color} />
              </div>
              {i < B_DIPLOMA_PHASES.length - 1 && (
                <div className="flex-1 h-[2px]" style={{ background: '#FFE0BB' }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Phase list */}
      <div className="space-y-2">
        {B_DIPLOMA_PHASES.map(p => (
          <div key={p.key} className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: p.color }} />
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 700 }}>
                  {p.label}
                </p>
                <p className="text-[#6B7B94]" style={{ fontSize: 11, fontWeight: 600 }}>
                  {p.lessons}
                </p>
              </div>
              <p className="text-[#6B7B94]" style={{ fontSize: 11, lineHeight: 1.4 }}>
                {p.kleding} · {p.focus}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

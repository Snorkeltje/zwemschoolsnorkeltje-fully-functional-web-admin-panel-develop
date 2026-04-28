import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';

const settings = [
  { key: 'all', label: 'Alle meldingen', desc: 'Hoofdschakelaar voor alle meldingen', bold: true },
  { key: 'lesson', label: 'Lesherinneringen', desc: '24 uur voor elke les' },
  { key: 'progress', label: 'Voortgangsupdates', desc: 'Wanneer instructeur voortgang bijwerkt' },
  { key: 'payment', label: 'Betalingsmeldingen', desc: 'Bevestigingen en terugbetalingen' },
  { key: 'punchcard', label: 'Knipkaartmeldingen', desc: 'Laag saldo en vervalwaarschuwingen' },
  { key: 'waitlist', label: 'Wachtlijstupdates', desc: 'Wanneer een plek beschikbaar wordt' },
  { key: 'messages', label: 'Berichten', desc: 'Nieuwe chatberichten' },
];

export function NotificationSettingsScreen() {
  const navigate = useNavigate();
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    all: true, lesson: true, progress: true, payment: false, punchcard: true, waitlist: true, messages: true,
  });

  const toggle = (key: string) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F8F9FA] pb-24">
        {/* Header */}
        <div className="bg-white px-5 pt-14 pb-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-[#1A1A2E]" style={{ fontSize: 22 }}>←</button>
          <p className="text-[#1A1A2E] flex-1 text-center" style={{ fontSize: 18, fontWeight: 700 }}>Meldingen</p>
          <div style={{ width: 22 }} />
        </div>

        <div className="px-5 pt-2 space-y-0">
          {settings.map((s, i) => (
            <div key={s.key}>
              <div className="bg-white rounded-[8px] px-4 py-3.5 flex items-center justify-between">
                <div>
                  <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: s.bold ? 700 : 400 }}>{s.label}</p>
                  <p className="text-[#8E8EA0]" style={{ fontSize: 12 }}>{s.desc}</p>
                </div>
                <button
                  onClick={() => toggle(s.key)}
                  className={`w-[48px] h-[26px] rounded-full relative flex-shrink-0 transition-colors ${toggles[s.key] ? 'bg-[#1A6FBF]' : 'bg-[#E5E7EB]'}`}
                >
                  <div
                    className={`absolute top-[3px] w-5 h-5 rounded-full bg-white transition-transform ${toggles[s.key] ? 'left-[25px]' : 'left-[3px]'}`}
                  />
                </button>
              </div>
              {i < settings.length - 1 && <div className="h-px bg-[#E5E7EB]" />}
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

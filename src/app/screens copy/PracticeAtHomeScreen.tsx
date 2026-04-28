import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { Header } from '../components/layout/Header';

const exercises = [
  {
    emoji: '🛁',
    emojiColor: '#0365C4',
    bg: '#F0F4FC',
    circleBg: '#E1EDF8',
    title: 'Ademhaling in bad',
    duration: '5 min',
    desc: 'Doe je gezicht in het water, adem uit met bellen, til dan je hoofd op. Herhaal 10x.',
  },
  {
    emoji: '🪑',
    emojiColor: '#FF5C00',
    bg: '#FEF0E7',
    circleBg: '#FFEBE0',
    title: 'Scharrelschop op stoel',
    duration: '3 min',
    desc: 'Zit op de rand, maak een flutter-schopbeweging 30 seconden aan elk been.',
  },
  {
    emoji: '🏠',
    emojiColor: '#18BB68',
    bg: '#E0F9EC',
    circleBg: '#E3F7ED',
    title: 'Arm zwaaioefening',
    duration: '3 min',
    desc: 'Oefen de windmolenarmbeweging 20x per kant bij de spiegel.',
  },
];

export function PracticeAtHomeScreen() {
  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-24">
        <Header title="Oefeningen voor Thuis" showBack />

        <div className="px-5 pt-2">
          {/* Level info */}
          <div className="bg-[#F0F4FC] rounded-[10px] px-4 py-3 relative overflow-hidden mb-5">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0365C4] rounded-l-[10px]" />
            <p className="text-[#0365C4] ml-1" style={{ fontSize: 12, fontWeight: 500 }}>
              📋  Op basis van Sami's niveau: Gevorderd Beginner
            </p>
          </div>

          <p className="text-[#131827] mb-4" style={{ fontSize: 15, fontWeight: 700 }}>Oefeningen deze week</p>

          <div className="space-y-4">
            {exercises.map((ex) => (
              <div key={ex.title} className="rounded-2xl p-4" style={{ backgroundColor: ex.bg }}>
                <div className="flex items-center gap-3">
                  <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: ex.circleBg }}>
                    <span style={{ fontSize: 28 }}>{ex.emoji}</span>
                  </div>
                  <div>
                    <p className="text-[#131827]" style={{ fontSize: 14, fontWeight: 700 }}>{ex.title}</p>
                    <p className="text-[#818EA6]" style={{ fontSize: 12 }}>⏱ {ex.duration}</p>
                  </div>
                </div>
                <p className="text-[#44516B] mt-3" style={{ fontSize: 12 }}>{ex.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-[#818EA6] mt-5" style={{ fontSize: 12 }}>✓ Toegewezen door Jan de Vries · 22 maart</p>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

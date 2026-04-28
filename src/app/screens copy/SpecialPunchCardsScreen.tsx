import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';

const cards = [
  { emoji: '📝', title: 'Knipkaart voor Inschrijfgeld', desc: 'Knipkaart voor Inschrijfgeld', price: '25 EUR', validity: '1 dagen', bgColor: '#196FBF' },
  { emoji: '📅', title: 'Knipkaart voor Wijzigen dag of tijd', desc: 'Knipkaart voor Wijzigen dag of tijd', price: '60 EUR', validity: '1 dagen', bgColor: '#0380D0' },
  { emoji: '🏊', title: 'Pakket van 10 lessen (Survival)', desc: 'Waardebon voor 10x 1-op-2 zwemles', price: '250 EUR', validity: '84 dagen', bgColor: '#0360A6', extra: '5x €125  |  3x €75' },
];

export function SpecialPunchCardsScreen() {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="min-h-full bg-white flex flex-col">
        {/* Snorkeltje Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[#E8ECF4]">
          <SnorkeltjeLogo size="small" />
        </div>

        <div className="bg-[#F8FAFC] px-4 py-2">
          <p className="text-[#4A6072]" style={{ fontSize: 11 }}>🏠 / Bestel Knipkaart</p>
        </div>

        <div className="px-4 pt-4">
          <p className="text-[#26323F]" style={{ fontSize: 20, fontWeight: 700 }}>Speciale Knipkaarten</p>
          <p className="text-[#4A6072] mt-1" style={{ fontSize: 12 }}>Eenmalige betalingen voor inschrijving en wijzigingen</p>

          <div className="space-y-3 mt-4">
            {cards.map((card, i) => (
              <div key={i} className="border border-[#DBE6F0] rounded-[8px] flex overflow-hidden">
                <div className="w-[130px] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: card.bgColor }}>
                  <span style={{ fontSize: 48 }}>{card.emoji}</span>
                </div>
                <div className="flex-1 px-4 py-3">
                  <p className="text-[#26323F]" style={{ fontSize: 13, fontWeight: 700 }}>{card.title}</p>
                  <p className="text-[#4A6072] mt-0.5" style={{ fontSize: 12 }}>{card.desc}</p>
                  <div className="bg-[#8A9BCC] rounded px-2 py-1 inline-flex gap-6 mt-2">
                    <span className="text-white" style={{ fontSize: 11, fontWeight: 700 }}>Prijs</span>
                    <span className="text-white" style={{ fontSize: 11, fontWeight: 700 }}>{card.price}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[#4A6072]" style={{ fontSize: 12 }}>Geldigheid</span>
                    <span className="text-[#26323F]" style={{ fontSize: 12 }}>{card.validity}</span>
                  </div>
                  {card.extra && (
                    <p className="text-[#3282AE] mt-1" style={{ fontSize: 12 }}>{card.extra}</p>
                  )}
                  <button onClick={() => navigate('/payment/stripe')} className="bg-[#5492B5] rounded-[6px] px-5 py-2.5 mt-2 float-right">
                    <span className="text-white" style={{ fontSize: 14, fontWeight: 700 }}>Bestellen!</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1" />
        <div className="mt-8 relative">
          <svg viewBox="0 0 430 50" className="w-full"><ellipse cx="215" cy="25" rx="265" ry="25" fill="#0380D0" /></svg>
          <div className="bg-[#0360A6] h-[60px] flex items-center justify-center">
            <p className="text-[#B2D9FF]" style={{ fontSize: 11 }}>snorkeltje.i</p>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}
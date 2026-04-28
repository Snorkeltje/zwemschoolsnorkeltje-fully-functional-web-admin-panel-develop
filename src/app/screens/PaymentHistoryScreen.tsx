import { useState } from 'react';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { Header } from '../components/layout/Header';

type FilterType = 'Alle' | 'Lessen' | 'Kaarten' | 'Terugbet.';

const transactions = [
  { emoji: '💳', title: 'Knipkaart gebruikt', sub: '1-op-1 · De Bilt · 28 apr', amount: '-1 credit', color: '#0365C4' },
  { emoji: '💰', title: 'Knipkaartaankoop', sub: '10× 1-op-1 · 24 mrt 2026', amount: '-€ 380,00', color: '#131827' },
  { emoji: '💚', title: 'Terugbetaling', sub: '1-op-1 → 1-op-2 omzetting', amount: '+€ 11,00', color: '#18BB67' },
  { emoji: '💳', title: 'Knipkaart gebruikt', sub: '1-op-2 · Bad H. · 25 mrt', amount: '-1 credit', color: '#0365C4' },
  { emoji: '💰', title: 'Stripe betaling', sub: 'Extra 1-op-1 · 22 mrt 2026', amount: '-€ 38,00', color: '#131827' },
  { emoji: '💚', title: 'Terugbetaling', sub: 'Tijdig geannuleerd · 20 mrt', amount: '+€ 38,00', color: '#18BB67' },
];

export function PaymentHistoryScreen() {
  const [filter, setFilter] = useState<FilterType>('Alle');

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-24">
        <Header title="Betalingen" showBack />

        <div className="px-5 pt-1">
          {/* Filter pills */}
          <div className="flex gap-2 mb-3">
            {(['Alle', 'Lessen', 'Kaarten', 'Terugbet.'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 h-[28px] rounded-[14px] ${filter === f ? 'bg-[#0365C4] text-white' : 'bg-white text-[#818EA6]'}`}
                style={{ fontSize: 11, fontWeight: filter === f ? 700 : 400 }}
              >
                {f}
              </button>
            ))}
          </div>

          <p className="text-[#818EA6] mb-3" style={{ fontSize: 12 }}>Maart – April 2026</p>

          {/* Transaction list */}
          <div className="space-y-2">
            {transactions.map((tx, i) => (
              <div key={i} className="bg-white rounded-[12px] px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F0F4FC] flex items-center justify-center flex-shrink-0">
                  <span style={{ fontSize: 22 }}>{tx.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#131827]" style={{ fontSize: 13, fontWeight: 700 }}>{tx.title}</p>
                  <p className="text-[#818EA6]" style={{ fontSize: 11 }}>{tx.sub}</p>
                </div>
                <span className="flex-shrink-0" style={{ fontSize: 13, fontWeight: 700, color: tx.color }}>{tx.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

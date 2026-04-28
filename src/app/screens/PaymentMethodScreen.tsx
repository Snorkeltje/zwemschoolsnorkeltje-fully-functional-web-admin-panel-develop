import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { ChevronLeft, CreditCard, Ticket, ChevronRight, Shield, Check } from 'lucide-react';

const punchCards = [
  { id: '22976', name: '10× 1-op-1 zwemles', remaining: 8, total: 10, validUntil: '24 mrt 2027', matchesType: true },
  { id: '22980', name: '5× 1-op-2 zwemles', remaining: 3, total: 5, validUntil: '15 jun 2027', matchesType: false },
];

export function PaymentMethodScreen() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'punch' | 'card'>('punch');
  const [selectedCard, setSelectedCard] = useState<string>('22976');

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] flex flex-col">
        {/* Header */}
        <div className="bg-white px-4 pt-4 pb-3 flex items-center gap-3" style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.06)' }}>
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#F4F7FC] flex items-center justify-center">
            <ChevronLeft size={20} className="text-[#1A1A2E]" />
          </button>
          <p className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>Betaalmethode</p>
        </div>

        <div className="flex-1 px-4 pt-5">
          {/* Price summary */}
          <div className="bg-gradient-to-br from-[#1A6FBF] to-[#0D4F8C] rounded-[16px] p-5 text-center">
            <p className="text-white/70" style={{ fontSize: 12 }}>Te betalen</p>
            <p className="text-white mt-1" style={{ fontSize: 36, fontWeight: 700 }}>€38,00</p>
            <p className="text-white/70 mt-1" style={{ fontSize: 12 }}>1-op-1 extra zwemles — De Bilt</p>
          </div>

          {/* Method tabs */}
          <div className="flex gap-2 mt-5">
            <button
              onClick={() => setMethod('punch')}
              className={`flex-1 h-[52px] rounded-[12px] flex items-center justify-center gap-2 transition-all ${
                method === 'punch' ? 'bg-[#1A6FBF] text-white' : 'bg-white border border-[#E5E7EB] text-[#4A4A6A]'
              }`}
              style={{ boxShadow: method === 'punch' ? '0px 2px 4px rgba(26,111,191,0.3)' : '0px 2px 8px rgba(0,0,0,0.04)' }}
            >
              <Ticket size={18} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>Knipkaart</span>
            </button>
            <button
              onClick={() => setMethod('card')}
              className={`flex-1 h-[52px] rounded-[12px] flex items-center justify-center gap-2 transition-all ${
                method === 'card' ? 'bg-[#1A6FBF] text-white' : 'bg-white border border-[#E5E7EB] text-[#4A4A6A]'
              }`}
              style={{ boxShadow: method === 'card' ? '0px 2px 4px rgba(26,111,191,0.3)' : '0px 2px 8px rgba(0,0,0,0.04)' }}
            >
              <CreditCard size={18} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>Betaalkaart</span>
            </button>
          </div>

          {/* Punch card selection */}
          {method === 'punch' && (
            <div className="mt-5">
              <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>Selecteer knipkaart</p>

              <div className="space-y-3 mt-3">
                {punchCards.map(card => {
                  const isSelected = selectedCard === card.id;
                  return (
                    <button
                      key={card.id}
                      onClick={() => setSelectedCard(card.id)}
                      className={`w-full rounded-[14px] p-4 text-left transition-all ${
                        isSelected ? 'bg-[#E8F4FD] border-2 border-[#1A6FBF]' : 'bg-white border border-[#E5E7EB]'
                      }`}
                      style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.06)' }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{card.name}</p>
                            {card.matchesType && (
                              <div className="bg-[#E8F8F0] rounded-full px-2 py-0.5">
                                <span className="text-[#27AE60]" style={{ fontSize: 9, fontWeight: 700 }}>MATCH</span>
                              </div>
                            )}
                          </div>
                          <p className="text-[#4A4A6A] mt-0.5" style={{ fontSize: 12 }}>Kaart #{card.id}</p>

                          {/* Credits bar */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1 h-[6px] bg-[#E5E7EB] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#1A6FBF] rounded-full transition-all"
                                style={{ width: `${(card.remaining / card.total) * 100}%` }}
                              />
                            </div>
                            <span className="text-[#1A6FBF]" style={{ fontSize: 12, fontWeight: 700 }}>{card.remaining}/{card.total}</span>
                          </div>

                          <p className="text-[#8E8EA0] mt-1" style={{ fontSize: 11 }}>Geldig tot {card.validUntil}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'bg-[#1A6FBF] border-[#1A6FBF]' : 'border-[#BDC3C7]'
                        }`}>
                          {isSelected && <Check size={14} className="text-white" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* After using credit info */}
              <div className="bg-[#E8F4FD] rounded-[12px] p-3 mt-4 flex items-start gap-2">
                <Ticket size={14} className="text-[#1A6FBF] mt-0.5 flex-shrink-0" />
                <p className="text-[#1A6FBF]" style={{ fontSize: 12 }}>
                  Na betaling: {punchCards.find(c => c.id === selectedCard)!.remaining - 1} credits resterend op kaart #{selectedCard}
                </p>
              </div>
            </div>
          )}

          {/* Card payment */}
          {method === 'card' && (
            <div className="mt-5">
              <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>Betaal met kaart</p>

              {/* Payment providers */}
              <div className="space-y-2.5 mt-3">
                {[
                  { name: 'iDEAL', desc: 'Direct betalen via je bank', icon: '🏦', popular: true },
                  { name: 'Creditcard', desc: 'Visa, Mastercard, Amex', icon: '💳', popular: false },
                  { name: 'Bancontact', desc: 'Belgische betaalmethode', icon: '🇧🇪', popular: false },
                ].map(p => (
                  <button
                    key={p.name}
                    onClick={() => navigate('/payment/stripe')}
                    className="w-full bg-white rounded-[14px] p-4 flex items-center gap-4 border border-[#E5E7EB] active:bg-[#F8F9FA] transition-all"
                    style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.04)' }}
                  >
                    <div className="w-12 h-12 rounded-[10px] bg-[#F4F7FC] flex items-center justify-center">
                      <span style={{ fontSize: 24 }}>{p.icon}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</p>
                        {p.popular && (
                          <div className="bg-[#FEF3DC] rounded-full px-2 py-0.5">
                            <span className="text-[#F39C12]" style={{ fontSize: 9, fontWeight: 700 }}>POPULAIR</span>
                          </div>
                        )}
                      </div>
                      <p className="text-[#8E8EA0]" style={{ fontSize: 12 }}>{p.desc}</p>
                    </div>
                    <ChevronRight size={18} className="text-[#BDC3C7]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Security badge */}
          <div className="flex items-center justify-center gap-2 mt-6 pb-4">
            <Shield size={14} className="text-[#27AE60]" />
            <p className="text-[#8E8EA0]" style={{ fontSize: 11 }}>Beveiligde betaling — SSL versleuteld</p>
          </div>

          {/* Confirm with punch card */}
          {method === 'punch' && (
            <button
              onClick={() => navigate('/booking-success')}
              className="w-full h-[52px] bg-[#1A6FBF] rounded-[12px] mb-6 flex items-center justify-center gap-2"
              style={{ boxShadow: '0px 2px 4px rgba(26,111,191,0.3)' }}
            >
              <Ticket size={18} className="text-white" />
              <span className="text-white" style={{ fontSize: 16, fontWeight: 600 }}>Betalen met knipkaart</span>
            </button>
          )}
        </div>
      </div>
    </MobileFrame>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';

export function StripePaymentScreen() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('4242  4242  4242  4242');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  return (
    <MobileFrame>
      <div className="min-h-full bg-white">
        {/* Header */}
        <div className="px-5 pt-14 pb-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-[#131826]" style={{ fontSize: 22 }}>←</button>
          <p className="text-[#131826] flex-1 text-center" style={{ fontSize: 18, fontWeight: 700 }}>Betaling</p>
          <div style={{ width: 22 }} />
        </div>

        <div className="px-5 pt-2">
          {/* Order summary */}
          <div className="bg-[#F0F4FC] rounded-[14px] px-4 py-4">
            <p className="text-[#131826]" style={{ fontSize: 14, fontWeight: 700 }}>1-op-1 Les — Ma 28 april</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-[#44516B]" style={{ fontSize: 13 }}>De Bilt Zwembad  ·  15:00–15:30</p>
              <p className="text-[#0365C4]" style={{ fontSize: 14, fontWeight: 700 }}>Totaal: € 38,00</p>
            </div>
          </div>

          {/* Card Details */}
          <p className="text-[#818EA6] mt-8 mb-2" style={{ fontSize: 13, fontWeight: 500 }}>Kaartnummer</p>
          <div className="border-2 border-[#0365C4] rounded-[12px] h-[58px] flex items-center px-4">
            <input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full bg-transparent text-[#131826] focus:outline-none"
              style={{ fontSize: 18, fontWeight: 500 }}
            />
          </div>

          <div className="flex gap-3 mt-3">
            <div className="flex-1">
              <div className="border border-[#DCE4F0] rounded-[10px] h-[50px] flex items-center px-4">
                <input
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/JJ"
                  className="w-full bg-transparent text-[#131826] placeholder-[#818EA6] focus:outline-none"
                  style={{ fontSize: 14 }}
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="border border-[#DCE4F0] rounded-[10px] h-[50px] flex items-center px-4">
                <input
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="CVV"
                  className="w-full bg-transparent text-[#131826] placeholder-[#818EA6] focus:outline-none"
                  style={{ fontSize: 14 }}
                />
              </div>
            </div>
          </div>

          <p className="text-[#818EA6] mt-4 mb-2" style={{ fontSize: 13, fontWeight: 500 }}>Naam op kaart</p>
          <div className="border border-[#DCE4F0] rounded-[10px] h-[50px] flex items-center px-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Naam op kaart"
              className="w-full bg-transparent text-[#131826] placeholder-[#818EA6] focus:outline-none"
              style={{ fontSize: 14 }}
            />
          </div>

          {/* Security notice */}
          <div className="bg-[#E0F9EC] rounded-[10px] px-4 py-2.5 mt-5">
            <p className="text-[#18BB67]" style={{ fontSize: 12, fontWeight: 500 }}>🔒  Beveiligd door Stripe — PCI-conform</p>
          </div>

          {/* Pay button */}
          <button className="w-full h-[52px] rounded-[14px] bg-[#0365C4] mt-4 flex items-center justify-center">
            <span className="text-white" style={{ fontSize: 15, fontWeight: 700 }}>Betaal € 38,00</span>
          </button>

          <p className="text-[#818EA6] text-center mt-3" style={{ fontSize: 12 }}>
            Annuleer t/m 24 uur voor de les voor terugbetaling.
          </p>

          {/* Pay with punch card */}
          <button
            onClick={() => navigate('/punch-cards')}
            className="w-full h-[52px] rounded-[14px] bg-white border border-[#DCE4F0] mt-3 flex items-center justify-center"
          >
            <span className="text-[#0365C4]" style={{ fontSize: 15, fontWeight: 700 }}>Betalen met knipkaart →</span>
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}

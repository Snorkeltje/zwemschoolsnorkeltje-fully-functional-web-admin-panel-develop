import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';

export function WaitlistInvitationScreen() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(85512); // 23:45:12 in seconds

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;
  const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

  return (
    <MobileFrame>
      <div className="min-h-full bg-white pb-24">
        {/* Blue header area */}
        <div className="bg-[#F0F4FC] pt-14 pb-8 flex flex-col items-center rounded-b-[40px]">
          <span style={{ fontSize: 60 }}>🎉</span>
          <p className="text-[#0365C4] mt-2" style={{ fontSize: 22, fontWeight: 700 }}>Er is een plek vrij!</p>
          <p className="text-[#44516B]" style={{ fontSize: 14 }}>Accepteer binnen 24 uur</p>
        </div>

        <div className="px-5 mt-5">
          {/* Details card */}
          <div className="border-2 border-[#0365C4] rounded-2xl px-4 py-4">
            <p className="text-[#131827]" style={{ fontSize: 14, fontWeight: 700 }}>📅  Woensdag 30 april 2026</p>
            <p className="text-[#44516B] mt-1" style={{ fontSize: 13 }}>⏰  16:00 – 16:30 (30 min)</p>
            <p className="text-[#44516B] mt-1" style={{ fontSize: 13 }}>📍  Bad Hulckesteijn</p>
            <p className="text-[#44516B] mt-1" style={{ fontSize: 13 }}>👨‍🏫  Maria Jansen</p>
            <div className="h-px bg-[#DCE4F0] my-3" />
            <p className="text-[#18BB67]" style={{ fontSize: 13, fontWeight: 500 }}>💳  1 knipkaartkrediet</p>
          </div>

          {/* Timer */}
          <div className="bg-[#FEF3DB] rounded-[14px] px-4 py-3 mt-4 flex flex-col items-center">
            <p className="text-[#FCAA00]" style={{ fontSize: 16, fontWeight: 700 }}>⏳  {timeStr}</p>
            <p className="text-[#818EA6] mt-1" style={{ fontSize: 11 }}>resterende tijd</p>
          </div>

          {/* Actions */}
          <button
            onClick={() => navigate('/booking-success')}
            className="w-full h-[48px] rounded-[14px] bg-[#18BB67] text-white mt-5"
            style={{ fontSize: 15, fontWeight: 700 }}
          >
            ✓  Plek Accepteren
          </button>

          <button
            className="w-full h-[48px] rounded-[14px] bg-[#FEE4E4] text-[#F03838] mt-3"
            style={{ fontSize: 15, fontWeight: 700 }}
          >
            Afwijzen
          </button>

          <p className="text-[#818EA6] text-center mt-4" style={{ fontSize: 12 }}>
            Bij afwijzen gaat de uitnodiging naar{'\n'}de volgende persoon op de wachtlijst.
          </p>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

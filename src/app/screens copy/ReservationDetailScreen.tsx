import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { Header } from '../components/layout/Header';

export function ReservationDetailScreen() {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-24">
        <Header title="Detail" showBack />

        <div className="px-5 pt-2">
          {/* Details card */}
          <div className="bg-white rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent" />
            <div className="flex items-start justify-between">
              <p className="text-[#131827]" style={{ fontSize: 16, fontWeight: 700 }}>1-op-1 Zwemles</p>
              <span className="bg-[#F0F4FC] text-[#0365C4] px-3 py-0.5 rounded-xl" style={{ fontSize: 11, fontWeight: 700 }}>Vast tijdstip</span>
            </div>

            <div className="mt-4 space-y-[10px]">
              {[
                { icon: '📅', label: 'Datum:', value: 'Maandag 28 april 2026' },
                { icon: '⏰', label: 'Tijd:', value: '15:00 – 15:30 (30 min)' },
                { icon: '📍', label: 'Locatie:', value: 'De Bilt Zwembad' },
                { icon: '👨‍🏫', label: 'Instructeur:', value: 'Jan de Vries' },
                { icon: '💳', label: 'Betaald via:', value: 'Knipkaart (7 resterend)' },
              ].map((item) => (
                <div key={item.label} className="flex items-center">
                  <span className="text-[#818EA6] w-[130px] flex-shrink-0" style={{ fontSize: 12 }}>{item.icon} {item.label}</span>
                  <span className="text-[#131827]" style={{ fontSize: 12, fontWeight: 500 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center mt-8 mb-2">
            <div className="bg-[#F0F4FC] rounded-[10px] w-[144px] h-[144px] flex items-center justify-center p-4">
              <div className="grid grid-cols-7 gap-[2px] w-full h-full">
                {Array.from({ length: 49 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-[2px]"
                    style={{
                      backgroundColor: [0,1,2,7,8,10,14,21,24,28,30,31,32,33,34,35,36,37,38,40,42,43,44,45,48].includes(i)
                        ? '#0365C4'
                        : 'transparent',
                    }}
                  />
                ))}
              </div>
            </div>
            <p className="text-[#818EA6] mt-2" style={{ fontSize: 12 }}>Scan bij de ingang</p>
          </div>

          {/* Cancellation policy */}
          <div className="bg-[#FEF3DB] rounded-xl px-4 py-3 mt-4">
            <p className="text-[#FCAA00]" style={{ fontSize: 13, fontWeight: 700 }}>⚠️  Annuleringsbeleid</p>
            <p className="text-[#44516B] mt-1" style={{ fontSize: 12 }}>Annuleer tot 24 uur voor de les voor terugbetaling.</p>
          </div>

          {/* Cancel button */}
          <button
            className="w-full h-[48px] rounded-xl bg-[#FEE4E4] text-[#F03838] mt-4"
            style={{ fontSize: 15, fontWeight: 700 }}
          >
            Reservering annuleren
          </button>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

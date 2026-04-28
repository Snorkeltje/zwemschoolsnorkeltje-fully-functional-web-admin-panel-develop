import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';

export function AutoConversionScreen() {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="min-h-full bg-white pb-24">
        {/* Green header */}
        <div className="bg-[#E0F9EC] pt-14 pb-8 flex flex-col items-center rounded-b-[40px]">
          <span style={{ fontSize: 60 }}>🔄</span>
          <p className="text-[#18BB67] mt-2" style={{ fontSize: 20, fontWeight: 700 }}>Les omgezet naar 1-op-2!</p>
          <p className="text-[#44516B]" style={{ fontSize: 13 }}>U ontvangt een gedeeltelijke terugbetaling</p>
        </div>

        <div className="px-5 mt-5">
          {/* Lesson card */}
          <div className="bg-white rounded-2xl border-l-4 border-[#18BB67] px-4 py-4">
            <p className="text-[#818EA6]" style={{ fontSize: 13 }}>Les vandaag werd gedeeld:</p>
            <p className="text-[#131827] mt-1" style={{ fontSize: 15, fontWeight: 700 }}>1-op-1 Extra Zwemles</p>
            <p className="text-[#44516B] mt-2" style={{ fontSize: 13 }}>📅  Woensdag 30 april 2026  ·  16:00</p>
            <p className="text-[#44516B] mt-1" style={{ fontSize: 13 }}>📍  Bad Hulckesteijn</p>
            <div className="h-px bg-[#DCE4F0] my-3" />
            <p className="text-[#18BB67]" style={{ fontSize: 13, fontWeight: 500 }}>2 deelnemers aanwezig → 1-op-2</p>
          </div>

          {/* Refund details */}
          <div className="bg-[#E0F9EC] rounded-[14px] px-4 py-4 mt-4">
            <p className="text-[#131827]" style={{ fontSize: 14, fontWeight: 700 }}>💰  Terugbetaling Details</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between">
                <span className="text-[#44516B]" style={{ fontSize: 13 }}>Oorspronkelijk betaald:</span>
                <span className="text-[#131827]" style={{ fontSize: 13 }}>€ 38,00 (1-op-1 tarief)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#44516B]" style={{ fontSize: 13 }}>Terugbetaald:</span>
                <span className="text-[#18BB67]" style={{ fontSize: 13, fontWeight: 700 }}>€ 11,00  (verschil 1-op-2)</span>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="bg-[#F0F4FC] rounded-[14px] px-4 py-4 mt-4">
            <p className="text-[#131827]" style={{ fontSize: 13, fontWeight: 700 }}>📊  Hoe dit werkt:</p>
            <p className="text-[#44516B] mt-2" style={{ fontSize: 12 }}>
              Beide deelnemers betaalden het 1-op-1 tarief.
              Omdat 2 leerlingen kwamen, wordt automatisch
              het verschil terugbetaald. Geen actie vereist.
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate('/payment-history')}
            className="w-full h-[48px] rounded-[14px] bg-[#0365C4] text-white mt-6"
            style={{ fontSize: 15, fontWeight: 700 }}
          >
            Bekijk mijn transacties
          </button>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

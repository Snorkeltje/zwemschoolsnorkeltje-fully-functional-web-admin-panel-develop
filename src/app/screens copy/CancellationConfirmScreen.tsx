import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { ChevronLeft, AlertTriangle, CreditCard, Ticket, Clock, MapPin, CheckCircle } from 'lucide-react';

export function CancellationConfirmScreen() {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <MobileFrame>
        <div className="min-h-full bg-[#F4F7FC] flex flex-col items-center justify-center px-6">
          <div className="w-24 h-24 rounded-full bg-[#E8F8F0] flex items-center justify-center mb-6">
            <CheckCircle size={48} className="text-[#27AE60]" />
          </div>
          <p className="text-[#1A1A2E] text-center" style={{ fontSize: 24, fontWeight: 700 }}>Les geannuleerd</p>
          <p className="text-[#4A4A6A] text-center mt-2" style={{ fontSize: 14 }}>
            Je reservering is succesvol geannuleerd. Het tegoed wordt automatisch teruggestort op je knipkaart.
          </p>

          <div className="w-full mt-6 bg-white rounded-[16px] p-4" style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.08)' }}>
            <div className="flex items-center gap-3 pb-3 border-b border-[#F0F0F0]">
              <div className="w-10 h-10 rounded-full bg-[#E8F8F0] flex items-center justify-center">
                <CreditCard size={18} className="text-[#27AE60]" />
              </div>
              <div>
                <p className="text-[#8E8EA0]" style={{ fontSize: 11 }}>Terugbetaling</p>
                <p className="text-[#27AE60]" style={{ fontSize: 18, fontWeight: 700 }}>1 credit teruggestort</p>
              </div>
            </div>
            <p className="text-[#4A4A6A] mt-2" style={{ fontSize: 12 }}>
              Knipkaart #22976 — Nieuw saldo: 9 credits
            </p>
          </div>

          <button
            onClick={() => navigate('/reservations')}
            className="w-full h-[52px] bg-[#1A6FBF] rounded-[12px] mt-6 flex items-center justify-center"
            style={{ boxShadow: '0px 2px 4px rgba(26,111,191,0.3)' }}
          >
            <span className="text-white" style={{ fontSize: 16, fontWeight: 600 }}>Naar mijn reserveringen</span>
          </button>
          <button onClick={() => navigate('/home')} className="mt-3">
            <span className="text-[#1A6FBF]" style={{ fontSize: 14, fontWeight: 600 }}>Ga naar home</span>
          </button>
        </div>
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] flex flex-col">
        {/* Header */}
        <div className="bg-white px-4 pt-4 pb-3 flex items-center gap-3" style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.06)' }}>
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#F4F7FC] flex items-center justify-center">
            <ChevronLeft size={20} className="text-[#1A1A2E]" />
          </button>
          <p className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>Annulering bevestigen</p>
        </div>

        <div className="flex-1 px-4 pt-6">
          {/* Warning */}
          <div className="bg-[#FDE8E8] rounded-[16px] p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E74C3C] flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[#E74C3C]" style={{ fontSize: 14, fontWeight: 700 }}>Let op!</p>
              <p className="text-[#9B3535] mt-1" style={{ fontSize: 13 }}>
                Je staat op het punt om deze zwemles te annuleren. Dit kan niet ongedaan worden gemaakt.
              </p>
            </div>
          </div>

          {/* Booking details */}
          <div className="bg-white rounded-[16px] p-4 mt-4" style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.08)' }}>
            <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>Lesgegevens</p>

            <div className="space-y-3 mt-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[8px] bg-[#E8F4FD] flex items-center justify-center">
                  <Ticket size={16} className="text-[#1A6FBF]" />
                </div>
                <div>
                  <p className="text-[#8E8EA0]" style={{ fontSize: 10 }}>Reservering</p>
                  <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>#232508 — 1-op-2 zwemles</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[8px] bg-[#E8F4FD] flex items-center justify-center">
                  <Clock size={16} className="text-[#1A6FBF]" />
                </div>
                <div>
                  <p className="text-[#8E8EA0]" style={{ fontSize: 10 }}>Datum & Tijd</p>
                  <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>Woensdag 22 april 2026, 16:00 – 16:30</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[8px] bg-[#E8F4FD] flex items-center justify-center">
                  <MapPin size={16} className="text-[#1A6FBF]" />
                </div>
                <div>
                  <p className="text-[#8E8EA0]" style={{ fontSize: 10 }}>Locatie</p>
                  <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>De Bilt</p>
                </div>
              </div>
            </div>
          </div>

          {/* Refund info */}
          <div className="bg-white rounded-[16px] p-4 mt-4" style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.08)' }}>
            <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>Terugbetaling</p>

            <div className="mt-3 bg-[#E8F8F0] rounded-[12px] p-3">
              <div className="flex items-center gap-2">
                <CreditCard size={16} className="text-[#27AE60]" />
                <p className="text-[#27AE60]" style={{ fontSize: 13, fontWeight: 600 }}>Knipkaart tegoed wordt teruggestort</p>
              </div>
              <p className="text-[#4A4A6A] mt-1.5" style={{ fontSize: 12 }}>
                1 credit wordt automatisch teruggestort op knipkaart #22976
              </p>
            </div>

            <p className="text-[#8E8EA0] mt-3" style={{ fontSize: 11 }}>
              💳 Betaald via Mollie? Stuur de annuleringsbevestiging naar info@zwemschoolsnorkeltje.nl voor terugbetaling.
            </p>
          </div>

          {/* Cancellation policy */}
          <div className="bg-[#FEF3DC] rounded-[12px] p-3 mt-4 flex items-start gap-2">
            <Clock size={14} className="text-[#F39C12] mt-0.5 flex-shrink-0" />
            <p className="text-[#9B7B2D]" style={{ fontSize: 11 }}>
              Standaard lessen: Gratis annuleren tot 24 uur voor de les.
              Vakantielessen: Gratis annuleren tot 4 dagen (96 uur) voor de les.
            </p>
          </div>

          {/* Checkbox */}
          <button onClick={() => setConfirmed(!confirmed)} className="flex items-center gap-3 mt-5">
            <div className={`w-6 h-6 rounded-[6px] border-2 flex items-center justify-center transition-all ${confirmed ? 'bg-[#E74C3C] border-[#E74C3C]' : 'border-[#BDC3C7]'}`}>
              {confirmed && <span className="text-white" style={{ fontSize: 12, fontWeight: 700 }}>✓</span>}
            </div>
            <p className="text-[#1A1A2E]" style={{ fontSize: 13 }}>Ik begrijp dat deze actie niet ongedaan kan worden gemaakt</p>
          </button>

          {/* Buttons */}
          <div className="flex gap-3 mt-6 pb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 h-[52px] border-2 border-[#E5E7EB] rounded-[12px] flex items-center justify-center"
            >
              <span className="text-[#4A4A6A]" style={{ fontSize: 14, fontWeight: 600 }}>Terug</span>
            </button>
            <button
              onClick={() => confirmed && setSuccess(true)}
              disabled={!confirmed}
              className={`flex-1 h-[52px] rounded-[12px] flex items-center justify-center transition-all ${
                confirmed ? 'bg-[#E74C3C]' : 'bg-[#BDC3C7]'
              }`}
            >
              <span className="text-white" style={{ fontSize: 14, fontWeight: 600 }}>Annuleer les</span>
            </button>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}

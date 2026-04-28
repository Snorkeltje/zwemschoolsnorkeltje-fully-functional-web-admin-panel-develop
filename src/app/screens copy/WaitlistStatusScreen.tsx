import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { ChevronLeft, Clock, MapPin, Users, Calendar, Trash2, Bell } from 'lucide-react';

export function WaitlistStatusScreen() {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] flex flex-col">
        {/* Header */}
        <div className="bg-white px-4 pt-4 pb-3 flex items-center gap-3" style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.06)' }}>
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#F4F7FC] flex items-center justify-center">
            <ChevronLeft size={20} className="text-[#1A1A2E]" />
          </button>
          <p className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>Wachtlijst status</p>
        </div>

        <div className="flex-1 px-4 pt-5">
          {/* Position card */}
          <div className="bg-gradient-to-br from-[#F5A623] to-[#E8941A] rounded-[20px] p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <p className="text-white/80 relative" style={{ fontSize: 12 }}>Je huidige positie</p>
            <p className="text-white relative mt-2" style={{ fontSize: 56, fontWeight: 700 }}>#3</p>
            <p className="text-white/80 relative mt-1" style={{ fontSize: 14 }}>van 8 wachtenden</p>
            <div className="w-full bg-white/30 h-[4px] rounded-full mt-4 relative">
              <div className="h-full bg-white rounded-full" style={{ width: '37.5%' }} />
            </div>
          </div>

          {/* Preference summary */}
          <div className="bg-white rounded-[16px] p-4 mt-4" style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.08)' }}>
            <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>Jouw voorkeuren</p>

            <div className="space-y-3 mt-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[8px] bg-[#E8F4FD] flex items-center justify-center">
                  <Users size={16} className="text-[#1A6FBF]" />
                </div>
                <div>
                  <p className="text-[#8E8EA0]" style={{ fontSize: 10 }}>Lestype</p>
                  <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>1-op-1 zwemles</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[8px] bg-[#E8F4FD] flex items-center justify-center">
                  <MapPin size={16} className="text-[#1A6FBF]" />
                </div>
                <div>
                  <p className="text-[#8E8EA0]" style={{ fontSize: 10 }}>Locatie</p>
                  <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>De Bilt, Bad Hulckesteijn</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[8px] bg-[#E8F4FD] flex items-center justify-center">
                  <Calendar size={16} className="text-[#1A6FBF]" />
                </div>
                <div>
                  <p className="text-[#8E8EA0]" style={{ fontSize: 10 }}>Voorkeursdagen</p>
                  <div className="flex gap-1.5 mt-1">
                    {['Ma', 'Wo', 'Vr'].map(d => (
                      <div key={d} className="bg-[#E8F4FD] rounded-full px-2.5 py-0.5">
                        <span className="text-[#1A6FBF]" style={{ fontSize: 11, fontWeight: 600 }}>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[8px] bg-[#E8F4FD] flex items-center justify-center">
                  <Clock size={16} className="text-[#1A6FBF]" />
                </div>
                <div>
                  <p className="text-[#8E8EA0]" style={{ fontSize: 10 }}>Voorkeurstijd</p>
                  <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>15:00 – 17:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-[#E8F4FD] rounded-[12px] p-4 mt-4 flex items-start gap-3">
            <Bell size={16} className="text-[#1A6FBF] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[#1A6FBF]" style={{ fontSize: 13, fontWeight: 600 }}>Hoe werkt het?</p>
              <p className="text-[#1A6FBF] mt-1" style={{ fontSize: 12 }}>
                Zodra er een plekje vrijkomt dat past bij jouw voorkeuren, ontvang je een uitnodiging. Je hebt dan 24 uur om te reageren.
              </p>
            </div>
          </div>

          {/* Registered since */}
          <div className="bg-white rounded-[12px] p-4 mt-4 flex items-center justify-between" style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.06)' }}>
            <div>
              <p className="text-[#8E8EA0]" style={{ fontSize: 11 }}>Aangemeld sinds</p>
              <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>10 maart 2026</p>
            </div>
            <div className="text-right">
              <p className="text-[#8E8EA0]" style={{ fontSize: 11 }}>Wachttijd</p>
              <p className="text-[#F5A623]" style={{ fontSize: 14, fontWeight: 700 }}>15 dagen</p>
            </div>
          </div>

          {/* Leave waitlist */}
          <button
            onClick={() => navigate('/home')}
            className="w-full h-[52px] border-2 border-[#E74C3C] rounded-[12px] mt-6 mb-6 flex items-center justify-center gap-2"
          >
            <Trash2 size={18} className="text-[#E74C3C]" />
            <span className="text-[#E74C3C]" style={{ fontSize: 14, fontWeight: 600 }}>Wachtlijst verlaten</span>
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}

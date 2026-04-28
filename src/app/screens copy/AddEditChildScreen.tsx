import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { ChevronLeft, Camera, User, Calendar, FileText, CheckCircle } from 'lucide-react';

export function AddEditChildScreen() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  const isValid = firstName.trim().length > 0 && lastName.trim().length > 0 && dob.length > 0;

  if (saved) {
    return (
      <MobileFrame>
        <div className="min-h-full bg-[#F4F7FC] flex flex-col items-center justify-center px-6">
          <div className="w-24 h-24 rounded-full bg-[#E8F8F0] flex items-center justify-center mb-6">
            <CheckCircle size={48} className="text-[#27AE60]" />
          </div>
          <p className="text-[#1A1A2E] text-center" style={{ fontSize: 24, fontWeight: 700 }}>Kind toegevoegd!</p>
          <p className="text-[#4A4A6A] text-center mt-2" style={{ fontSize: 14 }}>
            {firstName} {lastName} is succesvol toegevoegd aan je profiel.
          </p>
          <button
            onClick={() => navigate('/profile')}
            className="w-full h-[52px] bg-[#1A6FBF] rounded-[12px] mt-8 flex items-center justify-center"
            style={{ boxShadow: '0px 2px 4px rgba(26,111,191,0.3)' }}
          >
            <span className="text-white" style={{ fontSize: 16, fontWeight: 600 }}>Naar profiel</span>
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
          <p className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>Kind toevoegen</p>
        </div>

        <div className="flex-1 px-4 pt-6">
          {/* Avatar upload */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1A6FBF] to-[#0D4F8C] flex items-center justify-center">
                {firstName ? (
                  <span className="text-white" style={{ fontSize: 32, fontWeight: 700 }}>
                    {firstName.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User size={36} className="text-white/60" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#F5A623] flex items-center justify-center border-2 border-white">
                <Camera size={14} className="text-white" />
              </button>
            </div>
          </div>

          <p className="text-center text-[#8E8EA0] mt-2" style={{ fontSize: 12 }}>Tik om foto toe te voegen</p>

          {/* Form */}
          <div className="mt-6 space-y-4">
            {/* First name */}
            <div>
              <label className="flex items-center gap-1.5 text-[#4A4A6A]" style={{ fontSize: 12, fontWeight: 500 }}>
                <User size={14} /> Voornaam kind *
              </label>
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Voornaam"
                className="w-full h-[52px] border border-[#E5E7EB] rounded-[12px] px-4 mt-1.5 bg-white text-[#1A1A2E] placeholder:text-[#8E8EA0] outline-none focus:border-[#1A6FBF] transition-colors"
                style={{ fontSize: 14 }}
              />
            </div>

            {/* Last name */}
            <div>
              <label className="flex items-center gap-1.5 text-[#4A4A6A]" style={{ fontSize: 12, fontWeight: 500 }}>
                <User size={14} /> Achternaam kind *
              </label>
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Achternaam"
                className="w-full h-[52px] border border-[#E5E7EB] rounded-[12px] px-4 mt-1.5 bg-white text-[#1A1A2E] placeholder:text-[#8E8EA0] outline-none focus:border-[#1A6FBF] transition-colors"
                style={{ fontSize: 14 }}
              />
            </div>

            {/* Date of birth */}
            <div>
              <label className="flex items-center gap-1.5 text-[#4A4A6A]" style={{ fontSize: 12, fontWeight: 500 }}>
                <Calendar size={14} /> Geboortedatum *
              </label>
              <input
                type="date"
                value={dob}
                onChange={e => setDob(e.target.value)}
                className="w-full h-[52px] border border-[#E5E7EB] rounded-[12px] px-4 mt-1.5 bg-white text-[#1A1A2E] outline-none focus:border-[#1A6FBF] transition-colors"
                style={{ fontSize: 14 }}
              />
            </div>

            {/* Notes */}
            <div>
              <label className="flex items-center gap-1.5 text-[#4A4A6A]" style={{ fontSize: 12, fontWeight: 500 }}>
                <FileText size={14} /> Opmerkingen (optioneel)
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Bijv. allergieën, angst voor water, etc."
                rows={3}
                className="w-full border border-[#E5E7EB] rounded-[12px] px-4 py-3 mt-1.5 bg-white text-[#1A1A2E] placeholder:text-[#8E8EA0] outline-none focus:border-[#1A6FBF] transition-colors resize-none"
                style={{ fontSize: 14 }}
              />
            </div>
          </div>

          {/* Level info */}
          <div className="bg-[#E8F4FD] rounded-[12px] p-4 mt-5 flex items-start gap-3">
            <span style={{ fontSize: 20 }}>ℹ️</span>
            <div>
              <p className="text-[#1A6FBF]" style={{ fontSize: 13, fontWeight: 600 }}>Zwemniveau</p>
              <p className="text-[#1A6FBF] mt-1" style={{ fontSize: 12 }}>
                Het zwemniveau wordt automatisch ingesteld op "Beginner" en bijgewerkt door de instructeur na elke les.
              </p>
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={() => isValid && setSaved(true)}
            disabled={!isValid}
            className={`w-full h-[52px] rounded-[12px] mt-6 mb-6 flex items-center justify-center transition-all ${
              isValid ? 'bg-[#1A6FBF]' : 'bg-[#BDC3C7]'
            }`}
            style={{ boxShadow: isValid ? '0px 2px 4px rgba(26,111,191,0.3)' : 'none' }}
          >
            <span className="text-white" style={{ fontSize: 16, fontWeight: 600 }}>Kind opslaan</span>
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { ChevronLeft, Mail, CheckCircle, Lock } from 'lucide-react';

export function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <MobileFrame>
        <div className="h-full flex flex-col bg-white items-center justify-center px-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E8F8F0, #D4F5E0)' }}>
            <CheckCircle size={40} color="#27AE60" />
          </div>
          <p className="text-[#1A1A2E] text-center mt-6" style={{ fontSize: 24, fontWeight: 700 }}>E-mail verzonden!</p>
          <p className="text-[#6B7B94] text-center mt-2" style={{ fontSize: 14, lineHeight: '22px' }}>
            We hebben een herstellink gestuurd naar <strong className="text-[#1A1A2E]">{email}</strong>. Controleer je inbox.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full h-[56px] rounded-[16px] text-white mt-8"
            style={{ background: 'linear-gradient(135deg, #0365C4, #0D7FE8)', boxShadow: '0 8px 24px rgba(3,101,196,0.3)', fontSize: 16, fontWeight: 700 }}
          >
            Terug naar inloggen
          </button>
        </div>
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <div className="h-full flex flex-col bg-white">
        <div className="px-5 pt-[58px]">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-[12px] flex items-center justify-center bg-[#F4F7FC]">
            <ChevronLeft size={20} color="#1A1A2E" />
          </button>
        </div>

        <div className="flex-1 px-6 pt-8">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #E8F4FD, #D0E4F7)' }}>
            <Lock size={36} color="#0365C4" />
          </div>
          <p className="text-[#1A1A2E] text-center" style={{ fontSize: 24, fontWeight: 700 }}>Wachtwoord vergeten?</p>
          <p className="text-[#6B7B94] text-center mt-2" style={{ fontSize: 14 }}>
            Voer je e-mailadres in en we sturen je een herstellink.
          </p>

          <div className="mt-8">
            <label className="block text-[#4A5568] mb-1.5" style={{ fontSize: 13, fontWeight: 600 }}>E-mailadres</label>
            <div className="relative rounded-[14px] border-2 border-[#E8ECF4] focus-within:border-[#0365C4] focus-within:shadow-[0_0_0_4px_rgba(3,101,196,0.08)] transition-all">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Mail size={18} color="#A0AEC0" />
              </div>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="uw@email.nl"
                className="w-full h-[52px] pl-11 pr-4 bg-transparent text-[#1A1A2E] placeholder:text-[#A0AEC0] outline-none"
                style={{ fontSize: 14, borderRadius: 14 }}
              />
            </div>
          </div>

          <button
            onClick={() => email && setSent(true)}
            disabled={!email}
            className="w-full h-[56px] rounded-[16px] text-white mt-8 transition-all active:scale-[0.98]"
            style={{ 
              background: email ? 'linear-gradient(135deg, #0365C4, #0D7FE8)' : '#BDC3C7',
              boxShadow: email ? '0 8px 24px rgba(3,101,196,0.3)' : 'none',
              fontSize: 16, fontWeight: 700,
            }}
          >
            Herstelmail versturen
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}

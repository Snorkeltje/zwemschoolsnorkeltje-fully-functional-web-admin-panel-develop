import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { Lock, Eye, EyeOff, ChevronLeft, ShieldCheck } from 'lucide-react';

export function ResetPasswordScreen() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password) ? 4 : 3;
  const strengthLabels = ['', 'Zwak', 'Redelijk', 'Sterk', 'Zeer sterk'];
  const strengthColors = ['', '#E74C3C', '#F39C12', '#27AE60', '#1A6FBF'];

  const isValid = password.length >= 8 && password === confirmPassword;

  const handleReset = () => {
    if (isValid) setSuccess(true);
  };

  if (success) {
    return (
      <MobileFrame>
        <div className="min-h-full bg-[#F4F7FC] flex flex-col items-center justify-center px-6">
          <div className="w-20 h-20 rounded-full bg-[#E8F8F0] flex items-center justify-center mb-6">
            <ShieldCheck size={40} className="text-[#27AE60]" />
          </div>
          <p className="text-[#1A1A2E] text-center" style={{ fontSize: 24, fontWeight: 700 }}>Wachtwoord gewijzigd!</p>
          <p className="text-[#4A4A6A] text-center mt-2" style={{ fontSize: 14 }}>
            Je wachtwoord is succesvol bijgewerkt. Je kunt nu inloggen met je nieuwe wachtwoord.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full h-[52px] bg-[#1A6FBF] rounded-[12px] mt-8 flex items-center justify-center"
            style={{ boxShadow: '0px 2px 4px rgba(26,111,191,0.3)' }}
          >
            <span className="text-white" style={{ fontSize: 16, fontWeight: 600 }}>Ga naar inloggen</span>
          </button>
        </div>
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] flex flex-col">
        {/* Header */}
        <div className="px-4 pt-4 pb-2 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white flex items-center justify-center" style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.08)' }}>
            <ChevronLeft size={20} className="text-[#1A1A2E]" />
          </button>
        </div>

        <div className="flex-1 px-6 pt-8">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-[#E8F4FD] flex items-center justify-center mx-auto mb-6">
            <Lock size={36} className="text-[#1A6FBF]" />
          </div>

          <p className="text-[#1A1A2E] text-center" style={{ fontSize: 24, fontWeight: 700 }}>Nieuw wachtwoord</p>
          <p className="text-[#4A4A6A] text-center mt-2" style={{ fontSize: 14 }}>
            Kies een sterk wachtwoord met minimaal 8 tekens, een hoofdletter en een cijfer.
          </p>

          {/* New Password */}
          <div className="mt-8">
            <label className="text-[#4A4A6A]" style={{ fontSize: 12, fontWeight: 500 }}>Nieuw wachtwoord</label>
            <div className="mt-1.5 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Minimaal 8 tekens"
                className="w-full h-[52px] border border-[#E5E7EB] rounded-[12px] px-4 pr-12 bg-white text-[#1A1A2E] placeholder:text-[#8E8EA0] outline-none focus:border-[#1A6FBF] transition-colors"
                style={{ fontSize: 14 }}
              />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2">
                {showPassword ? <EyeOff size={18} className="text-[#8E8EA0]" /> : <Eye size={18} className="text-[#8E8EA0]" />}
              </button>
            </div>

            {/* Strength indicator */}
            {password.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex-1 h-[3px] rounded-full transition-colors" style={{ backgroundColor: i <= strength ? strengthColors[strength] : '#E5E7EB' }} />
                  ))}
                </div>
                <p className="mt-1" style={{ fontSize: 11, color: strengthColors[strength], fontWeight: 500 }}>{strengthLabels[strength]}</p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mt-5">
            <label className="text-[#4A4A6A]" style={{ fontSize: 12, fontWeight: 500 }}>Bevestig wachtwoord</label>
            <div className="mt-1.5 relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Herhaal wachtwoord"
                className={`w-full h-[52px] border rounded-[12px] px-4 pr-12 bg-white text-[#1A1A2E] placeholder:text-[#8E8EA0] outline-none transition-colors ${
                  confirmPassword.length > 0 && confirmPassword !== password ? 'border-[#E74C3C]' : 'border-[#E5E7EB] focus:border-[#1A6FBF]'
                }`}
                style={{ fontSize: 14 }}
              />
              <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2">
                {showConfirm ? <EyeOff size={18} className="text-[#8E8EA0]" /> : <Eye size={18} className="text-[#8E8EA0]" />}
              </button>
            </div>
            {confirmPassword.length > 0 && confirmPassword !== password && (
              <p className="text-[#E74C3C] mt-1" style={{ fontSize: 11 }}>Wachtwoorden komen niet overeen</p>
            )}
          </div>

          {/* Requirements */}
          <div className="mt-5 bg-white rounded-[12px] p-4" style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.04)' }}>
            <p className="text-[#4A4A6A] mb-2" style={{ fontSize: 12, fontWeight: 600 }}>Vereisten:</p>
            {[
              { label: 'Minimaal 8 tekens', met: password.length >= 8 },
              { label: 'Eén hoofdletter', met: /[A-Z]/.test(password) },
              { label: 'Eén cijfer', met: /[0-9]/.test(password) },
              { label: 'Eén speciaal teken', met: /[^A-Za-z0-9]/.test(password) },
            ].map(r => (
              <div key={r.label} className="flex items-center gap-2 mt-1.5">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${r.met ? 'bg-[#27AE60]' : 'bg-[#E5E7EB]'}`}>
                  {r.met && <span className="text-white" style={{ fontSize: 10 }}>✓</span>}
                </div>
                <span style={{ fontSize: 12, color: r.met ? '#27AE60' : '#8E8EA0' }}>{r.label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleReset}
            disabled={!isValid}
            className={`w-full h-[52px] rounded-[12px] mt-8 flex items-center justify-center transition-all ${
              isValid ? 'bg-[#1A6FBF]' : 'bg-[#BDC3C7]'
            }`}
            style={{ boxShadow: isValid ? '0px 2px 4px rgba(26,111,191,0.3)' : 'none' }}
          >
            <span className="text-white" style={{ fontSize: 16, fontWeight: 600 }}>Wachtwoord wijzigen</span>
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}

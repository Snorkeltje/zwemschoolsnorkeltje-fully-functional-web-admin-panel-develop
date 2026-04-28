import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';
import { User, Mail, Lock, Phone, Eye, EyeOff, ChevronLeft, Check } from 'lucide-react';

export function RegistrationScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '',
  });

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const InputField = ({ name, label, icon: Icon, type = 'text', placeholder }: any) => (
    <div className="mt-4">
      <label className="block text-[#4A5568] mb-1.5" style={{ fontSize: 13, fontWeight: 600 }}>{label}</label>
      <div
        className="relative rounded-[14px] transition-all"
        style={{
          border: `2px solid ${focused === name ? '#0365C4' : '#E8ECF4'}`,
          boxShadow: focused === name ? '0 0 0 4px rgba(3,101,196,0.08)' : 'none',
        }}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Icon size={18} color={focused === name ? '#0365C4' : '#A0AEC0'} />
        </div>
        {name === 'password' || name === 'confirmPassword' ? (
          <>
            <input
              type={showPass ? 'text' : 'password'}
              placeholder={placeholder}
              value={(form as any)[name]}
              onChange={e => update(name, e.target.value)}
              onFocus={() => setFocused(name)}
              onBlur={() => setFocused(null)}
              className="w-full h-[52px] pl-11 pr-12 bg-transparent text-[#1A1A2E] placeholder:text-[#A0AEC0] outline-none"
              style={{ fontSize: 14, borderRadius: 14 }}
            />
            <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2">
              {showPass ? <EyeOff size={18} color="#A0AEC0" /> : <Eye size={18} color="#A0AEC0" />}
            </button>
          </>
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={(form as any)[name]}
            onChange={e => update(name, e.target.value)}
            onFocus={() => setFocused(name)}
            onBlur={() => setFocused(null)}
            className="w-full h-[52px] pl-11 pr-4 bg-transparent text-[#1A1A2E] placeholder:text-[#A0AEC0] outline-none"
            style={{ fontSize: 14, borderRadius: 14 }}
          />
        )}
      </div>
    </div>
  );

  return (
    <MobileFrame>
      <div className="h-full flex flex-col bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[200px]" style={{ background: 'linear-gradient(180deg, #F0F6FF 0%, #FFFFFF 100%)' }} />

        {/* Header */}
        <div className="flex items-center px-5 pt-[58px] relative z-10">
          <button onClick={() => step > 1 ? setStep(step - 1) : navigate('/login')} className="w-[40px] h-[40px] rounded-[12px] bg-[#F4F7FC] flex items-center justify-center">
            <ChevronLeft size={20} color="#1A1A2E" />
          </button>
          <div className="flex-1 text-center">
            <p className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>Account aanmaken</p>
            <p className="text-[#8E9BB3]" style={{ fontSize: 12 }}>Stap {step} van 2</p>
          </div>
          <div className="w-[40px]" />
        </div>

        {/* Progress */}
        <div className="px-6 mt-4 relative z-10">
          <div className="flex gap-2">
            <div className="flex-1 h-[4px] rounded-full" style={{ background: 'linear-gradient(90deg, #0365C4, #00C1FF)' }} />
            <div className="flex-1 h-[4px] rounded-full" style={{ background: step >= 2 ? 'linear-gradient(90deg, #0365C4, #00C1FF)' : '#E8ECF4' }} />
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center pt-5 relative z-10">
          <SnorkeltjeLogo size="small" />
        </div>

        <div className="flex-1 px-6 relative z-10 overflow-auto">
          {step === 1 ? (
            <>
              <h2 className="text-[#1A1A2E] mt-4" style={{ fontSize: 22, fontWeight: 800 }}>Persoonlijke gegevens</h2>
              <p className="text-[#8E9BB3] mt-1" style={{ fontSize: 13 }}>Vul uw gegevens in om een account aan te maken.</p>
              <InputField name="firstName" label="Voornaam" icon={User} placeholder="Jan" />
              <InputField name="lastName" label="Achternaam" icon={User} placeholder="de Vries" />
              <InputField name="email" label="E-mailadres" icon={Mail} type="email" placeholder="jan@voorbeeld.nl" />
              <InputField name="phone" label="Telefoonnummer" icon={Phone} type="tel" placeholder="+31 6 12345678" />
            </>
          ) : (
            <>
              <h2 className="text-[#1A1A2E] mt-4" style={{ fontSize: 22, fontWeight: 800 }}>Wachtwoord instellen</h2>
              <p className="text-[#8E9BB3] mt-1" style={{ fontSize: 13 }}>Kies een veilig wachtwoord voor uw account.</p>
              <InputField name="password" label="Wachtwoord" icon={Lock} placeholder="Min. 8 tekens" />
              <InputField name="confirmPassword" label="Bevestig wachtwoord" icon={Lock} placeholder="Herhaal wachtwoord" />

              {/* Password rules */}
              <div className="mt-4 bg-[#F4F7FC] rounded-[14px] p-4">
                <p className="text-[#4A5568] mb-2" style={{ fontSize: 12, fontWeight: 600 }}>Wachtwoord vereisten:</p>
                {['Minimaal 8 tekens', 'Minstens 1 hoofdletter', 'Minstens 1 cijfer', 'Minstens 1 speciaal teken'].map(r => (
                  <div key={r} className="flex items-center gap-2 mt-1.5">
                    <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center" style={{ background: form.password.length >= 8 && r.includes('8') ? '#27AE60' : '#E8ECF4' }}>
                      <Check size={10} color={form.password.length >= 8 && r.includes('8') ? '#fff' : '#A0AEC0'} />
                    </div>
                    <span className="text-[#6B7B94]" style={{ fontSize: 12 }}>{r}</span>
                  </div>
                ))}
              </div>

              {/* Terms */}
              <button onClick={() => setAgreed(!agreed)} className="flex items-start gap-3 mt-5">
                <div
                  className="w-[22px] h-[22px] rounded-[6px] flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: agreed ? 'linear-gradient(135deg, #0365C4, #00C1FF)' : '#F4F7FC', border: agreed ? 'none' : '2px solid #D0D5DD' }}
                >
                  {agreed && <Check size={13} color="#fff" />}
                </div>
                <span className="text-left text-[#4A5568]" style={{ fontSize: 12 }}>
                  Ik ga akkoord met de{' '}
                  <span onClick={(e) => { e.stopPropagation(); navigate('/terms-conditions'); }} className="text-[#0365C4]" style={{ fontWeight: 600 }}>
                    Algemene Voorwaarden
                  </span>{' '}
                  en het{' '}
                  <span onClick={(e) => { e.stopPropagation(); navigate('/terms-conditions'); }} className="text-[#0365C4]" style={{ fontWeight: 600 }}>
                    Privacybeleid
                  </span>
                </span>
              </button>
            </>
          )}
        </div>

        {/* Button */}
        <div className="px-6 pb-8 pt-4 relative z-10">
          <button
            onClick={() => step === 1 ? setStep(2) : navigate('/home')}
            className="w-full h-[56px] rounded-[16px] text-white transition-all active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #0365C4 0%, #0D7FE8 100%)',
              fontSize: 16, fontWeight: 700,
              boxShadow: '0 8px 24px rgba(3,101,196,0.3)',
              opacity: step === 2 && !agreed ? 0.5 : 1,
            }}
          >
            {step === 1 ? 'Volgende' : 'Account aanmaken'}
          </button>
          {step === 1 && (
            <p className="text-center mt-4 text-[#8E9BB3]" style={{ fontSize: 13 }}>
              Heeft u al een account?{' '}
              <button onClick={() => navigate('/login')} className="text-[#0365C4]" style={{ fontWeight: 700 }}>Inloggen</button>
            </p>
          )}
        </div>
      </div>
    </MobileFrame>
  );
}

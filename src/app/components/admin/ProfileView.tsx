import { useState } from 'react';
import {
  Edit2, Shield, Bell, Globe, Clock, Key, Lock, Smartphone,
  Camera, X, Check, Users, Mail, AlertTriangle,
} from 'lucide-react';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl ${className}`} style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.04)', border: '1px solid #E8ECF4' }}>{children}</div>
);

const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
    <div><h1 className="text-[#1A1A2E]" style={{ fontSize: 22, fontWeight: 700 }}>{title}</h1>{subtitle && <p className="text-[#6B7B94] mt-0.5" style={{ fontSize: 13 }}>{subtitle}</p>}</div>
  </div>
);

interface ProfileViewProps {
  showToast: (msg: string) => void;
}

export function ProfileView({ showToast }: ProfileViewProps) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifSMS, setNotifSMS] = useState(false);

  const SettingRow = ({ label, value, action, actionLabel, actionColor, icon: Icon }: {
    label: string; value: React.ReactNode; action?: () => void; actionLabel?: string; actionColor?: string; icon?: any;
  }) => (
    <div className="flex items-center py-4 px-6 border-b border-[#F0F4FA] last:border-0">
      <span className="text-[#1A1A2E] w-[220px] flex-shrink-0" style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>
      <span className="text-[#6B7B94] mx-3">:</span>
      <div className="flex-1 text-[#1A1A2E]" style={{ fontSize: 14 }}>{value}</div>
      {action && (
        <button onClick={action} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E8ECF4] text-[#6B7B94] hover:bg-[#F4F7FC] transition-colors ml-3" style={{ fontSize: 12, fontWeight: 600 }}>
          {Icon && <Icon size={13} />}
          {actionLabel}
        </button>
      )}
    </div>
  );

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <div className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${checked ? 'bg-[#0365C4]' : 'bg-[#E8ECF4]'}`} onClick={onChange}>
      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </div>
  );

  return (
    <>
      <PageHeader title="Persoonlijke instellingen" subtitle="Beheer uw account en voorkeuren" />

      <div className="max-w-[800px] space-y-4">
        {/* Profile header */}
        <Card className="p-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF5C00] to-[#F5A623] flex items-center justify-center text-white" style={{ fontSize: 28, fontWeight: 700 }}>WG</div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#0365C4] text-white flex items-center justify-center shadow-md hover:bg-[#024ea0] transition-colors">
                <Camera size={14} />
              </button>
            </div>
            <div>
              <h2 className="text-[#1A1A2E]" style={{ fontSize: 20, fontWeight: 700 }}>Walter Van De Geest</h2>
              <p className="text-[#6B7B94]" style={{ fontSize: 13 }}>Super Admin — Zwemschool Snorkeltje</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-[#27AE60]" />
                <span className="text-[#27AE60]" style={{ fontSize: 12 }}>Online</span>
                <span className="text-[#A0AEC0]" style={{ fontSize: 12 }}>— Laatst actief: Nu</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Account instellingen */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-[#F0F4FA] bg-[#F8FAFC]">
            <h3 className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>Account</h3>
          </div>
          <SettingRow label="Gravatar afbeelding" value={
            <div className="w-10 h-10 rounded-full bg-[#F4F7FC] flex items-center justify-center"><Users size={18} className="text-[#A0AEC0]" /></div>
          } />
          <SettingRow label="Gebruikersnaam" value="Appbuilder" action={() => showToast('Profiel bewerken')} actionLabel="Bewerk profiel" actionColor="#0365C4" icon={Edit2} />
          <SettingRow label="E-mail" value="SwimSwim@gmail.com" />
          <SettingRow label="Wachtwoord" value={<span className="text-[#A0AEC0]">••••••••••</span>} action={() => setShowPasswordModal(true)} actionLabel="Wijzigen" icon={Key} />
          <SettingRow label="Twee-factor-authenticatie" value={
            twoFAEnabled
              ? <span className="flex items-center gap-1.5 text-[#27AE60]" style={{ fontSize: 13, fontWeight: 600 }}><Shield size={14} /> Ingeschakeld</span>
              : <span className="flex items-center gap-1.5 text-[#E74C3C]" style={{ fontSize: 13 }}><AlertTriangle size={14} /> Uitgeschakeld</span>
          } action={() => setShow2FAModal(true)} actionLabel="Instellen" icon={Shield} />
          <SettingRow label="Wachtwoord herstel" value={
            <span className="flex items-center gap-1.5 text-[#E74C3C]" style={{ fontSize: 13 }}><AlertTriangle size={14} /> Niet ingesteld</span>
          } action={() => showToast('Herstel methode ingesteld')} actionLabel="Instellen" icon={Lock} />
        </Card>

        {/* Voorkeuren */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-[#F0F4FA] bg-[#F8FAFC]">
            <h3 className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>Voorkeuren</h3>
          </div>
          <SettingRow label="Notificaties" value={
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#065F46]" style={{ fontSize: 11, fontWeight: 600 }}>E-mail: Aan</span>
              <span className="px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#065F46]" style={{ fontSize: 11, fontWeight: 600 }}>Push: Aan</span>
              <span className="px-2.5 py-1 rounded-full bg-[#F3F4F6] text-[#6B7280]" style={{ fontSize: 11, fontWeight: 600 }}>SMS: Uit</span>
            </div>
          } action={() => setShowNotifModal(true)} actionLabel="Instellen" icon={Bell} />
          <SettingRow label="Groepen" value="Employee" />
          <SettingRow label="Taal" value={
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 16 }}>{'\uD83C\uDDF3\uD83C\uDDF1'}</span>
              <span>Nederlands</span>
            </div>
          } action={() => showToast('Taal gewijzigd')} actionLabel="Wijzigen" icon={Globe} />
          <SettingRow label="Tijdzone" value="(GMT+01:00) Europe/Amsterdam" action={() => showToast('Tijdzone gewijzigd')} actionLabel="Wijzigen" icon={Clock} />
        </Card>

        {/* Sessies */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-[#F0F4FA] bg-[#F8FAFC]">
            <h3 className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>Actieve sessies</h3>
          </div>
          <div className="divide-y divide-[#F0F4FA]">
            {[
              { device: 'Chrome — macOS', ip: '206.135.162.71', lastActive: 'Nu actief', current: true },
              { device: 'Safari — iPhone 15', ip: '206.135.162.71', lastActive: '2 uur geleden', current: false },
              { device: 'Firefox — Windows 11', ip: '84.28.45.123', lastActive: '3 dagen geleden', current: false },
            ].map((d, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F4F7FC] flex items-center justify-center"><Smartphone size={18} color={d.current ? '#27AE60' : '#A0AEC0'} /></div>
                  <div>
                    <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>
                      {d.device} {d.current && <span className="text-[#27AE60] ml-1" style={{ fontSize: 11 }}>(huidig)</span>}
                    </p>
                    <p className="text-[#A0AEC0]" style={{ fontSize: 12 }}>IP: {d.ip} — {d.lastActive}</p>
                  </div>
                </div>
                {!d.current && (
                  <button onClick={() => showToast('Sessie beeindigd')} className="px-3 py-1.5 rounded-lg text-[#E74C3C] bg-[#FEF2F2] hover:bg-[#FEE2E2]" style={{ fontSize: 12, fontWeight: 600 }}>
                    Beeindig
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowPasswordModal(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[450px] mx-4" style={{ border: '1px solid #E8ECF4' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F4FA]">
              <h3 className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>Wachtwoord wijzigen</h3>
              <button onClick={() => setShowPasswordModal(false)} className="text-[#A0AEC0] hover:text-[#1A1A2E]"><X size={20} /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div><label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Huidig wachtwoord</label><input type="password" className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }} /></div>
              <div><label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Nieuw wachtwoord</label><input type="password" className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }} /></div>
              <div><label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Bevestig nieuw wachtwoord</label><input type="password" className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }} /></div>
            </div>
            <div className="px-6 py-4 border-t border-[#F0F4FA] flex justify-end gap-2">
              <button onClick={() => setShowPasswordModal(false)} className="px-4 py-2.5 rounded-lg text-[#6B7B94] border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>Annuleer</button>
              <button onClick={() => { setShowPasswordModal(false); showToast('Wachtwoord gewijzigd!'); }} className="px-5 py-2.5 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 700 }}>Wijzigen</button>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShow2FAModal(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[450px] mx-4" style={{ border: '1px solid #E8ECF4' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F4FA]">
              <h3 className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>Twee-factor-authenticatie</h3>
              <button onClick={() => setShow2FAModal(false)} className="text-[#A0AEC0] hover:text-[#1A1A2E]"><X size={20} /></button>
            </div>
            <div className="px-6 py-5">
              <p className="text-[#6B7B94] mb-4" style={{ fontSize: 13 }}>Beveilig uw account met twee-factor-authenticatie. Bij elke inlog wordt een extra verificatiecode gevraagd.</p>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 rounded-xl border border-[#E8ECF4] cursor-pointer hover:bg-[#F8FAFC]">
                  <div className="flex items-center gap-3">
                    <Smartphone size={20} className="text-[#0365C4]" />
                    <div><p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Authenticator app</p><p className="text-[#A0AEC0]" style={{ fontSize: 12 }}>Google Authenticator of Authy</p></div>
                  </div>
                  <input type="radio" name="2fa" className="w-4 h-4 accent-[#0365C4]" defaultChecked />
                </label>
                <label className="flex items-center justify-between p-4 rounded-xl border border-[#E8ECF4] cursor-pointer hover:bg-[#F8FAFC]">
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-[#0365C4]" />
                    <div><p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>E-mail verificatie</p><p className="text-[#A0AEC0]" style={{ fontSize: 12 }}>Code via e-mail</p></div>
                  </div>
                  <input type="radio" name="2fa" className="w-4 h-4 accent-[#0365C4]" />
                </label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#F0F4FA] flex justify-end gap-2">
              <button onClick={() => setShow2FAModal(false)} className="px-4 py-2.5 rounded-lg text-[#6B7B94] border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>Annuleer</button>
              <button onClick={() => { setShow2FAModal(false); setTwoFAEnabled(true); showToast('2FA ingeschakeld!'); }} className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-white" style={{ background: '#27AE60', fontSize: 13, fontWeight: 700 }}><Shield size={14} /> Instellen</button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotifModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowNotifModal(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[450px] mx-4" style={{ border: '1px solid #E8ECF4' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F4FA]">
              <h3 className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>Notificatie-instellingen</h3>
              <button onClick={() => setShowNotifModal(false)} className="text-[#A0AEC0] hover:text-[#1A1A2E]"><X size={20} /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              {[
                { label: 'E-mail notificaties', desc: 'Ontvang meldingen per e-mail', checked: notifEmail, toggle: () => setNotifEmail(!notifEmail) },
                { label: 'Push notificaties', desc: 'Ontvang meldingen in de browser', checked: notifPush, toggle: () => setNotifPush(!notifPush) },
                { label: 'SMS notificaties', desc: 'Ontvang meldingen per SMS', checked: notifSMS, toggle: () => setNotifSMS(!notifSMS) },
              ].map(n => (
                <div key={n.label} className="flex items-center justify-between">
                  <div><p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>{n.label}</p><p className="text-[#A0AEC0]" style={{ fontSize: 12 }}>{n.desc}</p></div>
                  <Toggle checked={n.checked} onChange={n.toggle} />
                </div>
              ))}
              <div className="border-t border-[#F0F4FA] pt-4">
                <p className="text-[#1A1A2E] mb-2" style={{ fontSize: 13, fontWeight: 600 }}>Meldingen ontvangen voor:</p>
                {['Nieuwe reserveringen', 'Annuleringen', 'Betalingen', 'Registratie verzoeken', 'Knipkaart bijna op'].map(item => (
                  <label key={item} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#0365C4]" />
                    <span className="text-[#6B7B94]" style={{ fontSize: 13 }}>{item}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#F0F4FA] flex justify-end gap-2">
              <button onClick={() => setShowNotifModal(false)} className="px-4 py-2.5 rounded-lg text-[#6B7B94] border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>Annuleer</button>
              <button onClick={() => { setShowNotifModal(false); showToast('Notificatie-instellingen opgeslagen!'); }} className="px-5 py-2.5 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 700 }}>Opslaan</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

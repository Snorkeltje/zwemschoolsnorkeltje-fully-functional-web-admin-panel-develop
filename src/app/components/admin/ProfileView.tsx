import { useEffect, useState } from 'react';
import { Camera, Check, Edit2, Mail, Phone, MapPin, Shield, Bell, Globe, Clock, Key } from 'lucide-react';
import { useAuth } from '../../../lib/auth-context';
import { supabase } from '../../../lib/supabase';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl ${className}`} style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.04)', border: '1px solid #E8ECF4' }}>{children}</div>
);

const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
    <div>
      <h1 className="text-[#1A1A2E]" style={{ fontSize: 22, fontWeight: 700 }}>{title}</h1>
      {subtitle && <p className="text-[#6B7B94] mt-0.5" style={{ fontSize: 13 }}>{subtitle}</p>}
    </div>
  </div>
);

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <div className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${checked ? 'bg-[#0365C4]' : 'bg-[#E8ECF4]'}`} onClick={onChange}>
    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
  </div>
);

interface ProfileViewProps {
  showToast: (msg: string) => void;
}

export function ProfileView({ showToast }: ProfileViewProps) {
  const { profile, user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [edits, setEdits] = useState({
    first_name: '', last_name: '', phone: '', city: '',
  });
  const [saving, setSaving] = useState(false);

  // Notification preferences (stored in localStorage for now — admin's own UI)
  const [notifEmail, setNotifEmail] = useState(() => localStorage.getItem('admin_notif_email') !== 'false');
  const [notifPush, setNotifPush] = useState(() => localStorage.getItem('admin_notif_push') !== 'false');
  const [notifSMS, setNotifSMS] = useState(() => localStorage.getItem('admin_notif_sms') === 'true');

  useEffect(() => {
    if (profile) {
      setEdits({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone: profile.phone || '',
        city: profile.city || '',
      });
    }
  }, [profile]);

  const initials = profile
    ? `${profile.first_name?.[0] ?? ''}${profile.last_name?.[0] ?? ''}`.toUpperCase() || profile.email[0].toUpperCase()
    : '?';

  const fullName = profile
    ? `${profile.first_name ?? ''} ${profile.last_name ?? ''}`.trim() || profile.email
    : '—';

  const saveProfile = async () => {
    if (!profile) return;
    setSaving(true);
    const { error } = await supabase.from('profiles').update({
      first_name: edits.first_name.trim(),
      last_name: edits.last_name.trim(),
      phone: edits.phone.trim() || null,
      city: edits.city.trim() || null,
    }).eq('id', profile.id);
    setSaving(false);
    if (error) {
      showToast(`❌ Niet opgeslagen: ${error.message}`);
      return;
    }
    showToast('✓ Profiel opgeslagen');
    setEditMode(false);
    // Trigger profile reload by reloading the page (auth-context will re-fetch)
    window.location.reload();
  };

  const changePassword = async () => {
    const newPassword = window.prompt('Voer een nieuw wachtwoord in (minimaal 8 tekens):');
    if (!newPassword) return;
    if (newPassword.length < 8) { showToast('❌ Wachtwoord moet minimaal 8 tekens zijn'); return; }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) { showToast(`❌ ${error.message}`); return; }
    showToast('✓ Wachtwoord gewijzigd');
  };

  const toggleNotif = (key: 'email' | 'push' | 'sms', val: boolean) => {
    if (key === 'email') setNotifEmail(val);
    if (key === 'push') setNotifPush(val);
    if (key === 'sms') setNotifSMS(val);
    localStorage.setItem(`admin_notif_${key}`, String(val));
    showToast(`Notificatie-voorkeur bijgewerkt`);
  };

  if (!profile) {
    return (
      <>
        <PageHeader title="Persoonlijke instellingen" subtitle="Beheer uw account en voorkeuren" />
        <Card className="p-8 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>
          Profiel laden…
        </Card>
      </>
    );
  }

  const Row = ({ label, value, icon: Icon }: { label: string; value: React.ReactNode; icon?: typeof Mail }) => (
    <div className="flex items-center py-3 px-5 border-b border-[#F0F4FA] last:border-0">
      <div className="flex items-center gap-2 w-[180px] flex-shrink-0">
        {Icon && <Icon size={14} className="text-[#A0AEC0]" />}
        <span className="text-[#6B7B94]" style={{ fontSize: 12, fontWeight: 600 }}>{label}</span>
      </div>
      <div className="flex-1 text-[#1A1A2E]" style={{ fontSize: 13 }}>{value}</div>
    </div>
  );

  return (
    <>
      <PageHeader title="Persoonlijke instellingen" subtitle="Beheer uw account en voorkeuren" />

      <div className="max-w-[800px] space-y-4">
        {/* Profile header */}
        <Card className="p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF5C00] to-[#F5A623] flex items-center justify-center text-white" style={{ fontSize: 28, fontWeight: 700 }}>{initials}</div>
                <button onClick={() => showToast('Avatar upload komt in volgende sprint')} className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#0365C4] text-white flex items-center justify-center shadow-md hover:bg-[#024ea0] transition-colors">
                  <Camera size={14} />
                </button>
              </div>
              <div>
                <h2 className="text-[#1A1A2E]" style={{ fontSize: 20, fontWeight: 700 }}>{fullName}</h2>
                <p className="text-[#6B7B94]" style={{ fontSize: 13 }}>
                  {profile.role === 'admin' ? 'Admin' : profile.role === 'instructor' ? 'Instructeur' : 'Ouder'} — Zwemschool Snorkeltje
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-[#27AE60]" />
                  <span className="text-[#27AE60]" style={{ fontSize: 12 }}>Online</span>
                </div>
              </div>
            </div>
            {!editMode ? (
              <button onClick={() => setEditMode(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#0365C4] bg-white border border-[#0365C4]/20 hover:bg-[#0365C4]/5" style={{ fontSize: 13, fontWeight: 600 }}>
                <Edit2 size={14} /> Bewerken
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => { setEditMode(false); setEdits({ first_name: profile.first_name || '', last_name: profile.last_name || '', phone: profile.phone || '', city: profile.city || '' }); }} className="px-4 py-2 rounded-lg text-[#6B7B94] border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>Annuleren</button>
                <button onClick={saveProfile} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white disabled:opacity-50" style={{ background: '#27AE60', fontSize: 13, fontWeight: 700 }}>
                  <Check size={14} /> {saving ? 'Bezig…' : 'Opslaan'}
                </button>
              </div>
            )}
          </div>
        </Card>

        {/* Account info */}
        <Card className="overflow-hidden">
          <div className="px-5 py-3 border-b border-[#F0F4FA] bg-[#F8FAFC]">
            <h3 className="text-[#1A1A2E] flex items-center gap-2" style={{ fontSize: 13, fontWeight: 700 }}>
              <Mail size={14} color="#0365C4" /> Account-gegevens
            </h3>
          </div>
          {!editMode ? (
            <>
              <Row label="Voornaam" icon={undefined} value={profile.first_name || '—'} />
              <Row label="Achternaam" icon={undefined} value={profile.last_name || '—'} />
              <Row label="E-mail" icon={Mail} value={<span>{profile.email} <span className="ml-2 text-[#A0AEC0]" style={{ fontSize: 11 }}>(verificatie via Supabase Auth)</span></span>} />
              <Row label="Telefoon" icon={Phone} value={profile.phone || <span className="text-[#A0AEC0]">—</span>} />
              <Row label="Stad" icon={MapPin} value={profile.city || <span className="text-[#A0AEC0]">—</span>} />
              <Row label="Rol" icon={Shield} value={<span className="inline-block px-2 py-0.5 rounded-full" style={{ fontSize: 11, fontWeight: 700, background: '#EFF6FF', color: '#1E40AF' }}>{profile.role}</span>} />
              <Row label="User ID" icon={undefined} value={<code className="text-[#6B7B94]" style={{ fontSize: 11 }}>{user?.id.slice(0, 8) ?? '—'}…</code>} />
            </>
          ) : (
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#6B7B94] mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Voornaam</label>
                <input value={edits.first_name} onChange={e => setEdits({ ...edits, first_name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4]" style={{ fontSize: 13 }} />
              </div>
              <div>
                <label className="block text-[#6B7B94] mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Achternaam</label>
                <input value={edits.last_name} onChange={e => setEdits({ ...edits, last_name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4]" style={{ fontSize: 13 }} />
              </div>
              <div>
                <label className="block text-[#6B7B94] mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Telefoon</label>
                <input value={edits.phone} onChange={e => setEdits({ ...edits, phone: e.target.value })} placeholder="+31 6 ..." className="w-full px-3 py-2 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4]" style={{ fontSize: 13 }} />
              </div>
              <div>
                <label className="block text-[#6B7B94] mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Stad</label>
                <input value={edits.city} onChange={e => setEdits({ ...edits, city: e.target.value })} placeholder="Bijv. Arnhem" className="w-full px-3 py-2 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4]" style={{ fontSize: 13 }} />
              </div>
            </div>
          )}
        </Card>

        {/* Security */}
        <Card className="overflow-hidden">
          <div className="px-5 py-3 border-b border-[#F0F4FA] bg-[#F8FAFC]">
            <h3 className="text-[#1A1A2E] flex items-center gap-2" style={{ fontSize: 13, fontWeight: 700 }}>
              <Shield size={14} color="#E74C3C" /> Veiligheid
            </h3>
          </div>
          <div className="p-5 space-y-3">
            <button onClick={changePassword} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#F4F7FC]" style={{ border: '1px solid #E8ECF4' }}>
              <div className="flex items-center gap-2">
                <Key size={14} className="text-[#6B7B94]" />
                <div className="text-left">
                  <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>Wachtwoord wijzigen</p>
                  <p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Direct via Supabase Auth</p>
                </div>
              </div>
              <Edit2 size={14} className="text-[#A0AEC0]" />
            </button>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="overflow-hidden">
          <div className="px-5 py-3 border-b border-[#F0F4FA] bg-[#F8FAFC]">
            <h3 className="text-[#1A1A2E] flex items-center gap-2" style={{ fontSize: 13, fontWeight: 700 }}>
              <Bell size={14} color="#FF5C00" /> Notificaties
            </h3>
          </div>
          <div className="p-5 space-y-3">
            {[
              { key: 'email' as const, label: 'E-mail notificaties', val: notifEmail, icon: Mail },
              { key: 'push' as const, label: 'Push notificaties (browser)', val: notifPush, icon: Bell },
              { key: 'sms' as const, label: 'SMS notificaties', val: notifSMS, icon: Phone },
            ].map(opt => {
              const Ic = opt.icon;
              return (
                <div key={opt.key} className="flex items-center justify-between p-3 rounded-lg" style={{ border: '1px solid #F0F4FA' }}>
                  <div className="flex items-center gap-2">
                    <Ic size={14} className="text-[#6B7B94]" />
                    <span className="text-[#1A1A2E]" style={{ fontSize: 13 }}>{opt.label}</span>
                  </div>
                  <Toggle checked={opt.val} onChange={() => toggleNotif(opt.key, !opt.val)} />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Locale */}
        <Card className="overflow-hidden">
          <div className="px-5 py-3 border-b border-[#F0F4FA] bg-[#F8FAFC]">
            <h3 className="text-[#1A1A2E] flex items-center gap-2" style={{ fontSize: 13, fontWeight: 700 }}>
              <Globe size={14} color="#0365C4" /> Taal & tijdzone
            </h3>
          </div>
          <Row label="Taal" icon={Globe} value={<span>Nederlands (NL)</span>} />
          <Row label="Tijdzone" icon={Clock} value={<span>Europe/Amsterdam (CET)</span>} />
          <Row label="Datumformaat" icon={undefined} value={<span>DD-MM-JJJJ</span>} />
        </Card>
      </div>
    </>
  );
}

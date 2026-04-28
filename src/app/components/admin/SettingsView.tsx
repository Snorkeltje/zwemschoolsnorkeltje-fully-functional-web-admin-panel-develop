import { useState } from 'react';
import {
  Plus, Edit2, Trash2, Mail, CreditCard, Waves, Zap,
} from 'lucide-react';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl ${className}`} style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.04)', border: '1px solid #E8ECF4' }}>{children}</div>
);

const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
    <div><h1 className="text-[#1A1A2E]" style={{ fontSize: 22, fontWeight: 700 }}>{title}</h1>{subtitle && <p className="text-[#6B7B94] mt-0.5" style={{ fontSize: 13 }}>{subtitle}</p>}</div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, { bg: string; text: string }> = {
    'Actief': { bg: '#ECFDF5', text: '#065F46' }, 'Concept': { bg: '#F3F4F6', text: '#6B7280' },
  };
  const c = colors[status] || { bg: '#F3F4F6', text: '#6B7280' };
  return <span className="px-2.5 py-1 rounded-full" style={{ background: c.bg, color: c.text, fontSize: 11, fontWeight: 600 }}>{status}</span>;
};

interface SettingsViewProps {
  showToast: (msg: string) => void;
}

export function SettingsView({ showToast }: SettingsViewProps) {
  const [settingsTab, setSettingsTab] = useState('algemeen');
  const settingsTabs = [
    { id: 'algemeen', label: 'Algemeen', icon: '\u2699\uFE0F' },
    { id: 'producten', label: 'Producten & Prijzen', icon: '\uD83D\uDCE6' },
    { id: 'email', label: 'E-mail Templates', icon: '\uD83D\uDCE7' },
    { id: 'betalingen', label: 'Betalingen', icon: '\uD83D\uDCB3' },
    { id: 'rollen', label: 'Gebruikers & Rollen', icon: '\uD83D\uDC65' },
    { id: 'integraties', label: 'Integraties', icon: '\uD83D\uDD17' },
  ];

  return (
    <>
      <PageHeader title="Instellingen" subtitle="Beheer uw zwemschool configuratie" />
      <div className="flex gap-5">
        <div className="w-[220px] flex-shrink-0 hidden lg:block">
          <Card className="p-2">
            {settingsTabs.map(t => (
              <button key={t.id} onClick={() => setSettingsTab(t.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-2.5 mb-0.5 ${settingsTab === t.id ? 'bg-[#0365C4]/10 text-[#0365C4]' : 'text-[#6B7B94] hover:bg-[#F4F7FC]'}`}
                style={{ fontSize: 13, fontWeight: settingsTab === t.id ? 700 : 500 }}>
                <span>{t.icon}</span> {t.label}
              </button>
            ))}
          </Card>
        </div>

        <div className="flex-1 min-w-0">
          {settingsTab === 'algemeen' && (
            <Card className="p-6">
              <h3 className="text-[#1A1A2E] mb-5" style={{ fontSize: 18, fontWeight: 700 }}>Algemene instellingen</h3>
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Bedrijfsnaam', value: 'Zwemschool Snorkeltje' },
                    { label: 'KvK Nummer', value: '82456789' },
                    { label: 'BTW Nummer', value: 'NL004567891B01' },
                    { label: 'IBAN', value: 'NL91ABNA0417164300' },
                    { label: 'Telefoon', value: '+31 33 456 7890' },
                    { label: 'E-mail', value: 'info@zwemschoolsnorkeltje.nl' },
                    { label: 'Website', value: 'www.zwemschoolsnorkeltje.nl' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>{f.label}</label>
                      <input defaultValue={f.value} className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }} />
                    </div>
                  ))}
                  <div>
                    <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Taal</label>
                    <select defaultValue="nl" className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none text-[#1A1A2E]" style={{ fontSize: 14 }}>
                      <option value="nl">{'\uD83C\uDDF3\uD83C\uDDF1'} Nederlands</option><option value="en">{'\uD83C\uDDEC\uD83C\uDDE7'} English</option>
                    </select>
                  </div>
                </div>
                <div className="border-t border-[#F0F4FA] pt-5">
                  <h4 className="text-[#1A1A2E] mb-3" style={{ fontSize: 14, fontWeight: 700 }}>Boekingsregels</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Min. boekingstermijn (dagen)</label><input type="number" defaultValue={14} className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }} /></div>
                    <div><label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Standaard annuleringstermijn (uur)</label><input type="number" defaultValue={24} className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }} /></div>
                    <div><label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Vakantie annuleringstermijn (uur)</label><input type="number" defaultValue={96} className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }} /></div>
                    <div><label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Auto-conversie 1{'\u2192'}2</label>
                      <select defaultValue="aan" className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none text-[#1A1A2E]" style={{ fontSize: 14 }}>
                        <option value="aan">Ingeschakeld</option><option value="uit">Uitgeschakeld</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button onClick={() => showToast('Instellingen opgeslagen!')} className="px-6 py-2.5 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 14, fontWeight: 700 }}>Opslaan</button>
              </div>
            </Card>
          )}

          {settingsTab === 'producten' && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>Producten & Prijzen</h3>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 600 }}><Plus size={15} /> Nieuw product</button>
              </div>
              <div className="space-y-3">
                {[
                  { name: '1-op-1 Zwemles', prices: '\u20AC38/les', cards: '10x \u20AC380 \u00B7 5x \u20AC190 \u00B7 3x \u20AC114', active: true },
                  { name: '1-op-2 Zwemles', prices: '\u20AC27/les', cards: '10x \u20AC270 \u00B7 5x \u20AC135', active: true },
                  { name: '1-op-3 Zwemles', prices: '\u20AC22/les', cards: '10x \u20AC220', active: true },
                  { name: 'Survival Training', prices: '\u20AC45/les', cards: '10x \u20AC450', active: true },
                  { name: 'Vakantie 1-op-1', prices: '\u20AC39/les', cards: '\u2014', active: true },
                  { name: 'Diploma B Examen', prices: '\u20AC75', cards: '\u2014', active: false },
                ].map(p => (
                  <div key={p.name} className={`p-4 rounded-xl border flex items-center justify-between ${p.active ? 'border-[#E8ECF4]' : 'border-[#E8ECF4] opacity-50'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0365C4]/10 flex items-center justify-center"><Waves size={18} className="text-[#0365C4]" /></div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</p>
                          {!p.active && <span className="text-[#A0AEC0] px-2 py-0.5 rounded-full bg-[#F4F7FC]" style={{ fontSize: 10 }}>Inactief</span>}
                        </div>
                        <p className="text-[#6B7B94]" style={{ fontSize: 12 }}>{p.prices} | Knipkaarten: {p.cards}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"><Edit2 size={14} /></button>
                      <button className="p-2 rounded-lg hover:bg-[#FEF2F2] text-[#E74C3C]"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {settingsTab === 'email' && (
            <Card className="p-6">
              <h3 className="text-[#1A1A2E] mb-5" style={{ fontSize: 18, fontWeight: 700 }}>E-mail Templates</h3>
              <div className="space-y-3">
                {[
                  { name: 'Boekingsbevestiging', desc: 'Wordt verstuurd bij nieuwe reservering', status: 'Actief', lastEdit: '15-03-2026' },
                  { name: 'Herinnering 24 uur', desc: 'Automatische herinnering 24u voor de les', status: 'Actief', lastEdit: '10-03-2026' },
                  { name: 'Herinnering 48 uur (vakantie)', desc: '96u herinnering voor vakantielessen', status: 'Actief', lastEdit: '10-03-2026' },
                  { name: 'Annuleringsbevestiging', desc: 'Bij annulering door klant of admin', status: 'Actief', lastEdit: '08-03-2026' },
                  { name: 'Knipkaart bijna op', desc: 'Wanneer er nog 1 les resterend is', status: 'Actief', lastEdit: '05-03-2026' },
                  { name: 'Factuur', desc: 'Factuur PDF als bijlage', status: 'Actief', lastEdit: '01-03-2026' },
                  { name: 'Welkomstmail', desc: 'Na goedkeuring registratie', status: 'Actief', lastEdit: '20-02-2026' },
                  { name: 'Voortgangsrapport', desc: 'Maandelijks voortgangsoverzicht', status: 'Concept', lastEdit: '15-02-2026' },
                ].map(t => (
                  <div key={t.name} className="p-4 rounded-xl border border-[#E8ECF4] flex items-center justify-between hover:bg-[#F8FAFC] cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#00C1FF]/10 flex items-center justify-center"><Mail size={18} className="text-[#00C1FF]" /></div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</p>
                          <StatusBadge status={t.status} />
                        </div>
                        <p className="text-[#6B7B94]" style={{ fontSize: 12 }}>{t.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Bewerkt: {t.lastEdit}</span>
                      <button className="p-2 rounded-lg hover:bg-white text-[#0365C4]"><Edit2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {settingsTab === 'betalingen' && (
            <Card className="p-6">
              <h3 className="text-[#1A1A2E] mb-5" style={{ fontSize: 18, fontWeight: 700 }}>Betalingsinstellingen</h3>
              <div className="space-y-5">
                <div className="p-4 rounded-xl border border-[#E8ECF4]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#27AE60]/10 flex items-center justify-center"><CreditCard size={16} className="text-[#27AE60]" /></div>
                      <h4 className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>Mollie</h4>
                      <StatusBadge status="Actief" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>API Key (Live)</label><input type="password" defaultValue="live_xxxxxxxxxxxx" className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none text-[#1A1A2E]" style={{ fontSize: 14 }} /></div>
                    <div><label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>API Key (Test)</label><input type="password" defaultValue="test_xxxxxxxxxxxx" className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none text-[#1A1A2E]" style={{ fontSize: 14 }} /></div>
                  </div>
                  <p className="text-[#A0AEC0] mt-2" style={{ fontSize: 11 }}>Methoden: iDEAL, Creditcard, Bancontact, Apple Pay</p>
                </div>
                <div className="p-4 rounded-xl border border-[#E8ECF4]">
                  <h4 className="text-[#1A1A2E] mb-3" style={{ fontSize: 15, fontWeight: 700 }}>Knipkaart prijzen</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[{ type: '10x 1-op-1', price: 380 }, { type: '5x 1-op-1', price: 190 }, { type: '3x 1-op-1', price: 114 }, { type: '10x 1-op-2', price: 270 }].map(p => (
                      <div key={p.type}>
                        <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 11, fontWeight: 600 }}>{p.type}</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]" style={{ fontSize: 14 }}>{'\u20AC'}</span>
                          <input type="number" defaultValue={p.price} className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={() => showToast('Betalingsinstellingen opgeslagen!')} className="px-6 py-2.5 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 14, fontWeight: 700 }}>Opslaan</button>
              </div>
            </Card>
          )}

          {settingsTab === 'rollen' && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>Gebruikers & Rollen</h3>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 600 }}><Plus size={15} /> Gebruiker toevoegen</button>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Walter Van De Geest', email: 'walter@zwemschoolsnorkeltje.nl', role: 'Super Admin', avatar: 'WG', last: 'Nu actief' },
                  { name: 'Maaike van Dijk', email: 'maaike@snorkeltje.nl', role: 'Instructeur', avatar: 'MD', last: '2 uur geleden' },
                  { name: 'Jeroen Peters', email: 'jeroen@snorkeltje.nl', role: 'Instructeur', avatar: 'JP', last: '3 dagen geleden' },
                ].map(u => (
                  <div key={u.email} className="p-4 rounded-xl border border-[#E8ECF4] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0365C4] to-[#00C1FF] flex items-center justify-center text-white" style={{ fontSize: 12, fontWeight: 700 }}>{u.avatar}</div>
                      <div><p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>{u.name}</p><p className="text-[#6B7B94]" style={{ fontSize: 12 }}>{u.email} {'\u00B7'} {u.role}</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#A0AEC0]" style={{ fontSize: 11 }}>{u.last}</span>
                      <button className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"><Edit2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {settingsTab === 'integraties' && (
            <Card className="p-6">
              <h3 className="text-[#1A1A2E] mb-5" style={{ fontSize: 18, fontWeight: 700 }}>Integraties</h3>
              <div className="space-y-3">
                {[
                  { name: 'Mollie Payments', desc: 'Online betalingen via iDEAL, creditcard etc.', connected: true },
                  { name: 'Supabase Database', desc: 'Backend database & authenticatie', connected: true },
                  { name: 'Expo Push Notifications', desc: 'Push notificaties voor de mobile app', connected: true },
                  { name: 'Google Calendar Sync', desc: 'Synchroniseer lessen met Google Agenda', connected: false },
                  { name: 'Mailchimp', desc: 'Nieuwsbrief en marketing emails', connected: false },
                  { name: 'Slack Webhook', desc: 'Automatische notificaties in Slack', connected: false },
                ].map(int => (
                  <div key={int.name} className="p-4 rounded-xl border border-[#E8ECF4] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: int.connected ? '#27AE6015' : '#A0AEC015' }}><Zap size={18} color={int.connected ? '#27AE60' : '#A0AEC0'} /></div>
                      <div>
                        <div className="flex items-center gap-2"><p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>{int.name}</p><span className="w-2 h-2 rounded-full" style={{ background: int.connected ? '#27AE60' : '#A0AEC0' }} /></div>
                        <p className="text-[#6B7B94]" style={{ fontSize: 12 }}>{int.desc}</p>
                      </div>
                    </div>
                    <button className={`px-4 py-2 rounded-lg ${int.connected ? 'text-[#27AE60] bg-[#ECFDF5]' : 'text-[#0365C4] bg-[#0365C4]/10'}`} style={{ fontSize: 12, fontWeight: 600 }}>
                      {int.connected ? 'Verbonden \u2713' : 'Verbinden'}
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

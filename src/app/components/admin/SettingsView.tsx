import { useEffect, useState } from 'react';
import {
  Plus, Edit2, Trash2, Mail, CreditCard, Waves, Zap, Check, AlertCircle, Loader2,
} from 'lucide-react';
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

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, { bg: string; text: string }> = {
    'Actief': { bg: '#ECFDF5', text: '#065F46' },
    'Concept': { bg: '#F3F4F6', text: '#6B7280' },
  };
  const c = colors[status] || { bg: '#F3F4F6', text: '#6B7280' };
  return <span className="px-2.5 py-1 rounded-full" style={{ background: c.bg, color: c.text, fontSize: 11, fontWeight: 600 }}>{status}</span>;
};

interface SettingsViewProps {
  showToast: (msg: string) => void;
}

const STORAGE_KEY = 'snorkeltje_admin_settings_v1';

interface AdminSettings {
  // Algemeen
  companyName: string;
  kvkNumber: string;
  vatNumber: string;
  iban: string;
  phone: string;
  email: string;
  website: string;
  language: 'nl' | 'en';
  // Boekingsregels (Walter Apr 22)
  minBookingDays: number;
  defaultCancelHours: number;
  vacationCancelHours: number;
  autoConvert1to2: boolean;
  // Knipkaart prijzen (Walter Apr 22)
  card10x1on1: number;
  card5x1on1: number;
  card3x1on1: number;
  card10x1on2: number;
  // Mollie
  mollieKeyLive: string;
  mollieKeyTest: string;
}

const defaultSettings: AdminSettings = {
  companyName: 'Zwemschool Snorkeltje',
  kvkNumber: '82456789',
  vatNumber: 'NL004567891B01',
  iban: 'NL91ABNA0417164300',
  phone: '+31 33 456 7890',
  email: 'info@zwemschoolsnorkeltje.nl',
  website: 'www.zwemschoolsnorkeltje.nl',
  language: 'nl',
  minBookingDays: 14,
  defaultCancelHours: 24,
  vacationCancelHours: 96,
  autoConvert1to2: false, // Walter Apr 22: removed feature
  card10x1on1: 380,
  card5x1on1: 190,
  card3x1on1: 114,
  card10x1on2: 270,
  mollieKeyLive: 'live_xxxxxxxxxxxx',
  mollieKeyTest: 'test_xxxxxxxxxxxx',
};

function loadSettings(): AdminSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch { return defaultSettings; }
}

function saveSettings(s: AdminSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

interface PaymentSettings {
  stripe_secret_test: string;
  stripe_secret_live: string;
  stripe_publishable_test: string;
  stripe_publishable_live: string;
  mode: 'test' | 'live';
  last_tested_at: string | null;
  last_test_country: string | null;
  last_test_ok: boolean | null;
}

const blankPaymentSettings: PaymentSettings = {
  stripe_secret_test: '',
  stripe_secret_live: '',
  stripe_publishable_test: '',
  stripe_publishable_live: '',
  mode: 'test',
  last_tested_at: null,
  last_test_country: null,
  last_test_ok: null,
};

async function loadPaymentSettings(): Promise<PaymentSettings> {
  const { data, error } = await supabase
    .from('payment_settings')
    .select('stripe_secret_test, stripe_secret_live, stripe_publishable_test, stripe_publishable_live, mode, last_tested_at, last_test_country, last_test_ok')
    .eq('id', 1)
    .maybeSingle();
  if (error || !data) return blankPaymentSettings;
  return {
    stripe_secret_test: data.stripe_secret_test ?? '',
    stripe_secret_live: data.stripe_secret_live ?? '',
    stripe_publishable_test: data.stripe_publishable_test ?? '',
    stripe_publishable_live: data.stripe_publishable_live ?? '',
    mode: (data.mode as 'test' | 'live') ?? 'test',
    last_tested_at: data.last_tested_at,
    last_test_country: data.last_test_country,
    last_test_ok: data.last_test_ok,
  };
}

async function savePaymentSettings(s: PaymentSettings): Promise<{ ok: boolean; error?: string }> {
  const { error } = await supabase
    .from('payment_settings')
    .update({
      stripe_secret_test: s.stripe_secret_test || null,
      stripe_secret_live: s.stripe_secret_live || null,
      stripe_publishable_test: s.stripe_publishable_test || null,
      stripe_publishable_live: s.stripe_publishable_live || null,
      mode: s.mode,
    })
    .eq('id', 1);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

async function testStripeConnection(mode: 'test' | 'live'): Promise<{ ok: boolean; country?: string; error?: string }> {
  try {
    const { data, error } = await supabase.functions.invoke('test-stripe-key', { body: { mode } });
    if (error) return { ok: false, error: error.message };
    if (!data?.ok) return { ok: false, error: data?.error ?? 'Unknown error' };
    return { ok: true, country: data.country };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export function SettingsView({ showToast }: SettingsViewProps) {
  const [settingsTab, setSettingsTab] = useState('algemeen');
  const [settings, setSettings] = useState<AdminSettings>(() => loadSettings());
  const [dirty, setDirty] = useState<Record<string, boolean>>({});

  const [payment, setPayment] = useState<PaymentSettings>(blankPaymentSettings);
  const [paymentLoaded, setPaymentLoaded] = useState(false);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
    loadPaymentSettings().then((p) => {
      setPayment(p);
      setPaymentLoaded(true);
    });
  }, []);

  const updatePayment = <K extends keyof PaymentSettings>(key: K, value: PaymentSettings[K]) => {
    setPayment((prev) => ({ ...prev, [key]: value }));
    setDirty((d) => ({ ...d, betalingen: true }));
  };

  const handleTestStripe = async () => {
    setTesting(true);
    const before = await savePaymentSettings(payment);
    if (!before.ok) {
      setTesting(false);
      showToast(`✗ Opslaan mislukt: ${before.error}`);
      return;
    }
    const result = await testStripeConnection(payment.mode);
    const fresh = await loadPaymentSettings();
    setPayment(fresh);
    setTesting(false);
    if (result.ok) {
      showToast(`✓ Stripe verbonden — land: ${result.country ?? 'onbekend'}`);
    } else {
      showToast(`✗ Stripe-verbinding mislukt: ${result.error}`);
    }
  };

  const handleSavePayments = async () => {
    const r = await savePaymentSettings(payment);
    if (r.ok) {
      setDirty((d) => { const n = { ...d }; delete n.betalingen; return n; });
      showToast('✓ Betalingsinstellingen opgeslagen');
    } else {
      showToast(`✗ Opslaan mislukt: ${r.error}`);
    }
  };

  const update = <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setDirty(d => ({ ...d, [settingsTab]: true }));
  };

  const persistTab = (tabId: string, label: string) => {
    saveSettings(settings);
    setDirty(d => { const n = { ...d }; delete n[tabId]; return n; });
    showToast(`✓ ${label} opgeslagen`);
  };

  const settingsTabs = [
    { id: 'algemeen', label: 'Algemeen', icon: '⚙️' },
    { id: 'producten', label: 'Producten & Prijzen', icon: '📦' },
    { id: 'email', label: 'E-mail Templates', icon: '📧' },
    { id: 'betalingen', label: 'Betalingen', icon: '💳' },
    { id: 'rollen', label: 'Gebruikers & Rollen', icon: '👥' },
    { id: 'integraties', label: 'Integraties', icon: '🔗' },
  ];

  return (
    <>
      <PageHeader title="Instellingen" subtitle="Beheer uw zwemschool configuratie · wijzigingen worden lokaal opgeslagen" />
      <div className="flex gap-5">
        <div className="w-[220px] flex-shrink-0 hidden lg:block">
          <Card className="p-2">
            {settingsTabs.map(t => (
              <button
                key={t.id}
                onClick={() => setSettingsTab(t.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-2.5 mb-0.5 ${settingsTab === t.id ? 'bg-[#0365C4]/10 text-[#0365C4]' : 'text-[#6B7B94] hover:bg-[#F4F7FC]'}`}
                style={{ fontSize: 13, fontWeight: settingsTab === t.id ? 700 : 500 }}
              >
                <span>{t.icon}</span>
                <span className="flex-1">{t.label}</span>
                {dirty[t.id] && <span className="w-2 h-2 rounded-full bg-[#FF5C00]" title="Niet opgeslagen wijzigingen" />}
              </button>
            ))}
          </Card>
        </div>

        <div className="flex-1 min-w-0">
          {settingsTab === 'algemeen' && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>Algemene instellingen</h3>
                {dirty['algemeen'] && <span className="text-[#FF5C00]" style={{ fontSize: 12, fontWeight: 600 }}>Wijzigingen niet opgeslagen</span>}
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {([
                    ['companyName', 'Bedrijfsnaam'],
                    ['kvkNumber', 'KvK Nummer'],
                    ['vatNumber', 'BTW Nummer'],
                    ['iban', 'IBAN'],
                    ['phone', 'Telefoon'],
                    ['email', 'E-mail'],
                    ['website', 'Website'],
                  ] as const).map(([key, label]) => (
                    <div key={key}>
                      <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>{label}</label>
                      <input
                        value={settings[key] as string}
                        onChange={e => update(key, e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]"
                        style={{ fontSize: 14 }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Taal</label>
                    <select
                      value={settings.language}
                      onChange={e => update('language', e.target.value as 'nl' | 'en')}
                      className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none text-[#1A1A2E]"
                      style={{ fontSize: 14 }}
                    >
                      <option value="nl">🇳🇱 Nederlands</option>
                      <option value="en">🇬🇧 English</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-[#F0F4FA] pt-5">
                  <h4 className="text-[#1A1A2E] mb-3" style={{ fontSize: 14, fontWeight: 700 }}>Boekingsregels</h4>
                  <p className="text-[#A0AEC0] mb-3" style={{ fontSize: 11 }}>
                    Walter's Apr 22 specs — auto-conversie is verwijderd (zoals afgesproken).
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Min. boekingstermijn (dagen)</label>
                      <input
                        type="number"
                        value={settings.minBookingDays}
                        onChange={e => update('minBookingDays', Number(e.target.value))}
                        className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]"
                        style={{ fontSize: 14 }}
                      />
                    </div>
                    <div>
                      <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Standaard annuleringstermijn (uur)</label>
                      <input
                        type="number"
                        value={settings.defaultCancelHours}
                        onChange={e => update('defaultCancelHours', Number(e.target.value))}
                        className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]"
                        style={{ fontSize: 14 }}
                      />
                    </div>
                    <div>
                      <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Vakantie annuleringstermijn (uur)</label>
                      <input
                        type="number"
                        value={settings.vacationCancelHours}
                        onChange={e => update('vacationCancelHours', Number(e.target.value))}
                        className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]"
                        style={{ fontSize: 14 }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => persistTab('algemeen', 'Algemene instellingen')}
                  disabled={!dirty['algemeen']}
                  className="px-6 py-2.5 rounded-lg text-white disabled:opacity-50 flex items-center gap-2"
                  style={{ background: '#0365C4', fontSize: 14, fontWeight: 700 }}
                >
                  <Check size={15} /> Opslaan
                </button>
              </div>
            </Card>
          )}

          {settingsTab === 'producten' && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>Producten & Prijzen</h3>
                <button
                  onClick={() => showToast('Nieuw-product editor komt in volgende sprint')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white"
                  style={{ background: '#0365C4', fontSize: 13, fontWeight: 600 }}
                >
                  <Plus size={15} /> Nieuw product
                </button>
              </div>
              <div className="space-y-3">
                {[
                  // Walter 2026-05-13/19 — friendly customer-facing labels, no 1-op-X.
                  { name: 'Privéles', prices: '€39 / les', desc: 'Individuele les — 1 instructeur + 1 leerling', active: true },
                  { name: 'Duoles', prices: '€28 / les', desc: 'Gedeelde les — 1 instructeur + 2 leerlingen', active: true },
                  { name: 'Trioles', prices: '€22 / les', desc: 'Groepsles — 1 instructeur + 3 leerlingen', active: true },
                  { name: 'Survival Training', prices: '€45 / les', desc: 'Mini Survival voor jonge kinderen', active: true },
                  { name: 'Vakantie-zwemles', prices: '€39 / les', desc: 'Extra lessen tijdens schoolvakanties', active: true },
                  { name: 'Diploma examen', prices: 'Variabel', desc: 'Examenkosten worden per kandidaat berekend', active: false },
                ].map(p => (
                  <div key={p.name} className={`p-4 rounded-xl border flex items-center justify-between ${p.active ? 'border-[#E8ECF4]' : 'border-[#E8ECF4] opacity-50'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0365C4]/10 flex items-center justify-center"><Waves size={18} className="text-[#0365C4]" /></div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</p>
                          {!p.active && <span className="text-[#A0AEC0] px-2 py-0.5 rounded-full bg-[#F4F7FC]" style={{ fontSize: 10 }}>Inactief</span>}
                        </div>
                        <p className="text-[#6B7B94]" style={{ fontSize: 12 }}>{p.prices} · {p.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => showToast('Product-editor komt in volgende sprint')} className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"><Edit2 size={14} /></button>
                      <button onClick={() => showToast('Product verwijderen komt in volgende sprint')} className="p-2 rounded-lg hover:bg-[#FEF2F2] text-[#E74C3C]"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[#A0AEC0] mt-4 text-center" style={{ fontSize: 11 }}>Tegoed-pakketten kunnen aangepast worden in <button onClick={() => setSettingsTab('betalingen')} className="text-[#0365C4] hover:underline">Betalingen</button></p>
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
                  { name: 'Tegoed bijna op', desc: 'Wanneer het tegoed-saldo lager is dan één les', status: 'Actief', lastEdit: '05-03-2026' },
                  { name: 'Factuur', desc: 'Factuur PDF als bijlage', status: 'Actief', lastEdit: '01-03-2026' },
                  { name: 'Welkomstmail', desc: 'Na goedkeuring registratie', status: 'Actief', lastEdit: '20-02-2026' },
                  { name: 'Voortgangsrapport', desc: 'Maandelijks voortgangsoverzicht', status: 'Concept', lastEdit: '15-02-2026' },
                ].map(t => (
                  <div
                    key={t.name}
                    onClick={() => showToast(`Template-editor voor "${t.name}" komt in volgende sprint`)}
                    className="p-4 rounded-xl border border-[#E8ECF4] flex items-center justify-between hover:bg-[#F8FAFC] cursor-pointer transition-colors"
                  >
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
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>Betalingsinstellingen</h3>
                {dirty['betalingen'] && <span className="text-[#FF5C00]" style={{ fontSize: 12, fontWeight: 600 }}>Wijzigingen niet opgeslagen</span>}
              </div>
              <div className="space-y-5">
                <div className="p-4 rounded-xl border border-[#E8ECF4]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#27AE60]/10 flex items-center justify-center"><CreditCard size={16} className="text-[#27AE60]" /></div>
                      <h4 className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>Stripe</h4>
                      <StatusBadge status={payment.last_test_ok ? 'Actief' : 'Concept'} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#6B7B94]" style={{ fontSize: 12, fontWeight: 600 }}>Modus:</span>
                      <button
                        onClick={() => updatePayment('mode', 'test')}
                        className="px-3 py-1 rounded-lg"
                        style={{ background: payment.mode === 'test' ? '#FFF3CD' : '#F8FAFC', color: payment.mode === 'test' ? '#92400E' : '#6B7B94', fontSize: 11, fontWeight: 700, border: payment.mode === 'test' ? '1px solid #F59E0B' : '1px solid #E8ECF4' }}
                      >TEST</button>
                      <button
                        onClick={() => updatePayment('mode', 'live')}
                        className="px-3 py-1 rounded-lg"
                        style={{ background: payment.mode === 'live' ? '#D1FAE5' : '#F8FAFC', color: payment.mode === 'live' ? '#065F46' : '#6B7B94', fontSize: 11, fontWeight: 700, border: payment.mode === 'live' ? '1px solid #10B981' : '1px solid #E8ECF4' }}
                      >LIVE</button>
                    </div>
                  </div>

                  <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-3 mb-4 flex gap-2">
                    <AlertCircle size={16} className="text-[#1D4ED8] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#1E40AF]" style={{ fontSize: 12, fontWeight: 600 }}>Hoe verbind ik mijn Stripe-account?</p>
                      <p className="text-[#3B82F6] mt-0.5" style={{ fontSize: 11 }}>
                        1. Ga naar <a href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener noreferrer" className="underline">dashboard.stripe.com/apikeys</a><br/>
                        2. Kopieer de "Publishable key" en "Secret key"<br/>
                        3. Plak ze hieronder en klik op "Verbinding testen"
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>
                          Publishable Key (Test) <span className="text-[#A0AEC0] font-normal">pk_test_...</span>
                        </label>
                        <input
                          type="text"
                          value={paymentLoaded ? payment.stripe_publishable_test : ''}
                          onChange={(e) => updatePayment('stripe_publishable_test', e.target.value)}
                          placeholder="pk_test_..."
                          className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E] font-mono"
                          style={{ fontSize: 12 }}
                        />
                      </div>
                      <div>
                        <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>
                          Secret Key (Test) <span className="text-[#A0AEC0] font-normal">sk_test_...</span>
                        </label>
                        <input
                          type="password"
                          value={paymentLoaded ? payment.stripe_secret_test : ''}
                          onChange={(e) => updatePayment('stripe_secret_test', e.target.value)}
                          placeholder="sk_test_..."
                          className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E] font-mono"
                          style={{ fontSize: 12 }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>
                          Publishable Key (Live) <span className="text-[#A0AEC0] font-normal">pk_live_...</span>
                        </label>
                        <input
                          type="text"
                          value={paymentLoaded ? payment.stripe_publishable_live : ''}
                          onChange={(e) => updatePayment('stripe_publishable_live', e.target.value)}
                          placeholder="pk_live_..."
                          className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E] font-mono"
                          style={{ fontSize: 12 }}
                        />
                      </div>
                      <div>
                        <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>
                          Secret Key (Live) <span className="text-[#A0AEC0] font-normal">sk_live_...</span>
                        </label>
                        <input
                          type="password"
                          value={paymentLoaded ? payment.stripe_secret_live : ''}
                          onChange={(e) => updatePayment('stripe_secret_live', e.target.value)}
                          placeholder="sk_live_..."
                          className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E] font-mono"
                          style={{ fontSize: 12 }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E8ECF4]">
                    <div>
                      {payment.last_tested_at ? (
                        <div className="flex items-center gap-2">
                          {payment.last_test_ok ? (
                            <Check size={14} className="text-[#10B981]" />
                          ) : (
                            <AlertCircle size={14} className="text-[#EF4444]" />
                          )}
                          <span className="text-[#6B7B94]" style={{ fontSize: 11 }}>
                            Laatst getest: {new Date(payment.last_tested_at).toLocaleString('nl-NL')}
                            {payment.last_test_country && <> · Land: <strong>{payment.last_test_country}</strong></>}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Nog niet getest</span>
                      )}
                    </div>
                    <button
                      onClick={handleTestStripe}
                      disabled={testing}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-white disabled:opacity-50"
                      style={{ background: '#7C3AED', fontSize: 13, fontWeight: 600 }}
                    >
                      {testing ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
                      {testing ? 'Testen...' : 'Verbinding testen'}
                    </button>
                  </div>

                  <p className="text-[#A0AEC0] mt-3" style={{ fontSize: 11 }}>Methoden: iDEAL, Creditcard, Apple Pay · Voor iDEAL is een Stripe Nederland-account vereist.</p>
                </div>

                <div className="p-4 rounded-xl border border-[#E8ECF4]">
                  <h4 className="text-[#1A1A2E] mb-3" style={{ fontSize: 15, fontWeight: 700 }}>Tegoed-pakketten</h4>
                  <p className="text-[#A0AEC0] mb-3" style={{ fontSize: 11 }}>
                    Walter's Apr 22 packages: €200 → €202 / €400 → €405 / €1000 → €1015. Lessen worden van het tegoed afgeboekt op basis van lestype.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {([
                      ['card10x1on1', '10× Privéles'],
                      ['card5x1on1', '5× Privéles'],
                      ['card3x1on1', '3× Privéles'],
                      ['card10x1on2', '10× Duoles'],
                    ] as const).map(([key, label]) => (
                      <div key={key}>
                        <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 11, fontWeight: 600 }}>{label}</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]" style={{ fontSize: 14 }}>€</span>
                          <input
                            type="number"
                            value={settings[key]}
                            onChange={e => update(key, Number(e.target.value))}
                            className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]"
                            style={{ fontSize: 14 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => { persistTab('betalingen', 'Tegoed-pakketten'); handleSavePayments(); }}
                  disabled={!dirty['betalingen']}
                  className="px-6 py-2.5 rounded-lg text-white disabled:opacity-50 flex items-center gap-2"
                  style={{ background: '#0365C4', fontSize: 14, fontWeight: 700 }}
                >
                  <Check size={15} /> Opslaan
                </button>
              </div>
            </Card>
          )}

          {settingsTab === 'rollen' && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>Gebruikers & Rollen</h3>
                <button
                  onClick={() => showToast('Gebruiker toevoegen via Klanten → Nieuwe klant of via Personeel → Instructeur toevoegen')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white"
                  style={{ background: '#0365C4', fontSize: 13, fontWeight: 600 }}
                >
                  <Plus size={15} /> Gebruiker toevoegen
                </button>
              </div>
              <p className="text-[#A0AEC0] mb-4" style={{ fontSize: 12 }}>
                Beheer gebruikers via de respectievelijke pages: <strong className="text-[#0365C4]">Klanten</strong> voor ouders, <strong className="text-[#0365C4]">Personeel → Instructeurs</strong> voor instructeurs.
              </p>
              <div className="rounded-xl p-4" style={{ background: '#F0F9FF', border: '1px solid #BAE6FD' }}>
                <p className="text-[#0369A1]" style={{ fontSize: 12, fontWeight: 600 }}>3 rollen actief in dit systeem:</p>
                <ul className="mt-2 space-y-1 text-[#0369A1]" style={{ fontSize: 12 }}>
                  <li>• <strong>admin</strong> — volledige toegang tot het web-dashboard</li>
                  <li>• <strong>instructor</strong> — mobiele app + leerlingen + schema</li>
                  <li>• <strong>parent</strong> — mobiele app + eigen kinderen + reserveringen</li>
                </ul>
              </div>
            </Card>
          )}

          {settingsTab === 'integraties' && (
            <Card className="p-6">
              <h3 className="text-[#1A1A2E] mb-5" style={{ fontSize: 18, fontWeight: 700 }}>Integraties</h3>
              <div className="space-y-3">
                {[
                  { name: 'Stripe Payments', desc: 'iDEAL + creditcard via Stripe Edge Function', connected: true },
                  { name: 'Supabase Database', desc: 'Backend database & authenticatie', connected: true },
                  { name: 'Supabase Realtime', desc: 'Live notificaties + chat-updates via postgres_changes', connected: true },
                  { name: 'Expo Push Notifications', desc: 'Push notificaties voor de mobile app', connected: true },
                  { name: 'Google Calendar Sync', desc: 'Synchroniseer lessen met Google Agenda', connected: false },
                  { name: 'Mailchimp', desc: 'Nieuwsbrief en marketing emails', connected: false },
                  { name: 'Slack Webhook', desc: 'Automatische notificaties in Slack', connected: false },
                ].map(int => (
                  <div key={int.name} className="p-4 rounded-xl border border-[#E8ECF4] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: int.connected ? '#27AE6015' : '#A0AEC015' }}>
                        <Zap size={18} color={int.connected ? '#27AE60' : '#A0AEC0'} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>{int.name}</p>
                          <span className="w-2 h-2 rounded-full" style={{ background: int.connected ? '#27AE60' : '#A0AEC0' }} />
                        </div>
                        <p className="text-[#6B7B94]" style={{ fontSize: 12 }}>{int.desc}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => showToast(int.connected ? `${int.name} is al verbonden` : `${int.name} verbinding-wizard komt in volgende sprint`)}
                      className={`px-4 py-2 rounded-lg ${int.connected ? 'text-[#27AE60] bg-[#ECFDF5]' : 'text-[#0365C4] bg-[#0365C4]/10'}`}
                      style={{ fontSize: 12, fontWeight: 600 }}
                    >
                      {int.connected ? 'Verbonden ✓' : 'Verbinden'}
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

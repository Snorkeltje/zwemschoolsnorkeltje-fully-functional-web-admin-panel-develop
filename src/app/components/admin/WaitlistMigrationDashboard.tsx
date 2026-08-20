import { useEffect, useState } from 'react';
import {
  Upload, RefreshCw, Mail, CheckCircle2, Clock, XCircle,
  AlertTriangle, ArrowLeft, FileSpreadsheet, Download,
} from 'lucide-react';
import {
  fetchMigrationStats, resendMigrationEmail,
  type WaitlistMigrationStats,
} from '../../../lib/data/admin-repository';

interface Props {
  onNavigateBack: () => void;
  showToast: (msg: string) => void;
}

/// Admin dashboard for tracking the 1,236-entry i-Reserve migration.
/// Shows a KPI grid + progress bar + per-batch stats. Batch import itself
/// runs via the waitlist-migration-send-emails edge function (triggered
/// from a separate CSV importer script).
export function WaitlistMigrationDashboard({ onNavigateBack, showToast }: Props) {
  const [stats, setStats] = useState<WaitlistMigrationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [resending, setResending] = useState(false);

  async function reload() {
    setLoading(true);
    const s = await fetchMigrationStats();
    setStats(s);
    setLoading(false);
  }
  useEffect(() => { void reload(); }, []);

  async function handleResendAll() {
    if (!stats?.lastBatch) return;
    setResending(true);
    // The bulk resend call is best-effort; we don't await individual results.
    try {
      const r = await resendMigrationEmail('bulk');   // batch name flag inside edge function
      if (r.ok) showToast('✅ E-mails opnieuw verstuurd voor pending entries');
      else showToast(`❌ ${r.error ?? 'Verzenden mislukt'}`);
    } finally {
      setResending(false);
      void reload();
    }
  }

  return (
    <div>
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 sm:mb-6">
        <div className="flex items-start gap-2 sm:gap-3 min-w-0">
          <button onClick={onNavigateBack}
                  className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94] shrink-0 mt-0.5">
            <ArrowLeft size={18} />
          </button>
          <div className="min-w-0">
            <h1 className="text-[#1A1A2E]" style={{ fontSize: 22, fontWeight: 700 }}>Wachtlijst migratie</h1>
            <p className="text-[#6B7B94] mt-0.5" style={{ fontSize: 13 }}>
              Migratie van legacy i-Reserve wachtlijst naar het nieuwe systeem. Ouders bevestigen via unieke e-mail-link.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={reload} disabled={loading}
                  className="p-2.5 rounded-xl bg-white border border-[#E8ECF4] text-[#6B7B94] hover:bg-[#F8FAFC] disabled:opacity-50"
                  title="Vernieuwen">
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={handleResendAll} disabled={resending || !stats?.lastBatch}
                  className="px-4 py-2.5 rounded-xl bg-white border border-[#E8ECF4] text-[#1A1A2E] hover:bg-[#F8FAFC] flex items-center gap-2 disabled:opacity-50"
                  style={{ fontSize: 13, fontWeight: 600 }}>
            <Mail size={14} /> Herstuur pending
          </button>
        </div>
      </div>

      {loading || !stats ? (
        <div className="p-16 text-center text-[#A0AEC0]">Statistieken laden…</div>
      ) : stats.total === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* ── KPI Grid ─────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
            <Kpi icon={FileSpreadsheet} color="#0365C4" label="Totaal" value={stats.total} />
            <Kpi icon={Upload}          color="#8B5CF6" label="Geïmporteerd" value={stats.imported} />
            <Kpi icon={Mail}            color="#F59E0B" label="Email verstuurd" value={stats.emailSent} />
            <Kpi icon={CheckCircle2}    color="#10B981" label="Bevestigd" value={stats.confirmed} />
            <Kpi icon={XCircle}         color="#E74C3C" label="Verlopen/mislukt" value={stats.expired + stats.failed} />
          </div>

          {/* ── Progress Bar ─────────────────────────────────── */}
          <div className="bg-white rounded-xl border border-[#E8ECF4] p-5 mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>Voortgang</h3>
              <span className="text-[#6B7B94]" style={{ fontSize: 12 }}>
                {stats.confirmed} van {stats.total} bevestigd ({Math.round((stats.confirmed / Math.max(1, stats.total)) * 100)}%)
              </span>
            </div>
            <div className="h-3 rounded-full bg-[#F0F4FA] overflow-hidden">
              <div className="h-full transition-all"
                   style={{
                     width: `${Math.min(100, (stats.confirmed / Math.max(1, stats.total)) * 100)}%`,
                     background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)',
                   }} />
            </div>
            {stats.lastBatch && (
              <p className="text-[#A0AEC0] mt-3" style={{ fontSize: 11 }}>
                Laatste batch: <span className="font-mono">{stats.lastBatch}</span>
              </p>
            )}
          </div>

          {/* ── Info Panels ──────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <InfoPanel intent="info" title="Hoe migratie werkt">
              <p>1. Legacy CSV van i-Reserve wordt geïmporteerd → status "geïmporteerd".</p>
              <p>2. Systeem stuurt automatisch e-mail met unieke bevestigings-link → "email verstuurd".</p>
              <p>3. Ouder klikt op link → activeert entry → "bevestigd".</p>
              <p>4. Na 30 dagen zonder klik → automatisch "verlopen" (spot vrijgegeven).</p>
            </InfoPanel>
            <InfoPanel intent="success" title="Waarom dit belangrijk is">
              <p>✓ <b>Oorspronkelijke wachtdatum blijft behouden</b> — ouders verliezen geen positie.</p>
              <p>✓ Lijst <b>self-cleaning</b> — alleen serieuze ouders bevestigen.</p>
              <p>✓ Walter's <b>manuele opschoon-werk</b> verdwijnt volledig.</p>
              <p>✓ Automatische matching begint pas nadat parent bevestigt.</p>
            </InfoPanel>
          </div>
        </>
      )}
    </div>
  );
}

function Kpi({ icon: Icon, color, label, value }: {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string; label: string; value: number;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#E8ECF4] p-3 sm:p-4 flex items-center gap-3">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0"
           style={{ background: `${color}14` }}>
        <Icon size={18} color={color} />
      </div>
      <div className="min-w-0">
        <p className="text-[#6B7B94]" style={{ fontSize: 11, fontWeight: 600 }}>{label}</p>
        <p className="text-[#1A1A2E]" style={{ fontSize: 20, fontWeight: 800 }}>{value}</p>
      </div>
    </div>
  );
}

function InfoPanel({ intent, title, children }: {
  intent: 'info' | 'success'; title: string; children: React.ReactNode;
}) {
  const styles = intent === 'success'
    ? { bg: '#ECFDF5', border: '#A7F3D0', text: '#065F46' }
    : { bg: '#EFF6FF', border: '#BFDBFE', text: '#1E40AF' };
  return (
    <div className="rounded-xl border p-5" style={{ background: styles.bg, borderColor: styles.border, color: styles.text }}>
      <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>{title}</h3>
      <div style={{ fontSize: 12, lineHeight: 1.7 }} className="space-y-1">{children}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-xl border border-[#E8ECF4] p-12 text-center">
      <Upload size={48} className="mx-auto mb-4 text-[#CBD5E1]" />
      <h3 className="text-[#1A1A2E] mb-2" style={{ fontSize: 16, fontWeight: 700 }}>Nog geen migratie uitgevoerd</h3>
      <p className="text-[#6B7B94] max-w-md mx-auto" style={{ fontSize: 13 }}>
        De legacy i-Reserve wachtlijst is nog niet geïmporteerd. Zodra de CSV-import wordt uitgevoerd via de admin-tools, verschijnen hier de statistieken en voortgang.
      </p>
      <div className="mt-6 flex items-center justify-center gap-2 text-[#A0AEC0]" style={{ fontSize: 11 }}>
        <AlertTriangle size={12} />
        <span>Vraag de developer om de import-script te draaien.</span>
      </div>
    </div>
  );
}

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  MapPin, Users, ListChecks, Waves, ArrowRightLeft, Trash2, Settings2,
  Search, Filter, RefreshCw, ChevronDown, ChevronRight, X, AlertTriangle,
  Download, Plus, Eye, Clock, CheckCircle2, Info, Calendar, Timer,
  ArrowLeft, Mail, Phone,
} from 'lucide-react';
import {
  fetchWaitlistLocations, fetchLocationWaitlist,
  convertWaitlistEntryType, deleteWaitlistEntry, updateWaitlistEntry,
  WAITLIST_LESSON_TYPE_LABELS,
  type WaitlistLocation, type AdvancedWaitlistEntry, type LocationWaitlistBuckets,
  type WaitlistListType, type WaitlistStatus, type WaitlistLessonType,
  type AvailabilityGrid, type AvailabilityDay, type AvailabilityWindow,
} from '../../../lib/data/admin-repository';

interface Props {
  showToast: (msg: string) => void;
}

type QueueKind = 'preference' | 'waiting' | 'ready' | 'survival';

const QUEUE_META: Record<QueueKind, { label: string; icon: any; description: string; colour: string; bucket: keyof LocationWaitlistBuckets }> = {
  preference: {
    label: 'Voorkeurslijst',
    icon: ListChecks,
    description: 'Wachtenden op de algemene lijst — nog niet officieel geregistreerd.',
    colour: '#8B5CF6',
    bucket: 'preferenceList',
  },
  waiting: {
    label: 'Wachtlijst',
    icon: Users,
    description: 'Officiële wachtenden — €30 betaald, wachten op een plek.',
    colour: '#0365C4',
    bucket: 'waitingList',
  },
  ready: {
    label: 'Klaar voor lessen',
    icon: CheckCircle2,
    description: 'Plek toegewezen — wachten op eerste les.',
    colour: '#10B981',
    bucket: 'readyForLessons',
  },
  survival: {
    label: 'Survival zwemmen',
    icon: Waves,
    description: 'Mini Survival wachtlijst — apart programma voor jongere kinderen.',
    colour: '#F59E0B',
    bucket: 'survival',
  },
};

/// Premium admin waitlist management. Layout matches Walter's i-Reserve
/// system (per-location tabs, queue segments) but with modern polish:
/// portal dropdowns, live filters, colour-coded status, responsive design.
export function WaitlistManagement({ showToast }: Props) {
  const [locations, setLocations] = useState<WaitlistLocation[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [activeQueue, setActiveQueue] = useState<QueueKind>('waiting');
  const [buckets, setBuckets] = useState<LocationWaitlistBuckets | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<WaitlistStatus | ''>('');
  const [lessonTypeFilter, setLessonTypeFilter] = useState<WaitlistLessonType | ''>('');
  const [editEntry, setEditEntry] = useState<AdvancedWaitlistEntry | null>(null);
  const [availabilityEntry, setAvailabilityEntry] = useState<AdvancedWaitlistEntry | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<AdvancedWaitlistEntry | null>(null);
  const [confirmConvert, setConfirmConvert] = useState<{ entry: AdvancedWaitlistEntry; target: WaitlistListType } | null>(null);

  // ── Boot: load locations, pick first with waitlist entries ─────────────
  useEffect(() => {
    (async () => {
      setLoading(true);
      const locs = await fetchWaitlistLocations();
      setLocations(locs);
      const withData = locs.find(l => l.totalWaiting + l.totalMiniSurvival + l.totalReady > 0);
      setSelectedLocationId((withData ?? locs[0])?.id ?? null);
      setLoading(false);
    })();
  }, []);

  // ── Load buckets when location changes ─────────────────────────────────
  useEffect(() => {
    if (!selectedLocationId) return;
    (async () => {
      setRefreshing(true);
      const b = await fetchLocationWaitlist(selectedLocationId);
      setBuckets(b);
      setRefreshing(false);
    })();
  }, [selectedLocationId]);

  async function reload() {
    if (!selectedLocationId) return;
    setRefreshing(true);
    const [locs, b] = await Promise.all([
      fetchWaitlistLocations(),
      fetchLocationWaitlist(selectedLocationId),
    ]);
    setLocations(locs);
    setBuckets(b);
    setRefreshing(false);
  }

  // ── Handlers ──────────────────────────────────────────────────────────
  async function handleConvert(entry: AdvancedWaitlistEntry, target: WaitlistListType) {
    setConfirmConvert(null);
    const res = await convertWaitlistEntryType(entry.id, target);
    if (!res.ok) { showToast(`❌ ${res.error ?? 'Conversie mislukt'}`); return; }
    showToast(`✅ Ingevoerd in ${target === 'mini_survival' ? 'Survival' : target === 'official' ? 'Officiële lijst' : 'Voorkeurslijst'}`);
    void reload();
  }
  async function handleDelete(entry: AdvancedWaitlistEntry) {
    setConfirmDelete(null);
    const res = await deleteWaitlistEntry(entry.id);
    if (!res.ok) { showToast(`❌ ${res.error ?? 'Verwijderen mislukt'}`); return; }
    showToast('✅ Verwijderd');
    void reload();
  }

  // ── Filter + search current bucket ────────────────────────────────────
  const currentBucketKey = QUEUE_META[activeQueue].bucket;
  const currentEntries: AdvancedWaitlistEntry[] = buckets?.[currentBucketKey] ?? [];
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return currentEntries.filter(e => {
      if (statusFilter && e.status !== statusFilter) return false;
      if (lessonTypeFilter && e.lessonType !== lessonTypeFilter) return false;
      if (!q) return true;
      return (
        e.childFirstName.toLowerCase().includes(q) ||
        e.childLastName.toLowerCase().includes(q) ||
        e.parentFirstName.toLowerCase().includes(q) ||
        e.parentLastName.toLowerCase().includes(q) ||
        e.parentEmail.toLowerCase().includes(q) ||
        (e.parentPhone ?? '').toLowerCase().includes(q)
      );
    });
  }, [currentEntries, search, statusFilter, lessonTypeFilter]);

  const selectedLocation = locations.find(l => l.id === selectedLocationId) ?? null;

  return (
    <div>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 sm:mb-6">
        <div className="min-w-0">
          <h1 className="text-[#1A1A2E] flex items-center gap-2" style={{ fontSize: 22, fontWeight: 700 }}>
            <ListChecks size={22} className="text-[#0365C4]" /> Wachtlijst beheer
          </h1>
          <p className="text-[#6B7B94] mt-0.5 hidden sm:block" style={{ fontSize: 13 }}>
            Automatisch gematcht op basis van originele registratiedatum. Beheer per locatie en per wachtrij.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={reload} disabled={refreshing}
                  className="p-2.5 rounded-xl bg-white border border-[#E8ECF4] text-[#6B7B94] hover:bg-[#F8FAFC] disabled:opacity-50"
                  title="Vernieuwen">
            <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
          </button>
          <ExportButton entries={filtered} location={selectedLocation?.name ?? ''} queue={activeQueue} />
        </div>
      </div>

      {loading ? (
        <div className="p-16 text-center text-[#A0AEC0]">Wachtlijst laden…</div>
      ) : locations.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E8ECF4] p-16 text-center">
          <MapPin size={40} className="mx-auto mb-3 text-[#CBD5E1]" />
          <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Geen locaties gevonden</p>
          <p className="text-[#A0AEC0] mt-1" style={{ fontSize: 12 }}>Voeg locaties toe onder Locaties.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
          {/* ── Location sidebar ─────────────────────────────── */}
          <div className="bg-white rounded-xl border border-[#E8ECF4] overflow-hidden self-start">
            <div className="p-3 border-b border-[#F0F4FA] flex items-center gap-2">
              <MapPin size={14} className="text-[#0365C4]" />
              <span className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 700 }}>Locaties</span>
            </div>
            <div className="divide-y divide-[#F0F4FA] max-h-[480px] lg:max-h-[calc(100vh-320px)] overflow-y-auto">
              {locations.map(loc => {
                const active = loc.id === selectedLocationId;
                const total = loc.totalWaiting + loc.totalMiniSurvival + loc.totalReady;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocationId(loc.id)}
                    className={`w-full text-left p-3 hover:bg-[#F8FAFC] transition-colors flex items-center justify-between gap-2 ${active ? 'bg-[#EFF6FF]' : ''}`}>
                    <div className="min-w-0">
                      <div className={`truncate ${active ? 'text-[#0365C4]' : 'text-[#1A1A2E]'}`}
                           style={{ fontSize: 13, fontWeight: active ? 700 : 500 }}>
                        {loc.name}
                      </div>
                      <div className="text-[#A0AEC0] mt-0.5" style={{ fontSize: 10 }}>
                        {total} {total === 1 ? 'wachtende' : 'wachtenden'}
                        {loc.supportsMinsSurvival && ' · Mini Survival'}
                      </div>
                    </div>
                    <ChevronRight size={14} className={active ? 'text-[#0365C4]' : 'text-[#CBD5E1]'} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Main area ────────────────────────────────────── */}
          <div className="min-w-0">
            {selectedLocation && (
              <>
                {/* ── Info banners (like Walter's original UI) ── */}
                <InfoBanners location={selectedLocation} />

                {/* ── Queue segment tabs ─────────────────────── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
                  {(['preference', 'waiting', 'ready', 'survival'] as QueueKind[]).map(q => {
                    const meta = QUEUE_META[q];
                    const Icon = meta.icon;
                    const count = buckets?.[meta.bucket]?.length ?? 0;
                    const active = q === activeQueue;
                    return (
                      <button
                        key={q}
                        onClick={() => setActiveQueue(q)}
                        className={`p-3 rounded-xl border transition-all text-left ${active ? 'bg-white shadow-md' : 'bg-white/50 hover:bg-white'}`}
                        style={{ borderColor: active ? meta.colour : '#E8ECF4' }}>
                        <div className="flex items-center gap-2 mb-1">
                          <Icon size={14} style={{ color: meta.colour }} />
                          <span className="text-[#6B7B94]" style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                            {meta.label}
                          </span>
                        </div>
                        <div className="text-[#1A1A2E]" style={{ fontSize: 22, fontWeight: 800 }}>{count}</div>
                      </button>
                    );
                  })}
                </div>

                {/* ── Filter bar ─────────────────────────────── */}
                <div className="bg-white rounded-xl border border-[#E8ECF4] p-3 mb-3 flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]" />
                    <input
                      type="text" value={search} onChange={e => setSearch(e.target.value)}
                      placeholder="Zoek op naam, e-mail of telefoon…"
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] outline-none focus:border-[#00C1FF]"
                      style={{ fontSize: 13 }}
                    />
                  </div>
                  <FilterSelect value={statusFilter} onChange={v => setStatusFilter(v as WaitlistStatus | '')}
                                icon={Info} placeholder="Alle statussen"
                                options={[
                                  { value: '', label: 'Alle statussen' },
                                  { value: 'no_status', label: 'Geen status' },
                                  { value: 'active', label: 'Actief' },
                                  { value: 'paused', label: 'Gepauzeerd' },
                                  { value: 'cancelled', label: 'Geannuleerd' },
                                  { value: 'placed', label: 'Geplaatst' },
                                ]} />
                  <FilterSelect value={lessonTypeFilter} onChange={v => setLessonTypeFilter(v as WaitlistLessonType | '')}
                                icon={Filter} placeholder="Alle lestypes"
                                options={[
                                  { value: '', label: 'Alle lestypes' },
                                  ...(Object.entries(WAITLIST_LESSON_TYPE_LABELS).map(([v, l]) => ({ value: v, label: l }))),
                                ]} />
                </div>

                {/* ── Table ─────────────────────────────────── */}
                <div className="bg-white rounded-xl border border-[#E8ECF4] overflow-hidden">
                  {filtered.length === 0 ? (
                    <div className="p-12 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>
                      {refreshing ? 'Laden…' : 'Geen wachtenden in deze wachtrij.'}
                    </div>
                  ) : (
                    <>
                      {/* Desktop table */}
                      <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full" style={{ fontSize: 13 }}>
                          <thead>
                            <tr className="bg-[#F8FAFC] border-b border-[#E8ECF4]">
                              <Th>POSITIE</Th>
                              <Th>WACHT SINDS</Th>
                              <Th>KIND</Th>
                              <Th>OUDER</Th>
                              <Th>CONTACT</Th>
                              <Th>LESTYPE</Th>
                              <Th>STATUS</Th>
                              <th className="text-right px-3 py-3 text-[#6B7B94]" style={{ fontWeight: 600, fontSize: 10 }}>ACTIES</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filtered.map(e => (
                              <EntryRow key={e.id} entry={e}
                                        onEdit={() => setEditEntry(e)}
                                        onAvailability={() => setAvailabilityEntry(e)}
                                        onDelete={() => setConfirmDelete(e)}
                                        onConvert={t => setConfirmConvert({ entry: e, target: t })}
                                        activeQueue={activeQueue} />
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile cards */}
                      <div className="lg:hidden divide-y divide-[#F0F4FA]">
                        {filtered.map(e => (
                          <EntryCard key={e.id} entry={e}
                                     onEdit={() => setEditEntry(e)}
                                     onAvailability={() => setAvailabilityEntry(e)}
                                     onDelete={() => setConfirmDelete(e)}
                                     onConvert={t => setConfirmConvert({ entry: e, target: t })}
                                     activeQueue={activeQueue} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Modals ─────────────────────────────────────────────────── */}
      {editEntry && (
        <EditEntryModal entry={editEntry}
                        onClose={() => setEditEntry(null)}
                        onSaved={() => { setEditEntry(null); void reload(); showToast('✅ Opgeslagen'); }}
                        showToast={showToast} />
      )}
      {availabilityEntry && (
        <AvailabilityViewModal entry={availabilityEntry} onClose={() => setAvailabilityEntry(null)} />
      )}
      {confirmDelete && (
        <ConfirmModal
          intent="danger" title="Verwijderen?"
          body={`Weet u zeker dat u ${confirmDelete.childFirstName} ${confirmDelete.childLastName} van de wachtlijst wilt verwijderen? De originele registratiedatum gaat verloren.`}
          confirmLabel="Verwijderen"
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => handleDelete(confirmDelete)} />
      )}
      {confirmConvert && (
        <ConfirmModal
          intent="warn" title="Wachtrij wisselen?"
          body={`Verplaats ${confirmConvert.entry.childFirstName} ${confirmConvert.entry.childLastName} naar de ${QUEUE_META[
            confirmConvert.target === 'mini_survival' ? 'survival'
            : confirmConvert.target === 'official' ? 'waiting'
            : 'preference'
          ].label}. De originele wachtdatum blijft behouden.`}
          confirmLabel="Verplaatsen"
          onCancel={() => setConfirmConvert(null)}
          onConfirm={() => handleConvert(confirmConvert.entry, confirmConvert.target)} />
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//   Sub-components
// ══════════════════════════════════════════════════════════════════════════

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left px-3 py-3 text-[#6B7B94] whitespace-nowrap" style={{ fontWeight: 600, fontSize: 10 }}>{children}</th>;
}

function InfoBanners({ location }: { location: WaitlistLocation }) {
  return (
    <div className="space-y-2 mb-4">
      <div className="p-3 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] flex items-start gap-2" style={{ fontSize: 12 }}>
        <Info size={14} className="mt-0.5 shrink-0" />
        <span>
          Dit overzicht toont alle actieve wachtenden voor <b>{location.name}</b>. Wachtenden worden gesorteerd op originele registratiedatum.
        </span>
      </div>
      <div className="p-3 rounded-lg bg-[#FFF7ED] border border-[#FFEDD5] text-[#9A3412] flex items-start gap-2" style={{ fontSize: 12 }}>
        <Timer size={14} className="mt-0.5 shrink-0" />
        <span>
          Wijzigingen en notificaties worden <b>real-time</b> verwerkt (geen 5-minuten vertraging meer). Wanneer een spot vrijkomt, worden alle matchende ouders direct gebeld/genotificeerd.
        </span>
      </div>
    </div>
  );
}

interface EntryActionProps {
  entry: AdvancedWaitlistEntry;
  activeQueue: QueueKind;
  onEdit: () => void;
  onAvailability: () => void;
  onDelete: () => void;
  onConvert: (target: WaitlistListType) => void;
}

function EntryRow(p: EntryActionProps) {
  const e = p.entry;
  const rowBg = e.status === 'placed' ? '#ECFDF5'
              : e.status === 'paused' ? '#FEF3C7'
              : e.status === 'cancelled' ? '#FEF2F2'
              : 'transparent';
  return (
    <tr className="border-b border-[#F0F4FA] hover:bg-[#F8FAFC]" style={{ background: rowBg }}>
      <td className="px-3 py-3 text-[#0365C4]" style={{ fontWeight: 700 }}>#{e.position}</td>
      <td className="px-3 py-3 text-[#6B7B94]" style={{ fontSize: 11 }}>
        {formatDateNL(e.generalRegistrationDate)}
      </td>
      <td className="px-3 py-3">
        <div className="text-[#1A1A2E]" style={{ fontWeight: 600 }}>{e.childFirstName} {e.childLastName}</div>
        {e.secondChildFirstName && (
          <div className="text-[#6B7B94]" style={{ fontSize: 11 }}>+ {e.secondChildFirstName} {e.secondChildLastName}</div>
        )}
        {e.childDateOfBirth && (
          <div className="text-[#A0AEC0]" style={{ fontSize: 11 }}>{formatAgeNL(e.childDateOfBirth)}</div>
        )}
      </td>
      <td className="px-3 py-3 text-[#1A1A2E]">{e.parentFirstName} {e.parentLastName}</td>
      <td className="px-3 py-3">
        {e.parentPhone && <div className="text-[#6B7B94]" style={{ fontSize: 11 }}>{e.parentPhone}</div>}
        {e.parentEmail && <a href={`mailto:${e.parentEmail}`} className="text-[#0365C4] hover:underline" style={{ fontSize: 11 }}>{e.parentEmail}</a>}
      </td>
      <td className="px-3 py-3">
        <span className="px-2 py-1 rounded-md bg-[#EFF6FF] text-[#1E40AF]" style={{ fontSize: 11, fontWeight: 600 }}>
          {e.lessonType ? WAITLIST_LESSON_TYPE_LABELS[e.lessonType] : 'Geen voorkeur'}
        </span>
      </td>
      <td className="px-3 py-3"><StatusPill status={e.status} /></td>
      <td className="px-3 py-3 text-right whitespace-nowrap">
        <ActionMenu {...p} />
      </td>
    </tr>
  );
}

function EntryCard(p: EntryActionProps) {
  const e = p.entry;
  return (
    <div className="p-4 hover:bg-[#F8FAFC]">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-1.5 py-0.5 rounded bg-[#EFF6FF] text-[#0365C4]" style={{ fontSize: 11, fontWeight: 700 }}>#{e.position}</span>
            <span className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{e.childFirstName} {e.childLastName}</span>
          </div>
          <div className="text-[#6B7B94] truncate" style={{ fontSize: 12 }}>{e.parentFirstName} {e.parentLastName}</div>
          <div className="mt-1 flex items-center gap-2 flex-wrap">
            <StatusPill status={e.status} />
            <span className="px-2 py-0.5 rounded bg-[#EFF6FF] text-[#1E40AF]" style={{ fontSize: 10, fontWeight: 600 }}>
              {e.lessonType ? WAITLIST_LESSON_TYPE_LABELS[e.lessonType] : 'Geen voorkeur'}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-3 text-[#6B7B94]" style={{ fontSize: 11 }}>
            {e.parentPhone && <span className="inline-flex items-center gap-1"><Phone size={10}/>{e.parentPhone}</span>}
            {e.parentEmail && <span className="inline-flex items-center gap-1 truncate"><Mail size={10}/>{e.parentEmail}</span>}
          </div>
          <div className="mt-1 text-[#A0AEC0]" style={{ fontSize: 10 }}>Wacht sinds {formatDateNL(e.generalRegistrationDate)}</div>
        </div>
        <ActionMenu {...p} />
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: WaitlistStatus }) {
  const meta: Record<WaitlistStatus, { label: string; bg: string; fg: string }> = {
    no_status:  { label: 'Geen status',  bg: '#F3F4F6', fg: '#6B7280' },
    active:     { label: 'Actief',       bg: '#ECFDF5', fg: '#065F46' },
    paused:     { label: 'Gepauzeerd',   bg: '#FEF3C7', fg: '#92400E' },
    cancelled:  { label: 'Geannuleerd',  bg: '#FEF2F2', fg: '#991B1B' },
    placed:     { label: 'Geplaatst',    bg: '#ECFDF5', fg: '#065F46' },
  };
  const m = meta[status];
  return (
    <span className="px-2 py-1 rounded-full inline-flex items-center gap-1"
          style={{ background: m.bg, color: m.fg, fontSize: 11, fontWeight: 600 }}>
      {m.label}
    </span>
  );
}

function ActionMenu({ entry, activeQueue, onEdit, onAvailability, onDelete, onConvert }: EntryActionProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button ref={btnRef} onClick={() => setOpen(o => !o)}
              className="p-2 rounded-lg hover:bg-[#F0F4FA] text-[#6B7B94]" title="Acties">
        <Settings2 size={15} />
      </button>
      <Popover open={open} onClose={() => setOpen(false)} anchor={btnRef} align="end" width={220}>
        <ActionItem icon={Settings2} label="Bewerken" onClick={() => { setOpen(false); onEdit(); }} />
        <ActionItem icon={Calendar} label="Beschikbaarheid" onClick={() => { setOpen(false); onAvailability(); }} />
        <div className="h-px bg-[#F0F4FA] my-1" />
        {activeQueue !== 'survival' && (
          <ActionItem icon={ArrowRightLeft} label="→ Survival" color="#F59E0B"
                      onClick={() => { setOpen(false); onConvert('mini_survival'); }} />
        )}
        {activeQueue === 'survival' && (
          <ActionItem icon={ArrowRightLeft} label="→ Voorkeurslijst" color="#0365C4"
                      onClick={() => { setOpen(false); onConvert('general'); }} />
        )}
        {entry.listType !== 'official' && (
          <ActionItem icon={CheckCircle2} label="→ Officiële lijst" color="#0365C4"
                      onClick={() => { setOpen(false); onConvert('official'); }} />
        )}
        <div className="h-px bg-[#F0F4FA] my-1" />
        <ActionItem icon={Trash2} label="Verwijderen" color="#E74C3C"
                    onClick={() => { setOpen(false); onDelete(); }} />
      </Popover>
    </>
  );
}

function ActionItem({ icon: Icon, label, color = '#1A1A2E', onClick }: {
  icon: any; label: string; color?: string; onClick: () => void;
}) {
  return (
    <button onClick={onClick}
            className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-[#F8FAFC]"
            style={{ color, fontSize: 12, fontWeight: 500 }}>
      <Icon size={14} color={color} /> {label}
    </button>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//   Filter select (matches the RolePicker portal pattern)
// ══════════════════════════════════════════════════════════════════════════

function FilterSelect({ value, onChange, options, placeholder, icon: Icon }: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  icon: any;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const current = options.find(o => o.value === value)?.label ?? placeholder;
  return (
    <>
      <button ref={btnRef} onClick={() => setOpen(o => !o)}
              className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] text-[#1A1A2E] hover:bg-[#F0F4FA] min-w-[180px]"
              style={{ fontSize: 13 }}>
        <span className="inline-flex items-center gap-2"><Icon size={14} className="text-[#A0AEC0]" /> {current}</span>
        <ChevronDown size={14} className="text-[#A0AEC0]" />
      </button>
      <Popover open={open} onClose={() => setOpen(false)} anchor={btnRef} align="start" width={220} maxHeight={320}>
        {options.map(o => (
          <button key={o.value} onClick={() => { onChange(o.value); setOpen(false); }}
                  className={`w-full text-left px-3 py-2 hover:bg-[#F8FAFC] ${o.value === value ? 'bg-[#EFF6FF]' : ''}`}
                  style={{ fontSize: 12, color: o.value === value ? '#0365C4' : '#1A1A2E', fontWeight: o.value === value ? 600 : 500 }}>
            {o.label}
          </button>
        ))}
      </Popover>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//   Export button — CSV download
// ══════════════════════════════════════════════════════════════════════════

function ExportButton({ entries, location, queue }: {
  entries: AdvancedWaitlistEntry[]; location: string; queue: QueueKind;
}) {
  async function handle() {
    if (!entries.length) return;
    const { exportToXlsx } = await import('../../../lib/utils/xlsx-export');
    await exportToXlsx({
      filename: `wachtlijst_${location}_${queue}_${new Date().toISOString().slice(0,10)}.xlsx`,
      sheetName: 'Wachtlijst',
      title: `${location} — ${QUEUE_META[queue].label}`,
      columns: [
        { header: 'Positie', value: 'position', width: 8 },
        { header: 'Wacht sinds', value: e => formatDateNL(e.generalRegistrationDate), width: 20 },
        { header: 'Kind', value: e => `${e.childFirstName} ${e.childLastName}`, width: 24 },
        { header: 'Geboortedatum', value: e => e.childDateOfBirth ?? '', width: 14 },
        { header: 'Ouder', value: e => `${e.parentFirstName} ${e.parentLastName}`, width: 24 },
        { header: 'Telefoon', value: 'parentPhone', width: 16 },
        { header: 'E-mail', value: 'parentEmail', width: 30 },
        { header: 'Lestype', value: e => e.lessonType ? WAITLIST_LESSON_TYPE_LABELS[e.lessonType] : '', width: 20 },
        { header: 'Status', value: 'status', width: 14 },
      ],
      rows: entries,
    });
  }
  return (
    <button onClick={handle} disabled={!entries.length}
            className="px-3 py-2.5 rounded-xl bg-white border border-[#E8ECF4] text-[#1A1A2E] hover:bg-[#F8FAFC] disabled:opacity-50 flex items-center gap-2"
            style={{ fontSize: 13, fontWeight: 600 }}>
      <Download size={14} /> <span className="hidden sm:inline">Exporteren</span>
    </button>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//   Edit entry modal — full form
// ══════════════════════════════════════════════════════════════════════════

function EditEntryModal({ entry, onClose, onSaved, showToast }: {
  entry: AdvancedWaitlistEntry; onClose: () => void; onSaved: () => void; showToast: (m: string) => void;
}) {
  const [form, setForm] = useState({
    lessonType: (entry.lessonType ?? 'no_preference') as WaitlistLessonType,
    status: entry.status,
    listType: entry.listType,
    waitingSince: entry.generalRegistrationDate?.slice(0, 16) ?? '',
    comment: entry.comment ?? '',
    internalNote: entry.internalNote ?? '',
    waterFreeRating: entry.waterFreeRating ?? 3,
    secondChildFirstName: entry.secondChildFirstName ?? '',
    secondChildLastName: entry.secondChildLastName ?? '',
    secondChildDob: entry.secondChildDob ?? '',
    secondChildParentPhone: entry.secondChildParentPhone ?? '',
    secondChildParentEmail: entry.secondChildParentEmail ?? '',
  });
  const [days, setDays] = useState<Set<number>>(new Set([1, 2, 3, 4, 5])); // TODO wire from entry
  const [saving, setSaving] = useState(false);

  const toggleDay = (d: number) => setDays(prev => {
    const next = new Set(prev);
    if (next.has(d)) next.delete(d); else next.add(d);
    return next;
  });

  async function handleSave() {
    setSaving(true);
    const res = await updateWaitlistEntry(entry.id, {
      lessonType: form.lessonType,
      status: form.status,
      listType: form.listType,
      preferredDays: Array.from(days).sort(),
      waitingSince: form.waitingSince ? new Date(form.waitingSince).toISOString() : undefined,
      comment: form.comment,
      internalNote: form.internalNote,
      waterFreeRating: form.waterFreeRating,
      secondChildFirstName: form.secondChildFirstName || null,
      secondChildLastName: form.secondChildLastName || null,
      secondChildDob: form.secondChildDob || null,
      secondChildParentPhone: form.secondChildParentPhone || null,
      secondChildParentEmail: form.secondChildParentEmail || null,
    });
    setSaving(false);
    if (!res.ok) { showToast(`❌ ${res.error ?? 'Opslaan mislukt'}`); return; }
    onSaved();
  }

  return (
    <ModalShell onClose={onClose}
                title={`Bewerken: ${entry.childFirstName} ${entry.childLastName}`}
                subtitle={`Positie #${entry.position} · Wacht sinds ${formatDateNL(entry.generalRegistrationDate)}`}
                maxWidth="lg">
      <div className="space-y-4">
        <Section title="Basis">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Wacht sinds">
              <input type="datetime-local" value={form.waitingSince}
                     onChange={e => setForm(f => ({ ...f, waitingSince: e.target.value }))}
                     className={inputCls} />
            </Field>
            <Field label="Status">
              <select value={form.status}
                      onChange={e => setForm(f => ({ ...f, status: e.target.value as WaitlistStatus }))}
                      className={inputCls}>
                <option value="no_status">Geen status</option>
                <option value="active">Actief</option>
                <option value="paused">Gepauzeerd</option>
                <option value="cancelled">Geannuleerd</option>
                <option value="placed">Geplaatst</option>
              </select>
            </Field>
          </div>
        </Section>

        <Section title="Lestype">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {(Object.keys(WAITLIST_LESSON_TYPE_LABELS) as WaitlistLessonType[]).map(t => (
              <label key={t} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E8ECF4] hover:bg-[#F8FAFC] cursor-pointer"
                     style={{ fontSize: 13 }}>
                <input type="radio" checked={form.lessonType === t}
                       onChange={() => setForm(f => ({ ...f, lessonType: t }))}
                       className="text-[#0365C4]" />
                {WAITLIST_LESSON_TYPE_LABELS[t]}
              </label>
            ))}
          </div>
        </Section>

        <Section title="Voorkeurdagen">
          <div className="flex flex-wrap gap-2">
            {[
              { d: 1, label: 'Ma' }, { d: 2, label: 'Di' }, { d: 3, label: 'Wo' },
              { d: 4, label: 'Do' }, { d: 5, label: 'Vr' }, { d: 6, label: 'Za' }, { d: 0, label: 'Zo' },
            ].map(({ d, label }) => (
              <button key={d} onClick={() => toggleDay(d)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${days.has(d)
                        ? 'bg-[#0365C4] text-white border-[#0365C4]'
                        : 'bg-white text-[#1A1A2E] border-[#E8ECF4] hover:bg-[#F8FAFC]'}`}
                      style={{ fontSize: 13, fontWeight: 600, minWidth: 56 }}>
                {label}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Waterfree niveau (1-5)">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(r => (
              <button key={r} onClick={() => setForm(f => ({ ...f, waterFreeRating: r }))}
                      className={`px-4 py-2 rounded-lg border ${form.waterFreeRating === r ? 'bg-[#00C1FF] text-white border-[#00C1FF]' : 'bg-white border-[#E8ECF4] text-[#1A1A2E] hover:bg-[#F8FAFC]'}`}
                      style={{ fontSize: 13, fontWeight: 600, minWidth: 48 }}>
                {'💧'.repeat(r)}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Tweede kind (optioneel)">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Voornaam">
              <input value={form.secondChildFirstName}
                     onChange={e => setForm(f => ({ ...f, secondChildFirstName: e.target.value }))}
                     className={inputCls} />
            </Field>
            <Field label="Achternaam">
              <input value={form.secondChildLastName}
                     onChange={e => setForm(f => ({ ...f, secondChildLastName: e.target.value }))}
                     className={inputCls} />
            </Field>
            <Field label="Geboortedatum">
              <input type="date" value={form.secondChildDob}
                     onChange={e => setForm(f => ({ ...f, secondChildDob: e.target.value }))}
                     className={inputCls} />
            </Field>
            <Field label="Ouder telefoon">
              <input value={form.secondChildParentPhone}
                     onChange={e => setForm(f => ({ ...f, secondChildParentPhone: e.target.value }))}
                     className={inputCls} />
            </Field>
            <Field label="Ouder e-mail" className="sm:col-span-2">
              <input type="email" value={form.secondChildParentEmail}
                     onChange={e => setForm(f => ({ ...f, secondChildParentEmail: e.target.value }))}
                     className={inputCls} />
            </Field>
          </div>
        </Section>

        <Section title="Notities">
          <div className="space-y-3">
            <Field label="Opmerking (zichtbaar voor ouder)">
              <textarea rows={2} value={form.comment}
                        onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                        className={inputCls} />
            </Field>
            <Field label="Interne notitie (alleen zichtbaar voor admin)">
              <textarea rows={3} value={form.internalNote}
                        onChange={e => setForm(f => ({ ...f, internalNote: e.target.value }))}
                        className={inputCls} />
            </Field>
          </div>
        </Section>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-6 pt-4 border-t border-[#F0F4FA]">
        <button onClick={onClose} className={btnSecondary}>Annuleren</button>
        <button onClick={handleSave} disabled={saving} className={btnPrimary}>
          {saving ? 'Opslaan…' : 'Opslaan'}
        </button>
      </div>
    </ModalShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[#1A1A2E] mb-2" style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{title}</h3>
      {children}
    </div>
  );
}
function Field({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-[#6B7B94] mb-1" style={{ fontSize: 11, fontWeight: 600 }}>{label}</label>
      {children}
    </div>
  );
}

const inputCls = 'w-full px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] outline-none focus:border-[#00C1FF] text-[#1A1A2E]';
const btnPrimary = 'px-4 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-50 inline-flex items-center justify-center gap-2';
const btnSecondary = 'px-4 py-2.5 rounded-xl bg-[#F8FAFC] text-[#6B7B94] hover:bg-[#F0F4FA] text-sm font-semibold';

// ══════════════════════════════════════════════════════════════════════════
//   Availability view modal (read-only grid)
// ══════════════════════════════════════════════════════════════════════════

const DAYS: { key: AvailabilityDay; label: string }[] = [
  { key: 'monday', label: 'Maandag' },
  { key: 'tuesday', label: 'Dinsdag' },
  { key: 'wednesday', label: 'Woensdag' },
  { key: 'thursday', label: 'Donderdag' },
  { key: 'friday', label: 'Vrijdag' },
  { key: 'saturday', label: 'Zaterdag' },
];
const HOURS = Array.from({ length: 19 }, (_, i) => 8 + i * 0.5).filter(h => h >= 9.5 && h <= 18.5);

function AvailabilityViewModal({ entry, onClose }: { entry: AdvancedWaitlistEntry; onClose: () => void }) {
  const grid = entry.availabilityGrid ?? {};
  const isSlotAvailable = (day: AvailabilityDay, hour: number): boolean => {
    const windows: AvailabilityWindow[] = grid[day] ?? [];
    return windows.some(([start, end]) => {
      const s = hoursFromHHMM(start);
      const e = hoursFromHHMM(end);
      return hour >= s && hour < e;
    });
  };
  return (
    <ModalShell onClose={onClose}
                title={`Beschikbaarheid: ${entry.childFirstName} ${entry.childLastName}`}
                subtitle="De ouder heeft aangegeven wanneer ze beschikbaar zijn voor zwemlessen."
                maxWidth="lg">
      <div className="overflow-x-auto">
        <table className="w-full border border-[#E8ECF4] rounded-lg overflow-hidden" style={{ fontSize: 11 }}>
          <thead>
            <tr className="bg-[#F8FAFC]">
              <th className="text-left px-2 py-2 border-r border-[#E8ECF4]" style={{ fontWeight: 700 }}>Tijd</th>
              {DAYS.map(d => (
                <th key={d.key} className="text-center px-2 py-2 border-r border-[#E8ECF4]" style={{ fontWeight: 700 }}>{d.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HOURS.map(h => (
              <tr key={h} className="border-t border-[#F0F4FA]">
                <td className="px-2 py-1.5 border-r border-[#E8ECF4] text-[#6B7B94] whitespace-nowrap">{formatHour(h)}</td>
                {DAYS.map(d => {
                  const on = isSlotAvailable(d.key, h);
                  return (
                    <td key={d.key} className="border-r border-[#E8ECF4]"
                        style={{ background: on ? '#00C1FF' : 'transparent', height: 22 }} />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center gap-4 text-[#6B7B94]" style={{ fontSize: 11 }}>
        <span className="inline-flex items-center gap-2"><span className="w-3 h-3 bg-[#00C1FF] rounded-sm inline-block" /> Beschikbaar</span>
        <span className="inline-flex items-center gap-2"><span className="w-3 h-3 border border-[#E8ECF4] rounded-sm inline-block" /> Niet beschikbaar</span>
      </div>
      <div className="flex justify-end mt-6 pt-4 border-t border-[#F0F4FA]">
        <button onClick={onClose} className={btnSecondary}>Sluiten</button>
      </div>
    </ModalShell>
  );
}

function hoursFromHHMM(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h + m / 60;
}
function formatHour(h: number): string {
  const hi = Math.floor(h);
  const mi = Math.round((h - hi) * 60);
  return `${String(hi).padStart(2,'0')}:${String(mi).padStart(2,'0')}`;
}

// ══════════════════════════════════════════════════════════════════════════
//   Confirm modal
// ══════════════════════════════════════════════════════════════════════════

function ConfirmModal({ intent, title, body, confirmLabel, onCancel, onConfirm }: {
  intent: 'warn' | 'danger'; title: string; body: string; confirmLabel: string;
  onCancel: () => void; onConfirm: () => void;
}) {
  const isDanger = intent === 'danger';
  return (
    <ModalShell onClose={onCancel} title={title} maxWidth="sm">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
             style={{ background: isDanger ? '#FEF2F2' : '#FFF7ED' }}>
          <AlertTriangle size={20} color={isDanger ? '#E74C3C' : '#F59E0B'} />
        </div>
        <p className="text-[#6B7B94]" style={{ fontSize: 13, lineHeight: 1.5 }}>{body}</p>
      </div>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
        <button onClick={onCancel} className={btnSecondary}>Annuleren</button>
        <button onClick={onConfirm} className={btnPrimary}
                style={{ background: isDanger ? '#E74C3C' : '#F59E0B' }}>
          {confirmLabel}
        </button>
      </div>
    </ModalShell>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//   Modal shell (matches AdminUsersView pattern)
// ══════════════════════════════════════════════════════════════════════════

function ModalShell({ children, onClose, title, subtitle, maxWidth = 'md' }: {
  children: React.ReactNode; onClose: () => void; title: string; subtitle?: string;
  maxWidth?: 'sm' | 'md' | 'lg';
}) {
  const wCls = maxWidth === 'sm' ? 'max-w-sm' : maxWidth === 'lg' ? 'max-w-3xl' : 'max-w-lg';
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div className={`w-full ${wCls} rounded-2xl bg-white p-5 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto`}
           onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4 gap-3 pb-4 border-b border-[#F0F4FA]">
          <div className="min-w-0">
            <h2 className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>{title}</h2>
            {subtitle && <p className="text-[#6B7B94] mt-0.5" style={{ fontSize: 12 }}>{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-[#F8FAFC] shrink-0">
            <X size={18} className="text-[#A0AEC0]" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//   Popover — same portal-based pattern used in AdminUsersView
// ══════════════════════════════════════════════════════════════════════════

function Popover({ open, onClose, anchor, align = 'start', width = 220, maxHeight = 360, children }: {
  open: boolean; onClose: () => void;
  anchor: React.RefObject<HTMLElement | null>;
  align?: 'start' | 'end'; width?: number; maxHeight?: number;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useLayoutEffect(() => {
    if (!open) { setPos(null); return; }
    function place() {
      const btn = anchor.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const vpW = window.innerWidth;
      const vpH = window.innerHeight;
      const wantH = Math.min(maxHeight, panelRef.current?.offsetHeight ?? maxHeight);
      const goUp = vpH - rect.bottom < wantH + 8 && rect.top > vpH - rect.bottom;
      const top = goUp ? rect.top - wantH - 4 : rect.bottom + 4;
      let left = align === 'end' ? rect.right - width : rect.left;
      left = Math.max(8, Math.min(left, vpW - width - 8));
      setPos({ top, left });
    }
    place();
    const onScroll = () => onClose();
    const onResize = () => place();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, anchor, align, width, maxHeight, onClose]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t)) return;
      if (anchor.current?.contains(t)) return;
      onClose();
    };
    const id = window.setTimeout(() => document.addEventListener('mousedown', onDown), 0);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open, anchor, onClose]);

  if (!open || !pos) return null;
  return createPortal(
    <div ref={panelRef} className="rounded-xl bg-white border border-[#E8ECF4] py-1 overflow-y-auto"
         style={{
           position: 'fixed', top: pos.top, left: pos.left,
           width, maxHeight, zIndex: 100,
           boxShadow: '0 12px 32px -8px rgba(0,0,0,0.22)',
         }}>
      {children}
    </div>,
    document.body,
  );
}

// ══════════════════════════════════════════════════════════════════════════
//   Utilities
// ══════════════════════════════════════════════════════════════════════════

function formatDateNL(iso: string | null): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch { return ''; }
}
function formatAgeNL(iso: string): string {
  try {
    const d = new Date(iso);
    const now = new Date();
    let years = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) years--;
    return `${years} ${years === 1 ? 'jaar' : 'jaar'}`;
  } catch { return ''; }
}

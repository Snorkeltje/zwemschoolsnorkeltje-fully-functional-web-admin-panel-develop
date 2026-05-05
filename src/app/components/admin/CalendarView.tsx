import { useState, useMemo } from 'react';
import { AdminView } from './AdminLayout';
import {
  Plus, ArrowLeft, ArrowRight, RefreshCw, Calendar as CalIcon,
} from 'lucide-react';
import { useAllReservations, useLocationsList } from '../../../lib/hooks/useAdmin';
import type { AdminReservation } from '../../../lib/data/admin-repository';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl ${className}`} style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.04)', border: '1px solid #E8ECF4' }}>{children}</div>
);

const PageHeader = ({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
    <div>
      <h1 className="text-[#1A1A2E]" style={{ fontSize: 22, fontWeight: 700 }}>{title}</h1>
      {subtitle && <p className="text-[#6B7B94] mt-1" style={{ fontSize: 13 }}>{subtitle}</p>}
    </div>
    {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
  </div>
);

interface CalendarViewProps {
  goTo: (v: AdminView) => void;
  showToast: (msg: string) => void;
  setSelectedReservation: (r: AdminReservation) => void;
}

const TYPE_COLORS: Record<string, string> = {
  '1-op-1': '#0365C4',
  '1-op-2': '#00C1FF',
  '1-op-3': '#27AE60',
  'Survival': '#FF5C00',
  'examen': '#8E44AD',
};

export function CalendarView({ goTo, setSelectedReservation }: CalendarViewProps) {
  const reservations = useAllReservations();
  const locations = useLocationsList();
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [weekOffset, setWeekOffset] = useState(0);

  // Compute Monday-of-this-week (+offset weeks).
  const weekStart = useMemo(() => {
    const d = new Date();
    const day = (d.getDay() + 6) % 7; // Mon=0
    d.setDate(d.getDate() - day + weekOffset * 7);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [weekOffset]);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const hours = Array.from({ length: 12 }, (_, i) => 8 + i); // 08:00 → 19:00

  // Filter reservations to current week + location
  const weekReservations = useMemo(() => {
    const all = reservations.data ?? [];
    const startISO = weekStart.toISOString().slice(0, 10);
    const endDate = new Date(weekStart);
    endDate.setDate(endDate.getDate() + 7);
    const endISO = endDate.toISOString().slice(0, 10);
    return all.filter(r =>
      r.date && r.date >= startISO && r.date < endISO &&
      (!locationFilter || r.location === locationFilter));
  }, [reservations.data, weekStart, locationFilter]);

  const distinctLocations = useMemo(() => {
    const set = new Set<string>();
    for (const r of (reservations.data ?? [])) if (r.location) set.add(r.location);
    for (const l of (locations.data ?? [])) set.add(l.name);
    return Array.from(set).sort();
  }, [reservations.data, locations.data]);

  const getBookingsForCell = (date: Date, hour: number) => {
    const iso = date.toISOString().slice(0, 10);
    return weekReservations.filter(r => {
      if (r.date !== iso) return false;
      const startH = parseInt(r.startTime.split(':')[0]);
      return startH === hour;
    });
  };

  const fmtRange = () => {
    const last = new Date(weekStart);
    last.setDate(last.getDate() + 6);
    const fmt = (d: Date) => d.toLocaleDateString('nl-NL', { day: '2-digit', month: 'short' });
    return `${fmt(weekStart)} – ${fmt(last)}, ${weekStart.getFullYear()}`;
  };

  const stats = {
    total: weekReservations.length,
    confirmed: weekReservations.filter(r => r.status === 'confirmed').length,
    cancelled: weekReservations.filter(r => r.status === 'cancelled').length,
  };

  return (
    <>
      <PageHeader
        title="Kalender (week)"
        subtitle={reservations.loading
          ? 'Laden…'
          : `${stats.total} reserveringen deze week · ${stats.confirmed} bevestigd · ${stats.cancelled} geannuleerd`}
        actions={
          <>
            <button onClick={() => goTo('reservation-new')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white" style={{ background: '#27AE60', fontSize: 13, fontWeight: 600 }}>
              <Plus size={15} /> Nieuwe reservering
            </button>
            <button onClick={() => goTo('roster')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>
              Dag-rooster
            </button>
            <button onClick={() => reservations.refresh()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>
              <RefreshCw size={15} /> Vernieuwen
            </button>
          </>
        }
      />

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button onClick={() => setWeekOffset(0)} className="px-3 py-1.5 rounded-lg border border-[#0365C4] text-[#0365C4]" style={{ fontSize: 12, fontWeight: 600 }}>Vandaag</button>
          <button onClick={() => setWeekOffset(o => o - 1)} className="p-1.5 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"><ArrowLeft size={16} /></button>
          <button onClick={() => setWeekOffset(o => o + 1)} className="p-1.5 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"><ArrowRight size={16} /></button>
          <span className="text-[#1A1A2E] px-2" style={{ fontSize: 14, fontWeight: 600 }}>{fmtRange()}</span>
        </div>
        <div className="flex items-center gap-2">
          <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-[#F4F7FC] border border-[#E8ECF4] text-[#1A1A2E]" style={{ fontSize: 13 }}>
            <option value="">Alle locaties</option>
            {distinctLocations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      <Card className="overflow-x-auto">
        {reservations.loading ? (
          <div className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</div>
        ) : (
          <div style={{ minWidth: 900 }}>
            <div className="grid grid-cols-8 border-b-2 border-[#E5EAF2] sticky top-0 bg-white z-10">
              <div className="p-2 text-center" style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0' }}>UUR</div>
              {weekDays.map((d, i) => {
                const isToday = d.toDateString() === new Date().toDateString();
                const isWeekend = i >= 5;
                return (
                  <div
                    key={i}
                    className="p-3 text-center border-l border-[#F0F4FA]"
                    style={{
                      background: isWeekend ? '#FAFCFF' : 'transparent',
                      borderTop: isToday ? '3px solid #0365C4' : 'none',
                    }}
                  >
                    <p style={{ fontSize: 11, fontWeight: 700, color: isToday ? '#0365C4' : '#A0AEC0', letterSpacing: 0.5 }}>
                      {['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'][i]}
                    </p>
                    <p style={{ fontSize: 16, fontWeight: 800, color: isToday ? '#0365C4' : '#1A1A2E' }}>
                      {d.getDate()}
                    </p>
                  </div>
                );
              })}
            </div>
            {hours.map(h => (
              <div key={h} className="grid grid-cols-8 border-b border-[#F0F4FA]" style={{ minHeight: 64 }}>
                <div className="p-2 text-center text-[#A0AEC0] border-r border-[#F0F4FA]" style={{ fontSize: 11, fontFamily: 'monospace' }}>
                  {String(h).padStart(2, '0')}:00
                </div>
                {weekDays.map((d, i) => {
                  const cell = getBookingsForCell(d, h);
                  const isWeekend = i >= 5;
                  return (
                    <div key={i} className="p-1 border-l border-[#F0F4FA]" style={{ background: isWeekend ? '#FAFCFF' : 'transparent' }}>
                      {cell.map(r => {
                        const color = TYPE_COLORS[r.type] || '#0365C4';
                        return (
                          <div
                            key={r.id}
                            onClick={() => { setSelectedReservation(r); goTo('reservation-detail'); }}
                            className="rounded p-1.5 mb-1 cursor-pointer hover:scale-[1.02] transition-transform"
                            style={{ background: `${color}18`, borderLeft: `3px solid ${color}` }}
                            title={`${r.childName} · ${r.location} · ${r.startTime}-${r.endTime}`}
                          >
                            <p style={{ fontSize: 11, fontWeight: 700, color, lineHeight: 1.2 }}>
                              {r.startTime}–{r.endTime}
                            </p>
                            <p className="text-[#1A1A2E]" style={{ fontSize: 11, fontWeight: 600, lineHeight: 1.2 }}>
                              {r.childName}
                            </p>
                            <p className="text-[#6B7B94]" style={{ fontSize: 10, lineHeight: 1.1 }}>
                              {r.type} · {r.location}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </Card>

      {!reservations.loading && weekReservations.length === 0 && (
        <div className="text-center mt-4 text-[#A0AEC0]" style={{ fontSize: 12 }}>
          <CalIcon size={32} className="mx-auto mb-2 text-[#C4CDD9]" />
          Geen reserveringen in deze week
        </div>
      )}
    </>
  );
}

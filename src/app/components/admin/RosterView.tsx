import { useState, useMemo } from 'react';
import { AdminView } from './AdminLayout';
import { Plus, ArrowLeft, ArrowRight, Download, RefreshCw, Calendar as CalIcon } from 'lucide-react';
import { useAllReservations } from '../../../lib/hooks/useAdmin';
import type { AdminReservation } from '../../../lib/data/admin-repository';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl ${className}`} style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.04)', border: '1px solid #E8ECF4' }}>{children}</div>
);

const PageHeader = ({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
    <div>
      <h1 className="text-[#1A1A2E]" style={{ fontSize: 22, fontWeight: 700 }}>{title}</h1>
      {subtitle && <p className="text-[#6B7B94] mt-0.5" style={{ fontSize: 13 }}>{subtitle}</p>}
    </div>
    {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, { bg: string; text: string }> = {
    'confirmed': { bg: '#ECFDF5', text: '#065F46' },
    'pending':   { bg: '#FFF7ED', text: '#9A3412' },
    'completed': { bg: '#EFF6FF', text: '#1E40AF' },
    'cancelled': { bg: '#FEE2E2', text: '#991B1B' },
  };
  const c = colors[status] || { bg: '#F3F4F6', text: '#6B7280' };
  return <span className="px-1.5 py-0.5 rounded-full" style={{ background: c.bg, color: c.text, fontSize: 9, fontWeight: 700 }}>{status}</span>;
};

const TYPE_COLORS: Record<string, string> = {
  '1-op-1': '#0365C4', '1-op-2': '#00C1FF', '1-op-3': '#27AE60', 'Survival': '#FF5C00', 'examen': '#8E44AD',
};

interface RosterViewProps {
  goTo: (v: AdminView) => void;
  showToast: (msg: string) => void;
  setSelectedReservation: (r: AdminReservation) => void;
}

export function RosterView({ goTo, showToast, setSelectedReservation }: RosterViewProps) {
  const reservations = useAllReservations();
  const [weekOffset, setWeekOffset] = useState(0);

  // Monday-of-the-week
  const weekStart = useMemo(() => {
    const d = new Date();
    const day = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - day + weekOffset * 7);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [weekOffset]);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const filtered = useMemo(() => {
    const all = reservations.data ?? [];
    const startISO = weekStart.toISOString().slice(0, 10);
    const endDate = new Date(weekStart);
    endDate.setDate(endDate.getDate() + 7);
    const endISO = endDate.toISOString().slice(0, 10);
    return all.filter(r => r.date && r.date >= startISO && r.date < endISO);
  }, [reservations.data, weekStart]);

  // Build distinct sorted time slots present in this week
  const timeSlots = useMemo(() => {
    const set = new Set<string>();
    for (const r of filtered) {
      if (r.startTime) set.add(r.startTime.slice(0, 5));
    }
    return Array.from(set).sort();
  }, [filtered]);

  const cellFor = (dateISO: string, time: string) =>
    filtered.filter(r => r.date === dateISO && r.startTime?.slice(0, 5) === time);

  const fmtRange = () => {
    const last = new Date(weekStart);
    last.setDate(last.getDate() + 6);
    const fmt = (d: Date) => d.toLocaleDateString('nl-NL', { day: '2-digit', month: 'short' });
    return `${fmt(weekStart)} – ${fmt(last)}, ${weekStart.getFullYear()}`;
  };

  const exportCSV = () => {
    if (!filtered.length) { showToast('Geen reserveringen om te exporteren'); return; }
    const header = ['Datum', 'Tijd', 'Kind', 'Ouder', 'Type', 'Locatie', 'Instructeur', 'Status'];
    const rows = filtered.map(r => [
      r.date, `${r.startTime}-${r.endTime}`, r.childName, r.customerName,
      r.type, r.location, r.instructorName, r.status,
    ]);
    const csv = [header, ...rows].map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rooster_${weekStart.toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`${filtered.length} reserveringen geëxporteerd`);
  };

  const dayStats = weekDays.map(d => {
    const iso = d.toISOString().slice(0, 10);
    return filtered.filter(r => r.date === iso).length;
  });

  return (
    <>
      <PageHeader
        title="Rooster (week)"
        subtitle={reservations.loading ? 'Laden…' : `${filtered.length} ${filtered.length === 1 ? 'les' : 'lessen'} gepland deze week`}
        actions={
          <div className="flex items-center gap-2">
            <button onClick={() => setWeekOffset(0)} className="px-3 py-1.5 rounded-lg bg-[#0365C4] text-white" style={{ fontSize: 12, fontWeight: 600 }}>Vandaag</button>
            <button onClick={() => setWeekOffset(o => o - 1)} className="p-1.5 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"><ArrowLeft size={16} /></button>
            <span className="text-[#1A1A2E] px-2" style={{ fontSize: 13, fontWeight: 600 }}>{fmtRange()}</span>
            <button onClick={() => setWeekOffset(o => o + 1)} className="p-1.5 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"><ArrowRight size={16} /></button>
            <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 12 }}><Download size={14} /> CSV</button>
            <button onClick={() => reservations.refresh()} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 12 }}><RefreshCw size={14} /> Refresh</button>
          </div>
        }
      />

      <div className="grid grid-cols-7 gap-3 mb-4">
        {weekDays.map((d, i) => {
          const isToday = d.toDateString() === new Date().toDateString();
          const isWeekend = i >= 5;
          return (
            <Card key={i} className="p-3 text-center" style={{ border: isToday ? '2px solid #0365C4' : undefined, background: isWeekend ? '#FAFCFF' : undefined }}>
              <p className="text-[#A0AEC0]" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.4 }}>{['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'][i]}</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: isToday ? '#0365C4' : '#1A1A2E' }}>{d.getDate()}</p>
              <p className="text-[#27AE60]" style={{ fontSize: 11, fontWeight: 700 }}>{dayStats[i]} {dayStats[i] === 1 ? 'les' : 'lessen'}</p>
            </Card>
          );
        })}
      </div>

      <Card className="overflow-x-auto">
        {reservations.loading ? (
          <div className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</div>
        ) : !timeSlots.length ? (
          <div className="py-16 text-center">
            <CalIcon size={36} className="mx-auto mb-3 text-[#C4CDD9]" />
            <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Geen lessen deze week</p>
            <p className="text-[#A0AEC0] mt-1" style={{ fontSize: 12 }}>Klik op + om een nieuwe reservering aan te maken</p>
          </div>
        ) : (
          <div className="min-w-[900px]">
            <div className="grid grid-cols-8 gap-px bg-[#E8ECF4]">
              <div className="bg-[#F8FAFC] p-2.5 text-center" style={{ fontSize: 11, fontWeight: 700, color: '#6B7B94' }}>TIJD</div>
              {weekDays.map((d, i) => {
                const isToday = d.toDateString() === new Date().toDateString();
                return (
                  <div key={i} className="p-2.5 text-center" style={{ background: isToday ? 'rgba(3,101,196,0.05)' : '#F8FAFC' }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: isToday ? '#0365C4' : '#1A1A2E' }}>
                      {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'][i]} {d.getDate()}
                    </p>
                  </div>
                );
              })}
            </div>
            {timeSlots.map(time => (
              <div key={time} className="grid grid-cols-8 gap-px bg-[#F0F4FA]">
                <div className="bg-white p-2.5 text-[#A0AEC0] flex items-center justify-end pr-3" style={{ fontSize: 12, fontWeight: 600, fontFamily: 'monospace' }}>{time}</div>
                {weekDays.map((d, di) => {
                  const iso = d.toISOString().slice(0, 10);
                  const cell = cellFor(iso, time);
                  return (
                    <div key={di} className="bg-white p-1.5 min-h-[56px]" style={{ background: di >= 5 ? '#FAFCFF' : undefined }}>
                      {cell.length > 0 ? cell.map(r => {
                        const color = TYPE_COLORS[r.type] || '#0365C4';
                        return (
                          <div
                            key={r.id}
                            onClick={() => { setSelectedReservation(r); goTo('reservation-detail'); }}
                            className="rounded-md px-2 py-1.5 mb-1 text-white cursor-pointer hover:opacity-90 transition-opacity"
                            style={{ background: color, fontSize: 11 }}
                          >
                            <div className="flex items-center justify-between">
                              <p style={{ fontWeight: 700 }} className="truncate">{r.childName}</p>
                              <StatusBadge status={r.status} />
                            </div>
                            <p style={{ opacity: 0.85, fontSize: 10 }}>{r.type} · {r.location}</p>
                          </div>
                        );
                      }) : (
                        <div className="h-full flex items-center justify-center cursor-pointer hover:bg-[#F4F7FC] rounded-md transition-colors" onClick={() => goTo('reservation-new')}>
                          <Plus size={14} className="text-[#D0D5DD]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}

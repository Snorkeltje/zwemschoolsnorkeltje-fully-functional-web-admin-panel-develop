import { useState } from 'react';
import { AdminView } from './AdminLayout';
import {
  Plus, ArrowLeft, ArrowRight, Star, Download, Clock,
  X, Check, Calendar, RefreshCw
} from 'lucide-react';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl ${className}`} style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.04)', border: '1px solid #E8ECF4' }}>{children}</div>
);

const PageHeader = ({ title, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
    <div><h1 className="text-[#1A1A2E]" style={{ fontSize: 22, fontWeight: 700 }}>{title}</h1></div>
    {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
  </div>
);

interface CalendarViewProps {
  goTo: (v: AdminView) => void;
  showToast: (msg: string) => void;
  setSelectedReservation: (r: any) => void;
}

const calBookings = [
  { day: 0, resource: 0, startH: 9, startM: 0, endH: 9, endM: 30, title: 'Liam Van de Geest', sub: '1-op-1 KL-1001', color: '#0365C4' },
  { day: 0, resource: 0, startH: 9, startM: 30, endH: 10, endM: 0, title: 'Mila Smit', sub: '1-op-1 KL-1006', color: '#0365C4' },
  { day: 0, resource: 0, startH: 12, startM: 0, endH: 12, endM: 30, title: 'Liam Van de Geest', sub: '1-op-1', color: '#0365C4' },
  { day: 0, resource: 0, startH: 12, startM: 30, endH: 13, endM: 0, title: 'Mila Smit', sub: '1-op-1', color: '#0365C4' },
  { day: 0, resource: 1, startH: 10, startM: 0, endH: 10, endM: 30, title: 'Noah Bakker', sub: '1-op-2', color: '#00C1FF' },
  { day: 1, resource: 0, startH: 8, startM: 0, endH: 12, endM: 30, title: 'Geen Les', sub: 'Snorkeltje 6081', color: '#E74C3C' },
  { day: 2, resource: 0, startH: 9, startM: 0, endH: 9, endM: 30, title: 'Kyana Smit', sub: '29', color: '#27AE60' },
  { day: 2, resource: 0, startH: 9, startM: 30, endH: 10, endM: 0, title: 'Nikki De Witte', sub: '36', color: '#27AE60' },
  { day: 2, resource: 0, startH: 10, startM: 0, endH: 10, endM: 30, title: 'Lois Koelewijn', sub: '80', color: '#8E44AD' },
  { day: 2, resource: 0, startH: 10, startM: 30, endH: 11, endM: 0, title: 'Roel Achterberg', sub: '', color: '#8E44AD' },
  { day: 2, resource: 1, startH: 8, startM: 30, endH: 9, endM: 0, title: 'Louise Hebly', sub: '', color: '#27AE60' },
  { day: 2, resource: 1, startH: 9, startM: 0, endH: 9, endM: 30, title: 'Roan Van Hunnik', sub: '', color: '#27AE60' },
  { day: 2, resource: 1, startH: 9, startM: 30, endH: 10, endM: 0, title: 'Thijs Baatje', sub: '42', color: '#27AE60' },
  { day: 2, resource: 1, startH: 10, startM: 0, endH: 10, endM: 30, title: 'Steyn Braun', sub: '', color: '#8E44AD' },
  { day: 3, resource: 0, startH: 8, startM: 30, endH: 9, endM: 0, title: 'Emma De Boer', sub: '', color: '#27AE60' },
  { day: 3, resource: 0, startH: 9, startM: 0, endH: 9, endM: 30, title: 'Bram Pronk', sub: '', color: '#27AE60' },
  { day: 3, resource: 1, startH: 14, startM: 0, endH: 14, endM: 30, title: 'Finn Bos', sub: 'Survival', color: '#FF5C00' },
  { day: 4, resource: 0, startH: 15, startM: 0, endH: 15, endM: 30, title: 'Sophie Jansen', sub: '1-op-2', color: '#00C1FF' },
];

export function CalendarView({ goTo, showToast }: CalendarViewProps) {
  const [editBooking, setEditBooking] = useState<typeof calBookings[0] | null>(null);
  const [calLocation, setCalLocation] = useState('Bad Hulckesteijn');

  const resources = ['Bad Hulckesteijn', 'Bad Hulckesteijn 2'];
  const hours = Array.from({ length: 12 }, (_, i) => 7 + i);
  const weekDays = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(2026, 2, 26);
    d.setDate(d.getDate() - d.getDay() + 1 + i);
    return d;
  });

  const getBookingsForCell = (dayIdx: number, resIdx: number, hour: number) =>
    calBookings.filter(b => b.day === dayIdx && b.resource === resIdx && b.startH === hour);

  return (
    <>
      <PageHeader title={calLocation} actions={
        <div className="flex items-center gap-2">
          <button onClick={() => goTo('reservation-new')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white" style={{ background: '#27AE60', fontSize: 13, fontWeight: 600 }}><Plus size={15} /> Nieuw via kalender</button>
        </div>
      } />

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg border border-[#0365C4] text-[#0365C4]" style={{ fontSize: 12, fontWeight: 600 }}>Vandaag</button>
          <button className="p-1.5 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"><RefreshCw size={14} /></button>
          <button className="p-1.5 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"><ArrowLeft size={16} /></button>
          <button className="p-1.5 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"><ArrowRight size={16} /></button>
          <span className="text-[#1A1A2E] px-2" style={{ fontSize: 14, fontWeight: 600 }}>Donderdag 26-03-2026 – Maandag 30-03-2026</span>
        </div>
        <div className="flex items-center gap-2">
          <select value={calLocation} onChange={e => setCalLocation(e.target.value)} className="px-3 py-2 rounded-lg bg-[#F4F7FC] border border-[#E8ECF4] text-[#1A1A2E]" style={{ fontSize: 13 }}>
            {['Bad Hulckesteijn', 'De Bilt', 'Garderen', 'Wolfheze', 'Dordrecht', 'Mierlo', 'Soest'].map(l => <option key={l}>{l}</option>)}
          </select>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-[#E8ECF4] text-[#6B7B94]" style={{ fontSize: 12 }}><Star size={13} /> Favorieten</button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-[#E8ECF4] text-[#6B7B94]" style={{ fontSize: 12 }}><Download size={13} /> Print</button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-3 px-1">
        {[{ label: '1-op-1', color: '#0365C4' }, { label: '1-op-2', color: '#00C1FF' }, { label: 'Groep', color: '#27AE60' }, { label: 'Survival', color: '#FF5C00' }, { label: 'Prive', color: '#8E44AD' }, { label: 'Geblokkeerd', color: '#E74C3C' }].map(l => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded" style={{ background: l.color }} />
            <span className="text-[#6B7B94]" style={{ fontSize: 11 }}>{l.label}</span>
          </div>
        ))}
      </div>

      <Card className="overflow-x-auto">
        <div className="min-w-[1000px]">
          <div className="grid border-b border-[#E8ECF4]" style={{ gridTemplateColumns: `60px repeat(${weekDays.length}, 1fr)` }}>
            <div className="bg-[#F8FAFC] p-2 border-r border-[#E8ECF4]" />
            {weekDays.map((d, i) => {
              const isToday = d.getDate() === 26 && d.getMonth() === 2;
              return (
                <div key={i} className={`border-r border-[#E8ECF4] last:border-r-0 ${isToday ? 'bg-[#0365C4]/5' : 'bg-[#F8FAFC]'}`}>
                  <div className="text-center py-2 border-b border-[#E8ECF4]">
                    <p style={{ fontSize: 12, fontWeight: 700, color: isToday ? '#0365C4' : '#1A1A2E' }}>{['Ma', 'Di', 'Wo', 'Do', 'Vr'][i]} {d.getDate()}</p>
                  </div>
                  <div className="grid" style={{ gridTemplateColumns: `repeat(${resources.length}, 1fr)` }}>
                    {resources.map(r => (
                      <div key={r} className="text-center py-1 border-r border-[#F0F4FA] last:border-r-0" style={{ fontSize: 10, fontWeight: 600, color: '#6B7B94' }}>{r}</div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {hours.map(hour => (
            <div key={hour} className="grid border-b border-[#F0F4FA]" style={{ gridTemplateColumns: `60px repeat(${weekDays.length}, 1fr)` }}>
              <div className="bg-white p-2 text-right pr-3 border-r border-[#E8ECF4] text-[#A0AEC0]" style={{ fontSize: 11, minHeight: 80 }}>
                {String(hour).padStart(2, '0')}:00
              </div>
              {weekDays.map((_, dayIdx) => (
                <div key={dayIdx} className="border-r border-[#E8ECF4] last:border-r-0">
                  <div className="grid h-full" style={{ gridTemplateColumns: `repeat(${resources.length}, 1fr)` }}>
                    {resources.map((_, resIdx) => {
                      const bookings = getBookingsForCell(dayIdx, resIdx, hour);
                      return (
                        <div key={resIdx} className="border-r border-[#F0F4FA] last:border-r-0 p-0.5 min-h-[80px] relative hover:bg-[#F8FAFC]/50 cursor-pointer"
                          onClick={() => { if (bookings.length === 0) goTo('reservation-new'); }}
                        >
                          {bookings.map((b, bi) => {
                            const durationSlots = ((b.endH * 60 + b.endM) - (b.startH * 60 + b.startM)) / 60;
                            const topOffset = (b.startM / 60) * 80;
                            return (
                              <div key={bi}
                                onClick={(e) => { e.stopPropagation(); setEditBooking(b); }}
                                className="absolute left-0.5 right-0.5 rounded-md px-1.5 py-1 text-white overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                                style={{ background: b.color, top: topOffset, height: Math.max(durationSlots * 80 - 2, 28), fontSize: 10, zIndex: 5 }}>
                                <div className="flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                                  <span style={{ fontWeight: 600, fontSize: 9 }}>{String(b.startH).padStart(2, '0')}:{String(b.startM).padStart(2, '0')} - {String(b.endH).padStart(2, '0')}:{String(b.endM).padStart(2, '0')}</span>
                                </div>
                                <p className="truncate mt-0.5" style={{ fontWeight: 700, fontSize: 11 }}>{b.title}</p>
                                {b.sub && <p className="truncate" style={{ opacity: 0.8, fontSize: 10 }}>{b.sub}</p>}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>

      {editBooking && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditBooking(null)} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[520px] mx-4" style={{ border: '1px solid #E8ECF4' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F4FA]">
              <h3 className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>Bewerken reservering</h3>
              <button onClick={() => setEditBooking(null)} className="text-[#A0AEC0] hover:text-[#1A1A2E]"><X size={20} /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-[100px_1fr] items-center gap-y-4">
                <span className="text-[#6B7B94]" style={{ fontSize: 13, fontWeight: 600 }}>Resource</span>
                <select className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] text-[#1A1A2E]" style={{ fontSize: 14 }} defaultValue={calLocation}>
                  {['Bad Hulckesteijn', 'De Bilt', 'Garderen'].map(l => <option key={l}>{l}</option>)}
                </select>
                <span className="text-[#6B7B94]" style={{ fontSize: 13, fontWeight: 600 }}>Product</span>
                <select className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] text-[#1A1A2E]" style={{ fontSize: 14 }}>
                  <option>*{calLocation} 1-op-2 extra [2037]</option>
                  <option>*{calLocation} 1-op-1 [2036]</option>
                </select>
                <span className="text-[#6B7B94]" style={{ fontSize: 13, fontWeight: 600 }}>Wanneer</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E8ECF4]">
                    <Clock size={14} className="text-[#A0AEC0]" />
                    <input type="time" defaultValue={`${String(editBooking.startH).padStart(2,'0')}:${String(editBooking.startM).padStart(2,'0')}`} className="outline-none text-[#1A1A2E]" style={{ fontSize: 14 }} />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E8ECF4]">
                    <Clock size={14} className="text-[#A0AEC0]" />
                    <input type="time" defaultValue={`${String(editBooking.endH).padStart(2,'0')}:${String(editBooking.endM).padStart(2,'0')}`} className="outline-none text-[#1A1A2E]" style={{ fontSize: 14 }} />
                  </div>
                </div>
              </div>
              <div>
                <span className="text-[#6B7B94] block mb-1.5" style={{ fontSize: 13, fontWeight: 600 }}>Opmerkingen</span>
                <textarea rows={3} className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }} placeholder="Opmerkingen..." />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#F0F4FA] flex items-center justify-end gap-2">
              <button onClick={() => setEditBooking(null)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[#6B7B94] border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><X size={14} /> Annuleer</button>
              <button onClick={() => { setEditBooking(null); showToast('Reservering bewerkt'); }} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[#0365C4] bg-[#0365C4]/10" style={{ fontSize: 13, fontWeight: 600 }}><Calendar size={14} /> Geavanceerd</button>
              <button onClick={() => { setEditBooking(null); showToast('Reservering opgeslagen!'); }} className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-white" style={{ background: '#27AE60', fontSize: 13, fontWeight: 700 }}><Check size={14} /> Opslaan</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

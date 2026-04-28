import { AdminView } from './AdminLayout';
import { Plus, ArrowLeft, ArrowRight, Download, Calendar, Check } from 'lucide-react';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl ${className}`} style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.04)', border: '1px solid #E8ECF4' }}>{children}</div>
);

const PageHeader = ({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
    <div><h1 className="text-[#1A1A2E]" style={{ fontSize: 22, fontWeight: 700 }}>{title}</h1>{subtitle && <p className="text-[#6B7B94] mt-0.5" style={{ fontSize: 13 }}>{subtitle}</p>}</div>
    {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, { bg: string; text: string }> = {
    'Bevestigd': { bg: '#ECFDF5', text: '#065F46' }, 'Wachtlijst': { bg: '#FFF7ED', text: '#9A3412' }, 'Nieuw': { bg: '#EFF6FF', text: '#1E40AF' },
  };
  const c = colors[status] || { bg: '#F3F4F6', text: '#6B7280' };
  return <span className="px-2 py-0.5 rounded-full" style={{ background: c.bg, color: c.text, fontSize: 9, fontWeight: 600 }}>{status}</span>;
};

interface RosterViewProps {
  goTo: (v: AdminView) => void;
  showToast: (msg: string) => void;
  setSelectedReservation: (r: any) => void;
}

export function RosterView({ goTo }: RosterViewProps) {
  const rosterData = [
    { time: '09:00', slots: [
      [{ name: 'Liam VdG', type: '1-op-1', color: '#0365C4', customer: 'KL-1001', status: 'Bevestigd' }],
      [{ name: 'Emma De Vries', type: '1-op-2', color: '#00C1FF', customer: 'KL-1002', status: 'Bevestigd' }],
      [{ name: 'Noah Bakker', type: '1-op-1', color: '#0365C4', customer: 'KL-1003', status: 'Bevestigd' }],
      [],
      [{ name: 'Sophie Jansen', type: '1-op-2', color: '#00C1FF', customer: 'KL-1004', status: 'Wachtlijst' }],
    ]},
    { time: '09:30', slots: [
      [{ name: 'Mila Smit', type: '1-op-1', color: '#0365C4', customer: 'KL-1006', status: 'Bevestigd' }],
      [], [{ name: 'Finn Bos', type: '1-op-3', color: '#27AE60', customer: 'KL-1007', status: 'Bevestigd' }], [], [],
    ]},
    { time: '10:00', slots: [
      [], [{ name: 'Liam VdG', type: '1-op-1', color: '#0365C4', customer: 'KL-1001', status: 'Bevestigd' }],
      [], [{ name: 'Daan Visser', type: '1-op-1', color: '#0365C4', customer: 'KL-1005', status: 'Bevestigd' }], [],
    ]},
    { time: '10:30', slots: [[], [], [{ name: 'Julia Mulder', type: '1-op-2', color: '#00C1FF', customer: 'KL-1008', status: 'Nieuw' }], [], []]},
    { time: '11:00', slots: [[], [], [], [], [{ name: 'Finn Bos', type: 'Survival', color: '#FF5C00', customer: 'KL-1007', status: 'Bevestigd' }]]},
    { time: '12:00', slots: [[{ name: 'Liam VdG', type: '1-op-1', color: '#0365C4', customer: 'KL-1001', status: 'Bevestigd' }], [], [], [], []]},
    { time: '12:30', slots: [[{ name: 'Mila Smit', type: '1-op-1', color: '#0365C4', customer: 'KL-1006', status: 'Bevestigd' }], [], [], [], []]},
    { time: '14:00', slots: [[], [{ name: 'Emma De Vries', type: '1-op-2', color: '#00C1FF', customer: 'KL-1002', status: 'Bevestigd' }], [], [], []]},
    { time: '15:00', slots: [[], [], [], [], [{ name: 'Sophie Jansen', type: '1-op-2', color: '#00C1FF', customer: 'KL-1004', status: 'Bevestigd' }]]},
  ];
  const weekDayLabels = ['Di 24', 'Wo 25', 'Do 26', 'Vr 27', 'Za 28'];
  const instructorForDay = ['Walter', 'Walter', 'Walter', 'Maaike', 'Jeroen'];
  const totalLessons = rosterData.reduce((sum, row) => sum + row.slots.reduce((s, sl) => s + sl.length, 0), 0);

  return (
    <>
      <PageHeader title="Rooster" subtitle={`Weekoverzicht — ${totalLessons} lessen gepland`} actions={
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-[#0365C4] text-white" style={{ fontSize: 12, fontWeight: 600 }}>Vandaag</button>
          <button className="p-1.5 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"><ArrowLeft size={16} /></button>
          <span className="text-[#1A1A2E] px-2" style={{ fontSize: 13, fontWeight: 600 }}>24 Mrt - 28 Mrt 2026</span>
          <button className="p-1.5 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"><ArrowRight size={16} /></button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 12 }}><Download size={14} /> PDF</button>
        </div>
      } />

      <div className="grid grid-cols-5 gap-3 mb-4">
        {weekDayLabels.map((day, i) => {
          const dayLessons = rosterData.reduce((sum, row) => sum + row.slots[i].length, 0);
          return (
            <Card key={day} className="p-3 text-center">
              <p className="text-[#6B7B94]" style={{ fontSize: 11, fontWeight: 600 }}>{day}</p>
              <p className="text-[#1A1A2E]" style={{ fontSize: 20, fontWeight: 800 }}>{dayLessons}</p>
              <p className="text-[#A0AEC0]" style={{ fontSize: 10 }}>lessen</p>
              <p className="text-[#0365C4] mt-1" style={{ fontSize: 10, fontWeight: 600 }}>{instructorForDay[i]}</p>
            </Card>
          );
        })}
      </div>

      <Card className="overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-6 gap-px bg-[#E8ECF4]">
            <div className="bg-[#F8FAFC] p-2.5 text-center" style={{ fontSize: 11, fontWeight: 700, color: '#6B7B94' }}>Tijd</div>
            {weekDayLabels.map((d, i) => (
              <div key={d} className={`p-2.5 text-center ${i === 2 ? 'bg-[#0365C4]/5' : 'bg-[#F8FAFC]'}`}>
                <p style={{ fontSize: 12, fontWeight: 700, color: i === 2 ? '#0365C4' : '#1A1A2E' }}>{d}</p>
                <p style={{ fontSize: 10, color: '#A0AEC0' }}>{instructorForDay[i]}</p>
              </div>
            ))}
          </div>
          {rosterData.map(row => (
            <div key={row.time} className="grid grid-cols-6 gap-px bg-[#F0F4FA]">
              <div className="bg-white p-2.5 text-[#A0AEC0] flex items-center justify-end pr-3" style={{ fontSize: 12, fontWeight: 600 }}>{row.time}</div>
              {row.slots.map((daySlots, di) => (
                <div key={di} className={`bg-white p-1.5 min-h-[56px] ${di === 2 ? 'bg-[#0365C4]/[0.02]' : ''}`}>
                  {daySlots.map((slot, si) => (
                    <div key={si} className="rounded-md px-2 py-1.5 mb-1 text-white cursor-pointer hover:opacity-80 transition-opacity" style={{ background: slot.color, fontSize: 11 }}
                      onClick={() => goTo('reservation-detail')}>
                      <div className="flex items-center justify-between">
                        <p style={{ fontWeight: 700 }}>{slot.name}</p>
                        <StatusBadge status={slot.status} />
                      </div>
                      <p style={{ opacity: 0.8, fontSize: 10 }}>{slot.type} • {slot.customer}</p>
                    </div>
                  ))}
                  {daySlots.length === 0 && (
                    <div className="h-full flex items-center justify-center cursor-pointer hover:bg-[#F4F7FC] rounded-md transition-colors" onClick={() => goTo('reservation-new')}>
                      <Plus size={14} className="text-[#D0D5DD]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

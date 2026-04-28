import { useState } from 'react';
import {
  DollarSign, BarChart3, Award, XCircle, Target, Download, Users,
} from 'lucide-react';
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart, Line,
} from 'recharts';

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
    'Actief': { bg: '#ECFDF5', text: '#065F46' }, 'Verlof': { bg: '#FFF7ED', text: '#9A3412' }, 'Inactief': { bg: '#F3F4F6', text: '#6B7280' },
  };
  const c = colors[status] || { bg: '#F3F4F6', text: '#6B7280' };
  return <span className="px-2.5 py-1 rounded-full" style={{ background: c.bg, color: c.text, fontSize: 11, fontWeight: 600 }}>{status}</span>;
};

const locationStats = [
  { name: 'Nijkerk', students: 142, bookings: 89, color: '#0365C4' },
  { name: 'De Bilt', students: 98, bookings: 67, color: '#00C1FF' },
  { name: 'Garderen', students: 76, bookings: 51, color: '#27AE60' },
  { name: 'Wolfheze', students: 64, bookings: 43, color: '#FF5C00' },
  { name: 'Dordrecht', students: 55, bookings: 38, color: '#8E44AD' },
  { name: 'Mierlo', students: 43, bookings: 29, color: '#E67E22' },
  { name: 'Soest', students: 34, bookings: 22, color: '#2C3E50' },
];

const revenueChartData = [
  { month: 'Okt', revenue: 18500 }, { month: 'Nov', revenue: 22300 }, { month: 'Dec', revenue: 19800 },
  { month: 'Jan', revenue: 24100 }, { month: 'Feb', revenue: 26400 }, { month: 'Mrt', revenue: 28700 },
];

const mockInstructors = [
  { id: 'INS-01', name: 'Walter Van de Geest', locations: ['Nijkerk', 'De Bilt', 'Garderen'], specialties: ['Diploma A', 'Diploma B', 'Survival'], status: 'Actief' as const, studentsCount: 45, lessonsThisWeek: 22 },
  { id: 'INS-02', name: 'Maaike van Dijk', locations: ['Wolfheze', 'Dordrecht'], specialties: ['Diploma A', 'Watergewenning'], status: 'Actief' as const, studentsCount: 32, lessonsThisWeek: 18 },
  { id: 'INS-03', name: 'Jeroen Peters', locations: ['Mierlo', 'Soest'], specialties: ['Diploma A', 'Survival'], status: 'Verlof' as const, studentsCount: 28, lessonsThisWeek: 0 },
];

const mockCustomers = [
  { id: 'KL-1001', childFirst: 'Liam', childLast: 'Van de Geest', progress: 'Level 2 - Drijven', status: 'Actief' },
  { id: 'KL-1002', childFirst: 'Emma', childLast: 'De Vries', progress: 'Level 3 - Borstcrawl', status: 'Actief' },
  { id: 'KL-1003', childFirst: 'Noah', childLast: 'Bakker', progress: 'Level 1 - Watergewenning', status: 'Actief' },
  { id: 'KL-1006', childFirst: 'Mila', childLast: 'Smit', progress: 'Level 2 - Rugslag', status: 'Actief' },
];

interface ReportsViewProps {
  showToast: (msg: string) => void;
}

export function ReportsView({ showToast }: ReportsViewProps) {
  const [reportTab, setReportTab] = useState('omzet');

  const weeklyOccupancy = [
    { day: 'Ma', bezetting: 72 }, { day: 'Di', bezetting: 89 }, { day: 'Wo', bezetting: 83 },
    { day: 'Do', bezetting: 67 }, { day: 'Vr', bezetting: 91 }, { day: 'Za', bezetting: 45 },
  ];
  const studentProgress = [
    { level: 'Watergewenning', count: 45, color: '#00C1FF' }, { level: 'Drijven', count: 38, color: '#0365C4' },
    { level: 'Borstcrawl', count: 32, color: '#27AE60' }, { level: 'Rugslag', count: 28, color: '#FF5C00' },
    { level: 'Diploma A', count: 52, color: '#8E44AD' }, { level: 'Diploma B', count: 24, color: '#E67E22' },
    { level: 'Survival', count: 18, color: '#2C3E50' },
  ];
  const monthlyRevenue = [
    { month: 'Okt', '1op1': 12000, '1op2': 4500, survival: 2000 },
    { month: 'Nov', '1op1': 14500, '1op2': 5200, survival: 2600 },
    { month: 'Dec', '1op1': 11800, '1op2': 5000, survival: 3000 },
    { month: 'Jan', '1op1': 15600, '1op2': 5800, survival: 2700 },
    { month: 'Feb', '1op1': 17200, '1op2': 6100, survival: 3100 },
    { month: 'Mrt', '1op1': 18900, '1op2': 6500, survival: 3300 },
  ];
  const cancellationData = [
    { month: 'Okt', annuleringen: 12, noShows: 3 }, { month: 'Nov', annuleringen: 15, noShows: 5 },
    { month: 'Dec', annuleringen: 22, noShows: 8 }, { month: 'Jan', annuleringen: 10, noShows: 2 },
    { month: 'Feb', annuleringen: 8, noShows: 1 }, { month: 'Mrt', annuleringen: 6, noShows: 2 },
  ];
  const tabs = [
    { id: 'omzet', label: 'Omzet', icon: DollarSign }, { id: 'bezetting', label: 'Bezetting', icon: BarChart3 },
    { id: 'voortgang', label: 'Voortgang', icon: Award }, { id: 'annulering', label: 'Annuleringen', icon: XCircle },
    { id: 'instructeur', label: 'Instructeurs', icon: Target },
  ];

  return (
    <>
      <PageHeader title="Rapporten & Analyse" subtitle="Uitgebreide inzichten voor uw zwemschool" actions={
        <div className="flex items-center gap-2">
          <select className="px-3 py-2 rounded-lg bg-white border border-[#E8ECF4] text-[#1A1A2E]" style={{ fontSize: 13 }}>
            <option>Laatste 6 maanden</option><option>Laatste 3 maanden</option><option>Dit jaar</option>
          </select>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><Download size={15} /> Export PDF</button>
        </div>
      } />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-5">
        {[
          { label: 'Omzet MTD', value: '\u20AC28.700', change: '+15%', color: '#27AE60' },
          { label: 'Bezettingsgraad', value: '78%', change: '+3%', color: '#0365C4' },
          { label: 'Nieuwe klanten', value: '23', change: '+8', color: '#00C1FF' },
          { label: 'Annuleringsrate', value: '4.2%', change: '-1.3%', color: '#FF5C00' },
          { label: 'Gem. les/student', value: '6.8', change: '+0.5', color: '#8E44AD' },
        ].map(kpi => (
          <Card key={kpi.label} className="p-4">
            <p className="text-[#6B7B94]" style={{ fontSize: 11, fontWeight: 600 }}>{kpi.label}</p>
            <p className="text-[#1A1A2E] mt-1" style={{ fontSize: 22, fontWeight: 800 }}>{kpi.value}</p>
            <span className="text-[#27AE60]" style={{ fontSize: 11, fontWeight: 600 }}>{kpi.change}</span>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-1 mb-5 bg-white rounded-xl p-1" style={{ border: '1px solid #E8ECF4' }}>
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setReportTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition-all ${reportTab === t.id ? 'bg-[#0365C4] text-white shadow-md' : 'text-[#6B7B94] hover:bg-[#F4F7FC]'}`}
              style={{ fontSize: 13, fontWeight: 600 }}>
              <Icon size={15} /> {t.label}
            </button>
          );
        })}
      </div>

      {reportTab === 'omzet' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Omzet per lestype</h3>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4FA" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#A0AEC0' }} />
                <YAxis tick={{ fontSize: 10, fill: '#A0AEC0' }} tickFormatter={v => `\u20AC${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `\u20AC${v.toLocaleString()}`} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="1op1" name="1-op-1" stackId="a" fill="#0365C4" />
                <Bar dataKey="1op2" name="1-op-2" stackId="a" fill="#00C1FF" />
                <Bar dataKey="survival" name="Survival" stackId="a" fill="#FF5C00" radius={[4,4,0,0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-5">
            <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Omzet trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4FA" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#A0AEC0' }} />
                <YAxis tick={{ fontSize: 10, fill: '#A0AEC0' }} tickFormatter={v => `\u20AC${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => [`\u20AC${v.toLocaleString()}`, 'Omzet']} />
                <Area type="monotone" dataKey="revenue" stroke="#27AE60" fill="#27AE60" fillOpacity={0.1} strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          <Card className="lg:col-span-2 p-5">
            <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Omzet per locatie</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {locationStats.map(loc => (
                <div key={loc.name} className="p-4 rounded-xl bg-[#F8FAFC]">
                  <p className="text-[#6B7B94]" style={{ fontSize: 12, fontWeight: 600 }}>{loc.name}</p>
                  <p className="text-[#1A1A2E] mt-1" style={{ fontSize: 20, fontWeight: 800 }}>{'\u20AC'}{(loc.students * 38 * 4).toLocaleString()}</p>
                  <div className="mt-2 h-1.5 rounded-full bg-[#E8ECF4]"><div className="h-full rounded-full" style={{ width: `${(loc.students/150)*100}%`, background: loc.color }} /></div>
                  <p className="text-[#A0AEC0] mt-1" style={{ fontSize: 11 }}>{loc.students} studenten</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {reportTab === 'bezetting' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Weekbezetting per dag</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={weeklyOccupancy}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4FA" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#A0AEC0' }} />
                <YAxis tick={{ fontSize: 10, fill: '#A0AEC0' }} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="bezetting" radius={[6,6,0,0]}>
                  {weeklyOccupancy.map(entry => <Cell key={entry.day} fill={entry.bezetting > 85 ? '#E74C3C' : entry.bezetting > 70 ? '#FF5C00' : '#27AE60'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-5">
            <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Bezetting per locatie</h3>
            <div className="space-y-4">
              {locationStats.map(loc => {
                const occ = Math.round((loc.bookings / (loc.students || 1)) * 100);
                return (
                  <div key={loc.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>{loc.name}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: occ > 80 ? '#E74C3C' : occ > 60 ? '#FF5C00' : '#27AE60' }}>{occ}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-[#F0F4FA] overflow-hidden"><div className="h-full rounded-full" style={{ width: `${occ}%`, background: occ > 80 ? '#E74C3C' : occ > 60 ? '#FF5C00' : '#27AE60' }} /></div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {reportTab === 'voortgang' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Studenten per niveau</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentProgress} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4FA" />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#A0AEC0' }} />
                <YAxis dataKey="level" type="category" width={110} tick={{ fontSize: 11, fill: '#6B7B94' }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="count" radius={[0,6,6,0]}>{studentProgress.map(entry => <Cell key={entry.level} fill={entry.color} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-5">
            <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Verdeling</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart><Pie data={studentProgress} innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="count">{studentProgress.map(entry => <Cell key={entry.level} fill={entry.color} />)}</Pie><Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} /></PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-2 justify-center">
              {studentProgress.map(p => (<div key={p.level} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} /><span className="text-[#6B7B94]" style={{ fontSize: 11 }}>{p.level} ({p.count})</span></div>))}
            </div>
          </Card>
          <Card className="lg:col-span-2 p-5">
            <h3 className="text-[#1A1A2E] mb-3" style={{ fontSize: 16, fontWeight: 700 }}>Top presterende studenten</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {mockCustomers.map((c, i) => (
                <div key={c.id} className="p-4 rounded-xl bg-[#F8FAFC] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: ['#FFD700', '#C0C0C0', '#CD7F32', '#0365C4'][i], fontSize: 14, fontWeight: 800 }}>{i + 1}</div>
                  <div><p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 700 }}>{c.childFirst} {c.childLast}</p><p className="text-[#6B7B94]" style={{ fontSize: 11 }}>{c.progress}</p></div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {reportTab === 'annulering' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Annuleringen & No-shows</h3>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={cancellationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4FA" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#A0AEC0' }} />
                <YAxis tick={{ fontSize: 10, fill: '#A0AEC0' }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="annuleringen" name="Annuleringen" fill="#E74C3C" radius={[4,4,0,0]} />
                <Line type="monotone" dataKey="noShows" name="No-shows" stroke="#FF5C00" strokeWidth={2} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-5">
            <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Annuleringsredenen</h3>
            <div className="space-y-3">
              {[
                { reason: 'Ziekte kind', count: 34, pct: 42, color: '#0365C4' },
                { reason: 'Vakantie / schooluitje', count: 18, pct: 22, color: '#00C1FF' },
                { reason: 'Vergeten', count: 12, pct: 15, color: '#FF5C00' },
                { reason: 'Vervoersprobleem', count: 8, pct: 10, color: '#27AE60' },
                { reason: 'Overig', count: 9, pct: 11, color: '#A0AEC0' },
              ].map(r => (
                <div key={r.reason}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#1A1A2E]" style={{ fontSize: 13 }}>{r.reason}</span>
                    <span className="text-[#6B7B94]" style={{ fontSize: 12, fontWeight: 600 }}>{r.count} ({r.pct}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#F0F4FA]"><div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: r.color }} /></div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {reportTab === 'instructeur' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {mockInstructors.map(ins => (
            <Card key={ins.id} className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0365C4] to-[#00C1FF] flex items-center justify-center text-white" style={{ fontSize: 15, fontWeight: 700 }}>{ins.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                <div><h3 className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>{ins.name}</h3><StatusBadge status={ins.status} /></div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-[#F8FAFC] rounded-lg p-3 text-center"><p style={{ fontSize: 20, fontWeight: 800, color: '#0365C4' }}>{ins.studentsCount}</p><p className="text-[#A0AEC0]" style={{ fontSize: 10 }}>Studenten</p></div>
                <div className="bg-[#F8FAFC] rounded-lg p-3 text-center"><p style={{ fontSize: 20, fontWeight: 800, color: '#27AE60' }}>{ins.lessonsThisWeek}</p><p className="text-[#A0AEC0]" style={{ fontSize: 10 }}>Lessen/wk</p></div>
                <div className="bg-[#F8FAFC] rounded-lg p-3 text-center"><p style={{ fontSize: 20, fontWeight: 800, color: '#FF5C00' }}>4.8</p><p className="text-[#A0AEC0]" style={{ fontSize: 10 }}>Rating</p></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 12 }}>Locaties</span><span className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>{ins.locations.join(', ')}</span></div>
                <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 12 }}>Specialiteiten</span><span className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>{ins.specialties.join(', ')}</span></div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

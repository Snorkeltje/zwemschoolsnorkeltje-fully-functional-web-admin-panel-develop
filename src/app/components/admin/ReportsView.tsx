import { useMemo, useState } from 'react';
import {
  DollarSign, BarChart3, Award, XCircle, Target, Download, RefreshCw,
} from 'lucide-react';
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart, Line,
} from 'recharts';
import { useAllReservations, useAllChildren, useInstructors, useAllReviews, useExamCandidates, useCustomers } from '../../../lib/hooks/useAdmin';
import { useRevenue6Months, useLocationStats } from '../../../lib/hooks/useDashboard';

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
    'Actief': { bg: '#ECFDF5', text: '#065F46' },
    'Verlof': { bg: '#FFF7ED', text: '#9A3412' },
    'Inactief': { bg: '#F3F4F6', text: '#6B7280' },
  };
  const c = colors[status] || { bg: '#F3F4F6', text: '#6B7280' };
  return <span className="px-2.5 py-1 rounded-full" style={{ background: c.bg, color: c.text, fontSize: 11, fontWeight: 600 }}>{status}</span>;
};

const LOC_COLORS = ['#0365C4', '#00C1FF', '#27AE60', '#FF5C00', '#8E44AD', '#E67E22', '#16A085', '#2C3E50'];
const TYPE_COLORS: Record<string, string> = { '1-op-1': '#0365C4', '1-op-2': '#00C1FF', '1-op-3': '#27AE60', 'Survival': '#FF5C00', 'examen': '#8E44AD' };
const DUTCH_MONTHS = ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];

interface ReportsViewProps {
  showToast: (msg: string) => void;
}

export function ReportsView({ showToast }: ReportsViewProps) {
  const [reportTab, setReportTab] = useState('omzet');
  const reservations = useAllReservations();
  const children = useAllChildren();
  const instructorsList = useInstructors();
  const reviews = useAllReviews();
  const examCandidates = useExamCandidates();
  const customers = useCustomers();
  const revenue6 = useRevenue6Months();
  const locStats = useLocationStats();

  const refreshAll = () => {
    reservations.refresh(); children.refresh(); instructorsList.refresh();
    reviews.refresh(); examCandidates.refresh(); customers.refresh();
    revenue6.refresh(); locStats.refresh();
  };

  // ─── KPIs ───
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  const allRes = reservations.data ?? [];
  const mtdRes = allRes.filter(r => r.date && new Date(r.date) >= monthStart);
  const lastMonthRes = allRes.filter(r => {
    if (!r.date) return false;
    const d = new Date(r.date);
    return d >= lastMonthStart && d < monthStart;
  });
  const mtdRevenue = mtdRes.filter(r => r.paymentStatus === 'paid').reduce((s, r) => s + r.amountCents, 0);
  const lastMonthRevenue = lastMonthRes.filter(r => r.paymentStatus === 'paid').reduce((s, r) => s + r.amountCents, 0);
  const revenueChangePct = lastMonthRevenue > 0
    ? Math.round(((mtdRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)
    : 0;

  const cancelled = allRes.filter(r => r.status === 'cancelled').length;
  const cancelRate = allRes.length > 0 ? Math.round((cancelled / allRes.length) * 100 * 10) / 10 : 0;

  const customersData = customers.data ?? [];
  const sevenDaysAgo = new Date(); sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const newCustomersCount = customersData.filter(c => new Date(c.createdAt) > sevenDaysAgo).length;

  // Avg lessons per student
  const lessonsPerKid = children.data?.length
    ? Math.round((allRes.length / children.data.length) * 10) / 10
    : 0;

  // Bezetting (huidige week vs huidige week capacity = aantal lessen / 7×8 = ~ rough proxy)
  const weekStart = new Date(today); weekStart.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  const weekRes = allRes.filter(r => {
    if (!r.date) return false;
    const d = new Date(r.date);
    return d >= weekStart && d < new Date(weekStart.getTime() + 7 * 86400000);
  });
  const weekDays = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
  const weeklyOccupancy = weekDays.map((day, i) => {
    const target = new Date(weekStart); target.setDate(weekStart.getDate() + i);
    const iso = target.toISOString().slice(0, 10);
    const lessons = weekRes.filter(r => r.date === iso).length;
    return { day, lessen: lessons };
  });
  const occupancyAvg = Math.round(weeklyOccupancy.reduce((s, w) => s + w.lessen, 0) / 7);

  // ─── OMZET data ───
  const monthlyRevenue = useMemo(() => {
    const map: Record<string, { '1op1': number; '1op2': number; '1op3': number; survival: number }> = {};
    for (const r of allRes) {
      if (r.paymentStatus !== 'paid' || !r.date) continue;
      const d = new Date(r.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const bucket = (map[key] ??= { '1op1': 0, '1op2': 0, '1op3': 0, survival: 0 });
      const cents = r.amountCents;
      if (r.type === '1-op-1') bucket['1op1'] += cents;
      else if (r.type === '1-op-2') bucket['1op2'] += cents;
      else if (r.type === '1-op-3') bucket['1op3'] += cents;
      else if (r.type === 'Survival') bucket.survival += cents;
    }
    const arr = Object.entries(map).sort(([a], [b]) => a.localeCompare(b)).slice(-6).map(([k, v]) => {
      const m = parseInt(k.split('-')[1]) - 1;
      return {
        month: DUTCH_MONTHS[m],
        '1op1': Math.round(v['1op1'] / 100),
        '1op2': Math.round(v['1op2'] / 100),
        '1op3': Math.round(v['1op3'] / 100),
        survival: Math.round(v.survival / 100),
      };
    });
    return arr;
  }, [allRes]);

  const revenueChartData = useMemo(() => {
    return (revenue6.data ?? []).map(r => ({
      month: r.month,
      revenue: Math.round(r.revenueCents / 100),
    }));
  }, [revenue6.data]);

  // ─── BEZETTING per locatie ───
  const locationStats = useMemo(() => {
    return (locStats.data ?? []).slice(0, 8).map((l, i) => ({
      name: l.locationName,
      students: l.uniqueStudents,
      bookings: l.upcomingLessons,
      color: LOC_COLORS[i % LOC_COLORS.length],
    }));
  }, [locStats.data]);

  // ─── VOORTGANG: students per level ───
  const studentProgress = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of (children.data ?? [])) {
      const lvl = c.level || 'Beginner';
      map[lvl] = (map[lvl] ?? 0) + 1;
    }
    return Object.entries(map)
      .sort(([, a], [, b]) => b - a)
      .map(([level, count], i) => ({
        level, count, color: LOC_COLORS[i % LOC_COLORS.length],
      }));
  }, [children.data]);

  // ─── TOP performers — exam candidates closest to ready ───
  const topPerformers = useMemo(() => {
    return (examCandidates.data ?? []).slice(0, 4);
  }, [examCandidates.data]);

  // ─── ANNULERINGEN ───
  const cancellationData = useMemo(() => {
    const map: Record<string, { annuleringen: number; voltooid: number }> = {};
    for (const r of allRes) {
      if (!r.date) continue;
      const d = new Date(r.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const bucket = (map[key] ??= { annuleringen: 0, voltooid: 0 });
      if (r.status === 'cancelled') bucket.annuleringen++;
      else if (r.status === 'completed' || r.status === 'confirmed') bucket.voltooid++;
    }
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b)).slice(-6).map(([k, v]) => {
      const m = parseInt(k.split('-')[1]) - 1;
      return { month: DUTCH_MONTHS[m], ...v };
    });
  }, [allRes]);

  // ─── INSTRUCTEURS ───
  const instructorReports = useMemo(() => {
    const data = instructorsList.data ?? [];
    return data.map(ins => {
      const insRes = allRes.filter(r => r.instructorName === ins.name);
      const weekIns = insRes.filter(r => {
        if (!r.date) return false;
        const d = new Date(r.date);
        return d >= weekStart && d < new Date(weekStart.getTime() + 7 * 86400000);
      });
      const insReviews = (reviews.data ?? []).filter(rv => rv.instructorName === ins.name);
      const avgRating = insReviews.length > 0
        ? Math.round((insReviews.reduce((s, r) => s + r.rating, 0) / insReviews.length) * 10) / 10
        : null;
      return {
        ...ins,
        studentsCount: new Set(insRes.map(r => r.childName)).size,
        lessonsThisWeek: weekIns.length,
        avgRating,
        status: 'Actief' as const,
      };
    });
  }, [instructorsList.data, allRes, reviews.data, weekStart]);

  const tabs = [
    { id: 'omzet', label: 'Omzet', icon: DollarSign },
    { id: 'bezetting', label: 'Bezetting', icon: BarChart3 },
    { id: 'voortgang', label: 'Voortgang', icon: Award },
    { id: 'annulering', label: 'Annuleringen', icon: XCircle },
    { id: 'instructeur', label: 'Instructeurs', icon: Target },
  ];

  const exportCSV = () => {
    if (reportTab === 'omzet') {
      const header = ['Maand', '1-op-1 (€)', '1-op-2 (€)', '1-op-3 (€)', 'Survival (€)', 'Totaal (€)'];
      const rows = monthlyRevenue.map(m => [m.month, m['1op1'], m['1op2'], m['1op3'], m.survival, m['1op1'] + m['1op2'] + m['1op3'] + m.survival]);
      downloadCSV(header, rows, 'omzet_rapport');
    } else if (reportTab === 'bezetting') {
      const header = ['Locatie', 'Studenten', 'Bezetting (lessen komend)', 'Bezetting %'];
      const rows = locationStats.map(l => [l.name, l.students, l.bookings, l.students > 0 ? Math.round((l.bookings / l.students) * 100) : 0]);
      downloadCSV(header, rows, 'bezetting_rapport');
    } else if (reportTab === 'voortgang') {
      const header = ['Niveau', 'Aantal kinderen'];
      const rows = studentProgress.map(s => [s.level, s.count]);
      downloadCSV(header, rows, 'voortgang_rapport');
    } else if (reportTab === 'annulering') {
      const header = ['Maand', 'Annuleringen', 'Voltooid'];
      const rows = cancellationData.map(c => [c.month, c.annuleringen, c.voltooid]);
      downloadCSV(header, rows, 'annulering_rapport');
    } else if (reportTab === 'instructeur') {
      const header = ['Naam', 'Studenten', 'Lessen deze week', 'Rating'];
      const rows = instructorReports.map(i => [i.name, i.studentsCount, i.lessonsThisWeek, i.avgRating ?? '—']);
      downloadCSV(header, rows, 'instructeurs_rapport');
    }
  };

  const downloadCSV = (header: string[], rows: (string | number)[][], filename: string) => {
    const csv = [header, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`✓ ${filename}.csv gedownload`);
  };

  const fmtEur = (v: number) => `€${v.toLocaleString('nl-NL')}`;

  return (
    <>
      <PageHeader
        title="Rapporten & Analyse"
        subtitle="Live KPI's en trends gebaseerd op echte data"
        actions={
          <div className="flex items-center gap-2">
            <button onClick={exportCSV} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>
              <Download size={15} /> Export CSV
            </button>
            <button onClick={refreshAll} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>
              <RefreshCw size={15} /> Vernieuwen
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-5">
        {[
          { label: 'Omzet MTD', value: fmtEur(Math.round(mtdRevenue / 100)), change: revenueChangePct === 0 ? '—' : `${revenueChangePct > 0 ? '+' : ''}${revenueChangePct}%` },
          { label: 'Lessen/week', value: occupancyAvg.toString(), change: `${weekRes.length} totaal` },
          { label: 'Nieuwe klanten (7d)', value: newCustomersCount.toString(), change: customersData.length > 0 ? `van ${customersData.length}` : '—' },
          { label: 'Annuleringsrate', value: `${cancelRate}%`, change: `${cancelled} annulering${cancelled === 1 ? '' : 'en'}` },
          { label: 'Gem. les/kind', value: lessonsPerKid.toString(), change: `${children.data?.length ?? 0} kinderen` },
        ].map(kpi => (
          <Card key={kpi.label} className="p-4">
            <p className="text-[#6B7B94]" style={{ fontSize: 11, fontWeight: 600 }}>{kpi.label}</p>
            <p className="text-[#1A1A2E] mt-1" style={{ fontSize: 22, fontWeight: 800 }}>{kpi.value}</p>
            <span className="text-[#A0AEC0]" style={{ fontSize: 11, fontWeight: 600 }}>{kpi.change}</span>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-1 mb-5 bg-white rounded-xl p-1 overflow-x-auto" style={{ border: '1px solid #E8ECF4' }}>
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setReportTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition-all whitespace-nowrap ${reportTab === t.id ? 'bg-[#0365C4] text-white shadow-md' : 'text-[#6B7B94] hover:bg-[#F4F7FC]'}`}
              style={{ fontSize: 13, fontWeight: 600 }}>
              <Icon size={15} /> {t.label}
            </button>
          );
        })}
      </div>

      {reportTab === 'omzet' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Omzet per lestype (laatste 6 maanden)</h3>
            {monthlyRevenue.length === 0 ? (
              <div className="py-12 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Nog geen omzet-data</div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <ComposedChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F4FA" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#A0AEC0' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#A0AEC0' }} tickFormatter={v => `€${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => fmtEur(v)} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="1op1" name="1-op-1" stackId="a" fill={TYPE_COLORS['1-op-1']} />
                  <Bar dataKey="1op2" name="1-op-2" stackId="a" fill={TYPE_COLORS['1-op-2']} />
                  <Bar dataKey="1op3" name="1-op-3" stackId="a" fill={TYPE_COLORS['1-op-3']} />
                  <Bar dataKey="survival" name="Survival" stackId="a" fill={TYPE_COLORS['Survival']} radius={[4, 4, 0, 0]} />
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </Card>
          <Card className="p-5">
            <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Omzet trend</h3>
            {revenueChartData.length === 0 ? (
              <div className="py-12 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Nog geen omzet-data</div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F4FA" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#A0AEC0' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#A0AEC0' }} tickFormatter={v => `€${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => [fmtEur(v), 'Omzet']} />
                  <Area type="monotone" dataKey="revenue" stroke="#27AE60" fill="#27AE60" fillOpacity={0.1} strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </Card>
          {locationStats.length > 0 && (
            <Card className="lg:col-span-2 p-5">
              <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Per locatie</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {locationStats.map(loc => {
                  const maxStudents = Math.max(...locationStats.map(l => l.students), 1);
                  return (
                    <div key={loc.name} className="p-4 rounded-xl bg-[#F8FAFC]">
                      <p className="text-[#6B7B94]" style={{ fontSize: 12, fontWeight: 600 }}>{loc.name}</p>
                      <p className="text-[#1A1A2E] mt-1" style={{ fontSize: 20, fontWeight: 800 }}>{loc.students}</p>
                      <div className="mt-2 h-1.5 rounded-full bg-[#E8ECF4]"><div className="h-full rounded-full" style={{ width: `${(loc.students / maxStudents) * 100}%`, background: loc.color }} /></div>
                      <p className="text-[#A0AEC0] mt-1" style={{ fontSize: 11 }}>{loc.bookings} komende lessen</p>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      )}

      {reportTab === 'bezetting' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Lessen per dag (deze week)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={weeklyOccupancy}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4FA" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#A0AEC0' }} />
                <YAxis tick={{ fontSize: 10, fill: '#A0AEC0' }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `${v} lessen`} />
                <Bar dataKey="lessen" radius={[6, 6, 0, 0]}>
                  {weeklyOccupancy.map(entry => <Cell key={entry.day} fill={entry.lessen > 12 ? '#E74C3C' : entry.lessen > 6 ? '#FF5C00' : '#27AE60'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-5">
            <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Bezetting per locatie</h3>
            {locationStats.length === 0 ? (
              <div className="py-12 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Nog geen locatie-data</div>
            ) : (
              <div className="space-y-4">
                {locationStats.map(loc => {
                  const occ = loc.students > 0 ? Math.round((loc.bookings / loc.students) * 100) : 0;
                  return (
                    <div key={loc.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>{loc.name}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: occ > 80 ? '#E74C3C' : occ > 60 ? '#FF5C00' : '#27AE60' }}>{occ}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-[#F0F4FA] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${Math.min(100, occ)}%`, background: occ > 80 ? '#E74C3C' : occ > 60 ? '#FF5C00' : '#27AE60' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
      )}

      {reportTab === 'voortgang' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Kinderen per niveau</h3>
            {studentProgress.length === 0 ? (
              <div className="py-12 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Nog geen kinderen geregistreerd</div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={studentProgress} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F4FA" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#A0AEC0' }} />
                  <YAxis dataKey="level" type="category" width={130} tick={{ fontSize: 11, fill: '#6B7B94' }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {studentProgress.map(entry => <Cell key={entry.level} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>
          <Card className="p-5">
            <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Verdeling</h3>
            {studentProgress.length === 0 ? (
              <div className="py-12 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Nog geen data</div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={studentProgress} innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="count">
                      {studentProgress.map(entry => <Cell key={entry.level} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-3 mt-2 justify-center">
                  {studentProgress.map(p => (
                    <div key={p.level} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                      <span className="text-[#6B7B94]" style={{ fontSize: 11 }}>{p.level} ({p.count})</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Card>
          {topPerformers.length > 0 && (
            <Card className="lg:col-span-2 p-5">
              <h3 className="text-[#1A1A2E] mb-3" style={{ fontSize: 16, fontWeight: 700 }}>Top examenkandidaten (gerangschikt op voortgang)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {topPerformers.map((c, i) => (
                  <div key={`${c.childId}-${c.diplomaLevel}`} className="p-4 rounded-xl bg-[#F8FAFC] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: ['#FFD700', '#C0C0C0', '#CD7F32', '#0365C4'][i] || '#0365C4', fontSize: 14, fontWeight: 800 }}>
                      {i + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[#1A1A2E] truncate" style={{ fontSize: 13, fontWeight: 700 }}>{c.childName}</p>
                      <p className="text-[#6B7B94]" style={{ fontSize: 11 }}>Diploma {c.diplomaLevel} · {c.percent}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {reportTab === 'annulering' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Annuleringen per maand</h3>
            {cancellationData.length === 0 ? (
              <div className="py-12 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Nog geen historiek</div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <ComposedChart data={cancellationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F4FA" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#A0AEC0' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#A0AEC0' }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="annuleringen" name="Annuleringen" fill="#E74C3C" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="voltooid" name="Voltooid/bevestigd" stroke="#27AE60" strokeWidth={2} dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </Card>
          <Card className="p-5">
            <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Annulering-status</h3>
            <div className="space-y-3">
              {[
                { label: 'Bevestigd', count: allRes.filter(r => r.status === 'confirmed').length, color: '#27AE60' },
                { label: 'In behandeling', count: allRes.filter(r => r.status === 'pending').length, color: '#FF5C00' },
                { label: 'Voltooid', count: allRes.filter(r => r.status === 'completed').length, color: '#0365C4' },
                { label: 'Geannuleerd', count: cancelled, color: '#E74C3C' },
              ].map(s => {
                const max = Math.max(...[1, allRes.length]);
                const pct = max > 0 ? Math.round((s.count / max) * 100) : 0;
                return (
                  <div key={s.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#1A1A2E]" style={{ fontSize: 13 }}>{s.label}</span>
                      <span className="text-[#6B7B94]" style={{ fontSize: 12, fontWeight: 600 }}>{s.count} ({pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#F0F4FA]">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: s.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {reportTab === 'instructeur' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {instructorReports.length === 0 ? (
            <Card className="lg:col-span-3 py-12 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Nog geen instructeurs</Card>
          ) : instructorReports.map(ins => (
            <Card key={ins.id} className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0365C4] to-[#00C1FF] flex items-center justify-center text-white" style={{ fontSize: 15, fontWeight: 700 }}>
                  {ins.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>{ins.name}</h3>
                  <StatusBadge status={ins.status} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-[#F8FAFC] rounded-lg p-3 text-center"><p style={{ fontSize: 20, fontWeight: 800, color: '#0365C4' }}>{ins.studentsCount}</p><p className="text-[#A0AEC0]" style={{ fontSize: 10 }}>Studenten</p></div>
                <div className="bg-[#F8FAFC] rounded-lg p-3 text-center"><p style={{ fontSize: 20, fontWeight: 800, color: '#27AE60' }}>{ins.lessonsThisWeek}</p><p className="text-[#A0AEC0]" style={{ fontSize: 10 }}>Lessen/wk</p></div>
                <div className="bg-[#F8FAFC] rounded-lg p-3 text-center"><p style={{ fontSize: 20, fontWeight: 800, color: '#FF5C00' }}>{ins.avgRating ?? '—'}</p><p className="text-[#A0AEC0]" style={{ fontSize: 10 }}>Rating</p></div>
              </div>
              <div className="space-y-2">
                {ins.email && <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 12 }}>E-mail</span><span className="text-[#1A1A2E] truncate ml-2" style={{ fontSize: 12, fontWeight: 600 }}>{ins.email}</span></div>}
                {ins.city && <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 12 }}>Stad</span><span className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>{ins.city}</span></div>}
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

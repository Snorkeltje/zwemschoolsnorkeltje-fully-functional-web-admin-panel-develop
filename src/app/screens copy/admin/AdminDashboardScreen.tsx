import { useState, useCallback, useEffect, useMemo } from 'react';
import { AdminLayout, AdminView } from '../../components/admin/AdminLayout';
import { CalendarView } from '../../components/admin/CalendarView';
import { RosterView } from '../../components/admin/RosterView';
import { MessagesView } from '../../components/admin/MessagesView';
import { ReportsView } from '../../components/admin/ReportsView';
import { SettingsView } from '../../components/admin/SettingsView';
import { ReservationDetailView } from '../../components/admin/ReservationDetailView';
import { ProfileView } from '../../components/admin/ProfileView';
import {
  Users, Calendar, FileText, CreditCard, DollarSign, TrendingUp, TrendingDown,
  ArrowUpRight, ArrowDownRight, Eye, Edit2, Trash2, Plus, Search, Filter,
  Download, ChevronLeft, ChevronRight, ChevronDown, Check, X, Clock,
  MoreHorizontal, RefreshCw, AlertTriangle, CheckCircle2, XCircle,
  UserCheck, UserX, Mail, Phone, MapPin, Star, ArrowLeft, ArrowRight,
  BarChart3, Activity, Waves, Zap, Target, Award, BookOpen, Send,
  Info, AlertCircle, Gift, Repeat, UserPlus, Percent, Tag, Shield,
  ClipboardCheck, ClipboardList, Timer, CalendarCheck, Banknote, Hash, MessageSquare
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart
} from 'recharts';

// Suppress recharts internal duplicate key warning (title/desc siblings in Surface SVG)
const _origWarn = console.error;
console.error = (...args: unknown[]) => {
  if (typeof args[0] === 'string' && args[0].includes('Encountered two children with the same key')) return;
  _origWarn.apply(console, args);
};

// ─── Mock Data ───
const reservationChartData = Array.from({ length: 30 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - 29 + i);
  return { date: `${d.getDate()}/${d.getMonth() + 1}`, reserveringen: Math.floor(Math.random() * 80) + 20, annuleringen: Math.floor(Math.random() * 10) };
});

const revenueChartData = [
  { month: 'Okt', revenue: 18500 }, { month: 'Nov', revenue: 22300 }, { month: 'Dec', revenue: 19800 },
  { month: 'Jan', revenue: 24100 }, { month: 'Feb', revenue: 26400 }, { month: 'Mrt', revenue: 28700 },
];

const pieData = [
  { name: '1-op-1', value: 45, color: '#0365C4' },
  { name: '1-op-2', value: 28, color: '#00C1FF' },
  { name: 'Vakantie', value: 15, color: '#FF5C00' },
  { name: 'Survival', value: 12, color: '#27AE60' },
];

const locationStats = [
  { name: 'Nijkerk', students: 142, bookings: 89, color: '#0365C4' },
  { name: 'De Bilt', students: 98, bookings: 67, color: '#00C1FF' },
  { name: 'Garderen', students: 76, bookings: 51, color: '#27AE60' },
  { name: 'Wolfheze', students: 64, bookings: 43, color: '#FF5C00' },
  { name: 'Dordrecht', students: 55, bookings: 38, color: '#8E44AD' },
  { name: 'Mierlo', students: 43, bookings: 29, color: '#E67E22' },
  { name: 'Soest', students: 34, bookings: 22, color: '#2C3E50' },
];

interface Customer {
  id: string;
  childFirst: string;
  childLast: string;
  parentName: string;
  email: string;
  mobile: string;
  city: string;
  location: string;
  lessonType: string;
  day: string;
  status: 'Actief' | 'Inactief' | 'Wachtlijst' | 'Nieuw';
  lastLogin: string;
  created: string;
  progress: string;
}

const mockCustomers: Customer[] = [
  { id: 'KL-1001', childFirst: 'Liam', childLast: 'Van de Geest', parentName: 'Walter Van de Geest', email: 'walter@example.nl', mobile: '+31 6 12345678', city: 'Nijkerk', location: 'Nijkerk', lessonType: '1-op-1', day: 'Dinsdag', status: 'Actief', lastLogin: '26-03-2026 09:15', created: '15-01-2026', progress: 'Level 2 - Drijven' },
  { id: 'KL-1002', childFirst: 'Emma', childLast: 'De Vries', parentName: 'Jan De Vries', email: 'jan@example.nl', mobile: '+31 6 23456789', city: 'De Bilt', location: 'De Bilt', lessonType: '1-op-2', day: 'Woensdag', status: 'Actief', lastLogin: '25-03-2026 14:30', created: '01-02-2026', progress: 'Level 3 - Borstcrawl' },
  { id: 'KL-1003', childFirst: 'Noah', childLast: 'Bakker', parentName: 'Marleen Bakker', email: 'marleen@example.nl', mobile: '+31 6 34567890', city: 'Garderen', location: 'Garderen', lessonType: '1-op-1', day: 'Donderdag', status: 'Actief', lastLogin: '24-03-2026 11:00', created: '10-01-2026', progress: 'Level 1 - Watergewenning' },
  { id: 'KL-1004', childFirst: 'Sophie', childLast: 'Jansen', parentName: 'Pieter Jansen', email: 'pieter@example.nl', mobile: '+31 6 45678901', city: 'Wolfheze', location: 'Wolfheze', lessonType: '1-op-2', day: 'Vrijdag', status: 'Wachtlijst', lastLogin: '—', created: '20-03-2026', progress: '—' },
  { id: 'KL-1005', childFirst: 'Daan', childLast: 'Visser', parentName: 'Lisa Visser', email: 'lisa@example.nl', mobile: '+31 6 56789012', city: 'Dordrecht', location: 'Dordrecht', lessonType: '1-op-1', day: 'Dinsdag', status: 'Inactief', lastLogin: '01-02-2026 16:45', created: '15-11-2025', progress: 'Level 4 - Diploma A' },
  { id: 'KL-1006', childFirst: 'Mila', childLast: 'Smit', parentName: 'Robert Smit', email: 'robert@example.nl', mobile: '+31 6 67890123', city: 'Nijkerk', location: 'Nijkerk', lessonType: '1-op-1', day: 'Dinsdag', status: 'Actief', lastLogin: '26-03-2026 08:00', created: '05-12-2025', progress: 'Level 2 - Rugslag' },
  { id: 'KL-1007', childFirst: 'Finn', childLast: 'Bos', parentName: 'Anke Bos', email: 'anke@example.nl', mobile: '+31 6 78901234', city: 'Mierlo', location: 'Mierlo', lessonType: '1-op-3', day: 'Maandag', status: 'Actief', lastLogin: '25-03-2026 10:20', created: '08-02-2026', progress: 'Level 1 - Trappen' },
  { id: 'KL-1008', childFirst: 'Julia', childLast: 'Mulder', parentName: 'Kees Mulder', email: 'kees@example.nl', mobile: '+31 6 89012345', city: 'Soest', location: 'Soest', lessonType: '1-op-2', day: 'Woensdag', status: 'Nieuw', lastLogin: '—', created: '25-03-2026', progress: '—' },
];

interface Reservation {
  id: string;
  product: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  customer: string;
  status: 'Bevestigd' | 'Geannuleerd' | 'Voltooid' | 'No-show';
  paidWith: string;
  amount: number;
}

const mockReservations: Reservation[] = [
  { id: 'RES-2026-0451', product: 'Nijkerk 1-op-1 di 12:00', date: '01-04-2026', timeFrom: '12:00', timeTo: '12:30', customer: 'Liam Van de Geest', status: 'Bevestigd', paidWith: 'Knipkaart', amount: 38 },
  { id: 'RES-2026-0452', product: 'Nijkerk 1-op-1 di 12:00', date: '08-04-2026', timeFrom: '12:00', timeTo: '12:30', customer: 'Liam Van de Geest', status: 'Bevestigd', paidWith: 'Knipkaart', amount: 38 },
  { id: 'RES-2026-0453', product: 'De Bilt 1-op-2 wo 14:00', date: '02-04-2026', timeFrom: '14:00', timeTo: '14:30', customer: 'Emma De Vries', status: 'Bevestigd', paidWith: 'Mollie', amount: 27 },
  { id: 'RES-2026-0454', product: 'Garderen 1-op-1 do 10:00', date: '03-04-2026', timeFrom: '10:00', timeTo: '10:30', customer: 'Noah Bakker', status: 'Bevestigd', paidWith: 'Knipkaart', amount: 38 },
  { id: 'RES-2026-0455', product: 'Nijkerk 1-op-1 di 12:30', date: '01-04-2026', timeFrom: '12:30', timeTo: '13:00', customer: 'Mila Smit', status: 'Geannuleerd', paidWith: 'Knipkaart', amount: 38 },
  { id: 'RES-2026-0456', product: 'Wolfheze 1-op-2 vr 15:00', date: '04-04-2026', timeFrom: '15:00', timeTo: '15:30', customer: 'Sophie Jansen', status: 'Bevestigd', paidWith: 'Mollie', amount: 27 },
  { id: 'RES-2026-0440', product: 'Nijkerk 1-op-1 di 12:00', date: '25-03-2026', timeFrom: '12:00', timeTo: '12:30', customer: 'Liam Van de Geest', status: 'Voltooid', paidWith: 'Knipkaart', amount: 38 },
  { id: 'RES-2026-0441', product: 'De Bilt extra 1-op-1', date: '24-03-2026', timeFrom: '14:00', timeTo: '14:30', customer: 'Daan Visser', status: 'No-show', paidWith: 'Mollie', amount: 39 },
];

interface Invoice {
  id: string;
  reservationId: string;
  customerId: string;
  customerName: string;
  number: string;
  date: string;
  amount: number;
  outstanding: number;
  status: 'Concept' | 'Definitief' | 'Betaald' | 'Vervallen';
}

const mockInvoices: Invoice[] = [
  { id: 'FAC-4401', reservationId: 'RES-2026-0451', customerId: 'KL-1001', customerName: 'Walter Van de Geest', number: 'FIN-2026-441', date: '25-03-2026', amount: 380, outstanding: 0, status: 'Betaald' },
  { id: 'FAC-4402', reservationId: 'RES-2026-0453', customerId: 'KL-1002', customerName: 'Jan De Vries', number: 'FIN-2026-442', date: '24-03-2026', amount: 135, outstanding: 135, status: 'Definitief' },
  { id: 'FAC-4403', reservationId: '—', customerId: 'KL-1003', customerName: 'Marleen Bakker', number: 'FIN-2026-443', date: '22-03-2026', amount: 380, outstanding: 0, status: 'Betaald' },
  { id: 'FAC-4404', reservationId: 'RES-2026-0456', customerId: 'KL-1004', customerName: 'Pieter Jansen', number: 'FIN-2026-444', date: '20-03-2026', amount: 270, outstanding: 270, status: 'Vervallen' },
  { id: 'FAC-4405', reservationId: '—', customerId: 'KL-1006', customerName: 'Robert Smit', number: 'FIN-2026-445', date: '18-03-2026', amount: 114, outstanding: 0, status: 'Betaald' },
];

interface PunchCard {
  id: string;
  type: string;
  customerId: string;
  customerName: string;
  description: string;
  validFrom: string;
  validUntil: string;
  total: number;
  used: number;
  blocked: boolean;
}

const mockPunchCards: PunchCard[] = [
  { id: 'KNP-3021', type: '10x 1-op-1', customerId: 'KL-1001', customerName: 'Liam Van de Geest', description: 'Knipkaart 10x 1-op-1 zwemles', validFrom: '15-01-2026', validUntil: '15-01-2027', total: 10, used: 3, blocked: false },
  { id: 'KNP-3045', type: '5x 1-op-2', customerId: 'KL-1002', customerName: 'Emma De Vries', description: 'Knipkaart 5x 1-op-2 zwemles', validFrom: '01-02-2026', validUntil: '01-02-2027', total: 5, used: 3, blocked: false },
  { id: 'KNP-3050', type: '10x 1-op-1', customerId: 'KL-1003', customerName: 'Noah Bakker', description: 'Knipkaart 10x 1-op-1 zwemles', validFrom: '10-01-2026', validUntil: '10-01-2027', total: 10, used: 8, blocked: false },
  { id: 'KNP-3060', type: '3x 1-op-1', customerId: 'KL-1006', customerName: 'Mila Smit', description: 'Knipkaart 3x 1-op-1 zwemles', validFrom: '05-12-2025', validUntil: '05-12-2026', total: 3, used: 3, blocked: false },
  { id: 'KNP-3070', type: '10x Survival', customerId: 'KL-1007', customerName: 'Finn Bos', description: 'Survival pakket 10 lessen', validFrom: '08-02-2026', validUntil: '03-05-2026', total: 10, used: 4, blocked: false },
];

interface Payment {
  id: string;
  method: string;
  status: 'Betaald' | 'Afgewezen' | 'In behandeling' | 'Terugbetaald';
  amount: number;
  transaction: string;
  date: string;
  customerName: string;
  description: string;
}

const mockPayments: Payment[] = [
  { id: 'PAY-8801', method: 'Mollie (iDEAL)', status: 'Betaald', amount: 380, transaction: 'tr_8kd93hs', date: '25-03-2026', customerName: 'Walter Van de Geest', description: 'Knipkaart 10x 1-op-1' },
  { id: 'PAY-8802', method: 'Mollie (iDEAL)', status: 'Betaald', amount: 135, transaction: 'tr_9je84kt', date: '24-03-2026', customerName: 'Jan De Vries', description: 'Knipkaart 5x 1-op-2' },
  { id: 'PAY-8803', method: 'Mollie (Creditcard)', status: 'Afgewezen', amount: 270, transaction: 'tr_7hf72js', date: '20-03-2026', customerName: 'Pieter Jansen', description: 'Knipkaart 10x 1-op-2' },
  { id: 'PAY-8804', method: 'Handmatig', status: 'Betaald', amount: 380, transaction: '—', date: '22-03-2026', customerName: 'Marleen Bakker', description: 'Knipkaart 10x 1-op-1' },
  { id: 'PAY-8805', method: 'Mollie (iDEAL)', status: 'Terugbetaald', amount: 38, transaction: 'tr_4gd56pq', date: '21-03-2026', customerName: 'Mila Smit', description: 'Annulering RES-2026-0455' },
  { id: 'PAY-8806', method: 'Mollie (iDEAL)', status: 'In behandeling', amount: 114, transaction: 'tr_2ab34mn', date: '26-03-2026', customerName: 'Robert Smit', description: 'Knipkaart 3x 1-op-1' },
];

interface Task {
  id: string;
  priority: 'Hoog' | 'Middel' | 'Laag';
  status: 'Open' | 'Gestart' | 'Voltooid';
  description: string;
  category: string;
  deadline: string;
  assignedTo: string;
}

const mockTasks: Task[] = [
  { id: 'T-001', priority: 'Hoog', status: 'Open', description: 'Bel ouders Sophie Jansen over wachtlijst', category: 'Klant', deadline: '27-03-2026', assignedTo: 'Walter' },
  { id: 'T-002', priority: 'Middel', status: 'Open', description: 'Factuur FIN-2026-444 opvolgen (vervallen)', category: 'Factuur', deadline: '28-03-2026', assignedTo: 'Walter' },
  { id: 'T-003', priority: 'Hoog', status: 'Gestart', description: 'Nieuwe instructeur inwerken voor locatie Soest', category: 'Personeel', deadline: '31-03-2026', assignedTo: 'Walter' },
  { id: 'T-004', priority: 'Laag', status: 'Open', description: 'Vakantie rooster mei voorbereiden', category: 'Planning', deadline: '15-04-2026', assignedTo: 'Walter' },
  { id: 'T-005', priority: 'Middel', status: 'Voltooid', description: 'Diploma certificaten bestellen bij drukkerij', category: 'Administratie', deadline: '22-03-2026', assignedTo: 'Walter' },
];

interface Registration {
  id: string;
  parentName: string;
  childName: string;
  email: string;
  phone: string;
  requestDate: string;
  preferredLocation: string;
  preferredType: string;
  status: 'Nieuw' | 'Goedgekeurd' | 'Afgewezen';
  notes: string;
}

const mockRegistrations: Registration[] = [
  { id: 'REG-101', parentName: 'Anna Konings', childName: 'Lucas Konings', email: 'anna@example.nl', phone: '+31 6 11223344', requestDate: '25-03-2026', preferredLocation: 'Nijkerk', preferredType: '1-op-1', status: 'Nieuw', notes: 'Via website aanmelding' },
  { id: 'REG-102', parentName: 'Peter Hendriks', childName: 'Eva Hendriks', email: 'peter@example.nl', phone: '+31 6 22334455', requestDate: '24-03-2026', preferredLocation: 'De Bilt', preferredType: '1-op-2', status: 'Nieuw', notes: 'Via website aanmelding' },
  { id: 'REG-103', parentName: 'Sandra Meijer', childName: 'Tom Meijer', email: 'sandra@example.nl', phone: '+31 6 33445566', requestDate: '23-03-2026', preferredLocation: 'Garderen', preferredType: '1-op-1', status: 'Nieuw', notes: 'Doorverwijzing van klant KL-1001' },
  { id: 'REG-104', parentName: 'Mark de Wit', childName: 'Sara de Wit', email: 'mark@example.nl', phone: '+31 6 44556677', requestDate: '20-03-2026', preferredLocation: 'Dordrecht', preferredType: '1-op-2', status: 'Goedgekeurd', notes: 'Account is aangemaakt' },
  { id: 'REG-105', parentName: 'Bas Vink', childName: 'Lotte Vink', email: 'bas@example.nl', phone: '+31 6 55667788', requestDate: '18-03-2026', preferredLocation: 'Wolfheze', preferredType: '1-op-1', status: 'Afgewezen', notes: 'Geen plek beschikbaar in Wolfheze' },
];

interface Instructor {
  id: string;
  name: string;
  email: string;
  phone: string;
  locations: string[];
  specialties: string[];
  status: 'Actief' | 'Verlof' | 'Inactief';
  studentsCount: number;
  lessonsThisWeek: number;
}

const mockInstructors: Instructor[] = [
  { id: 'INS-01', name: 'Walter Van de Geest', email: 'walter@snorkeltje.nl', phone: '+31 6 12345678', locations: ['Nijkerk', 'De Bilt', 'Garderen'], specialties: ['Diploma A', 'Diploma B', 'Survival'], status: 'Actief', studentsCount: 45, lessonsThisWeek: 22 },
  { id: 'INS-02', name: 'Maaike van Dijk', email: 'maaike@snorkeltje.nl', phone: '+31 6 98765432', locations: ['Wolfheze', 'Dordrecht'], specialties: ['Diploma A', 'Watergewenning'], status: 'Actief', studentsCount: 32, lessonsThisWeek: 18 },
  { id: 'INS-03', name: 'Jeroen Peters', email: 'jeroen@snorkeltje.nl', phone: '+31 6 11122233', locations: ['Mierlo', 'Soest'], specialties: ['Diploma A', 'Survival'], status: 'Verlof', studentsCount: 28, lessonsThisWeek: 0 },
];

// ─── Helper Components ───
const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, { bg: string; text: string }> = {
    'Actief': { bg: '#ECFDF5', text: '#065F46' }, 'Bevestigd': { bg: '#ECFDF5', text: '#065F46' }, 'Betaald': { bg: '#ECFDF5', text: '#065F46' }, 'Voltooid': { bg: '#ECFDF5', text: '#065F46' }, 'Goedgekeurd': { bg: '#ECFDF5', text: '#065F46' },
    'Inactief': { bg: '#F3F4F6', text: '#6B7280' }, 'Geannuleerd': { bg: '#FEF2F2', text: '#991B1B' }, 'Afgewezen': { bg: '#FEF2F2', text: '#991B1B' }, 'Vervallen': { bg: '#FEF2F2', text: '#991B1B' }, 'No-show': { bg: '#FEF2F2', text: '#991B1B' },
    'Wachtlijst': { bg: '#FFF7ED', text: '#9A3412' }, 'Nieuw': { bg: '#EFF6FF', text: '#1E40AF' }, 'Open': { bg: '#EFF6FF', text: '#1E40AF' }, 'Gestart': { bg: '#FFF7ED', text: '#9A3412' },
    'In behandeling': { bg: '#FFF7ED', text: '#9A3412' }, 'Definitief': { bg: '#EFF6FF', text: '#1E40AF' }, 'Concept': { bg: '#F3F4F6', text: '#6B7280' }, 'Terugbetaald': { bg: '#F5F3FF', text: '#5B21B6' },
    'Hoog': { bg: '#FEF2F2', text: '#991B1B' }, 'Middel': { bg: '#FFF7ED', text: '#9A3412' }, 'Laag': { bg: '#ECFDF5', text: '#065F46' }, 'Verlof': { bg: '#FFF7ED', text: '#9A3412' },
  };
  const c = colors[status] || { bg: '#F3F4F6', text: '#6B7280' };
  return <span className="px-2.5 py-1 rounded-full inline-block" style={{ background: c.bg, color: c.text, fontSize: 11, fontWeight: 600 }}>{status}</span>;
};

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

const DataTable = ({ columns, data, onRowClick }: { columns: { key: string; label: string; width?: string }[]; data: Record<string, any>[]; onRowClick?: (row: any) => void }) => (
  <div className="overflow-x-auto">
    <table className="w-full" style={{ fontSize: 13 }}>
      <thead>
        <tr className="bg-[#F8FAFC] border-b border-[#E8ECF4]">
          {columns.map(col => <th key={col.key} className="text-left px-4 py-3 text-[#6B7B94]" style={{ fontWeight: 600, fontSize: 11, width: col.width }}>{col.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className={`border-b border-[#F0F4FA] hover:bg-[#F8FAFC] transition-colors ${onRowClick ? 'cursor-pointer' : ''}`} onClick={() => onRowClick?.(row)}>
            {columns.map(col => (
              <td key={col.key} className="px-4 py-3 text-[#1A1A2E]">
                {col.key === 'status' || col.key === 'priority' ? <StatusBadge status={row[col.key]} /> : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StatCard = ({ icon: Icon, label, value, change, changeType, color }: {
  icon: any; label: string; value: string; change: string; changeType: 'up' | 'down'; color: string;
}) => (
  <Card className="p-5">
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}12` }}><Icon size={20} color={color} /></div>
      <div className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full ${changeType === 'up' ? 'bg-[#ECFDF5] text-[#065F46]' : 'bg-[#FEF2F2] text-[#991B1B]'}`} style={{ fontSize: 11, fontWeight: 600 }}>
        {changeType === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{change}
      </div>
    </div>
    <p className="text-[#1A1A2E]" style={{ fontSize: 24, fontWeight: 800 }}>{value}</p>
    <p className="text-[#6B7B94] mt-0.5" style={{ fontSize: 12 }}>{label}</p>
  </Card>
);

// ─── Products for reservation ───
const PRODUCTS = [
  { id: 'P001', name: 'Nijkerk 1-op-1 dinsdag 12.00 uur', location: 'Nijkerk', type: '1-op-1', day: 'Dinsdag', time: '12:00', duration: 30, price: 38, maxStudents: 1, instructor: 'Walter Van de Geest' },
  { id: 'P002', name: 'Nijkerk 1-op-1 dinsdag 12.30 uur', location: 'Nijkerk', type: '1-op-1', day: 'Dinsdag', time: '12:30', duration: 30, price: 38, maxStudents: 1, instructor: 'Walter Van de Geest' },
  { id: 'P003', name: 'De Bilt 1-op-2 woensdag 14.00 uur', location: 'De Bilt', type: '1-op-2', day: 'Woensdag', time: '14:00', duration: 30, price: 27, maxStudents: 2, instructor: 'Walter Van de Geest' },
  { id: 'P004', name: 'Garderen 1-op-1 donderdag 10.00 uur', location: 'Garderen', type: '1-op-1', day: 'Donderdag', time: '10:00', duration: 30, price: 38, maxStudents: 1, instructor: 'Walter Van de Geest' },
  { id: 'P005', name: 'Wolfheze 1-op-2 vrijdag 15.00 uur', location: 'Wolfheze', type: '1-op-2', day: 'Vrijdag', time: '15:00', duration: 30, price: 27, maxStudents: 2, instructor: 'Maaike van Dijk' },
  { id: 'P006', name: 'Dordrecht 1-op-1 maandag 11.00 uur', location: 'Dordrecht', type: '1-op-1', day: 'Maandag', time: '11:00', duration: 30, price: 38, maxStudents: 1, instructor: 'Maaike van Dijk' },
  { id: 'P007', name: 'Mierlo 1-op-3 maandag 13.00 uur', location: 'Mierlo', type: '1-op-3', day: 'Maandag', time: '13:00', duration: 30, price: 22, maxStudents: 3, instructor: 'Jeroen Peters' },
  { id: 'P008', name: 'Soest Survival zaterdag 10.00 uur', location: 'Soest', type: 'Survival', day: 'Zaterdag', time: '10:00', duration: 45, price: 45, maxStudents: 6, instructor: 'Jeroen Peters' },
  { id: 'P009', name: 'Nijkerk Vakantie 1-op-1 extra', location: 'Nijkerk', type: '1-op-1', day: 'Flexibel', time: '09:00', duration: 30, price: 39, maxStudents: 1, instructor: 'Walter Van de Geest', isHoliday: true },
];

const TIMESLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

const EXISTING_BOOKINGS = [
  { date: '2026-04-01', time: '12:00', productId: 'P001' },
  { date: '2026-04-01', time: '12:30', productId: 'P002' },
  { date: '2026-04-08', time: '12:00', productId: 'P001' },
];

// ─── ADVANCED RESERVATION FORM ───
function AdvancedReservationForm({ goTo, showToast, customers, punchCards }: {
  goTo: (v: AdminView) => void;
  showToast: (msg: string) => void;
  customers: Customer[];
  punchCards: PunchCard[];
}) {
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [showCustomerResults, setShowCustomerResults] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [numberOfPlaces, setNumberOfPlaces] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'knipkaart' | 'mollie' | 'handmatig' | 'factuur' | ''>('');
  const [selectedPunchCardId, setSelectedPunchCardId] = useState('');
  const [notes, setNotes] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringWeeks, setRecurringWeeks] = useState(4);
  const [recurringSkipDates, setRecurringSkipDates] = useState<string[]>([]);
  const [sendConfirmation, setSendConfirmation] = useState(true);
  const [sendReminder, setSendReminder] = useState(true);
  const [reminderHours, setReminderHours] = useState(24);
  const [priority, setPriority] = useState<'normaal' | 'hoog' | 'vip'>('normaal');
  const [customFields, setCustomFields] = useState<Record<string, string>>({});
  const [showConflictWarning, setShowConflictWarning] = useState(false);
  const [show14DayWarning, setShow14DayWarning] = useState(false);
  const [showHolidayPolicy, setShowHolidayPolicy] = useState(false);
  const [autoConversion, setAutoConversion] = useState(false);
  const [discountType, setDiscountType] = useState<'' | 'percentage' | 'fixed'>('');
  const [discountValue, setDiscountValue] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ parentName: '', childFirst: '', childLast: '', email: '', phone: '' });

  const product = PRODUCTS.find(p => p.id === selectedProduct);
  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      if (locationFilter && p.location !== locationFilter) return false;
      if (typeFilter && p.type !== typeFilter) return false;
      return true;
    });
  }, [locationFilter, typeFilter]);

  const searchResults = useMemo(() => {
    if (!customerSearch.trim()) return [];
    const q = customerSearch.toLowerCase();
    return customers.filter(c =>
      c.childFirst.toLowerCase().includes(q) ||
      c.childLast.toLowerCase().includes(q) ||
      c.parentName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q)
    );
  }, [customerSearch, customers]);

  const customerPunchCards = useMemo(() => {
    if (!selectedCustomerId) return [];
    return punchCards.filter(pc => pc.customerId === selectedCustomerId && !pc.blocked && pc.used < pc.total);
  }, [selectedCustomerId, punchCards]);

  const availableSlots = useMemo(() => {
    if (!selectedDate || !selectedProduct) return TIMESLOTS.map(t => ({ time: t, available: true }));
    return TIMESLOTS.map(t => ({
      time: t,
      available: !EXISTING_BOOKINGS.some(b => b.date === selectedDate && b.time === t && b.productId === selectedProduct)
    }));
  }, [selectedDate, selectedProduct]);

  // 14-day rule check
  useEffect(() => {
    if (selectedDate) {
      const bookDate = new Date(selectedDate);
      const now = new Date();
      const diffDays = Math.ceil((bookDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      setShow14DayWarning(diffDays < 14 && diffDays >= 0);
      // Holiday policy check (check if within school holiday period)
      const month = bookDate.getMonth();
      setShowHolidayPolicy(month === 6 || month === 7 || month === 11); // Jul, Aug, Dec
    }
  }, [selectedDate]);

  // Auto-detect end time
  useEffect(() => {
    if (selectedTime && product) {
      const [h, m] = selectedTime.split(':').map(Number);
      const endMinutes = h * 60 + m + product.duration;
      setEndTime(`${String(Math.floor(endMinutes / 60)).padStart(2, '0')}:${String(endMinutes % 60).padStart(2, '0')}`);
    }
  }, [selectedTime, product]);

  // Conflict check
  useEffect(() => {
    if (selectedDate && selectedTime && selectedProduct) {
      const conflict = EXISTING_BOOKINGS.some(b => b.date === selectedDate && b.time === selectedTime && b.productId === selectedProduct);
      setShowConflictWarning(conflict);
    }
  }, [selectedDate, selectedTime, selectedProduct]);

  // Price calculation
  const basePrice = product?.price ?? 0;
  const totalPlaces = Math.min(numberOfPlaces, product?.maxStudents ?? 1);
  const subtotal = basePrice * totalPlaces;
  const discountAmount = discountType === 'percentage' ? subtotal * (discountValue / 100) : discountType === 'fixed' ? discountValue : 0;
  const finalPrice = Math.max(0, subtotal - discountAmount);
  const recurringTotal = isRecurring ? finalPrice * (recurringWeeks - recurringSkipDates.length) : finalPrice;

  // Generate recurring dates
  const recurringDates = useMemo(() => {
    if (!isRecurring || !selectedDate) return [];
    const dates: string[] = [];
    const start = new Date(selectedDate);
    for (let i = 0; i < recurringWeeks; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i * 7);
      const ds = d.toISOString().split('T')[0];
      dates.push(ds);
    }
    return dates;
  }, [isRecurring, selectedDate, recurringWeeks]);

  const canProceedStep1 = !!selectedProduct;
  const canProceedStep2 = !!selectedCustomerId;
  const canProceedStep3 = !!selectedDate && !!selectedTime && !showConflictWarning;
  const canProceedStep4 = !!paymentMethod && (paymentMethod !== 'knipkaart' || !!selectedPunchCardId);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const resId = `RES-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;
      showToast(`✅ Reservering ${resId} aangemaakt! ${isRecurring ? `(${recurringWeeks - recurringSkipDates.length} lessen gepland)` : ''} ${sendConfirmation ? '• Bevestigingsmail verstuurd' : ''}`);
      goTo('reservations');
    }, 1500);
  };

  const StepIndicator = () => (
    <div className="flex items-center gap-1 mb-6">
      {[
        { n: 1, label: 'Product', icon: Tag },
        { n: 2, label: 'Klant', icon: Users },
        { n: 3, label: 'Planning', icon: Calendar },
        { n: 4, label: 'Betaling', icon: Banknote },
        { n: 5, label: 'Bevestiging', icon: ClipboardCheck },
      ].map(({ n, label, icon: Icon }, i) => (
        <div key={n} className="flex items-center">
          <button
            onClick={() => { if (n < step) setStep(n); }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${step === n ? 'bg-[#0365C4] text-white shadow-md' : n < step ? 'bg-[#ECFDF5] text-[#065F46] cursor-pointer hover:bg-[#D1FAE5]' : 'bg-[#F4F7FC] text-[#A0AEC0]'}`}
            style={{ fontSize: 12, fontWeight: 600 }}
          >
            {n < step ? <Check size={14} /> : <Icon size={14} />}
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{n}</span>
          </button>
          {i < 4 && <ChevronRight size={14} className="mx-0.5 text-[#C0C8D4]" />}
        </div>
      ))}
    </div>
  );

  const FieldLabel = ({ children, required = false, tooltip }: { children: React.ReactNode; required?: boolean; tooltip?: string }) => (
    <label className="text-[#6B7B94] flex items-center gap-1 mb-1.5" style={{ fontSize: 12, fontWeight: 600 }}>
      {children}{required && <span className="text-[#E74C3C]">*</span>}
      {tooltip && <span title={tooltip}><Info size={12} className="text-[#C0C8D4] cursor-help" /></span>}
    </label>
  );

  const InputField = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} className={`w-full px-3 py-2.5 rounded-lg border outline-none transition-all text-[#1A1A2E] ${props.className || ''}`}
      style={{ fontSize: 14, borderColor: '#E8ECF4', ...props.style }}
      onFocus={(e) => { e.target.style.borderColor = '#0365C4'; e.target.style.boxShadow = '0 0 0 3px rgba(3,101,196,0.1)'; props.onFocus?.(e); }}
      onBlur={(e) => { e.target.style.borderColor = '#E8ECF4'; e.target.style.boxShadow = 'none'; props.onBlur?.(e); }}
    />
  );

  return (
    <>
      <PageHeader title="Nieuwe reservering" subtitle="Maak een nieuwe boeking aan" actions={
        <div className="flex items-center gap-2">
          {priority === 'vip' && <span className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FF5C00]/10 text-[#FF5C00]" style={{ fontSize: 12, fontWeight: 700 }}><Star size={13} /> VIP Boeking</span>}
          <button onClick={() => goTo('reservations')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4] hover:bg-[#F4F7FC]" style={{ fontSize: 13 }}><ArrowLeft size={16} /> Terug</button>
        </div>
      } />

      <StepIndicator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Form Area */}
        <div className="lg:col-span-2">
          {/* ── STEP 1: Product ── */}
          {step === 1 && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#0365C4', color: 'white' }}><Tag size={16} /></div>
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 17, fontWeight: 700 }}>Selecteer product</h3>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <FieldLabel>Locatie filter</FieldLabel>
                  <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none text-[#1A1A2E]" style={{ fontSize: 14 }}>
                    <option value="">Alle locaties</option>
                    {['Nijkerk', 'De Bilt', 'Garderen', 'Wolfheze', 'Dordrecht', 'Mierlo', 'Soest'].map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <FieldLabel>Type filter</FieldLabel>
                  <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none text-[#1A1A2E]" style={{ fontSize: 14 }}>
                    <option value="">Alle types</option>
                    <option>1-op-1</option><option>1-op-2</option><option>1-op-3</option><option>Survival</option>
                  </select>
                </div>
              </div>

              {/* Product cards */}
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {filteredProducts.map(p => (
                  <button
                    key={p.id}
                    onClick={() => { setSelectedProduct(p.id); setNumberOfPlaces(1); }}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all hover:shadow-sm ${selectedProduct === p.id ? 'border-[#0365C4] bg-[#0365C4]/5' : 'border-[#E8ECF4] hover:border-[#C0C8D4]'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedProduct === p.id ? 'bg-[#0365C4] text-white' : 'bg-[#F4F7FC] text-[#6B7B94]'}`}>
                          <Waves size={18} />
                        </div>
                        <div>
                          <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[#6B7B94] flex items-center gap-1" style={{ fontSize: 12 }}><MapPin size={11} /> {p.location}</span>
                            <span className="text-[#C0C8D4]">•</span>
                            <span className="text-[#6B7B94]" style={{ fontSize: 12 }}>{p.type}</span>
                            <span className="text-[#C0C8D4]">•</span>
                            <span className="text-[#6B7B94]" style={{ fontSize: 12 }}>{p.duration} min</span>
                            <span className="text-[#C0C8D4]">•</span>
                            <span className="text-[#6B7B94]" style={{ fontSize: 12 }}>{p.instructor}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[#0365C4]" style={{ fontSize: 16, fontWeight: 800 }}>€{p.price}</p>
                        <p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>per les</p>
                        {(p as any).isHoliday && <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#FF5C00]/10 text-[#FF5C00]" style={{ fontSize: 10, fontWeight: 600 }}>Vakantie</span>}
                      </div>
                    </div>
                    {selectedProduct === p.id && (
                      <div className="mt-3 pt-3 border-t border-[#E8ECF4]">
                        <div className="grid grid-cols-3 gap-3">
                          <div><span className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Max leerlingen</span><p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>{p.maxStudents}</p></div>
                          <div><span className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Dag</span><p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>{p.day}</p></div>
                          <div><span className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Standaard tijd</span><p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>{p.time}</p></div>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-8 text-[#A0AEC0]" style={{ fontSize: 14 }}>Geen producten gevonden met deze filters</div>
                )}
              </div>

              {/* Auto-conversion toggle */}
              {product && product.type === '1-op-1' && (
                <div className="mt-4 p-3 rounded-lg bg-[#FFF7ED] border border-[#FDDCB5]">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" checked={autoConversion} onChange={e => setAutoConversion(e.target.checked)} className="mt-1 w-4 h-4 accent-[#FF5C00]" />
                    <div>
                      <p className="text-[#9A3412]" style={{ fontSize: 13, fontWeight: 600 }}><Repeat size={13} className="inline mr-1" />Auto-conversie 1-op-1 → 1-op-2</p>
                      <p className="text-[#C2793D]" style={{ fontSize: 12 }}>Als er een 2e leerling beschikbaar is, automatisch converteren naar 1-op-2 les met prijsverschil teruggave (€{product.price - 27} per les)</p>
                    </div>
                  </label>
                </div>
              )}

              <div className="flex justify-end mt-5">
                <button disabled={!canProceedStep1} onClick={() => setStep(2)} className={`flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-white transition-all ${canProceedStep1 ? 'bg-[#0365C4] hover:bg-[#024ea0] shadow-md' : 'bg-[#C0C8D4] cursor-not-allowed'}`} style={{ fontSize: 14, fontWeight: 700 }}>
                  Volgende <ArrowRight size={16} />
                </button>
              </div>
            </Card>
          )}

          {/* ── STEP 2: Customer ── */}
          {step === 2 && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#00C1FF', color: 'white' }}><Users size={16} /></div>
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 17, fontWeight: 700 }}>Selecteer klant</h3>
              </div>

              <div className="relative mb-4">
                <FieldLabel required>Zoek klant</FieldLabel>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C0C8D4]" />
                    <InputField
                      placeholder="Zoek op naam, e-mail of klantnummer..."
                      value={customerSearch}
                      onChange={e => { setCustomerSearch(e.target.value); setShowCustomerResults(true); }}
                      onFocus={() => setShowCustomerResults(true)}
                      style={{ paddingLeft: 36, fontSize: 14 }}
                    />
                  </div>
                  <button onClick={() => setShowNewCustomerForm(!showNewCustomerForm)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[#0365C4] bg-[#0365C4]/10 hover:bg-[#0365C4]/20 transition-colors" style={{ fontSize: 13, fontWeight: 600 }}>
                    <UserPlus size={15} /> Nieuw
                  </button>
                </div>

                {/* Search results dropdown */}
                {showCustomerResults && searchResults.length > 0 && (
                  <div className="absolute z-20 w-full mt-1 bg-white rounded-xl shadow-xl border border-[#E8ECF4] max-h-[300px] overflow-y-auto">
                    {searchResults.map(c => (
                      <button
                        key={c.id}
                        onClick={() => { setSelectedCustomerId(c.id); setCustomerSearch(`${c.childFirst} ${c.childLast}`); setShowCustomerResults(false); }}
                        className="w-full text-left px-4 py-3 hover:bg-[#F4F7FC] border-b border-[#F0F4FA] last:border-0 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>{c.childFirst} {c.childLast}</p>
                            <p className="text-[#6B7B94]" style={{ fontSize: 12 }}>{c.parentName} • {c.email}</p>
                          </div>
                          <div className="text-right">
                            <StatusBadge status={c.status} />
                            <p className="text-[#A0AEC0] mt-1" style={{ fontSize: 11 }}>{c.id}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* New customer quick-add form */}
              {showNewCustomerForm && (
                <Card className="p-4 mb-4" style={{ background: '#F8FAFC' }}>
                  <h4 className="text-[#1A1A2E] mb-3" style={{ fontSize: 14, fontWeight: 700 }}>Nieuwe klant toevoegen</h4>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div><FieldLabel required>Voornaam kind</FieldLabel><InputField placeholder="Voornaam" value={newCustomer.childFirst} onChange={e => setNewCustomer(p => ({ ...p, childFirst: e.target.value }))} /></div>
                    <div><FieldLabel required>Achternaam kind</FieldLabel><InputField placeholder="Achternaam" value={newCustomer.childLast} onChange={e => setNewCustomer(p => ({ ...p, childLast: e.target.value }))} /></div>
                  </div>
                  <div className="mb-3"><FieldLabel required>Naam ouder/verzorger</FieldLabel><InputField placeholder="Volledige naam" value={newCustomer.parentName} onChange={e => setNewCustomer(p => ({ ...p, parentName: e.target.value }))} /></div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div><FieldLabel required>E-mail</FieldLabel><InputField type="email" placeholder="email@voorbeeld.nl" value={newCustomer.email} onChange={e => setNewCustomer(p => ({ ...p, email: e.target.value }))} /></div>
                    <div><FieldLabel required>Telefoon</FieldLabel><InputField placeholder="+31 6 ..." value={newCustomer.phone} onChange={e => setNewCustomer(p => ({ ...p, phone: e.target.value }))} /></div>
                  </div>
                  <button onClick={() => {
                    const nId = `KL-${Math.floor(Math.random() * 9000) + 1000}`;
                    setSelectedCustomerId(nId);
                    setCustomerSearch(`${newCustomer.childFirst} ${newCustomer.childLast}`);
                    setShowNewCustomerForm(false);
                    showToast(`Klant ${nId} aangemaakt: ${newCustomer.childFirst} ${newCustomer.childLast}`);
                  }} className="px-4 py-2 rounded-lg text-white" style={{ background: '#27AE60', fontSize: 13, fontWeight: 600 }} disabled={!newCustomer.childFirst || !newCustomer.parentName || !newCustomer.email}>
                    <Check size={14} className="inline mr-1" /> Klant aanmaken & selecteren
                  </button>
                </Card>
              )}

              {/* Selected customer info */}
              {selectedCustomer && (
                <Card className="p-4 mb-4" style={{ borderLeft: '4px solid #0365C4' }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>{selectedCustomer.childFirst} {selectedCustomer.childLast}</p>
                        <StatusBadge status={selectedCustomer.status} />
                        <span className="text-[#A0AEC0]" style={{ fontSize: 11 }}>{selectedCustomer.id}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-2">
                        <p className="flex items-center gap-1.5 text-[#6B7B94]" style={{ fontSize: 12 }}><Users size={12} /> {selectedCustomer.parentName}</p>
                        <p className="flex items-center gap-1.5 text-[#6B7B94]" style={{ fontSize: 12 }}><Mail size={12} /> {selectedCustomer.email}</p>
                        <p className="flex items-center gap-1.5 text-[#6B7B94]" style={{ fontSize: 12 }}><Phone size={12} /> {selectedCustomer.mobile}</p>
                        <p className="flex items-center gap-1.5 text-[#6B7B94]" style={{ fontSize: 12 }}><MapPin size={12} /> {selectedCustomer.location}</p>
                        <p className="flex items-center gap-1.5 text-[#6B7B94]" style={{ fontSize: 12 }}><Target size={12} /> {selectedCustomer.progress}</p>
                        <p className="flex items-center gap-1.5 text-[#6B7B94]" style={{ fontSize: 12 }}><Calendar size={12} /> {selectedCustomer.lessonType} - {selectedCustomer.day}</p>
                      </div>
                    </div>
                    <button onClick={() => { setSelectedCustomerId(''); setCustomerSearch(''); }} className="text-[#C0C8D4] hover:text-[#E74C3C]"><X size={16} /></button>
                  </div>
                  {/* Punch card info */}
                  {customerPunchCards.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#E8ECF4]">
                      <p className="text-[#6B7B94] mb-1.5" style={{ fontSize: 11, fontWeight: 600 }}>BESCHIKBARE KNIPKAARTEN</p>
                      <div className="flex flex-wrap gap-2">
                        {customerPunchCards.map(pc => (
                          <span key={pc.id} className="px-2.5 py-1.5 rounded-lg bg-[#ECFDF5] text-[#065F46]" style={{ fontSize: 12, fontWeight: 600 }}>
                            <CreditCard size={11} className="inline mr-1" />{pc.type} — {pc.total - pc.used}/{pc.total} resterend
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              )}

              {/* Priority selector */}
              <div className="mb-4">
                <FieldLabel tooltip="VIP boekingen krijgen voorrang bij planning en krijgen extra notificaties">Prioriteit</FieldLabel>
                <div className="flex gap-2">
                  {([['normaal', 'Normaal', '#6B7B94'], ['hoog', 'Hoog', '#E67E22'], ['vip', 'VIP', '#FF5C00']] as const).map(([val, label, color]) => (
                    <button key={val} onClick={() => setPriority(val)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 transition-all ${priority === val ? 'border-current shadow-sm' : 'border-[#E8ECF4]'}`} style={{ color: priority === val ? color : '#A0AEC0', fontSize: 13, fontWeight: 600, background: priority === val ? `${color}08` : 'white' }}>
                      {val === 'vip' && <Star size={13} />}{val === 'hoog' && <AlertCircle size={13} />}{label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-5">
                <button onClick={() => setStep(1)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[#6B7B94] border border-[#E8ECF4]" style={{ fontSize: 14, fontWeight: 600 }}><ArrowLeft size={16} /> Vorige</button>
                <button disabled={!canProceedStep2} onClick={() => setStep(3)} className={`flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-white transition-all ${canProceedStep2 ? 'bg-[#0365C4] hover:bg-[#024ea0] shadow-md' : 'bg-[#C0C8D4] cursor-not-allowed'}`} style={{ fontSize: 14, fontWeight: 700 }}>
                  Volgende <ArrowRight size={16} />
                </button>
              </div>
            </Card>
          )}

          {/* ── STEP 3: Planning ── */}
          {step === 3 && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#27AE60', color: 'white' }}><Calendar size={16} /></div>
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 17, fontWeight: 700 }}>Planning & tijdslot</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <FieldLabel required tooltip="Boekingen moeten minimaal 14 dagen van tevoren">Datum</FieldLabel>
                  <InputField type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                </div>
                <div>
                  <FieldLabel>Aantal plaatsen</FieldLabel>
                  <select value={numberOfPlaces} onChange={e => setNumberOfPlaces(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none text-[#1A1A2E]" style={{ fontSize: 14 }}>
                    {Array.from({ length: product?.maxStudents ?? 1 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                  </select>
                </div>
              </div>

              {/* 14-day warning */}
              {show14DayWarning && (
                <div className="mb-4 p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA] flex items-start gap-2">
                  <AlertTriangle size={16} className="text-[#E74C3C] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#991B1B]" style={{ fontSize: 13, fontWeight: 600 }}>14-dagen boekingsregel</p>
                    <p className="text-[#B91C1C]" style={{ fontSize: 12 }}>Deze datum is minder dan 14 dagen van nu. Klanten boeken normaal minimaal 14 dagen vooruit. Als admin kunt u deze regel overrulen.</p>
                    <button className="mt-1 text-[#991B1B] underline" style={{ fontSize: 12, fontWeight: 600 }}>Overrule regel →</button>
                  </div>
                </div>
              )}

              {/* Holiday policy */}
              {showHolidayPolicy && (
                <div className="mb-4 p-3 rounded-lg bg-[#FFF7ED] border border-[#FDDCB5] flex items-start gap-2">
                  <Gift size={16} className="text-[#FF5C00] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#9A3412]" style={{ fontSize: 13, fontWeight: 600 }}>Vakantieperiode — 96-uur annuleringsbeleid</p>
                    <p className="text-[#C2793D]" style={{ fontSize: 12 }}>Deze datum valt in een vakantieperiode. Annulering moet 96 uur (4 dagen) van tevoren in plaats van de standaard 24 uur.</p>
                  </div>
                </div>
              )}

              {/* Timeslot grid */}
              <div className="mb-4">
                <FieldLabel required>Selecteer tijdslot</FieldLabel>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {availableSlots.map(slot => (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2.5 rounded-lg border-2 transition-all ${selectedTime === slot.time ? 'border-[#0365C4] bg-[#0365C4] text-white shadow-md' : slot.available ? 'border-[#E8ECF4] hover:border-[#0365C4]/40 text-[#1A1A2E]' : 'border-[#F0F4FA] bg-[#F8FAFC] text-[#C0C8D4] cursor-not-allowed line-through'}`}
                      style={{ fontSize: 13, fontWeight: 600 }}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              {selectedTime && (
                <div className="p-3 rounded-lg bg-[#F4F7FC] mb-4 flex items-center gap-4">
                  <div><span className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Van</span><p className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>{selectedTime}</p></div>
                  <ArrowRight size={16} className="text-[#C0C8D4]" />
                  <div><span className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Tot</span><p className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>{endTime}</p></div>
                  <div className="ml-auto"><span className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Duur</span><p className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>{product?.duration} min</p></div>
                </div>
              )}

              {/* Conflict warning */}
              {showConflictWarning && (
                <div className="mb-4 p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA] flex items-start gap-2">
                  <XCircle size={16} className="text-[#E74C3C] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#991B1B]" style={{ fontSize: 13, fontWeight: 600 }}>Tijdslot conflict!</p>
                    <p className="text-[#B91C1C]" style={{ fontSize: 12 }}>Er bestaat al een boeking voor dit product op dit tijdstip. Kies een ander tijdslot.</p>
                  </div>
                </div>
              )}

              {/* Recurring booking */}
              <div className="p-4 rounded-xl border border-[#E8ECF4] mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={isRecurring} onChange={e => setIsRecurring(e.target.checked)} className="w-4 h-4 accent-[#0365C4]" />
                  <span className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}><Repeat size={14} className="inline mr-1" />Herhalende boeking</span>
                </label>
                {isRecurring && (
                  <div className="mt-3 pl-6 space-y-3">
                    <div>
                      <FieldLabel>Aantal weken</FieldLabel>
                      <div className="flex items-center gap-2">
                        {[4, 5, 8, 10, 12].map(w => (
                          <button key={w} onClick={() => setRecurringWeeks(w)} className={`px-3 py-1.5 rounded-lg border transition-all ${recurringWeeks === w ? 'border-[#0365C4] bg-[#0365C4]/10 text-[#0365C4]' : 'border-[#E8ECF4] text-[#6B7B94]'}`} style={{ fontSize: 13, fontWeight: 600 }}>{w}x</button>
                        ))}
                        <input type="number" min={1} max={52} value={recurringWeeks} onChange={e => setRecurringWeeks(Number(e.target.value))} className="w-16 px-2 py-1.5 rounded-lg border border-[#E8ECF4] text-center text-[#1A1A2E]" style={{ fontSize: 13 }} />
                      </div>
                    </div>
                    {recurringDates.length > 0 && (
                      <div>
                        <FieldLabel tooltip="Klik op een datum om deze over te slaan">Geplande data ({recurringDates.length - recurringSkipDates.length} lessen)</FieldLabel>
                        <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto">
                          {recurringDates.map(d => {
                            const skipped = recurringSkipDates.includes(d);
                            const dateObj = new Date(d);
                            return (
                              <button key={d} onClick={() => setRecurringSkipDates(prev => skipped ? prev.filter(x => x !== d) : [...prev, d])} className={`px-2.5 py-1 rounded-md transition-all ${skipped ? 'bg-[#FEF2F2] text-[#991B1B] line-through' : 'bg-[#ECFDF5] text-[#065F46]'}`} style={{ fontSize: 11, fontWeight: 600 }}>
                                {dateObj.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-5">
                <button onClick={() => setStep(2)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[#6B7B94] border border-[#E8ECF4]" style={{ fontSize: 14, fontWeight: 600 }}><ArrowLeft size={16} /> Vorige</button>
                <button disabled={!canProceedStep3} onClick={() => setStep(4)} className={`flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-white transition-all ${canProceedStep3 ? 'bg-[#0365C4] hover:bg-[#024ea0] shadow-md' : 'bg-[#C0C8D4] cursor-not-allowed'}`} style={{ fontSize: 14, fontWeight: 700 }}>
                  Volgende <ArrowRight size={16} />
                </button>
              </div>
            </Card>
          )}

          {/* ── STEP 4: Payment ── */}
          {step === 4 && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#FF5C00', color: 'white' }}><Banknote size={16} /></div>
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 17, fontWeight: 700 }}>Betaling & korting</h3>
              </div>

              {/* Payment method */}
              <div className="mb-5">
                <FieldLabel required>Betaalmethode</FieldLabel>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    ['knipkaart', 'Knipkaart', CreditCard, '#0365C4', customerPunchCards.length > 0 ? `${customerPunchCards.length} beschikbaar` : 'Geen beschikbaar'],
                    ['mollie', 'Mollie (online)', DollarSign, '#27AE60', 'iDEAL / Creditcard'],
                    ['handmatig', 'Handmatig', Banknote, '#E67E22', 'Contant / PIN'],
                    ['factuur', 'Op factuur', FileText, '#8E44AD', 'Achteraf betalen'],
                  ] as const).map(([val, label, Icon, color, desc]) => (
                    <button key={val} onClick={() => setPaymentMethod(val)} disabled={val === 'knipkaart' && customerPunchCards.length === 0}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${paymentMethod === val ? 'border-current shadow-sm' : 'border-[#E8ECF4] hover:border-[#C0C8D4]'} ${val === 'knipkaart' && customerPunchCards.length === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
                      style={{ borderColor: paymentMethod === val ? color : undefined }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon size={16} style={{ color }} />
                        <span className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>
                      </div>
                      <p className="text-[#A0AEC0]" style={{ fontSize: 12 }}>{desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Punch card selector */}
              {paymentMethod === 'knipkaart' && customerPunchCards.length > 0 && (
                <div className="mb-5">
                  <FieldLabel required>Selecteer knipkaart</FieldLabel>
                  <div className="space-y-2">
                    {customerPunchCards.map(pc => (
                      <button key={pc.id} onClick={() => setSelectedPunchCardId(pc.id)}
                        className={`w-full p-3 rounded-lg border-2 text-left transition-all ${selectedPunchCardId === pc.id ? 'border-[#0365C4] bg-[#0365C4]/5' : 'border-[#E8ECF4]'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>{pc.id} — {pc.type}</p>
                            <p className="text-[#6B7B94]" style={{ fontSize: 12 }}>Geldig: {pc.validFrom} t/m {pc.validUntil}</p>
                          </div>
                          <div className="text-right">
                            <p style={{ fontSize: 18, fontWeight: 800, color: pc.total - pc.used <= 1 ? '#E74C3C' : '#0365C4' }}>{pc.total - pc.used}</p>
                            <p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>resterend</p>
                          </div>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-[#F0F4FA] overflow-hidden">
                          <div className="h-full rounded-full bg-[#0365C4]" style={{ width: `${(pc.used / pc.total) * 100}%` }} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Discount */}
              <div className="p-4 rounded-xl border border-[#E8ECF4] mb-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={!!discountType} onChange={e => setDiscountType(e.target.checked ? 'percentage' : '')} className="w-4 h-4 accent-[#FF5C00]" />
                  <span className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}><Percent size={14} className="inline mr-1" />Korting toepassen</span>
                </label>
                {discountType && (
                  <div className="mt-3 pl-6 flex items-center gap-3">
                    <select value={discountType} onChange={e => setDiscountType(e.target.value as any)} className="px-3 py-2 rounded-lg border border-[#E8ECF4] text-[#1A1A2E]" style={{ fontSize: 13 }}>
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Vast bedrag (€)</option>
                    </select>
                    <InputField type="number" min={0} max={discountType === 'percentage' ? 100 : subtotal} value={discountValue} onChange={e => setDiscountValue(Number(e.target.value))} style={{ width: 100, fontSize: 14 }} />
                    {discountAmount > 0 && <span className="text-[#27AE60]" style={{ fontSize: 13, fontWeight: 600 }}>-€{discountAmount.toFixed(2)}</span>}
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-5">
                <button onClick={() => setStep(3)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[#6B7B94] border border-[#E8ECF4]" style={{ fontSize: 14, fontWeight: 600 }}><ArrowLeft size={16} /> Vorige</button>
                <button disabled={!canProceedStep4} onClick={() => setStep(5)} className={`flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-white transition-all ${canProceedStep4 ? 'bg-[#0365C4] hover:bg-[#024ea0] shadow-md' : 'bg-[#C0C8D4] cursor-not-allowed'}`} style={{ fontSize: 14, fontWeight: 700 }}>
                  Volgende <ArrowRight size={16} />
                </button>
              </div>
            </Card>
          )}

          {/* ── STEP 5: Confirmation ── */}
          {step === 5 && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#27AE60', color: 'white' }}><ClipboardCheck size={16} /></div>
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 17, fontWeight: 700 }}>Bevestiging & extra opties</h3>
              </div>

              {/* Notes */}
              <div className="grid grid-cols-1 gap-4 mb-5">
                <div>
                  <FieldLabel tooltip="Zichtbaar voor klant">Opmerkingen (klant)</FieldLabel>
                  <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }} placeholder="Bv. meenemen: zwembroek, badmuts..." />
                </div>
                <div>
                  <FieldLabel tooltip="Alleen zichtbaar voor admin/instructeur">Interne notities</FieldLabel>
                  <textarea rows={2} value={internalNotes} onChange={e => setInternalNotes(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#6B7B94]" style={{ fontSize: 14, background: '#FFFBF0' }} placeholder="Interne opmerkingen voor het team..." />
                </div>
              </div>

              {/* Notification settings */}
              <div className="p-4 rounded-xl border border-[#E8ECF4] mb-5">
                <p className="text-[#1A1A2E] mb-3" style={{ fontSize: 14, fontWeight: 700 }}><Mail size={14} className="inline mr-1" />Notificatie-instellingen</p>
                <div className="space-y-2.5">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-[#6B7B94]" style={{ fontSize: 13 }}>Bevestigingsmail naar klant</span>
                    <div className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${sendConfirmation ? 'bg-[#0365C4]' : 'bg-[#E8ECF4]'}`} onClick={() => setSendConfirmation(!sendConfirmation)}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${sendConfirmation ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </div>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-[#6B7B94]" style={{ fontSize: 13 }}>Herinnering sturen</span>
                      {sendReminder && (
                        <select value={reminderHours} onChange={e => setReminderHours(Number(e.target.value))} className="px-2 py-0.5 rounded border border-[#E8ECF4] text-[#1A1A2E]" style={{ fontSize: 12 }}>
                          <option value={24}>24 uur</option><option value={48}>48 uur</option><option value={72}>72 uur</option>
                        </select>
                      )}
                    </div>
                    <div className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${sendReminder ? 'bg-[#0365C4]' : 'bg-[#E8ECF4]'}`} onClick={() => setSendReminder(!sendReminder)}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${sendReminder ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </div>
                  </label>
                </div>
              </div>

              {/* Summary review */}
              <div className="p-5 rounded-xl bg-[#F4F7FC] border border-[#E8ECF4] mb-5">
                <h4 className="text-[#1A1A2E] mb-3" style={{ fontSize: 15, fontWeight: 700 }}>Samenvatting</h4>
                <div className="space-y-2.5">
                  <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 13 }}>Product</span><span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>{product?.name || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 13 }}>Klant</span><span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>{selectedCustomer ? `${selectedCustomer.childFirst} ${selectedCustomer.childLast}` : customerSearch || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 13 }}>Datum & Tijd</span><span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>{selectedDate ? new Date(selectedDate).toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '—'} {selectedTime}–{endTime}</span></div>
                  <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 13 }}>Plaatsen</span><span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>{totalPlaces}</span></div>
                  <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 13 }}>Betaling</span><span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>{paymentMethod || '—'}{selectedPunchCardId ? ` (${selectedPunchCardId})` : ''}</span></div>
                  {isRecurring && <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 13 }}>Herhalingen</span><span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>{recurringWeeks - recurringSkipDates.length} lessen ({recurringSkipDates.length} overgeslagen)</span></div>}
                  {autoConversion && <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 13 }}>Auto-conversie</span><span className="text-[#FF5C00]" style={{ fontSize: 13, fontWeight: 600 }}>Actief (1→2)</span></div>}
                  {priority !== 'normaal' && <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 13 }}>Prioriteit</span><span style={{ fontSize: 13, fontWeight: 600, color: priority === 'vip' ? '#FF5C00' : '#E67E22' }}>{priority.toUpperCase()}</span></div>}
                  <div className="border-t border-[#E8ECF4] pt-2 mt-2">
                    {discountAmount > 0 && <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 13 }}>Subtotaal</span><span className="text-[#A0AEC0]" style={{ fontSize: 13 }}>€{subtotal.toFixed(2)}</span></div>}
                    {discountAmount > 0 && <div className="flex justify-between"><span className="text-[#27AE60]" style={{ fontSize: 13 }}>Korting</span><span className="text-[#27AE60]" style={{ fontSize: 13, fontWeight: 600 }}>-€{discountAmount.toFixed(2)}</span></div>}
                    <div className="flex justify-between"><span className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>Totaal</span><span className="text-[#0365C4]" style={{ fontSize: 20, fontWeight: 800 }}>€{recurringTotal.toFixed(2)}</span></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(4)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[#6B7B94] border border-[#E8ECF4]" style={{ fontSize: 14, fontWeight: 600 }}><ArrowLeft size={16} /> Vorige</button>
                <div className="flex gap-3">
                  <button onClick={() => goTo('reservations')} className="px-5 py-2.5 rounded-lg text-[#6B7B94] border border-[#E8ECF4]" style={{ fontSize: 14, fontWeight: 600 }}>Annuleren</button>
                  <button onClick={handleSubmit} disabled={isSubmitting} className={`flex items-center gap-2 px-8 py-3 rounded-xl text-white shadow-lg transition-all ${isSubmitting ? 'bg-[#C0C8D4]' : 'bg-[#27AE60] hover:bg-[#219a52]'}`} style={{ fontSize: 15, fontWeight: 700 }}>
                    {isSubmitting ? <><RefreshCw size={16} className="animate-spin" /> Bezig...</> : <><Check size={16} /> Reservering aanmaken</>}
                  </button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* ── Right Sidebar ── */}
        <div className="space-y-4">
          {/* Live price card */}
          <Card className="p-5">
            <h4 className="text-[#1A1A2E] mb-3" style={{ fontSize: 14, fontWeight: 700 }}>💰 Prijsoverzicht</h4>
            <div className="space-y-2">
              <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 13 }}>Basisprijs</span><span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>€{basePrice.toFixed(2)}</span></div>
              {totalPlaces > 1 && <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 13 }}>× {totalPlaces} plaatsen</span><span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>€{subtotal.toFixed(2)}</span></div>}
              {discountAmount > 0 && <div className="flex justify-between"><span className="text-[#27AE60]" style={{ fontSize: 13 }}>Korting</span><span className="text-[#27AE60]" style={{ fontSize: 13, fontWeight: 600 }}>-€{discountAmount.toFixed(2)}</span></div>}
              {isRecurring && <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 13 }}>× {recurringWeeks - recurringSkipDates.length} lessen</span><span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>€{recurringTotal.toFixed(2)}</span></div>}
              <div className="border-t border-[#E8ECF4] pt-2">
                <div className="flex justify-between"><span className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>Totaal</span><span className="text-[#0365C4]" style={{ fontSize: 22, fontWeight: 800 }}>€{recurringTotal.toFixed(2)}</span></div>
              </div>
            </div>
          </Card>

          {/* Product info */}
          {product && (
            <Card className="p-5">
              <h4 className="text-[#1A1A2E] mb-3" style={{ fontSize: 14, fontWeight: 700 }}>📋 Product details</h4>
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 12 }}>Locatie</span><span className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>{product.location}</span></div>
                <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 12 }}>Type</span><span className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>{product.type}</span></div>
                <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 12 }}>Dag</span><span className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>{product.day}</span></div>
                <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 12 }}>Duur</span><span className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>{product.duration} min</span></div>
                <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 12 }}>Instructeur</span><span className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>{product.instructor}</span></div>
                <div className="flex justify-between"><span className="text-[#6B7B94]" style={{ fontSize: 12 }}>Max leerlingen</span><span className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>{product.maxStudents}</span></div>
              </div>
            </Card>
          )}

          {/* Customer info sidebar */}
          {selectedCustomer && (
            <Card className="p-5">
              <h4 className="text-[#1A1A2E] mb-3" style={{ fontSize: 14, fontWeight: 700 }}>👤 Klant</h4>
              <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>{selectedCustomer.childFirst} {selectedCustomer.childLast}</p>
              <p className="text-[#6B7B94]" style={{ fontSize: 12 }}>{selectedCustomer.parentName}</p>
              <p className="text-[#6B7B94]" style={{ fontSize: 12 }}>{selectedCustomer.email}</p>
              <p className="text-[#6B7B94]" style={{ fontSize: 12 }}>{selectedCustomer.progress}</p>
              {customerPunchCards.length > 0 && (
                <div className="mt-2 pt-2 border-t border-[#E8ECF4]">
                  <p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Knipkaarten</p>
                  {customerPunchCards.map(pc => <p key={pc.id} className="text-[#065F46]" style={{ fontSize: 12, fontWeight: 600 }}>{pc.type}: {pc.total - pc.used} resterend</p>)}
                </div>
              )}
            </Card>
          )}

          {/* Knipkaart pricing reference */}
          <Card className="p-5">
            <h4 className="text-[#1A1A2E] mb-3" style={{ fontSize: 14, fontWeight: 700 }}>🏷️ Knipkaart tarieven</h4>
            <div className="space-y-2">
              {[
                { name: '10 lessen 1-op-1', price: '€380', per: '€38/les' },
                { name: '5 lessen 1-op-1', price: '€190', per: '€38/les' },
                { name: '3 lessen 1-op-1', price: '€114', per: '€38/les' },
                { name: '10 lessen 1-op-2', price: '€270', per: '€27/les' },
              ].map(t => (
                <div key={t.name} className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC]">
                  <span className="text-[#6B7B94]" style={{ fontSize: 12 }}>{t.name}</span>
                  <div className="text-right">
                    <span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 700 }}>{t.price}</span>
                    <span className="text-[#A0AEC0] ml-1" style={{ fontSize: 11 }}>({t.per})</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Cancellation policy */}
          <Card className="p-5">
            <h4 className="text-[#1A1A2E] mb-3" style={{ fontSize: 14, fontWeight: 700 }}>📌 Annuleringsbeleid</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2 p-2 rounded-lg bg-[#F8FAFC]">
                <Timer size={14} className="text-[#0365C4] mt-0.5 shrink-0" />
                <div><p className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>Standaard: 24 uur</p><p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Kosteloos annuleren tot 24u voor de les</p></div>
              </div>
              <div className="flex items-start gap-2 p-2 rounded-lg bg-[#FFF7ED]">
                <Gift size={14} className="text-[#FF5C00] mt-0.5 shrink-0" />
                <div><p className="text-[#9A3412]" style={{ fontSize: 12, fontWeight: 600 }}>Vakantie: 96 uur (4 dagen)</p><p className="text-[#C2793D]" style={{ fontSize: 11 }}>Vakantielessen vereisen 4 dagen annuleringstermijn</p></div>
              </div>
              <div className="flex items-start gap-2 p-2 rounded-lg bg-[#ECFDF5]">
                <Shield size={14} className="text-[#065F46] mt-0.5 shrink-0" />
                <div><p className="text-[#065F46]" style={{ fontSize: 12, fontWeight: 600 }}>14-dagen boekingsregel</p><p className="text-[#34D399]" style={{ fontSize: 11 }}>Klanten boeken minimaal 14 dagen vooruit</p></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

// ─── MAIN ADMIN SCREEN ───
export function AdminDashboardScreen() {
  const [view, setView] = useState<AdminView>('dashboard');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [registrations, setRegistrations] = useState(mockRegistrations);
  const [tasks, setTasks] = useState(mockTasks);
  const [searchFilter, setSearchFilter] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const goTo = useCallback((v: AdminView) => {
    setView(v);
    window.scrollTo({ top: 0 });
  }, []);

  const approveRegistration = (id: string) => {
    setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status: 'Goedgekeurd' as const } : r));
    showToast(`Registratie ${id} goedgekeurd! Account is aangemaakt.`);
  };

  const rejectRegistration = (id: string) => {
    setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status: 'Afgewezen' as const } : r));
    showToast(`Registratie ${id} afgewezen.`);
  };

  const completeTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'Voltooid' as const } : t));
    showToast(`Taak ${id} voltooid.`);
  };

  return (
    <AdminLayout currentView={view} onNavigate={goTo} notifications={8}>
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[100] bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl px-5 py-3 shadow-lg flex items-center gap-2" style={{ animation: 'slideDown 0.3s ease-out' }}>
          <style>{`@keyframes slideDown { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }`}</style>
          <CheckCircle2 size={18} color="#10B981" /><span className="text-[#065F46]" style={{ fontSize: 14, fontWeight: 500 }}>{toast}</span>
          <button onClick={() => setToast(null)} className="ml-2"><X size={14} color="#065F46" /></button>
        </div>
      )}

      {/* ═══════ DASHBOARD ═══════ */}
      {view === 'dashboard' && (
        <>
          <PageHeader title="Dashboard" subtitle="Overzicht van Zwemschool Snorkeltje" actions={
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ECFDF5] text-[#065F46]" style={{ fontSize: 12, fontWeight: 600 }}><span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" /> Live</span>
              <button onClick={() => showToast('Dashboard vernieuwd')} className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"><RefreshCw size={16} /></button>
            </div>
          } />

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard icon={Users} label="Totaal klanten" value="5.491" change="+12%" changeType="up" color="#0365C4" />
            <StatCard icon={Calendar} label="Reserveringen (30d)" value="2.292" change="+8%" changeType="up" color="#00C1FF" />
            <StatCard icon={DollarSign} label="Omzet (deze maand)" value="€28.700" change="+15%" changeType="up" color="#27AE60" />
            <StatCard icon={CreditCard} label="Actieve knipkaarten" value="847" change="-3%" changeType="down" color="#FF5C00" />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <Card className="lg:col-span-2 p-5">
              <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 15, fontWeight: 700 }}>Reserveringen laatste 30 dagen</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={reservationChartData}>
                  <CartesianGrid key="grid-res" strokeDasharray="3 3" stroke="#F0F4FA" />
                  <XAxis key="x-res" dataKey="date" tick={{ fontSize: 10, fill: '#A0AEC0' }} />
                  <YAxis key="y-res" tick={{ fontSize: 10, fill: '#A0AEC0' }} />
                  <Tooltip key="tip-res" contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E8ECF4' }} />
                  <Line key="line-reserveringen" type="monotone" dataKey="reserveringen" stroke="#0365C4" strokeWidth={2} dot={false} />
                  <Line key="line-annuleringen" type="monotone" dataKey="annuleringen" stroke="#E74C3C" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-5">
              <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 15, fontWeight: 700 }}>Lessen verdeling</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie key="pie-lessons" data={pieData} innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                    {pieData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                  </Pie>
                  <Tooltip key="tip-pie" contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 mt-2">
                {pieData.map(p => (
                  <div key={p.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                    <span className="text-[#6B7B94]" style={{ fontSize: 11 }}>{p.name} ({p.value}%)</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Revenue + Locations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <Card className="p-5">
              <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 15, fontWeight: 700 }}>Omzet (6 maanden)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={revenueChartData}>
                  <CartesianGrid key="grid-bar" strokeDasharray="3 3" stroke="#F0F4FA" />
                  <XAxis key="x-bar" dataKey="month" tick={{ fontSize: 11, fill: '#A0AEC0' }} />
                  <YAxis key="y-bar" tick={{ fontSize: 10, fill: '#A0AEC0' }} tickFormatter={v => `€${(v / 1000).toFixed(0)}k`} />
                  <Tooltip key="tip-bar" contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E8ECF4' }} formatter={(v: number) => [`€${v.toLocaleString()}`, 'Omzet']} />
                  <Bar key="bar-revenue" dataKey="revenue" radius={[6, 6, 0, 0]} fill="#0365C4" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-5">
              <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 15, fontWeight: 700 }}>Locaties overzicht</h3>
              <div className="space-y-3">
                {locationStats.map(loc => (
                  <div key={loc.name} className="flex items-center gap-3">
                    <span className="text-[#1A1A2E] w-[80px] truncate" style={{ fontSize: 13, fontWeight: 600 }}>{loc.name}</span>
                    <div className="flex-1 h-2 rounded-full bg-[#F0F4FA] overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(loc.students / 150) * 100}%`, background: loc.color }} />
                    </div>
                    <span className="text-[#6B7B94] w-[50px] text-right" style={{ fontSize: 12 }}>{loc.students}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick action cards + Recent + Registrations + Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Registratie verzoeken */}
            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>Registratie verzoeken</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#FF5C00]/10 text-[#FF5C00]" style={{ fontSize: 11, fontWeight: 700 }}>{registrations.filter(r => r.status === 'Nieuw').length} nieuw</span>
              </div>
              <div className="space-y-2.5">
                {registrations.filter(r => r.status === 'Nieuw').slice(0, 3).map(reg => (
                  <div key={reg.id} className="p-3 rounded-lg bg-[#F8FAFC]" style={{ border: '1px solid #F0F4FA' }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>{reg.childName}</span>
                      <span className="text-[#A0AEC0]" style={{ fontSize: 11 }}>{reg.requestDate}</span>
                    </div>
                    <p className="text-[#6B7B94]" style={{ fontSize: 12 }}>{reg.parentName} • {reg.preferredLocation}</p>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => approveRegistration(reg.id)} className="flex-1 py-1.5 rounded-md text-white flex items-center justify-center gap-1" style={{ background: '#27AE60', fontSize: 11, fontWeight: 600 }}><Check size={12} /> Accepteren</button>
                      <button onClick={() => rejectRegistration(reg.id)} className="flex-1 py-1.5 rounded-md text-[#E74C3C] flex items-center justify-center gap-1" style={{ background: '#FEF2F2', fontSize: 11, fontWeight: 600 }}><X size={12} /> Afwijzen</button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => goTo('registrations')} className="w-full mt-3 text-center text-[#0365C4] hover:underline" style={{ fontSize: 12, fontWeight: 600 }}>Alle verzoeken bekijken →</button>
            </Card>

            {/* Taken */}
            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>Openstaande taken</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#0365C4]/10 text-[#0365C4]" style={{ fontSize: 11, fontWeight: 700 }}>{tasks.filter(t => t.status !== 'Voltooid').length}</span>
              </div>
              <div className="space-y-2">
                {tasks.filter(t => t.status !== 'Voltooid').slice(0, 4).map(task => (
                  <div key={task.id} className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-[#F8FAFC] group">
                    <button onClick={() => completeTask(task.id)} className="w-5 h-5 rounded-full border-2 border-[#D0D5DD] group-hover:border-[#27AE60] flex-shrink-0 mt-0.5 flex items-center justify-center hover:bg-[#27AE60]/10 transition-all">
                      <Check size={10} className="text-transparent group-hover:text-[#27AE60]" />
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="text-[#1A1A2E] truncate" style={{ fontSize: 13, fontWeight: 500 }}>{task.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <StatusBadge status={task.priority} />
                        <span className="text-[#A0AEC0]" style={{ fontSize: 11 }}>{task.deadline}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => goTo('tasks')} className="w-full mt-3 text-center text-[#0365C4] hover:underline" style={{ fontSize: 12, fontWeight: 600 }}>Alle taken bekijken →</button>
            </Card>

            {/* Recent reserveringen */}
            <Card className="p-5">
              <h3 className="text-[#1A1A2E] mb-3" style={{ fontSize: 15, fontWeight: 700 }}>Recente reserveringen</h3>
              <div className="space-y-2.5">
                {mockReservations.slice(0, 5).map(res => (
                  <div key={res.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#F8FAFC] cursor-pointer" onClick={() => { setSelectedReservation(res); goTo('reservation-detail'); }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: res.status === 'Bevestigd' ? '#ECFDF5' : res.status === 'Geannuleerd' ? '#FEF2F2' : '#F3F4F6' }}>
                      <Calendar size={14} color={res.status === 'Bevestigd' ? '#27AE60' : res.status === 'Geannuleerd' ? '#E74C3C' : '#6B7280'} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[#1A1A2E] truncate" style={{ fontSize: 12, fontWeight: 600 }}>{res.customer}</p>
                      <p className="text-[#A0AEC0] truncate" style={{ fontSize: 11 }}>{res.date} {res.timeFrom}</p>
                    </div>
                    <StatusBadge status={res.status} />
                  </div>
                ))}
              </div>
              <button onClick={() => goTo('reservations')} className="w-full mt-3 text-center text-[#0365C4] hover:underline" style={{ fontSize: 12, fontWeight: 600 }}>Alle reserveringen →</button>
            </Card>
          </div>

          {/* Quick stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Totaal betalingen', value: '€5.133.607', icon: DollarSign, color: '#0365C4' },
              { label: 'Totaal facturen', value: '31.738', icon: FileText, color: '#00C1FF' },
              { label: 'Knipkaarten uitgegeven', value: '2.780+', icon: CreditCard, color: '#FF5C00' },
              { label: 'Totaal lessen gegeven', value: '12.450+', icon: Award, color: '#27AE60' },
            ].map(s => {
              const Icon = s.icon;
              return (
                <Card key={s.label} className="p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${s.color}10` }}><Icon size={18} color={s.color} /></div>
                  <div><p className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>{s.value}</p><p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>{s.label}</p></div>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* ═══════ CUSTOMERS ═══════ */}
      {view === 'customers' && (
        <>
          <PageHeader title="Klanten" subtitle={`${mockCustomers.length} klanten gevonden`} actions={
            <>
              <button onClick={() => goTo('customer-new')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 600 }}><Plus size={15} /> Nieuwe klant</button>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><Download size={15} /> Excel</button>
            </>
          } />
          <Card>
            <div className="p-4 border-b border-[#F0F4FA] flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]" />
                <input placeholder="Zoek op naam, email, locatie..." value={searchFilter} onChange={e => setSearchFilter(e.target.value)} className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#F4F7FC] border border-transparent focus:border-[#0365C4] outline-none text-[#1A1A2E]" style={{ fontSize: 13 }} />
              </div>
              <select className="px-3 py-2 rounded-lg bg-[#F4F7FC] border border-[#E8ECF4] text-[#1A1A2E] outline-none" style={{ fontSize: 13 }}>
                <option>Alle statussen</option><option>Actief</option><option>Inactief</option><option>Wachtlijst</option><option>Nieuw</option>
              </select>
              <select className="px-3 py-2 rounded-lg bg-[#F4F7FC] border border-[#E8ECF4] text-[#1A1A2E] outline-none" style={{ fontSize: 13 }}>
                <option>Alle locaties</option>{['Nijkerk', 'De Bilt', 'Garderen', 'Wolfheze', 'Dordrecht', 'Mierlo', 'Soest'].map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <DataTable
              columns={[
                { key: 'id', label: 'Klant ID', width: '90px' },
                { key: 'status', label: 'Status', width: '90px' },
                { key: 'childName', label: 'Kind', width: '140px' },
                { key: 'parentName', label: 'Ouder', width: '160px' },
                { key: 'location', label: 'Locatie', width: '90px' },
                { key: 'lessonType', label: 'Type', width: '70px' },
                { key: 'day', label: 'Dag', width: '80px' },
                { key: 'lastLogin', label: 'Laatst ingelogd' },
              ]}
              data={mockCustomers.filter(c => {
                if (!searchFilter) return true;
                const q = searchFilter.toLowerCase();
                return c.childFirst.toLowerCase().includes(q) || c.childLast.toLowerCase().includes(q) || c.parentName.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
              }).map(c => ({
                ...c,
                id: <span className="text-[#0365C4]" style={{ fontWeight: 600 }}>{c.id}</span>,
                childName: `${c.childFirst} ${c.childLast}`,
              }))}
              onRowClick={(row) => { setSelectedCustomer(mockCustomers.find(c => `${c.childFirst} ${c.childLast}` === row.childName) || null); goTo('customer-detail'); }}
            />
            <div className="p-3 border-t border-[#F0F4FA] flex items-center justify-between">
              <span className="text-[#A0AEC0]" style={{ fontSize: 12 }}>Toont 1-{mockCustomers.length} van 5.491</span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 rounded-md bg-[#0365C4] text-white" style={{ fontSize: 12, fontWeight: 600 }}>1</button>
                <button className="px-3 py-1.5 rounded-md text-[#6B7B94] hover:bg-[#F4F7FC]" style={{ fontSize: 12 }}>2</button>
                <button className="px-3 py-1.5 rounded-md text-[#6B7B94] hover:bg-[#F4F7FC]" style={{ fontSize: 12 }}>3</button>
                <span className="text-[#A0AEC0]" style={{ fontSize: 12 }}>...</span>
                <button className="px-3 py-1.5 rounded-md text-[#6B7B94] hover:bg-[#F4F7FC]" style={{ fontSize: 12 }}>611</button>
              </div>
            </div>
          </Card>
        </>
      )}

      {/* ═══════ CUSTOMER NEW ═══════ */}
      {view === 'customer-new' && (
        <>
          <PageHeader title="Nieuwe klant toevoegen" actions={<button onClick={() => goTo('customers')} className="flex items-center gap-1.5 text-[#6B7B94]" style={{ fontSize: 13 }}><ArrowLeft size={16} /> Terug</button>} />
          <Card className="p-6 max-w-[800px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Voornaam kind *', placeholder: 'Voornaam' },
                { label: 'Achternaam kind *', placeholder: 'Achternaam' },
                { label: 'Geboortedatum kind', placeholder: 'DD-MM-JJJJ', type: 'date' },
                { label: 'Voor+achternaam ouder *', placeholder: 'Volledige naam ouder' },
                { label: 'Mobiel (1e contactpersoon) *', placeholder: '+31 6 ...' },
                { label: 'E-mail *', placeholder: 'email@example.nl' },
                { label: 'Extra tel. nr (2e contactpersoon)', placeholder: '+31 6 ...' },
                { label: 'Woonplaats', placeholder: 'Stad' },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>{f.label}</label>
                  <input type={f.type || 'text'} placeholder={f.placeholder} className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }} />
                </div>
              ))}
              <div>
                <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Locatie *</label>
                <select className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }}>
                  <option>Kies een locatie</option>{['Nijkerk', 'De Bilt', 'Garderen', 'Wolfheze', 'Dordrecht', 'Mierlo', 'Soest'].map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Type zwemles *</label>
                <select className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }}>
                  <option>Kies een type les</option><option>1-op-1</option><option>1-op-2</option><option>1-op-3</option><option>Survival</option>
                </select>
              </div>
              <div>
                <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Dag</label>
                <select className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }}>
                  <option>Kies een dag</option>{['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag'].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Tijdstip zwemles</label>
                <input placeholder="bijv. 12:00" className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }} />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Voortgang</label>
              <textarea rows={3} placeholder="Beschrijf de voortgang van het kind..." className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }} />
            </div>
            <div className="mt-4">
              <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Opmerking</label>
              <textarea rows={2} placeholder="Extra opmerkingen..." className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }} />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { goTo('customers'); showToast('Klant succesvol aangemaakt!'); }} className="px-6 py-2.5 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 14, fontWeight: 700 }}>Opslaan</button>
              <button onClick={() => goTo('customers')} className="px-6 py-2.5 rounded-lg text-[#6B7B94] border border-[#E8ECF4]" style={{ fontSize: 14, fontWeight: 600 }}>Annuleren</button>
            </div>
          </Card>
        </>
      )}

      {/* ═══════ CUSTOMER DETAIL ═══════ */}
      {view === 'customer-detail' && selectedCustomer && (
        <>
          <PageHeader title={`${selectedCustomer.id} — ${selectedCustomer.childFirst} ${selectedCustomer.childLast}`} actions={<button onClick={() => goTo('customers')} className="flex items-center gap-1.5 text-[#6B7B94]" style={{ fontSize: 13 }}><ArrowLeft size={16} /> Terug naar overzicht</button>} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Klantgegevens */}
            <Card className="lg:col-span-2 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#1A1A2E] flex items-center gap-2" style={{ fontSize: 16, fontWeight: 700 }}><Users size={18} color="#0365C4" /> Klantgegevens</h3>
                <StatusBadge status={selectedCustomer.status} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
                {[
                  { l: 'Voornaam kind', v: selectedCustomer.childFirst }, { l: 'Achternaam kind', v: selectedCustomer.childLast }, { l: 'Geboortedatum', v: '12-05-2020' },
                  { l: 'Ouder/verzorger', v: selectedCustomer.parentName }, { l: 'Mobiel', v: selectedCustomer.mobile }, { l: 'E-mail', v: selectedCustomer.email },
                  { l: 'Woonplaats', v: selectedCustomer.city }, { l: 'Locatie', v: selectedCustomer.location }, { l: 'Type zwemles', v: selectedCustomer.lessonType },
                  { l: 'Dag', v: selectedCustomer.day }, { l: 'Tijdstip', v: '12:00' }, { l: 'Voortgang', v: selectedCustomer.progress },
                  { l: 'Aangemaakt', v: selectedCustomer.created }, { l: 'Laatst ingelogd', v: selectedCustomer.lastLogin },
                ].map(f => (
                  <div key={f.l}><p className="text-[#A0AEC0]" style={{ fontSize: 11, fontWeight: 600 }}>{f.l}</p><p className="text-[#1A1A2E] mt-0.5" style={{ fontSize: 13, fontWeight: 500 }}>{f.v}</p></div>
                ))}
              </div>
            </Card>

            {/* Actions */}
            <Card className="p-5">
              <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Acties</h3>
              <div className="space-y-2">
                {[
                  { label: 'Maak reservering', icon: Calendar, color: '#0365C4', onClick: () => goTo('reservation-new') },
                  { label: 'Voeg knipkaart toe', icon: CreditCard, color: '#FF5C00', onClick: () => goTo('punch-cards') },
                  { label: 'Maak factuur', icon: FileText, color: '#27AE60', onClick: () => goTo('invoice-new') },
                  { label: 'Verstuur e-mail', icon: Send, color: '#00C1FF', onClick: () => showToast('E-mail dialoog geopend') },
                  { label: 'Aanmaken taak', icon: ClipboardList, color: '#8E44AD', onClick: () => goTo('tasks') },
                  { label: 'Wijzig klantstatus', icon: UserCheck, color: '#E67E22', onClick: () => showToast('Status gewijzigd') },
                  { label: 'Exporteer', icon: Download, color: '#2C3E50', onClick: () => showToast('Klant geëxporteerd') },
                ].map(a => {
                  const Icon = a.icon;
                  return (
                    <button key={a.label} onClick={a.onClick} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-[#F4F7FC] transition-all text-left" style={{ border: '1px solid #F0F4FA' }}>
                      <Icon size={16} color={a.color} /><span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 500 }}>{a.label}</span>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>
        </>
      )}

      {/* ═══════ RESERVATIONS ═══════ */}
      {view === 'reservations' && (
        <>
          <PageHeader title="Reserveringen" subtitle={`${mockReservations.length} reserveringen`} actions={
            <>
              <button onClick={() => goTo('reservation-new')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 600 }}><Plus size={15} /> Nieuwe reservering</button>
              <button onClick={() => goTo('calendar')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#0365C4] bg-white border border-[#0365C4]/20" style={{ fontSize: 13, fontWeight: 600 }}><Calendar size={15} /> Kalender</button>
              <button onClick={() => goTo('roster')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><BookOpen size={15} /> Rooster</button>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><Download size={15} /> Excel</button>
            </>
          } />
          <Card>
            <DataTable
              columns={[
                { key: 'id', label: 'Reservering ID' },
                { key: 'product', label: 'Product' },
                { key: 'date', label: 'Datum' },
                { key: 'timeFrom', label: 'Van' },
                { key: 'timeTo', label: 'Tot' },
                { key: 'customer', label: 'Klant' },
                { key: 'status', label: 'Status' },
                { key: 'paidWith', label: 'Betaalmethode' },
                { key: 'amountStr', label: 'Bedrag' },
              ]}
              data={mockReservations.map(r => ({ ...r, id: <span className="text-[#0365C4]" style={{ fontWeight: 600 }}>{r.id}</span>, amountStr: `€${r.amount},00` }))}
              onRowClick={(row) => { setSelectedReservation(mockReservations.find(r => r.customer === row.customer && r.date === row.date) || null); goTo('reservation-detail'); }}
            />
          </Card>
        </>
      )}

      {/* ═══════ RESERVATION DETAIL (i-Reserve Style) ═══════ */}
      {view === 'reservation-detail' && selectedReservation && <ReservationDetailView reservation={selectedReservation} goTo={goTo} showToast={showToast} />}

      {/* ���══════ RESERVATION NEW ═══════ */}
      {view === 'reservation-new' && <AdvancedReservationForm goTo={goTo} showToast={showToast} customers={mockCustomers} punchCards={mockPunchCards} />}

      {/* ═══════ CALENDAR ═══════ */}
      {view === 'calendar' && <CalendarView goTo={goTo} showToast={showToast} setSelectedReservation={setSelectedReservation} />}

      {/* ═══════ ROSTER ═══════ */}
      {view === 'roster' && <RosterView goTo={goTo} showToast={showToast} setSelectedReservation={setSelectedReservation} />}

      {/* ═══════ INVOICES ═��═════ */}
      {view === 'invoices' && (
        <>
          <PageHeader title="Facturatie" subtitle="31.738 facturen" actions={
            <>
              <button onClick={() => goTo('invoice-new')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 600 }}><Plus size={15} /> Nieuwe factuur</button>
              <button onClick={() => goTo('invoice-history')} className="px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>Historie</button>
              <button onClick={() => goTo('open-items')} className="px-4 py-2 rounded-lg text-[#E74C3C] bg-[#FEF2F2] border border-[#FECACA]" style={{ fontSize: 13, fontWeight: 600 }}>Openstaand</button>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><Download size={15} /> Excel</button>
            </>
          } />
          <Card>
            <DataTable
              columns={[
                { key: 'id', label: 'Factuur ID' }, { key: 'number', label: 'Factuurnummer' }, { key: 'customerName', label: 'Klant' },
                { key: 'date', label: 'Datum' }, { key: 'amountStr', label: 'Bedrag' }, { key: 'outstandingStr', label: 'Openstaand' }, { key: 'status', label: 'Status' },
              ]}
              data={mockInvoices.map(i => ({ ...i, id: <span className="text-[#0365C4]" style={{ fontWeight: 600 }}>{i.id}</span>, amountStr: `€${i.amount},00`, outstandingStr: i.outstanding > 0 ? <span className="text-[#E74C3C]" style={{ fontWeight: 600 }}>€{i.outstanding},00</span> : '€0,00' }))}
            />
          </Card>
        </>
      )}

      {/* ═══════ INVOICE NEW / HISTORY / OPEN ITEMS ═══════ */}
      {(view === 'invoice-new' || view === 'invoice-history' || view === 'open-items') && (
        <>
          <PageHeader title={view === 'invoice-new' ? 'Nieuwe factuur' : view === 'invoice-history' ? 'Factuur historie' : 'Openstaande posten'} actions={<button onClick={() => goTo('invoices')} className="flex items-center gap-1.5 text-[#6B7B94]" style={{ fontSize: 13 }}><ArrowLeft size={16} /> Terug</button>} />
          {view === 'invoice-new' ? (
            <Card className="p-6 max-w-[500px]">
              <div className="space-y-4">
                <div><label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Factuurdatum</label><input type="date" defaultValue="2026-03-26" className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }} /></div>
                <div><label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Selecteer klant</label><div className="flex gap-2"><input placeholder="Zoek klant..." className="flex-1 px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }} /><button className="px-4 py-2.5 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 600 }}>Zoek</button></div></div>
              </div>
              <div className="flex gap-3 mt-6"><button onClick={() => { goTo('invoices'); showToast('Factuur aangemaakt!'); }} className="px-6 py-2.5 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 14, fontWeight: 700 }}>Opslaan</button></div>
            </Card>
          ) : (
            <Card>
              <DataTable
                columns={[{ key: 'id', label: 'Factuur ID' }, { key: 'number', label: 'Nummer' }, { key: 'customerName', label: 'Klant' }, { key: 'date', label: 'Datum' }, { key: 'amountStr', label: 'Bedrag' }, { key: 'status', label: 'Status' }]}
                data={mockInvoices.filter(i => view === 'open-items' ? i.outstanding > 0 : i.status === 'Betaald').map(i => ({ ...i, id: <span className="text-[#0365C4]" style={{ fontWeight: 600 }}>{i.id}</span>, amountStr: `€${i.amount},00` }))}
              />
            </Card>
          )}
        </>
      )}

      {/* ═════��═ PUNCH CARDS ═══════ */}
      {view === 'punch-cards' && (
        <>
          <PageHeader title="Knipkaarten" subtitle="Beheer alle knipkaarten" actions={
            <>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 600 }}><Plus size={15} /> Nieuwe knipkaart</button>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><Download size={15} /> Excel</button>
            </>
          } />
          <Card>
            <DataTable
              columns={[
                { key: 'id', label: 'Knipkaart ID' }, { key: 'type', label: 'Type' }, { key: 'customerName', label: 'Klant' },
                { key: 'validFrom', label: 'Geldig vanaf' }, { key: 'validUntil', label: 'Geldig tot' },
                { key: 'usage', label: 'Gebruik' }, { key: 'statusBadge', label: 'Status' },
              ]}
              data={mockPunchCards.map(p => ({
                ...p,
                id: <span className="text-[#0365C4]" style={{ fontWeight: 600 }}>{p.id}</span>,
                usage: <div className="flex items-center gap-2"><span style={{ fontSize: 13, fontWeight: 600 }}>{p.used}/{p.total}</span><div className="w-16 h-1.5 rounded-full bg-[#F0F4FA]"><div className="h-full rounded-full" style={{ width: `${(p.used / p.total) * 100}%`, background: p.used === p.total ? '#E74C3C' : '#27AE60' }} /></div></div>,
                statusBadge: <StatusBadge status={p.used === p.total ? 'Leeg' : p.blocked ? 'Geblokkeerd' : 'Actief'} />,
              }))}
            />
          </Card>
        </>
      )}

      {/* ═══════ PAYMENTS ═══════ */}
      {view === 'payments' && (
        <>
          <PageHeader title="Betalingen" subtitle="81.269 betalingen — Totaal: €5.133.607,00" actions={<button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><Download size={15} /> Excel</button>} />
          <Card>
            <DataTable
              columns={[
                { key: 'id', label: 'Betaal ID' }, { key: 'method', label: 'Methode' }, { key: 'status', label: 'Status' },
                { key: 'amountStr', label: 'Bedrag' }, { key: 'transaction', label: 'Transactie #' },
                { key: 'date', label: 'Datum' }, { key: 'customerName', label: 'Klant' }, { key: 'description', label: 'Omschrijving' },
              ]}
              data={mockPayments.map(p => ({ ...p, id: <span className="text-[#0365C4]" style={{ fontWeight: 600 }}>{p.id}</span>, amountStr: <span style={{ fontWeight: 600, color: p.status === 'Terugbetaald' ? '#5B21B6' : '#1A1A2E' }}>€{p.amount},00</span> }))}
            />
          </Card>
        </>
      )}

      {/* ═══════ TASKS ═══════ */}
      {view === 'tasks' && (
        <>
          <PageHeader title="Taken" actions={<button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 600 }}><Plus size={15} /> Nieuwe taak</button>} />
          <Card>
            <DataTable
              columns={[
                { key: 'id', label: '#' }, { key: 'priority', label: 'Prioriteit' }, { key: 'status', label: 'Status' },
                { key: 'description', label: 'Beschrijving' }, { key: 'category', label: 'Categorie' },
                { key: 'deadline', label: 'Deadline' }, { key: 'assignedTo', label: 'Toegewezen aan' }, { key: 'action', label: '' },
              ]}
              data={tasks.map(t => ({
                ...t,
                id: <span className="text-[#0365C4]" style={{ fontWeight: 600 }}>{t.id}</span>,
                action: t.status !== 'Voltooid' ? <button onClick={() => completeTask(t.id)} className="p-1.5 rounded-lg hover:bg-[#ECFDF5] text-[#27AE60]"><Check size={16} /></button> : <CheckCircle2 size={16} color="#27AE60" />,
              }))}
            />
          </Card>
        </>
      )}

      {/* ═══════ REGISTRATIONS ═══════ */}
      {view === 'registrations' && (
        <>
          <PageHeader title="Registratie verzoeken" subtitle="Website account aanvragen goedkeuren of afwijzen" />
          <div className="space-y-4">
            {registrations.map(reg => (
              <Card key={reg.id} className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#0365C4]" style={{ fontSize: 13, fontWeight: 600 }}>{reg.id}</span>
                      <StatusBadge status={reg.status} />
                    </div>
                    <h3 className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>{reg.childName}</h3>
                    <p className="text-[#6B7B94] mt-1" style={{ fontSize: 13 }}>Ouder: {reg.parentName}</p>
                    <div className="flex flex-wrap gap-3 mt-2" style={{ fontSize: 12 }}>
                      <span className="flex items-center gap-1 text-[#6B7B94]"><Mail size={12} /> {reg.email}</span>
                      <span className="flex items-center gap-1 text-[#6B7B94]"><Phone size={12} /> {reg.phone}</span>
                      <span className="flex items-center gap-1 text-[#6B7B94]"><MapPin size={12} /> {reg.preferredLocation}</span>
                      <span className="flex items-center gap-1 text-[#6B7B94]"><Clock size={12} /> {reg.requestDate}</span>
                    </div>
                    {reg.notes && <p className="text-[#A0AEC0] mt-1" style={{ fontSize: 12 }}>{reg.notes}</p>}
                  </div>
                  {reg.status === 'Nieuw' && (
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => approveRegistration(reg.id)} className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-white" style={{ background: '#27AE60', fontSize: 13, fontWeight: 700 }}><UserCheck size={16} /> Goedkeuren</button>
                      <button onClick={() => rejectRegistration(reg.id)} className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-[#E74C3C]" style={{ background: '#FEF2F2', fontSize: 13, fontWeight: 700, border: '1px solid #FECACA' }}><UserX size={16} /> Afwijzen</button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* ═══════ INSTRUCTORS ═══════ */}
      {view === 'instructors' && (
        <>
          <PageHeader title="Instructeurs" actions={<button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 600 }}><Plus size={15} /> Instructeur toevoegen</button>} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockInstructors.map(ins => (
              <Card key={ins.id} className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0365C4] to-[#00C1FF] flex items-center justify-center text-white" style={{ fontSize: 16, fontWeight: 700 }}>{ins.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                  <div><h3 className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>{ins.name}</h3><StatusBadge status={ins.status} /></div>
                </div>
                <div className="space-y-2 mb-4" style={{ fontSize: 12, color: '#6B7B94' }}>
                  <p className="flex items-center gap-1.5"><Mail size={12} /> {ins.email}</p>
                  <p className="flex items-center gap-1.5"><Phone size={12} /> {ins.phone}</p>
                  <p className="flex items-center gap-1.5"><MapPin size={12} /> {ins.locations.join(', ')}</p>
                </div>
                <div className="flex gap-4 pt-3 border-t border-[#F0F4FA]">
                  <div><p className="text-[#0365C4]" style={{ fontSize: 18, fontWeight: 700 }}>{ins.studentsCount}</p><p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Studenten</p></div>
                  <div><p className="text-[#27AE60]" style={{ fontSize: 18, fontWeight: 700 }}>{ins.lessonsThisWeek}</p><p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Lessen/week</p></div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* ═══════ LOCATIONS ═══════ */}
      {view === 'locations' && (
        <>
          <PageHeader title="Locaties" subtitle="7 zwembadlocaties" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {locationStats.map(loc => (
              <Card key={loc.name} className="p-5 hover:translate-y-[-2px] transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${loc.color}15` }}><MapPin size={20} color={loc.color} /></div>
                  <h3 className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>{loc.name}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#F8FAFC] rounded-lg p-3 text-center"><p style={{ fontSize: 20, fontWeight: 700, color: loc.color }}>{loc.students}</p><p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Studenten</p></div>
                  <div className="bg-[#F8FAFC] rounded-lg p-3 text-center"><p style={{ fontSize: 20, fontWeight: 700, color: '#27AE60' }}>{loc.bookings}</p><p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Boekingen/mnd</p></div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* ═══════ MESSAGES ═══════ */}
      {view === 'messages' && <MessagesView goTo={goTo} showToast={showToast} setSelectedCustomer={setSelectedCustomer} />}

      {/* ═══════ REPORTS ═══════ */}
      {view === 'reports' && <ReportsView showToast={showToast} />}

      {/* ═══════ NOTIFICATIONS ═══════ */}
      {view === 'notifications-admin' && (
        <>
          <PageHeader title="Alle notificaties" />
          <Card className="divide-y divide-[#F0F4FA]">
            {Array.from({ length: 10 }).map((_, i) => {
              const types = [
                { title: 'Nieuwe registratie', desc: 'Account aanvraag van een ouder', color: '#FF5C00' },
                { title: 'Reservering bevestigd', desc: 'Nieuwe zwemles geboekt', color: '#27AE60' },
                { title: 'Betaling ontvangen', desc: 'Knipkaart betaling via Mollie', color: '#0365C4' },
                { title: 'Annulering', desc: 'Zwemles geannuleerd door klant', color: '#E74C3C' },
                { title: 'Taak deadline', desc: 'Een taak nadert de deadline', color: '#E67E22' },
              ];
              const t = types[i % types.length];
              return (
                <div key={i} className="px-5 py-4 hover:bg-[#F8FAFC] flex items-start gap-3 cursor-pointer">
                  <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: t.color }} />
                  <div className="flex-1"><p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>{t.title}</p><p className="text-[#6B7B94]" style={{ fontSize: 13 }}>{t.desc}</p></div>
                  <span className="text-[#A0AEC0] flex-shrink-0" style={{ fontSize: 12 }}>{i + 1}u geleden</span>
                </div>
              );
            })}
          </Card>
        </>
      )}

      {/* ═══════ SETTINGS ═══════ */}
      {view === 'settings' && <SettingsView showToast={showToast} />}

      {/* ═══════ DEVICES ═══════ */}
      {view === 'devices' && (
        <>
          <PageHeader title="Apparaten" subtitle="Actieve sessies en apparaten" />
          <div className="space-y-3">
            {[
              { device: 'Chrome — macOS', ip: '206.135.162.71', lastActive: 'Nu actief', current: true },
              { device: 'Safari — iPhone 15', ip: '206.135.162.71', lastActive: '2 uur geleden', current: false },
              { device: 'Firefox — Windows 11', ip: '84.28.45.123', lastActive: '3 dagen geleden', current: false },
            ].map((d, i) => (
              <Card key={i} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F4F7FC] flex items-center justify-center"><Activity size={18} color={d.current ? '#27AE60' : '#A0AEC0'} /></div>
                  <div><p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>{d.device} {d.current && <span className="text-[#27AE60]" style={{ fontSize: 11 }}>(huidig)</span>}</p><p className="text-[#A0AEC0]" style={{ fontSize: 12 }}>IP: {d.ip} • {d.lastActive}</p></div>
                </div>
                {!d.current && <button className="p-2 rounded-lg hover:bg-[#FEF2F2] text-[#E74C3C]"><Trash2 size={16} /></button>}
              </Card>
            ))}
          </div>
        </>
      )}

      {/* ═══════ PROFILE (Persoonlijke Instellingen) ═══════ */}
      {view === 'profile-admin' && <ProfileView showToast={showToast} />}

    </AdminLayout>
  );
}

export default AdminDashboardScreen;

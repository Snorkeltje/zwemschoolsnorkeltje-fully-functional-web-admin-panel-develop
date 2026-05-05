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
  ClipboardCheck, ClipboardList, Timer, CalendarCheck, Banknote, Hash, MessageSquare,
  Lock, Trophy, ListOrdered, Wallet, Settings, GraduationCap, ListChecks, Plane, UserCog
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart
} from 'recharts';
import {
  useAllTimeKpis,
  useDashboardStats,
  useDashboardTrends,
  useLessonTypeDistribution,
  useLocationStats,
  usePendingAdminTasks,
  usePendingRegistrations,
  useRecentReservations,
  useReservations30Days,
  useRevenue6Months,
  useTodayLessons,
  formatNumberNL,
  formatEuroFromCents,
} from '../../../lib/hooks/useDashboard';
import {
  useAdminNotifications,
  useAllChildren,
  useAllReservations,
  useAllReviews,
  useChildPhases,
  useCurriculum,
  useCustomerDetail,
  useCustomers,
  useAllInvoices,
  useAllPayments,
  useExamCandidates,
  useWaitlistOffers,
  useInstructors,
  useLocationsList,
  useSkills,
  useVacationRequests,
  useWaitlist,
  useWallets,
} from '../../../lib/hooks/useAdmin';
import { broadcastNotification, createCustomerViaEdgeFn, createReservationFromForm, decideVacationRequest, deleteCustomer, markAllNotificationsRead, markNotificationRead, respondToReview, updateCustomerProfile, upsertChildPhase } from '../../../lib/data/admin-repository';
import type { AdminCustomer } from '../../../lib/data/admin-repository';
import { CurriculumStepCard } from '../../components/admin/CurriculumStepCard';

// Suppress recharts internal duplicate key warning (title/desc siblings in Surface SVG)
const _origWarn = console.error;
console.error = (...args: unknown[]) => {
  if (typeof args[0] === 'string' && args[0].includes('Encountered two children with the same key')) return;
  _origWarn.apply(console, args);
};

// ─── Fallback chart data (used while Supabase queries are loading) ───
const reservationChartData = Array.from({ length: 30 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - 29 + i);
  return { date: `${d.getDate()}/${d.getMonth() + 1}`, reserveringen: 0, annuleringen: 0 };
});

const revenueChartData = [
  { month: 'Nov', revenue: 0 }, { month: 'Dec', revenue: 0 }, { month: 'Jan', revenue: 0 },
  { month: 'Feb', revenue: 0 }, { month: 'Mrt', revenue: 0 }, { month: 'Apr', revenue: 0 },
];

const pieData = [
  { name: '1-op-1', value: 1, color: '#0365C4' },
  { name: '1-op-2', value: 1, color: '#00C1FF' },
  { name: '1-op-3', value: 1, color: '#27AE60' },
  { name: 'Vakantie', value: 1, color: '#FF5C00' },
];

const locationStats = [
  { name: 'De Bilt', students: 0, bookings: 0, color: '#0365C4' },
  { name: 'Bad Hulckesteijn', students: 0, bookings: 0, color: '#00C1FF' },
  { name: 'Garderen', students: 0, bookings: 0, color: '#27AE60' },
  { name: 'Wolfheze', students: 0, bookings: 0, color: '#FF5C00' },
  { name: 'Ampt v. Nijkerk', students: 0, bookings: 0, color: '#8E44AD' },
  { name: 'Doorwerth', students: 0, bookings: 0, color: '#E67E22' },
];

interface Customer {
  id: string;
  parentId?: string; // Walter 2026-05-05 — added for real reservation save
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Walter 2026-05-05 — real save naar Supabase. Best-effort: vindt of maakt
      // de bijbehorende lesson + creëert de reservering. Bij een herhalende
      // boeking maken we één reservering per datum.
      const cust = customers.find(c => c.id === selectedCustomerId);
      if (!cust?.parentId) {
        showToast('❌ Geen ouder-koppeling gevonden voor deze klant');
        setIsSubmitting(false);
        return;
      }
      if (!product) {
        showToast('❌ Selecteer eerst een product');
        setIsSubmitting(false);
        return;
      }
      const minutes = product.duration ?? 30;
      const [sh, sm] = (selectedTime || '00:00').split(':').map(Number);
      const totalMin = sh * 60 + sm + minutes;
      const computedEnd = `${String(Math.floor(totalMin / 60)).padStart(2, '0')}:${String(totalMin % 60).padStart(2, '0')}`;
      const dates: string[] = isRecurring && recurringDates.length > 0
        ? recurringDates.filter(d => !recurringSkipDates.includes(d))
        : [selectedDate];
      const baseAmountCents = Math.round((product.price ?? 0) * 100);
      const discountCents = discountType === 'percentage'
        ? Math.round(baseAmountCents * (discountValue / 100))
        : discountType === 'fixed'
        ? Math.round(discountValue * 100)
        : 0;
      const amountCents = Math.max(0, baseAmountCents - discountCents);
      const pmMap: Record<string, 'wallet' | 'ideal' | 'manual' | 'invoice'> = {
        knipkaart: 'wallet', mollie: 'ideal', handmatig: 'manual', factuur: 'invoice',
      };
      let okCount = 0;
      let firstError: string | null = null;
      for (const date of dates) {
        const r = await createReservationFromForm({
          parentId: cust.parentId,
          childId: cust.id,
          date,
          startTime: selectedTime,
          endTime: endTime || computedEnd,
          type: (product.type || '1-op-1') as '1-op-1' | '1-op-2' | '1-op-3' | 'Survival',
          locationName: product.location,
          amountCents,
          paymentMethod: pmMap[paymentMethod] || 'manual',
          notes: notes || undefined,
        });
        if (r.ok) okCount++;
        else if (!firstError) firstError = r.error ?? 'onbekende fout';
      }
      setIsSubmitting(false);
      if (okCount === 0) {
        showToast(`❌ Reservering mislukt: ${firstError}`);
        return;
      }
      const skipped = isRecurring ? (recurringDates.length - dates.length) : 0;
      showToast(
        `✅ ${okCount} reservering${okCount === 1 ? '' : 'en'} aangemaakt voor ${cust.childFirst} ${cust.childLast}` +
        (skipped > 0 ? ` · ${skipped} overgeslagen` : '') +
        (sendConfirmation ? ' · bevestiging klaar' : '')
      );
      goTo('reservations');
    } catch (e) {
      setIsSubmitting(false);
      showToast(`❌ Reservering mislukt: ${(e as Error).message}`);
    }
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

  // Walter 2026-05-04 — Klanten Overzicht / Detail wiring (real data).
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const customerDetail = useCustomerDetail(selectedCustomerId);
  const [customerStatusFilter, setCustomerStatusFilter] = useState<'' | 'Actief' | 'Nieuw' | 'Inactief'>('');
  const [customerSortKey, setCustomerSortKey] = useState<'parentName' | 'email' | 'city' | 'walletBalance' | 'childCount' | 'createdAt'>('parentName');
  const [customerSortDir, setCustomerSortDir] = useState<'asc' | 'desc'>('asc');
  const [customerEditMode, setCustomerEditMode] = useState(false);
  const [customerEdits, setCustomerEdits] = useState<{ first_name: string; last_name: string; phone: string; city: string; address: string }>({ first_name: '', last_name: '', phone: '', city: '', address: '' });
  const [customerDeleteConfirm, setCustomerDeleteConfirm] = useState(false);

  // Betalingen filter state
  const [paymentSearch, setPaymentSearch] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<'' | 'Voltooid' | 'In behandeling' | 'Mislukt' | 'Terugbetaald'>('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<'' | 'iDEAL' | 'Tegoed' | 'Stripe' | 'Handmatig'>('');

  // Reserveringen filter state
  const [reservationSearch, setReservationSearch] = useState('');
  const [reservationStatusFilter, setReservationStatusFilter] = useState<'' | 'confirmed' | 'pending' | 'cancelled' | 'completed'>('');
  const [reservationLocationFilter, setReservationLocationFilter] = useState('');
  const [reservationDateFilter, setReservationDateFilter] = useState<'' | 'today' | 'next7' | 'future' | 'past30'>('');
  const [reservationSortDir, setReservationSortDir] = useState<'asc' | 'desc'>('desc');

  // Nieuwe klant form state (Walter 2026-05-04)
  const [newCustomerForm, setNewCustomerForm] = useState({
    childFirst: '', childLast: '', childDob: '',
    parentFirst: '', parentLast: '',
    email: '', password: '',
    phone: '', city: '', address: '',
    location: '', lessonType: '', day: '', time: '',
  });
  const [newCustomerErrors, setNewCustomerErrors] = useState<Record<string, string>>({});
  const [newCustomerSubmitting, setNewCustomerSubmitting] = useState(false);

  // Live Supabase-backed data for the Dashboard view.
  const stats = useDashboardStats();
  const trends = useDashboardTrends();
  const reservations30 = useReservations30Days();
  const lessonPie = useLessonTypeDistribution();
  const revenue6 = useRevenue6Months();
  const locStats = useLocationStats();
  const allTime = useAllTimeKpis();
  const todayLessons = useTodayLessons();
  const recentRes = useRecentReservations();
  const pendingRegs = usePendingRegistrations();
  const adminTasks = usePendingAdminTasks();

  // Live Supabase-backed data for sidebar pages.
  const customers = useCustomers();
  const reservationsAll = useAllReservations();
  const locationsList = useLocationsList();
  const instructorsList = useInstructors();
  const wallets = useWallets();
  const reviewsList = useAllReviews();
  const waitlist = useWaitlist();
  const examCandidates = useExamCandidates();
  const waitlistOffers = useWaitlistOffers();
  const allInvoices = useAllInvoices();
  const allPayments = useAllPayments();
  const vacations = useVacationRequests();
  const skills = useSkills();
  const curriculum = useCurriculum();
  const allChildren = useAllChildren();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const childPhases = useChildPhases(selectedChildId);
  const [childSearch, setChildSearch] = useState('');

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
    <AdminLayout currentView={view} onNavigate={goTo}>
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
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ECFDF5] text-[#065F46]" style={{ fontSize: 12, fontWeight: 600 }}>
                <span className={`w-2 h-2 rounded-full bg-[#10B981] ${stats.loading ? 'animate-pulse' : ''}`} />
                {stats.loading ? 'Bezig…' : 'Live'}
              </span>
              <button
                onClick={async () => {
                  await Promise.all([
                    stats.refresh(), trends.refresh(), reservations30.refresh(),
                    lessonPie.refresh(), revenue6.refresh(), locStats.refresh(),
                    allTime.refresh(), todayLessons.refresh(), recentRes.refresh(),
                    pendingRegs.refresh(), adminTasks.refresh(),
                  ]);
                  showToast('Dashboard vernieuwd');
                }}
                className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"
                aria-label="Vernieuwen">
                <RefreshCw size={16} className={stats.loading ? 'animate-spin' : ''} />
              </button>
            </div>
          } />

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard icon={Users} label="Totaal klanten"
                value={stats.loading ? '…' : formatNumberNL(stats.data?.totalCustomers ?? 0)}
                change={trends.loading ? '—' : `${(trends.data?.customersPct ?? 0) >= 0 ? '+' : ''}${trends.data?.customersPct ?? 0}%`}
                changeType={(trends.data?.customersPct ?? 0) >= 0 ? 'up' : 'down'}
                color="#0365C4" />
            <StatCard icon={Calendar} label="Reserveringen (30d)"
                value={stats.loading ? '…' : formatNumberNL(stats.data?.reservationsLast30 ?? 0)}
                change={trends.loading ? '—' : `${(trends.data?.reservationsPct ?? 0) >= 0 ? '+' : ''}${trends.data?.reservationsPct ?? 0}%`}
                changeType={(trends.data?.reservationsPct ?? 0) >= 0 ? 'up' : 'down'}
                color="#00C1FF" />
            <StatCard icon={DollarSign} label="Omzet (deze maand)"
                value={stats.loading ? '…' : formatEuroFromCents(stats.data?.revenueThisMonthCents ?? 0)}
                change={trends.loading ? '—' : `${(trends.data?.revenuePct ?? 0) >= 0 ? '+' : ''}${trends.data?.revenuePct ?? 0}%`}
                changeType={(trends.data?.revenuePct ?? 0) >= 0 ? 'up' : 'down'}
                color="#27AE60" />
            <StatCard icon={CreditCard} label="Actieve tegoed"
                value={stats.loading ? '…' : formatEuroFromCents(stats.data?.activeWalletsCents ?? 0)}
                change={trends.loading ? '—' : `${(trends.data?.walletsPct ?? 0) >= 0 ? '+' : ''}${trends.data?.walletsPct ?? 0}%`}
                changeType={(trends.data?.walletsPct ?? 0) >= 0 ? 'up' : 'down'}
                color="#FF5C00" />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <Card className="lg:col-span-2 p-5">
              <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 15, fontWeight: 700 }}>Reserveringen laatste 30 dagen</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={reservations30.data ?? reservationChartData}>
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
                  <Pie key="pie-lessons" data={lessonPie.data ?? pieData} innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                    {(lessonPie.data ?? pieData).map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                  </Pie>
                  <Tooltip key="tip-pie" contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 mt-2">
                {(lessonPie.data ?? pieData).map(p => (
                  <div key={p.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                    <span className="text-[#6B7B94]" style={{ fontSize: 11 }}>{p.name} ({p.value})</span>
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
                <BarChart data={revenue6.data ?? revenueChartData}>
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
                {(() => {
                  const list = locStats.data ?? locationStats;
                  const max = Math.max(1, ...list.map(l => l.students));
                  return list.map(loc => (
                    <div key={loc.name} className="flex items-center gap-3">
                      <span className="text-[#1A1A2E] w-[120px] truncate" style={{ fontSize: 13, fontWeight: 600 }}>{loc.name}</span>
                      <div className="flex-1 h-2 rounded-full bg-[#F0F4FA] overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${(loc.students / max) * 100}%`, background: loc.color }} />
                      </div>
                      <span className="text-[#6B7B94] w-[50px] text-right" style={{ fontSize: 12 }}>{loc.students}</span>
                    </div>
                  ));
                })()}
              </div>
            </Card>
          </div>

          {/* Vandaag's lessen — live */}
          <Card className="p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CalendarCheck size={18} className="text-[#0365C4]" />
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>
                  Vandaag — {new Date().toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' })}
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#0365C4]/10 text-[#0365C4]"
                    style={{ fontSize: 11, fontWeight: 700 }}>
                {todayLessons.loading ? '…' : `${todayLessons.data?.length ?? 0} lessen`}
              </span>
            </div>
            {todayLessons.loading ? (
              <div className="py-6 text-center text-[#A0AEC0]" style={{ fontSize: 12 }}>Laden…</div>
            ) : (todayLessons.data?.length ?? 0) === 0 ? (
              <div className="py-8 text-center">
                <Calendar size={32} className="mx-auto mb-2 text-[#C4CDD9]" />
                <p className="text-[#A0AEC0]" style={{ fontSize: 12 }}>Geen lessen vandaag</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {todayLessons.data!.map(l => (
                  <div key={l.id} className="p-3 rounded-xl border border-[#F0F4FA] hover:border-[#0365C4]/30 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-[#0365C4]" style={{ fontSize: 14, fontWeight: 700 }}>
                        {l.startTime}–{l.endTime}
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#F4F7FC] text-[#6B7B94]"
                            style={{ fontSize: 10, fontWeight: 700 }}>{l.type}</span>
                    </div>
                    <p className="text-[#1A1A2E] truncate mb-1" style={{ fontSize: 12, fontWeight: 600 }}>
                      {l.studentNames.length > 0 ? l.studentNames.join(', ') : '— Leeg slot —'}
                    </p>
                    <div className="flex items-center gap-1 text-[#A0AEC0]" style={{ fontSize: 11 }}>
                      <MapPin size={10} /><span>{l.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#A0AEC0]" style={{ fontSize: 11 }}>
                      <UserCheck size={10} /><span>{l.instructorName}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Quick action cards + Recent + Registrations + Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Registratie verzoeken — live */}
            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>Registratie verzoeken</h3>
                <span
                  className={`px-2 py-0.5 rounded-full ${(pendingRegs.data?.length ?? 0) > 0 ? 'bg-[#FF5C00]/10 text-[#FF5C00]' : 'bg-[#F4F7FC] text-[#A0AEC0]'}`}
                  style={{ fontSize: 11, fontWeight: 700 }}>
                  {pendingRegs.loading ? '…' : `${pendingRegs.data?.length ?? 0} nieuw`}
                </span>
              </div>
              {pendingRegs.loading ? (
                <div className="py-8 text-center text-[#A0AEC0]" style={{ fontSize: 12 }}>Laden…</div>
              ) : (pendingRegs.data?.length ?? 0) === 0 ? (
                <div className="py-8 text-center">
                  <UserPlus size={28} className="mx-auto mb-2 text-[#C4CDD9]" />
                  <p className="text-[#A0AEC0]" style={{ fontSize: 12 }}>Geen openstaande verzoeken</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {pendingRegs.data!.slice(0, 4).map(r => (
                    <div key={r.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#F8FAFC]">
                      <div className="w-8 h-8 rounded-lg bg-[#FF5C00]/10 flex items-center justify-center flex-shrink-0">
                        <UserPlus size={14} className="text-[#FF5C00]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[#1A1A2E] truncate" style={{ fontSize: 12, fontWeight: 600 }}>{r.name}</p>
                        <p className="text-[#A0AEC0] truncate" style={{ fontSize: 11 }}>{r.email} · {r.city || '—'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Taken — live (from vacation requests + pending reviews + offers) */}
            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>Openstaande taken</h3>
                <span
                  className={`px-2 py-0.5 rounded-full ${(adminTasks.data?.length ?? 0) > 0 ? 'bg-[#0365C4]/10 text-[#0365C4]' : 'bg-[#F4F7FC] text-[#A0AEC0]'}`}
                  style={{ fontSize: 11, fontWeight: 700 }}>
                  {adminTasks.loading ? '…' : adminTasks.data?.length ?? 0}
                </span>
              </div>
              {adminTasks.loading ? (
                <div className="py-8 text-center text-[#A0AEC0]" style={{ fontSize: 12 }}>Laden…</div>
              ) : (adminTasks.data?.length ?? 0) === 0 ? (
                <div className="py-8 text-center">
                  <ClipboardCheck size={28} className="mx-auto mb-2 text-[#C4CDD9]" />
                  <p className="text-[#A0AEC0]" style={{ fontSize: 12 }}>Alle taken zijn voltooid</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {adminTasks.data!.map(t => (
                    <div key={t.id} className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-[#F8FAFC]">
                      <div className="w-5 h-5 rounded-full border-2 border-[#D0D5DD] flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 500 }}>{t.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <StatusBadge status={t.priority} />
                          <span className="text-[#A0AEC0]" style={{ fontSize: 11 }}>{t.deadline}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Recente reserveringen — live */}
            <Card className="p-5">
              <h3 className="text-[#1A1A2E] mb-3" style={{ fontSize: 15, fontWeight: 700 }}>Recente reserveringen</h3>
              {recentRes.loading ? (
                <div className="py-8 text-center text-[#A0AEC0]" style={{ fontSize: 12 }}>Laden…</div>
              ) : (recentRes.data?.length ?? 0) === 0 ? (
                <div className="py-8 text-center">
                  <Calendar size={28} className="mx-auto mb-2 text-[#C4CDD9]" />
                  <p className="text-[#A0AEC0]" style={{ fontSize: 12 }}>Nog geen reserveringen</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentRes.data!.map(r => (
                    <div key={r.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#F8FAFC]">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                           style={{ background: r.status === 'confirmed' ? '#ECFDF5' : r.status === 'cancelled' ? '#FEF2F2' : '#F3F4F6' }}>
                        <Calendar size={14}
                                  color={r.status === 'confirmed' ? '#27AE60' : r.status === 'cancelled' ? '#E74C3C' : '#6B7280'} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[#1A1A2E] truncate" style={{ fontSize: 12, fontWeight: 600 }}>
                          {r.childName || r.customerName}
                        </p>
                        <p className="text-[#A0AEC0] truncate" style={{ fontSize: 11 }}>
                          {r.date} {r.startTime} · €{(r.amountCents / 100).toFixed(0)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Quick stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Totaal betalingen',
                value: allTime.loading ? '…' : formatEuroFromCents(allTime.data?.totalPaymentsCents ?? 0),
                icon: DollarSign, color: '#0365C4' },
              { label: 'Totaal facturen',
                value: allTime.loading ? '…' : formatNumberNL(allTime.data?.totalInvoices ?? 0),
                icon: FileText, color: '#00C1FF' },
              { label: 'Tegoed uitgegeven',
                value: allTime.loading ? '…' : formatEuroFromCents(allTime.data?.walletsIssuedCents ?? 0),
                icon: CreditCard, color: '#FF5C00' },
              { label: 'Totaal lessen gegeven',
                value: allTime.loading ? '…' : formatNumberNL(allTime.data?.totalLessonsGiven ?? 0),
                icon: Award, color: '#27AE60' },
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

      {/* ═══════ CUSTOMERS — live Supabase ═══════ */}
      {view === 'customers' && (() => {
        const all = customers.data ?? [];
        const filtered = all.filter(c => {
          if (customerStatusFilter && c.status !== customerStatusFilter) return false;
          if (!searchFilter) return true;
          const q = searchFilter.toLowerCase();
          return c.parentName.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.city.toLowerCase().includes(q);
        });
        const sorted = [...filtered].sort((a, b) => {
          let va: string | number = '';
          let vb: string | number = '';
          switch (customerSortKey) {
            case 'parentName': va = a.parentName.toLowerCase(); vb = b.parentName.toLowerCase(); break;
            case 'email': va = a.email.toLowerCase(); vb = b.email.toLowerCase(); break;
            case 'city': va = a.city.toLowerCase(); vb = b.city.toLowerCase(); break;
            case 'walletBalance': va = a.walletBalanceCents; vb = b.walletBalanceCents; break;
            case 'childCount': va = a.childCount; vb = b.childCount; break;
            case 'createdAt': va = a.createdAt; vb = b.createdAt; break;
          }
          if (va < vb) return customerSortDir === 'asc' ? -1 : 1;
          if (va > vb) return customerSortDir === 'asc' ? 1 : -1;
          return 0;
        });
        const toggleSort = (key: typeof customerSortKey) => {
          if (customerSortKey === key) setCustomerSortDir(d => d === 'asc' ? 'desc' : 'asc');
          else { setCustomerSortKey(key); setCustomerSortDir('asc'); }
        };
        const sortIcon = (key: typeof customerSortKey) =>
          customerSortKey !== key ? null
            : <span className="ml-1 text-[#0365C4]" style={{ fontSize: 11 }}>{customerSortDir === 'asc' ? '▲' : '▼'}</span>;
        const exportCSV = () => {
          const header = ['Naam', 'E-mail', 'Telefoon', 'Stad', 'Kinderen', 'Tegoed (€)', 'Status', 'Aangemaakt'];
          const rows = sorted.map(c => [
            c.parentName, c.email, c.phone, c.city, c.childCount,
            (c.walletBalanceCents / 100).toFixed(2), c.status,
            c.createdAt ? new Date(c.createdAt).toLocaleDateString('nl-NL') : '',
          ]);
          const csv = [header, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
          const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `klanten_${new Date().toISOString().slice(0, 10)}.csv`;
          a.click();
          URL.revokeObjectURL(url);
          showToast(`${sorted.length} klanten geëxporteerd`);
        };
        const openDetail = (id: string) => { setSelectedCustomerId(id); setCustomerEditMode(false); goTo('customer-detail'); };
        const sb = (s: AdminCustomer['status']): { bg: string; fg: string } =>
          s === 'Actief' ? { bg: '#ECFDF5', fg: '#065F46' }
          : s === 'Nieuw' ? { bg: '#EFF6FF', fg: '#1E40AF' }
          : { bg: '#F4F7FC', fg: '#A0AEC0' };
        return (
        <>
          <PageHeader
            title="Klanten"
            subtitle={customers.loading ? 'Laden…' : `${sorted.length} van ${all.length} ${all.length === 1 ? 'klant' : 'klanten'}`}
            actions={
              <>
                <button onClick={() => goTo('customer-new')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 600 }}><Plus size={15} /> Nieuwe klant</button>
                <button onClick={exportCSV} disabled={!sorted.length} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4] disabled:opacity-50" style={{ fontSize: 13, fontWeight: 600 }}><Download size={15} /> Export CSV</button>
                <button onClick={() => customers.refresh()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><RefreshCw size={15} /> Vernieuwen</button>
              </>
            }
          />
          <Card>
            <div className="p-4 border-b border-[#F0F4FA] flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]" />
                <input placeholder="Zoek op naam, email, stad..." value={searchFilter} onChange={e => setSearchFilter(e.target.value)} className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#F4F7FC] border border-transparent focus:border-[#0365C4] outline-none text-[#1A1A2E]" style={{ fontSize: 13 }} />
              </div>
              <select
                value={customerStatusFilter}
                onChange={e => setCustomerStatusFilter(e.target.value as typeof customerStatusFilter)}
                className="px-3 py-2 rounded-lg bg-[#F4F7FC] border border-transparent focus:border-[#0365C4] outline-none text-[#1A1A2E]"
                style={{ fontSize: 13 }}
              >
                <option value="">Alle statussen</option>
                <option value="Actief">Actief</option>
                <option value="Nieuw">Nieuw</option>
                <option value="Inactief">Inactief</option>
              </select>
              {(customerStatusFilter || searchFilter) && (
                <button onClick={() => { setCustomerStatusFilter(''); setSearchFilter(''); }} className="text-[#6B7B94] hover:text-[#FF5C00]" style={{ fontSize: 12, fontWeight: 600 }}>
                  Filters wissen
                </button>
              )}
            </div>
            {customers.loading ? (
              <div className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</div>
            ) : customers.error ? (
              <div className="py-16 text-center">
                <AlertCircle size={36} className="mx-auto mb-3 text-[#FF5C00]" />
                <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Klanten konden niet geladen worden</p>
                <p className="text-[#A0AEC0] mt-1" style={{ fontSize: 12 }}>{customers.error}</p>
              </div>
            ) : sorted.length === 0 ? (
              <div className="py-16 text-center">
                <Users size={36} className="mx-auto mb-3 text-[#C4CDD9]" />
                <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>
                  {(searchFilter || customerStatusFilter) ? 'Geen klanten gevonden' : 'Nog geen klanten'}
                </p>
                <p className="text-[#A0AEC0] mt-1" style={{ fontSize: 12 }}>
                  {(searchFilter || customerStatusFilter) ? 'Pas de zoekterm of status aan' : 'Klanten verschijnen hier zodra ze zich registreren'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8FAFC] border-b border-[#E5EAF2]">
                    <tr>
                      <th onClick={() => toggleSort('parentName')} className="text-left px-4 py-3 cursor-pointer hover:bg-[#F4F7FC]" style={{ fontSize: 11, fontWeight: 700, color: '#6B7B94', letterSpacing: 0.4, width: 200 }}>OUDER {sortIcon('parentName')}</th>
                      <th onClick={() => toggleSort('email')} className="text-left px-4 py-3 cursor-pointer hover:bg-[#F4F7FC]" style={{ fontSize: 11, fontWeight: 700, color: '#6B7B94', letterSpacing: 0.4, width: 220 }}>E-MAIL {sortIcon('email')}</th>
                      <th className="text-left px-4 py-3" style={{ fontSize: 11, fontWeight: 700, color: '#6B7B94', letterSpacing: 0.4, width: 140 }}>TELEFOON</th>
                      <th onClick={() => toggleSort('city')} className="text-left px-4 py-3 cursor-pointer hover:bg-[#F4F7FC]" style={{ fontSize: 11, fontWeight: 700, color: '#6B7B94', letterSpacing: 0.4, width: 120 }}>STAD {sortIcon('city')}</th>
                      <th onClick={() => toggleSort('childCount')} className="text-center px-4 py-3 cursor-pointer hover:bg-[#F4F7FC]" style={{ fontSize: 11, fontWeight: 700, color: '#6B7B94', letterSpacing: 0.4, width: 90 }}>KINDEREN {sortIcon('childCount')}</th>
                      <th onClick={() => toggleSort('walletBalance')} className="text-right px-4 py-3 cursor-pointer hover:bg-[#F4F7FC]" style={{ fontSize: 11, fontWeight: 700, color: '#6B7B94', letterSpacing: 0.4, width: 110 }}>TEGOED {sortIcon('walletBalance')}</th>
                      <th className="text-center px-4 py-3" style={{ fontSize: 11, fontWeight: 700, color: '#6B7B94', letterSpacing: 0.4, width: 100 }}>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map(c => {
                      const sty = sb(c.status);
                      return (
                        <tr key={c.id} onClick={() => openDetail(c.id)} className="border-b border-[#F0F4FA] hover:bg-[#F8FAFC] cursor-pointer transition-colors">
                          <td className="px-4 py-3 text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>{c.parentName}</td>
                          <td className="px-4 py-3 text-[#6B7B94]" style={{ fontSize: 13 }}>{c.email}</td>
                          <td className="px-4 py-3 text-[#6B7B94]" style={{ fontSize: 13 }}>{c.phone || '—'}</td>
                          <td className="px-4 py-3 text-[#6B7B94]" style={{ fontSize: 13 }}>{c.city || '—'}</td>
                          <td className="px-4 py-3 text-center text-[#0365C4]" style={{ fontSize: 13, fontWeight: 700 }}>{c.childCount}</td>
                          <td className="px-4 py-3 text-right" style={{ fontSize: 13, fontWeight: 600 }}>
                            <span className={c.walletBalanceCents > 0 ? 'text-[#27AE60]' : 'text-[#A0AEC0]'}>{formatEuroFromCents(c.walletBalanceCents)}</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-block px-2.5 py-0.5 rounded-full" style={{ fontSize: 11, fontWeight: 700, background: sty.bg, color: sty.fg }}>{c.status}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            {!customers.loading && sorted.length > 0 && (
              <div className="p-3 border-t border-[#F0F4FA] flex items-center justify-between">
                <span className="text-[#A0AEC0]" style={{ fontSize: 12 }}>Toont {sorted.length} van {all.length} klanten</span>
                <span className="text-[#A0AEC0]" style={{ fontSize: 12 }}>Klik op een rij voor details</span>
              </div>
            )}
          </Card>
        </>
        );
      })()}

      {/* ═══════ CUSTOMER NEW ═══════ */}
      {view === 'customer-new' && (() => {
        const f = newCustomerForm;
        const setF = (k: keyof typeof newCustomerForm, v: string) => {
          setNewCustomerForm(prev => ({ ...prev, [k]: v }));
          if (newCustomerErrors[k]) setNewCustomerErrors(prev => { const n = { ...prev }; delete n[k]; return n; });
        };
        const validate = () => {
          const errs: Record<string, string> = {};
          if (!f.childFirst.trim()) errs.childFirst = 'Verplicht';
          if (!f.childLast.trim()) errs.childLast = 'Verplicht';
          if (!f.childDob) errs.childDob = 'Verplicht';
          if (!f.parentFirst.trim()) errs.parentFirst = 'Verplicht';
          if (!f.parentLast.trim()) errs.parentLast = 'Verplicht';
          if (!f.email.trim()) errs.email = 'Verplicht';
          else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) errs.email = 'Ongeldig e-mailadres';
          if (!f.password) errs.password = 'Verplicht — minimaal 8 tekens';
          else if (f.password.length < 8) errs.password = 'Minimaal 8 tekens';
          if (!f.phone.trim()) errs.phone = 'Verplicht';
          if (!f.location) errs.location = 'Kies een locatie';
          if (!f.lessonType) errs.lessonType = 'Kies een lestype';
          setNewCustomerErrors(errs);
          return Object.keys(errs).length === 0;
        };
        const submit = async () => {
          if (!validate()) {
            showToast('Controleer de verplichte velden');
            return;
          }
          setNewCustomerSubmitting(true);
          const r = await createCustomerViaEdgeFn({
            parent: {
              email: f.email.trim().toLowerCase(),
              password: f.password,
              first_name: f.parentFirst.trim(),
              last_name:  f.parentLast.trim(),
              phone:      f.phone.trim(),
              city:       f.city.trim() || undefined,
              address:    f.address.trim() || undefined,
            },
            child: {
              first_name: f.childFirst.trim(),
              last_name:  f.childLast.trim(),
              date_of_birth: f.childDob,
            },
            lesson_preference: f.location || f.lessonType ? {
              location: f.location, type: f.lessonType,
              day: f.day, time: f.time,
            } : undefined,
          });
          setNewCustomerSubmitting(false);
          if (!r.ok) {
            showToast(`❌ Niet opgeslagen: ${r.error}`);
            return;
          }
          showToast(`✓ ${f.parentFirst} ${f.parentLast} aangemaakt — ${f.childFirst} toegevoegd`);
          // Reset form
          setNewCustomerForm({
            childFirst: '', childLast: '', childDob: '',
            parentFirst: '', parentLast: '',
            email: '', password: '',
            phone: '', city: '', address: '',
            location: '', lessonType: '', day: '', time: '',
          });
          setNewCustomerErrors({});
          await customers.refresh();
          if (r.userId) { setSelectedCustomerId(r.userId); goTo('customer-detail'); }
          else goTo('customers');
        };
        const generatePassword = () => {
          // Friendly password Walter can read out: word + 4 digits + bang
          const words = ['Snorkel', 'Zwem', 'Water', 'Splash', 'Aqua', 'Dolfijn', 'Vis', 'Bubbel'];
          const w = words[Math.floor(Math.random() * words.length)];
          const n = Math.floor(1000 + Math.random() * 9000);
          setF('password', `${w}${n}!`);
        };
        const inputCls = (key: string) =>
          `w-full px-3 py-2.5 rounded-lg border outline-none ${newCustomerErrors[key] ? 'border-[#E74C3C] focus:border-[#E74C3C]' : 'border-[#E8ECF4] focus:border-[#0365C4]'} text-[#1A1A2E]`;
        const errMsg = (key: string) => newCustomerErrors[key]
          ? <p className="text-[#E74C3C] mt-1" style={{ fontSize: 11, fontWeight: 600 }}>{newCustomerErrors[key]}</p>
          : null;

        return (
          <>
            <PageHeader
              title="Nieuwe klant toevoegen"
              subtitle="Maakt een ouder-account aan plus eerste kind. Inloggegevens worden meteen actief."
              actions={
                <button onClick={() => goTo('customers')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>
                  <ArrowLeft size={16} /> Terug
                </button>
              }
            />
            <Card className="p-6 max-w-[920px]">
              <h3 className="text-[#1A1A2E] mb-3 flex items-center gap-2" style={{ fontSize: 14, fontWeight: 700 }}>
                <Users size={16} color="#FF5C00" /> Kind
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Voornaam kind *</label>
                  <input value={f.childFirst} onChange={e => setF('childFirst', e.target.value)} placeholder="bijv. Emma" className={inputCls('childFirst')} style={{ fontSize: 14 }} />
                  {errMsg('childFirst')}
                </div>
                <div>
                  <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Achternaam kind *</label>
                  <input value={f.childLast} onChange={e => setF('childLast', e.target.value)} placeholder="Achternaam" className={inputCls('childLast')} style={{ fontSize: 14 }} />
                  {errMsg('childLast')}
                </div>
                <div>
                  <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Geboortedatum *</label>
                  <input type="date" value={f.childDob} onChange={e => setF('childDob', e.target.value)} className={inputCls('childDob')} style={{ fontSize: 14 }} />
                  {errMsg('childDob')}
                </div>
              </div>

              <h3 className="text-[#1A1A2E] mb-3 flex items-center gap-2" style={{ fontSize: 14, fontWeight: 700 }}>
                <Users size={16} color="#0365C4" /> Ouder / verzorger
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Voornaam ouder *</label>
                  <input value={f.parentFirst} onChange={e => setF('parentFirst', e.target.value)} placeholder="bijv. Lisa" className={inputCls('parentFirst')} style={{ fontSize: 14 }} />
                  {errMsg('parentFirst')}
                </div>
                <div>
                  <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Achternaam ouder *</label>
                  <input value={f.parentLast} onChange={e => setF('parentLast', e.target.value)} placeholder="Achternaam" className={inputCls('parentLast')} style={{ fontSize: 14 }} />
                  {errMsg('parentLast')}
                </div>
                <div>
                  <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>E-mail *</label>
                  <input type="email" value={f.email} onChange={e => setF('email', e.target.value)} placeholder="naam@voorbeeld.nl" className={inputCls('email')} style={{ fontSize: 14 }} autoComplete="off" />
                  {errMsg('email')}
                </div>
                <div>
                  <label className="text-[#6B7B94] block mb-1 flex items-center justify-between" style={{ fontSize: 12, fontWeight: 600 }}>
                    <span>Wachtwoord (om in te loggen) *</span>
                    <button type="button" onClick={generatePassword} className="text-[#0365C4] hover:underline" style={{ fontSize: 11, fontWeight: 700 }}>
                      Genereer
                    </button>
                  </label>
                  <input value={f.password} onChange={e => setF('password', e.target.value)} placeholder="min. 8 tekens" className={inputCls('password')} style={{ fontSize: 14 }} autoComplete="new-password" />
                  {errMsg('password')}
                </div>
                <div>
                  <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Mobiel *</label>
                  <input value={f.phone} onChange={e => setF('phone', e.target.value)} placeholder="+31 6 ..." className={inputCls('phone')} style={{ fontSize: 14 }} />
                  {errMsg('phone')}
                </div>
                <div>
                  <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Woonplaats</label>
                  <input value={f.city} onChange={e => setF('city', e.target.value)} placeholder="Stad" className={inputCls('city')} style={{ fontSize: 14 }} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Adres</label>
                  <input value={f.address} onChange={e => setF('address', e.target.value)} placeholder="Straat + huisnummer" className={inputCls('address')} style={{ fontSize: 14 }} />
                </div>
              </div>

              <h3 className="text-[#1A1A2E] mb-3 mt-4 flex items-center gap-2" style={{ fontSize: 14, fontWeight: 700 }}>
                <Calendar size={16} color="#27AE60" /> Lesvoorkeur (optioneel)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Locatie</label>
                  <select value={f.location} onChange={e => setF('location', e.target.value)} className={inputCls('location')} style={{ fontSize: 14 }}>
                    <option value="">Kies…</option>
                    {(locationsList.data ?? []).map(l => <option key={l.id} value={l.name}>{l.name}</option>)}
                  </select>
                  {errMsg('location')}
                </div>
                <div>
                  <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Type zwemles</label>
                  <select value={f.lessonType} onChange={e => setF('lessonType', e.target.value)} className={inputCls('lessonType')} style={{ fontSize: 14 }}>
                    <option value="">Kies…</option>
                    <option value="1-op-1">1-op-1 (€39)</option>
                    <option value="1-op-2">1-op-2 (€28)</option>
                    <option value="1-op-3">1-op-3 (€22)</option>
                    <option value="Survival">Survival</option>
                  </select>
                  {errMsg('lessonType')}
                </div>
                <div>
                  <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Dag</label>
                  <select value={f.day} onChange={e => setF('day', e.target.value)} className={inputCls('day')} style={{ fontSize: 14 }}>
                    <option value="">Kies…</option>
                    {['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Tijdstip</label>
                  <input value={f.time} onChange={e => setF('time', e.target.value)} placeholder="bijv. 16:30" className={inputCls('time')} style={{ fontSize: 14 }} />
                </div>
              </div>

              {Object.keys(newCustomerErrors).length > 0 && (
                <div className="mb-4 p-3 rounded-lg" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
                  <p className="text-[#991B1B] flex items-center gap-1.5" style={{ fontSize: 12, fontWeight: 700 }}>
                    <AlertCircle size={14} /> Vul alle verplichte velden in (gemarkeerd met *)
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={submit} disabled={newCustomerSubmitting} className="px-6 py-2.5 rounded-lg text-white disabled:opacity-50 flex items-center gap-2" style={{ background: '#0365C4', fontSize: 14, fontWeight: 700 }}>
                  {newCustomerSubmitting ? <><RefreshCw size={15} className="animate-spin" /> Bezig…</> : <><Check size={15} /> Klant aanmaken</>}
                </button>
                <button onClick={() => goTo('customers')} disabled={newCustomerSubmitting} className="px-6 py-2.5 rounded-lg text-[#6B7B94] border border-[#E8ECF4] disabled:opacity-50" style={{ fontSize: 14, fontWeight: 600 }}>
                  Annuleren
                </button>
              </div>

              <div className="mt-6 p-3 rounded-lg" style={{ background: '#F0F9FF', border: '1px solid #BAE6FD' }}>
                <p className="text-[#0369A1] flex items-start gap-2" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  <Info size={14} className="flex-shrink-0 mt-0.5" />
                  <span>De ouder krijgt direct een account met de opgegeven inloggegevens. Geef het wachtwoord persoonlijk aan de ouder zodat ze in de mobiele app kunnen inloggen.</span>
                </p>
              </div>
            </Card>
          </>
        );
      })()}

      {/* ═══════ CUSTOMER DETAIL ═══════ */}
      {view === 'customer-detail' && (() => {
        const d = customerDetail.data;
        const goBack = () => { setSelectedCustomerId(''); setCustomerEditMode(false); setCustomerDeleteConfirm(false); goTo('customers'); };
        const startEdit = () => {
          if (!d) return;
          setCustomerEdits({
            first_name: d.firstName, last_name: d.lastName,
            phone: d.phone, city: d.city, address: d.address || '',
          });
          setCustomerEditMode(true);
        };
        const saveEdit = async () => {
          if (!d) return;
          const r = await updateCustomerProfile(d.id, customerEdits);
          if (!r.ok) {
            showToast(`❌ Niet opgeslagen: ${r.error}`);
            return;
          }
          showToast('✓ Gegevens opgeslagen');
          setCustomerEditMode(false);
          await Promise.all([customerDetail.refresh(), customers.refresh()]);
        };
        const doDelete = async () => {
          if (!d) return;
          const r = await deleteCustomer(d.id);
          if (!r.ok) {
            showToast(`❌ Verwijderen mislukt: ${r.error}`);
            return;
          }
          showToast(`✓ ${d.firstName} ${d.lastName} verwijderd`);
          await customers.refresh();
          goBack();
        };
        const sb = (s: 'Actief' | 'Nieuw' | 'Inactief'): { bg: string; fg: string } =>
          s === 'Actief' ? { bg: '#ECFDF5', fg: '#065F46' }
          : s === 'Nieuw' ? { bg: '#EFF6FF', fg: '#1E40AF' }
          : { bg: '#F4F7FC', fg: '#A0AEC0' };

        return (
          <>
            <PageHeader
              title={d ? `${d.firstName} ${d.lastName}` : 'Klant detail'}
              subtitle={d ? d.email : (customerDetail.loading ? 'Laden…' : 'Selecteer een klant')}
              actions={<button onClick={goBack} className="flex items-center gap-1.5 text-[#6B7B94] hover:text-[#0365C4]" style={{ fontSize: 13, fontWeight: 600 }}><ArrowLeft size={16} /> Terug naar overzicht</button>}
            />
            {customerDetail.loading ? (
              <Card className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Klant wordt geladen…</Card>
            ) : !d ? (
              <Card className="py-16 text-center">
                <Users size={36} className="mx-auto mb-3 text-[#C4CDD9]" />
                <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Klant niet gevonden</p>
                <p className="text-[#A0AEC0] mt-1" style={{ fontSize: 12 }}>Ga terug en kies een klant uit de lijst</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Klantgegevens */}
                <Card className="lg:col-span-2 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[#1A1A2E] flex items-center gap-2" style={{ fontSize: 16, fontWeight: 700 }}>
                      <Users size={18} color="#0365C4" /> Klantgegevens
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full" style={{ fontSize: 11, fontWeight: 700, ...((s => ({ background: s.bg, color: s.fg }))(sb(d.status))) }}>{d.status}</span>
                      {!customerEditMode ? (
                        <button onClick={startEdit} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[#0365C4] bg-white border border-[#0365C4]/20 hover:bg-[#0365C4]/5" style={{ fontSize: 12, fontWeight: 600 }}>
                          <Edit2 size={13} /> Bewerken
                        </button>
                      ) : (
                        <>
                          <button onClick={() => setCustomerEditMode(false)} className="px-3 py-1.5 rounded-lg text-[#6B7B94] border border-[#E8ECF4]" style={{ fontSize: 12, fontWeight: 600 }}>Annuleren</button>
                          <button onClick={saveEdit} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white" style={{ fontSize: 12, fontWeight: 700, background: '#27AE60' }}>
                            <Check size={13} /> Opslaan
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  {!customerEditMode ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
                      {[
                        { l: 'Voornaam', v: d.firstName },
                        { l: 'Achternaam', v: d.lastName },
                        { l: 'E-mail', v: d.email },
                        { l: 'Telefoon', v: d.phone || '—' },
                        { l: 'Woonplaats', v: d.city || '—' },
                        { l: 'Adres', v: d.address || '—' },
                        { l: '# Kinderen', v: String(d.children.length) },
                        { l: 'Tegoed (wallet)', v: formatEuroFromCents(d.walletBalanceCents) },
                        { l: 'Totaal uitgegeven', v: formatEuroFromCents(d.totalSpendCents) },
                        { l: 'Aangemaakt', v: new Date(d.createdAt).toLocaleDateString('nl-NL', { day: '2-digit', month: 'short', year: 'numeric' }) },
                        { l: 'Laatst ingelogd', v: d.lastLoginAt ? new Date(d.lastLoginAt).toLocaleDateString('nl-NL') : 'Nog nooit' },
                        { l: 'Klant ID', v: d.id.slice(0, 8) + '…' },
                      ].map(f => (
                        <div key={f.l}>
                          <p className="text-[#A0AEC0]" style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.3 }}>{f.l.toUpperCase()}</p>
                          <p className="text-[#1A1A2E] mt-0.5" style={{ fontSize: 13, fontWeight: 500 }}>{f.v}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {([
                        { k: 'first_name' as const, l: 'Voornaam' },
                        { k: 'last_name' as const, l: 'Achternaam' },
                        { k: 'phone' as const, l: 'Telefoon' },
                        { k: 'city' as const, l: 'Woonplaats' },
                        { k: 'address' as const, l: 'Adres' },
                      ]).map(f => (
                        <div key={f.k}>
                          <label className="block text-[#6B7B94] mb-1" style={{ fontSize: 12, fontWeight: 600 }}>{f.l}</label>
                          <input
                            value={customerEdits[f.k]}
                            onChange={e => setCustomerEdits(prev => ({ ...prev, [f.k]: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4]"
                            style={{ fontSize: 13 }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </Card>

                {/* Acties + Status */}
                <Card className="p-5">
                  <h3 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Acties</h3>
                  <div className="space-y-2">
                    <button onClick={() => goTo('reservation-new')} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-[#F4F7FC] transition-all text-left border border-[#F0F4FA]">
                      <Calendar size={16} color="#0365C4" />
                      <span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 500 }}>Maak reservering</span>
                    </button>
                    <button onClick={() => goTo('invoice-new')} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-[#F4F7FC] transition-all text-left border border-[#F0F4FA]">
                      <FileText size={16} color="#27AE60" />
                      <span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 500 }}>Maak factuur</span>
                    </button>
                    <button onClick={() => goTo('wallets')} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-[#F4F7FC] transition-all text-left border border-[#F0F4FA]">
                      <CreditCard size={16} color="#FF5C00" />
                      <span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 500 }}>Wallet beheren</span>
                    </button>
                    <button onClick={() => { window.location.href = `mailto:${d.email}`; }} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-[#F4F7FC] transition-all text-left border border-[#F0F4FA]">
                      <Mail size={16} color="#00C1FF" />
                      <span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 500 }}>Mail klant</span>
                    </button>
                    <button onClick={() => goTo('tasks')} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-[#F4F7FC] transition-all text-left border border-[#F0F4FA]">
                      <ClipboardList size={16} color="#8E44AD" />
                      <span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 500 }}>Aanmaken taak</span>
                    </button>
                    <div className="pt-3 mt-3 border-t border-[#F0F4FA]">
                      {!customerDeleteConfirm ? (
                        <button onClick={() => setCustomerDeleteConfirm(true)} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-red-50 transition-all text-left border border-[#F0F4FA]">
                          <Trash2 size={16} color="#E74C3C" />
                          <span className="text-[#E74C3C]" style={{ fontSize: 13, fontWeight: 600 }}>Klant verwijderen</span>
                        </button>
                      ) : (
                        <div className="p-3 rounded-lg" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
                          <p className="text-[#991B1B] mb-2" style={{ fontSize: 12, fontWeight: 700 }}>Zeker weten?</p>
                          <p className="text-[#991B1B] mb-3" style={{ fontSize: 11 }}>Dit verwijdert ook alle kinderen, reserveringen en wallet-history. Niet ongedaan te maken.</p>
                          <div className="flex gap-2">
                            <button onClick={() => setCustomerDeleteConfirm(false)} className="flex-1 px-3 py-1.5 rounded-lg bg-white text-[#6B7B94] border border-[#E8ECF4]" style={{ fontSize: 12, fontWeight: 600 }}>Annuleren</button>
                            <button onClick={doDelete} className="flex-1 px-3 py-1.5 rounded-lg text-white" style={{ fontSize: 12, fontWeight: 700, background: '#E74C3C' }}>Bevestig delete</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Children */}
                <Card className="lg:col-span-2 p-5">
                  <h3 className="text-[#1A1A2E] flex items-center gap-2 mb-4" style={{ fontSize: 16, fontWeight: 700 }}>
                    <Users size={18} color="#FF5C00" /> Kinderen ({d.children.length})
                  </h3>
                  {d.children.length === 0 ? (
                    <p className="text-[#A0AEC0] py-6 text-center" style={{ fontSize: 13 }}>Nog geen kinderen geregistreerd</p>
                  ) : (
                    <div className="space-y-3">
                      {d.children.map(c => (
                        <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: '#F8FAFC' }}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0365C4 0%, #00C1FF 100%)' }}>
                            <span className="text-white" style={{ fontSize: 14, fontWeight: 800 }}>{c.name.charAt(0).toUpperCase()}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</p>
                            <p className="text-[#6B7B94]" style={{ fontSize: 12 }}>
                              {c.age != null ? `${c.age} jaar` : 'Leeftijd onbekend'}
                              {c.dateOfBirth && ` · ${new Date(c.dateOfBirth).toLocaleDateString('nl-NL')}`}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[#27AE60]" style={{ fontSize: 13, fontWeight: 700 }}>{c.progressPercent}%</p>
                            <p className="text-[#A0AEC0]" style={{ fontSize: 10 }}>voortgang</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>

                {/* Wallet */}
                <Card className="p-5">
                  <h3 className="text-[#1A1A2E] flex items-center gap-2 mb-4" style={{ fontSize: 16, fontWeight: 700 }}>
                    <Wallet size={18} color="#27AE60" /> Tegoed
                  </h3>
                  <p className="text-[#A0AEC0]" style={{ fontSize: 11, fontWeight: 600 }}>HUIDIGE BALANS</p>
                  <p className="text-[#27AE60] mt-1" style={{ fontSize: 28, fontWeight: 800 }}>{formatEuroFromCents(d.walletBalanceCents)}</p>
                  {d.walletTransactions.length > 0 && (
                    <>
                      <p className="text-[#6B7B94] mt-4 mb-2" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.3 }}>RECENTE TRANSACTIES</p>
                      <div className="space-y-1.5 max-h-[180px] overflow-y-auto">
                        {d.walletTransactions.slice(0, 8).map(tx => (
                          <div key={tx.id} className="flex items-center justify-between text-sm">
                            <div>
                              <p className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>{tx.description || tx.type}</p>
                              <p className="text-[#A0AEC0]" style={{ fontSize: 10 }}>{new Date(tx.createdAt).toLocaleDateString('nl-NL')}</p>
                            </div>
                            <span className={tx.amountCents >= 0 ? 'text-[#27AE60]' : 'text-[#E74C3C]'} style={{ fontSize: 12, fontWeight: 700 }}>
                              {tx.amountCents >= 0 ? '+' : ''}{formatEuroFromCents(tx.amountCents)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </Card>

                {/* Reservations */}
                <Card className="lg:col-span-3 p-5">
                  <h3 className="text-[#1A1A2E] flex items-center gap-2 mb-4" style={{ fontSize: 16, fontWeight: 700 }}>
                    <Calendar size={18} color="#0365C4" /> Reserveringen ({d.reservations.length})
                    <span className="text-[#A0AEC0] ml-2" style={{ fontSize: 11, fontWeight: 500 }}>laatste 12 maanden</span>
                  </h3>
                  {d.reservations.length === 0 ? (
                    <p className="text-[#A0AEC0] py-6 text-center" style={{ fontSize: 13 }}>Nog geen reserveringen in de afgelopen 12 maanden</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-[#F8FAFC]">
                          <tr>
                            {['Datum', 'Tijd', 'Kind', 'Type', 'Locatie', 'Instructeur', 'Status', 'Bedrag'].map(h => (
                              <th key={h} className="text-left px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.4 }}>{h.toUpperCase()}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {d.reservations.map(r => (
                            <tr key={r.id} className="border-b border-[#F0F4FA]">
                              <td className="px-3 py-2.5 text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>{r.date ? new Date(r.date).toLocaleDateString('nl-NL') : '—'}</td>
                              <td className="px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 12 }}>{r.startTime}–{r.endTime}</td>
                              <td className="px-3 py-2.5 text-[#1A1A2E]" style={{ fontSize: 12 }}>{r.childName}</td>
                              <td className="px-3 py-2.5 text-[#0365C4]" style={{ fontSize: 12, fontWeight: 600 }}>{r.type}</td>
                              <td className="px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 12 }}>{r.location}</td>
                              <td className="px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 12 }}>{r.instructorName}</td>
                              <td className="px-3 py-2.5"><span className="px-2 py-0.5 rounded-full" style={{ fontSize: 10, fontWeight: 700, background: r.status === 'cancelled' ? '#FEE2E2' : '#ECFDF5', color: r.status === 'cancelled' ? '#991B1B' : '#065F46' }}>{r.status}</span></td>
                              <td className="px-3 py-2.5 text-right text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 700 }}>{formatEuroFromCents(r.amountCents)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Card>
              </div>
            )}
          </>
        );
      })()}

      {/* ═══════ RESERVATIONS — live ═══════ */}
      {view === 'reservations' && (() => {
        const all = reservationsAll.data ?? [];
        const today = new Date().toISOString().slice(0, 10);
        const ago = (days: number) => { const d = new Date(); d.setDate(d.getDate() - days); return d.toISOString().slice(0, 10); };
        const ahead = (days: number) => { const d = new Date(); d.setDate(d.getDate() + days); return d.toISOString().slice(0, 10); };
        const filtered = all.filter(r => {
          if (reservationStatusFilter && r.status !== reservationStatusFilter) return false;
          if (reservationLocationFilter && r.location !== reservationLocationFilter) return false;
          if (reservationDateFilter === 'today' && r.date !== today) return false;
          if (reservationDateFilter === 'next7' && (r.date < today || r.date > ahead(7))) return false;
          if (reservationDateFilter === 'past30' && (r.date > today || r.date < ago(30))) return false;
          if (reservationDateFilter === 'future' && r.date < today) return false;
          if (reservationSearch) {
            const q = reservationSearch.toLowerCase();
            if (!r.customerName.toLowerCase().includes(q) &&
                !r.childName.toLowerCase().includes(q) &&
                !r.instructorName.toLowerCase().includes(q)) return false;
          }
          return true;
        });
        const sorted = [...filtered].sort((a, b) => {
          const va = (a.date + a.startTime).toString();
          const vb = (b.date + b.startTime).toString();
          return reservationSortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
        });
        const stats = {
          total: filtered.length,
          confirmed: filtered.filter(r => r.status === 'confirmed').length,
          cancelled: filtered.filter(r => r.status === 'cancelled').length,
          totalCents: filtered.reduce((s, r) => s + r.amountCents, 0),
        };
        const distinctLocations = Array.from(new Set(all.map(r => r.location).filter(Boolean))).sort();
        const exportCSV = () => {
          const header = ['Datum', 'Tijd', 'Kind', 'Ouder', 'Type', 'Locatie', 'Instructeur', 'Status', 'Betaling', 'Bedrag (€)'];
          const rows = sorted.map(r => [
            r.date, `${r.startTime}-${r.endTime}`, r.childName, r.customerName, r.type, r.location,
            r.instructorName, r.status, r.paymentStatus, (r.amountCents / 100).toFixed(2),
          ]);
          const csv = [header, ...rows].map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
          const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `reserveringen_${new Date().toISOString().slice(0, 10)}.csv`;
          a.click();
          URL.revokeObjectURL(url);
          showToast(`${sorted.length} reserveringen geëxporteerd`);
        };
        return (
          <>
            <PageHeader
              title="Reserveringen"
              subtitle={reservationsAll.loading
                ? 'Laden…'
                : `${stats.total} ${stats.total === 1 ? 'reservering' : 'reserveringen'} · ${stats.confirmed} bevestigd · ${formatEuroFromCents(stats.totalCents)} omzet`}
              actions={
                <>
                  <button onClick={() => goTo('reservation-new')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 600 }}><Plus size={15} /> Nieuwe</button>
                  <button onClick={() => goTo('calendar')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#0365C4] bg-white border border-[#0365C4]/20" style={{ fontSize: 13, fontWeight: 600 }}><Calendar size={15} /> Kalender</button>
                  <button onClick={() => goTo('roster')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><BookOpen size={15} /> Rooster</button>
                  <button onClick={exportCSV} disabled={!sorted.length} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4] disabled:opacity-50" style={{ fontSize: 13, fontWeight: 600 }}><Download size={15} /> Export</button>
                  <button onClick={() => reservationsAll.refresh()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><RefreshCw size={15} /> Vernieuwen</button>
                </>
              }
            />
            <Card>
              <div className="p-4 border-b border-[#F0F4FA] flex items-center gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]" />
                  <input placeholder="Zoek op kind, ouder of instructeur…" value={reservationSearch} onChange={e => setReservationSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#F4F7FC] border border-transparent focus:border-[#0365C4] outline-none text-[#1A1A2E]" style={{ fontSize: 13 }} />
                </div>
                <select value={reservationDateFilter} onChange={e => setReservationDateFilter(e.target.value as typeof reservationDateFilter)} className="px-3 py-2 rounded-lg bg-[#F4F7FC] border border-transparent focus:border-[#0365C4] outline-none" style={{ fontSize: 13 }}>
                  <option value="">Alle datums</option>
                  <option value="today">Vandaag</option>
                  <option value="next7">Komende 7 dagen</option>
                  <option value="future">Vanaf vandaag</option>
                  <option value="past30">Afgelopen 30 dagen</option>
                </select>
                <select value={reservationStatusFilter} onChange={e => setReservationStatusFilter(e.target.value as typeof reservationStatusFilter)} className="px-3 py-2 rounded-lg bg-[#F4F7FC] border border-transparent focus:border-[#0365C4] outline-none" style={{ fontSize: 13 }}>
                  <option value="">Alle statussen</option>
                  <option value="confirmed">Bevestigd</option>
                  <option value="pending">In afwachting</option>
                  <option value="cancelled">Geannuleerd</option>
                  <option value="completed">Voltooid</option>
                </select>
                <select value={reservationLocationFilter} onChange={e => setReservationLocationFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-[#F4F7FC] border border-transparent focus:border-[#0365C4] outline-none" style={{ fontSize: 13 }}>
                  <option value="">Alle locaties</option>
                  {distinctLocations.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <button onClick={() => setReservationSortDir(d => d === 'asc' ? 'desc' : 'asc')} className="px-3 py-2 rounded-lg bg-[#F4F7FC] border border-transparent text-[#6B7B94]" style={{ fontSize: 13 }}>
                  Datum {reservationSortDir === 'asc' ? '▲' : '▼'}
                </button>
                {(reservationSearch || reservationStatusFilter || reservationLocationFilter || reservationDateFilter) && (
                  <button onClick={() => { setReservationSearch(''); setReservationStatusFilter(''); setReservationLocationFilter(''); setReservationDateFilter(''); }} className="text-[#FF5C00] hover:underline" style={{ fontSize: 12, fontWeight: 600 }}>
                    Filters wissen
                  </button>
                )}
              </div>
              {reservationsAll.loading ? (
                <div className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</div>
              ) : sorted.length === 0 ? (
                <div className="py-16 text-center">
                  <Calendar size={36} className="mx-auto mb-3 text-[#C4CDD9]" />
                  <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>
                    {(reservationSearch || reservationStatusFilter || reservationLocationFilter || reservationDateFilter) ? 'Geen reserveringen gevonden' : 'Nog geen reserveringen'}
                  </p>
                  <p className="text-[#A0AEC0] mt-1" style={{ fontSize: 12 }}>
                    {(reservationSearch || reservationStatusFilter || reservationLocationFilter || reservationDateFilter) ? 'Pas de filters aan' : 'Boekingen verschijnen hier zodra klanten reserveren'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#F8FAFC] border-b border-[#E5EAF2]">
                      <tr>
                        {['DATUM', 'TIJD', 'KIND', 'OUDER', 'TYPE', 'LOCATIE', 'INSTRUCTEUR', 'STATUS', 'BEDRAG'].map(h => (
                          <th key={h} className="text-left px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.4 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sorted.map(r => {
                        const sty = r.status === 'cancelled' ? { bg: '#FEE2E2', fg: '#991B1B' }
                          : r.status === 'pending' ? { bg: '#FEF3C7', fg: '#92400E' }
                          : r.status === 'completed' ? { bg: '#DBEAFE', fg: '#1E40AF' }
                          : { bg: '#ECFDF5', fg: '#065F46' };
                        return (
                          <tr key={r.id} onClick={() => { setSelectedReservation(r as unknown as Reservation); goTo('reservation-detail'); }} className="border-b border-[#F0F4FA] hover:bg-[#F8FAFC] cursor-pointer transition-colors">
                            <td className="px-3 py-2.5 text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>{r.date ? new Date(r.date).toLocaleDateString('nl-NL', { day: '2-digit', month: 'short' }) : '—'}</td>
                            <td className="px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 12 }}>{r.startTime}–{r.endTime}</td>
                            <td className="px-3 py-2.5 text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>{r.childName}</td>
                            <td className="px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 12 }}>{r.customerName}</td>
                            <td className="px-3 py-2.5 text-[#0365C4]" style={{ fontSize: 12, fontWeight: 600 }}>{r.type}</td>
                            <td className="px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 12 }}>{r.location}</td>
                            <td className="px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 12 }}>{r.instructorName}</td>
                            <td className="px-3 py-2.5"><span className="inline-block px-2 py-0.5 rounded-full" style={{ fontSize: 10, fontWeight: 700, background: sty.bg, color: sty.fg }}>{r.status}</span></td>
                            <td className="px-3 py-2.5 text-right text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 700 }}>{formatEuroFromCents(r.amountCents)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              {!reservationsAll.loading && sorted.length > 0 && (
                <div className="p-3 border-t border-[#F0F4FA] flex items-center justify-between">
                  <span className="text-[#A0AEC0]" style={{ fontSize: 12 }}>Toont {sorted.length} van {all.length} reserveringen</span>
                  <span className="text-[#A0AEC0]" style={{ fontSize: 12 }}>Klik op een rij voor details</span>
                </div>
              )}
            </Card>
          </>
        );
      })()}

      {/* ═══════ RESERVATION DETAIL (i-Reserve Style) ═══════ */}
      {view === 'reservation-detail' && selectedReservation && <ReservationDetailView reservation={selectedReservation} goTo={goTo} showToast={showToast} />}

      {/* ═══════ RESERVATION NEW ═══════ */}
      {view === 'reservation-new' && (() => {
        // Walter 2026-05-05: feed real data into the multi-step reservation wizard.
        // Each (parent, child) pair becomes one Customer row the wizard can pick.
        const liveChildren = allChildren.data ?? [];
        const liveCustomers = customers.data ?? [];
        const customerByParent = Object.fromEntries(liveCustomers.map(c => [c.id, c]));
        const liveCustomerRows: Customer[] = liveChildren.map(ch => {
          const p = customerByParent[ch.parentId];
          return {
            id: ch.id,
            parentId: ch.parentId,
            childFirst: ch.firstName,
            childLast: ch.lastName,
            parentName: ch.parentName,
            email: p?.email ?? '',
            mobile: p?.phone ?? '',
            city: p?.city ?? '',
            location: '',
            lessonType: '1-op-1',
            day: '',
            status: (p?.status === 'Actief' || p?.status === 'Nieuw' || p?.status === 'Inactief') ? p.status : 'Nieuw',
            lastLogin: '',
            created: '',
            progress: ch.level || 'Beginner',
          };
        });
        return <AdvancedReservationForm goTo={goTo} showToast={showToast} customers={liveCustomerRows.length ? liveCustomerRows : mockCustomers} punchCards={mockPunchCards} />;
      })()}

      {/* ═══════ CALENDAR ═══════ */}
      {view === 'calendar' && <CalendarView goTo={goTo} showToast={showToast} setSelectedReservation={setSelectedReservation} />}

      {/* ═══════ ROSTER ═══════ */}
      {view === 'roster' && <RosterView goTo={goTo} showToast={showToast} setSelectedReservation={setSelectedReservation} />}

      {/* ═══════ INVOICES ═��═════ */}
      {(view === 'invoices' || view === 'invoice-history' || view === 'open-items') && (() => {
        const all = allInvoices.data ?? [];
        const filtered = view === 'open-items'
          ? all.filter(i => i.outstandingCents > 0 && i.status !== 'Geannuleerd')
          : view === 'invoice-history'
          ? all.filter(i => i.status === 'Betaald')
          : all;
        const totalAmt = filtered.reduce((s, i) => s + i.amountCents, 0);
        const totalOpen = filtered.reduce((s, i) => s + i.outstandingCents, 0);
        const exportCSV = () => {
          const header = ['Nummer', 'Klant', 'Datum', 'Bedrag (€)', 'Openstaand (€)', 'Status', 'Omschrijving'];
          const rows = filtered.map(i => [
            i.number, i.customerName, i.date,
            (i.amountCents / 100).toFixed(2),
            (i.outstandingCents / 100).toFixed(2),
            i.status, i.description,
          ]);
          const csv = [header, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
          const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `facturen_${view}_${new Date().toISOString().slice(0, 10)}.csv`;
          a.click();
          URL.revokeObjectURL(url);
          showToast(`${filtered.length} facturen geëxporteerd`);
        };
        const title = view === 'invoice-history' ? 'Factuur historie' : view === 'open-items' ? 'Openstaande posten' : 'Facturatie';
        return (
          <>
            <PageHeader
              title={title}
              subtitle={allInvoices.loading
                ? 'Laden…'
                : `${filtered.length} ${filtered.length === 1 ? 'factuur' : 'facturen'} · ${formatEuroFromCents(totalAmt)} totaal · ${formatEuroFromCents(totalOpen)} open`}
              actions={
                <>
                  <button onClick={() => goTo('invoice-new')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 600 }}><Plus size={15} /> Nieuwe factuur</button>
                  {view !== 'invoice-history' && <button onClick={() => goTo('invoice-history')} className="px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>Historie</button>}
                  {view !== 'open-items' && <button onClick={() => goTo('open-items')} className="px-4 py-2 rounded-lg text-[#E74C3C] bg-[#FEF2F2] border border-[#FECACA]" style={{ fontSize: 13, fontWeight: 600 }}>Openstaand</button>}
                  {view !== 'invoices' && <button onClick={() => goTo('invoices')} className="px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>Alle facturen</button>}
                  <button onClick={exportCSV} disabled={!filtered.length} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4] disabled:opacity-50" style={{ fontSize: 13, fontWeight: 600 }}><Download size={15} /> Export CSV</button>
                  <button onClick={() => allInvoices.refresh()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><RefreshCw size={15} /> Vernieuwen</button>
                </>
              }
            />
            <Card>
              {allInvoices.loading ? (
                <div className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</div>
              ) : filtered.length === 0 ? (
                <div className="py-16 text-center">
                  <FileText size={36} className="mx-auto mb-3 text-[#C4CDD9]" />
                  <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>
                    {view === 'open-items' ? 'Geen openstaande posten' : view === 'invoice-history' ? 'Nog geen betaalde facturen' : 'Nog geen facturen'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#F8FAFC] border-b border-[#E5EAF2]">
                      <tr>
                        {['NUMMER', 'KLANT', 'DATUM', 'OMSCHRIJVING', 'BEDRAG', 'OPEN', 'STATUS'].map(h => (
                          <th key={h} className="text-left px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.4 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(inv => {
                        const sty = inv.status === 'Betaald' ? { bg: '#ECFDF5', fg: '#065F46' }
                          : inv.status === 'Geannuleerd' ? { bg: '#F4F7FC', fg: '#A0AEC0' }
                          : { bg: '#FEF3C7', fg: '#92400E' };
                        return (
                          <tr key={inv.id} onClick={() => { setSelectedCustomerId(inv.customerId); goTo('customer-detail'); }} className="border-b border-[#F0F4FA] hover:bg-[#F8FAFC] cursor-pointer">
                            <td className="px-3 py-2.5 text-[#0365C4]" style={{ fontSize: 12, fontWeight: 700 }}>{inv.number}</td>
                            <td className="px-3 py-2.5 text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>{inv.customerName}</td>
                            <td className="px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 12 }}>{new Date(inv.date).toLocaleDateString('nl-NL')}</td>
                            <td className="px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 12 }}>{inv.description}</td>
                            <td className="px-3 py-2.5 text-right text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 700 }}>{formatEuroFromCents(inv.amountCents)}</td>
                            <td className="px-3 py-2.5 text-right" style={{ fontSize: 12, fontWeight: 700 }}>
                              {inv.outstandingCents > 0
                                ? <span className="text-[#E74C3C]">{formatEuroFromCents(inv.outstandingCents)}</span>
                                : <span className="text-[#A0AEC0]">€0,00</span>}
                            </td>
                            <td className="px-3 py-2.5"><span className="inline-block px-2 py-0.5 rounded-full" style={{ fontSize: 10, fontWeight: 700, background: sty.bg, color: sty.fg }}>{inv.status}</span></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </>
        );
      })()}

      {/* ═══════ INVOICE NEW (creates a manual invoice line) ═══════ */}
      {view === 'invoice-new' && (
        <>
          <PageHeader title="Nieuwe factuur" subtitle="Handmatige factuur aanmaken voor een klant" actions={<button onClick={() => goTo('invoices')} className="flex items-center gap-1.5 text-[#6B7B94]" style={{ fontSize: 13 }}><ArrowLeft size={16} /> Terug</button>} />
          <Card className="p-6 max-w-[600px]">
            <div className="p-4 rounded-lg mb-5" style={{ background: '#F0F9FF', border: '1px solid #BAE6FD' }}>
              <p className="text-[#0369A1] flex items-start gap-2" style={{ fontSize: 12, lineHeight: 1.5 }}>
                <Info size={14} className="flex-shrink-0 mt-0.5" />
                <span>Reserveringen genereren automatisch een factuur-regel. Gebruik dit formulier alleen voor handmatige aanvullende facturen (bijv. extra inschrijfgeld of correcties). Voor reservering-facturen, ga naar de overzichtspagina.</span>
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Klant</label>
                <select className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4]" style={{ fontSize: 14 }}>
                  <option>Kies een klant…</option>
                  {(customers.data ?? []).map(c => <option key={c.id} value={c.id}>{c.parentName} — {c.email}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Factuurdatum</label>
                  <input type="date" defaultValue={new Date().toISOString().slice(0, 10)} className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4]" style={{ fontSize: 14 }} />
                </div>
                <div>
                  <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Bedrag (€)</label>
                  <input type="number" step="0.01" placeholder="0,00" className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4]" style={{ fontSize: 14 }} />
                </div>
              </div>
              <div>
                <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Omschrijving</label>
                <input placeholder="bijv. Extra inschrijfgeld 2026" className="w-full px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4]" style={{ fontSize: 14 }} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { goTo('invoices'); showToast('✓ Factuur aangemaakt — handmatige facturen worden in de volgende sprint gepersisteerd'); }} className="px-6 py-2.5 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 14, fontWeight: 700 }}>Opslaan</button>
              <button onClick={() => goTo('invoices')} className="px-6 py-2.5 rounded-lg text-[#6B7B94] border border-[#E8ECF4]" style={{ fontSize: 14, fontWeight: 600 }}>Annuleren</button>
            </div>
          </Card>
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

      {/* ═══════ PAYMENTS — live ═══════ */}
      {view === 'payments' && (() => {
        const all = allPayments.data ?? [];
        const filtered = all.filter(p => {
          if (paymentStatusFilter && p.status !== paymentStatusFilter) return false;
          if (paymentMethodFilter && p.method !== paymentMethodFilter) return false;
          if (paymentSearch) {
            const q = paymentSearch.toLowerCase();
            if (!p.customerName.toLowerCase().includes(q) && !p.reference.toLowerCase().includes(q)) return false;
          }
          return true;
        });
        const stats = {
          total: filtered.length,
          completed: filtered.filter(p => p.status === 'Voltooid').reduce((s, p) => s + p.amountCents, 0),
          refunded: filtered.filter(p => p.status === 'Terugbetaald').reduce((s, p) => s + p.amountCents, 0),
          pending: filtered.filter(p => p.status === 'In behandeling').length,
        };
        const exportCSV = () => {
          const header = ['Datum', 'Klant', 'Methode', 'Status', 'Bedrag (€)', 'Referentie', 'Omschrijving'];
          const rows = filtered.map(p => [
            p.date, p.customerName, p.method, p.status,
            (p.amountCents / 100).toFixed(2), p.reference, p.description,
          ]);
          const csv = [header, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
          const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `betalingen_${new Date().toISOString().slice(0, 10)}.csv`;
          a.click();
          URL.revokeObjectURL(url);
          showToast(`${filtered.length} betalingen geëxporteerd`);
        };
        return (
          <>
            <PageHeader
              title="Betalingen"
              subtitle={allPayments.loading
                ? 'Laden…'
                : `${stats.total} ${stats.total === 1 ? 'betaling' : 'betalingen'} · ${formatEuroFromCents(stats.completed)} ontvangen · ${stats.pending} in behandeling`}
              actions={
                <>
                  <button onClick={exportCSV} disabled={!filtered.length} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4] disabled:opacity-50" style={{ fontSize: 13, fontWeight: 600 }}><Download size={15} /> Export CSV</button>
                  <button onClick={() => allPayments.refresh()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><RefreshCw size={15} /> Vernieuwen</button>
                </>
              }
            />
            <Card>
              <div className="p-4 border-b border-[#F0F4FA] flex items-center gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]" />
                  <input placeholder="Zoek op klant of referentie…" value={paymentSearch} onChange={e => setPaymentSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#F4F7FC] border border-transparent focus:border-[#0365C4] outline-none" style={{ fontSize: 13 }} />
                </div>
                <select value={paymentStatusFilter} onChange={e => setPaymentStatusFilter(e.target.value as typeof paymentStatusFilter)} className="px-3 py-2 rounded-lg bg-[#F4F7FC] border border-transparent focus:border-[#0365C4] outline-none" style={{ fontSize: 13 }}>
                  <option value="">Alle statussen</option>
                  <option value="Voltooid">Voltooid</option>
                  <option value="In behandeling">In behandeling</option>
                  <option value="Mislukt">Mislukt</option>
                  <option value="Terugbetaald">Terugbetaald</option>
                </select>
                <select value={paymentMethodFilter} onChange={e => setPaymentMethodFilter(e.target.value as typeof paymentMethodFilter)} className="px-3 py-2 rounded-lg bg-[#F4F7FC] border border-transparent focus:border-[#0365C4] outline-none" style={{ fontSize: 13 }}>
                  <option value="">Alle methodes</option>
                  <option value="iDEAL">iDEAL</option>
                  <option value="Tegoed">Tegoed</option>
                  <option value="Stripe">Stripe</option>
                  <option value="Handmatig">Handmatig</option>
                </select>
                {(paymentSearch || paymentStatusFilter || paymentMethodFilter) && (
                  <button onClick={() => { setPaymentSearch(''); setPaymentStatusFilter(''); setPaymentMethodFilter(''); }} className="text-[#FF5C00] hover:underline" style={{ fontSize: 12, fontWeight: 600 }}>
                    Filters wissen
                  </button>
                )}
              </div>
              {allPayments.loading ? (
                <div className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</div>
              ) : filtered.length === 0 ? (
                <div className="py-16 text-center">
                  <DollarSign size={36} className="mx-auto mb-3 text-[#C4CDD9]" />
                  <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Nog geen betalingen</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#F8FAFC] border-b border-[#E5EAF2]">
                      <tr>
                        {['DATUM', 'KLANT', 'METHODE', 'STATUS', 'BEDRAG', 'REFERENTIE', 'OMSCHRIJVING'].map(h => (
                          <th key={h} className="text-left px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.4 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(p => {
                        const sty = p.status === 'Voltooid' ? { bg: '#ECFDF5', fg: '#065F46' }
                          : p.status === 'Mislukt' ? { bg: '#FEE2E2', fg: '#991B1B' }
                          : p.status === 'Terugbetaald' ? { bg: '#EDE9FE', fg: '#5B21B6' }
                          : { bg: '#FEF3C7', fg: '#92400E' };
                        return (
                          <tr key={p.id} onClick={() => { setSelectedCustomerId(p.customerId); goTo('customer-detail'); }} className="border-b border-[#F0F4FA] hover:bg-[#F8FAFC] cursor-pointer">
                            <td className="px-3 py-2.5 text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>{new Date(p.date).toLocaleDateString('nl-NL')}</td>
                            <td className="px-3 py-2.5 text-[#1A1A2E]" style={{ fontSize: 12 }}>{p.customerName}</td>
                            <td className="px-3 py-2.5 text-[#0365C4]" style={{ fontSize: 12, fontWeight: 600 }}>{p.method}</td>
                            <td className="px-3 py-2.5"><span className="inline-block px-2 py-0.5 rounded-full" style={{ fontSize: 10, fontWeight: 700, background: sty.bg, color: sty.fg }}>{p.status}</span></td>
                            <td className="px-3 py-2.5 text-right text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 700 }}>{formatEuroFromCents(p.amountCents)}</td>
                            <td className="px-3 py-2.5 text-[#A0AEC0]" style={{ fontSize: 11, fontFamily: 'monospace' }}>{p.reference}</td>
                            <td className="px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 12 }}>{p.description}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </>
        );
      })()}

      {/* ═══════ TASKS ═══════ */}
      {view === 'tasks' && (() => {
        const live = adminTasks.data ?? [];
        const completedTasks = tasks.filter(t => t.status === 'Voltooid');
        const liveCount = live.length;
        const handledCount = completedTasks.length;
        return (
          <>
            <PageHeader
              title="Taken"
              subtitle={adminTasks.loading
                ? 'Laden…'
                : `${liveCount} ${liveCount === 1 ? 'open actie' : 'open acties'} · ${handledCount} afgehandeld vandaag`}
              actions={
                <button onClick={() => adminTasks.refresh()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>
                  <RefreshCw size={15} /> Vernieuwen
                </button>
              }
            />
            <div className="mb-4 p-4 rounded-lg" style={{ background: '#F0F9FF', border: '1px solid #BAE6FD' }}>
              <p className="text-[#0369A1] flex items-start gap-2" style={{ fontSize: 12, lineHeight: 1.5 }}>
                <Info size={14} className="flex-shrink-0 mt-0.5" />
                <span>Taken worden automatisch gegenereerd uit live data: openstaande vakantieaanvragen, registratie-verzoeken, niet-betaalde reserveringen, en lage reviews die nog moeten worden beantwoord.</span>
              </p>
            </div>
            {adminTasks.loading ? (
              <Card className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</Card>
            ) : live.length === 0 ? (
              <Card className="py-16 text-center">
                <CheckCircle2 size={36} className="mx-auto mb-3 text-[#27AE60]" />
                <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Geen openstaande taken</p>
                <p className="text-[#A0AEC0] mt-1" style={{ fontSize: 12 }}>Alles is afgehandeld 🎉</p>
              </Card>
            ) : (
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#F8FAFC] border-b border-[#E5EAF2]">
                      <tr>
                        {['PRIORITEIT', 'BESCHRIJVING', 'DEADLINE'].map(h => (
                          <th key={h} className="text-left px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.4 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {live.map(t => {
                        const sty = t.priority === 'Hoog' ? { bg: '#FEE2E2', fg: '#991B1B' }
                          : t.priority === 'Normaal' ? { bg: '#FEF3C7', fg: '#92400E' }
                          : { bg: '#F4F7FC', fg: '#6B7B94' };
                        const isVacation = t.id.startsWith('vac-');
                        const isRegistration = t.id.startsWith('reg-');
                        const isReview = t.id.startsWith('rev-');
                        const isPayment = t.id.startsWith('pay-');
                        const goToTask = () => {
                          if (isVacation) goTo('vacation-requests');
                          else if (isRegistration) goTo('registrations');
                          else if (isReview) goTo('review-approval');
                          else if (isPayment) goTo('open-items');
                        };
                        return (
                          <tr key={t.id} onClick={goToTask} className="border-b border-[#F0F4FA] hover:bg-[#F8FAFC] cursor-pointer">
                            <td className="px-3 py-2.5"><span className="inline-block px-2.5 py-0.5 rounded-full" style={{ fontSize: 11, fontWeight: 700, background: sty.bg, color: sty.fg }}>{t.priority}</span></td>
                            <td className="px-3 py-2.5 text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 500 }}>{t.description}</td>
                            <td className="px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 12 }}>
                              {t.deadline
                                ? new Date(t.deadline).toLocaleDateString('nl-NL', { day: '2-digit', month: 'short' })
                                : '—'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="p-3 border-t border-[#F0F4FA] text-center text-[#A0AEC0]" style={{ fontSize: 12 }}>
                  Klik op een taak om naar de relevante pagina te gaan
                </div>
              </Card>
            )}
          </>
        );
      })()}

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

      {/* ═══════ INSTRUCTORS — live ═══════ */}
      {view === 'instructors' && (
        <>
          <PageHeader title="Instructeurs" subtitle={instructorsList.loading ? 'Laden…' : `${instructorsList.data?.length ?? 0} instructeurs`} actions={
            <>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 600 }}><Plus size={15} /> Instructeur toevoegen</button>
              <button onClick={() => instructorsList.refresh()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><RefreshCw size={15} /> Vernieuwen</button>
            </>
          } />
          {instructorsList.loading ? (
            <Card className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</Card>
          ) : (instructorsList.data?.length ?? 0) === 0 ? (
            <Card className="py-16 text-center">
              <UserCog size={36} className="mx-auto mb-3 text-[#C4CDD9]" />
              <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Nog geen instructeurs</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {instructorsList.data!.map(ins => (
                <Card key={ins.id} className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0365C4] to-[#00C1FF] flex items-center justify-center text-white flex-shrink-0" style={{ fontSize: 16, fontWeight: 700 }}>
                      {ins.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[#1A1A2E] truncate" style={{ fontSize: 15, fontWeight: 700 }}>{ins.name}</h3>
                      <StatusBadge status="Actief" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-4" style={{ fontSize: 12, color: '#6B7B94' }}>
                    {ins.email && <p className="flex items-center gap-1.5 truncate"><Mail size={12} /> {ins.email}</p>}
                    {ins.phone && <p className="flex items-center gap-1.5"><Phone size={12} /> {ins.phone}</p>}
                    {ins.city && <p className="flex items-center gap-1.5"><MapPin size={12} /> {ins.city}</p>}
                  </div>
                  <div className="flex gap-4 pt-3 border-t border-[#F0F4FA]">
                    <div><p className="text-[#0365C4]" style={{ fontSize: 18, fontWeight: 700 }}>{ins.studentCount}</p><p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Studenten</p></div>
                    <div><p className="text-[#27AE60]" style={{ fontSize: 18, fontWeight: 700 }}>{ins.upcomingLessons}</p><p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Komende lessen</p></div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {/* ═══════ LOCATIONS — live ═══════ */}
      {view === 'locations' && (
        <>
          <PageHeader title="Locaties" subtitle={locationsList.loading ? 'Laden…' : `${locationsList.data?.length ?? 0} zwembadlocaties`} actions={
            <button onClick={() => locationsList.refresh()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><RefreshCw size={15} /> Vernieuwen</button>
          } />
          {locationsList.loading ? (
            <Card className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</Card>
          ) : (locationsList.data?.length ?? 0) === 0 ? (
            <Card className="py-16 text-center">
              <MapPin size={36} className="mx-auto mb-3 text-[#C4CDD9]" />
              <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Nog geen locaties</p>
            </Card>
          ) : (() => {
            const palette = ['#0365C4', '#00C1FF', '#27AE60', '#FF5C00', '#8E44AD', '#E67E22', '#1ABC9C', '#2C3E50'];
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {locationsList.data!.map((loc, i) => {
                  const color = palette[i % palette.length];
                  return (
                    <Card key={loc.id} className="p-5 hover:translate-y-[-2px] transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}><MapPin size={20} color={color} /></div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-[#1A1A2E] truncate" style={{ fontSize: 16, fontWeight: 700 }}>{loc.name}</h3>
                          {loc.city && <p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>{loc.city}</p>}
                        </div>
                        {!loc.active && <span className="px-2 py-0.5 rounded-full bg-[#F4F7FC] text-[#A0AEC0]" style={{ fontSize: 10, fontWeight: 700 }}>Inactief</span>}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#F8FAFC] rounded-lg p-3 text-center"><p style={{ fontSize: 20, fontWeight: 700, color }}>{loc.totalStudents}</p><p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Studenten</p></div>
                        <div className="bg-[#F8FAFC] rounded-lg p-3 text-center"><p style={{ fontSize: 20, fontWeight: 700, color: '#27AE60' }}>{loc.upcomingLessons}</p><p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Komende lessen</p></div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            );
          })()}
        </>
      )}

      {/* ═══════ WALLETS / TEGOED — live ═══════ */}
      {view === 'wallets' && (
        <>
          <PageHeader title="Tegoed / Wallets" subtitle={wallets.loading ? 'Laden…' : `${wallets.data?.length ?? 0} actieve wallets`} actions={
            <button onClick={() => wallets.refresh()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><RefreshCw size={15} /> Vernieuwen</button>
          } />
          <Card>
            {wallets.loading ? (
              <div className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</div>
            ) : (wallets.data?.length ?? 0) === 0 ? (
              <div className="py-16 text-center">
                <Wallet size={36} className="mx-auto mb-3 text-[#C4CDD9]" />
                <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Nog geen wallets</p>
              </div>
            ) : (
              <DataTable
                columns={[
                  { key: 'parentName', label: 'Klant', width: '180px' },
                  { key: 'parentEmail', label: 'E-mail', width: '200px' },
                  { key: 'initial', label: 'Aanschaf', width: '110px' },
                  { key: 'bonus', label: 'Bonus', width: '90px' },
                  { key: 'balance', label: 'Saldo', width: '110px' },
                  { key: 'createdAt', label: 'Aangemaakt', width: '130px' },
                ]}
                data={wallets.data!.map(w => ({
                  ...w,
                  initial: formatEuroFromCents(w.initialAmountCents),
                  bonus: <span className="text-[#27AE60]" style={{ fontWeight: 600 }}>+{formatEuroFromCents(w.bonusCents)}</span>,
                  balance: <span className={w.balanceCents > 0 ? 'text-[#0365C4]' : 'text-[#A0AEC0]'} style={{ fontWeight: 700 }}>{formatEuroFromCents(w.balanceCents)}</span>,
                  createdAt: new Date(w.createdAt).toLocaleDateString('nl-NL'),
                }))}
                onRowClick={() => {}}
              />
            )}
          </Card>
        </>
      )}

      {/* ═══════ WAITLIST — live ═══════ */}
      {view === 'waitlist' && (
        <>
          <PageHeader title="Wachtlijst" subtitle={waitlist.loading ? 'Laden…' : `${waitlist.data?.length ?? 0} kinderen op wachtlijst`} actions={
            <button onClick={() => waitlist.refresh()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><RefreshCw size={15} /> Vernieuwen</button>
          } />
          <Card>
            {waitlist.loading ? (
              <div className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</div>
            ) : (waitlist.data?.length ?? 0) === 0 ? (
              <div className="py-16 text-center">
                <ListChecks size={36} className="mx-auto mb-3 text-[#C4CDD9]" />
                <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Wachtlijst is leeg</p>
              </div>
            ) : (
              <DataTable
                columns={[
                  { key: 'pos', label: 'Positie', width: '80px' },
                  { key: 'childName', label: 'Kind', width: '180px' },
                  { key: 'parentName', label: 'Ouder', width: '180px' },
                  { key: 'days', label: 'Voorkeursdagen', width: '180px' },
                  { key: 'feePaid', label: 'Inschrijfgeld', width: '120px' },
                  { key: 'joined', label: 'Sinds', width: '120px' },
                ]}
                data={waitlist.data!.map(w => ({
                  ...w,
                  pos: <span className="text-[#FF5C00]" style={{ fontWeight: 700 }}>#{w.position}</span>,
                  days: w.preferredDays.join(', ') || '—',
                  feePaid: w.registrationFeePaid ? <span className="text-[#27AE60]">✓ Betaald</span> : <span className="text-[#E74C3C]">✗ Open</span>,
                  joined: new Date(w.joinedAt).toLocaleDateString('nl-NL'),
                }))}
              />
            )}
          </Card>
        </>
      )}

      {/* ═══════ REVIEWS — live ═══════ */}
      {(view === 'reviews' || view === 'review-approval') && (() => {
        const all = reviewsList.data ?? [];
        const filtered = view === 'review-approval' ? all.filter(r => r.rating < 6 && !r.ownerResponse) : all;
        return (
        <>
          <PageHeader
            title={view === 'review-approval' ? 'Reviews te modereren (<6 zonder reactie)' : 'Alle beoordelingen'}
            subtitle={reviewsList.loading ? 'Laden…' : `${filtered.length} reviews`}
            actions={
              <button onClick={() => reviewsList.refresh()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><RefreshCw size={15} /> Vernieuwen</button>
            } />
          {reviewsList.loading ? (
            <Card className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</Card>
          ) : filtered.length === 0 ? (
            <Card className="py-16 text-center">
              <Star size={36} className="mx-auto mb-3 text-[#C4CDD9]" />
              <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>
                {view === 'review-approval' ? 'Geen reviews te modereren' : 'Nog geen reviews'}
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {filtered.map(r => (
                <Card key={r.id} className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF5C00] to-[#F5A623] flex items-center justify-center text-white" style={{ fontSize: 14, fontWeight: 700 }}>
                        {r.parentName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{r.parentName}</p>
                        <p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>
                          {r.location || '—'} · {new Date(r.createdAt).toLocaleDateString('nl-NL')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-[#F5A623]" fill="#F5A623" />
                      <span className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{r.rating}/10</span>
                      {r.rating < 6 && !r.ownerResponse && (
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-[#FEF2F2] text-[#E74C3C]" style={{ fontSize: 10, fontWeight: 700 }}>Reactie nodig</span>
                      )}
                    </div>
                  </div>
                  <p className="text-[#4A5568] mb-3" style={{ fontSize: 13, lineHeight: 1.5 }}>{r.text}</p>
                  {r.ownerResponse && (
                    <div className="ml-12 p-3 rounded-lg bg-[#EEF7FF] border-l-4 border-[#0365C4]">
                      <p className="text-[#0365C4]" style={{ fontSize: 11, fontWeight: 700 }}>Reactie van Snorkeltje</p>
                      <p className="text-[#1A1A2E] mt-1" style={{ fontSize: 13, lineHeight: 1.5 }}>{r.ownerResponse}</p>
                    </div>
                  )}
                  {r.rating < 6 && !r.ownerResponse && (
                    <div className="mt-3 ml-12 flex flex-col gap-2">
                      <textarea
                        id={`response-${r.id}`}
                        placeholder="Schrijf een reactie zodat de review gepubliceerd kan worden…"
                        className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] focus:border-[#0365C4] outline-none resize-none"
                        rows={3}
                        style={{ fontSize: 13 }}
                      />
                      <button
                        onClick={async () => {
                          const t = (document.getElementById(`response-${r.id}`) as HTMLTextAreaElement).value.trim();
                          if (!t) { showToast('Vul een reactie in'); return; }
                          await respondToReview(r.id, t);
                          showToast('Reactie gepubliceerd');
                          reviewsList.refresh();
                        }}
                        className="self-start px-4 py-2 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 12, fontWeight: 600 }}>
                        Reactie publiceren
                      </button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </>
        );
      })()}

      {/* ═══════ VACATION REQUESTS — live ═══════ */}
      {view === 'vacation-requests' && (
        <>
          <PageHeader title="Vakantieaanvragen" subtitle={vacations.loading ? 'Laden…' : `${vacations.data?.length ?? 0} aanvragen`} actions={
            <button onClick={() => vacations.refresh()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><RefreshCw size={15} /> Vernieuwen</button>
          } />
          {vacations.loading ? (
            <Card className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</Card>
          ) : (vacations.data?.length ?? 0) === 0 ? (
            <Card className="py-16 text-center">
              <Plane size={36} className="mx-auto mb-3 text-[#C4CDD9]" />
              <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Geen vakantieaanvragen</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {vacations.data!.map(v => (
                <Card key={v.id} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{v.instructorName}</h3>
                        <StatusBadge status={v.status === 'pending' ? 'In behandeling' : v.status === 'approved' ? 'Goedgekeurd' : 'Afgewezen'} />
                      </div>
                      <p className="text-[#1A1A2E]" style={{ fontSize: 13 }}>
                        {new Date(v.startDate).toLocaleDateString('nl-NL')} – {new Date(v.endDate).toLocaleDateString('nl-NL')}
                      </p>
                      {v.reason && <p className="text-[#6B7B94] mt-1" style={{ fontSize: 12 }}>Reden: {v.reason}</p>}
                      {v.notes && <p className="text-[#A0AEC0] mt-1" style={{ fontSize: 12 }}>Notitie: {v.notes}</p>}
                    </div>
                    {v.status === 'pending' && (
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={async () => { await decideVacationRequest(v.id, true); showToast('Vakantie goedgekeurd'); vacations.refresh(); }}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white" style={{ background: '#27AE60', fontSize: 12, fontWeight: 600 }}><Check size={14} /> Goedkeuren</button>
                        <button onClick={async () => { await decideVacationRequest(v.id, false); showToast('Vakantie afgewezen'); vacations.refresh(); }}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#E74C3C]" style={{ background: '#FEF2F2', fontSize: 12, fontWeight: 600, border: '1px solid #FECACA' }}><X size={14} /> Afwijzen</button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {/* ═══════ ANNOUNCEMENTS (admin send notifications) ═══════ */}
      {view === 'announcements' && (() => {
        const audienceState = (window as any).__announceState ?? { audience: 'parent', title: '', body: '' };
        return (
          <>
            <PageHeader title="Notificatie versturen" subtitle="Stuur een aankondiging naar ouders, instructeurs of beide groepen" />
            <Card className="p-6 max-w-2xl">
              <form onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const audience = (form.elements.namedItem('audience') as HTMLSelectElement).value as 'parent' | 'instructor' | 'all';
                const title = (form.elements.namedItem('title') as HTMLInputElement).value.trim();
                const body = (form.elements.namedItem('body') as HTMLTextAreaElement).value.trim();
                if (!title || !body) { showToast('Vul titel en bericht in'); return; }
                const sent = await broadcastNotification({ audience, title, body });
                showToast(`Notificatie verstuurd naar ${sent} gebruiker${sent === 1 ? '' : 's'}`);
                form.reset();
              }} className="space-y-4">
                <div>
                  <label className="block text-[#1A1A2E] mb-2" style={{ fontSize: 13, fontWeight: 600 }}>Doelgroep</label>
                  <select name="audience" defaultValue={audienceState.audience} className="w-full px-3 py-2.5 rounded-lg bg-[#F4F7FC] border border-[#E8ECF4] outline-none focus:border-[#0365C4]" style={{ fontSize: 13 }}>
                    <option value="parent">Alle ouders</option>
                    <option value="instructor">Alle instructeurs</option>
                    <option value="all">Iedereen (ouders + instructeurs)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#1A1A2E] mb-2" style={{ fontSize: 13, fontWeight: 600 }}>Titel</label>
                  <input name="title" placeholder="Bijv. Onderhoud zwembad De Bilt" className="w-full px-3 py-2.5 rounded-lg bg-[#F4F7FC] border border-[#E8ECF4] outline-none focus:border-[#0365C4]" style={{ fontSize: 13 }} maxLength={100} />
                </div>
                <div>
                  <label className="block text-[#1A1A2E] mb-2" style={{ fontSize: 13, fontWeight: 600 }}>Bericht</label>
                  <textarea name="body" rows={4} placeholder="Bijv. Op woensdag 1 mei is het zwembad gesloten i.v.m. onderhoud…" className="w-full px-3 py-2.5 rounded-lg bg-[#F4F7FC] border border-[#E8ECF4] outline-none focus:border-[#0365C4] resize-none" style={{ fontSize: 13 }} maxLength={500} />
                </div>
                <button type="submit" className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 700 }}>
                  <Send size={14} /> Verzenden
                </button>
              </form>
            </Card>
          </>
        );
      })()}

      {/* ═══════ CURRICULUM / LESPLAN — live (Walter's full step plan) ═══════ */}
      {view === 'curriculum' && (
        <>
          <PageHeader
            title="Lesplan / Stappenplan"
            subtitle={curriculum.loading
              ? 'Laden…'
              : `${(curriculum.data ?? []).filter(s => !s.level.startsWith('Diploma ')).length} stappen + ${(curriculum.data ?? []).filter(s => s.level.startsWith('Diploma ')).length} diploma\'s — Watervrijheid tot Diploma C`}
            actions={
              <button onClick={() => curriculum.refresh()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}><RefreshCw size={15} /> Vernieuwen</button>
            }
          />

          {/* Pedagogical intro card */}
          <Card className="p-5 mb-5" style={{ background: 'linear-gradient(135deg, #EEF7FF 0%, #FFF5EB 100%)', border: '1px solid #B6D8F2' }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                   style={{ background: 'linear-gradient(135deg, #0365C4 0%, #00C1FF 100%)' }}>
                <BookOpen size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 800 }}>Stappenplan Snorkeltje</h3>
                <p className="text-[#1A1A2E] mt-1" style={{ fontSize: 13, lineHeight: 1.6 }}>
                  Vertrouwen opbouwen door <strong>vooruitgang, niet door druk</strong>. Elke stap heeft eigen doelen,
                  oefeningen en een checklist. Klik op de <strong>(i)-icoon</strong> bij een stap voor de volledige uitleg
                  (definitie, waarom deze stap, en hoe je weet dat een kind klaar is voor de volgende stap).
                </p>
                <p className="text-[#6B7B94] mt-2" style={{ fontSize: 12 }}>
                  Voortgang wordt per item bijgehouden in <strong>4 fases</strong> (cirkels):
                  Nog niet geoefend → Wordt geoefend → Bijna onder de knie → Goed beheerst.
                </p>
              </div>
            </div>
          </Card>

          {curriculum.loading ? (
            <Card className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</Card>
          ) : (curriculum.data?.length ?? 0) === 0 ? (
            <Card className="py-16 text-center">
              <BookOpen size={36} className="mx-auto mb-3 text-[#C4CDD9]" />
              <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Nog geen lesplan</p>
            </Card>
          ) : (() => {
            const all = curriculum.data!;
            const stepsOnly = all.filter(s => !s.level.startsWith('Diploma '));
            const diplomasOnly = all.filter(s => s.level.startsWith('Diploma '));
            return (
              <div className="space-y-4">
                {stepsOnly.length > 0 && (
                  <SectionHeader icon="steps" label="Stappenplan" subtitle="7 stappen — basis voor het A-diploma" />
                )}
                {stepsOnly.map((step) => (
                  <CurriculumStepCard
                    key={step.id}
                    step={step}
                    stepNumber={all.indexOf(step) + 1}
                    // Admin overview — read-only template (per-child editing happens on
                    // the per-student progress page, not on the curriculum master view).
                    readOnly={true}
                    locked={false}
                  />
                ))}
                {diplomasOnly.length > 0 && (
                  <SectionHeader icon="diploma" label="Diploma's" subtitle="Examen-checklists A · B · C" />
                )}
                {diplomasOnly.map((step) => (
                  <CurriculumStepCard
                    key={step.id}
                    step={step}
                    stepNumber={all.indexOf(step) + 1}
                    readOnly={true}
                    locked={false}
                  />
                ))}
              </div>
            );
          })()}
        </>
      )}

      {/* ═══════ CHILD PROGRESS — per-child phase tracking ═══════ */}
      {view === 'child-progress' && (() => {
        const children = allChildren.data ?? [];
        const selected = children.find(c => c.id === selectedChildId) ?? null;
        const phases = childPhases.data ?? {};
        const steps = curriculum.data ?? [];

        // Compute completion per step (count items at phase 4) for prerequisite chain.
        const completionByStep: Record<string, { done: number; total: number; complete: boolean }> = {};
        for (const s of steps) {
          let done = 0, total = 0;
          for (const g of s.groups) for (const it of g.items) {
            total++;
            if ((phases[it.id] ?? 1) >= 4) done++;
          }
          completionByStep[s.id] = { done, total, complete: total > 0 && done === total };
        }

        const q = childSearch.trim().toLowerCase();
        const filteredChildren = q
          ? children.filter(c =>
              `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
              c.level?.toLowerCase().includes(q))
          : children;

        const PHASE_LABELS = ['Nog niet geoefend', 'Wordt geoefend', 'Bijna onder de knie', 'Goed beheerst'];

        const exportProgressCSV = () => {
          if (!selected) return;
          const header = ['Stap/Diploma', 'Categorie', 'Onderdeel', 'Fase nummer', 'Fase label'];
          const rows: (string | number)[][] = [];
          for (const s of steps) {
            for (const g of s.groups) {
              for (const it of g.items) {
                const phase = phases[it.id] ?? 1;
                rows.push([
                  s.name, g.label, it.description, phase, PHASE_LABELS[phase - 1] ?? '—',
                ]);
              }
            }
          }
          const csv = [header, ...rows]
            .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
            .join('\n');
          const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `voortgang_${selected.firstName}_${selected.lastName}_${new Date().toISOString().slice(0, 10)}.csv`;
          a.click();
          URL.revokeObjectURL(url);
          showToast(`✓ Voortgang van ${selected.firstName} geëxporteerd`);
        };

        const openParentProfile = () => {
          if (!selected?.parentId) return;
          setSelectedCustomerId(selected.parentId);
          goTo('customer-detail');
        };

        return (
          <>
            <PageHeader
              title="Voortgang per kind"
              subtitle={selected ? `${selected.firstName} ${selected.lastName} · ${selected.age} jaar · ${selected.level}` : `${children.length} ${children.length === 1 ? 'kind' : 'kinderen'} · selecteer er één`}
              actions={
                <>
                  {selected && (
                    <>
                      <button onClick={openParentProfile} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4] hover:border-[#0365C4] hover:text-[#0365C4]" style={{ fontSize: 13, fontWeight: 600 }}>
                        <Users size={15} /> Ouder-profiel
                      </button>
                      <button onClick={exportProgressCSV} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>
                        <Download size={15} /> Export voortgang
                      </button>
                      <button onClick={() => { childPhases.refresh(); }} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>
                        <RefreshCw size={15} /> Vernieuwen
                      </button>
                    </>
                  )}
                </>
              }
            />

            {/* Child picker */}
            <Card className="p-5 mb-5">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <label className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 700 }}>
                  Kies een kind om de voortgang te bekijken en bij te werken
                </label>
                {children.length > 5 && (
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]" />
                    <input
                      placeholder="Zoek kind…"
                      value={childSearch}
                      onChange={e => setChildSearch(e.target.value)}
                      className="pl-9 pr-3 py-1.5 rounded-lg bg-[#F4F7FC] border border-transparent focus:border-[#0365C4] outline-none text-[#1A1A2E]"
                      style={{ fontSize: 13, width: 200 }}
                    />
                  </div>
                )}
              </div>
              {allChildren.loading ? (
                <p className="text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</p>
              ) : children.length === 0 ? (
                <p className="text-[#A0AEC0]" style={{ fontSize: 13 }}>Nog geen kinderen geregistreerd.</p>
              ) : filteredChildren.length === 0 ? (
                <p className="text-[#A0AEC0]" style={{ fontSize: 13 }}>Geen kinderen passen bij "{childSearch}"</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                  {filteredChildren.map(c => {
                    const isSel = c.id === selectedChildId;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedChildId(c.id)}
                        className="flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                        style={{
                          background: isSel ? 'linear-gradient(135deg, #0365C4 0%, #00C1FF 100%)' : '#F8FAFC',
                          color: isSel ? '#FFFFFF' : '#1A1A2E',
                          boxShadow: isSel ? '0 6px 16px -6px rgba(3,101,196,0.35)' : 'none',
                        }}
                      >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                             style={{ background: isSel ? 'rgba(255,255,255,0.2)' : 'linear-gradient(135deg, #0365C4 0%, #00C1FF 100%)',
                                      color: '#FFFFFF', fontSize: 14, fontWeight: 700 }}>
                          {c.firstName[0]?.toUpperCase() ?? '?'}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate" style={{ fontSize: 13, fontWeight: 700 }}>{c.firstName} {c.lastName}</p>
                          <p className="truncate" style={{ fontSize: 11, opacity: isSel ? 0.85 : 0.6 }}>{c.age} jr · {c.level}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </Card>

            {!selected ? (
              <Card className="py-16 text-center">
                <Users size={36} className="mx-auto mb-3 text-[#C4CDD9]" />
                <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>
                  Kies hierboven een kind om te beginnen
                </p>
              </Card>
            ) : (curriculum.loading || childPhases.loading) ? (
              <Card className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</Card>
            ) : (
              <>
                {/* Overall progress summary */}
                {(() => {
                  const totalDone = Object.values(completionByStep).reduce((s, x) => s + x.done, 0);
                  const totalAll = Object.values(completionByStep).reduce((s, x) => s + x.total, 0);
                  const pct = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;
                  return (
                    <Card className="p-5 mb-5">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 800 }}>
                          Totale voortgang van {selected.firstName}
                        </h3>
                        <span className="px-3 py-1 rounded-full" style={{ background: '#0365C4', color: 'white', fontSize: 13, fontWeight: 700 }}>
                          {pct}%
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-[#F0F4FA] overflow-hidden mb-3">
                        <div className="h-full rounded-full transition-all"
                             style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #0365C4 0%, #00C1FF 60%, #27AE60 100%)' }} />
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {steps.map((s, i) => {
                          const c = completionByStep[s.id];
                          const isStepDone = c?.complete ?? false;
                          const isStepStarted = (c?.done ?? 0) > 0;
                          const isDiploma = s.level.startsWith('Diploma ');
                          const label = isDiploma ? s.level : `Stap ${i + 1}`;
                          return (
                            <div key={s.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                                 style={{ background: isStepDone ? '#ECFDF5' : isStepStarted ? '#FFF7E6' : (isDiploma ? '#FFF7EE' : '#F4F7FC'),
                                          color:      isStepDone ? '#065F46' : isStepStarted ? '#92400E' : (isDiploma ? '#FF7A00' : '#A0AEC0') }}>
                              <span style={{ fontSize: 11, fontWeight: 700 }}>{label}</span>
                              <span style={{ fontSize: 11 }}>{c?.done ?? 0}/{c?.total ?? 0}</span>
                            </div>
                          );
                        })}
                      </div>
                    </Card>
                  );
                })()}

                {/* Walter 2026-05-03 — split into Stappenplan + Diploma's. */}
                {/* Each item is HIDDEN (not locked) when its prerequisite is incomplete. */}
                {(() => {
                  const visible = steps.filter(s => {
                    const prereqId = s.prerequisiteSkillId;
                    return !prereqId || (completionByStep[prereqId]?.complete ?? false);
                  });
                  const visibleSteps = visible.filter(s => !s.level.startsWith('Diploma '));
                  const visibleDiplomas = visible.filter(s => s.level.startsWith('Diploma '));
                  const hiddenCount = steps.length - visible.length;

                  const renderCard = (step: typeof steps[0]) => (
                    <CurriculumStepCard
                      key={step.id}
                      step={step}
                      stepNumber={steps.indexOf(step) + 1}
                      phases={phases}
                      readOnly={false}
                      onPhaseChange={async (stepItemId, newPhase) => {
                        await upsertChildPhase({ childId: selected.id, stepItemId, phase: newPhase });
                        await childPhases.refresh();
                        showToast(`Fase ${newPhase} opgeslagen`);
                      }}
                    />
                  );

                  return (
                    <div className="space-y-4">
                      {visibleSteps.length > 0 && (
                        <SectionHeader
                          icon="steps"
                          label="Stappenplan"
                          subtitle="7 stappen — basis voor het A-diploma"
                        />
                      )}
                      {visibleSteps.map(renderCard)}
                      {visibleDiplomas.length > 0 && (
                        <SectionHeader
                          icon="diploma"
                          label="Diploma's"
                          subtitle="Examen-checklists A · B · C"
                        />
                      )}
                      {visibleDiplomas.map(renderCard)}
                      {hiddenCount > 0 && (
                        <div className="flex items-start gap-3 p-4 rounded-xl border" style={{ background: '#F8FAFC', borderColor: '#E5EAF2' }}>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#FFF1E6' }}>
                            <Lock size={14} className="text-[#FF5C00]" />
                          </div>
                          <p className="text-[#6B7B94] flex-1" style={{ fontSize: 12, lineHeight: 1.5 }}>
                            {hiddenCount === 1
                              ? 'Nog 1 stap te ontgrendelen — eerst de huidige stap volledig afronden (alle fases op niveau 4).'
                              : `Nog ${hiddenCount} stappen te ontgrendelen — eerst de voorgaande stappen volledig afronden.`}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </>
            )}
          </>
        );
      })()}

      {/* ═══════ SLOT INTEREST (admin overview) ═══════ */}
      {view === 'slot-interest' && (() => {
        // Walter Apr 23 — slot-interesses are waitlist entries with a preferred timeslot.
        const all = (waitlist.data ?? []).filter(w =>
          w.preferredDays?.length || (w as unknown as { preferredTimeStart?: string }).preferredTimeStart);
        return (
          <>
            <PageHeader
              title="Slot-interesses"
              subtitle={waitlist.loading
                ? 'Laden…'
                : `${all.length} ouders met voorkeur voor specifieke tijdslots`}
              actions={
                <button onClick={() => waitlist.refresh()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>
                  <RefreshCw size={15} /> Vernieuwen
                </button>
              }
            />
            <div className="mb-4 p-4 rounded-lg" style={{ background: '#F0F9FF', border: '1px solid #BAE6FD' }}>
              <p className="text-[#0369A1] flex items-start gap-2" style={{ fontSize: 12, lineHeight: 1.5 }}>
                <Info size={14} className="flex-shrink-0 mt-0.5" />
                <span>Wanneer een vaste plek vrijkomt, krijgen alle hier vermelde ouders een 24-uurs notificatie. De ouder met de hoogste positie (vroegste registratie) krijgt voorrang.</span>
              </p>
            </div>
            <Card>
              {waitlist.loading ? (
                <div className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</div>
              ) : all.length === 0 ? (
                <div className="py-16 text-center">
                  <ListChecks size={36} className="mx-auto mb-3 text-[#C4CDD9]" />
                  <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Geen slot-interesses</p>
                  <p className="text-[#A0AEC0] mt-1" style={{ fontSize: 12 }}>Wachtlijst-entries zonder tijd-voorkeur staan onder Wachtlijst → Overzicht</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#F8FAFC] border-b border-[#E5EAF2]">
                      <tr>
                        {['POSITIE', 'KIND', 'OUDER', 'VOORKEURSDAGEN', 'INSCHRIJFGELD', 'SINDS'].map(h => (
                          <th key={h} className="text-left px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.4 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {all.map(w => (
                        <tr key={w.id} className="border-b border-[#F0F4FA] hover:bg-[#F8FAFC]">
                          <td className="px-3 py-2.5 text-[#FF5C00]" style={{ fontSize: 13, fontWeight: 700 }}>#{w.position}</td>
                          <td className="px-3 py-2.5 text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>{w.childName}</td>
                          <td className="px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 12 }}>{w.parentName}</td>
                          <td className="px-3 py-2.5 text-[#0365C4]" style={{ fontSize: 12, fontWeight: 600 }}>{w.preferredDays?.join(', ') || '—'}</td>
                          <td className="px-3 py-2.5">
                            {w.registrationFeePaid
                              ? <span className="text-[#27AE60]" style={{ fontSize: 12, fontWeight: 600 }}>✓ Betaald</span>
                              : <span className="text-[#E74C3C]" style={{ fontSize: 12, fontWeight: 600 }}>✗ Open</span>}
                          </td>
                          <td className="px-3 py-2.5 text-[#A0AEC0]" style={{ fontSize: 12 }}>{new Date(w.joinedAt).toLocaleDateString('nl-NL')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </>
        );
      })()}

      {/* ═══════ EXAMS (overview) — Walter Apr 23 ═══════ */}
      {view === 'exams' && (() => {
        const all = examCandidates.data ?? [];
        const ready = all.filter(c => c.readyForExam);
        const close = all.filter(c => !c.readyForExam && c.percent >= 70);
        const inProgress = all.filter(c => c.percent < 70);
        return (
          <>
            <PageHeader
              title="Examenkandidaten"
              subtitle={examCandidates.loading
                ? 'Laden…'
                : `${ready.length} klaar voor examen · ${close.length} bijna klaar · ${inProgress.length} in voorbereiding`}
              actions={
                <button onClick={() => examCandidates.refresh()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>
                  <RefreshCw size={15} /> Vernieuwen
                </button>
              }
            />
            {examCandidates.loading ? (
              <Card className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</Card>
            ) : all.length === 0 ? (
              <Card className="py-16 text-center">
                <GraduationCap size={36} className="mx-auto mb-3 text-[#C4CDD9]" />
                <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Geen examenkandidaten</p>
                <p className="text-[#A0AEC0] mt-1 max-w-md mx-auto" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Kinderen verschijnen hier zodra ze beginnen aan een diploma-checklist (A, B of C).
                </p>
              </Card>
            ) : (
              <div className="space-y-5">
                {/* Klaar voor examen */}
                {ready.length > 0 && (
                  <Card className="p-5">
                    <h3 className="text-[#27AE60] flex items-center gap-2 mb-3" style={{ fontSize: 14, fontWeight: 800 }}>
                      <CheckCircle2 size={16} /> Klaar voor examen ({ready.length})
                    </h3>
                    <div className="space-y-2">
                      {ready.map(c => (
                        <div key={`${c.childId}-${c.diplomaLevel}`} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: '#ECFDF5', border: '1px solid #A7F3D0' }}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F5A623 0%, #FF7A00 100%)' }}>
                            <span className="text-white" style={{ fontSize: 16, fontWeight: 800 }}>{c.diplomaLevel}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{c.childName}</p>
                            <p className="text-[#6B7B94]" style={{ fontSize: 12 }}>Ouder: {c.parentName} · Diploma {c.diplomaLevel} alle {c.totalItems} items op fase 4</p>
                          </div>
                          <button onClick={() => { setSelectedChildId(c.childId); goTo('child-progress'); }} className="px-3 py-1.5 rounded-lg text-white" style={{ background: '#27AE60', fontSize: 12, fontWeight: 700 }}>
                            Bekijk
                          </button>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
                {close.length > 0 && (
                  <Card className="p-5">
                    <h3 className="text-[#FF5C00] flex items-center gap-2 mb-3" style={{ fontSize: 14, fontWeight: 800 }}>
                      <Clock size={16} /> Bijna klaar (≥70%) ({close.length})
                    </h3>
                    <div className="space-y-2">
                      {close.map(c => (
                        <div key={`${c.childId}-${c.diplomaLevel}`} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: '#FFF7ED', border: '1px solid #FED7AA' }}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F5A623 0%, #FF7A00 100%)' }}>
                            <span className="text-white" style={{ fontSize: 16, fontWeight: 800 }}>{c.diplomaLevel}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{c.childName}</p>
                            <p className="text-[#6B7B94]" style={{ fontSize: 12 }}>Diploma {c.diplomaLevel}: {c.itemsMastered}/{c.totalItems} items beheerst ({c.percent}%)</p>
                            <div className="mt-1.5 h-1.5 bg-[#FFE4D0] rounded-full overflow-hidden">
                              <div className="h-full" style={{ width: `${c.percent}%`, background: 'linear-gradient(90deg, #F5A623, #FF7A00)' }} />
                            </div>
                          </div>
                          <button onClick={() => { setSelectedChildId(c.childId); goTo('child-progress'); }} className="px-3 py-1.5 rounded-lg text-[#FF5C00] bg-white border border-[#FF5C00]/30" style={{ fontSize: 12, fontWeight: 700 }}>
                            Bekijk
                          </button>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
                {inProgress.length > 0 && (
                  <Card className="p-5">
                    <h3 className="text-[#0365C4] flex items-center gap-2 mb-3" style={{ fontSize: 14, fontWeight: 800 }}>
                      <Activity size={16} /> In voorbereiding (&lt;70%) ({inProgress.length})
                    </h3>
                    <div className="space-y-2">
                      {inProgress.slice(0, 10).map(c => (
                        <div key={`${c.childId}-${c.diplomaLevel}`} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: '#F8FAFC' }}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#E5EAF2' }}>
                            <span className="text-[#6B7B94]" style={{ fontSize: 14, fontWeight: 700 }}>{c.diplomaLevel}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>{c.childName}</p>
                            <p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>{c.itemsMastered}/{c.totalItems} ({c.percent}%)</p>
                          </div>
                          <button onClick={() => { setSelectedChildId(c.childId); goTo('child-progress'); }} className="px-2.5 py-1 rounded-lg text-[#6B7B94] border border-[#E8ECF4]" style={{ fontSize: 11, fontWeight: 600 }}>
                            Voortgang
                          </button>
                        </div>
                      ))}
                      {inProgress.length > 10 && (
                        <p className="text-center text-[#A0AEC0] pt-2" style={{ fontSize: 12 }}>+ {inProgress.length - 10} kinderen meer</p>
                      )}
                    </div>
                  </Card>
                )}
              </div>
            )}
          </>
        );
      })()}

      {/* ═══════ EXAM CONTINUATION FLOW — Walter Apr 23 24h Yes/No tracking ═══════ */}
      {view === 'exam-continuation' && (() => {
        const all = waitlistOffers.data ?? [];
        const pending = all.filter(o => o.status === 'pending');
        const claimed = all.filter(o => o.status === 'claimed');
        const declined = all.filter(o => o.status === 'declined');
        const expired = all.filter(o => o.status === 'expired');
        return (
          <>
            <PageHeader
              title="Vervolg-aanvragen (24h)"
              subtitle={waitlistOffers.loading
                ? 'Laden…'
                : `${pending.length} actief · ${claimed.length} bevestigd · ${declined.length} afgewezen · ${expired.length} verlopen`}
              actions={
                <button onClick={() => waitlistOffers.refresh()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>
                  <RefreshCw size={15} /> Vernieuwen
                </button>
              }
            />
            <div className="mb-4 p-4 rounded-lg" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
              <p className="text-[#92400E] flex items-start gap-2" style={{ fontSize: 12, lineHeight: 1.5 }}>
                <Info size={14} className="flex-shrink-0 mt-0.5" />
                <span><strong>24-uurs flow:</strong> Wanneer een ouder bij examen-continuation 'Nee' kiest of een vaste plek anderszins vrijkomt, krijgen alle wachtlijst-ouders met die slot-voorkeur tegelijk een notificatie. De eerste ouder die binnen 24 uur claimt, krijgt de plek.</span>
              </p>
            </div>
            {waitlistOffers.loading ? (
              <Card className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</Card>
            ) : all.length === 0 ? (
              <Card className="py-16 text-center">
                <Timer size={36} className="mx-auto mb-3 text-[#C4CDD9]" />
                <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Geen actieve vervolg-aanvragen</p>
                <p className="text-[#A0AEC0] mt-1 max-w-md mx-auto" style={{ fontSize: 12, lineHeight: 1.5 }}>Aanvragen verschijnen hier zodra een vaste plek vrijkomt.</p>
              </Card>
            ) : (
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#F8FAFC] border-b border-[#E5EAF2]">
                      <tr>
                        {['STATUS', 'KIND', 'OUDER', 'LES', 'LOCATIE', 'AANGEBODEN', 'EINDIGT', 'TIJD OVER'].map(h => (
                          <th key={h} className="text-left px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.4 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {all.map(o => {
                        const sty =
                          o.status === 'claimed' ? { bg: '#ECFDF5', fg: '#065F46', label: '✓ Bevestigd' }
                          : o.status === 'declined' ? { bg: '#FEF2F2', fg: '#991B1B', label: '✗ Afgewezen' }
                          : o.status === 'expired' ? { bg: '#F4F7FC', fg: '#A0AEC0', label: '⏱ Verlopen' }
                          : { bg: '#FFFBEB', fg: '#92400E', label: '⏳ Open' };
                        return (
                          <tr key={o.id} className="border-b border-[#F0F4FA] hover:bg-[#F8FAFC]">
                            <td className="px-3 py-2.5"><span className="inline-block px-2 py-0.5 rounded-full" style={{ fontSize: 10, fontWeight: 700, background: sty.bg, color: sty.fg }}>{sty.label}</span></td>
                            <td className="px-3 py-2.5 text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>{o.childName}</td>
                            <td className="px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 12 }}>{o.parentName}</td>
                            <td className="px-3 py-2.5 text-[#0365C4]" style={{ fontSize: 12, fontWeight: 600 }}>{o.lessonDate ? new Date(o.lessonDate).toLocaleDateString('nl-NL') : '—'} · {o.lessonTime}</td>
                            <td className="px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 12 }}>{o.location}</td>
                            <td className="px-3 py-2.5 text-[#A0AEC0]" style={{ fontSize: 12 }}>{new Date(o.offeredAt).toLocaleString('nl-NL', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                            <td className="px-3 py-2.5 text-[#A0AEC0]" style={{ fontSize: 12 }}>{new Date(o.expiresAt).toLocaleString('nl-NL', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                            <td className="px-3 py-2.5 text-[#FF5C00]" style={{ fontSize: 12, fontWeight: 700 }}>{o.status === 'pending' ? `${o.hoursRemaining}u` : '—'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </>
        );
      })()}

      {/* ═══════ FIXED SCHEDULE (Excel-style weekly editor) ═══════ */}
      {view === 'fixed-schedule' && (() => {
        // Walter Apr 22 — 8 locaties incl. Doorwerth, 15-min granularity, 08:30-19:00, color-coded.
        // Real lesson rows from `lessons` (this week) gebundeld op weekday + tijd.
        const reservations = reservationsAll.data ?? [];
        const locColors = ['#0365C4', '#FF5C00', '#27AE60', '#8E44AD', '#E67E22', '#16A085', '#C0392B', '#2C3E50'];
        const distinctLocs = Array.from(new Set(reservations.map(r => r.location).filter(Boolean))).sort();
        const colorMap: Record<string, string> = {};
        distinctLocs.forEach((l, i) => { colorMap[l] = locColors[i % locColors.length]; });
        // 15-min slots from 08:30 to 19:00
        const slots: string[] = [];
        for (let m = 8 * 60 + 30; m <= 19 * 60; m += 15) {
          slots.push(`${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`);
        }
        const days = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
        // Map: { dayIndex|time → reservations[] }
        const grid: Record<string, typeof reservations> = {};
        for (const r of reservations) {
          if (!r.date || !r.startTime) continue;
          const d = new Date(r.date);
          const dayIdx = (d.getDay() + 6) % 7; // Monday=0
          const t = r.startTime.slice(0, 5);
          // round down to nearest 15-min
          const [hh, mm] = t.split(':').map(Number);
          const total = hh * 60 + mm;
          const rounded = Math.floor(total / 15) * 15;
          const tk = `${String(Math.floor(rounded / 60)).padStart(2, '0')}:${String(rounded % 60).padStart(2, '0')}`;
          const key = `${dayIdx}|${tk}`;
          (grid[key] ??= []).push(r);
        }
        return (
          <>
            <PageHeader
              title="Vast rooster"
              subtitle={reservationsAll.loading
                ? 'Laden…'
                : `${distinctLocs.length} locaties · ${slots.length} tijdslots (15-min) · ${reservations.length} reserveringen`}
              actions={
                <button onClick={() => reservationsAll.refresh()} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>
                  <RefreshCw size={15} /> Vernieuwen
                </button>
              }
            />
            {/* Locatie legend */}
            {distinctLocs.length > 0 && (
              <Card className="p-3 mb-4">
                <p className="text-[#A0AEC0] mb-2" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.4 }}>LOCATIES</p>
                <div className="flex flex-wrap gap-2">
                  {distinctLocs.map(l => (
                    <div key={l} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: `${colorMap[l]}15` }}>
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: colorMap[l] }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: colorMap[l] }}>{l}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            <Card className="p-2 overflow-x-auto">
              {reservationsAll.loading ? (
                <div className="py-16 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</div>
              ) : reservations.length === 0 ? (
                <div className="py-16 text-center">
                  <Calendar size={36} className="mx-auto mb-3 text-[#C4CDD9]" />
                  <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Nog geen reserveringen</p>
                  <p className="text-[#A0AEC0] mt-1" style={{ fontSize: 12 }}>Vaste plaatsen verschijnen hier zodra reserveringen zijn aangemaakt</p>
                </div>
              ) : (
                <div style={{ minWidth: 800 }}>
                  {/* Header row */}
                  <div className="grid grid-cols-8 sticky top-0 bg-white z-10 border-b-2 border-[#E5EAF2]">
                    <div className="p-2" style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0' }}>TIJD</div>
                    {days.map((d, i) => (
                      <div key={d} className="p-2 text-center" style={{ fontSize: 11, fontWeight: 800, color: '#1A1A2E', background: i >= 5 ? '#FAFCFF' : 'transparent' }}>{d}</div>
                    ))}
                  </div>
                  {/* Slot rows */}
                  {slots.map(slot => (
                    <div key={slot} className="grid grid-cols-8 border-b border-[#F0F4FA]" style={{ minHeight: 28 }}>
                      <div className="p-1 text-center text-[#A0AEC0]" style={{ fontSize: 10, fontFamily: 'monospace' }}>{slot}</div>
                      {days.map((_, dayIdx) => {
                        const cellReservations = grid[`${dayIdx}|${slot}`] ?? [];
                        return (
                          <div key={dayIdx} className="p-0.5" style={{ background: dayIdx >= 5 ? '#FAFCFF' : 'transparent' }}>
                            {cellReservations.map((r, i) => (
                              <div
                                key={r.id + i}
                                onClick={() => { setSelectedReservation(r as unknown as Reservation); goTo('reservation-detail'); }}
                                className="rounded px-1.5 py-0.5 mb-0.5 cursor-pointer hover:opacity-80"
                                style={{ background: `${colorMap[r.location]}25`, borderLeft: `3px solid ${colorMap[r.location]}` }}
                                title={`${r.childName} · ${r.location} · ${r.startTime}-${r.endTime}`}
                              >
                                <div style={{ fontSize: 9, fontWeight: 700, color: colorMap[r.location], lineHeight: 1.2 }}>
                                  {r.childName.split(' ')[0]}
                                </div>
                                <div style={{ fontSize: 8, color: '#6B7B94', lineHeight: 1.1 }}>
                                  {r.type}
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </Card>
            <p className="text-center text-[#A0AEC0] mt-3" style={{ fontSize: 11 }}>
              Klik op een lesblok voor de reservering-details · Vaste plaatsen worden in een latere sprint persistent gemaakt
            </p>
          </>
        );
      })()}

      {/* ═══════ MESSAGES ═══════ */}
      {view === 'messages' && <MessagesView goTo={goTo} showToast={showToast} setSelectedCustomer={setSelectedCustomer} />}

      {/* ═══════ REPORTS ═══════ */}
      {view === 'reports' && <ReportsView showToast={showToast} />}

      {/* ═══════ NOTIFICATIONS ═══════ */}
      {view === 'notifications-admin' && <AdminNotificationsList showToast={showToast} />}

      {/* ═══════ SETTINGS ═══════ */}
      {view === 'settings' && <SettingsView showToast={showToast} />}

      {/* ═══════ HELP & SUPPORT ═══════ */}
      {view === 'help-support' && (
        <>
          <PageHeader title="Help & Support" subtitle="Documentatie, contact en veelgestelde vragen" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-5">
              <h3 className="text-[#1A1A2E] flex items-center gap-2 mb-4" style={{ fontSize: 15, fontWeight: 700 }}>
                <Info size={18} color="#0365C4" /> Snelstart
              </h3>
              <div className="space-y-3">
                {[
                  { q: 'Hoe maak ik een nieuwe klant aan?', a: 'Ga naar Klanten → Nieuwe klant. Vul de gegevens in van de ouder + het eerste kind. De ouder ontvangt direct een account met opgegeven inloggegevens.' },
                  { q: 'Hoe wijzig ik de voortgang van een kind?', a: 'Ga naar Klanten → Voortgang per kind. Kies een kind en klik op de fase-cirkels (Niet/Wordt/Bijna/Beheerst). Wijzigingen worden direct opgeslagen.' },
                  { q: 'Wanneer wordt Stap 3 zichtbaar?', a: 'Stap 3 verschijnt automatisch zodra alle 3 onderdelen van Stap 2 op fase 4 (Goed beheerst) staan. Dit cascade-systeem werkt voor alle stappen + diploma\'s.' },
                  { q: 'Hoe verwerk ik een vakantieaanvraag?', a: 'Ga naar Personeel → Vakantieaanvragen. Klik op Goedkeuren of Afwijzen. De instructeur krijgt direct een notificatie.' },
                  { q: 'Hoe verstuur ik een aankondiging?', a: 'Ga naar Communicatie → Notificaties versturen. Kies doelgroep (ouders/instructeurs/iedereen), titel en bericht. Verzending is direct via Supabase real-time.' },
                ].map((item, i) => (
                  <details key={i} className="rounded-lg p-3" style={{ background: '#F8FAFC', border: '1px solid #E5EAF2' }}>
                    <summary className="cursor-pointer text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 700 }}>{item.q}</summary>
                    <p className="text-[#6B7B94] mt-2" style={{ fontSize: 12, lineHeight: 1.6 }}>{item.a}</p>
                  </details>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="text-[#1A1A2E] flex items-center gap-2 mb-4" style={{ fontSize: 15, fontWeight: 700 }}>
                <Send size={18} color="#27AE60" /> Contact ontwikkelaar
              </h3>
              <p className="text-[#6B7B94] mb-4" style={{ fontSize: 13, lineHeight: 1.5 }}>
                Voor technische vragen, bug-meldingen of verzoeken voor nieuwe features:
              </p>
              <div className="space-y-2 mb-4">
                <a href="mailto:fiverrprojectsmanage@gmail.com" className="flex items-center gap-2 p-3 rounded-lg hover:bg-[#F4F7FC]" style={{ border: '1px solid #E8ECF4' }}>
                  <Mail size={16} color="#0365C4" />
                  <span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>fiverrprojectsmanage@gmail.com</span>
                </a>
              </div>

              <h4 className="text-[#1A1A2E] mt-5 mb-3" style={{ fontSize: 13, fontWeight: 700 }}>Snelle links</h4>
              <div className="space-y-2">
                <button onClick={() => goTo('settings')} className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-[#F4F7FC] text-left" style={{ border: '1px solid #E8ECF4' }}>
                  <Settings size={14} color="#6B7B94" />
                  <span className="text-[#1A1A2E]" style={{ fontSize: 13 }}>Instellingen</span>
                </button>
                <button onClick={() => goTo('profile-admin')} className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-[#F4F7FC] text-left" style={{ border: '1px solid #E8ECF4' }}>
                  <Users size={14} color="#6B7B94" />
                  <span className="text-[#1A1A2E]" style={{ fontSize: 13 }}>Persoonlijke profiel</span>
                </button>
                <button onClick={() => goTo('devices')} className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-[#F4F7FC] text-left" style={{ border: '1px solid #E8ECF4' }}>
                  <Activity size={14} color="#6B7B94" />
                  <span className="text-[#1A1A2E]" style={{ fontSize: 13 }}>Actieve apparaten</span>
                </button>
              </div>
            </Card>

            <Card className="p-5 lg:col-span-2">
              <h3 className="text-[#1A1A2E] flex items-center gap-2 mb-4" style={{ fontSize: 15, fontWeight: 700 }}>
                <BookOpen size={18} color="#FF5C00" /> Over deze applicatie
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 rounded-lg" style={{ background: '#F8FAFC' }}>
                  <p className="text-[#A0AEC0]" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.3 }}>VERSIE</p>
                  <p className="text-[#1A1A2E] mt-1" style={{ fontSize: 14, fontWeight: 700 }}>Admin Dashboard 1.0</p>
                </div>
                <div className="p-3 rounded-lg" style={{ background: '#F8FAFC' }}>
                  <p className="text-[#A0AEC0]" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.3 }}>PLATFORM</p>
                  <p className="text-[#1A1A2E] mt-1" style={{ fontSize: 14, fontWeight: 700 }}>React + Vite + Supabase</p>
                </div>
                <div className="p-3 rounded-lg" style={{ background: '#F8FAFC' }}>
                  <p className="text-[#A0AEC0]" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.3 }}>STATUS</p>
                  <p className="text-[#27AE60] mt-1 flex items-center gap-1.5" style={{ fontSize: 14, fontWeight: 700 }}>
                    <span className="w-2 h-2 rounded-full bg-[#27AE60] animate-pulse" /> Live & operationeel
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

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

function AdminNotificationsList({ showToast }: { showToast: (msg: string) => void }) {
  const { data, loading, unreadCount, refresh } = useAdminNotifications();

  function relTime(iso: string) {
    const diff = Date.now() - new Date(iso).getTime();
    const sec = Math.max(1, Math.floor(diff / 1000));
    if (sec < 60) return `${sec} sec geleden`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min} min geleden`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr} uur geleden`;
    const days = Math.floor(hr / 24);
    if (days < 7) return `${days} dag${days === 1 ? '' : 'en'} geleden`;
    return new Date(iso).toLocaleDateString('nl-NL');
  }

  return (
    <>
      <PageHeader title="Alle notificaties" subtitle={loading ? 'Laden…' : `${data.length} totaal · ${unreadCount} ongelezen`} />
      <div className="flex justify-end mb-3">
        <button
          onClick={async () => {
            await markAllNotificationsRead();
            await refresh();
            showToast('Alle notificaties gemarkeerd als gelezen');
          }}
          disabled={unreadCount === 0}
          className="px-3 py-1.5 rounded-lg bg-[#0365C4] text-white disabled:bg-[#C4CDD9] disabled:cursor-not-allowed"
          style={{ fontSize: 12, fontWeight: 600 }}
        >
          Alles als gelezen markeren
        </button>
      </div>
      <Card className="divide-y divide-[#F0F4FA]">
        {data.length === 0 && !loading ? (
          <div className="px-5 py-12 text-center">
            <p className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>Geen notificaties</p>
            <p className="text-[#6B7B94] mt-1" style={{ fontSize: 13 }}>
              Nieuwe meldingen verschijnen hier real-time zodra ouders, instructeurs of het systeem iets versturen.
            </p>
          </div>
        ) : (
          data.map(n => {
            const color = n.type.startsWith('payment') ? '#0365C4'
              : n.type.includes('cancel') || n.type.includes('error') ? '#E74C3C'
              : n.type.includes('booking') || n.type.includes('confirmed') ? '#27AE60'
              : n.type.includes('warn') || n.type.includes('deadline') ? '#E67E22'
              : '#FF5C00';
            return (
              <button
                key={n.id}
                onClick={async () => {
                  if (!n.read) { await markNotificationRead(n.id); await refresh(); }
                }}
                className={`w-full text-left px-5 py-4 hover:bg-[#F8FAFC] flex items-start gap-3 transition-colors ${n.read ? '' : 'bg-[#F0F8FF]'}`}
              >
                <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.read ? '#C4CDD9' : color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: n.read ? 500 : 700 }}>{n.title}</p>
                  <p className="text-[#6B7B94]" style={{ fontSize: 13, lineHeight: 1.4 }}>{n.body}</p>
                </div>
                <span className="text-[#A0AEC0] flex-shrink-0" style={{ fontSize: 12 }}>{relTime(n.createdAt)}</span>
              </button>
            );
          })
        )}
      </Card>
    </>
  );
}

function SectionHeader({ icon, label, subtitle }: { icon: 'steps' | 'diploma'; label: string; subtitle: string }) {
  const tone = icon === 'diploma' ? '#FF7A00' : '#0365C4';
  const Ic = icon === 'diploma' ? Trophy : ListOrdered;
  return (
    <div className="flex items-center gap-3 pt-2 pb-1">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
           style={{ background: `${tone}1F` }}>
        <Ic size={18} color={tone} />
      </div>
      <div>
        <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 800, letterSpacing: 0.4 }}>
          {label.toUpperCase()}
        </p>
        <p className="text-[#6B7B94]" style={{ fontSize: 11 }}>{subtitle}</p>
      </div>
    </div>
  );
}

export default AdminDashboardScreen;

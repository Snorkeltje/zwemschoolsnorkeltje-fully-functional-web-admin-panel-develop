import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { WebsiteLayout } from '../../components/website/WebsiteLayout';
import {
  ChevronRight, LogIn, UserPlus, CreditCard, Calendar, XCircle, Clock,
  BookOpen, Smartphone, User, Lock, Download, MapPin, CheckCircle2, AlertTriangle,
  ArrowLeft, ArrowRight, X, Edit2, Save, ShoppingCart, Ticket, Home, Eye, EyeOff,
  Info, RefreshCw, Bell, FileText, Phone, Mail, ChevronDown, ChevronUp, Trash2, Plus
} from 'lucide-react';
import snorkeltjeLogo from '../../../imports/logo-3.svg';
import snorkeltjeLogoPng from 'figma:asset/9b639bb791c2a6aa104eacafd5c0253b9d1ddf3e.png';

// ─── Types ───
type View =
  | 'login' | 'register' | 'forgot-password'
  | 'dashboard'
  | 'boek-een-les' | 'vast-tijdstip' | 'extra-1op1' | 'extra-1op2' | 'vakantie'
  | 'calendar' | 'checkout' | 'booking-success'
  | 'knipkaarten-menu' | 'knipkaarten-list' | 'knipkaart-checkout' | 'knipkaart-success'
  | 'reserveringen-gepland' | 'reserveringen-geschiedenis'
  | 'mijn-knipkaarten'
  | 'mijn-profiel' | 'wachtwoord-wijzigen'
  | 'handleiding';

interface LesProduct {
  id: number;
  name: string;
  description: string;
  type: string;
  label: string;
  price: number;
  duration: string;
  location: string;
}

interface KnipkaartProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  validity: string;
  count: number;
}

interface Reservation {
  id: string;
  product: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  status: 'Bevestigd' | 'Geannuleerd';
  price: number;
  paidWith: string;
}

interface Knipkaart {
  id: string;
  type: string;
  balance: number;
  total: number;
  validFrom: string;
  validUntil: string;
  price: number;
}

interface Profile {
  childFirstName: string;
  childLastName: string;
  childBirthDate: string;
  parentName: string;
  mobile: string;
  email: string;
  extraPhone: string;
  city: string;
  location: string;
  lessonType: string;
  day: string;
  lessonTime: string;
  colAbsent: string;
  otherChildAbsent: string;
}

interface TimeSlot {
  time: string;
  endTime: string;
  available: number;
}

// ─── Mock Data ───
const vastTijdstipProducts: LesProduct[] = [
  { id: 1, name: 'Nijkerk 1-op-1 dinsdag 12.00 uur', description: 'Vaste lestijd dinsdag 12.00', type: '1-op-1', label: 'BASIS ZWEMLES 1-op-1', price: 38, duration: '30 min', location: 'Ampt van Nijkerk' },
  { id: 2, name: 'Nijkerk 1-op-2 dinsdag 12.30 uur', description: 'Vaste lestijd dinsdag 12.30 1-op-2', type: '1-op-2', label: 'BASIS ZWEMLES 1-op-2', price: 27, duration: '30 min', location: 'Ampt van Nijkerk' },
  { id: 3, name: 'De Bilt 1-op-1 woensdag 14.00 uur', description: 'Vaste lestijd woensdag 14.00', type: '1-op-1', label: 'BASIS ZWEMLES 1-op-1', price: 38, duration: '30 min', location: 'De Bilt' },
  { id: 4, name: 'Garderen 1-op-1 donderdag 10.00 uur', description: 'Vaste lestijd donderdag 10.00', type: '1-op-1', label: 'BASIS ZWEMLES 1-op-1', price: 38, duration: '30 min', location: 'Garderen' },
  { id: 5, name: 'Wolfheze 1-op-2 vrijdag 15.00 uur', description: 'Vaste lestijd vrijdag 15.00 1-op-2', type: '1-op-2', label: 'BASIS ZWEMLES 1-op-2', price: 27, duration: '30 min', location: 'Wolfheze' },
];

const extra1op1Products: LesProduct[] = [
  { id: 10, name: 'Ampt van Nijkerk 1-op-1 extra', description: 'Inhaal- of extra zwemles', type: 'extra-1op1', label: 'EXTRA ZWEMLES 1-op-1', price: 39, duration: '30 min', location: 'Ampt van Nijkerk' },
  { id: 11, name: 'Bad Hulckesteijn 1-op-1 extra', description: 'Inhaal- of extra zwemles', type: 'extra-1op1', label: 'EXTRA ZWEMLES 1-op-1', price: 39, duration: '30 min', location: 'Bad Hulckesteijn' },
  { id: 12, name: 'Bad Hulckesteijn 1-op-1 extra 2e instr.', description: 'Inhaal- of extra zwemles', type: 'extra-1op1', label: 'EXTRA ZWEMLES 1-op-1', price: 39, duration: '30 min', location: 'Bad Hulckesteijn' },
  { id: 13, name: 'De Bilt 1-op-1 extra', description: 'Inhaal- of extra zwemles', type: 'extra-1op1', label: 'EXTRA ZWEMLES 1-op-1', price: 39, duration: '30 min', location: 'De Bilt' },
  { id: 14, name: 'Dordrecht 1-op-1 extra', description: 'Inhaal- of extra zwemles', type: 'extra-1op1', label: 'EXTRA ZWEMLES 1-op-1', price: 39, duration: '30 min', location: 'Dordrecht' },
];

const extra1op2Products: LesProduct[] = [
  { id: 20, name: 'Ampt van Nijkerk 1-op-2 extra', description: 'Inhaal- of extra zwemles', type: 'extra-1op2', label: 'EXTRA ZWEMLES 1-op-2', price: 27, duration: '30 min', location: 'Ampt van Nijkerk' },
  { id: 21, name: 'Bad Hulckesteijn 1-op-2 extra', description: 'Inhaal- of extra zwemles', type: 'extra-1op2', label: 'EXTRA ZWEMLES 1-op-2', price: 27, duration: '30 min', location: 'Bad Hulckesteijn' },
  { id: 22, name: 'Bad Hulckesteijn 1-op-2 extra 2e instr.', description: 'Inhaal- of extra zwemles', type: 'extra-1op2', label: 'EXTRA ZWEMLES 1-op-2', price: 27, duration: '30 min', location: 'Bad Hulckesteijn' },
  { id: 23, name: 'De Bilt 1-op-2 extra', description: 'Inhaal- of extra zwemles', type: 'extra-1op2', label: 'EXTRA ZWEMLES 1-op-2', price: 27, duration: '30 min', location: 'De Bilt' },
];

const vakantieLocations = [
  { id: 30, name: 'Vakantie zwemles Ampt van Nijkerk', location: 'Ampt van Nijkerk' },
  { id: 31, name: 'Vakantie zwemles Bad Hulckesteijn', location: 'Bad Hulckesteijn' },
  { id: 32, name: 'Vakantie zwemles De Bilt', location: 'De Bilt' },
  { id: 33, name: 'Vakantie zwemles Dordrecht', location: 'Dordrecht' },
  { id: 34, name: 'Vakantie zwemles Wolfheze', location: 'Wolfheze' },
  { id: 35, name: 'Vakantie zwemles Mierlo', location: 'Mierlo' },
  { id: 36, name: 'Vakantie zwemles Garderen', location: 'Garderen' },
];

const knipkaartCategories = [
  { key: '1-op-1', label: '1-op-1 zwemles', desc: 'Knipkaarten voor privé zwemlessen', color: '#0365C4', icon: '1:1' },
  { key: '1-op-2', label: '1-op-2 zwemles', desc: 'Knipkaarten voor duo zwemlessen', color: '#00C1FF', icon: '1:2' },
  { key: '1-op-3', label: '1-op-3 zwemles', desc: 'Knipkaarten voor trio zwemlessen', color: '#27AE60', icon: '1:3' },
  { key: 'survival', label: 'Survival', desc: 'Survival zwemles pakketten', color: '#FF5C00', icon: 'SV' },
  { key: 'inschrijfgeld', label: 'Inschrijfgeld', desc: 'Eenmalig inschrijfgeld', color: '#8E44AD', icon: '€' },
  { key: 'wijzigen', label: 'Wijzigen dag/tijd', desc: 'Wijzig je vaste lesdag of lestijd', color: '#E67E22', icon: '⟳' },
  { key: 'bso', label: 'BSO-zwemles', desc: 'BSO-zwemles pakketten', color: '#2C3E50', icon: 'BS' },
];

const knipkaartProducts: Record<string, KnipkaartProduct[]> = {
  '1-op-1': [
    { id: 100, name: 'Knipkaart voor 10x 1-op-1 zwemles', description: 'Knipkaart voor 10x 1-op-1 zwemles', price: 380, validity: '365 dagen', count: 10 },
    { id: 101, name: 'Knipkaart voor 5x 1-op-1 zwemles', description: 'Knipkaart voor 5x 1-op-1 zwemles', price: 190, validity: '365 dagen', count: 5 },
    { id: 102, name: 'Knipkaart voor 3x 1-op-1 zwemles', description: 'Knipkaart voor 3x 1-op-1 zwemles', price: 114, validity: '365 dagen', count: 3 },
  ],
  '1-op-2': [
    { id: 110, name: 'Knipkaart voor 10x 1-op-2 zwemles', description: 'Knipkaart voor 10x 1-op-2 zwemles', price: 270, validity: '365 dagen', count: 10 },
    { id: 111, name: 'Knipkaart voor 5x 1-op-2 zwemles', description: 'Knipkaart voor 5x 1-op-2 zwemles', price: 135, validity: '365 dagen', count: 5 },
    { id: 112, name: 'Knipkaart voor 3x 1-op-2 zwemles', description: 'Knipkaart voor 3x 1-op-2 zwemles', price: 81, validity: '365 dagen', count: 3 },
  ],
  '1-op-3': [
    { id: 120, name: 'Knipkaart voor 10x 1-op-3 zwemles', description: 'Knipkaart voor 10x 1-op-3 zwemles', price: 200, validity: '365 dagen', count: 10 },
    { id: 121, name: 'Knipkaart voor 5x 1-op-3 zwemles', description: 'Knipkaart voor 5x 1-op-3 zwemles', price: 100, validity: '365 dagen', count: 5 },
    { id: 122, name: 'Knipkaart voor 3x 1-op-3 zwemles', description: 'Knipkaart voor 3x 1-op-3 zwemles', price: 60, validity: '365 dagen', count: 3 },
  ],
  'survival': [
    { id: 130, name: 'Pakket van 10 lessen', description: 'Waardebon voor 10x 1-op-2 zwemles', price: 250, validity: '84 dagen', count: 10 },
    { id: 131, name: 'Pakket van 5 lessen', description: 'Waardebon voor 5x 1-op-2 zwemles', price: 125, validity: '84 dagen', count: 5 },
    { id: 132, name: 'Pakket van 3 lessen', description: 'Waardebon voor 3x 1-op-2 zwemles', price: 75, validity: '84 dagen', count: 3 },
  ],
  'inschrijfgeld': [
    { id: 140, name: 'Knipkaart voor Inschrijfgeld', description: 'Eenmalig inschrijfgeld', price: 25, validity: '1 dag', count: 1 },
  ],
  'wijzigen': [
    { id: 150, name: 'Knipkaart voor Wijzigen dag of tijd', description: 'Wijzig je vaste lesdag of lestijd', price: 60, validity: '1 dag', count: 1 },
  ],
  'bso': [
    { id: 160, name: 'Knipkaart voor 12x BSO', description: 'BSO-zwemles pakket', price: 300, validity: 'Onbeperkt', count: 12 },
  ],
};

const initialReservationsPlanned: Reservation[] = [
  { id: 'RES-2026-0451', product: 'Nijkerk 1-op-1 dinsdag 12.00 uur', date: '01-04-2026', timeFrom: '12:00', timeTo: '12:30', status: 'Bevestigd', price: 38, paidWith: 'Knipkaart KNP-3021' },
  { id: 'RES-2026-0452', product: 'Nijkerk 1-op-1 dinsdag 12.00 uur', date: '08-04-2026', timeFrom: '12:00', timeTo: '12:30', status: 'Bevestigd', price: 38, paidWith: 'Knipkaart KNP-3021' },
  { id: 'RES-2026-0453', product: 'Nijkerk 1-op-1 dinsdag 12.00 uur', date: '15-04-2026', timeFrom: '12:00', timeTo: '12:30', status: 'Bevestigd', price: 38, paidWith: 'Knipkaart KNP-3021' },
  { id: 'RES-2026-0460', product: 'De Bilt 1-op-1 extra', date: '05-04-2026', timeFrom: '14:00', timeTo: '14:30', status: 'Bevestigd', price: 39, paidWith: 'Knipkaart KNP-3021' },
];

const initialReservationsHistory: Reservation[] = [
  { id: 'RES-2026-0401', product: 'Nijkerk 1-op-1 dinsdag 12.00 uur', date: '04-03-2026', timeFrom: '12:00', timeTo: '12:30', status: 'Bevestigd', price: 38, paidWith: 'Knipkaart KNP-3021' },
  { id: 'RES-2026-0402', product: 'Nijkerk 1-op-1 dinsdag 12.00 uur', date: '11-03-2026', timeFrom: '12:00', timeTo: '12:30', status: 'Bevestigd', price: 38, paidWith: 'Knipkaart KNP-3021' },
  { id: 'RES-2026-0403', product: 'Nijkerk 1-op-1 dinsdag 12.00 uur', date: '18-03-2026', timeFrom: '12:00', timeTo: '12:30', status: 'Bevestigd', price: 38, paidWith: 'Knipkaart KNP-3021' },
  { id: 'RES-2026-0404', product: 'Nijkerk 1-op-1 dinsdag 12.00 uur', date: '25-03-2026', timeFrom: '12:00', timeTo: '12:30', status: 'Bevestigd', price: 38, paidWith: 'Knipkaart KNP-3021' },
];

const initialKnipkaarten: Knipkaart[] = [
  { id: 'KNP-3021', type: 'Knipkaart 10x 1-op-1', balance: 7, total: 10, validFrom: '15-01-2026', validUntil: '15-01-2027', price: 380 },
  { id: 'KNP-3045', type: 'Knipkaart 5x 1-op-2', balance: 2, total: 5, validFrom: '01-02-2026', validUntil: '01-02-2027', price: 135 },
];

const initialProfile: Profile = {
  childFirstName: 'Liam',
  childLastName: 'Van de Geest',
  childBirthDate: '12-05-2020',
  parentName: 'Walter Van de Geest',
  mobile: '+31 6 12345678',
  email: 'walter@zwemschoolsnorkeltje.nl',
  extraPhone: '+31 6 87654321',
  city: 'Nijkerk',
  location: 'Nijkerk',
  lessonType: '1-op-1',
  day: 'Dinsdag',
  lessonTime: '12:00',
  colAbsent: 'Les verplaatsen naar andere datum',
  otherChildAbsent: 'Les gaat door als 1-op-1',
};

// ─── Calendar Helpers ───
function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = (firstDay.getDay() + 6) % 7;
  const days: (number | null)[] = [];
  for (let i = 0; i < startDow; i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(d);
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

function getWeekNumber(d: Date): number {
  const target = new Date(d.valueOf());
  target.setDate(target.getDate() - ((target.getDay() + 6) % 7) + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
}

const monthNames = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
const dayLabels = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];

function formatDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}-${mm}-${d.getFullYear()}`;
}

function generateTimeSlots(product: LesProduct): TimeSlot[] {
  const baseHour = product.name.includes('12.00') ? 12 : product.name.includes('12.30') ? 12 : product.name.includes('14.00') ? 14 : product.name.includes('15.00') ? 15 : product.name.includes('10.00') ? 10 : 9;
  const slots: TimeSlot[] = [];
  for (let h = baseHour; h < baseHour + 4; h++) {
    for (const m of [0, 30]) {
      if (h >= 20) break;
      const start = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      const endM = m + 30;
      const endH = endM >= 60 ? h + 1 : h;
      const end = `${String(endH).padStart(2, '0')}:${String(endM % 60).padStart(2, '0')}`;
      slots.push({ time: start, endTime: end, available: Math.floor(Math.random() * 3) + 1 });
    }
  }
  return slots;
}

// ─── Toast Component ───
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: { bg: '#ECFDF5', border: '#A7F3D0', text: '#065F46', icon: '#10B981' },
    error: { bg: '#FEF2F2', border: '#FECACA', text: '#991B1B', icon: '#EF4444' },
    info: { bg: '#EFF6FF', border: '#BFDBFE', text: '#1E40AF', icon: '#3B82F6' },
  };
  const c = colors[type];

  return (
    <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-top-2 max-w-[400px]" style={{ animation: 'slideDown 0.3s ease-out' }}>
      <style>{`@keyframes slideDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="rounded-xl px-5 py-4 flex items-start gap-3 shadow-lg" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
        {type === 'success' && <CheckCircle2 size={20} color={c.icon} className="flex-shrink-0 mt-0.5" />}
        {type === 'error' && <XCircle size={20} color={c.icon} className="flex-shrink-0 mt-0.5" />}
        {type === 'info' && <Info size={20} color={c.icon} className="flex-shrink-0 mt-0.5" />}
        <p style={{ color: c.text, fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>{message}</p>
        <button onClick={onClose} className="flex-shrink-0 ml-2 mt-0.5 opacity-60 hover:opacity-100">
          <X size={16} color={c.text} />
        </button>
      </div>
    </div>
  );
}

// ─── Confirmation Modal ───
function ConfirmModal({ title, message, confirmLabel, cancelLabel, onConfirm, onCancel, danger }: {
  title: string; message: string; confirmLabel: string; cancelLabel: string;
  onConfirm: () => void; onCancel: () => void; danger?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-white rounded-2xl p-6 max-w-[420px] w-full" style={{ boxShadow: '0 24px 48px rgba(0,0,0,0.15)' }}>
        <div className="flex items-center gap-3 mb-4">
          {danger ? <AlertTriangle size={24} color="#E74C3C" /> : <Info size={24} color="#0365C4" />}
          <h3 className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>{title}</h3>
        </div>
        <p className="text-[#4A5568] mb-6" style={{ fontSize: 14, lineHeight: 1.6 }}>{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-5 py-2.5 rounded-lg border border-[#E8ECF4] text-[#6B7B94]" style={{ fontSize: 14, fontWeight: 600 }}>{cancelLabel}</button>
          <button onClick={onConfirm} className="px-5 py-2.5 rounded-lg text-white" style={{ background: danger ? '#E74C3C' : '#0365C4', fontSize: 14, fontWeight: 700 }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───
export function WebsiteReserverenScreen() {
  const navigate = useNavigate();

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Register state
  const [regData, setRegData] = useState({ email: '', password: '', confirmPassword: '', parentName: '', childName: '', phone: '' });
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});

  // Navigation
  const [view, setView] = useState<View>('login');
  const [viewHistory, setViewHistory] = useState<View[]>([]);

  // Booking
  const [selectedProduct, setSelectedProduct] = useState<LesProduct | null>(null);
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [lastBookedId, setLastBookedId] = useState('');

  // Knipkaarten
  const [selectedKnipkaartCategory, setSelectedKnipkaartCategory] = useState('');
  const [selectedKnipkaart, setSelectedKnipkaart] = useState<KnipkaartProduct | null>(null);

  // Data state
  const [reservationsPlanned, setReservationsPlanned] = useState<Reservation[]>(initialReservationsPlanned);
  const [reservationsHistory] = useState<Reservation[]>(initialReservationsHistory);
  const [knipkaarten, setKnipkaarten] = useState<Knipkaart[]>(initialKnipkaarten);
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [profileBackup, setProfileBackup] = useState<Profile>(initialProfile);
  const [editingProfile, setEditingProfile] = useState(false);

  // Password change
  const [pwData, setPwData] = useState({ current: '', new1: '', new2: '' });
  const [pwErrors, setPwErrors] = useState<Record<string, string>>({});

  // UI
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ title: string; message: string; confirmLabel: string; cancelLabel: string; onConfirm: () => void; danger?: boolean } | null>(null);
  const [expandedNavDropdown, setExpandedNavDropdown] = useState<string | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  }, []);

  const goTo = useCallback((v: View) => {
    setViewHistory(prev => [...prev, view]);
    setView(v);
    setAcceptTerms(false);
    setExpandedNavDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const goBack = useCallback(() => {
    if (viewHistory.length > 0) {
      const prev = viewHistory[viewHistory.length - 1];
      setViewHistory(h => h.slice(0, -1));
      setView(prev);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView('dashboard');
    }
  }, [viewHistory]);

  // ─── Login ───
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail.trim()) { setLoginError('Vul uw e-mailadres of gebruikersnaam in.'); return; }
    if (!loginPassword.trim()) { setLoginError('Vul uw wachtwoord in.'); return; }
    setIsLoggedIn(true);
    setView('dashboard');
    setViewHistory([]);
    showToast('Welkom terug! U bent succesvol ingelogd.', 'success');
  };

  const handleLogout = () => {
    setConfirmModal({
      title: 'Uitloggen',
      message: 'Weet u zeker dat u wilt uitloggen?',
      confirmLabel: 'Uitloggen',
      cancelLabel: 'Annuleren',
      danger: true,
      onConfirm: () => {
        setIsLoggedIn(false);
        setView('login');
        setViewHistory([]);
        setLoginEmail('');
        setLoginPassword('');
        setConfirmModal(null);
        showToast('U bent uitgelogd.', 'info');
      },
    });
  };

  // ─── Register ───
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!regData.email.trim()) errors.email = 'Verplicht';
    if (!regData.parentName.trim()) errors.parentName = 'Verplicht';
    if (!regData.childName.trim()) errors.childName = 'Verplicht';
    if (!regData.phone.trim()) errors.phone = 'Verplicht';
    if (!regData.password) errors.password = 'Verplicht';
    else if (regData.password.length < 6) errors.password = 'Minimaal 6 tekens';
    if (regData.password !== regData.confirmPassword) errors.confirmPassword = 'Wachtwoorden komen niet overeen';
    setRegErrors(errors);
    if (Object.keys(errors).length > 0) return;
    // "Register"
    const [firstName, ...rest] = regData.childName.split(' ');
    setProfile({
      ...profile,
      email: regData.email,
      parentName: regData.parentName,
      childFirstName: firstName || '',
      childLastName: rest.join(' ') || '',
      mobile: regData.phone,
    });
    setIsLoggedIn(true);
    setView('dashboard');
    setViewHistory([]);
    showToast('Account aangemaakt! Welkom bij Zwemschool Snorkeltje.', 'success');
  };

  // ─── Booking Flow ───
  const selectProductAndGoCalendar = (p: LesProduct) => {
    setSelectedProduct(p);
    setCalMonth(new Date().getMonth());
    setCalYear(new Date().getFullYear());
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setTimeSlots(generateTimeSlots(p));
    goTo('calendar');
  };

  const isDateAvailable = useCallback((day: number) => {
    const d = new Date(calYear, calMonth, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Must be at least 14 days in advance (business rule)
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 14);
    if (d < minDate) return 'past';
    const dow = d.getDay();
    if (dow === 0 || dow === 6) return 'unavailable'; // weekends
    return 'available';
  }, [calYear, calMonth]);

  const handleDateSelect = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    setSelectedDate(d);
    setSelectedTimeSlot(null);
    // Regenerate time slots for this date
    if (selectedProduct) {
      setTimeSlots(generateTimeSlots(selectedProduct));
    }
  };

  const handleConfirmBooking = () => {
    if (!selectedProduct || !selectedDate || !selectedTimeSlot) return;
    const newId = `RES-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    const newRes: Reservation = {
      id: newId,
      product: selectedProduct.name,
      date: formatDate(selectedDate),
      timeFrom: selectedTimeSlot.time,
      timeTo: selectedTimeSlot.endTime,
      status: 'Bevestigd',
      price: selectedProduct.price,
      paidWith: knipkaarten.find(k => k.balance > 0) ? `Knipkaart ${knipkaarten.find(k => k.balance > 0)?.id}` : 'Mollie betaling',
    };
    setReservationsPlanned(prev => [...prev, newRes]);
    // Deduct from knipkaart
    setKnipkaarten(prev => {
      const updated = [...prev];
      const idx = updated.findIndex(k => k.balance > 0);
      if (idx >= 0) updated[idx] = { ...updated[idx], balance: updated[idx].balance - 1 };
      return updated;
    });
    setLastBookedId(newId);
    goTo('booking-success');
  };

  // ─── Cancel Reservation ───
  const handleCancelReservation = (resId: string) => {
    const res = reservationsPlanned.find(r => r.id === resId);
    if (!res) return;
    setConfirmModal({
      title: 'Zwemles annuleren',
      message: `Weet u zeker dat u reservering ${resId} (${res.product} op ${res.date} om ${res.timeFrom}) wilt annuleren? ${res.paidWith.startsWith('Knipkaart') ? 'Het saldo wordt automatisch teruggestort op uw knipkaart.' : 'Stuur de annuleringsbevestiging naar info@zwemschoolsnorkeltje.nl voor restitutie.'}`,
      confirmLabel: 'Ja, annuleren',
      cancelLabel: 'Nee, behouden',
      danger: true,
      onConfirm: () => {
        setReservationsPlanned(prev => prev.filter(r => r.id !== resId));
        // Refund to knipkaart
        if (res.paidWith.startsWith('Knipkaart')) {
          const knipId = res.paidWith.replace('Knipkaart ', '');
          setKnipkaarten(prev => prev.map(k => k.id === knipId ? { ...k, balance: k.balance + 1 } : k));
        }
        setConfirmModal(null);
        showToast(`Reservering ${resId} is geannuleerd. ${res.paidWith.startsWith('Knipkaart') ? 'Saldo is teruggestort.' : ''}`, 'success');
      },
    });
  };

  // ─── Knipkaart Purchase ───
  const handleConfirmKnipkaart = () => {
    if (!selectedKnipkaart) return;
    const newId = `KNP-${Math.floor(Math.random() * 9000) + 1000}`;
    const today = new Date();
    const validDays = parseInt(selectedKnipkaart.validity) || 365;
    const validUntil = new Date(today);
    validUntil.setDate(validUntil.getDate() + validDays);
    const newKnip: Knipkaart = {
      id: newId,
      type: selectedKnipkaart.name,
      balance: selectedKnipkaart.count,
      total: selectedKnipkaart.count,
      validFrom: formatDate(today),
      validUntil: formatDate(validUntil),
      price: selectedKnipkaart.price,
    };
    setKnipkaarten(prev => [...prev, newKnip]);
    goTo('knipkaart-success');
    showToast(`Knipkaart ${newId} is besteld! €${selectedKnipkaart.price},00`, 'success');
  };

  // ─── Profile ───
  const handleSaveProfile = () => {
    setEditingProfile(false);
    setProfileBackup(profile);
    showToast('Profiel succesvol opgeslagen.', 'success');
  };

  const handleCancelProfile = () => {
    setProfile(profileBackup);
    setEditingProfile(false);
  };

  const handleStartEditProfile = () => {
    setProfileBackup({ ...profile });
    setEditingProfile(true);
  };

  // ─���─ Password Change ───
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!pwData.current) errors.current = 'Verplicht';
    if (!pwData.new1) errors.new1 = 'Verplicht';
    else if (pwData.new1.length < 6) errors.new1 = 'Minimaal 6 tekens';
    if (pwData.new1 !== pwData.new2) errors.new2 = 'Wachtwoorden komen niet overeen';
    setPwErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setPwData({ current: '', new1: '', new2: '' });
    goTo('mijn-profiel');
    showToast('Wachtwoord succesvol gewijzigd.', 'success');
  };

  // ─── Calendar nav ───
  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  };
  const goToday = () => {
    const n = new Date();
    setCalMonth(n.getMonth());
    setCalYear(n.getFullYear());
  };

  // ─── Breadcrumb ───
  const Breadcrumb = ({ items }: { items: { label: string; onClick?: () => void }[] }) => (
    <div className="flex items-center gap-1.5 text-[#8E9BB3] flex-wrap mb-6" style={{ fontSize: 13 }}>
      <button onClick={() => navigate('/website')} className="hover:text-[#0365C4] flex items-center gap-1"><Home size={13} /> Home</button>
      <ChevronRight size={11} />
      <button onClick={() => goTo('dashboard')} className="hover:text-[#0365C4]">Reserveren</button>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={11} />
          {item.onClick ? (
            <button onClick={item.onClick} className="hover:text-[#0365C4]">{item.label}</button>
          ) : (
            <span className="text-[#1A1A2E]" style={{ fontWeight: 600 }}>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );

  // ─── Form Field ───
  const FormField = ({ label, value, onChange, readOnly, error, type = 'text', options }: {
    label: string; value: string; onChange?: (v: string) => void; readOnly?: boolean;
    error?: string; type?: string; options?: string[];
  }) => (
    <div>
      <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>{label}</label>
      {options ? (
        <select value={value} onChange={e => onChange?.(e.target.value)} disabled={readOnly}
          className="w-full px-3 py-2.5 rounded-lg border text-[#1A1A2E]" style={{ fontSize: 14, background: readOnly ? '#F4F7FC' : '#fff', borderColor: error ? '#E74C3C' : '#E8ECF4' }}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} value={value} onChange={e => onChange?.(e.target.value)} readOnly={readOnly}
          className="w-full px-3 py-2.5 rounded-lg border text-[#1A1A2E] outline-none focus:border-[#0365C4]"
          style={{ fontSize: 14, background: readOnly ? '#F4F7FC' : '#fff', borderColor: error ? '#E74C3C' : '#E8ECF4' }} />
      )}
      {error && <p className="text-[#E74C3C] mt-1" style={{ fontSize: 12 }}>{error}</p>}
    </div>
  );

  // ════════════════════════════════════════
  // ─── NOT LOGGED IN ───
  // ════════════════════════════════════════
  if (!isLoggedIn) {
    return (
      <WebsiteLayout>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

        <section className="relative h-[200px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)' }}>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8 w-full">
              <h1 className="text-white" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>
                {view === 'register' ? 'Account aanmaken' : view === 'forgot-password' ? 'Wachtwoord vergeten' : 'Reserveringspagina'}
              </h1>
              <p className="text-white/80 mt-2" style={{ fontSize: 16 }}>Zwemschool Snorkeltje</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 40" fill="none" className="w-full block"><path d="M0,20 C360,40 720,0 1080,20 C1260,30 1380,35 1440,30 L1440,40 L0,40 Z" fill="white" /></svg>
          </div>
        </section>

        <div className="max-w-[700px] mx-auto px-4 sm:px-8 py-8 pb-16">
          <div className="text-center mb-8">
            <img src={snorkeltjeLogo} alt="Snorkeltje" className="h-14 w-auto mx-auto mb-4" onError={(e) => { e.currentTarget.src = snorkeltjeLogoPng; }} />
            <h2 className="text-[#1A1A2E] mb-2" style={{ fontSize: 24, fontWeight: 700 }}>Reserveringspagina Zwemschool Snorkeltje</h2>
            <p className="text-[#6B7B94]" style={{ fontSize: 14, lineHeight: 1.7 }}>
              Boek makkelijk en snel een zwemles, bekijk uw reserveringen, annuleer een reservering, bestel een knipkaart en/of controleer het saldo en de geldigheid van uw knipkaarten.
            </p>
          </div>

          {/* ── LOGIN VIEW ── */}
          {view === 'login' && (
            <>
              <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} color="#E65100" className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#E65100]" style={{ fontSize: 15, fontWeight: 700 }}>U BENT NIET INGELOGD</p>
                    <p className="text-[#4A5568] mt-1" style={{ fontSize: 13, lineHeight: 1.6 }}>
                      U heeft een account nodig om een zwemles te boeken, een knipkaart te bestellen of om uw reserveringen en knipkaarten te bekijken.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleLogin} className="bg-white rounded-2xl p-6 lg:p-8 space-y-4" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #F0F4FA' }}>
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 20, fontWeight: 700 }}>Inloggen</h3>
                {loginError && (
                  <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-4 py-2">
                    <p className="text-[#991B1B]" style={{ fontSize: 13 }}>{loginError}</p>
                  </div>
                )}
                <div>
                  <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>E-mailadres / Gebruikersnaam</label>
                  <input type="text" placeholder="uw@email.nl" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E] placeholder:text-[#C0C8D4]" style={{ fontSize: 14 }} />
                </div>
                <div>
                  <label className="text-[#6B7B94] block mb-1" style={{ fontSize: 12, fontWeight: 600 }}>Wachtwoord</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} placeholder="Uw wachtwoord" value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E] placeholder:text-[#C0C8D4]" style={{ fontSize: 14 }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0AEC0] hover:text-[#4A5568]">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button type="button" onClick={() => setView('forgot-password')} className="text-[#0365C4] hover:underline" style={{ fontSize: 13 }}>
                    Wachtwoord vergeten?
                  </button>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button type="submit" className="flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all hover:opacity-90" style={{ background: '#0365C4', fontSize: 14, fontWeight: 700 }}>
                    <LogIn size={16} /> Inloggen
                  </button>
                  <button type="button" onClick={() => setView('register')} className="flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all hover:opacity-90" style={{ background: '#27AE60', fontSize: 14, fontWeight: 700 }}>
                    <UserPlus size={16} /> Account aanmaken
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ── REGISTER VIEW ── */}
          {view === 'register' && (
            <form onSubmit={handleRegister} className="bg-white rounded-2xl p-6 lg:p-8 space-y-4" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #F0F4FA' }}>
              <div className="flex items-center gap-3 mb-2">
                <button type="button" onClick={() => setView('login')} className="text-[#6B7B94] hover:text-[#0365C4]"><ArrowLeft size={20} /></button>
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 20, fontWeight: 700 }}>Account aanmaken</h3>
              </div>
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-3">
                <p className="text-[#1E40AF]" style={{ fontSize: 13, lineHeight: 1.5 }}>
                  <strong>Let op:</strong> Maak alleen een account aan nadat u een uitnodiging van ons heeft ontvangen.
                </p>
              </div>
              <FormField label="E-mailadres *" value={regData.email} onChange={v => setRegData({ ...regData, email: v })} error={regErrors.email} type="email" />
              <FormField label="Voor- en achternaam ouder/verzorger *" value={regData.parentName} onChange={v => setRegData({ ...regData, parentName: v })} error={regErrors.parentName} />
              <FormField label="Voor- en achternaam kind *" value={regData.childName} onChange={v => setRegData({ ...regData, childName: v })} error={regErrors.childName} />
              <FormField label="Telefoonnummer *" value={regData.phone} onChange={v => setRegData({ ...regData, phone: v })} error={regErrors.phone} type="tel" />
              <FormField label="Wachtwoord *" value={regData.password} onChange={v => setRegData({ ...regData, password: v })} error={regErrors.password} type="password" />
              <FormField label="Bevestig wachtwoord *" value={regData.confirmPassword} onChange={v => setRegData({ ...regData, confirmPassword: v })} error={regErrors.confirmPassword} type="password" />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setView('login')} className="px-6 py-3 rounded-lg border border-[#E8ECF4] text-[#6B7B94]" style={{ fontSize: 14, fontWeight: 600 }}>Terug</button>
                <button type="submit" className="flex items-center gap-2 px-6 py-3 rounded-lg text-white" style={{ background: '#27AE60', fontSize: 14, fontWeight: 700 }}>
                  <UserPlus size={16} /> Registreren
                </button>
              </div>
            </form>
          )}

          {/* ── FORGOT PASSWORD ── */}
          {view === 'forgot-password' && (
            <div className="bg-white rounded-2xl p-6 lg:p-8 space-y-4" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #F0F4FA' }}>
              <div className="flex items-center gap-3 mb-2">
                <button onClick={() => setView('login')} className="text-[#6B7B94] hover:text-[#0365C4]"><ArrowLeft size={20} /></button>
                <h3 className="text-[#1A1A2E]" style={{ fontSize: 20, fontWeight: 700 }}>Wachtwoord vergeten</h3>
              </div>
              <p className="text-[#6B7B94]" style={{ fontSize: 14 }}>Vul uw e-mailadres in. U ontvangt een link om uw wachtwoord te herstellen.</p>
              <input type="email" placeholder="uw@email.nl" className="w-full px-4 py-3 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 14 }} />
              <div className="flex gap-3">
                <button onClick={() => setView('login')} className="px-6 py-3 rounded-lg border border-[#E8ECF4] text-[#6B7B94]" style={{ fontSize: 14, fontWeight: 600 }}>Terug</button>
                <button onClick={() => { setView('login'); showToast('Een e-mail met instructies is verzonden.', 'info'); }} className="px-6 py-3 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 14, fontWeight: 700 }}>Verstuur</button>
              </div>
            </div>
          )}

          {/* App promo */}
          <div className="mt-8 bg-[#F4F7FC] rounded-2xl p-6 text-center">
            <Smartphone size={32} color="#0365C4" className="mx-auto mb-3" />
            <h3 className="text-[#1A1A2E] mb-2" style={{ fontSize: 18, fontWeight: 700 }}>Download de Snorkeltje App</h3>
            <p className="text-[#6B7B94] mb-4" style={{ fontSize: 14 }}>Reserveren, afmelden, voortgang bekijken — alles in één app!</p>
            <div className="flex justify-center gap-3">
              <button className="px-5 py-2.5 rounded-lg bg-[#1A1A2E] text-white" style={{ fontSize: 13, fontWeight: 600 }}>App Store</button>
              <button className="px-5 py-2.5 rounded-lg bg-[#1A1A2E] text-white" style={{ fontSize: 13, fontWeight: 600 }}>Google Play</button>
            </div>
          </div>
        </div>
      </WebsiteLayout>
    );
  }

  // ════════════════════════════════════════
  // ─── LOGGED IN ───
  // ════════════════════════════════════════

  const isNavActive = (views: View[]) => views.includes(view);

  const ReservationNav = () => (
    <div className="bg-[#1A2A3A] sticky top-0 z-40">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="flex items-center gap-0.5 overflow-x-auto py-1.5" style={{ scrollbarWidth: 'none' }}>
          {/* Logo */}
          <button onClick={() => goTo('dashboard')} className="flex items-center gap-2 pr-4 mr-2 border-r border-white/10">
            <img src={snorkeltjeLogo} alt="" className="h-7 w-auto brightness-0 invert" onError={(e) => { e.currentTarget.src = snorkeltjeLogoPng; e.currentTarget.classList.remove('brightness-0', 'invert'); }} />
          </button>

          <NavBtn label="Homepage" active={view === 'dashboard'} onClick={() => goTo('dashboard')} />
          <NavBtn label="Boek een les" active={isNavActive(['boek-een-les', 'vast-tijdstip', 'extra-1op1', 'extra-1op2', 'vakantie', 'calendar', 'checkout'])} onClick={() => goTo('boek-een-les')} />

          {/* Bestel Knipkaart dropdown */}
          <div className="relative">
            <button
              onClick={() => setExpandedNavDropdown(expandedNavDropdown === 'knipkaart' ? null : 'knipkaart')}
              className="px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-all flex-shrink-0 flex items-center gap-1"
              style={{ fontSize: 13, fontWeight: isNavActive(['knipkaarten-menu', 'knipkaarten-list', 'knipkaart-checkout']) ? 700 : 500, background: isNavActive(['knipkaarten-menu', 'knipkaarten-list', 'knipkaart-checkout']) ? 'rgba(255,255,255,0.12)' : 'transparent' }}
            >
              Bestel Knipkaart {expandedNavDropdown === 'knipkaart' ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
            {expandedNavDropdown === 'knipkaart' && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl py-1 min-w-[200px] z-50" style={{ border: '1px solid #E8ECF4' }}>
                {knipkaartCategories.map(cat => (
                  <button key={cat.key} onClick={() => { setSelectedKnipkaartCategory(cat.key); goTo('knipkaarten-list'); setExpandedNavDropdown(null); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#F4F7FC] text-[#1A1A2E] flex items-center gap-2" style={{ fontSize: 13 }}>
                    <span className="w-6 h-6 rounded flex items-center justify-center text-white" style={{ background: cat.color, fontSize: 9, fontWeight: 800 }}>{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mijn account dropdown */}
          <div className="relative">
            <button
              onClick={() => setExpandedNavDropdown(expandedNavDropdown === 'account' ? null : 'account')}
              className="px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-all flex-shrink-0 flex items-center gap-1"
              style={{ fontSize: 13, fontWeight: isNavActive(['mijn-knipkaarten', 'reserveringen-gepland', 'reserveringen-geschiedenis', 'mijn-profiel']) ? 700 : 500, background: isNavActive(['mijn-knipkaarten', 'reserveringen-gepland', 'reserveringen-geschiedenis', 'mijn-profiel']) ? 'rgba(255,255,255,0.12)' : 'transparent' }}
            >
              Mijn account {expandedNavDropdown === 'account' ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
            {expandedNavDropdown === 'account' && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl py-1 min-w-[240px] z-50" style={{ border: '1px solid #E8ECF4' }}>
                <button onClick={() => { goTo('mijn-knipkaarten'); setExpandedNavDropdown(null); }} className="w-full text-left px-4 py-2.5 hover:bg-[#F4F7FC] text-[#1A1A2E] flex items-center gap-2" style={{ fontSize: 13 }}><CreditCard size={15} color="#0365C4" /> Mijn knipkaarten</button>
                <button onClick={() => { goTo('reserveringen-gepland'); setExpandedNavDropdown(null); }} className="w-full text-left px-4 py-2.5 hover:bg-[#F4F7FC] text-[#1A1A2E] flex items-center gap-2" style={{ fontSize: 13 }}><Calendar size={15} color="#27AE60" /> Mijn reserveringen (gepland)</button>
                <button onClick={() => { goTo('reserveringen-geschiedenis'); setExpandedNavDropdown(null); }} className="w-full text-left px-4 py-2.5 hover:bg-[#F4F7FC] text-[#1A1A2E] flex items-center gap-2" style={{ fontSize: 13 }}><BookOpen size={15} color="#8E44AD" /> Mijn reserveringen (geschiedenis)</button>
                <button onClick={() => { goTo('mijn-profiel'); setExpandedNavDropdown(null); }} className="w-full text-left px-4 py-2.5 hover:bg-[#F4F7FC] text-[#1A1A2E] flex items-center gap-2" style={{ fontSize: 13 }}><User size={15} color="#E67E22" /> Mijn profiel</button>
              </div>
            )}
          </div>

          <div className="flex-1" />

          <button onClick={() => navigate('/website/contact')} className="px-3 py-2 text-white/60 hover:text-white transition-all flex-shrink-0" style={{ fontSize: 13 }}>
            Contact
          </button>
          <button onClick={handleLogout} className="px-3 py-2 text-white/60 hover:text-[#E74C3C] transition-all flex-shrink-0 flex items-center gap-1" style={{ fontSize: 13 }}>
            <Lock size={13} /> Uitloggen
          </button>
        </div>
      </div>
    </div>
  );

  const NavBtn = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button onClick={onClick} className="px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-all flex-shrink-0"
      style={{ fontSize: 13, fontWeight: active ? 700 : 500, background: active ? 'rgba(255,255,255,0.12)' : 'transparent' }}>
      {label}
    </button>
  );

  // Close dropdown on outside click
  const handleContentClick = () => { if (expandedNavDropdown) setExpandedNavDropdown(null); };

  return (
    <WebsiteLayout>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {confirmModal && <ConfirmModal {...confirmModal} onCancel={() => setConfirmModal(null)} />}
      <ReservationNav />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-6 min-h-[600px]" onClick={handleContentClick}>

        {/* ═══════ DASHBOARD ═══════ */}
        {view === 'dashboard' && (
          <>
            <Breadcrumb items={[{ label: 'Reserveringspagina' }]} />
            <div className="flex items-center justify-between mb-2 flex-wrap gap-3">
              <h1 className="text-[#1A1A2E]" style={{ fontSize: 26, fontWeight: 800 }}>Reserveringspagina Zwemschool Snorkeltje</h1>
              <span className="text-[#6B7B94] flex items-center gap-1.5" style={{ fontSize: 13 }}><User size={14} /> {profile.parentName}</span>
            </div>
            <p className="text-[#6B7B94] mb-8 max-w-[900px]" style={{ fontSize: 14, lineHeight: 1.7 }}>
              Boek makkelijk en snel een zwemles, bekijk uw reserveringen, annuleer een reservering, bestel een knipkaart en/of controleer het saldo en de geldigheid van uw knipkaarten.
              {' '}<button onClick={() => goTo('handleiding')} className="text-[#0365C4] hover:underline inline-flex items-center gap-1"><FileText size={13} /> Handleiding</button>
            </p>

            {/* 3 Main cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                { icon: Calendar, title: 'Boek een les', desc: 'Plan een standaard zwemles op een vast tijdstip of plan een extra- of inhaalzwemles op een dag en tijdstip naar keuze.', btn: 'Boek een les', color: '#0365C4', target: 'boek-een-les' as View },
                { icon: BookOpen, title: 'Mijn reserveringen', desc: 'Bekijk uw reserveringen, zowel de geplande zwemlessen als de zwemlessen die reeds hebben plaatsgevonden.', btn: 'Mijn reserveringen', color: '#27AE60', target: 'reserveringen-gepland' as View },
                { icon: CreditCard, title: 'Mijn knipkaarten', desc: 'Controleer het saldo en de geldigheid van uw knipkaarten.', btn: 'Mijn knipkaarten', color: '#00C1FF', target: 'mijn-knipkaarten' as View },
              ].map(card => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="bg-white rounded-2xl p-6 flex flex-col hover:translate-y-[-3px] transition-all" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #E8ECF4' }}>
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ background: `${card.color}12` }}>
                      <Icon size={26} color={card.color} />
                    </div>
                    <h3 className="text-[#1A1A2E] mb-2" style={{ fontSize: 19, fontWeight: 700 }}>{card.title}</h3>
                    <p className="text-[#6B7B94] mb-5 flex-1" style={{ fontSize: 14, lineHeight: 1.6 }}>{card.desc}</p>
                    <button onClick={() => goTo(card.target)} className="w-full py-3 rounded-xl text-white transition-all hover:opacity-90" style={{ background: card.color, fontSize: 14, fontWeight: 700 }}>
                      {card.btn}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Quick actions */}
            <h3 className="text-[#1A1A2E] mb-3" style={{ fontSize: 16, fontWeight: 700 }}>Snelle acties</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { icon: ShoppingCart, label: 'Bestel Knipkaart', target: 'knipkaarten-menu' as View, color: '#FF5C00' },
                { icon: XCircle, label: 'Les annuleren', target: 'reserveringen-gepland' as View, color: '#E74C3C' },
                { icon: User, label: 'Mijn profiel', target: 'mijn-profiel' as View, color: '#8E44AD' },
                { icon: Clock, label: 'Dag/tijd wijzigen', target: 'knipkaarten-list' as View, color: '#E67E22', catKey: 'wijzigen' },
                { icon: BookOpen, label: 'Geschiedenis', target: 'reserveringen-geschiedenis' as View, color: '#2C3E50' },
                { icon: Phone, label: 'Contact', target: null, color: '#0365C4' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button key={item.label}
                    onClick={() => {
                      if (!item.target) { navigate('/website/contact'); return; }
                      if ((item as any).catKey) setSelectedKnipkaartCategory((item as any).catKey);
                      goTo(item.target);
                    }}
                    className="bg-white rounded-xl p-4 text-center hover:translate-y-[-2px] transition-all" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)', border: '1px solid #F0F4FA' }}>
                    <Icon size={22} color={item.color} className="mx-auto mb-2" />
                    <span className="text-[#1A1A2E] block" style={{ fontSize: 12, fontWeight: 600 }}>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active knipkaarten summary */}
            {knipkaarten.filter(k => k.balance > 0).length > 0 && (
              <div className="mt-8 bg-[#E8F4FD] rounded-xl p-5" style={{ border: '1px solid #D0E8F8' }}>
                <h3 className="text-[#0365C4] mb-3 flex items-center gap-2" style={{ fontSize: 15, fontWeight: 700 }}><CreditCard size={18} /> Actieve knipkaarten</h3>
                <div className="flex flex-wrap gap-4">
                  {knipkaarten.filter(k => k.balance > 0).map(k => (
                    <div key={k.id} className="bg-white rounded-lg px-4 py-3" style={{ border: '1px solid #E8ECF4' }}>
                      <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{k.id}</p>
                      <p className="text-[#6B7B94]" style={{ fontSize: 12 }}>{k.type}</p>
                      <p className="mt-1"><span className="text-[#27AE60]" style={{ fontSize: 16, fontWeight: 800 }}>{k.balance}</span><span className="text-[#A0AEC0]" style={{ fontSize: 13 }}>/{k.total} over</span></p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ═══════ HANDLEIDING ═══════ */}
        {view === 'handleiding' && (
          <>
            <Breadcrumb items={[{ label: 'Handleiding' }]} />
            <div className="max-w-[800px]">
              <h2 className="text-[#1A1A2E] mb-4" style={{ fontSize: 24, fontWeight: 700 }}>Handleiding Reserveringssysteem</h2>
              <div className="bg-white rounded-2xl p-6 space-y-5" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #F0F4FA' }}>
                {[
                  { title: '1. Zwemles boeken', text: 'Ga naar "Boek een les" en kies het type les: Vast tijdstip, Extra 1-op-1, Extra 1-op-2, of Vakantie zwemles. Selecteer het gewenste product, kies een datum in de kalender (minimaal 14 dagen van tevoren) en selecteer een tijdslot. Bevestig uw reservering.' },
                  { title: '2. Les annuleren', text: 'Ga naar "Mijn reserveringen" en klik op het annuleer-icoon. Annuleren kan kosteloos tot 24 uur voor de les (96 uur voor vakantielessen). Bij betaling via knipkaart wordt het saldo automatisch teruggestort.' },
                  { title: '3. Knipkaart bestellen', text: 'Ga naar "Bestel Knipkaart" en kies de gewenste categorie en pakket. Na bevestiging wordt de knipkaart direct aan uw account toegevoegd. Knipkaarten zijn 365 dagen geldig (behalve survival: 84 dagen).' },
                  { title: '4. Knipkaarten bekijken', text: 'Ga naar "Mijn knipkaarten" om het saldo en de geldigheid van al uw knipkaarten te controleren.' },
                  { title: '5. Profiel beheren', text: 'Ga naar "Mijn profiel" om uw persoonlijke gegevens te bekijken en te wijzigen. U kunt hier ook uw wachtwoord wijzigen.' },
                ].map(s => (
                  <div key={s.title}>
                    <h4 className="text-[#1A1A2E] mb-1" style={{ fontSize: 16, fontWeight: 700 }}>{s.title}</h4>
                    <p className="text-[#6B7B94]" style={{ fontSize: 14, lineHeight: 1.6 }}>{s.text}</p>
                  </div>
                ))}
              </div>
              <button onClick={goBack} className="mt-4 flex items-center gap-2 text-[#0365C4] hover:underline" style={{ fontSize: 14 }}><ArrowLeft size={16} /> Terug</button>
            </div>
          </>
        )}

        {/* ═══════ BOEK EEN LES ═══════ */}
        {view === 'boek-een-les' && (
          <>
            <Breadcrumb items={[{ label: 'Boek een les' }]} />
            <h2 className="text-[#1A1A2E] mb-2" style={{ fontSize: 24, fontWeight: 700 }}>Boek een les</h2>
            <p className="text-[#6B7B94] mb-8" style={{ fontSize: 14 }}>Plan makkelijk en snel een zwemles op een vast tijdstip of plan een extra- of een inhaalzwemles op een dag en tijdstip naar keuze.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { title: 'Vast tijdstip', desc: 'Plan een standaard zwemles op een vast tijdstip.', target: 'vast-tijdstip' as View, color: '#0365C4', icon: Clock },
                { title: 'Extra zwemles 1-op-1', desc: 'Plan een extra- of een inhaalzwemles 1-op-1 op een dag en tijdstip naar keuze.', target: 'extra-1op1' as View, color: '#00C1FF', icon: Calendar },
                { title: 'Extra zwemles 1-op-2', desc: 'Plan een extra- of een inhaalzwemles 1-op-2 op een dag en tijdstip naar keuze.', target: 'extra-1op2' as View, color: '#27AE60', icon: Calendar },
                { title: 'Vakantie zwemles', desc: 'Plan hier zwemles in tijdens de vakantie.', target: 'vakantie' as View, color: '#FF5C00', icon: MapPin },
              ].map(opt => {
                const Icon = opt.icon;
                return (
                  <button key={opt.title} onClick={() => goTo(opt.target)} className="bg-white rounded-2xl p-6 text-left hover:translate-y-[-3px] transition-all group" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #F0F4FA' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${opt.color}15` }}><Icon size={22} color={opt.color} /></div>
                    <h3 className="text-[#1A1A2E] mb-2" style={{ fontSize: 18, fontWeight: 700 }}>{opt.title}</h3>
                    <p className="text-[#6B7B94] mb-4" style={{ fontSize: 14, lineHeight: 1.5 }}>{opt.desc}</p>
                    <span className="inline-flex items-center gap-1 px-5 py-2.5 rounded-lg text-white group-hover:opacity-90 transition-all" style={{ background: opt.color, fontSize: 14, fontWeight: 700 }}>Boeken <ChevronRight size={16} /></span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* ═══════ PRODUCT LISTS ═══════ */}
        {(view === 'vast-tijdstip' || view === 'extra-1op1' || view === 'extra-1op2') && (
          <>
            <Breadcrumb items={[
              { label: 'Boek een les', onClick: () => goTo('boek-een-les') },
              { label: view === 'vast-tijdstip' ? 'Vast tijdstip' : view === 'extra-1op1' ? 'Extra 1-op-1' : 'Extra 1-op-2' },
            ]} />
            <h2 className="text-[#1A1A2E] mb-6" style={{ fontSize: 22, fontWeight: 700 }}>
              {view === 'vast-tijdstip' ? 'Vast tijdstip' : view === 'extra-1op1' ? 'Extra zwemles 1-op-1' : 'Extra zwemles 1-op-2'}
            </h2>
            <div className="space-y-4">
              {(view === 'vast-tijdstip' ? vastTijdstipProducts : view === 'extra-1op1' ? extra1op1Products : extra1op2Products).map(p => {
                const color = view === 'vast-tijdstip' ? '#0365C4' : view === 'extra-1op1' ? '#00C1FF' : '#27AE60';
                return (
                  <div key={p.id} className="bg-white rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:translate-y-[-2px] transition-all" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #F0F4FA' }}>
                    <div className="w-full sm:w-[180px] h-[120px] sm:h-auto flex-shrink-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)` }}>
                      <div className="text-center text-white p-3"><p style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.2 }}>{p.label}</p></div>
                    </div>
                    <div className="flex-1 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>{p.name}</h3>
                        <p className="text-[#6B7B94] mt-1" style={{ fontSize: 13 }}>{p.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[#FF5C00]" style={{ fontSize: 14, fontWeight: 700 }}>€{p.price},00</span>
                          <span className="text-[#A0AEC0]" style={{ fontSize: 12 }}>{p.duration}</span>
                          <span className="text-[#A0AEC0]" style={{ fontSize: 12 }}>{p.location}</span>
                        </div>
                      </div>
                      <button onClick={() => selectProductAndGoCalendar(p)} className="px-5 py-2.5 rounded-lg text-white flex-shrink-0 hover:opacity-90 transition-all" style={{ background: color, fontSize: 14, fontWeight: 700 }}>
                        Reserveren!
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <button onClick={goBack} className="mt-6 flex items-center gap-2 text-[#0365C4] hover:underline" style={{ fontSize: 14, fontWeight: 600 }}><ArrowLeft size={16} /> Terug</button>
          </>
        )}

        {/* ═══════ VAKANTIE ═══════ */}
        {view === 'vakantie' && (
          <>
            <Breadcrumb items={[{ label: 'Boek een les', onClick: () => goTo('boek-een-les') }, { label: 'Vakantie zwemles' }]} />
            <h2 className="text-[#1A1A2E] mb-6" style={{ fontSize: 22, fontWeight: 700 }}>Vakantie zwemles</h2>
            <p className="text-[#6B7B94] mb-6" style={{ fontSize: 14 }}>Plan hier zwemles in tijdens de vakantie op een van onze locaties.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vakantieLocations.map(loc => (
                <button key={loc.id} onClick={() => selectProductAndGoCalendar({ id: loc.id, name: loc.name, description: `Plan in ${loc.location} een vakantie zwemles in.`, type: 'vakantie', label: 'VAKANTIE', price: 39, duration: '30 min', location: loc.location })}
                  className="bg-white rounded-xl p-5 text-left hover:translate-y-[-2px] transition-all" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid #F0F4FA' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)' }}><MapPin size={18} color="#fff" /></div>
                  <h4 className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>{loc.name}</h4>
                  <p className="text-[#6B7B94] mt-1" style={{ fontSize: 13 }}>Plan in {loc.location} een vakantie zwemles in.</p>
                  <span className="inline-block mt-3 px-4 py-2 rounded-lg text-white" style={{ background: '#FF5C00', fontSize: 13, fontWeight: 700 }}>Boeken</span>
                </button>
              ))}
            </div>
            <button onClick={goBack} className="mt-6 flex items-center gap-2 text-[#0365C4] hover:underline" style={{ fontSize: 14, fontWeight: 600 }}><ArrowLeft size={16} /> Terug</button>
          </>
        )}

        {/* ═══════ CALENDAR ═══════ */}
        {view === 'calendar' && selectedProduct && (
          <>
            <Breadcrumb items={[{ label: 'Boek een les', onClick: () => goTo('boek-een-les') }, { label: 'Kalender' }]} />
            <h2 className="text-[#1A1A2E] mb-1" style={{ fontSize: 20, fontWeight: 700 }}>KALENDER {selectedProduct.name.toUpperCase()}</h2>
            <p className="text-[#6B7B94] mb-6" style={{ fontSize: 14 }}>Selecteer een beschikbare datum (minimaal 14 dagen van tevoren)</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #F0F4FA' }}>
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-[#F4F7FC]"><ArrowLeft size={18} /></button>
                    <div className="flex items-center gap-3">
                      <h3 className="text-[#1A1A2E]" style={{ fontSize: 17, fontWeight: 700 }}>{monthNames[calMonth]} {calYear}</h3>
                      <button onClick={goToday} className="px-3 py-1 rounded-md bg-[#F4F7FC] text-[#0365C4] hover:bg-[#E8F4FD]" style={{ fontSize: 12, fontWeight: 600 }}>Vandaag</button>
                    </div>
                    <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-[#F4F7FC]"><ArrowRight size={18} /></button>
                  </div>
                  <div className="grid grid-cols-8 gap-px text-center" style={{ fontSize: 13 }}>
                    <div className="text-[#A0AEC0] py-2" style={{ fontWeight: 700, fontSize: 11 }}>Wk</div>
                    {dayLabels.map(d => <div key={d} className="text-[#6B7B94] py-2" style={{ fontWeight: 700, fontSize: 12 }}>{d}</div>)}
                    {(() => {
                      const days = getCalendarDays(calYear, calMonth);
                      const rows: (number | null)[][] = [];
                      for (let i = 0; i < days.length; i += 7) rows.push(days.slice(i, i + 7));
                      return rows.map((row, ri) => {
                        const firstDay = row.find(d => d !== null);
                        const wk = firstDay ? getWeekNumber(new Date(calYear, calMonth, firstDay)) : '';
                        return (
                          <div key={ri} className="contents">
                            <div className="text-[#C0C8D4] py-2 flex items-center justify-center" style={{ fontSize: 10, fontWeight: 600 }}>{wk}</div>
                            {row.map((day, di) => {
                              if (day === null) return <div key={di} className="py-2" />;
                              const status = isDateAvailable(day);
                              const isSel = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === calMonth && selectedDate.getFullYear() === calYear;
                              const isToday = day === new Date().getDate() && calMonth === new Date().getMonth() && calYear === new Date().getFullYear();
                              return (
                                <button key={di} disabled={status !== 'available'}
                                  onClick={() => handleDateSelect(day)}
                                  className={`py-2 rounded-lg transition-all relative ${status === 'available' ? 'cursor-pointer hover:ring-2 hover:ring-[#0365C4]/30' : 'cursor-default'}`}
                                  style={{
                                    background: isSel ? '#0365C4' : status === 'available' ? '#E8F5E9' : 'transparent',
                                    color: isSel ? '#fff' : status === 'available' ? '#1B5E20' : status === 'past' ? '#D0D5DD' : '#E0E0E0',
                                    fontWeight: isSel || isToday ? 700 : 500,
                                  }}>
                                  {day}
                                  {isToday && !isSel && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0365C4]" />}
                                </button>
                              );
                            })}
                          </div>
                        );
                      });
                    })()}
                  </div>
                  <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#F0F4FA]" style={{ fontSize: 12 }}>
                    <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded bg-[#E8F5E9]" /><span className="text-[#6B7B94]">Beschikbaar</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded bg-[#0365C4]" /><span className="text-[#6B7B94]">Geselecteerd</span></div>
                  </div>
                </div>
              </div>

              {/* Side panel */}
              <div>
                {selectedDate ? (
                  <div className="bg-white rounded-2xl p-5 sticky top-20" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #F0F4FA' }}>
                    <h3 className="text-[#0365C4] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>BEVESTIGEN RESERVERING</h3>
                    <div className="space-y-2 mb-4 pb-4 border-b border-[#F0F4FA]">
                      <p className="text-[#6B7B94]" style={{ fontSize: 13 }}><span className="text-[#1A1A2E]" style={{ fontWeight: 600 }}>Product:</span> {selectedProduct.name}</p>
                      <p className="text-[#6B7B94]" style={{ fontSize: 13 }}><span className="text-[#1A1A2E]" style={{ fontWeight: 600 }}>Datum:</span> {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}</p>
                      <p className="text-[#6B7B94]" style={{ fontSize: 13 }}><span className="text-[#1A1A2E]" style={{ fontWeight: 600 }}>Prijs:</span> €{selectedProduct.price},00</p>
                    </div>
                    <p className="text-[#6B7B94] mb-2" style={{ fontSize: 12, fontWeight: 600 }}>Beschikbare tijdsloten:</p>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {timeSlots.map(slot => {
                        const isSel = selectedTimeSlot?.time === slot.time;
                        return (
                          <button key={slot.time} onClick={() => setSelectedTimeSlot(slot)}
                            className="w-full py-2.5 rounded-lg text-left px-4 transition-all flex items-center justify-between"
                            style={{ background: isSel ? '#0365C4' : '#F4F7FC', color: isSel ? '#fff' : '#1A1A2E', fontSize: 13, fontWeight: isSel ? 700 : 500, border: `1px solid ${isSel ? '#0365C4' : '#E8ECF4'}` }}>
                            <span>{slot.time} - {slot.endTime}</span>
                            <span style={{ fontSize: 11, opacity: 0.8 }}>Vrij: {slot.available}</span>
                          </button>
                        );
                      })}
                    </div>
                    {selectedTimeSlot && (
                      <button onClick={() => goTo('checkout')} className="w-full py-3 rounded-lg text-white flex items-center justify-center gap-2 mt-4 hover:opacity-90 transition-all" style={{ background: '#27AE60', fontSize: 14, fontWeight: 700 }}>
                        <ArrowRight size={16} /> Reserveer
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="bg-[#F4F7FC] rounded-2xl p-6 text-center">
                    <Calendar size={40} color="#C0C8D4" className="mx-auto mb-3" />
                    <p className="text-[#A0AEC0]" style={{ fontSize: 14 }}>Selecteer een groene datum in de kalender</p>
                  </div>
                )}
              </div>
            </div>
            <button onClick={goBack} className="mt-6 flex items-center gap-2 text-[#0365C4] hover:underline" style={{ fontSize: 14, fontWeight: 600 }}><ArrowLeft size={16} /> Terug</button>
          </>
        )}

        {/* ═══════ CHECKOUT ═══════ */}
        {view === 'checkout' && selectedProduct && selectedDate && selectedTimeSlot && (
          <>
            <Breadcrumb items={[{ label: 'Boek een les', onClick: () => goTo('boek-een-les') }, { label: 'Kalender', onClick: () => goTo('calendar') }, { label: 'Gegevens' }]} />
            <h2 className="text-[#1A1A2E] mb-6" style={{ fontSize: 22, fontWeight: 700 }}>BEVESTIG</h2>

            {/* Prijsoverzicht */}
            <div className="bg-white rounded-2xl p-5 mb-5" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #F0F4FA' }}>
              <h3 className="text-[#1A1A2E] mb-3" style={{ fontSize: 15, fontWeight: 700 }}>PRIJSOVERZICHT</h3>
              <div className="overflow-x-auto">
                <table className="w-full" style={{ fontSize: 13 }}>
                  <thead><tr style={{ background: '#6B8AB5' }}>
                    {['OMSCHRIJVING', 'AANTAL', 'VANAF DATUM', 'VANAF TIJD', 'TOT TIJD', 'SUBTOTAAL'].map(h => <th key={h} className="text-white px-3 py-2 text-left" style={{ fontWeight: 600, fontSize: 11 }}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    <tr className="border-b border-[#F0F4FA]">
                      <td className="px-3 py-2 text-[#1A1A2E]">{selectedProduct.name}</td>
                      <td className="px-3 py-2 text-[#1A1A2E]">1</td>
                      <td className="px-3 py-2 text-[#1A1A2E]">{formatDate(selectedDate)}</td>
                      <td className="px-3 py-2 text-[#1A1A2E]">{selectedTimeSlot.time}</td>
                      <td className="px-3 py-2 text-[#1A1A2E]">{selectedTimeSlot.endTime}</td>
                      <td className="px-3 py-2 text-[#1A1A2E]" style={{ fontWeight: 600 }}>€{selectedProduct.price},00</td>
                    </tr>
                    {knipkaarten.find(k => k.balance > 0) && (
                      <tr className="border-b border-[#F0F4FA]">
                        <td className="px-3 py-2 text-[#27AE60]">Knipkaart {knipkaarten.find(k => k.balance > 0)?.id} aftrek</td>
                        <td className="px-3 py-2 text-[#27AE60]">1</td>
                        <td className="px-3 py-2" colSpan={3}></td>
                        <td className="px-3 py-2 text-[#27AE60]" style={{ fontWeight: 600 }}>€-{selectedProduct.price},00</td>
                      </tr>
                    )}
                    <tr style={{ background: '#F4F7FC' }}>
                      <td className="px-3 py-2 text-[#1A1A2E]" style={{ fontWeight: 700 }} colSpan={5}>Totaal</td>
                      <td className="px-3 py-2 text-[#1A1A2E]" style={{ fontWeight: 700 }}>€{knipkaarten.find(k => k.balance > 0) ? '0' : selectedProduct.price},00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl p-5 mb-5" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #F0F4FA' }}>
              <h3 className="text-[#1A1A2E] mb-3" style={{ fontSize: 15, fontWeight: 700 }}>DETAILS</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[
                  { l: 'Product', v: selectedProduct.name },
                  { l: 'Vanaf', v: `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}` },
                  { l: 'Vanaf tijd', v: selectedTimeSlot.time },
                  { l: 'Tot tijd', v: selectedTimeSlot.endTime },
                ].map(d => <div key={d.l}><p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>{d.l}</p><p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>{d.v}</p></div>)}
              </div>
              <h3 className="text-[#1A1A2E] mb-3" style={{ fontSize: 15, fontWeight: 700 }}>PERSOONSGEGEVENS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { l: 'Voornaam kind', v: profile.childFirstName }, { l: 'Achternaam kind', v: profile.childLastName },
                  { l: 'Geboortedatum kind', v: profile.childBirthDate }, { l: 'Voor+achternaam ouder', v: profile.parentName },
                  { l: 'Mobiel', v: profile.mobile }, { l: 'E-mail', v: profile.email },
                  { l: 'Woonplaats', v: profile.city }, { l: 'Locatie', v: profile.location },
                  { l: 'Type zwemles', v: profile.lessonType }, { l: 'Dag', v: profile.day },
                  { l: 'Tijdstip', v: profile.lessonTime },
                  { l: 'Bij uitval collega', v: profile.colAbsent },
                ].map(f => <FormField key={f.l} label={f.l} value={f.v} readOnly />)}
              </div>

              {selectedProduct.type.includes('1-op-2') && (
                <div className="mt-4 bg-[#FFF8E1] border border-[#FFE082] rounded-lg p-3">
                  <p className="text-[#E65100]" style={{ fontSize: 13, fontWeight: 600 }}>KEUZE ALS ANDERE KIND(EREN) NIET AANWEZIG ZIJN?</p>
                  <p className="text-[#4A5568] mt-1" style={{ fontSize: 13 }}>{profile.otherChildAbsent}</p>
                </div>
              )}

              <div className="mt-5 flex items-start gap-2">
                <input type="checkbox" id="terms" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} className="mt-1 accent-[#0365C4] cursor-pointer" />
                <label htmlFor="terms" className="text-[#4A5568] cursor-pointer" style={{ fontSize: 13 }}>
                  Ik accepteer: <button onClick={() => navigate('/website/algemene-voorwaarden')} className="text-[#0365C4] underline">algemene voorwaarden</button>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => goTo('calendar')} className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[#E8ECF4] text-[#6B7B94] hover:bg-[#F4F7FC] transition-all" style={{ fontSize: 14, fontWeight: 600 }}>
                <ArrowLeft size={16} /> Terug
              </button>
              <button disabled={!acceptTerms} onClick={handleConfirmBooking} className="flex items-center gap-2 px-6 py-3 rounded-lg text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all" style={{ background: '#27AE60', fontSize: 14, fontWeight: 700 }}>
                <CheckCircle2 size={16} /> Bevestig
              </button>
            </div>
          </>
        )}

        {/* ═══════ BOOKING SUCCESS ═══════ */}
        {view === 'booking-success' && (
          <div className="max-w-[500px] mx-auto text-center py-12">
            <div className="w-20 h-20 rounded-full bg-[#27AE60]/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={44} color="#27AE60" />
            </div>
            <h2 className="text-[#1A1A2E] mb-3" style={{ fontSize: 26, fontWeight: 700 }}>Reservering bevestigd!</h2>
            <p className="text-[#6B7B94] mb-2" style={{ fontSize: 15 }}>Uw zwemles is succesvol geboekt.</p>
            <p className="text-[#0365C4] mb-8" style={{ fontSize: 14, fontWeight: 600 }}>Reservering ID: {lastBookedId}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button onClick={() => goTo('reserveringen-gepland')} className="px-6 py-3 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 14, fontWeight: 700 }}>Mijn reserveringen</button>
              <button onClick={() => goTo('boek-een-les')} className="px-6 py-3 rounded-lg text-[#0365C4] border border-[#0365C4]" style={{ fontSize: 14, fontWeight: 700 }}>Nog een les boeken</button>
              <button onClick={() => goTo('dashboard')} className="px-6 py-3 rounded-lg text-[#6B7B94] bg-[#F4F7FC]" style={{ fontSize: 14, fontWeight: 600 }}>Terug naar home</button>
            </div>
          </div>
        )}

        {/* ═══════ KNIPKAARTEN MENU ═══════ */}
        {view === 'knipkaarten-menu' && (
          <>
            <Breadcrumb items={[{ label: 'Bestel Knipkaart' }]} />
            <h2 className="text-[#1A1A2E] mb-2" style={{ fontSize: 22, fontWeight: 700 }}>Bestel Knipkaart</h2>
            <p className="text-[#6B7B94] mb-6" style={{ fontSize: 14 }}>Kies een categorie om een knipkaart te bestellen.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {knipkaartCategories.map(cat => (
                <button key={cat.key} onClick={() => { setSelectedKnipkaartCategory(cat.key); goTo('knipkaarten-list'); }}
                  className="bg-white rounded-xl p-5 text-left hover:translate-y-[-3px] transition-all group" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid #F0F4FA' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 text-white" style={{ background: cat.color, fontSize: 14, fontWeight: 800 }}>{cat.icon}</div>
                  <h4 className="text-[#1A1A2E] group-hover:text-[#0365C4] transition-colors" style={{ fontSize: 16, fontWeight: 700 }}>{cat.label}</h4>
                  <p className="text-[#6B7B94] mt-1" style={{ fontSize: 13 }}>{cat.desc}</p>
                  <span className="text-[#0365C4] mt-3 inline-flex items-center gap-1" style={{ fontSize: 13, fontWeight: 600 }}>Bekijken <ChevronRight size={14} /></span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ═══════ KNIPKAARTEN LIST ═══════ */}
        {view === 'knipkaarten-list' && (
          <>
            <Breadcrumb items={[{ label: 'Bestel Knipkaart', onClick: () => goTo('knipkaarten-menu') }, { label: knipkaartCategories.find(c => c.key === selectedKnipkaartCategory)?.label || '' }]} />
            <h2 className="text-[#1A1A2E] mb-6" style={{ fontSize: 22, fontWeight: 700 }}>Knipkaarten {knipkaartCategories.find(c => c.key === selectedKnipkaartCategory)?.label}</h2>
            <div className="space-y-4">
              {(knipkaartProducts[selectedKnipkaartCategory] || []).map(kp => {
                const color = knipkaartCategories.find(c => c.key === selectedKnipkaartCategory)?.color || '#0365C4';
                return (
                  <div key={kp.id} className="bg-white rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:translate-y-[-2px] transition-all" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #F0F4FA' }}>
                    <div className="w-full sm:w-[180px] h-[120px] sm:h-auto flex-shrink-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)` }}>
                      <div className="text-center text-white p-3">
                        <p style={{ fontSize: 40, fontWeight: 800, lineHeight: 1 }}>{kp.count}x</p>
                        <p style={{ fontSize: 12, fontWeight: 600, marginTop: 4 }}>{selectedKnipkaartCategory}</p>
                      </div>
                    </div>
                    <div className="flex-1 p-5">
                      <h3 className="text-[#1A1A2E] mb-1" style={{ fontSize: 16, fontWeight: 700 }}>{kp.name}</h3>
                      <p className="text-[#6B7B94] mb-3" style={{ fontSize: 13 }}>{kp.description}</p>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-[#FF5C00]" style={{ fontSize: 22, fontWeight: 800 }}>€{kp.price},00</span>
                        <span className="bg-[#F4F7FC] px-3 py-1 rounded-full text-[#6B7B94]" style={{ fontSize: 12 }}>Geldigheid: {kp.validity}</span>
                      </div>
                      <button onClick={() => { setSelectedKnipkaart(kp); setAcceptTerms(false); goTo('knipkaart-checkout'); }}
                        className="px-6 py-2.5 rounded-lg text-white hover:opacity-90 transition-all" style={{ background: color, fontSize: 14, fontWeight: 700 }}>
                        Bestellen!
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <button onClick={goBack} className="mt-6 flex items-center gap-2 text-[#0365C4] hover:underline" style={{ fontSize: 14, fontWeight: 600 }}><ArrowLeft size={16} /> Terug</button>
          </>
        )}

        {/* ═══════ KNIPKAART CHECKOUT ═══════ */}
        {view === 'knipkaart-checkout' && selectedKnipkaart && (
          <>
            <Breadcrumb items={[{ label: 'Bestel Knipkaart', onClick: () => goTo('knipkaarten-menu') }, { label: 'Bevestig' }]} />
            <h2 className="text-[#1A1A2E] mb-6" style={{ fontSize: 22, fontWeight: 700 }}>BEVESTIG</h2>
            <div className="bg-white rounded-2xl p-5 mb-5" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #F0F4FA' }}>
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[#F0F4FA]">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: knipkaartCategories.find(c => c.key === selectedKnipkaartCategory)?.color || '#0365C4' }}>
                  <CreditCard size={28} color="#fff" />
                </div>
                <div>
                  <h3 className="text-[#1A1A2E]" style={{ fontSize: 17, fontWeight: 700 }}>{selectedKnipkaart.name}</h3>
                  <p className="text-[#FF5C00]" style={{ fontSize: 22, fontWeight: 800 }}>€{selectedKnipkaart.price},00</p>
                  <p className="text-[#6B7B94]" style={{ fontSize: 12 }}>Geldigheid: {selectedKnipkaart.validity}</p>
                </div>
              </div>
              <h3 className="text-[#1A1A2E] mb-3" style={{ fontSize: 15, fontWeight: 700 }}>PERSOONSGEGEVENS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { l: 'Voornaam kind', v: profile.childFirstName }, { l: 'Achternaam kind', v: profile.childLastName },
                  { l: 'Voor+achternaam ouder', v: profile.parentName }, { l: 'E-mail', v: profile.email },
                  { l: 'Mobiel', v: profile.mobile }, { l: 'Locatie', v: profile.location },
                ].map(f => <FormField key={f.l} label={f.l} value={f.v} readOnly />)}
              </div>
              <div className="mt-5 flex items-start gap-2">
                <input type="checkbox" id="terms-kp" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} className="mt-1 accent-[#0365C4] cursor-pointer" />
                <label htmlFor="terms-kp" className="text-[#4A5568] cursor-pointer" style={{ fontSize: 13 }}>
                  Ik accepteer: <button onClick={() => navigate('/website/algemene-voorwaarden')} className="text-[#0365C4] underline">algemene voorwaarden</button>
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={goBack} className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[#E8ECF4] text-[#6B7B94] hover:bg-[#F4F7FC]" style={{ fontSize: 14, fontWeight: 600 }}>
                <ArrowLeft size={16} /> Terug
              </button>
              <button disabled={!acceptTerms} onClick={handleConfirmKnipkaart} className="flex items-center gap-2 px-6 py-3 rounded-lg text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90" style={{ background: '#27AE60', fontSize: 14, fontWeight: 700 }}>
                <CheckCircle2 size={16} /> Bevestig
              </button>
            </div>
          </>
        )}

        {/* ═══════ KNIPKAART SUCCESS ═══════ */}
        {view === 'knipkaart-success' && (
          <div className="max-w-[500px] mx-auto text-center py-12">
            <div className="w-20 h-20 rounded-full bg-[#27AE60]/10 flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={44} color="#27AE60" /></div>
            <h2 className="text-[#1A1A2E] mb-3" style={{ fontSize: 26, fontWeight: 700 }}>Knipkaart besteld!</h2>
            <p className="text-[#6B7B94] mb-8" style={{ fontSize: 15 }}>Uw knipkaart is succesvol besteld en aan uw account toegevoegd.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button onClick={() => goTo('mijn-knipkaarten')} className="px-6 py-3 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 14, fontWeight: 700 }}>Mijn knipkaarten</button>
              <button onClick={() => goTo('dashboard')} className="px-6 py-3 rounded-lg text-[#6B7B94] bg-[#F4F7FC]" style={{ fontSize: 14, fontWeight: 600 }}>Terug naar home</button>
            </div>
          </div>
        )}

        {/* ═══════ RESERVERINGEN GEPLAND ═══════ */}
        {view === 'reserveringen-gepland' && (
          <>
            <Breadcrumb items={[{ label: 'Mijn Reserveringen - Gepland' }]} />
            <h2 className="text-[#1A1A2E] mb-2" style={{ fontSize: 22, fontWeight: 700 }}>Mijn Reserveringen - Gepland</h2>
            <p className="text-[#6B7B94] mb-4" style={{ fontSize: 14 }}>Bekijk hier uw reserveringen voor de geplande zwemlessen.</p>

            <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-xl p-4 mb-5">
              <p className="text-[#4A5568]" style={{ fontSize: 13, lineHeight: 1.6 }}>
                <strong className="text-[#E65100]">Annuleringsbeleid:</strong> Annuleren kan kosteloos tot 24 uur voor de zwemles (96 uur voor vakantielessen). Klik op het annuleer-icoon om een les te annuleren. Bij betaling via knipkaart wordt het saldo automatisch teruggestort. Bij betaling via Mollie, stuur de annuleringsbevestiging naar <span className="text-[#0365C4]">info@zwemschoolsnorkeltje.nl</span>.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-0.5 mb-0.5">
              <button className="px-5 py-2.5 rounded-t-lg text-white" style={{ background: '#0365C4', fontSize: 14, fontWeight: 700 }}>Gepland ({reservationsPlanned.length})</button>
              <button onClick={() => goTo('reserveringen-geschiedenis')} className="px-5 py-2.5 rounded-t-lg text-[#6B7B94] bg-[#E8ECF4] hover:bg-[#D8DCE4] transition-all" style={{ fontSize: 14, fontWeight: 600 }}>Geschiedenis ({reservationsHistory.length})</button>
            </div>

            {reservationsPlanned.length === 0 ? (
              <div className="bg-white rounded-b-xl rounded-tr-xl p-8 text-center" style={{ border: '1px solid #E8ECF4' }}>
                <Calendar size={40} color="#C0C8D4" className="mx-auto mb-3" />
                <p className="text-[#A0AEC0]" style={{ fontSize: 14 }}>U heeft geen geplande reserveringen.</p>
                <button onClick={() => goTo('boek-een-les')} className="mt-4 px-5 py-2.5 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 700 }}>Boek een les</button>
              </div>
            ) : (
              <div className="bg-white rounded-b-xl rounded-tr-xl overflow-hidden" style={{ border: '1px solid #E8ECF4' }}>
                <div className="overflow-x-auto">
                  <table className="w-full" style={{ fontSize: 13 }}>
                    <thead><tr style={{ background: '#6B8AB5' }}>
                      {['Reservering ID', 'Product', 'Vanaf', 'Vanaf tijd', 'Tot tijd', 'Status', 'Betaald met', 'Actie'].map(h =>
                        <th key={h} className="text-white px-3 py-2.5 text-left" style={{ fontWeight: 600, fontSize: 11 }}>{h}</th>
                      )}
                    </tr></thead>
                    <tbody>
                      {reservationsPlanned.map(r => (
                        <tr key={r.id} className="border-b border-[#F0F4FA] hover:bg-[#F8FAFC] transition-colors">
                          <td className="px-3 py-2.5 text-[#0365C4]" style={{ fontWeight: 600 }}>{r.id}</td>
                          <td className="px-3 py-2.5 text-[#1A1A2E]">{r.product}</td>
                          <td className="px-3 py-2.5 text-[#1A1A2E]">{r.date}</td>
                          <td className="px-3 py-2.5 text-[#1A1A2E]">{r.timeFrom}</td>
                          <td className="px-3 py-2.5 text-[#1A1A2E]">{r.timeTo}</td>
                          <td className="px-3 py-2.5"><span className="px-2.5 py-1 rounded-full text-[#27AE60]" style={{ fontSize: 11, fontWeight: 600, background: '#ECFDF5' }}>{r.status}</span></td>
                          <td className="px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 12 }}>{r.paidWith}</td>
                          <td className="px-3 py-2.5">
                            <button onClick={() => handleCancelReservation(r.id)} className="p-1.5 rounded-lg text-[#E74C3C] hover:bg-[#FEF2F2] transition-all" title="Annuleren">
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-[#6B7B94] mb-2" style={{ fontSize: 13 }}>Wilt u de zwemlessen die reeds hebben plaatsgevonden, bekijken?</p>
              <button onClick={() => goTo('reserveringen-geschiedenis')} className="px-5 py-2.5 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 600 }}>Mijn Reserveringen - Geschiedenis</button>
            </div>
          </>
        )}

        {/* ═══════ RESERVERINGEN GESCHIEDENIS ═══════ */}
        {view === 'reserveringen-geschiedenis' && (
          <>
            <Breadcrumb items={[{ label: 'Mijn Reserveringen (Geschiedenis)' }]} />
            <h2 className="text-[#1A1A2E] mb-2" style={{ fontSize: 22, fontWeight: 700 }}>Mijn Reserveringen (Geschiedenis)</h2>
            <p className="text-[#6B7B94] mb-4" style={{ fontSize: 14 }}>Bekijk hier uw reserveringen, voor de zwemlessen die reeds hebben plaatsgevonden.</p>

            <div className="flex gap-0.5 mb-0.5">
              <button onClick={() => goTo('reserveringen-gepland')} className="px-5 py-2.5 rounded-t-lg text-[#6B7B94] bg-[#E8ECF4] hover:bg-[#D8DCE4] transition-all" style={{ fontSize: 14, fontWeight: 600 }}>Gepland ({reservationsPlanned.length})</button>
              <button className="px-5 py-2.5 rounded-t-lg text-white" style={{ background: '#0365C4', fontSize: 14, fontWeight: 700 }}>Geschiedenis ({reservationsHistory.length})</button>
            </div>

            <div className="bg-white rounded-b-xl rounded-tr-xl overflow-hidden" style={{ border: '1px solid #E8ECF4' }}>
              <div className="overflow-x-auto">
                <table className="w-full" style={{ fontSize: 13 }}>
                  <thead><tr style={{ background: '#6B8AB5' }}>
                    {['Reservering ID', 'Product', 'Vanaf', 'Vanaf tijd', 'Tot tijd'].map(h =>
                      <th key={h} className="text-white px-3 py-2.5 text-left" style={{ fontWeight: 600, fontSize: 11 }}>{h}</th>
                    )}
                  </tr></thead>
                  <tbody>
                    {reservationsHistory.map(r => (
                      <tr key={r.id} className="border-b border-[#F0F4FA] hover:bg-[#F8FAFC] transition-colors">
                        <td className="px-3 py-2.5 text-[#0365C4]" style={{ fontWeight: 600 }}>{r.id}</td>
                        <td className="px-3 py-2.5 text-[#1A1A2E]">{r.product}</td>
                        <td className="px-3 py-2.5 text-[#1A1A2E]">{r.date}</td>
                        <td className="px-3 py-2.5 text-[#1A1A2E]">{r.timeFrom}</td>
                        <td className="px-3 py-2.5 text-[#1A1A2E]">{r.timeTo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-[#6B7B94] mb-2" style={{ fontSize: 13 }}>Wilt u de geplande zwemlessen bekijken?</p>
              <button onClick={() => goTo('reserveringen-gepland')} className="px-5 py-2.5 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 600 }}>Mijn Reserveringen - Gepland</button>
            </div>
          </>
        )}

        {/* ═══════ MIJN KNIPKAARTEN ═══════ */}
        {view === 'mijn-knipkaarten' && (
          <>
            <Breadcrumb items={[{ label: 'Mijn Knipkaarten' }]} />
            <h2 className="text-[#1A1A2E] mb-2" style={{ fontSize: 22, fontWeight: 700 }}>Mijn Knipkaarten</h2>
            <p className="text-[#6B7B94] mb-6" style={{ fontSize: 14 }}>Controleer het saldo en de geldigheid van uw knipkaarten.</p>

            {knipkaarten.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center" style={{ border: '1px solid #E8ECF4' }}>
                <CreditCard size={40} color="#C0C8D4" className="mx-auto mb-3" />
                <p className="text-[#A0AEC0]" style={{ fontSize: 14 }}>U heeft nog geen knipkaarten.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl overflow-hidden mb-6" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #E8ECF4' }}>
                <div className="overflow-x-auto">
                  <table className="w-full" style={{ fontSize: 13 }}>
                    <thead><tr style={{ background: '#6B8AB5' }}>
                      {['Knipkaart ID', 'Knip (saldo)', 'Knipkaart', 'Geldig vanaf', 'Geldig tot en met', 'Status'].map(h =>
                        <th key={h} className="text-white px-3 py-2.5 text-left" style={{ fontWeight: 600, fontSize: 11 }}>{h}</th>
                      )}
                    </tr></thead>
                    <tbody>
                      {knipkaarten.map(k => (
                        <tr key={k.id} className="border-b border-[#F0F4FA] hover:bg-[#F8FAFC] transition-colors">
                          <td className="px-3 py-2.5 text-[#0365C4]" style={{ fontWeight: 600 }}>{k.id}</td>
                          <td className="px-3 py-2.5">
                            <div className="flex items-center gap-2">
                              <span className={k.balance > 0 ? 'text-[#27AE60]' : 'text-[#E74C3C]'} style={{ fontWeight: 700, fontSize: 16 }}>{k.balance}</span>
                              <span className="text-[#A0AEC0]" style={{ fontSize: 12 }}>/ {k.total}</span>
                              {/* Progress bar */}
                              <div className="w-16 h-1.5 rounded-full bg-[#E8ECF4] overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${(k.balance / k.total) * 100}%`, background: k.balance > 0 ? '#27AE60' : '#E74C3C' }} />
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-2.5 text-[#1A1A2E]">{k.type}</td>
                          <td className="px-3 py-2.5 text-[#1A1A2E]">{k.validFrom}</td>
                          <td className="px-3 py-2.5 text-[#1A1A2E]">{k.validUntil}</td>
                          <td className="px-3 py-2.5">
                            <span className="px-2.5 py-1 rounded-full" style={{ fontSize: 11, fontWeight: 600, background: k.balance > 0 ? '#ECFDF5' : '#FEF2F2', color: k.balance > 0 ? '#27AE60' : '#E74C3C' }}>
                              {k.balance > 0 ? 'Actief' : 'Leeg'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <button onClick={() => goTo('knipkaarten-menu')} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white hover:opacity-90 transition-all" style={{ background: '#FF5C00', fontSize: 14, fontWeight: 700 }}>
              <Plus size={16} /> Nieuwe knipkaart bestellen
            </button>
          </>
        )}

        {/* ═══════ MIJN PROFIEL ═══════ */}
        {view === 'mijn-profiel' && (
          <>
            <Breadcrumb items={[{ label: 'Mijn Profiel' }]} />
            <h2 className="text-[#1A1A2E] mb-6" style={{ fontSize: 22, fontWeight: 700 }}>Mijn Profiel</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mijn gegevens */}
              <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #F0F4FA' }}>
                <h3 className="text-[#1A1A2E] mb-4 flex items-center gap-2" style={{ fontSize: 17, fontWeight: 700 }}><FileText size={18} color="#0365C4" /> Mijn gegevens</h3>
                <div className="space-y-3">
                  {([
                    { l: 'Voornaam kind', k: 'childFirstName' as keyof Profile },
                    { l: 'Achternaam kind', k: 'childLastName' as keyof Profile },
                    { l: 'Geboortedatum kind', k: 'childBirthDate' as keyof Profile },
                    { l: 'Voor+achternaam ouder', k: 'parentName' as keyof Profile },
                    { l: 'Mobiel (1e contactpersoon)', k: 'mobile' as keyof Profile },
                    { l: 'E-mail', k: 'email' as keyof Profile },
                    { l: 'Extra tel. nr (2e contactpersoon)', k: 'extraPhone' as keyof Profile },
                    { l: 'Woonplaats', k: 'city' as keyof Profile },
                    { l: 'Locatie', k: 'location' as keyof Profile, options: ['Nijkerk', 'De Bilt', 'Garderen', 'Wolfheze', 'Dordrecht', 'Mierlo', 'Soest'] },
                    { l: 'Type zwemles', k: 'lessonType' as keyof Profile, options: ['1-op-1', '1-op-2', '1-op-3'] },
                    { l: 'Dag', k: 'day' as keyof Profile, options: ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag'] },
                    { l: 'Tijdstip zwemles', k: 'lessonTime' as keyof Profile },
                    { l: 'Bij uitval collega', k: 'colAbsent' as keyof Profile, options: ['Les verplaatsen naar andere datum', 'Les annuleren', 'Andere instructeur'] },
                    { l: 'Keuze andere kind afwezig', k: 'otherChildAbsent' as keyof Profile, options: ['Les gaat door als 1-op-1', 'Les annuleren', 'Les verplaatsen'] },
                  ] as const).map(f => (
                    <FormField key={f.k} label={f.l} value={profile[f.k]} readOnly={!editingProfile}
                      onChange={v => setProfile({ ...profile, [f.k]: v })} options={(f as any).options} />
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-5">
                  {editingProfile ? (
                    <>
                      <button onClick={handleSaveProfile} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white hover:opacity-90" style={{ background: '#27AE60', fontSize: 13, fontWeight: 700 }}><Save size={16} /> Opslaan</button>
                      <button onClick={handleCancelProfile} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-[#E74C3C] border border-[#E74C3C]/20 hover:bg-[#FEF2F2]" style={{ fontSize: 13, fontWeight: 600 }}><X size={16} /> Annuleer</button>
                    </>
                  ) : (
                    <>
                      <button onClick={handleStartEditProfile} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white hover:opacity-90" style={{ background: '#0365C4', fontSize: 13, fontWeight: 700 }}><Edit2 size={16} /> Wijzigen</button>
                      <button onClick={() => showToast('Profiel gedownload als PDF.', 'info')} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-[#0365C4] border border-[#0365C4]/20 hover:bg-[#EFF6FF]" style={{ fontSize: 13, fontWeight: 600 }}><Download size={16} /> Downloaden profiel</button>
                    </>
                  )}
                </div>
              </div>

              {/* Gebruikersgegevens */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #F0F4FA' }}>
                  <h3 className="text-[#1A1A2E] mb-4 flex items-center gap-2" style={{ fontSize: 17, fontWeight: 700 }}><User size={18} color="#0365C4" /> Mijn gebruikersgegevens</h3>
                  <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[#F0F4FA]">
                    <div className="w-16 h-16 rounded-full bg-[#0365C4]/10 flex items-center justify-center">
                      <User size={28} color="#0365C4" />
                    </div>
                    <div>
                      <p className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>{profile.parentName}</p>
                      <p className="text-[#6B7B94]" style={{ fontSize: 13 }}>{profile.email}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <FormField label="Gebruikersnaam" value={profile.email} readOnly />
                    <FormField label="E-mail" value={profile.email} readOnly />
                  </div>
                  <div className="flex flex-wrap gap-3 mt-5">
                    <button onClick={() => showToast('Profiel wijzigen functie is beschikbaar via "Mijn gegevens".', 'info')} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-[#0365C4] border border-[#0365C4]/20 hover:bg-[#EFF6FF]" style={{ fontSize: 13, fontWeight: 600 }}><Edit2 size={16} /> Profiel wijzigen</button>
                    <button onClick={() => goTo('wachtwoord-wijzigen')} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-[#FF5C00] border border-[#FF5C00]/20 hover:bg-[#FFF5EB]" style={{ fontSize: 13, fontWeight: 600 }}><Lock size={16} /> Wachtwoord wijzigen</button>
                  </div>
                </div>

                {/* Quick links */}
                <div className="bg-[#F4F7FC] rounded-2xl p-5">
                  <h3 className="text-[#1A1A2E] mb-3" style={{ fontSize: 15, fontWeight: 700 }}>Snelle links</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Mijn reserveringen', target: 'reserveringen-gepland' as View, icon: BookOpen, color: '#27AE60' },
                      { label: 'Mijn knipkaarten', target: 'mijn-knipkaarten' as View, icon: CreditCard, color: '#00C1FF' },
                      { label: 'Boek een les', target: 'boek-een-les' as View, icon: Calendar, color: '#0365C4' },
                      { label: 'Bestel knipkaart', target: 'knipkaarten-menu' as View, icon: ShoppingCart, color: '#FF5C00' },
                    ].map(link => {
                      const Icon = link.icon;
                      return (
                        <button key={link.label} onClick={() => goTo(link.target)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white hover:bg-[#0365C4]/5 transition-all text-left" style={{ border: '1px solid #E8ECF4' }}>
                          <Icon size={18} color={link.color} /><span className="text-[#1A1A2E] flex-1" style={{ fontSize: 14, fontWeight: 600 }}>{link.label}</span><ChevronRight size={16} color="#C0C8D4" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ═══════ WACHTWOORD WIJZIGEN ═══════ */}
        {view === 'wachtwoord-wijzigen' && (
          <>
            <Breadcrumb items={[{ label: 'Mijn Profiel', onClick: () => goTo('mijn-profiel') }, { label: 'Wachtwoord wijzigen' }]} />
            <div className="max-w-[500px] mx-auto">
              <h2 className="text-[#1A1A2E] mb-6" style={{ fontSize: 22, fontWeight: 700 }}>Wachtwoord wijzigen</h2>
              <form onSubmit={handlePasswordChange} className="bg-white rounded-2xl p-6 space-y-4" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #F0F4FA' }}>
                <FormField label="Huidig wachtwoord" value={pwData.current} onChange={v => setPwData({ ...pwData, current: v })} type="password" error={pwErrors.current} />
                <FormField label="Nieuw wachtwoord" value={pwData.new1} onChange={v => setPwData({ ...pwData, new1: v })} type="password" error={pwErrors.new1} />
                <FormField label="Bevestig wachtwoord" value={pwData.new2} onChange={v => setPwData({ ...pwData, new2: v })} type="password" error={pwErrors.new2} />
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => goTo('mijn-profiel')} className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#E8ECF4] text-[#6B7B94] hover:bg-[#F4F7FC]" style={{ fontSize: 14, fontWeight: 600 }}><X size={16} /> Annuleer</button>
                  <button type="submit" className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white hover:opacity-90" style={{ background: '#27AE60', fontSize: 14, fontWeight: 700 }}><CheckCircle2 size={16} /> Bijwerken wachtwoord</button>
                </div>
              </form>
            </div>
          </>
        )}

      </div>
    </WebsiteLayout>
  );
}

export default WebsiteReserverenScreen;

import { supabase } from '../supabase';

/// Aggregated KPI numbers for the admin dashboard top cards.
export interface DashboardStats {
  totalCustomers: number;
  reservationsLast30: number;
  revenueThisMonthCents: number;
  activeWalletsCents: number;
}

/// One day in the 30-day reservations chart.
export interface DayBucket {
  date: string;          // 'd/m'
  reserveringen: number;
  annuleringen: number;
}

/// One slice of the lesson-type pie chart.
export interface LessonTypeSlice {
  name: string;
  value: number;
  color: string;
}

/// One bar in the 6-month revenue chart.
export interface RevenueMonth {
  month: string;
  revenue: number;
}

/// One row in the locations breakdown.
export interface LocationStat {
  name: string;
  students: number;
  bookings: number;
  color: string;
}

const _kLessonTypeColors: Record<string, string> = {
  '1-op-1': '#0365C4',
  '1-op-2': '#00C1FF',
  '1-op-3': '#27AE60',
  'survival': '#FF5C00',
  'vakantie': '#F5A623',
};

const _kLocationColors = ['#0365C4', '#00C1FF', '#27AE60', '#FF5C00', '#8E44AD', '#E67E22', '#2C3E50', '#1ABC9C'];

const _kDutchMonthsShort = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];

function _ymd(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Top-of-dashboard KPIs. Reads from `profiles`, `reservations`, `credit_vouchers`.
 * RLS-aware — admin user sees full counts, others see scoped data.
 */
export async function fetchDashboardStats(): Promise<DashboardStats> {
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  // Run all 4 queries in parallel.
  const [customersRes, reservationsRes, revenueRes, walletsRes] = await Promise.all([
    supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .eq('role', 'parent'),
    supabase
      .from('reservations')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo.toISOString()),
    supabase
      .from('reservations')
      .select('amount_cents')
      .eq('payment_status', 'paid')
      .gte('created_at', monthStart.toISOString()),
    supabase
      .from('credit_vouchers')
      .select('current_balance_cents')
      .gt('current_balance_cents', 0),
  ]);

  const totalCustomers = customersRes.count ?? 0;
  const reservationsLast30 = reservationsRes.count ?? 0;
  const revenueThisMonthCents = (revenueRes.data ?? [])
    .reduce((sum, r) => sum + ((r.amount_cents as number) ?? 0), 0);
  const activeWalletsCents = (walletsRes.data ?? [])
    .reduce((sum, v) => sum + ((v.current_balance_cents as number) ?? 0), 0);

  return { totalCustomers, reservationsLast30, revenueThisMonthCents, activeWalletsCents };
}

/// Reservations + cancellations grouped by day for the last 30 days.
export async function fetchReservations30Days(): Promise<DayBucket[]> {
  const start = new Date();
  start.setDate(start.getDate() - 29);
  start.setHours(0, 0, 0, 0);

  const { data } = await supabase
    .from('reservations')
    .select('status, created_at')
    .gte('created_at', start.toISOString());

  const buckets: Record<string, DayBucket> = {};
  for (let i = 0; i < 30; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = _ymd(d);
    buckets[key] = { date: `${d.getDate()}/${d.getMonth() + 1}`, reserveringen: 0, annuleringen: 0 };
  }
  for (const r of data ?? []) {
    const key = _ymd(new Date(r.created_at as string));
    if (!buckets[key]) continue;
    if (r.status === 'cancelled' || r.status === 'no_show') buckets[key].annuleringen++;
    else buckets[key].reserveringen++;
  }
  return Object.values(buckets);
}

/// Lesson-type distribution pie chart over the last 30 days.
export async function fetchLessonTypeDistribution(): Promise<LessonTypeSlice[]> {
  const start = new Date();
  start.setDate(start.getDate() - 30);
  const { data } = await supabase
    .from('reservations')
    .select('lessons:lesson_id ( type )')
    .gte('created_at', start.toISOString());

  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    const lesson = row.lessons as { type?: string } | null;
    const t = lesson?.type ?? 'unknown';
    counts[t] = (counts[t] ?? 0) + 1;
  }
  if (Object.keys(counts).length === 0) {
    // Show a placeholder distribution so the chart renders rather than collapsing.
    return [
      { name: '1-op-1', value: 1, color: _kLessonTypeColors['1-op-1'] },
      { name: '1-op-2', value: 1, color: _kLessonTypeColors['1-op-2'] },
      { name: '1-op-3', value: 1, color: _kLessonTypeColors['1-op-3'] },
      { name: 'Vakantie', value: 1, color: _kLessonTypeColors['vakantie'] },
    ];
  }
  return Object.entries(counts).map(([name, value]) => ({
    name,
    value,
    color: _kLessonTypeColors[name] ?? '#8E44AD',
  }));
}

/// Last 6 calendar months of paid revenue (in euros).
export async function fetchRevenue6Months(): Promise<RevenueMonth[]> {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const { data } = await supabase
    .from('reservations')
    .select('amount_cents, created_at')
    .eq('payment_status', 'paid')
    .gte('created_at', start.toISOString());

  const buckets: Record<string, number> = {};
  for (let i = 0; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    buckets[key] = 0;
  }
  for (const r of data ?? []) {
    const d = new Date(r.created_at as string);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (key in buckets) buckets[key] += ((r.amount_cents as number) ?? 0) / 100;
  }
  return Object.entries(buckets).map(([key, revenue]) => {
    const m = parseInt(key.slice(5, 7), 10) - 1;
    return { month: _kDutchMonthsShort[m].charAt(0).toUpperCase() + _kDutchMonthsShort[m].slice(1), revenue };
  });
}

/// Per-location students + bookings overview.
export async function fetchLocationStats(): Promise<LocationStat[]> {
  // Pull all locations + count children/lessons per location
  const { data: locs } = await supabase.from('locations').select('id, name').eq('active', true);
  if (!locs?.length) return [];

  const start = new Date();
  start.setDate(start.getDate() - 30);

  // Bookings per location
  const { data: lessonsByLoc } = await supabase
    .from('reservations')
    .select('id, lessons:lesson_id ( location_id )')
    .gte('created_at', start.toISOString());

  const bookingCount: Record<string, number> = {};
  for (const r of lessonsByLoc ?? []) {
    const lesson = r.lessons as { location_id?: string } | null;
    const id = lesson?.location_id;
    if (id) bookingCount[id] = (bookingCount[id] ?? 0) + 1;
  }

  // Active student count per location — proxied by distinct children with confirmed reservations there
  const studentSet: Record<string, Set<string>> = {};
  const { data: rows } = await supabase
    .from('reservations')
    .select('child_id, lessons:lesson_id ( location_id )')
    .eq('status', 'confirmed');
  for (const r of rows ?? []) {
    const lesson = r.lessons as { location_id?: string } | null;
    const id = lesson?.location_id;
    const child = r.child_id as string | null;
    if (!id || !child) continue;
    if (!studentSet[id]) studentSet[id] = new Set();
    studentSet[id].add(child);
  }

  return locs.map((loc, i) => ({
    name: loc.name as string,
    students: studentSet[loc.id as string]?.size ?? 0,
    bookings: bookingCount[loc.id as string] ?? 0,
    color: _kLocationColors[i % _kLocationColors.length],
  }));
}

/// Period-over-period trend (this month vs last month) for the 4 stat cards.
export interface DashboardTrends {
  customersPct: number;
  reservationsPct: number;
  revenuePct: number;
  walletsPct: number;
}

function _pct(now: number, prev: number): number {
  if (prev === 0) return now > 0 ? 100 : 0;
  return Math.round(((now - prev) / prev) * 100);
}

export async function fetchDashboardTrends(): Promise<DashboardTrends> {
  const now = new Date();
  const startThis = new Date(now.getFullYear(), now.getMonth(), 1);
  const startPrev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endPrev = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

  const [custNow, custPrev, resNow, resPrev, revNow, revPrev, walNow, walPrev] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'parent').gte('created_at', startThis.toISOString()),
    supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'parent').gte('created_at', startPrev.toISOString()).lt('created_at', startThis.toISOString()),
    supabase.from('reservations').select('id', { count: 'exact', head: true }).gte('created_at', startThis.toISOString()),
    supabase.from('reservations').select('id', { count: 'exact', head: true }).gte('created_at', startPrev.toISOString()).lt('created_at', startThis.toISOString()),
    supabase.from('reservations').select('amount_cents').eq('payment_status', 'paid').gte('created_at', startThis.toISOString()),
    supabase.from('reservations').select('amount_cents').eq('payment_status', 'paid').gte('created_at', startPrev.toISOString()).lt('created_at', startThis.toISOString()),
    supabase.from('credit_vouchers').select('initial_amount_cents').gte('created_at', startThis.toISOString()),
    supabase.from('credit_vouchers').select('initial_amount_cents').gte('created_at', startPrev.toISOString()).lt('created_at', startThis.toISOString()),
  ]);

  const sumCents = (rows: any[] | null, key: string) => (rows ?? []).reduce((s, r) => s + ((r[key] as number) ?? 0), 0);

  return {
    customersPct: _pct(custNow.count ?? 0, custPrev.count ?? 0),
    reservationsPct: _pct(resNow.count ?? 0, resPrev.count ?? 0),
    revenuePct: _pct(sumCents(revNow.data, 'amount_cents'), sumCents(revPrev.data, 'amount_cents')),
    walletsPct: _pct(sumCents(walNow.data, 'initial_amount_cents'), sumCents(walPrev.data, 'initial_amount_cents')),
  };
}

/// Today's lessons for the live "Vandaag" panel.
export interface TodayLesson {
  id: string;
  startTime: string;
  endTime: string;
  type: string;
  location: string;
  instructorName: string;
  studentNames: string[];
}

export async function fetchTodayLessons(): Promise<TodayLesson[]> {
  const today = new Date();
  const ymd = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const { data: lessons } = await supabase
    .from('lessons')
    .select(`
      id, start_time, end_time, type,
      locations:location_id ( name ),
      profiles:instructor_id ( first_name, last_name )
    `)
    .eq('date', ymd)
    .order('start_time', { ascending: true });
  if (!lessons?.length) return [];

  // Resolve student names per lesson via reservations.
  const lessonIds = lessons.map(l => l.id as string);
  const { data: res } = await supabase
    .from('reservations')
    .select('lesson_id, children:child_id ( first_name )')
    .in('lesson_id', lessonIds);

  const studentsByLesson: Record<string, string[]> = {};
  for (const r of res ?? []) {
    const id = r.lesson_id as string;
    const child = r.children as { first_name?: string } | null;
    if (!child?.first_name) continue;
    (studentsByLesson[id] ??= []).push(child.first_name);
  }

  return lessons.map(l => {
    const loc = l.locations as { name?: string } | null;
    const inst = l.profiles as { first_name?: string; last_name?: string } | null;
    const start = (l.start_time as string) ?? '00:00';
    const end = (l.end_time as string) ?? '00:00';
    return {
      id: l.id as string,
      startTime: start.length >= 5 ? start.slice(0, 5) : start,
      endTime: end.length >= 5 ? end.slice(0, 5) : end,
      type: (l.type as string) ?? '1-op-1',
      location: loc?.name ?? '—',
      instructorName: `${inst?.first_name ?? ''} ${inst?.last_name ?? ''}`.trim() || 'Instructeur',
      studentNames: studentsByLesson[l.id as string] ?? [],
    };
  });
}

/// Latest N reservations across all customers (admin view).
export interface RecentReservation {
  id: string;
  customerName: string;
  childName: string;
  date: string;
  startTime: string;
  status: string;
  amountCents: number;
}

export async function fetchRecentReservations(limit = 5): Promise<RecentReservation[]> {
  const { data } = await supabase
    .from('reservations')
    .select(`
      id, status, amount_cents, created_at,
      profiles:parent_id ( first_name, last_name ),
      children:child_id ( first_name, last_name ),
      lessons:lesson_id ( date, start_time )
    `)
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data ?? []).map(r => {
    const p = r.profiles as { first_name?: string; last_name?: string } | null;
    const c = r.children as { first_name?: string; last_name?: string } | null;
    const l = r.lessons as { date?: string; start_time?: string } | null;
    return {
      id: r.id as string,
      customerName: `${p?.first_name ?? ''} ${p?.last_name ?? ''}`.trim() || 'Onbekend',
      childName: `${c?.first_name ?? ''} ${c?.last_name ?? ''}`.trim(),
      date: l?.date ?? '',
      startTime: (l?.start_time ?? '').slice(0, 5),
      status: (r.status as string) ?? 'confirmed',
      amountCents: (r.amount_cents as number) ?? 0,
    };
  });
}

/// Pending registrations (newly signed-up parents that haven't booked yet).
export interface PendingRegistration {
  id: string;
  name: string;
  email: string;
  city: string;
  createdAt: string;
}

export async function fetchPendingRegistrations(limit = 5): Promise<PendingRegistration[]> {
  // No formal "registration_status" column — use parents created in the last 7 days
  // who don't yet have any reservations as a proxy for "pending" registrations.
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data: parents } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, email, city, created_at')
    .eq('role', 'parent')
    .gte('created_at', sevenDaysAgo.toISOString())
    .order('created_at', { ascending: false })
    .limit(limit * 2);
  if (!parents?.length) return [];

  // Filter out those who already have reservations.
  const ids = parents.map(p => p.id as string);
  const { data: existing } = await supabase
    .from('reservations')
    .select('parent_id')
    .in('parent_id', ids);
  const hasReservation = new Set((existing ?? []).map(r => r.parent_id as string));

  return parents
    .filter(p => !hasReservation.has(p.id as string))
    .slice(0, limit)
    .map(p => ({
      id: p.id as string,
      name: `${p.first_name ?? ''} ${p.last_name ?? ''}`.trim() || (p.email as string),
      email: (p.email as string) ?? '',
      city: (p.city as string) ?? '',
      createdAt: (p.created_at as string) ?? '',
    }));
}

/// Upcoming + overdue admin tasks. We synthesize from real signals
/// since there's no `tasks` table yet — these are real action items
/// admin should know about.
export interface AdminTask {
  id: string;
  description: string;
  priority: 'Hoog' | 'Normaal' | 'Laag';
  deadline: string;
}

export async function fetchPendingAdminTasks(): Promise<AdminTask[]> {
  const tasks: AdminTask[] = [];

  // Pending vacation requests
  const { data: vacReqs } = await supabase
    .from('vacation_requests')
    .select('id, instructor_id, reason, start_date, profiles:instructor_id ( first_name, last_name )')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
    .limit(3);
  for (const v of vacReqs ?? []) {
    const p = v.profiles as { first_name?: string; last_name?: string } | null;
    const name = `${p?.first_name ?? ''} ${p?.last_name ?? ''}`.trim() || 'Instructeur';
    tasks.push({
      id: `vac-${v.id}`,
      description: `Vakantieaanvraag van ${name} goedkeuren`,
      priority: 'Hoog',
      deadline: (v.start_date as string) ?? '',
    });
  }

  // Reviews <6 awaiting response
  const { data: pendingReviews } = await supabase
    .from('reviews')
    .select('id, rating, profiles:parent_id ( first_name, last_name )')
    .lt('rating', 6)
    .is('owner_response', null)
    .limit(3);
  for (const r of pendingReviews ?? []) {
    const p = r.profiles as { first_name?: string; last_name?: string } | null;
    const name = `${p?.first_name ?? ''} ${p?.last_name ?? ''}`.trim() || 'Klant';
    tasks.push({
      id: `rev-${r.id}`,
      description: `Reactie schrijven op ${r.rating}/10 review van ${name}`,
      priority: 'Hoog',
      deadline: 'Z.s.m.',
    });
  }

  // Pending waitlist offers expiring soon
  const { data: pendingOffers } = await supabase
    .from('waitlist_offers')
    .select('id, expires_at')
    .eq('status', 'pending')
    .limit(3);
  for (const o of pendingOffers ?? []) {
    tasks.push({
      id: `offer-${o.id}`,
      description: `Wachtlijst aanbieding loopt af`,
      priority: 'Normaal',
      deadline: (o.expires_at as string)?.slice(0, 10) ?? '',
    });
  }

  return tasks.slice(0, 5);
}

/// Total settled payments across all time.
export async function fetchAllTimeKpis(): Promise<{
  totalPaymentsCents: number;
  totalInvoices: number;
  walletsIssuedCents: number;
  totalLessonsGiven: number;
}> {
  const [pays, invoices, vouchers, lessons] = await Promise.all([
    supabase.from('reservations').select('amount_cents').eq('payment_status', 'paid'),
    supabase.from('reservations').select('id', { count: 'exact', head: true }),
    supabase.from('credit_vouchers').select('initial_amount_cents'),
    supabase.from('reservations').select('id', { count: 'exact', head: true }).eq('status', 'completed'),
  ]);

  return {
    totalPaymentsCents: (pays.data ?? []).reduce((s, r) => s + ((r.amount_cents as number) ?? 0), 0),
    totalInvoices: invoices.count ?? 0,
    walletsIssuedCents: (vouchers.data ?? []).reduce((s, v) => s + ((v.initial_amount_cents as number) ?? 0), 0),
    totalLessonsGiven: lessons.count ?? 0,
  };
}

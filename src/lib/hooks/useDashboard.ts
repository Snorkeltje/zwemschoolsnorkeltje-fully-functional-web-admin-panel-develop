import { useEffect, useState } from 'react';
import {
  fetchAllTimeKpis,
  fetchDashboardStats,
  fetchDashboardTrends,
  fetchLessonTypeDistribution,
  fetchLocationStats,
  fetchPendingAdminTasks,
  fetchPendingRegistrations,
  fetchRecentReservations,
  fetchReservations30Days,
  fetchRevenue6Months,
  fetchTodayLessons,
  type AdminTask,
  type DashboardStats,
  type DashboardTrends,
  type DayBucket,
  type LessonTypeSlice,
  type LocationStat,
  type PendingRegistration,
  type RecentReservation,
  type RevenueMonth,
  type TodayLesson,
} from '../data/dashboard-repository';

interface AsyncResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

function _useAsync<T>(loader: () => Promise<T>, initial: T | null = null): AsyncResult<T> {
  const [data, setData] = useState<T | null>(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const v = await loader();
      setData(v);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      // eslint-disable-next-line no-console
      console.warn('Dashboard query failed:', msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, refresh };
}

export const useDashboardStats = () => _useAsync<DashboardStats>(fetchDashboardStats);
export const useDashboardTrends = () => _useAsync<DashboardTrends>(fetchDashboardTrends);
export const useReservations30Days = () => _useAsync<DayBucket[]>(fetchReservations30Days);
export const useLessonTypeDistribution = () => _useAsync<LessonTypeSlice[]>(fetchLessonTypeDistribution);
export const useRevenue6Months = () => _useAsync<RevenueMonth[]>(fetchRevenue6Months);
export const useLocationStats = () => _useAsync<LocationStat[]>(fetchLocationStats);
export const useTodayLessons = () => _useAsync<TodayLesson[]>(fetchTodayLessons);
export const useRecentReservations = () => _useAsync<RecentReservation[]>(() => fetchRecentReservations(5));
export const usePendingRegistrations = () => _useAsync<PendingRegistration[]>(() => fetchPendingRegistrations(5));
export const usePendingAdminTasks = () => _useAsync<AdminTask[]>(fetchPendingAdminTasks);
export const useAllTimeKpis = () => _useAsync<{
  totalPaymentsCents: number;
  totalInvoices: number;
  walletsIssuedCents: number;
  totalLessonsGiven: number;
}>(fetchAllTimeKpis);

/// Dutch-style number formatter: 5491 → "5.491".
export function formatNumberNL(n: number): string {
  return new Intl.NumberFormat('nl-NL').format(Math.round(n));
}

/// Dutch euro formatter (cents → "€28.700" or "€28.700,50").
export function formatEuroFromCents(cents: number): string {
  const euros = cents / 100;
  if (Math.round(euros) === euros) {
    return `€${formatNumberNL(euros)}`;
  }
  return `€${new Intl.NumberFormat('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(euros)}`;
}

/// Same but takes euro number directly.
export function formatEuro(euros: number): string {
  return formatEuroFromCents(euros * 100);
}

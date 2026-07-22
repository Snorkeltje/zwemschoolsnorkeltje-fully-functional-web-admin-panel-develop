import { useEffect, useRef, useState } from 'react';
import {
  fetchAdminNotifications,
  fetchAllChildren,
  fetchAllReviews,
  fetchAllReservations,
  fetchAllSkills,
  fetchChildPhases,
  fetchCurriculum,
  fetchCustomers,
  fetchCustomerDetail,
  fetchAllInvoices,
  fetchAllPayments,
  fetchExamCandidates,
  fetchWaitlistOffers,
  fetchInstructors,
  fetchLocations,
  fetchVacationRequests,
  fetchWaitlist,
  fetchWallets,
  type AdminCustomer,
  type AdminCustomerDetail,
  type AdminExamCandidate,
  type AdminInvoice,
  type AdminPayment,
  type AdminWaitlistOffer,
  type AdminInstructor,
  type AdminLocation,
  type AdminNotification,
  type AdminReservation,
  type AdminReview,
  type AdminSkill,
  type AdminVacationRequest,
  type AdminWaitlistEntry,
  type AdminWallet,
  type ChildSummary,
  type CurriculumStep,
} from '../data/admin-repository';
import { supabase } from '../supabase';

interface AsyncResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/// Gated async loader. When `enabled` is false, the loader is not fired.
/// This lets AdminDashboardScreen defer sidebar-view queries until the user
/// actually navigates to that view — cutting first-paint from 26+ queries down
/// to just the ones needed for the current tab. A cache guarantees that once
/// a view has loaded its data, re-visiting the view does not re-fetch.
function _useAsync<T>(loader: () => Promise<T>, enabled: boolean = true): AsyncResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<string | null>(null);
  const hasLoadedRef = useRef(false);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await loader());
      hasLoadedRef.current = true;
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      // eslint-disable-next-line no-console
      console.warn('Admin query failed:', e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (enabled && !hasLoadedRef.current) refresh();
    else if (!enabled && !hasLoadedRef.current) setLoading(false);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [enabled]);
  return { data, loading, error, refresh };
}

export const useCustomers = (enabled: boolean = true) => _useAsync<AdminCustomer[]>(fetchCustomers, enabled);
export const useExamCandidates = (enabled: boolean = true) => _useAsync<AdminExamCandidate[]>(fetchExamCandidates, enabled);
export const useWaitlistOffers = (enabled: boolean = true) => _useAsync<AdminWaitlistOffer[]>(fetchWaitlistOffers, enabled);
export const useAllInvoices = (enabled: boolean = true) => _useAsync<AdminInvoice[]>(fetchAllInvoices, enabled);
export const useAllPayments = (enabled: boolean = true) => _useAsync<AdminPayment[]>(fetchAllPayments, enabled);

/// Returns the full detail bundle for one parent.
/// Pass an empty string to skip loading (returns null/loaded=false).
export function useCustomerDetail(parentId: string): AsyncResult<AdminCustomerDetail | null> & { reload: () => Promise<void> } {
  const [data, setData] = useState<AdminCustomerDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const refresh = async () => {
    if (!parentId) { setData(null); setLoading(false); return; }
    setLoading(true); setError(null);
    try { setData(await fetchCustomerDetail(parentId)); }
    catch (e) { setError(e instanceof Error ? e.message : String(e)); }
    finally { setLoading(false); }
  };
  useEffect(() => { refresh(); /* eslint-disable-next-line */ }, [parentId]);
  return { data, loading, error, refresh, reload: refresh };
}
export const useAllReservations = (enabled: boolean = true) => _useAsync<AdminReservation[]>(fetchAllReservations, enabled);
export const useLocationsList = (enabled: boolean = true) => _useAsync<AdminLocation[]>(fetchLocations, enabled);
export const useInstructors = (enabled: boolean = true) => _useAsync<AdminInstructor[]>(fetchInstructors, enabled);
export const useWallets = (enabled: boolean = true) => _useAsync<AdminWallet[]>(fetchWallets, enabled);
export const useAllReviews = (enabled: boolean = true) => _useAsync<AdminReview[]>(fetchAllReviews, enabled);
export const useWaitlist = (enabled: boolean = true) => _useAsync<AdminWaitlistEntry[]>(fetchWaitlist, enabled);
export const useVacationRequests = (enabled: boolean = true) => _useAsync<AdminVacationRequest[]>(fetchVacationRequests, enabled);
export const useSkills = (enabled: boolean = true) => _useAsync<AdminSkill[]>(fetchAllSkills, enabled);
export const useCurriculum = (enabled: boolean = true) => _useAsync<CurriculumStep[]>(fetchCurriculum, enabled);
export const useAllChildren = (enabled: boolean = true) => _useAsync<ChildSummary[]>(fetchAllChildren, enabled);
/// Notifications inbox for the current admin user, with realtime updates.
/// Returns the items + unread count + a refresh function.
export function useAdminNotifications() {
  const [data, setData] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = async () => {
    setLoading(true);
    try { setData(await fetchAdminNotifications()); }
    finally { setLoading(false); }
  };
  useEffect(() => {
    let active = true;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!active) return;
      await refresh();
      if (!user) return;
      channel = supabase
        .channel(`notif-${user.id}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`,
          },
          () => { void refresh(); },
        )
        .subscribe();
    })();

    return () => {
      active = false;
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  const unreadCount = data.filter(n => !n.read).length;
  return { data, loading, unreadCount, refresh };
}

export function useChildPhases(childId: string | null) {
  return _useAsyncKey<Record<string, number>>(
    childId,
    () => childId ? fetchChildPhases(childId) : Promise.resolve({}),
  );
}

/// Variant of _useAsync that re-runs when `key` changes.
function _useAsyncKey<T>(
  key: string | null,
  loader: () => Promise<T>,
): { data: T | null; loading: boolean; error: string | null; refresh: () => Promise<void> } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const refresh = async () => {
    if (!key) { setData(null); setLoading(false); return; }
    setLoading(true);
    setError(null);
    try { setData(await loader()); }
    catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      // eslint-disable-next-line no-console
      console.warn('child-progress query failed:', e);
    }
    finally { setLoading(false); }
  };
  useEffect(() => { refresh(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [key]);
  return { data, loading, error, refresh };
}

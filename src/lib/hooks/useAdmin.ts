import { useEffect, useState } from 'react';
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

function _useAsync<T>(loader: () => Promise<T>): AsyncResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await loader());
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      // eslint-disable-next-line no-console
      console.warn('Admin query failed:', e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { refresh(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);
  return { data, loading, error, refresh };
}

export const useCustomers = () => _useAsync<AdminCustomer[]>(fetchCustomers);
export const useExamCandidates = () => _useAsync<AdminExamCandidate[]>(fetchExamCandidates);
export const useWaitlistOffers = () => _useAsync<AdminWaitlistOffer[]>(fetchWaitlistOffers);
export const useAllInvoices = () => _useAsync<AdminInvoice[]>(fetchAllInvoices);
export const useAllPayments = () => _useAsync<AdminPayment[]>(fetchAllPayments);

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
export const useAllReservations = () => _useAsync<AdminReservation[]>(fetchAllReservations);
export const useLocationsList = () => _useAsync<AdminLocation[]>(fetchLocations);
export const useInstructors = () => _useAsync<AdminInstructor[]>(fetchInstructors);
export const useWallets = () => _useAsync<AdminWallet[]>(fetchWallets);
export const useAllReviews = () => _useAsync<AdminReview[]>(fetchAllReviews);
export const useWaitlist = () => _useAsync<AdminWaitlistEntry[]>(fetchWaitlist);
export const useVacationRequests = () => _useAsync<AdminVacationRequest[]>(fetchVacationRequests);
export const useSkills = () => _useAsync<AdminSkill[]>(fetchAllSkills);
export const useCurriculum = () => _useAsync<CurriculumStep[]>(fetchCurriculum);
export const useAllChildren = () => _useAsync<ChildSummary[]>(fetchAllChildren);
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

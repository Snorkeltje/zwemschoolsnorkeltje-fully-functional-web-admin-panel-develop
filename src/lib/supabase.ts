import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!url || !anon) {
  // eslint-disable-next-line no-console
  console.warn('Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY');
}

/// No-op lock — bypasses the navigator.locks-based lock that supabase-js uses
/// for cross-tab coordination. That lock interacts badly with React StrictMode
/// (effects mount-unmount-mount) causing 5-second delays on signInWithPassword.
/// We don't need cross-tab coordination for the admin dashboard.
const noOpLock = async <R>(
  _name: string,
  _acquireTimeout: number,
  fn: () => Promise<R>,
): Promise<R> => fn();

export const supabase = createClient(url, anon, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // @ts-expect-error — `lock` is a valid option in @supabase/auth-js v2 but not
    // yet in the public type defs of supabase-js. Works at runtime.
    lock: noOpLock,
  },
});

/// Helper: load profile + role for the currently signed-in user.
/// Accepts an optional pre-fetched user id to skip the extra network round trip
/// that `supabase.auth.getUser()` would otherwise make.
export async function fetchCurrentProfile(userId?: string) {
  let id = userId;
  if (!id) {
    const session = (await supabase.auth.getSession()).data.session;
    id = session?.user?.id;
  }
  if (!id) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, first_name, last_name, role, phone, city')
    .eq('id', id)
    .single();
  if (error) {
    console.warn('fetchCurrentProfile error:', error);
    return null;
  }
  return data;
}

import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!url || !anon) {
  // eslint-disable-next-line no-console
  console.warn('Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(url, anon, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/// Helper: load profile + role for the currently signed-in user.
export async function fetchCurrentProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, first_name, last_name, role, phone, city')
    .eq('id', user.id)
    .single();
  if (error) {
    console.warn('fetchCurrentProfile error:', error);
    return null;
  }
  return data;
}

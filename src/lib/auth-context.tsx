import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, fetchCurrentProfile } from './supabase';

export interface AdminProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'parent' | 'instructor' | 'admin';
  phone?: string;
  city?: string;
}

interface AuthContextValue {
  loading: boolean;
  session: Session | null;
  user: User | null;
  profile: AdminProfile | null;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const PROFILE_CACHE_KEY = 'sb-admin-profile-v1';

function readCachedProfile(): AdminProfile | null {
  try {
    const raw = window.localStorage.getItem(PROFILE_CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminProfile;
  } catch { return null; }
}

function writeCachedProfile(p: AdminProfile | null) {
  try {
    if (p) window.localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(p));
    else window.localStorage.removeItem(PROFILE_CACHE_KEY);
  } catch { /* ignore */ }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AdminProfile | null>(readCachedProfile);

  useEffect(() => {
    let mounted = true;
    // Failsafe: never stay on "Laden…" longer than 3s even if Supabase hangs.
    const failsafe = window.setTimeout(() => {
      if (mounted) setLoading(false);
    }, 3000);

    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        setSession(data.session);
        setUser(data.session?.user ?? null);
        const uid = data.session?.user?.id;
        // Show cached profile instantly, then verify in background.
        if (uid) {
          if (mounted) {
            window.clearTimeout(failsafe);
            setLoading(false); // release the UI immediately with cached profile.
          }
          const p = await fetchCurrentProfile(uid);
          if (!mounted) return;
          setProfile(p as AdminProfile | null);
          writeCachedProfile(p as AdminProfile | null);
          return;
        }
        writeCachedProfile(null);
        setProfile(null);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Auth init failed:', e);
      } finally {
        if (mounted) {
          window.clearTimeout(failsafe);
          setLoading(false);
        }
      }
    })();

    // Live auth changes.
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, sess) => {
      if (!mounted) return;
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        try {
          const p = await fetchCurrentProfile(sess.user.id);
          if (mounted) {
            setProfile(p as AdminProfile | null);
            writeCachedProfile(p as AdminProfile | null);
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('Profile fetch failed:', e);
        }
      } else {
        setProfile(null);
        writeCachedProfile(null);
      }
    });
    return () => {
      mounted = false;
      window.clearTimeout(failsafe);
      sub.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: friendly(error.message) };
    if (!data.session) return { error: 'Geen sessie ontvangen — probeer opnieuw.' };

    // Fast path: if we have a cached admin profile that matches this email, trust
    // it optimistically so the button unlocks immediately (< 500 ms round-trip
    // instead of waiting on a second profile round-trip). The onAuthStateChange
    // listener will refresh the profile in the background; RequireAdmin will
    // downgrade access if the refreshed role is not "admin".
    const cached = readCachedProfile();
    if (cached && cached.email?.toLowerCase() === email.trim().toLowerCase() && cached.role === 'admin') {
      setProfile(cached);
      // Background verify — do NOT await, do NOT block the login button.
      void (async () => {
        try {
          const fresh = await fetchCurrentProfile(data.session!.user.id) as AdminProfile | null;
          if (fresh) {
            setProfile(fresh);
            writeCachedProfile(fresh);
            if (fresh.role !== 'admin') {
              await supabase.auth.signOut();
              writeCachedProfile(null);
              window.location.replace('/');
            }
          }
        } catch { /* leave cached profile in place */ }
      })();
      return {};
    }

    // Slow path (first login OR different email): fetch profile inline so we can
    // reject non-admin sign-ins without ever showing the dashboard.
    try {
      const p = await fetchCurrentProfile(data.session.user.id) as AdminProfile | null;
      if (!p || p.role !== 'admin') {
        await supabase.auth.signOut();
        writeCachedProfile(null);
        return { error: 'Alleen beheerders mogen inloggen op het dashboard.' };
      }
      setProfile(p);
      writeCachedProfile(p);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Role check after sign-in failed:', e);
      await supabase.auth.signOut();
      writeCachedProfile(null);
      return { error: 'Profiel kon niet worden geladen — probeer opnieuw.' };
    }
    return {};
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut({ scope: 'local' });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('signOut error:', e);
    }
    setSession(null);
    setUser(null);
    setProfile(null);
    writeCachedProfile(null);
    // Hard-clear any cached supabase auth artifacts in localStorage so a
    // refresh definitely lands the user back on the login screen.
    try {
      Object.keys(window.localStorage)
        .filter(k => k.startsWith('sb-') || k.includes('supabase'))
        .forEach(k => window.localStorage.removeItem(k));
    } catch { /* localStorage may be unavailable in private mode */ }
    // Replace history so back-button cannot return to a protected page.
    window.location.replace('/');
  };

  return (
    <AuthContext.Provider value={{ loading, session, user, profile, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

function friendly(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes('invalid login') || m.includes('invalid_grant')) return 'E-mail of wachtwoord onjuist.';
  if (m.includes('email not confirmed')) return 'Bevestig eerst uw e-mailadres.';
  if (m.includes('rate')) return 'Te veel pogingen — probeer het later opnieuw.';
  if (m.includes('network')) return 'Geen verbinding — controleer uw internet.';
  return msg;
}

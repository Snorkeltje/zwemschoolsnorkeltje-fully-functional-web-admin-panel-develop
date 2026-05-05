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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AdminProfile | null>(null);

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
        if (data.session?.user) {
          const p = await fetchCurrentProfile();
          if (!mounted) return;
          setProfile(p as AdminProfile | null);
        }
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
          const p = await fetchCurrentProfile();
          if (mounted) setProfile(p as AdminProfile | null);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('Profile fetch failed:', e);
        }
      } else {
        setProfile(null);
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
    // Walter 2026-05-01: only admin users may access the dashboard.
    // Reject parent / instructor sign-ins immediately and clear the session.
    try {
      const p = await fetchCurrentProfile() as AdminProfile | null;
      if (!p || p.role !== 'admin') {
        await supabase.auth.signOut();
        return { error: 'Alleen beheerders mogen inloggen op het dashboard.' };
      }
      setProfile(p);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Role check after sign-in failed:', e);
      await supabase.auth.signOut();
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

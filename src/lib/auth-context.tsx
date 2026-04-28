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
    // Initial session restore.
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        const p = await fetchCurrentProfile();
        setProfile(p as AdminProfile | null);
      }
      setLoading(false);
    });

    // Live auth changes.
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        const p = await fetchCurrentProfile();
        setProfile(p as AdminProfile | null);
      } else {
        setProfile(null);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: friendly(error.message) };
    return {};
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
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

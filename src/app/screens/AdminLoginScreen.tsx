import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Lock, Mail, Eye, EyeOff, Waves, Shield } from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';

/// Kick off the AdminDashboardScreen chunk download in parallel with the
/// auth call. By the time signInWithPassword resolves (~300–500 ms), the
/// dashboard bundle is usually already parsed and ready to render, so the
/// user does not stare at a spinner while the JS is fetched.
function prefetchDashboardChunk() {
  return import('./admin/AdminDashboardScreen');
}

export function AdminLoginScreen() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const prefetchStartedRef = useRef(false);

  function warmDashboard() {
    if (prefetchStartedRef.current) return;
    prefetchStartedRef.current = true;
    prefetchDashboardChunk().catch(() => {
      // Silently ignore — the real navigation will retry the import.
      prefetchStartedRef.current = false;
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    warmDashboard();
    const result = await signIn(email.trim(), password);
    setSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    navigate('/admin', { replace: true });
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: '#0F1117' }}>
      {/* Left brand panel */}
      <div className="hidden lg:flex flex-col justify-between flex-1 p-12 relative overflow-hidden"
           style={{ background: 'linear-gradient(135deg, #0365C4 0%, #00C1FF 60%, #5BC1DB 100%)' }}>
        <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)' }} />
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(255,92,0,0.2), transparent 70%)' }} />
        <div className="absolute top-[40%] left-[10%] opacity-10">
          <Waves size={140} color="#fff" />
        </div>
        <div className="relative">
          <SnorkeltjeLogo />
        </div>
        <div className="relative space-y-6 text-white max-w-md">
          <h1 className="text-4xl font-bold leading-tight">Admin Dashboard</h1>
          <p className="text-white/85 text-lg leading-relaxed">
            Beheer uw zwemschool — leerlingen, instructeurs, roosters en betalingen,
            allemaal vanaf één plek.
          </p>
          <div className="flex items-center gap-3 text-white/85">
            <Shield size={20} />
            <span className="text-sm">Veilig ingelogd via Supabase</span>
          </div>
        </div>
        <div className="relative text-white/60 text-xs">
          © 2026 Zwemschool Snorkeltje · Alle rechten voorbehouden
        </div>
      </div>

      {/* Right login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile-only mini logo above the heading (also nice extra brand touch on desktop) */}
          <div className="flex flex-col items-center lg:items-start gap-3">
            <div className="lg:hidden">
              <SnorkeltjeLogo />
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center hidden lg:flex"
                 style={{ background: 'linear-gradient(135deg, #FF5C00 0%, #F5A623 100%)',
                          boxShadow: '0 8px 24px -8px rgba(255,92,0,0.5)' }}>
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div className="space-y-2 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-white">Welkom terug</h2>
              <p className="text-white/60">Log in om uw dashboard te openen</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">E-mailadres</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  value={email}
                  required
                  onFocus={warmDashboard}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-[#00C1FF] focus:ring-2 focus:ring-[#00C1FF]/30 transition"
                  placeholder="naam@snorkeltje.nl"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Wachtwoord</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-[#00C1FF] focus:ring-2 focus:ring-[#00C1FF]/30 transition"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button type="button"
                        onClick={() => setShowPwd((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                {error}
              </div>
            )}

            <button type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl font-semibold text-white shadow-lg disabled:opacity-50 transition active:scale-[0.99]"
                    style={{ background: 'linear-gradient(135deg, #FF5C00 0%, #F5A623 100%)',
                             boxShadow: '0 10px 30px -10px rgba(255,92,0,0.5)' }}>
              {submitting ? 'Bezig met inloggen…' : 'Inloggen'}
            </button>
          </form>

          <div className="text-center text-white/40 text-xs space-y-1">
            <div className="flex items-center justify-center gap-1.5">
              <Shield size={12} />
              <span>Beveiligde admin-toegang</span>
            </div>
            <p className="text-white/30">
              Alleen geautoriseerde beheerders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

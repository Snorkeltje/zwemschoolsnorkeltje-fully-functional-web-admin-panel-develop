import { ReactNode } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../lib/auth-context';

/// Guards admin routes — redirects to /admin/login when not signed in,
/// or shows an "access denied" panel for non-admin/instructor roles.
export function RequireAdmin({ children }: { children: ReactNode }) {
  const { loading, session, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0F1117' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
          <div className="text-white/60 text-sm">Sessie controleren…</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  // Walter 2026-05-01 — only the admin role may access this dashboard.
  const role = profile?.role ?? null;
  if (role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#0F1117' }}>
        <div className="max-w-md w-full p-8 rounded-2xl text-center"
             style={{ background: '#1A1D27', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.4)' }}>
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
               style={{ background: 'rgba(231,76,60,0.12)' }}>
            <Shield size={28} className="text-[#E74C3C]" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Geen toegang</h2>
          <p className="text-white/60 text-sm mb-2">
            Dit dashboard is uitsluitend voor beheerders.
          </p>
          <p className="text-white/40 text-xs mb-6">
            Uw account ({profile?.email || 'onbekend'}) heeft niet de juiste rechten om dit dashboard te openen.
          </p>
          <button
            onClick={async () => {
              await signOut();
              navigate('/admin/login', { replace: true });
            }}
            className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition active:scale-[0.99]"
            style={{ background: 'linear-gradient(135deg, #FF5C00 0%, #F5A623 100%)',
                     boxShadow: '0 8px 20px -8px rgba(255,92,0,0.5)' }}>
            <LogOut size={16} /> Uitloggen en opnieuw proberen
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

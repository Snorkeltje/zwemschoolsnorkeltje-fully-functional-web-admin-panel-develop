import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../lib/auth-context';

/// Guards admin routes — redirects to /admin/login when not signed in,
/// or shows an "access denied" panel for non-admin/instructor roles.
export function RequireAdmin({ children }: { children: ReactNode }) {
  const { loading, session, profile } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0F1117' }}>
        <div className="text-white/60">Laden…</div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  // Allow admin role — and during early development also instructor — into the dashboard.
  // Parents are redirected to the public home of the marketing site.
  const role = profile?.role ?? 'parent';
  if (role !== 'admin' && role !== 'instructor') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0F1117' }}>
        <div className="max-w-md p-8 rounded-2xl text-center"
             style={{ background: '#1A1D27', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.4)' }}>
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-white mb-2">Geen toegang</h2>
          <p className="text-white/60 text-sm">
            Dit dashboard is alleen voor admins en instructeurs.
            Uw account ({role}) heeft geen toegang.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

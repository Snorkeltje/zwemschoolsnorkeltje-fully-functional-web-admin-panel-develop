import { useEffect, useMemo, useState } from 'react';
import {
  Users, UserPlus, Shield, Trash2, Mail, Copy, CheckCircle2, X,
  AlertTriangle, ChevronDown, Clock, Search,
} from 'lucide-react';
import {
  type AdminRole, type AdminUser,
  fetchAdminRoles, fetchAdminUsers, inviteAdminUser,
  revokeAdminAccess, revokeAdminInvite, updateAdminUserRole,
} from '../../../lib/data/admin-repository';

interface Props {
  onNavigateRoles: () => void;
  showToast: (msg: string) => void;
}

/// Manage the list of admin users: view, invite new admins, assign roles,
/// revoke access. Wired to admin_roles + admin_invites in Supabase.
export function AdminUsersView({ onNavigateRoles, showToast }: Props) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [roles, setRoles] = useState<AdminRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showInvite, setShowInvite] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<AdminUser | null>(null);
  const [tempPasswordPopup, setTempPasswordPopup] = useState<{ email: string; password: string } | null>(null);

  async function reload() {
    setLoading(true);
    const [u, r] = await Promise.all([fetchAdminUsers(), fetchAdminRoles()]);
    setUsers(u);
    setRoles(r);
    setLoading(false);
  }

  useEffect(() => { void reload(); }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(u =>
      u.email.toLowerCase().includes(q) ||
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q) ||
      u.roleName.toLowerCase().includes(q),
    );
  }, [users, search]);

  async function handleAssignRole(userId: string, roleId: string | null) {
    const res = await updateAdminUserRole(userId, roleId);
    if (!res.ok) { showToast(`❌ ${res.error ?? 'Kon rol niet toewijzen'}`); return; }
    showToast('✅ Rol bijgewerkt');
    void reload();
  }

  async function handleRevoke(u: AdminUser) {
    setConfirmDelete(null);
    if (u.status === 'pending') {
      const res = await revokeAdminInvite(u.id);
      if (!res.ok) { showToast(`❌ ${res.error ?? 'Kon uitnodiging niet intrekken'}`); return; }
      showToast('✅ Uitnodiging ingetrokken');
    } else {
      const res = await revokeAdminAccess(u.id);
      if (!res.ok) { showToast(`❌ ${res.error ?? 'Kon toegang niet intrekken'}`); return; }
      showToast('✅ Admin toegang ingetrokken');
    }
    void reload();
  }

  return (
    <div>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-[#1A1A2E]" style={{ fontSize: 22, fontWeight: 700 }}>Admin gebruikers</h1>
          <p className="text-[#6B7B94] mt-0.5" style={{ fontSize: 13 }}>
            Beheer wie toegang heeft tot het admin dashboard en welke rol ze hebben.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onNavigateRoles}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 bg-white border border-[#E8ECF4] text-[#1A1A2E] hover:bg-[#F8FAFC]">
            <Shield size={16} /> Rollen &amp; rechten
          </button>
          <button
            onClick={() => setShowInvite(true)}
            className="px-4 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, #FF5C00 0%, #F5A623 100%)' }}>
            <UserPlus size={16} /> Admin uitnodigen
          </button>
        </div>
      </div>

      {/* ── Search ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#E8ECF4] p-4 mb-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Zoek op naam, e-mail of rol…"
            className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] text-[#1A1A2E] outline-none focus:border-[#00C1FF] transition"
            style={{ fontSize: 13 }}
          />
        </div>
      </div>

      {/* ── Table ──────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#E8ECF4] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Users size={40} className="mx-auto mb-3 text-[#CBD5E1]" />
            <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Geen admin gebruikers gevonden</p>
            <p className="text-[#A0AEC0] mt-1" style={{ fontSize: 12 }}>Nodig iemand uit om te beginnen.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" style={{ fontSize: 13 }}>
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E8ECF4]">
                  <th className="text-left px-4 py-3 text-[#6B7B94]" style={{ fontWeight: 600, fontSize: 11 }}>NAAM</th>
                  <th className="text-left px-4 py-3 text-[#6B7B94]" style={{ fontWeight: 600, fontSize: 11 }}>E-MAIL</th>
                  <th className="text-left px-4 py-3 text-[#6B7B94]" style={{ fontWeight: 600, fontSize: 11 }}>ROL</th>
                  <th className="text-left px-4 py-3 text-[#6B7B94]" style={{ fontWeight: 600, fontSize: 11 }}>STATUS</th>
                  <th className="text-left px-4 py-3 text-[#6B7B94]" style={{ fontWeight: 600, fontSize: 11 }}>TOEGEVOEGD</th>
                  <th className="text-right px-4 py-3 text-[#6B7B94]" style={{ fontWeight: 600, fontSize: 11 }}>ACTIES</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id} className="border-b border-[#F0F4FA] hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-4 py-3 text-[#1A1A2E]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-[11px]"
                             style={{ background: 'linear-gradient(135deg, #0365C4 0%, #00C1FF 100%)' }}>
                          {(u.firstName || u.email).charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 600 }}>{`${u.firstName} ${u.lastName}`.trim() || '—'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#6B7B94]">{u.email}</td>
                    <td className="px-4 py-3">
                      <RolePicker
                        current={u.roleId}
                        roles={roles}
                        disabled={u.status === 'pending'}
                        onChange={next => handleAssignRole(u.id, next)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      {u.status === 'active' ? (
                        <span className="px-2 py-1 rounded-full inline-flex items-center gap-1 bg-[#ECFDF5] text-[#065F46]" style={{ fontSize: 11, fontWeight: 600 }}>
                          <CheckCircle2 size={11} /> Actief
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full inline-flex items-center gap-1 bg-[#FFF7ED] text-[#9A3412]" style={{ fontSize: 11, fontWeight: 600 }}>
                          <Clock size={11} /> Uitgenodigd
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#6B7B94]" style={{ fontSize: 12 }}>
                      {new Date(u.createdAt).toLocaleDateString('nl-NL')}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setConfirmDelete(u)}
                        className="p-2 rounded-lg hover:bg-[#FEF2F2] text-[#E74C3C] transition-colors"
                        title={u.status === 'pending' ? 'Uitnodiging intrekken' : 'Toegang intrekken'}>
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Invite modal ───────────────────────────────────────────── */}
      {showInvite && (
        <InviteAdminModal
          roles={roles}
          onClose={() => setShowInvite(false)}
          onInvited={(email, pwd) => {
            setShowInvite(false);
            setTempPasswordPopup({ email, password: pwd });
            void reload();
          }}
          showToast={showToast}
        />
      )}

      {/* ── Temp password popup ────────────────────────────────────── */}
      {tempPasswordPopup && (
        <TempPasswordPopup
          email={tempPasswordPopup.email}
          password={tempPasswordPopup.password}
          onClose={() => setTempPasswordPopup(null)}
        />
      )}

      {/* ── Confirm delete ─────────────────────────────────────────── */}
      {confirmDelete && (
        <ConfirmModal
          title={confirmDelete.status === 'pending' ? 'Uitnodiging intrekken?' : 'Admin toegang intrekken?'}
          body={confirmDelete.status === 'pending'
            ? `Weet u zeker dat u de uitnodiging voor ${confirmDelete.email} wilt intrekken?`
            : `${confirmDelete.email} kan niet meer inloggen op het dashboard. Hun klant-/instructeur-gegevens blijven behouden.`}
          confirmLabel={confirmDelete.status === 'pending' ? 'Intrekken' : 'Toegang intrekken'}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => handleRevoke(confirmDelete)}
        />
      )}
    </div>
  );
}

// ══════════════════ Inline sub-components ═════════════════════════════════════

function RolePicker({ current, roles, disabled, onChange }: {
  current: string | null;
  roles: AdminRole[];
  disabled?: boolean;
  onChange: (roleId: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const currentName = current ? (roles.find(r => r.id === current)?.name ?? 'Onbekend') : 'Super Admin';
  return (
    <div className="relative inline-block">
      <button
        disabled={disabled}
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#E8ECF4] bg-white text-[#1A1A2E] hover:bg-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ fontSize: 11, fontWeight: 600 }}>
        <Shield size={11} className="text-[#0365C4]" /> {currentName}
        {!disabled && <ChevronDown size={12} className="text-[#A0AEC0]" />}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute z-40 mt-1 w-56 rounded-xl bg-white border border-[#E8ECF4] shadow-lg py-1"
               style={{ boxShadow: '0 10px 30px -10px rgba(0,0,0,0.15)' }}>
            <button
              onClick={() => { onChange(null); setOpen(false); }}
              className="w-full text-left px-3 py-2 text-[#1A1A2E] hover:bg-[#F8FAFC]" style={{ fontSize: 12 }}>
              <span className="font-semibold">Super Admin</span>
              <span className="text-[#A0AEC0] block" style={{ fontSize: 10 }}>Volledige toegang</span>
            </button>
            <div className="h-px bg-[#F0F4FA] my-1" />
            {roles.map(r => (
              <button
                key={r.id}
                onClick={() => { onChange(r.id); setOpen(false); }}
                className="w-full text-left px-3 py-2 text-[#1A1A2E] hover:bg-[#F8FAFC]" style={{ fontSize: 12 }}>
                <span className="font-semibold">{r.name}</span>
                {r.description && <span className="text-[#A0AEC0] block" style={{ fontSize: 10 }}>{r.description}</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function InviteAdminModal({ roles, onClose, onInvited, showToast }: {
  roles: AdminRole[];
  onClose: () => void;
  onInvited: (email: string, tempPassword: string) => void;
  showToast: (msg: string) => void;
}) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [roleId, setRoleId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await inviteAdminUser({ email, firstName, lastName, roleId });
    setSubmitting(false);
    if (!res.ok) { showToast(`❌ ${res.error ?? 'Uitnodiging mislukt'}`); return; }
    onInvited(email.trim().toLowerCase(), res.temporaryPassword ?? '');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>Admin uitnodigen</h2>
            <p className="text-[#6B7B94] mt-0.5" style={{ fontSize: 12 }}>
              Er wordt een tijdelijk wachtwoord aangemaakt dat u eenmalig kunt delen.
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-[#F8FAFC]"><X size={18} className="text-[#A0AEC0]" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#6B7B94] mb-1" style={{ fontSize: 11, fontWeight: 600 }}>Voornaam</label>
              <input value={firstName} onChange={e => setFirstName(e.target.value)} required
                     className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] outline-none focus:border-[#00C1FF]" style={{ fontSize: 13 }} />
            </div>
            <div>
              <label className="block text-[#6B7B94] mb-1" style={{ fontSize: 11, fontWeight: 600 }}>Achternaam</label>
              <input value={lastName} onChange={e => setLastName(e.target.value)} required
                     className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] outline-none focus:border-[#00C1FF]" style={{ fontSize: 13 }} />
            </div>
          </div>
          <div>
            <label className="block text-[#6B7B94] mb-1" style={{ fontSize: 11, fontWeight: 600 }}>E-mailadres</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                   className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] outline-none focus:border-[#00C1FF]" style={{ fontSize: 13 }} />
          </div>
          <div>
            <label className="block text-[#6B7B94] mb-1" style={{ fontSize: 11, fontWeight: 600 }}>Rol</label>
            <select value={roleId ?? ''} onChange={e => setRoleId(e.target.value || null)}
                    className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] outline-none focus:border-[#00C1FF]" style={{ fontSize: 13 }}>
              <option value="">Super Admin (volledige toegang)</option>
              {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-[#F8FAFC] text-[#6B7B94] hover:bg-[#F0F4FA]" style={{ fontSize: 13, fontWeight: 600 }}>
              Annuleren
            </button>
            <button type="submit" disabled={submitting}
                    className="px-4 py-2 rounded-lg text-white disabled:opacity-50 flex items-center gap-2"
                    style={{ fontSize: 13, fontWeight: 600, background: 'linear-gradient(135deg, #FF5C00 0%, #F5A623 100%)' }}>
              <Mail size={14} /> {submitting ? 'Aanmaken…' : 'Uitnodigen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TempPasswordPopup({ email, password, onClose }: { email: string; password: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(`E-mail: ${email}\nWachtwoord: ${password}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-[#ECFDF5] flex items-center justify-center">
            <CheckCircle2 size={22} className="text-[#10B981]" />
          </div>
          <div>
            <h2 className="text-[#1A1A2E]" style={{ fontSize: 17, fontWeight: 700 }}>Admin uitgenodigd!</h2>
            <p className="text-[#6B7B94]" style={{ fontSize: 12 }}>Deel deze inloggegevens eenmalig veilig.</p>
          </div>
        </div>

        <div className="rounded-xl bg-[#F8FAFC] border border-[#E8ECF4] p-3 mb-4 space-y-2">
          <div>
            <p className="text-[#6B7B94]" style={{ fontSize: 11, fontWeight: 600 }}>E-MAIL</p>
            <p className="text-[#1A1A2E] font-mono" style={{ fontSize: 13 }}>{email}</p>
          </div>
          <div>
            <p className="text-[#6B7B94]" style={{ fontSize: 11, fontWeight: 600 }}>TIJDELIJK WACHTWOORD</p>
            <p className="text-[#1A1A2E] font-mono" style={{ fontSize: 13 }}>{password}</p>
          </div>
        </div>

        <div className="rounded-lg bg-[#FFF7ED] border border-[#FFEDD5] p-3 mb-4 flex items-start gap-2">
          <AlertTriangle size={14} className="text-[#9A3412] mt-0.5 shrink-0" />
          <p className="text-[#9A3412]" style={{ fontSize: 11 }}>
            Dit wachtwoord wordt <b>maar één keer</b> getoond. Sla het veilig op en vraag de admin
            het bij eerste login te wijzigen.
          </p>
        </div>

        <div className="flex gap-2">
          <button onClick={copy}
                  className="flex-1 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E8ECF4] text-[#1A1A2E] flex items-center justify-center gap-2"
                  style={{ fontSize: 13, fontWeight: 600 }}>
            <Copy size={14} /> {copied ? 'Gekopieerd!' : 'Kopiëren'}
          </button>
          <button onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl text-white"
                  style={{ fontSize: 13, fontWeight: 600, background: 'linear-gradient(135deg, #FF5C00 0%, #F5A623 100%)' }}>
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({ title, body, confirmLabel, onCancel, onConfirm }: {
  title: string; body: string; confirmLabel: string; onCancel: () => void; onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-[#E74C3C]" />
          </div>
          <div>
            <h3 className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>{title}</h3>
            <p className="text-[#6B7B94] mt-1" style={{ fontSize: 12 }}>{body}</p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={onCancel}
                  className="flex-1 py-2 rounded-lg bg-[#F8FAFC] text-[#6B7B94] hover:bg-[#F0F4FA]" style={{ fontSize: 13, fontWeight: 600 }}>
            Annuleren
          </button>
          <button onClick={onConfirm}
                  className="flex-1 py-2 rounded-lg bg-[#E74C3C] text-white hover:bg-[#C0392B]" style={{ fontSize: 13, fontWeight: 600 }}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

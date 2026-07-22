import { useEffect, useMemo, useState } from 'react';
import {
  Users, UserPlus, Shield, Trash2, Mail, Copy, CheckCircle2, X,
  AlertTriangle, ChevronDown, Clock, Search, Pencil, KeyRound,
  MoreVertical, RefreshCw, Filter, ArrowUpDown, ArrowUp, ArrowDown,
} from 'lucide-react';
import {
  type AdminRole, type AdminUser,
  fetchAdminRoles, fetchAdminUsers, inviteAdminUser,
  revokeAdminAccess, revokeAdminInvite, updateAdminUserRole,
  updateAdminUserProfile, generateAdminTempPassword, deleteAdminAccount,
} from '../../../lib/data/admin-repository';
import { useAuth } from '../../../lib/auth-context';

interface Props {
  onNavigateRoles: () => void;
  showToast: (msg: string) => void;
}

type SortKey = 'name' | 'email' | 'role' | 'status' | 'created';
type SortDir = 'asc' | 'desc';

/// Manage admin users: view, invite, edit, reset password, revoke,
/// hard-delete. Fully responsive — mobile shows a card list, tablet/desktop
/// show a table.
export function AdminUsersView({ onNavigateRoles, showToast }: Props) {
  const { profile: currentUser } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [roles, setRoles] = useState<AdminRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>(''); // '' = all
  const [sortKey, setSortKey] = useState<SortKey>('created');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const [showInvite, setShowInvite] = useState(false);
  const [editUser, setEditUser] = useState<AdminUser | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ user: AdminUser; mode: 'revoke' | 'hard' } | null>(null);
  const [confirmReset, setConfirmReset] = useState<AdminUser | null>(null);
  const [tempPasswordPopup, setTempPasswordPopup] = useState<{ email: string; password: string; kind: 'invite' | 'reset' } | null>(null);
  const [emailSentPopup, setEmailSentPopup] = useState<string | null>(null);

  async function reload(silent = false) {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    const [u, r] = await Promise.all([fetchAdminUsers(), fetchAdminRoles()]);
    setUsers(u);
    setRoles(r);
    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => { void reload(); }, []);

  const filtered = useMemo(() => {
    let out = users;
    if (roleFilter) {
      out = out.filter(u => (roleFilter === '__super__' ? u.roleId === null : u.roleId === roleFilter));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter(u =>
        u.email.toLowerCase().includes(q) ||
        u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q) ||
        u.roleName.toLowerCase().includes(q),
      );
    }
    const dir = sortDir === 'asc' ? 1 : -1;
    return [...out].sort((a, b) => {
      let av: string; let bv: string;
      switch (sortKey) {
        case 'name':   av = `${a.firstName} ${a.lastName}`.trim().toLowerCase(); bv = `${b.firstName} ${b.lastName}`.trim().toLowerCase(); break;
        case 'email':  av = a.email.toLowerCase(); bv = b.email.toLowerCase(); break;
        case 'role':   av = a.roleName.toLowerCase(); bv = b.roleName.toLowerCase(); break;
        case 'status': av = a.status;   bv = b.status; break;
        case 'created':
        default:       av = a.createdAt; bv = b.createdAt; break;
      }
      if (av < bv) return -1 * dir;
      if (av > bv) return  1 * dir;
      return 0;
    });
  }, [users, search, roleFilter, sortKey, sortDir]);

  function toggleSort(k: SortKey) {
    if (sortKey === k) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(k); setSortDir('asc'); }
  }

  const stats = useMemo(() => {
    const active = users.filter(u => u.status === 'active').length;
    const pending = users.filter(u => u.status === 'pending').length;
    const superAdmins = users.filter(u => u.roleId === null && u.status === 'active').length;
    return { total: users.length, active, pending, superAdmins };
  }, [users]);

  // ── Handlers ──────────────────────────────────────────────────────────
  async function handleAssignRole(userId: string, roleId: string | null) {
    const res = await updateAdminUserRole(userId, roleId);
    if (!res.ok) { showToast(`❌ ${res.error ?? 'Kon rol niet toewijzen'}`); return; }
    showToast('✅ Rol bijgewerkt');
    void reload(true);
  }

  async function handleRevokeOrDelete(u: AdminUser, mode: 'revoke' | 'hard') {
    setConfirmDelete(null);
    if (u.status === 'pending') {
      const res = await revokeAdminInvite(u.id);
      if (!res.ok) { showToast(`❌ ${res.error ?? 'Kon uitnodiging niet intrekken'}`); return; }
      showToast('✅ Uitnodiging ingetrokken');
    } else if (mode === 'hard') {
      const res = await deleteAdminAccount(u.id);
      if (!res.ok) { showToast(`❌ ${res.error ?? 'Kon account niet verwijderen'}`); return; }
      showToast('✅ Account definitief verwijderd');
    } else {
      const res = await revokeAdminAccess(u.id);
      if (!res.ok) { showToast(`❌ ${res.error ?? 'Kon toegang niet intrekken'}`); return; }
      showToast('✅ Admin toegang ingetrokken');
    }
    void reload(true);
  }

  async function handleResetPassword(u: AdminUser) {
    setConfirmReset(null);
    const res = await generateAdminTempPassword(u.id, u.email);
    if (!res.ok) { showToast(`❌ ${res.error ?? 'Wachtwoord reset mislukt'}`); return; }
    if (res.temporaryPassword) {
      setTempPasswordPopup({ email: u.email, password: res.temporaryPassword, kind: 'reset' });
    } else {
      setEmailSentPopup(u.email);
    }
  }

  return (
    <div>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 sm:mb-6">
        <div className="min-w-0">
          <h1 className="text-[#1A1A2E]" style={{ fontSize: 22, fontWeight: 700 }}>Admin gebruikers</h1>
          <p className="text-[#6B7B94] mt-0.5 hidden sm:block" style={{ fontSize: 13 }}>
            Beheer wie toegang heeft tot het admin dashboard en welke rol ze hebben.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          <button
            onClick={() => reload(true)}
            disabled={refreshing}
            className="p-2.5 rounded-xl bg-white border border-[#E8ECF4] text-[#6B7B94] hover:bg-[#F8FAFC] disabled:opacity-50"
            title="Vernieuwen">
            <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={onNavigateRoles}
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 bg-white border border-[#E8ECF4] text-[#1A1A2E] hover:bg-[#F8FAFC] whitespace-nowrap">
            <Shield size={16} /> <span className="hidden sm:inline">Rollen &amp; rechten</span><span className="sm:hidden">Rollen</span>
          </button>
          <button
            onClick={() => setShowInvite(true)}
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg, #FF5C00 0%, #F5A623 100%)' }}>
            <UserPlus size={16} /> <span className="hidden sm:inline">Admin uitnodigen</span><span className="sm:hidden">Uitnodigen</span>
          </button>
        </div>
      </div>

      {/* ── KPI tiles ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <KpiTile icon={Users}   color="#0365C4" label="Totaal"        value={stats.total} />
        <KpiTile icon={CheckCircle2} color="#10B981" label="Actief"    value={stats.active} />
        <KpiTile icon={Clock}   color="#F59E0B" label="Uitgenodigd"    value={stats.pending} />
        <KpiTile icon={Shield}  color="#8B5CF6" label="Super Admins"   value={stats.superAdmins} />
      </div>

      {/* ── Filters bar ────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#E8ECF4] p-3 sm:p-4 mb-4 flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
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
        <div className="relative sm:min-w-[220px]">
          <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]" />
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] text-[#1A1A2E] outline-none focus:border-[#00C1FF] appearance-none"
            style={{ fontSize: 13 }}>
            <option value="">Alle rollen</option>
            <option value="__super__">Super Admin</option>
            {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0AEC0] pointer-events-none" />
        </div>
      </div>

      {/* ── Table (tablet+) ────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#E8ECF4] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#A0AEC0]" style={{ fontSize: 13 }}>Laden…</div>
        ) : filtered.length === 0 ? (
          <EmptyState onInvite={() => setShowInvite(true)} />
        ) : (
          <>
            {/* ── Desktop / tablet table ───────────────────────────── */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full" style={{ fontSize: 13 }}>
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E8ECF4]">
                    <SortHeader label="NAAM"     current={sortKey} me="name"    dir={sortDir} onClick={toggleSort} />
                    <SortHeader label="E-MAIL"   current={sortKey} me="email"   dir={sortDir} onClick={toggleSort} />
                    <SortHeader label="ROL"      current={sortKey} me="role"    dir={sortDir} onClick={toggleSort} />
                    <SortHeader label="STATUS"   current={sortKey} me="status"  dir={sortDir} onClick={toggleSort} />
                    <SortHeader label="TOEGEVOEGD" current={sortKey} me="created" dir={sortDir} onClick={toggleSort} />
                    <th className="text-right px-4 py-3 text-[#6B7B94]" style={{ fontWeight: 600, fontSize: 11 }}>ACTIES</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(u => (
                    <UserRow
                      key={u.id}
                      user={u}
                      roles={roles}
                      isSelf={currentUser?.id === u.id}
                      onAssignRole={rid => handleAssignRole(u.id, rid)}
                      onEdit={() => setEditUser(u)}
                      onReset={() => setConfirmReset(u)}
                      onRevoke={() => setConfirmDelete({ user: u, mode: 'revoke' })}
                      onDelete={() => setConfirmDelete({ user: u, mode: 'hard' })}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Mobile card list ─────────────────────────────────── */}
            <div className="md:hidden divide-y divide-[#F0F4FA]">
              {filtered.map(u => (
                <UserCard
                  key={u.id}
                  user={u}
                  roles={roles}
                  isSelf={currentUser?.id === u.id}
                  onAssignRole={rid => handleAssignRole(u.id, rid)}
                  onEdit={() => setEditUser(u)}
                  onReset={() => setConfirmReset(u)}
                  onRevoke={() => setConfirmDelete({ user: u, mode: 'revoke' })}
                  onDelete={() => setConfirmDelete({ user: u, mode: 'hard' })}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Modals ─────────────────────────────────────────────────── */}
      {showInvite && (
        <InviteAdminModal
          roles={roles}
          onClose={() => setShowInvite(false)}
          onInvited={(email, pwd) => {
            setShowInvite(false);
            setTempPasswordPopup({ email, password: pwd, kind: 'invite' });
            void reload(true);
          }}
          showToast={showToast}
        />
      )}
      {editUser && (
        <EditAdminModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSaved={() => { setEditUser(null); void reload(true); showToast('✅ Wijzigingen opgeslagen'); }}
          showToast={showToast}
        />
      )}
      {tempPasswordPopup && (
        <TempPasswordPopup
          {...tempPasswordPopup}
          onClose={() => setTempPasswordPopup(null)}
        />
      )}
      {emailSentPopup && (
        <EmailSentPopup email={emailSentPopup} onClose={() => setEmailSentPopup(null)} />
      )}
      {confirmReset && (
        <ConfirmModal
          intent="warn"
          title="Wachtwoord opnieuw instellen?"
          body={`Er wordt een nieuw tijdelijk wachtwoord aangemaakt voor ${confirmReset.email}. Als de edge functie niet beschikbaar is, sturen we in plaats daarvan een reset-link naar dit e-mailadres.`}
          confirmLabel="Reset uitvoeren"
          onCancel={() => setConfirmReset(null)}
          onConfirm={() => handleResetPassword(confirmReset)}
        />
      )}
      {confirmDelete && (
        <ConfirmModal
          intent="danger"
          title={
            confirmDelete.user.status === 'pending' ? 'Uitnodiging intrekken?'
            : confirmDelete.mode === 'hard' ? 'Account definitief verwijderen?'
            : 'Admin toegang intrekken?'
          }
          body={
            confirmDelete.user.status === 'pending'
              ? `Weet u zeker dat u de uitnodiging voor ${confirmDelete.user.email} wilt intrekken?`
              : confirmDelete.mode === 'hard'
                ? `Het account van ${confirmDelete.user.email} wordt volledig verwijderd — inclusief inloggegevens en profiel. Deze actie kan NIET ongedaan worden gemaakt.`
                : `${confirmDelete.user.email} kan niet meer inloggen op het dashboard. Klant-/instructeur-gegevens blijven behouden en zijn later te herstellen.`
          }
          confirmLabel={
            confirmDelete.user.status === 'pending' ? 'Intrekken'
            : confirmDelete.mode === 'hard' ? 'Definitief verwijderen'
            : 'Toegang intrekken'
          }
          typeToConfirm={confirmDelete.mode === 'hard' ? confirmDelete.user.email : undefined}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => handleRevokeOrDelete(confirmDelete.user, confirmDelete.mode)}
        />
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
//   Sub-components
// ═════════════════════════════════════════════════════════════════════════════

function KpiTile({ icon: Icon, color, label, value }: {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string; label: string; value: number;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#E8ECF4] p-3 sm:p-4 flex items-center gap-3">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0"
           style={{ background: `${color}14` }}>
        <Icon size={18} color={color} />
      </div>
      <div className="min-w-0">
        <p className="text-[#6B7B94]" style={{ fontSize: 11, fontWeight: 600 }}>{label}</p>
        <p className="text-[#1A1A2E]" style={{ fontSize: 20, fontWeight: 800 }}>{value}</p>
      </div>
    </div>
  );
}

function SortHeader({ label, current, me, dir, onClick }: {
  label: string; current: SortKey; me: SortKey; dir: SortDir; onClick: (k: SortKey) => void;
}) {
  const active = current === me;
  return (
    <th
      onClick={() => onClick(me)}
      className="text-left px-4 py-3 text-[#6B7B94] cursor-pointer select-none hover:text-[#1A1A2E]"
      style={{ fontWeight: 600, fontSize: 11 }}>
      <span className="inline-flex items-center gap-1">
        {label}
        {active
          ? (dir === 'asc' ? <ArrowUp size={11} /> : <ArrowDown size={11} />)
          : <ArrowUpDown size={11} className="opacity-40" />}
      </span>
    </th>
  );
}

function EmptyState({ onInvite }: { onInvite: () => void }) {
  return (
    <div className="p-8 sm:p-12 text-center">
      <Users size={40} className="mx-auto mb-3 text-[#CBD5E1]" />
      <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Geen admin gebruikers gevonden</p>
      <p className="text-[#A0AEC0] mt-1 mb-4" style={{ fontSize: 12 }}>Nodig iemand uit om te beginnen.</p>
      <button onClick={onInvite}
              className="px-4 py-2 rounded-xl text-white text-sm font-semibold inline-flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #FF5C00 0%, #F5A623 100%)' }}>
        <UserPlus size={15} /> Admin uitnodigen
      </button>
    </div>
  );
}

interface RowProps {
  user: AdminUser;
  roles: AdminRole[];
  isSelf: boolean;
  onAssignRole: (roleId: string | null) => void;
  onEdit: () => void;
  onReset: () => void;
  onRevoke: () => void;
  onDelete: () => void;
}

function UserRow(p: RowProps) {
  const u = p.user;
  return (
    <tr className="border-b border-[#F0F4FA] hover:bg-[#F8FAFC] transition-colors">
      <td className="px-4 py-3 text-[#1A1A2E]">
        <div className="flex items-center gap-2">
          <Avatar name={u.firstName || u.email} />
          <div className="min-w-0">
            <div style={{ fontWeight: 600 }}>{`${u.firstName} ${u.lastName}`.trim() || '—'}</div>
            {p.isSelf && <div className="text-[#0365C4]" style={{ fontSize: 10, fontWeight: 600 }}>Dit ben jij</div>}
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-[#6B7B94] break-all">{u.email}</td>
      <td className="px-4 py-3">
        <RolePicker
          current={u.roleId}
          roles={p.roles}
          disabled={u.status === 'pending'}
          onChange={p.onAssignRole}
        />
      </td>
      <td className="px-4 py-3"><StatusPill status={u.status} /></td>
      <td className="px-4 py-3 text-[#6B7B94]" style={{ fontSize: 12 }}>
        {new Date(u.createdAt).toLocaleDateString('nl-NL')}
      </td>
      <td className="px-4 py-3 text-right">
        <RowActions user={u} isSelf={p.isSelf}
                    onEdit={p.onEdit} onReset={p.onReset}
                    onRevoke={p.onRevoke} onDelete={p.onDelete} />
      </td>
    </tr>
  );
}

function UserCard(p: RowProps) {
  const u = p.user;
  return (
    <div className="p-4 hover:bg-[#F8FAFC]">
      <div className="flex items-start gap-3">
        <Avatar name={u.firstName || u.email} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-[#1A1A2E] truncate" style={{ fontSize: 14, fontWeight: 700 }}>
                {`${u.firstName} ${u.lastName}`.trim() || '—'}
                {p.isSelf && <span className="ml-2 text-[#0365C4]" style={{ fontSize: 10, fontWeight: 600 }}>(jij)</span>}
              </div>
              <div className="text-[#6B7B94] truncate mt-0.5" style={{ fontSize: 12 }}>{u.email}</div>
            </div>
            <RowActions user={u} isSelf={p.isSelf}
                        onEdit={p.onEdit} onReset={p.onReset}
                        onRevoke={p.onRevoke} onDelete={p.onDelete} />
          </div>
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <RolePicker current={u.roleId} roles={p.roles}
                        disabled={u.status === 'pending'} onChange={p.onAssignRole} />
            <StatusPill status={u.status} />
          </div>
          <div className="mt-2 text-[#A0AEC0]" style={{ fontSize: 11 }}>
            Toegevoegd op {new Date(u.createdAt).toLocaleDateString('nl-NL')}
          </div>
        </div>
      </div>
    </div>
  );
}

function Avatar({ name, size = 'sm' }: { name: string; size?: 'sm' | 'lg' }) {
  const px = size === 'lg' ? 40 : 32;
  return (
    <div className="rounded-full flex items-center justify-center text-white font-semibold shrink-0"
         style={{ width: px, height: px, fontSize: size === 'lg' ? 14 : 11,
                  background: 'linear-gradient(135deg, #0365C4 0%, #00C1FF 100%)' }}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function StatusPill({ status }: { status: AdminUser['status'] }) {
  return status === 'active' ? (
    <span className="px-2 py-1 rounded-full inline-flex items-center gap-1 bg-[#ECFDF5] text-[#065F46]"
          style={{ fontSize: 11, fontWeight: 600 }}>
      <CheckCircle2 size={11} /> Actief
    </span>
  ) : (
    <span className="px-2 py-1 rounded-full inline-flex items-center gap-1 bg-[#FFF7ED] text-[#9A3412]"
          style={{ fontSize: 11, fontWeight: 600 }}>
      <Clock size={11} /> Uitgenodigd
    </span>
  );
}

function RowActions({ user, isSelf, onEdit, onReset, onRevoke, onDelete }: {
  user: AdminUser; isSelf: boolean;
  onEdit: () => void; onReset: () => void; onRevoke: () => void; onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(o => !o)}
        className="p-2 rounded-lg hover:bg-[#F0F4FA] text-[#6B7B94]"
        title="Acties">
        <MoreVertical size={16} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute z-50 right-0 mt-1 w-56 rounded-xl bg-white border border-[#E8ECF4] shadow-lg py-1"
               style={{ boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)' }}>
            {user.status === 'active' && (
              <>
                <ActionItem icon={Pencil} label="Bewerken"
                            onClick={() => { setOpen(false); onEdit(); }} />
                <ActionItem icon={KeyRound} label="Wachtwoord resetten"
                            onClick={() => { setOpen(false); onReset(); }} />
                {!isSelf && (
                  <>
                    <div className="h-px bg-[#F0F4FA] my-1" />
                    <ActionItem icon={Shield} label="Toegang intrekken" color="#9A3412"
                                onClick={() => { setOpen(false); onRevoke(); }} />
                    <ActionItem icon={Trash2} label="Definitief verwijderen" color="#E74C3C"
                                onClick={() => { setOpen(false); onDelete(); }} />
                  </>
                )}
              </>
            )}
            {user.status === 'pending' && (
              <ActionItem icon={Trash2} label="Uitnodiging intrekken" color="#E74C3C"
                          onClick={() => { setOpen(false); onRevoke(); }} />
            )}
            {isSelf && user.status === 'active' && (
              <div className="px-3 py-2 text-[#A0AEC0]" style={{ fontSize: 11 }}>
                Uw eigen account kan niet worden verwijderd.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function ActionItem({ icon: Icon, label, color = '#1A1A2E', onClick }: {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string; color?: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-[#F8FAFC]"
      style={{ color, fontSize: 12, fontWeight: 500 }}>
      <Icon size={14} color={color} /> {label}
    </button>
  );
}

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
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute z-50 mt-1 w-64 rounded-xl bg-white border border-[#E8ECF4] shadow-lg py-1 max-h-72 overflow-y-auto"
               style={{ boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)' }}>
            <button
              onClick={() => { onChange(null); setOpen(false); }}
              className="w-full text-left px-3 py-2 text-[#1A1A2E] hover:bg-[#F8FAFC]" style={{ fontSize: 12 }}>
              <span className="font-semibold flex items-center gap-1.5"><Shield size={12} className="text-[#0365C4]" /> Super Admin</span>
              <span className="text-[#A0AEC0] block mt-0.5" style={{ fontSize: 10 }}>Volledige toegang tot alles</span>
            </button>
            <div className="h-px bg-[#F0F4FA] my-1" />
            {roles.map(r => (
              <button
                key={r.id}
                onClick={() => { onChange(r.id); setOpen(false); }}
                className="w-full text-left px-3 py-2 text-[#1A1A2E] hover:bg-[#F8FAFC]" style={{ fontSize: 12 }}>
                <span className="font-semibold flex items-center gap-1.5">
                  <Shield size={12} className={r.isSystem ? 'text-[#0365C4]' : 'text-[#FF5C00]'} /> {r.name}
                </span>
                {r.description && <span className="text-[#A0AEC0] block mt-0.5" style={{ fontSize: 10 }}>{r.description}</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
//   Modals
// ═════════════════════════════════════════════════════════════════════════════

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
    <Modal onClose={onClose} title="Admin uitnodigen"
           subtitle="Er wordt een tijdelijk wachtwoord aangemaakt dat u eenmalig kunt delen.">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="Voornaam">
            <input value={firstName} onChange={e => setFirstName(e.target.value)} required
                   className="w-full px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] outline-none focus:border-[#00C1FF]" style={{ fontSize: 14 }} />
          </FormField>
          <FormField label="Achternaam">
            <input value={lastName} onChange={e => setLastName(e.target.value)} required
                   className="w-full px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] outline-none focus:border-[#00C1FF]" style={{ fontSize: 14 }} />
          </FormField>
        </div>
        <FormField label="E-mailadres">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                 className="w-full px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] outline-none focus:border-[#00C1FF]" style={{ fontSize: 14 }} />
        </FormField>
        <FormField label="Rol">
          <select value={roleId ?? ''} onChange={e => setRoleId(e.target.value || null)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] outline-none focus:border-[#00C1FF]" style={{ fontSize: 14 }}>
            <option value="">Super Admin (volledige toegang)</option>
            {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </FormField>
        <ModalActions>
          <button type="button" onClick={onClose} className="modal-btn-secondary">Annuleren</button>
          <button type="submit" disabled={submitting} className="modal-btn-primary">
            <Mail size={14} /> {submitting ? 'Aanmaken…' : 'Uitnodigen'}
          </button>
        </ModalActions>
      </form>
    </Modal>
  );
}

function EditAdminModal({ user, onClose, onSaved, showToast }: {
  user: AdminUser;
  onClose: () => void;
  onSaved: () => void;
  showToast: (msg: string) => void;
}) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName]   = useState(user.lastName);
  const [phone, setPhone]         = useState(user.phone ?? '');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await updateAdminUserProfile(user.id, { firstName, lastName, phone });
    setSubmitting(false);
    if (!res.ok) { showToast(`❌ ${res.error ?? 'Wijzigingen niet opgeslagen'}`); return; }
    onSaved();
  }

  return (
    <Modal onClose={onClose} title="Admin bewerken"
           subtitle={`Wijzig de profielgegevens van ${user.email}`}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="Voornaam">
            <input value={firstName} onChange={e => setFirstName(e.target.value)} required
                   className="w-full px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] outline-none focus:border-[#00C1FF]" style={{ fontSize: 14 }} />
          </FormField>
          <FormField label="Achternaam">
            <input value={lastName} onChange={e => setLastName(e.target.value)} required
                   className="w-full px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] outline-none focus:border-[#00C1FF]" style={{ fontSize: 14 }} />
          </FormField>
        </div>
        <FormField label="Telefoon (optioneel)">
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                 placeholder="+31 6 12345678"
                 className="w-full px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] outline-none focus:border-[#00C1FF]" style={{ fontSize: 14 }} />
        </FormField>
        <FormField label="E-mail (kan niet worden gewijzigd)">
          <input value={user.email} disabled
                 className="w-full px-3 py-2.5 rounded-lg bg-[#F0F4FA] border border-[#E8ECF4] text-[#6B7B94] cursor-not-allowed" style={{ fontSize: 14 }} />
        </FormField>
        <ModalActions>
          <button type="button" onClick={onClose} className="modal-btn-secondary">Annuleren</button>
          <button type="submit" disabled={submitting} className="modal-btn-primary">
            {submitting ? 'Opslaan…' : 'Opslaan'}
          </button>
        </ModalActions>
      </form>
    </Modal>
  );
}

function TempPasswordPopup({ email, password, kind, onClose }: {
  email: string; password: string; kind: 'invite' | 'reset'; onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(`E-mail: ${email}\nWachtwoord: ${password}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  }
  const title = kind === 'invite' ? 'Admin uitgenodigd!' : 'Nieuw wachtwoord aangemaakt';
  const subtitle = kind === 'invite'
    ? 'Deel deze inloggegevens eenmalig veilig.'
    : 'Deel het nieuwe wachtwoord veilig met de admin. Ze moeten dit direct wijzigen bij eerste login.';
  return (
    <Modal onClose={onClose} title={title} subtitle={subtitle} icon="success">
      <div className="rounded-xl bg-[#F8FAFC] border border-[#E8ECF4] p-3 mb-4 space-y-2">
        <div>
          <p className="text-[#6B7B94]" style={{ fontSize: 11, fontWeight: 600 }}>E-MAIL</p>
          <p className="text-[#1A1A2E] font-mono break-all" style={{ fontSize: 13 }}>{email}</p>
        </div>
        <div>
          <p className="text-[#6B7B94]" style={{ fontSize: 11, fontWeight: 600 }}>TIJDELIJK WACHTWOORD</p>
          <p className="text-[#1A1A2E] font-mono break-all" style={{ fontSize: 13 }}>{password}</p>
        </div>
      </div>
      <div className="rounded-lg bg-[#FFF7ED] border border-[#FFEDD5] p-3 mb-4 flex items-start gap-2">
        <AlertTriangle size={14} className="text-[#9A3412] mt-0.5 shrink-0" />
        <p className="text-[#9A3412]" style={{ fontSize: 11 }}>
          Dit wachtwoord wordt <b>maar één keer</b> getoond. Sla het veilig op en vraag de admin
          het bij eerste login te wijzigen.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
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
    </Modal>
  );
}

function EmailSentPopup({ email, onClose }: { email: string; onClose: () => void }) {
  return (
    <Modal onClose={onClose} title="Reset-link verstuurd" icon="success"
           subtitle={`We hebben een e-mail naar ${email} gestuurd met een link om het wachtwoord opnieuw in te stellen.`}>
      <div className="rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] p-3 mb-4 flex items-start gap-2">
        <Mail size={14} className="text-[#1E40AF] mt-0.5 shrink-0" />
        <p className="text-[#1E40AF]" style={{ fontSize: 12 }}>
          De admin ontvangt een e-mail met een veilige link. De link is 1 uur geldig.
        </p>
      </div>
      <button onClick={onClose}
              className="w-full py-2.5 rounded-xl text-white"
              style={{ fontSize: 13, fontWeight: 600, background: 'linear-gradient(135deg, #FF5C00 0%, #F5A623 100%)' }}>
        Sluiten
      </button>
    </Modal>
  );
}

function ConfirmModal({ intent, title, body, confirmLabel, typeToConfirm, onCancel, onConfirm }: {
  intent: 'warn' | 'danger';
  title: string; body: string; confirmLabel: string;
  typeToConfirm?: string;
  onCancel: () => void; onConfirm: () => void;
}) {
  const [typed, setTyped] = useState('');
  const disabled = typeToConfirm ? typed.trim().toLowerCase() !== typeToConfirm.toLowerCase() : false;
  const iconColor = intent === 'danger' ? '#E74C3C' : '#F59E0B';
  const iconBg    = intent === 'danger' ? '#FEF2F2' : '#FFF7ED';
  const btnBg     = intent === 'danger' ? '#E74C3C' : '#F59E0B';
  return (
    <Modal onClose={onCancel} title={title} maxWidth="sm">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: iconBg }}>
          <AlertTriangle size={20} color={iconColor} />
        </div>
        <p className="text-[#6B7B94]" style={{ fontSize: 13, lineHeight: 1.5 }}>{body}</p>
      </div>
      {typeToConfirm && (
        <div className="mb-4">
          <label className="block text-[#6B7B94] mb-1" style={{ fontSize: 11, fontWeight: 600 }}>
            Typ <span className="font-mono text-[#1A1A2E]">{typeToConfirm}</span> om te bevestigen
          </label>
          <input value={typed} onChange={e => setTyped(e.target.value)}
                 className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#E8ECF4] outline-none focus:border-[#E74C3C]"
                 style={{ fontSize: 14 }} />
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-2">
        <button onClick={onCancel}
                className="flex-1 py-2.5 rounded-xl bg-[#F8FAFC] text-[#6B7B94] hover:bg-[#F0F4FA]" style={{ fontSize: 13, fontWeight: 600 }}>
          Annuleren
        </button>
        <button onClick={onConfirm} disabled={disabled}
                className="flex-1 py-2.5 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontSize: 13, fontWeight: 600, background: btnBg }}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
//   Shared modal primitives
// ═════════════════════════════════════════════════════════════════════════════

function Modal({ children, onClose, title, subtitle, maxWidth = 'md', icon }: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  subtitle?: string;
  maxWidth?: 'sm' | 'md' | 'lg';
  icon?: 'success';
}) {
  const wCls = maxWidth === 'sm' ? 'max-w-sm' : maxWidth === 'lg' ? 'max-w-lg' : 'max-w-md';
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div className={`w-full ${wCls} rounded-2xl bg-white p-5 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto`}
           onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4 gap-3">
          <div className="flex items-start gap-3 min-w-0">
            {icon === 'success' && (
              <div className="w-11 h-11 rounded-xl bg-[#ECFDF5] flex items-center justify-center shrink-0">
                <CheckCircle2 size={22} className="text-[#10B981]" />
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>{title}</h2>
              {subtitle && <p className="text-[#6B7B94] mt-0.5" style={{ fontSize: 12 }}>{subtitle}</p>}
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-[#F8FAFC] shrink-0">
            <X size={18} className="text-[#A0AEC0]" />
          </button>
        </div>
        <style>{`
          .modal-btn-primary { padding: 10px 16px; border-radius: 10px; color: white; font-size: 13px; font-weight: 600; background: linear-gradient(135deg, #FF5C00 0%, #F5A623 100%); display: inline-flex; align-items: center; gap: 6px; }
          .modal-btn-primary:disabled { opacity: 0.5; }
          .modal-btn-secondary { padding: 10px 16px; border-radius: 10px; background: #F8FAFC; color: #6B7B94; font-size: 13px; font-weight: 600; }
          .modal-btn-secondary:hover { background: #F0F4FA; }
        `}</style>
        {children}
      </div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[#6B7B94] mb-1" style={{ fontSize: 11, fontWeight: 600 }}>{label}</label>
      {children}
    </div>
  );
}

function ModalActions({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">{children}</div>;
}

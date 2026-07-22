import { useEffect, useMemo, useState } from 'react';
import {
  Shield, Plus, Users, Lock, Trash2, Save, X, AlertTriangle, ArrowLeft, Search,
} from 'lucide-react';
import {
  type AdminRole,
  ALL_PERMISSIONS,
  createAdminRole, deleteAdminRole, fetchAdminRoles, updateAdminRole,
} from '../../../lib/data/admin-repository';

interface Props {
  onNavigateBack: () => void;
  showToast: (msg: string) => void;
}

/// CRUD for admin roles + their permission checkboxes. Wired to the
/// admin_roles table in Supabase.
export function AdminRolesView({ onNavigateBack, showToast }: Props) {
  const [roles, setRoles] = useState<AdminRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRole, setEditingRole] = useState<AdminRole | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<AdminRole | null>(null);

  async function reload() {
    setLoading(true);
    setRoles(await fetchAdminRoles());
    setLoading(false);
  }
  useEffect(() => { void reload(); }, []);

  async function handleDelete(role: AdminRole) {
    setConfirmDelete(null);
    const res = await deleteAdminRole(role.id);
    if (!res.ok) { showToast(`❌ ${res.error ?? 'Kon rol niet verwijderen'}`); return; }
    showToast('✅ Rol verwijderd');
    void reload();
  }

  // ── Detail editor mode ─────────────────────────────────────────────────
  if (editingRole) {
    return (
      <RoleEditor
        role={editingRole}
        onCancel={() => setEditingRole(null)}
        onSaved={() => { setEditingRole(null); void reload(); }}
        showToast={showToast}
      />
    );
  }

  return (
    <div>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onNavigateBack}
                  className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-[#1A1A2E]" style={{ fontSize: 22, fontWeight: 700 }}>Rollen &amp; rechten</h1>
            <p className="text-[#6B7B94] mt-0.5" style={{ fontSize: 13 }}>
              Definieer welke acties elke rol mag uitvoeren.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="px-4 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg, #FF5C00 0%, #F5A623 100%)' }}>
          <Plus size={16} /> Nieuwe rol
        </button>
      </div>

      {/* ── Roles list ─────────────────────────────────────────────── */}
      {loading ? (
        <div className="p-12 text-center text-[#A0AEC0]">Laden…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map(r => (
            <div key={r.id}
                 className="bg-white rounded-xl border border-[#E8ECF4] p-5 hover:shadow-md transition-shadow cursor-pointer"
                 onClick={() => setEditingRole(r)}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                     style={{ background: r.isSystem ? 'rgba(3,101,196,0.10)' : 'rgba(255,92,0,0.10)' }}>
                  <Shield size={20} color={r.isSystem ? '#0365C4' : '#FF5C00'} />
                </div>
                {r.isSystem && (
                  <span className="px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#1E40AF] flex items-center gap-1"
                        style={{ fontSize: 10, fontWeight: 600 }}>
                    <Lock size={10} /> Systeem
                  </span>
                )}
              </div>
              <h3 className="text-[#1A1A2E] mb-1" style={{ fontSize: 15, fontWeight: 700 }}>{r.name}</h3>
              <p className="text-[#6B7B94] mb-3" style={{ fontSize: 12, minHeight: 32 }}>
                {r.description || 'Geen beschrijving'}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-[#F0F4FA]">
                <div className="flex items-center gap-1.5 text-[#6B7B94]" style={{ fontSize: 11 }}>
                  <Users size={12} /> {r.memberCount} {r.memberCount === 1 ? 'gebruiker' : 'gebruikers'}
                </div>
                <div className="flex items-center gap-1.5 text-[#6B7B94]" style={{ fontSize: 11 }}>
                  <Shield size={12} />
                  {r.permissions.includes('*') ? 'Alle rechten' : `${r.permissions.length} rechten`}
                </div>
              </div>
              {!r.isSystem && (
                <div className="mt-3 pt-3 border-t border-[#F0F4FA] flex justify-end">
                  <button
                    onClick={e => { e.stopPropagation(); setConfirmDelete(r); }}
                    className="p-1.5 rounded-lg hover:bg-[#FEF2F2] text-[#E74C3C]"
                    title="Verwijderen">
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Create modal ───────────────────────────────────────────── */}
      {showCreate && (
        <CreateRoleModal
          onClose={() => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); void reload(); }}
          showToast={showToast}
        />
      )}

      {/* ── Confirm delete ─────────────────────────────────────────── */}
      {confirmDelete && (
        <ConfirmDelete
          role={confirmDelete}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => handleDelete(confirmDelete)}
        />
      )}
    </div>
  );
}

// ══════════════════ Detail editor with permission checkboxes ═════════════════

function RoleEditor({ role, onCancel, onSaved, showToast }: {
  role: AdminRole;
  onCancel: () => void;
  onSaved: () => void;
  showToast: (msg: string) => void;
}) {
  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description ?? '');
  const [permissions, setPermissions] = useState<Set<string>>(new Set(role.permissions));
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  const hasWildcard = permissions.has('*');

  const groups = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = q
      ? ALL_PERMISSIONS.filter(p => p.label.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q))
      : ALL_PERMISSIONS;
    const byGroup: Record<string, typeof ALL_PERMISSIONS> = {};
    for (const p of filtered) {
      byGroup[p.group] = byGroup[p.group] || [];
      byGroup[p.group].push(p);
    }
    return Object.entries(byGroup);
  }, [search]);

  function toggle(slug: string) {
    setPermissions(prev => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug); else next.add(slug);
      return next;
    });
  }

  function toggleGroup(groupPerms: typeof ALL_PERMISSIONS) {
    setPermissions(prev => {
      const next = new Set(prev);
      const allOn = groupPerms.every(p => next.has(p.slug));
      if (allOn) groupPerms.forEach(p => next.delete(p.slug));
      else groupPerms.forEach(p => next.add(p.slug));
      return next;
    });
  }

  async function handleSave() {
    setSaving(true);
    const perms = hasWildcard ? ['*'] : Array.from(permissions);
    const res = await updateAdminRole(role.id, {
      name: name.trim(),
      description: description.trim(),
      permissions: perms,
    });
    setSaving(false);
    if (!res.ok) { showToast(`❌ ${res.error ?? 'Kon rol niet opslaan'}`); return; }
    showToast('✅ Rol opgeslagen');
    onSaved();
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onCancel} className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-[#1A1A2E]" style={{ fontSize: 22, fontWeight: 700 }}>
              {role.isSystem ? role.name : 'Rol bewerken'}
            </h1>
            <p className="text-[#6B7B94] mt-0.5" style={{ fontSize: 13 }}>
              {role.isSystem
                ? 'Systeemrol — naam en beschrijving zijn beveiligd. U kunt wel rechten aanpassen.'
                : 'Pas de naam, beschrijving en toegewezen rechten aan.'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onCancel}
                  className="px-4 py-2 rounded-xl bg-white border border-[#E8ECF4] text-[#1A1A2E]"
                  style={{ fontSize: 13, fontWeight: 600 }}>
            Annuleren
          </button>
          <button onClick={handleSave} disabled={saving}
                  className="px-4 py-2 rounded-xl text-white flex items-center gap-2 disabled:opacity-50"
                  style={{ fontSize: 13, fontWeight: 600, background: 'linear-gradient(135deg, #FF5C00 0%, #F5A623 100%)' }}>
            <Save size={14} /> {saving ? 'Opslaan…' : 'Opslaan'}
          </button>
        </div>
      </div>

      {/* Meta form */}
      <div className="bg-white rounded-xl border border-[#E8ECF4] p-5 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#6B7B94] mb-1" style={{ fontSize: 11, fontWeight: 600 }}>ROLNAAM</label>
            <input value={name} onChange={e => setName(e.target.value)} disabled={role.isSystem}
                   className="w-full px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] outline-none focus:border-[#00C1FF] disabled:opacity-60"
                   style={{ fontSize: 14 }} />
          </div>
          <div>
            <label className="block text-[#6B7B94] mb-1" style={{ fontSize: 11, fontWeight: 600 }}>BESCHRIJVING</label>
            <input value={description} onChange={e => setDescription(e.target.value)} disabled={role.isSystem}
                   className="w-full px-3 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] outline-none focus:border-[#00C1FF] disabled:opacity-60"
                   style={{ fontSize: 14 }} />
          </div>
        </div>
      </div>

      {/* Wildcard toggle */}
      <div className={`rounded-xl p-4 mb-4 border ${hasWildcard ? 'bg-[#EFF6FF] border-[#BFDBFE]' : 'bg-white border-[#E8ECF4]'}`}>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={hasWildcard}
                 onChange={() => {
                   setPermissions(prev => {
                     const next = new Set(prev);
                     if (next.has('*')) next.delete('*'); else { next.clear(); next.add('*'); }
                     return next;
                   });
                 }}
                 className="mt-0.5 h-4 w-4 rounded border-[#CBD5E1]" />
          <div>
            <div className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>Volledige toegang (Super Admin)</div>
            <div className="text-[#6B7B94]" style={{ fontSize: 12 }}>Wanneer aan, worden alle individuele rechten hieronder genegeerd en heeft deze rol overal toegang toe.</div>
          </div>
        </label>
      </div>

      {/* Search */}
      {!hasWildcard && (
        <div className="mb-4">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]" />
            <input value={search} onChange={e => setSearch(e.target.value)}
                   placeholder="Zoek recht…"
                   className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-[#E8ECF4] outline-none focus:border-[#00C1FF]"
                   style={{ fontSize: 13 }} />
          </div>
        </div>
      )}

      {/* Permission groups */}
      {!hasWildcard && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map(([groupName, perms]) => {
            const groupOn = perms.filter(p => permissions.has(p.slug)).length;
            const allOn = groupOn === perms.length;
            return (
              <div key={groupName} className="bg-white rounded-xl border border-[#E8ECF4] p-4">
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#F0F4FA]">
                  <div>
                    <h3 className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{groupName}</h3>
                    <p className="text-[#6B7B94]" style={{ fontSize: 11 }}>{groupOn} van {perms.length} rechten</p>
                  </div>
                  <button onClick={() => toggleGroup(perms)}
                          className="text-[#0365C4] hover:underline"
                          style={{ fontSize: 11, fontWeight: 600 }}>
                    {allOn ? 'Alles uit' : 'Alles aan'}
                  </button>
                </div>
                <div className="space-y-2">
                  {perms.map(p => (
                    <label key={p.slug} className="flex items-start gap-2 cursor-pointer p-1.5 -mx-1.5 rounded hover:bg-[#F8FAFC]">
                      <input type="checkbox" checked={permissions.has(p.slug)}
                             onChange={() => toggle(p.slug)}
                             className="mt-0.5 h-4 w-4 rounded border-[#CBD5E1]" />
                      <div>
                        <div className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 500 }}>{p.label}</div>
                        <div className="text-[#A0AEC0] font-mono" style={{ fontSize: 10 }}>{p.slug}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ══════════════════ Create role modal ════════════════════════════════════════

function CreateRoleModal({ onClose, onCreated, showToast }: {
  onClose: () => void;
  onCreated: () => void;
  showToast: (msg: string) => void;
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await createAdminRole({ name, description, permissions: ['dashboard.view'] });
    setSubmitting(false);
    if (!res.ok) { showToast(`❌ ${res.error ?? 'Kon rol niet aanmaken'}`); return; }
    showToast('✅ Rol aangemaakt — pas nu de rechten aan.');
    onCreated();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>Nieuwe rol</h2>
            <p className="text-[#6B7B94] mt-0.5" style={{ fontSize: 12 }}>
              Na aanmaken kunt u de rechten van deze rol aanpassen.
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-[#F8FAFC]"><X size={18} className="text-[#A0AEC0]" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[#6B7B94] mb-1" style={{ fontSize: 11, fontWeight: 600 }}>ROLNAAM</label>
            <input value={name} onChange={e => setName(e.target.value)} required
                   placeholder="bv. Ondersteuning"
                   className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] outline-none focus:border-[#00C1FF]" style={{ fontSize: 13 }} />
          </div>
          <div>
            <label className="block text-[#6B7B94] mb-1" style={{ fontSize: 11, fontWeight: 600 }}>BESCHRIJVING</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)}
                      placeholder="Waarvoor is deze rol bedoeld?"
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E8ECF4] outline-none focus:border-[#00C1FF]" style={{ fontSize: 13 }} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-[#F8FAFC] text-[#6B7B94] hover:bg-[#F0F4FA]" style={{ fontSize: 13, fontWeight: 600 }}>
              Annuleren
            </button>
            <button type="submit" disabled={submitting}
                    className="px-4 py-2 rounded-lg text-white disabled:opacity-50"
                    style={{ fontSize: 13, fontWeight: 600, background: 'linear-gradient(135deg, #FF5C00 0%, #F5A623 100%)' }}>
              {submitting ? 'Aanmaken…' : 'Aanmaken'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ConfirmDelete({ role, onCancel, onConfirm }: {
  role: AdminRole; onCancel: () => void; onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-[#E74C3C]" />
          </div>
          <div>
            <h3 className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>Rol verwijderen?</h3>
            <p className="text-[#6B7B94] mt-1" style={{ fontSize: 12 }}>
              De rol <b>{role.name}</b> wordt verwijderd. Deze actie kan niet ongedaan worden gemaakt.
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={onCancel}
                  className="flex-1 py-2 rounded-lg bg-[#F8FAFC] text-[#6B7B94]" style={{ fontSize: 13, fontWeight: 600 }}>
            Annuleren
          </button>
          <button onClick={onConfirm}
                  className="flex-1 py-2 rounded-lg bg-[#E74C3C] text-white" style={{ fontSize: 13, fontWeight: 600 }}>
            Verwijderen
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState, ReactNode, Component } from 'react';
import { useNavigate } from 'react-router';
import {
  LayoutDashboard, Users, Calendar, FileText, CreditCard, DollarSign,
  ClipboardList, UserCheck, Grid3X3, MessageSquare, Bell, Settings,
  MapPin, BarChart3, ChevronDown, ChevronRight, Menu, X, LogOut,
  Search, ChevronLeft, Waves, UserCog, Shield, Globe, Smartphone,
  HelpCircle, Maximize2, Moon, Sun,
  AlertTriangle, RefreshCw,
  // Walter 2026-04-28 — extra admin pages required
  GraduationCap, Star, BookOpen, Plane, ListChecks, Megaphone, Wallet,
} from 'lucide-react';
import snorkeltjeLogo from '../../../imports/logo-3.svg';
import snorkeltjeLogoPng from 'figma:asset/9b639bb791c2a6aa104eacafd5c0253b9d1ddf3e.png';
import snorkeltjeMascot from 'figma:asset/9e42bfdd73fd962b6a8fec73f33768136284d03f.png';
import { useAdminNotifications } from '../../../lib/hooks/useAdmin';
import { markAllNotificationsRead, markNotificationRead } from '../../../lib/data/admin-repository';

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const sec = Math.max(1, Math.floor(diffMs / 1000));
  if (sec < 60) return `${sec} sec geleden`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min geleden`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} uur geleden`;
  const days = Math.floor(hr / 24);
  if (days < 7) return `${days} dag${days === 1 ? '' : 'en'} geleden`;
  return new Date(iso).toLocaleDateString('nl-NL');
}

export type AdminView =
  | 'dashboard'
  | 'customers' | 'customer-new' | 'customer-detail'
  | 'reservations' | 'reservation-new' | 'reservation-detail'
  | 'calendar' | 'roster' | 'fixed-schedule'
  | 'invoices' | 'invoice-new' | 'invoice-detail' | 'invoice-history' | 'open-items'
  | 'punch-cards' | 'punch-card-detail' | 'wallets'
  | 'payments'
  | 'tasks'
  | 'registrations'
  | 'instructors' | 'instructor-detail' | 'vacation-requests'
  | 'children' | 'child-progress'
  | 'locations'
  | 'messages'
  | 'notifications-admin' | 'announcements'
  | 'reports'
  | 'settings' | 'devices' | 'profile-admin' | 'help-support'
  // Walter 2026-04-28 additions
  | 'waitlist' | 'slot-interest'
  | 'exams' | 'exam-continuation'
  | 'reviews' | 'review-approval'
  | 'curriculum' | 'curriculum-editor'
  // Walter 2026-07-22 additions — admin RBAC
  | 'admin-users' | 'admin-roles';

interface NavItem {
  id: string;
  label: string;
  icon: any;
  view?: AdminView;
  badge?: number;
  /// Disabled items show a "Binnenkort" badge and do nothing on click.
  disabled?: boolean;
  /// "Work in progress" — shows an "In ontwikkeling" badge but the item is
  /// still clickable. Use this to signal that a page is still being built
  /// while letting the client preview what's there.
  wip?: boolean;
  children?: { label: string; view: AdminView; badge?: number; disabled?: boolean; wip?: boolean }[];
}

const navItems: NavItem[] = [
  // === DASHBOARD ===
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' },

  // === CUSTOMERS ===
  {
    id: 'customers', label: 'Klanten', icon: Users, children: [
      { label: 'Overzicht', view: 'customers' },
      { label: 'Voortgang per kind', view: 'child-progress' },
      { label: 'Nieuwe klant', view: 'customer-new' },
      { label: 'Registratie verzoeken', view: 'registrations' },
    ]
  },

  // === RESERVATIONS + SCHEDULE ===
  {
    id: 'reservations', label: 'Reserveringen', icon: Calendar, children: [
      { label: 'Overzicht', view: 'reservations' },
      { label: 'Nieuwe reservering', view: 'reservation-new' },
      { label: 'Kalender (week)', view: 'calendar' },
      { label: 'Rooster (dag)', view: 'roster' },
      { label: 'Vast rooster (Excel)', view: 'fixed-schedule' },
    ]
  },
  {
    id: 'waitlist', label: 'Wachtlijst', icon: ListChecks, children: [
      { label: 'Overzicht', view: 'waitlist' },
      { label: 'Slot-interesses', view: 'slot-interest' },
    ]
  },

  // === EXAMS / DIPLOMAS / REVIEWS ===
  {
    id: 'exams', label: 'Examens', icon: GraduationCap, children: [
      { label: 'Examenkandidaten', view: 'exams' },
      { label: 'Vervolg-aanvragen (24h)', view: 'exam-continuation' },
    ]
  },
  {
    id: 'reviews', label: 'Beoordelingen', icon: Star, children: [
      { label: 'Alle reviews', view: 'reviews' },
      { label: 'Te modereren (<6)', view: 'review-approval' },
    ]
  },

  // === FINANCE ===
  {
    id: 'invoices', label: 'Facturatie', icon: FileText, children: [
      { label: 'Overzicht', view: 'invoices' },
      { label: 'Nieuwe factuur', view: 'invoice-new' },
      { label: 'Factuur historie', view: 'invoice-history' },
      { label: 'Openstaande posten', view: 'open-items' },
    ]
  },
  { id: 'wallets', label: 'Tegoed / Wallets', icon: Wallet, view: 'wallets' },
  { id: 'payments', label: 'Betalingen', icon: DollarSign, view: 'payments' },

  // === OPERATIONS ===
  { id: 'tasks', label: 'Taken', icon: ClipboardList, view: 'tasks' },
  {
    id: 'staff', label: 'Personeel', icon: UserCog, children: [
      { label: 'Instructeurs', view: 'instructors' },
      { label: 'Vakantieaanvragen', view: 'vacation-requests' },
    ]
  },
  { id: 'locations', label: 'Locaties', icon: MapPin, view: 'locations' },

  // === CONTENT ===
  { id: 'curriculum', label: 'Lesplan', icon: BookOpen, view: 'curriculum' },

  // === COMMUNICATION ===
  {
    id: 'communication', label: 'Communicatie', icon: MessageSquare, children: [
      { label: 'Berichten met ouders', view: 'messages' },
      { label: 'Notificaties versturen', view: 'announcements' },
    ]
  },

  // === REPORTS / SETTINGS ===
  { id: 'reports', label: 'Rapporten', icon: BarChart3, view: 'reports' },
  {
    id: 'admin-team', label: 'Team & rollen', icon: Shield, children: [
      { label: 'Admin gebruikers', view: 'admin-users' },
      { label: 'Rollen & rechten', view: 'admin-roles' },
    ]
  },
  { id: 'settings', label: 'Instellingen', icon: Settings, view: 'settings' },
];

interface AdminLayoutProps {
  children: ReactNode;
  currentView: AdminView;
  onNavigate: (view: AdminView) => void;
  onSearch?: (query: string) => void;
}

export function AdminLayout({ children, currentView, onNavigate, onSearch }: AdminLayoutProps) {
  const { data: notifList, unreadCount: notifications, refresh: refreshNotifs } = useAdminNotifications();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['customers', 'reservations', 'invoices']);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifPanel, setShowNotifPanel] = useState(false);

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
  };

  const isActive = (view?: AdminView, children?: { view: AdminView }[]) => {
    if (view === currentView) return true;
    if (children?.some(c => c.view === currentView)) return true;
    return false;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden p-1">
          <img src={snorkeltjeMascot} alt="Snorkeltje" className="w-full h-full object-contain" />
        </div>
        {sidebarOpen && (
          <div className="min-w-0">
            <p className="text-white truncate" style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.3px' }}>Zwemschool Snorkeltje</p>
            <p className="text-[#00C1FF] truncate" style={{ fontSize: 10, fontWeight: 600 }}>Admin Dashboard</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
        {navItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item.view, item.children);
          const expanded = expandedGroups.includes(item.id);
          const totalBadge = item.badge || item.children?.reduce((s, c) => s + (c.badge || 0), 0) || 0;

          if (item.children) {
            return (
              <div key={item.id} className={`mb-0.5 ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <button
                  disabled={item.disabled}
                  onClick={() => {
                    if (item.disabled) return;
                    toggleGroup(item.id); if (!sidebarOpen) setSidebarOpen(true);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all group ${item.disabled ? 'cursor-not-allowed text-white/40' : (active ? 'bg-white/12 text-white' : 'text-white/60 hover:bg-white/6 hover:text-white/90')}`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 text-left truncate" style={{ fontSize: 13, fontWeight: active ? 600 : 500 }}>{item.label}</span>
                      {item.disabled ? (
                        <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-white/60" style={{ fontSize: 9, fontWeight: 700 }}>Binnenkort</span>
                      ) : (
                        <>
                          {item.wip && <span className="px-1.5 py-0.5 rounded-full bg-[#F5A623]/20 text-[#F5A623]" style={{ fontSize: 9, fontWeight: 700 }}>In ontwikkeling</span>}
                          {totalBadge > 0 && <span className="px-1.5 py-0.5 rounded-full bg-[#FF5C00] text-white" style={{ fontSize: 10, fontWeight: 700 }}>{totalBadge}</span>}
                          <ChevronDown size={14} className={`transition-transform flex-shrink-0 ${expanded ? 'rotate-180' : ''}`} style={{ opacity: 0.5 }} />
                        </>
                      )}
                    </>
                  )}
                </button>
                {sidebarOpen && expanded && !item.disabled && (
                  <div className="ml-[30px] mt-0.5 space-y-0.5 border-l border-white/10 pl-3">
                    {item.children.map(child => (
                      <button
                        key={child.view}
                        disabled={child.disabled}
                        onClick={() => { if (child.disabled) return; onNavigate(child.view); setMobileMenuOpen(false); }}
                        className={`w-full text-left px-3 py-2 rounded-md transition-all flex items-center justify-between ${child.disabled ? 'cursor-not-allowed text-white/30' : (currentView === child.view ? 'bg-[#0365C4]/40 text-white' : 'text-white/50 hover:text-white/80 hover:bg-white/5')}`}
                        style={{ fontSize: 12, fontWeight: currentView === child.view ? 600 : 400 }}
                      >
                        <span>{child.label}</span>
                        {child.disabled
                          ? <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-white/50" style={{ fontSize: 9, fontWeight: 700 }}>Binnenkort</span>
                          : child.wip
                            ? <span className="px-1.5 py-0.5 rounded-full bg-[#F5A623]/20 text-[#F5A623]" style={{ fontSize: 9, fontWeight: 700 }}>In ontwikkeling</span>
                            : (child.badge ? <span className="px-1.5 py-0.5 rounded-full bg-[#FF5C00] text-white" style={{ fontSize: 9, fontWeight: 700 }}>{child.badge}</span> : null)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={item.id}
              disabled={item.disabled}
              onClick={() => { if (item.disabled) return; onNavigate(item.view!); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all mb-0.5 ${item.disabled ? 'cursor-not-allowed text-white/40 opacity-60' : (active ? 'bg-white/12 text-white' : 'text-white/60 hover:bg-white/6 hover:text-white/90')}`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left truncate" style={{ fontSize: 13, fontWeight: active ? 600 : 500 }}>{item.label}</span>
                  {item.disabled
                    ? <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-white/60" style={{ fontSize: 9, fontWeight: 700 }}>Binnenkort</span>
                    : item.wip
                      ? <span className="px-1.5 py-0.5 rounded-full bg-[#F5A623]/20 text-[#F5A623]" style={{ fontSize: 9, fontWeight: 700 }}>In ontwikkeling</span>
                      : (item.badge ? <span className="px-1.5 py-0.5 rounded-full bg-[#FF5C00] text-white" style={{ fontSize: 10, fontWeight: 700 }}>{item.badge}</span> : null)}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom links */}
      <div className="border-t border-white/10 p-3 space-y-0.5">
        <a
          href="https://www.zwemschoolsnorkeltje.nl/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all"
        >
          <Globe size={16} />{sidebarOpen && <span style={{ fontSize: 12 }}>Website</span>}
        </a>
        <button onClick={() => navigate('/mobile-install')} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all">
          <Smartphone size={16} />{sidebarOpen && <span style={{ fontSize: 12 }}>Mobile App installeren</span>}
        </button>
        <button onClick={() => onNavigate('help-support')} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all">
          <HelpCircle size={16} />
          {sidebarOpen && <span style={{ fontSize: 12 }}>Help & Support</span>}
        </button>
      </div>

      {/* User */}
      {sidebarOpen && (
        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF5C00] to-[#F5A623] flex items-center justify-center text-white" style={{ fontSize: 13, fontWeight: 700 }}>WG</div>
            <div className="min-w-0 flex-1">
              <p className="text-white truncate" style={{ fontSize: 12, fontWeight: 600 }}>Walter Van De Geest</p>
              <p className="text-white/40 truncate" style={{ fontSize: 10 }}>Super Admin</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex" style={{ background: '#F4F7FC' }}>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col flex-shrink-0 transition-all duration-300 ${sidebarOpen ? 'w-[250px]' : 'w-[68px]'}`} style={{ background: '#0F1A2E' }}>
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[260px] flex flex-col" style={{ background: '#0F1A2E' }}>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-[#E8ECF4] sticky top-0 z-30 px-4 sm:px-6">
          <div className="flex items-center gap-3 h-[56px]">
            <button onClick={() => { if (window.innerWidth >= 1024) setSidebarOpen(!sidebarOpen); else setMobileMenuOpen(true); }} className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]">
              {sidebarOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
            </button>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-[480px]">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]" />
                <input
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Zoek klant, reservering, factuur..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#F4F7FC] border border-transparent focus:border-[#0365C4] outline-none text-[#1A1A2E] placeholder:text-[#A0AEC0]"
                  style={{ fontSize: 13 }}
                />
              </div>
            </form>

            <div className="flex items-center gap-1.5 ml-auto">
              {/* Quick actions */}
              <button onClick={() => onNavigate('reservation-new')} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white hover:opacity-90 transition-all" style={{ background: '#0365C4', fontSize: 12, fontWeight: 600 }}>
                + Reservering
              </button>

              {/* Notifications */}
              <div className="relative">
                <button onClick={() => setShowNotifPanel(!showNotifPanel)} className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94] relative">
                  <Bell size={18} />
                  {notifications > 0 && <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-[#E74C3C] text-white flex items-center justify-center" style={{ fontSize: 9, fontWeight: 700, minWidth: 18, height: 18 }}>{notifications}</span>}
                </button>
                {showNotifPanel && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifPanel(false)} />
                    <div className="absolute right-0 top-full mt-2 w-[340px] bg-white rounded-xl shadow-xl z-50" style={{ border: '1px solid #E8ECF4' }}>
                      <div className="px-4 py-3 border-b border-[#F0F4FA] flex items-center justify-between">
                        <h4 className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>Notificaties</h4>
                        <button
                          onClick={async () => { await markAllNotificationsRead(); await refreshNotifs(); }}
                          disabled={notifications === 0}
                          className="text-[#0365C4] disabled:text-[#A0AEC0] disabled:cursor-not-allowed"
                          style={{ fontSize: 12 }}
                        >
                          Alles gelezen
                        </button>
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        {notifList.length === 0 ? (
                          <div className="px-4 py-8 text-center">
                            <Bell size={24} className="text-[#C4CDD9] mx-auto mb-2" />
                            <p className="text-[#6B7B94]" style={{ fontSize: 13, fontWeight: 600 }}>Geen notificaties</p>
                            <p className="text-[#A0AEC0] mt-0.5" style={{ fontSize: 11 }}>
                              Je bent helemaal bij. Nieuwe meldingen verschijnen hier real-time.
                            </p>
                          </div>
                        ) : (
                          notifList.map(n => (
                            <button
                              key={n.id}
                              onClick={async () => {
                                if (!n.read) { await markNotificationRead(n.id); await refreshNotifs(); }
                              }}
                              className={`w-full text-left px-4 py-3 hover:bg-[#F8FAFC] border-b border-[#F0F4FA] last:border-0 transition-colors ${n.read ? '' : 'bg-[#F0F8FF]'}`}
                            >
                              <div className="flex items-start gap-2.5">
                                <div
                                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                                  style={{ background: n.read ? '#C4CDD9' : '#FF5C00' }}
                                />
                                <div className="min-w-0 flex-1">
                                  <p className="text-[#1A1A2E] truncate" style={{ fontSize: 13, fontWeight: n.read ? 500 : 700 }}>{n.title}</p>
                                  <p className="text-[#6B7B94]" style={{ fontSize: 12, lineHeight: 1.4 }}>{n.body}</p>
                                  <p className="text-[#A0AEC0] mt-0.5" style={{ fontSize: 11 }}>{relativeTime(n.createdAt)}</p>
                                </div>
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                      <div className="px-4 py-2.5 border-t border-[#F0F4FA] text-center">
                        <button onClick={() => { onNavigate('notifications-admin'); setShowNotifPanel(false); }} className="text-[#0365C4]" style={{ fontSize: 12, fontWeight: 600 }}>Alle notificaties bekijken</button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* User menu */}
              <div className="relative">
                <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#F4F7FC]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF5C00] to-[#F5A623] flex items-center justify-center text-white" style={{ fontSize: 11, fontWeight: 700 }}>WG</div>
                  <ChevronDown size={14} className="text-[#A0AEC0] hidden sm:block" />
                </button>
                {showUserMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                    <div className="absolute right-0 top-full mt-2 w-[200px] bg-white rounded-xl shadow-xl z-50 py-1" style={{ border: '1px solid #E8ECF4' }}>
                      <div className="px-4 py-2.5 border-b border-[#F0F4FA]">
                        <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>Walter Van De Geest</p>
                        <p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Super Admin</p>
                      </div>
                      <button onClick={() => { onNavigate('profile-admin'); setShowUserMenu(false); }} className="w-full text-left px-4 py-2 hover:bg-[#F4F7FC] text-[#4A5568] flex items-center gap-2" style={{ fontSize: 13 }}><Shield size={14} /> Profiel</button>
                      <button onClick={() => { onNavigate('devices'); setShowUserMenu(false); }} className="w-full text-left px-4 py-2 hover:bg-[#F4F7FC] text-[#4A5568] flex items-center gap-2" style={{ fontSize: 13 }}><Smartphone size={14} /> Apparaten</button>
                      <button onClick={() => { onNavigate('settings'); setShowUserMenu(false); }} className="w-full text-left px-4 py-2 hover:bg-[#F4F7FC] text-[#4A5568] flex items-center gap-2" style={{ fontSize: 13 }}><Settings size={14} /> Instellingen</button>
                      <div className="border-t border-[#F0F4FA]" />
                      <button onClick={() => navigate('/')} className="w-full text-left px-4 py-2 hover:bg-[#FEF2F2] text-[#E74C3C] flex items-center gap-2" style={{ fontSize: 13 }}><LogOut size={14} /> Uitloggen</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <PageErrorBoundary key={currentView}>
            {children}
          </PageErrorBoundary>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#E8ECF4] bg-white px-4 sm:px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Admin: Walter Van De Geest</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#A0AEC0]" style={{ fontSize: 11 }}>Zwemschool Snorkeltje Admin v1.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

/// Per-page error boundary inside AdminLayout.
/// When one page throws, the sidebar / nav stays usable so the user can pick
/// another page. Resets automatically when `key` (= currentView) changes.
class PageErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  state = { hasError: false, error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { hasError: true, error }; }
  componentDidCatch(error: Error, info: { componentStack?: string }) {
    // eslint-disable-next-line no-console
    console.error('[PageErrorBoundary]', error, info?.componentStack);
  }
  render() {
    if (!this.state.hasError) return this.props.children;
    const isProd = import.meta.env.MODE === 'production';
    return (
      <div className="max-w-2xl mx-auto p-8 mt-12 rounded-2xl"
           style={{ background: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', border: '1px solid #FECACA' }}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
               style={{ background: '#FEF2F2' }}>
            <AlertTriangle size={22} className="text-[#E74C3C]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[#1A1A2E] mb-1" style={{ fontSize: 18, fontWeight: 800 }}>Deze pagina kon niet worden geladen</h2>
            <p className="text-[#6B7B94]" style={{ fontSize: 13 }}>
              Een onverwachte fout op deze pagina. De rest van het dashboard werkt normaal — gebruik de zijbalk om door te gaan.
            </p>
            {!isProd && this.state.error && (
              <p className="mt-3 p-2 rounded text-[#991B1B] font-mono break-all"
                 style={{ background: '#FEF2F2', fontSize: 11, lineHeight: 1.4 }}>
                {this.state.error.name}: {this.state.error.message}
              </p>
            )}
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-4 flex items-center gap-1.5 px-4 py-2 rounded-lg text-white"
              style={{ fontSize: 13, fontWeight: 600, background: '#0365C4' }}
            >
              <RefreshCw size={14} /> Probeer opnieuw
            </button>
          </div>
        </div>
      </div>
    );
  }
}
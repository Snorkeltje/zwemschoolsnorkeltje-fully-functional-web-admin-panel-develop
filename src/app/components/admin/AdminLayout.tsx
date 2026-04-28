import { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import {
  LayoutDashboard, Users, Calendar, FileText, CreditCard, DollarSign,
  ClipboardList, UserCheck, Grid3X3, MessageSquare, Bell, Settings,
  MapPin, BarChart3, ChevronDown, ChevronRight, Menu, X, LogOut,
  Search, ChevronLeft, Waves, UserCog, Shield, Globe, Smartphone,
  HelpCircle, Maximize2, Moon, Sun
} from 'lucide-react';
import snorkeltjeLogo from '../../../imports/logo-3.svg';
import snorkeltjeLogoPng from 'figma:asset/9b639bb791c2a6aa104eacafd5c0253b9d1ddf3e.png';
import snorkeltjeMascot from 'figma:asset/9e42bfdd73fd962b6a8fec73f33768136284d03f.png';

export type AdminView =
  | 'dashboard'
  | 'customers' | 'customer-new' | 'customer-detail'
  | 'reservations' | 'reservation-new' | 'reservation-detail'
  | 'calendar' | 'roster'
  | 'invoices' | 'invoice-new' | 'invoice-detail' | 'invoice-history' | 'open-items'
  | 'punch-cards' | 'punch-card-detail'
  | 'payments'
  | 'tasks'
  | 'registrations'
  | 'instructors' | 'instructor-detail'
  | 'locations'
  | 'messages'
  | 'notifications-admin'
  | 'reports'
  | 'settings' | 'devices' | 'profile-admin';

interface NavItem {
  id: string;
  label: string;
  icon: any;
  view?: AdminView;
  badge?: number;
  /// Walter 2026-04-26: only Dashboard is enabled while admin is being built.
  /// Disabled items show a "Binnenkort" badge and do nothing on click.
  disabled?: boolean;
  children?: { label: string; view: AdminView; badge?: number; disabled?: boolean }[];
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' },
  {
    id: 'customers', label: 'Klanten', icon: Users, disabled: true, children: [
      { label: 'Overzicht', view: 'customers', disabled: true },
      { label: 'Nieuwe klant', view: 'customer-new', disabled: true },
      { label: 'Registratie verzoeken', view: 'registrations', badge: 3, disabled: true },
    ]
  },
  {
    id: 'reservations', label: 'Reserveringen', icon: Calendar, disabled: true, children: [
      { label: 'Overzicht', view: 'reservations', disabled: true },
      { label: 'Nieuwe reservering', view: 'reservation-new', disabled: true },
      { label: 'Kalender', view: 'calendar', disabled: true },
      { label: 'Rooster', view: 'roster', disabled: true },
    ]
  },
  {
    id: 'invoices', label: 'Facturatie', icon: FileText, disabled: true, children: [
      { label: 'Overzicht', view: 'invoices', disabled: true },
      { label: 'Nieuwe factuur', view: 'invoice-new', disabled: true },
      { label: 'Factuur historie', view: 'invoice-history', disabled: true },
      { label: 'Openstaande posten', view: 'open-items', disabled: true },
    ]
  },
  { id: 'punch-cards', label: 'Knipkaarten', icon: CreditCard, view: 'punch-cards', disabled: true },
  { id: 'payments', label: 'Betalingen', icon: DollarSign, view: 'payments', disabled: true },
  { id: 'tasks', label: 'Taken', icon: ClipboardList, view: 'tasks', badge: 5, disabled: true },
  { id: 'instructors', label: 'Instructeurs', icon: UserCog, view: 'instructors', disabled: true },
  { id: 'locations', label: 'Locaties', icon: MapPin, view: 'locations', disabled: true },
  { id: 'messages', label: 'Berichten', icon: MessageSquare, view: 'messages', badge: 12, disabled: true },
  { id: 'reports', label: 'Rapporten', icon: BarChart3, view: 'reports', disabled: true },
  { id: 'settings', label: 'Instellingen', icon: Settings, view: 'settings', disabled: true },
];

interface AdminLayoutProps {
  children: ReactNode;
  currentView: AdminView;
  onNavigate: (view: AdminView) => void;
  notifications?: number;
  onSearch?: (query: string) => void;
}

export function AdminLayout({ children, currentView, onNavigate, notifications = 8, onSearch }: AdminLayoutProps) {
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
                    : (item.badge ? <span className="px-1.5 py-0.5 rounded-full bg-[#FF5C00] text-white" style={{ fontSize: 10, fontWeight: 700 }}>{item.badge}</span> : null)}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom links — disabled while admin is being built */}
      <div className="border-t border-white/10 p-3 space-y-0.5">
        <button disabled className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/30 cursor-not-allowed">
          <Globe size={16} />{sidebarOpen && <span style={{ fontSize: 12 }}>Website — Binnenkort</span>}
        </button>
        <button disabled className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/30 cursor-not-allowed">
          <Smartphone size={16} />{sidebarOpen && <span style={{ fontSize: 12 }}>Mobile App — Binnenkort</span>}
        </button>
        <button disabled className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/30 cursor-not-allowed">
          <HelpCircle size={16} />{sidebarOpen && <span style={{ fontSize: 12 }}>Help — Binnenkort</span>}
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

            {/* Search — disabled while admin is being built */}
            <div className="flex-1 max-w-[480px]">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]" />
                <input
                  disabled
                  placeholder="Zoeken — Binnenkort beschikbaar"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#F4F7FC] border border-transparent text-[#A0AEC0] placeholder:text-[#A0AEC0] opacity-60 cursor-not-allowed"
                  style={{ fontSize: 13 }}
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 ml-auto">
              {/* Quick actions — disabled while admin is being built */}
              <button disabled title="Binnenkort beschikbaar"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white opacity-50 cursor-not-allowed"
                style={{ background: '#0365C4', fontSize: 12, fontWeight: 600 }}>
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
                        <button className="text-[#0365C4]" style={{ fontSize: 12 }}>Alles gelezen</button>
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        {[
                          { title: 'Nieuwe registratie', desc: 'Emma de Vries heeft een account aangevraagd', time: '2 min geleden', color: '#FF5C00' },
                          { title: 'Reservering geannuleerd', desc: 'RES-2026-0451 is geannuleerd door klant', time: '15 min geleden', color: '#E74C3C' },
                          { title: 'Knipkaart besteld', desc: 'KNP-3089 — 10x 1-op-1 — €380,00', time: '1 uur geleden', color: '#27AE60' },
                          { title: 'Betaling ontvangen', desc: 'Mollie betaling €380,00 van Walter VdG', time: '2 uur geleden', color: '#0365C4' },
                          { title: 'Taak deadline', desc: 'Factuur FIN-2026-445 verlopen', time: '3 uur geleden', color: '#E67E22' },
                        ].map((n, i) => (
                          <div key={i} className="px-4 py-3 hover:bg-[#F8FAFC] border-b border-[#F0F4FA] last:border-0 cursor-pointer">
                            <div className="flex items-start gap-2.5">
                              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.color }} />
                              <div className="min-w-0">
                                <p className="text-[#1A1A2E] truncate" style={{ fontSize: 13, fontWeight: 600 }}>{n.title}</p>
                                <p className="text-[#6B7B94] truncate" style={{ fontSize: 12 }}>{n.desc}</p>
                                <p className="text-[#A0AEC0] mt-0.5" style={{ fontSize: 11 }}>{n.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-2.5 border-t border-[#F0F4FA] text-center">
                        <button disabled className="text-[#0365C4] opacity-40 cursor-not-allowed" style={{ fontSize: 12, fontWeight: 600 }}>Alle notificaties — Binnenkort</button>
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
                      <button disabled className="w-full text-left px-4 py-2 text-[#4A5568] opacity-40 cursor-not-allowed flex items-center gap-2" style={{ fontSize: 13 }}><Shield size={14} /> Profiel <span className="ml-auto text-[10px]">Binnenkort</span></button>
                      <button disabled className="w-full text-left px-4 py-2 text-[#4A5568] opacity-40 cursor-not-allowed flex items-center gap-2" style={{ fontSize: 13 }}><Smartphone size={14} /> Apparaten <span className="ml-auto text-[10px]">Binnenkort</span></button>
                      <button disabled className="w-full text-left px-4 py-2 text-[#4A5568] opacity-40 cursor-not-allowed flex items-center gap-2" style={{ fontSize: 13 }}><Settings size={14} /> Instellingen <span className="ml-auto text-[10px]">Binnenkort</span></button>
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
          {children}
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
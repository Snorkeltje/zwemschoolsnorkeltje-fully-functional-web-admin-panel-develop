import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Menu, X, ChevronDown, Star, Facebook, Instagram } from 'lucide-react';
import snorkeltjeLogo from '../../../imports/logo-3.svg';
import snorkeltjeLogoPng from 'figma:asset/9b639bb791c2a6aa104eacafd5c0253b9d1ddf3e.png';

const locations = [
  { name: 'De Bilt - Utrecht', slug: 'de-bilt-utrecht' },
  { name: 'Garderen', slug: 'garderen' },
  { name: 'Mierlo', slug: 'mierlo' },
  { name: 'Nijkerk', slug: 'nijkerk' },
  { name: 'Wolfheze', slug: 'wolfheze' },
  { name: 'Dordrecht', slug: 'dordrecht' },
  { name: 'Soest', slug: 'soest' },
];

const lesaanbod = [
  { name: 'ABC Zwemles', slug: 'abc-zwemles' },
  { name: 'Mini Survival Zwemles', slug: 'mini-survival' },
];

export function WebsiteHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); setOpenDropdown(null); }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <>
      {/* Top bar */}
      <div className="w-full bg-[#FF5C00] text-white" style={{ fontSize: 12 }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-[36px] flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1"><span className="text-white/80">&#10003;</span> Kwaliteit</span>
            <span className="flex items-center gap-1"><span className="text-white/80">&#10003;</span> Snelheid</span>
            <span className="flex items-center gap-1"><span className="text-white/80">&#10003;</span> Duidelijkheid</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 mx-auto sm:mx-0">
            <span className="italic hidden md:inline" style={{ fontWeight: 600 }}>Nu en later, vol vertrouwen in het water!</span>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#FFD700" color="#FFD700" />)}
              <span style={{ fontWeight: 700 }}> 9.7 / 10</span>
              <button onClick={() => navigate('/website/reviews')} className="underline ml-1" style={{ fontWeight: 600 }}>uit 847 reviews</button>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <a href="https://www.facebook.com/Zwemschoolsnorkeltje" target="_blank" rel="noopener noreferrer"><Facebook size={16} /></a>
            <a href="https://www.instagram.com/zwemschoolsnorkeltje/" target="_blank" rel="noopener noreferrer"><Instagram size={16} /></a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="w-full bg-white sticky top-0 z-50" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-[72px] flex items-center justify-between" ref={dropdownRef}>
          {/* Logo */}
          <button onClick={() => navigate('/website')} className="flex-shrink-0">
            <img src={snorkeltjeLogo} alt="Zwemschool Snorkeltje" className="h-[52px] w-auto" onError={(e) => { e.currentTarget.src = snorkeltjeLogoPng; }} />
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Locaties dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'loc' ? null : 'loc')}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${isActive('/website/locatie') ? 'text-[#0365C4]' : 'text-[#1A1A2E] hover:text-[#0365C4]'}`}
                style={{ fontSize: 15, fontWeight: 600 }}
              >
                Locaties <ChevronDown size={15} className={`transition-transform ${openDropdown === 'loc' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'loc' && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-xl py-2 min-w-[220px]" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
                  {locations.map(loc => (
                    <button key={loc.slug} onClick={() => navigate(`/website/locatie/${loc.slug}`)} className="w-full text-left px-4 py-2.5 hover:bg-[#F4F7FC] text-[#1A1A2E] transition-colors" style={{ fontSize: 14 }}>
                      {loc.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Lesaanbod dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'les' ? null : 'les')}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${isActive('/website/lesaanbod') ? 'text-[#0365C4]' : 'text-[#1A1A2E] hover:text-[#0365C4]'}`}
                style={{ fontSize: 15, fontWeight: 600 }}
              >
                Lesaanbod <ChevronDown size={15} className={`transition-transform ${openDropdown === 'les' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'les' && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-xl py-2 min-w-[240px]" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
                  {lesaanbod.map(l => (
                    <button key={l.slug} onClick={() => navigate(`/website/lesaanbod/${l.slug}`)} className="w-full text-left px-4 py-2.5 hover:bg-[#F4F7FC] text-[#1A1A2E] transition-colors" style={{ fontSize: 14 }}>
                      {l.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {[
              { label: 'Inschrijven', path: '/website/inschrijven' },
              { label: 'Over ons', path: '/website/over-ons' },
              { label: 'Vacatures', path: '/website/vacatures' },
              { label: 'Contact', path: '/website/contact' },
            ].map(item => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 rounded-lg transition-colors ${isActive(item.path) ? 'text-[#0365C4]' : 'text-[#1A1A2E] hover:text-[#0365C4]'}`}
                style={{ fontSize: 15, fontWeight: 600 }}
              >
                {item.label}
              </button>
            ))}

            {/* Login / Reserveren */}
            <button
              onClick={() => navigate('/website/reserveren')}
              className="ml-3 px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)', fontSize: 14, fontWeight: 700, boxShadow: '0 4px 16px rgba(255,92,0,0.3)' }}
            >
              Reserveren
            </button>
          </nav>

          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-[#F4F7FC]">
            {mobileOpen ? <X size={22} color="#1A1A2E" /> : <Menu size={22} color="#1A1A2E" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-[#F0F4FA] px-4 py-4" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
            <div className="flex flex-col gap-1">
              <p className="text-[#8E9BB3] px-3 pt-2 pb-1" style={{ fontSize: 11, fontWeight: 700 }}>LOCATIES</p>
              {locations.map(loc => (
                <button key={loc.slug} onClick={() => navigate(`/website/locatie/${loc.slug}`)} className="text-left px-3 py-2 rounded-lg text-[#1A1A2E] hover:bg-[#F4F7FC]" style={{ fontSize: 14 }}>
                  {loc.name}
                </button>
              ))}
              <div className="h-px bg-[#F0F4FA] my-2" />
              <p className="text-[#8E9BB3] px-3 pt-2 pb-1" style={{ fontSize: 11, fontWeight: 700 }}>LESAANBOD</p>
              {lesaanbod.map(l => (
                <button key={l.slug} onClick={() => navigate(`/website/lesaanbod/${l.slug}`)} className="text-left px-3 py-2 rounded-lg text-[#1A1A2E] hover:bg-[#F4F7FC]" style={{ fontSize: 14 }}>
                  {l.name}
                </button>
              ))}
              <div className="h-px bg-[#F0F4FA] my-2" />
              {['Inschrijven', 'Over ons', 'Vacatures', 'Contact'].map(label => {
                const path = `/website/${label.toLowerCase().replace(' ', '-')}`;
                return (
                  <button key={label} onClick={() => navigate(path)} className="text-left px-3 py-2.5 rounded-lg text-[#1A1A2E] hover:bg-[#F4F7FC]" style={{ fontSize: 15, fontWeight: 600 }}>
                    {label}
                  </button>
                );
              })}
              <button onClick={() => navigate('/website/reserveren')} className="mt-2 w-full py-3 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)', fontSize: 15, fontWeight: 700 }}>
                Reserveren
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
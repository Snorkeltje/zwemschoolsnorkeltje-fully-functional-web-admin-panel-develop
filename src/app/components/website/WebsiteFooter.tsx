import { useNavigate } from 'react-router';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import snorkeltjeLogo from '../../../imports/logo-4.svg';
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

export function WebsiteFooter() {
  const navigate = useNavigate();

  return (
    <footer className="relative overflow-hidden">
      {/* Wave SVG top */}
      <div className="w-full">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0,60 C320,120 480,0 720,60 C960,120 1120,0 1440,60 L1440,120 L0,120 Z" fill="#0365C4" />
        </svg>
      </div>

      <div className="bg-[#0365C4] text-white pb-8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Logo & info */}
            <div>
              <img src={snorkeltjeLogo} alt="Zwemschool Snorkeltje" className="h-[60px] w-auto mb-4 brightness-0 invert" onError={(e) => { e.currentTarget.src = snorkeltjeLogoPng; e.currentTarget.classList.remove('brightness-0', 'invert'); }} />
              <p className="text-white/80 mb-3" style={{ fontSize: 13, lineHeight: 1.6 }}>
                Nu en later, vol vertrouwen in het water!
              </p>
              <p className="text-white/60" style={{ fontSize: 12 }}>KvK: 63317419</p>
              <div className="flex items-center gap-3 mt-4">
                <a href="https://www.facebook.com/Zwemschoolsnorkeltje" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Facebook size={16} />
                </a>
                <a href="https://www.instagram.com/zwemschoolsnorkeltje/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram size={16} />
                </a>
              </div>
            </div>

            {/* Locaties */}
            <div>
              <h4 className="mb-4" style={{ fontSize: 15, fontWeight: 700 }}>Locaties</h4>
              <div className="flex flex-col gap-2">
                {locations.map(loc => (
                  <button key={loc.slug} onClick={() => navigate(`/website/locatie/${loc.slug}`)} className="text-left text-white/80 hover:text-white transition-colors" style={{ fontSize: 13 }}>
                    {loc.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4" style={{ fontSize: 15, fontWeight: 700 }}>Snelle links</h4>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'ABC Zwemles', path: '/website/lesaanbod/abc-zwemles' },
                  { label: 'Mini Survival', path: '/website/lesaanbod/mini-survival' },
                  { label: 'Inschrijven', path: '/website/inschrijven' },
                  { label: 'Over ons', path: '/website/over-ons' },
                  { label: 'FAQ', path: '/website/faq' },
                  { label: 'Vacatures', path: '/website/vacatures' },
                  { label: 'Algemene voorwaarden', path: '/website/algemene-voorwaarden' },
                ].map(item => (
                  <button key={item.path} onClick={() => navigate(item.path)} className="text-left text-white/80 hover:text-white transition-colors" style={{ fontSize: 13 }}>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4" style={{ fontSize: 15, fontWeight: 700 }}>Contact</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-white/80" style={{ fontSize: 13 }}>
                  <MapPin size={15} className="flex-shrink-0 mt-0.5" />
                  <span>Broerswetering 36, 3752AM Bunschoten-Spakenburg</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/80" style={{ fontSize: 13 }}>
                  <Mail size={15} className="flex-shrink-0" />
                  <span>info@zwemschoolsnorkeltje.nl</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/80" style={{ fontSize: 13 }}>
                  <Phone size={15} className="flex-shrink-0" />
                  <span>Via contactformulier</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/website/contact')}
                className="mt-4 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                style={{ fontSize: 13, fontWeight: 600 }}
              >
                Neem contact op
              </button>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/50" style={{ fontSize: 12 }}>
              &copy; {new Date().getFullYear()} Zwemschool Snorkeltje. Alle rechten voorbehouden.
            </p>
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/website/algemene-voorwaarden')} className="text-white/50 hover:text-white/80 transition-colors" style={{ fontSize: 12 }}>
                Algemene voorwaarden
              </button>
              <button onClick={() => navigate('/website/privacy')} className="text-white/50 hover:text-white/80 transition-colors" style={{ fontSize: 12 }}>
                Privacyverklaring
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
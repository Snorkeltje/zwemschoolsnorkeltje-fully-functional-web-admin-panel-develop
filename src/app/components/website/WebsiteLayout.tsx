import { ReactNode, useState, useEffect } from 'react';
import { WebsiteHeader } from './WebsiteHeader';
import { WebsiteFooter } from './WebsiteFooter';
import { MessageCircle, X, ChevronUp, Cookie } from 'lucide-react';

interface WebsiteLayoutProps {
  children: ReactNode;
}

export function WebsiteLayout({ children }: WebsiteLayoutProps) {
  const [showCookie, setShowCookie] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const cookieDismissed = sessionStorage.getItem('snorkeltje_cookie');
    if (!cookieDismissed) {
      const timer = setTimeout(() => setShowCookie(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handler = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const acceptCookies = () => {
    sessionStorage.setItem('snorkeltje_cookie', 'accepted');
    setShowCookie(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <WebsiteHeader />
      <main className="flex-1">
        {children}
      </main>
      <WebsiteFooter />

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/31612345678?text=Hallo%20Zwemschool%20Snorkeltje!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
        style={{ background: '#25D366', boxShadow: '0 4px 16px rgba(37,211,102,0.4)' }}
        title="Chat via WhatsApp"
      >
        <MessageCircle size={26} />
      </a>

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-24 z-50 w-11 h-11 rounded-full bg-[#0365C4] text-white flex items-center justify-center transition-all hover:bg-[#024ea0]"
          style={{ boxShadow: '0 4px 16px rgba(3,101,196,0.3)' }}
        >
          <ChevronUp size={22} />
        </button>
      )}

      {/* Cookie consent banner */}
      {showCookie && (
        <div className="fixed bottom-0 left-0 right-0 z-[60]" style={{ animation: 'slideUp 0.4s ease-out' }}>
          <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 pb-6">
            <div className="bg-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ boxShadow: '0 -4px 32px rgba(0,0,0,0.12)', border: '1px solid #E8ECF4' }}>
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-[#FF5C00]/10 flex items-center justify-center flex-shrink-0">
                  <Cookie size={20} className="text-[#FF5C00]" />
                </div>
                <div>
                  <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>Wij gebruiken cookies</p>
                  <p className="text-[#6B7B94] mt-0.5" style={{ fontSize: 13, lineHeight: 1.5 }}>
                    Deze website gebruikt functionele cookies voor een optimale ervaring. Wij gebruiken geen tracking cookies.{' '}
                    <a href="/website/privacy" className="text-[#0365C4] underline">Meer informatie</a>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={acceptCookies} className="px-5 py-2.5 rounded-xl text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 700 }}>Accepteren</button>
                <button onClick={() => { sessionStorage.setItem('snorkeltje_cookie', 'dismissed'); setShowCookie(false); }} className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#A0AEC0]"><X size={18} /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

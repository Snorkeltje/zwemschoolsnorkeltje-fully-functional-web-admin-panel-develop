import { useNavigate } from 'react-router';
import { ArrowLeft, Smartphone, Apple, Download, ShieldCheck, Sparkles } from 'lucide-react';

/// Walter 2026-05-01 — Mobile App install instructions for the swimming
/// school admin and parents. Shown from the web admin sidebar in place of
/// the previous "Mobile App preview" button.
export function MobileInstallScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #0365C4 0%, #034DA9 40%, #023B82 100%)' }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          <span style={{ fontSize: 13 }}>Terug naar admin</span>
        </button>

        <div className="flex items-center gap-4 mb-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #FF5C00 0%, #F5A623 100%)' }}
          >
            <Smartphone size={26} className="text-white" />
          </div>
          <div>
            <h1 className="text-white" style={{ fontSize: 28, fontWeight: 800 }}>
              Snorkeltje Mobile App
            </h1>
            <p className="text-white/60" style={{ fontSize: 14 }}>
              Download de app voor ouders en instructeurs
            </p>
          </div>
        </div>

        {/* Two install columns */}
        <div className="grid md:grid-cols-2 gap-5 mt-8">
          {/* iOS card */}
          <div
            className="rounded-2xl p-6 border border-white/10"
            style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                <Apple size={24} className="text-white" />
              </div>
              <div>
                <p className="text-white" style={{ fontSize: 18, fontWeight: 700 }}>iOS / iPad</p>
                <p className="text-white/50" style={{ fontSize: 12 }}>iPhone 11 of nieuwer · iOS 14+</p>
              </div>
            </div>

            <ol className="space-y-3 mb-5">
              {[
                'Open de App Store op je iPhone of iPad',
                'Zoek naar "Snorkeltje Zwemschool"',
                'Tik op "Download" en open de app',
                'Log in met je e-mail en wachtwoord',
              ].map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                    style={{
                      background: 'linear-gradient(135deg,#0365C4,#00C1FF)',
                      fontSize: 11,
                      fontWeight: 800,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-white/80" style={{ fontSize: 13, lineHeight: 1.5 }}>{step}</span>
                </li>
              ))}
            </ol>

            <a
              href="#"
              className="block w-full text-center py-3 rounded-xl font-semibold text-white transition-transform active:scale-[0.99]"
              style={{
                background: 'linear-gradient(135deg, #0365C4 0%, #00C1FF 100%)',
                boxShadow: '0 10px 30px -10px rgba(3,101,196,0.5)',
                fontSize: 14,
              }}
            >
              <span className="inline-flex items-center gap-2">
                <Apple size={16} />
                Open in App Store
              </span>
            </a>

            <p className="text-white/40 text-center mt-3" style={{ fontSize: 11 }}>
              Binnenkort beschikbaar — momenteel TestFlight beta
            </p>
          </div>

          {/* Android card */}
          <div
            className="rounded-2xl p-6 border border-white/10"
            style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #27AE60 0%, #2ECC71 100%)' }}
              >
                <Download size={24} className="text-white" />
              </div>
              <div>
                <p className="text-white" style={{ fontSize: 18, fontWeight: 700 }}>Android</p>
                <p className="text-white/50" style={{ fontSize: 12 }}>Android 8.0 of nieuwer</p>
              </div>
            </div>

            <ol className="space-y-3 mb-5">
              {[
                'Open de Google Play Store',
                'Zoek naar "Snorkeltje Zwemschool"',
                'Tik op "Installeren" en open de app',
                'Log in met je e-mail en wachtwoord',
              ].map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                    style={{
                      background: 'linear-gradient(135deg,#27AE60,#2ECC71)',
                      fontSize: 11,
                      fontWeight: 800,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-white/80" style={{ fontSize: 13, lineHeight: 1.5 }}>{step}</span>
                </li>
              ))}
            </ol>

            <a
              href="#"
              className="block w-full text-center py-3 rounded-xl font-semibold text-white transition-transform active:scale-[0.99]"
              style={{
                background: 'linear-gradient(135deg, #27AE60 0%, #2ECC71 100%)',
                boxShadow: '0 10px 30px -10px rgba(39,174,96,0.5)',
                fontSize: 14,
              }}
            >
              <span className="inline-flex items-center gap-2">
                <Download size={16} />
                Open in Play Store
              </span>
            </a>

            <p className="text-white/40 text-center mt-3" style={{ fontSize: 11 }}>
              Binnenkort beschikbaar — momenteel APK op aanvraag
            </p>
          </div>
        </div>

        {/* Features highlight */}
        <div
          className="mt-8 rounded-2xl p-6 border border-white/10"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-[#F5A623]" />
            <p className="text-white" style={{ fontSize: 15, fontWeight: 700 }}>
              Wat kun je in de app?
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Voor ouders', items: ['Voortgang van je kind volgen', 'Lessen boeken & plannen', 'Tegoed-saldo beheren', 'Chat met instructeurs'] },
              { title: 'Voor instructeurs', items: ['Dagrooster bekijken', '4-fase voortgang bijwerken', 'Leerlingdossiers', 'Examen aanvragen'] },
              { title: 'Voor de school', items: ['iDEAL betalingen', 'Push-notificaties', 'Wachtlijst beheer', 'Realtime synchronisatie'] },
            ].map(group => (
              <div key={group.title}>
                <p className="text-[#00C1FF] mb-2" style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.4 }}>
                  {group.title.toUpperCase()}
                </p>
                <ul className="space-y-1.5">
                  {group.items.map(it => (
                    <li key={it} className="flex items-start gap-2">
                      <span className="text-[#27AE60] mt-0.5" style={{ fontSize: 11 }}>✓</span>
                      <span className="text-white/75" style={{ fontSize: 12 }}>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-6 flex items-center gap-2 justify-center text-white/40">
          <ShieldCheck size={14} />
          <span style={{ fontSize: 11 }}>
            Beveiligd met Supabase auth · iDEAL via Stripe · GDPR-compliant
          </span>
        </div>
      </div>
    </div>
  );
}

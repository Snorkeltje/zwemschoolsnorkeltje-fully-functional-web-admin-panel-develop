import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { ChevronLeft, ChevronDown, ChevronUp, Shield, FileText, CreditCard, Clock, AlertTriangle, Users } from 'lucide-react';

const sections = [
  {
    icon: FileText, color: '#0365C4', title: 'Artikel 1 — Algemeen',
    content: 'Deze algemene voorwaarden zijn van toepassing op alle overeenkomsten tussen Zwemschool Snorkeltje (KvK: 12345678) en de opdrachtgever/cursist. Afwijkingen van deze voorwaarden zijn alleen geldig indien schriftelijk overeengekomen. Zwemschool Snorkeltje is gevestigd te De Bilt, Utrecht, Nederland.',
  },
  {
    icon: CreditCard, color: '#FF5C00', title: 'Artikel 2 — Knipkaarten & Betaling',
    content: '• 1-op-1 knipkaart (10 lessen): €380,00\n• 1-op-2 knipkaart (10 lessen): €190,00 per kind\n• 1-op-3 knipkaart (10 lessen): €114,00 per kind\n\nBetaling geschiedt via iDEAL, creditcard of Bancontact via Mollie. Knipkaarten zijn niet restitueerbaar tenzij anders vermeld. Bij auto-conversie van 1-op-1 naar 1-op-2 wordt het verschil teruggestort.',
  },
  {
    icon: Clock, color: '#27AE60', title: 'Artikel 3 — Reserveringen & Annulering',
    content: '• Reserveringen kunnen tot 14 dagen vooruit worden gemaakt.\n• Annulering standaard les: minimaal 24 uur van tevoren.\n• Annulering vakantie-les: minimaal 96 uur (4 dagen) van tevoren.\n• Bij te laat annuleren wordt de les van de knipkaart afgeschreven.\n• No-show wordt als verbruikte les geteld.',
  },
  {
    icon: Users, color: '#9B59B6', title: 'Artikel 4 — Wachtlijst & Plaatsing',
    content: 'Plaatsing geschiedt op volgorde van inschrijving. Bij een volle groep wordt de cursist op de wachtlijst geplaatst. Wanneer een plek vrijkomt, ontvangt de eerstvolgende op de wachtlijst een uitnodiging. Deze uitnodiging is 48 uur geldig.',
  },
  {
    icon: Shield, color: '#0365C4', title: 'Artikel 5 — Privacy & Gegevens',
    content: 'Zwemschool Snorkeltje verwerkt persoonsgegevens conform de AVG. Gegevens worden uitsluitend gebruikt voor lesadministratie, communicatie en facturering. Gegevens worden niet aan derden verstrekt tenzij wettelijk verplicht. U heeft recht op inzage, correctie en verwijdering van uw gegevens.',
  },
  {
    icon: AlertTriangle, color: '#E74C3C', title: 'Artikel 6 — Aansprakelijkheid',
    content: 'Zwemschool Snorkeltje is niet aansprakelijk voor verlies, diefstal of schade aan persoonlijke eigendommen. Deelname aan zwemlessen geschiedt op eigen risico. De ouder/verzorger is verantwoordelijk voor het doorgeven van medische bijzonderheden. Bij twijfel over de gezondheid van het kind kan de instructeur deelname weigeren.',
  },
];

export function TermsConditionsScreen() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-10">
        {/* Header */}
        <div
          className="relative px-5 pt-[58px] pb-6"
          style={{ background: 'linear-gradient(135deg, #0365C4 0%, #0D7FE8 60%, #00C1FF 100%)', borderRadius: '0 0 28px 28px' }}
        >
          <div className="flex items-center gap-3 relative z-10">
            <button onClick={() => navigate(-1)} className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <ChevronLeft size={20} color="#fff" />
            </button>
            <div>
              <p className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>Algemene Voorwaarden</p>
              <p className="text-white/60" style={{ fontSize: 12 }}>Zwemschool Snorkeltje — 2026</p>
            </div>
          </div>
        </div>

        {/* Intro */}
        <div className="px-5 mt-5">
          <div className="bg-white rounded-[16px] p-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Shield size={16} color="#0365C4" />
              <span className="text-[#0365C4]" style={{ fontSize: 13, fontWeight: 700 }}>Laatst bijgewerkt: 1 januari 2026</span>
            </div>
            <p className="text-[#6B7B94]" style={{ fontSize: 12, lineHeight: 1.6 }}>
              Lees deze voorwaarden zorgvuldig door. Door gebruik te maken van onze diensten gaat u akkoord met onderstaande bepalingen.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="px-5 mt-4 space-y-3">
          {sections.map((s, i) => {
            const Icon = s.icon;
            const isOpen = expanded === i;
            return (
              <div key={i} className="bg-white rounded-[16px] overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 px-4 py-4"
                >
                  <div className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${s.color}12` }}>
                    <Icon size={17} color={s.color} />
                  </div>
                  <span className="flex-1 text-left text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 600 }}>{s.title}</span>
                  {isOpen ? <ChevronUp size={18} color="#8E9BB3" /> : <ChevronDown size={18} color="#8E9BB3" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4" style={{ borderTop: '1px solid #F0F4FA' }}>
                    <p className="text-[#4A5568] pt-3 whitespace-pre-line" style={{ fontSize: 13, lineHeight: 1.7 }}>{s.content}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact */}
        <div className="px-5 mt-5">
          <div className="bg-[#E8F4FD] rounded-[16px] p-4 text-center">
            <p className="text-[#0365C4]" style={{ fontSize: 13, fontWeight: 700 }}>Vragen?</p>
            <p className="text-[#4A7DB8] mt-1" style={{ fontSize: 12 }}>Neem contact op via info@snorkeltje.nl</p>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}

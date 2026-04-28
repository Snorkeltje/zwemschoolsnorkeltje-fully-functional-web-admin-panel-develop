import { useNavigate, useLocation } from 'react-router';
import { WebsiteLayout } from '../../components/website/WebsiteLayout';
import { ChevronRight } from 'lucide-react';

const termsContent = [
  { title: 'Artikel 1 — Definities', content: 'In deze algemene voorwaarden wordt verstaan onder:\n1.1 Zwemschool: Zwemschool Snorkeltje, gevestigd te Bunschoten-Spakenburg, KvK nummer 63317419.\n1.2 Cursist: de persoon die deelneemt aan de zwemles.\n1.3 Opdrachtgever: de persoon die de cursist aanmeldt voor de zwemles.' },
  { title: 'Artikel 2 — Inschrijving', content: '2.1 Inschrijving geschiedt via het inschrijfformulier op de website.\n2.2 Na inschrijving wordt de cursist op de wachtlijst geplaatst.\n2.3 Inschrijfgeld bedraagt \u20AC25,00 (eenmalig).\n2.4 Door inschrijving gaat de opdrachtgever akkoord met deze algemene voorwaarden.' },
  { title: 'Artikel 3 — Knipkaarten & Betaling', content: '3.1 Lessen worden betaald middels knipkaarten.\n3.2 Knipkaarten 1-op-1: 10 lessen (\u20AC380), 5 lessen (\u20AC190), 3 lessen (\u20AC114).\n3.3 Knipkaarten 1-op-2: 10 lessen (\u20AC270), 5 lessen (\u20AC135).\n3.4 Knipkaarten zijn 365 dagen geldig na aankoop.\n3.5 Knipkaarten zijn niet overdraagbaar en niet restitueerbaar, tenzij anders vermeld.\n3.6 Betaling geschiedt via iDEAL, creditcard of andere door Mollie aangeboden betaalmethoden.' },
  { title: 'Artikel 4 — Annulering & Afmelding', content: '4.1 Annulering is kosteloos mogelijk tot 24 uur voor aanvang van de les.\n4.2 Tijdens schoolvakanties geldt een annuleringstermijn van 96 uur (4 dagen).\n4.3 Bij niet-tijdige annulering wordt de les in rekening gebracht (knipkaart wordt afgestempeld).\n4.4 Bij no-show wordt de les eveneens in rekening gebracht.' },
  { title: 'Artikel 5 — Reserveringen', content: '5.1 Reserveringen dienen minimaal 14 dagen van tevoren te worden gemaakt.\n5.2 Reserveringen kunnen via de app of website worden gemaakt.\n5.3 Wijzigingen in reserveringen zijn mogelijk tot 24 uur voor aanvang.' },
  { title: 'Artikel 6 — Auto-conversie', content: '6.1 Bij een 1-op-1 knipkaart kan automatische conversie naar 1-op-2 plaatsvinden wanneer een geschikt koppel beschikbaar is.\n6.2 Het prijsverschil (\u20AC11 per les) wordt automatisch gerestitueerd.\n6.3 De opdrachtgever kan auto-conversie uitschakelen via de app of website.' },
  { title: 'Artikel 7 — Aansprakelijkheid', content: '7.1 Zwemschool Snorkeltje is niet aansprakelijk voor diefstal, vermissing of beschadiging van eigendommen.\n7.2 Deelname aan de zwemlessen geschiedt op eigen risico.\n7.3 De opdrachtgever is verantwoordelijk voor het verstrekken van juiste medische informatie.' },
  { title: 'Artikel 8 — Overig', content: '8.1 Op deze voorwaarden is Nederlands recht van toepassing.\n8.2 Zwemschool Snorkeltje behoudt zich het recht voor deze voorwaarden te wijzigen.\n8.3 Bij geschillen is de rechter in het arrondissement Utrecht bevoegd.' },
];

const privacyContent = [
  { title: '1. Wie zijn wij?', content: 'Zwemschool Snorkeltje, gevestigd aan Broerswetering 36, 3752AM Bunschoten-Spakenburg. KvK: 63317419. Wij zijn verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring.' },
  { title: '2. Welke gegevens verzamelen wij?', content: 'Wij verwerken de volgende persoonsgegevens:\n\u2022 Voor- en achternaam van kind en ouder/verzorger\n\u2022 Geboortedatum van het kind\n\u2022 E-mailadres\n\u2022 Telefoonnummer(s)\n\u2022 Woonplaats\n\u2022 Betaalgegevens (via Mollie, wij slaan geen creditcardnummers op)\n\u2022 Voortgang en niveau van het kind' },
  { title: '3. Waarom verzamelen wij deze gegevens?', content: 'Wij verwerken uw persoonsgegevens voor:\n\u2022 Het uitvoeren van de overeenkomst (zwemles)\n\u2022 Het bijhouden van de voortgang van uw kind\n\u2022 Communicatie over reserveringen en lessen\n\u2022 Het versturen van facturen en betalingsverzoeken\n\u2022 Het voldoen aan wettelijke verplichtingen' },
  { title: '4. Hoe lang bewaren wij gegevens?', content: 'Wij bewaren persoonsgegevens niet langer dan noodzakelijk:\n\u2022 Klantgegevens: tot 2 jaar na laatste les\n\u2022 Financiele gegevens: 7 jaar (wettelijke bewaarplicht)\n\u2022 Voortgangsgegevens: tot 2 jaar na laatste les' },
  { title: '5. Delen met derden', content: 'Wij delen persoonsgegevens alleen met:\n\u2022 Mollie (betalingsverwerking)\n\u2022 Supabase (database hosting, EU-servers)\n\u2022 Expo (push notificaties, alleen device tokens)\n\nWij verkopen uw gegevens nooit aan derden.' },
  { title: '6. Uw rechten', content: 'U heeft het recht op:\n\u2022 Inzage in uw persoonsgegevens\n\u2022 Correctie van onjuiste gegevens\n\u2022 Verwijdering van uw gegevens\n\u2022 Beperking van verwerking\n\u2022 Overdraagbaarheid van gegevens\n\nNeem contact op via info@zwemschoolsnorkeltje.nl om uw rechten uit te oefenen.' },
  { title: '7. Cookies', content: 'Onze website gebruikt functionele cookies voor het onthouden van uw voorkeuren en inloggegevens. Wij gebruiken geen tracking cookies of cookies van derden voor advertentiedoeleinden.' },
  { title: '8. Contact', content: 'Voor vragen over deze privacyverklaring kunt u contact opnemen via:\nE-mail: info@zwemschoolsnorkeltje.nl\nAdres: Broerswetering 36, 3752AM Bunschoten-Spakenburg\n\nDeze privacyverklaring is voor het laatst bijgewerkt op 1 januari 2026.' },
];

export function WebsiteAlgemeneVoorwaardenScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const isPrivacy = location.pathname.includes('privacy');
  const title = isPrivacy ? 'Privacyverklaring' : 'Algemene voorwaarden';
  const content = isPrivacy ? privacyContent : termsContent;
  const lastUpdated = isPrivacy ? '1 januari 2026' : '15 september 2025';

  return (
    <WebsiteLayout>
      <section className="relative h-[200px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)' }}>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 w-full">
            <h1 className="text-white" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>{title}</h1>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full block"><path d="M0,20 C360,40 720,0 1080,20 C1260,30 1380,35 1440,30 L1440,40 L0,40 Z" fill="white" /></svg>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-4">
        <div className="flex items-center gap-2 text-[#8E9BB3]" style={{ fontSize: 13 }}>
          <button onClick={() => navigate('/website')} className="hover:text-[#0365C4]">Home</button>
          <ChevronRight size={12} />
          <span className="text-[#1A1A2E]" style={{ fontWeight: 600 }}>{title}</span>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-8 pb-16">
        {/* Quick nav */}
        <div className="flex gap-3 mb-8">
          <button onClick={() => navigate('/website/algemene-voorwaarden')} className={`px-4 py-2 rounded-lg ${!isPrivacy ? 'bg-[#0365C4] text-white' : 'bg-[#F4F7FC] text-[#6B7B94] hover:bg-[#E8ECF4]'}`} style={{ fontSize: 13, fontWeight: 600 }}>Algemene voorwaarden</button>
          <button onClick={() => navigate('/website/privacy')} className={`px-4 py-2 rounded-lg ${isPrivacy ? 'bg-[#0365C4] text-white' : 'bg-[#F4F7FC] text-[#6B7B94] hover:bg-[#E8ECF4]'}`} style={{ fontSize: 13, fontWeight: 600 }}>Privacyverklaring</button>
        </div>

        <p className="text-[#A0AEC0] mb-6" style={{ fontSize: 12 }}>Laatst bijgewerkt: {lastUpdated}</p>

        <div className="prose max-w-none">
          {content.map((section, i) => (
            <div key={i} className="mb-8">
              <h3 className="text-[#1A1A2E] mb-3" style={{ fontSize: 18, fontWeight: 700 }}>{section.title}</h3>
              <p className="text-[#4A5568] whitespace-pre-line" style={{ fontSize: 14, lineHeight: 1.8 }}>{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-[#F0F4FA] text-center">
          <p className="text-[#A0AEC0] mb-3" style={{ fontSize: 13 }}>Vragen over deze {title.toLowerCase()}?</p>
          <button onClick={() => navigate('/website/contact')} className="px-6 py-2.5 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)', fontSize: 14, fontWeight: 700 }}>
            Neem contact op
          </button>
        </div>
      </div>
    </WebsiteLayout>
  );
}
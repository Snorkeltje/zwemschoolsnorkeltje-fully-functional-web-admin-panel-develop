import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';

const profileFields = [
  { label: 'Voornaam kind:', value: 'Sami' },
  { label: 'Achternaam kind:', value: 'Khilji' },
  { label: 'Geboortedatum kind:', value: 'do mrt. 15, 1979' },
  { label: 'Voor+achternaam ou...:', value: 'Ahmed Khilji' },
  { label: 'Mobiel (1e contactper...):', value: '03128071063' },
  { label: 'E-mail:', value: 'sami@example.com' },
  { label: 'Woonplaats:', value: 'Lahore' },
  { label: 'Locatie:', value: 'De Bilt' },
  { label: 'Type zwemles:', value: '1-op-2 zwemles' },
  { label: 'Dag:', value: 'Vrijdag' },
  { label: 'Tijdstip zwemles:', value: '10:00am' },
];

export function MyProfileWebScreen() {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="min-h-full bg-white flex flex-col">
        {/* Snorkeltje Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[#E8ECF4]">
          <SnorkeltjeLogo size="small" />
        </div>

        <div className="bg-[#F8FAFC] px-4 py-2">
          <p className="text-[#4A6072]" style={{ fontSize: 11 }}>🏠 / Gebruikersnaam opvragen</p>
        </div>

        <div className="px-4 pt-4">
          {/* Profile info card */}
          <div className="border border-[#DBE6F0] rounded-[6px] p-4">
            <p className="text-[#26323F]" style={{ fontSize: 20, fontWeight: 700 }}>Mijn gegevens</p>
            <div className="mt-3 space-y-2">
              {profileFields.map((f) => (
                <div key={f.label} className="flex items-center">
                  <p className="text-[#4A6072] w-[170px] flex-shrink-0" style={{ fontSize: 11 }}>{f.label}</p>
                  <p className="text-[#26323F]" style={{ fontSize: 11, fontWeight: 700 }}>{f.value}</p>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 mt-4">
              <button className="border border-[#DBE6F0] rounded px-3 py-1.5">
                <span className="text-[#26323F]" style={{ fontSize: 12 }}>✏️ Wijzigen</span>
              </button>
              <button className="border border-[#DBE6F0] rounded px-3 py-1.5">
                <span className="text-[#26323F]" style={{ fontSize: 12 }}>⬇️ Downloaden profiel</span>
              </button>
            </div>
          </div>

          {/* User credentials card */}
          <div className="border border-[#DBE6F0] rounded-[6px] p-4 mt-4">
            <p className="text-[#26323F]" style={{ fontSize: 18, fontWeight: 700 }}>Mijn gebruikersgegevens</p>

            <div className="mt-6">
              <p className="text-[#4A6072]" style={{ fontSize: 11 }}>Gravatar afbeelding:</p>
              <div className="w-[50px] h-[50px] rounded-full bg-[#DBE6F0] flex items-center justify-center mt-1">
                <span className="text-[#8E9EAD]" style={{ fontSize: 28 }}>👤</span>
              </div>
            </div>

            <div className="flex items-center mt-3">
              <p className="text-[#4A6072] w-[170px]" style={{ fontSize: 11 }}>Gebruikersnaam:</p>
              <p className="text-[#26323F]" style={{ fontSize: 11, fontWeight: 700 }}>Sami</p>
            </div>

            <div className="flex gap-2 mt-3">
              <button className="border border-[#DBE6F0] rounded px-3 py-1.5">
                <span className="text-[#26323F]" style={{ fontSize: 12 }}>✏️ Profiel wijzigen</span>
              </button>
              <button className="border border-[#DBE6F0] rounded px-3 py-1.5">
                <span className="text-[#26323F]" style={{ fontSize: 12 }}>🔒 Wachtwoord wijzigen</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1" />
        <div className="mt-8 relative">
          <svg viewBox="0 0 430 50" className="w-full"><ellipse cx="215" cy="25" rx="265" ry="25" fill="#0380D0" /></svg>
          <div className="bg-[#0360A6] h-[60px] flex items-center justify-center">
            <p className="text-[#B2D9FF]" style={{ fontSize: 11 }}>snorkeltje.i</p>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}
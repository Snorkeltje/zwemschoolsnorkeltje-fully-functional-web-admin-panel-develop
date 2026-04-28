import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';

const fields = [
  { label: 'Voornaam kind', value: 'Sami' },
  { label: 'Achternaam kind', value: 'Khilji' },
  { label: 'Geboortedatum kind', value: '' },
  { label: 'Voor+achternaam ouder', value: 'Ahmed Khilji' },
  { label: 'Mobiel (1e contactpersoon)', value: '03128071063' },
  { label: 'E-mail', value: 'sami@example.com' },
  { label: 'Woonplaats', value: 'Lahore' },
  { label: 'Locatie', value: 'De Bilt' },
  { label: 'Type zwemles', value: '1-op-2 zwemles' },
  { label: 'Dag', value: 'Vrijdag' },
  { label: 'Tijdstip zwemles', value: '10:00am' },
];

export function ConfirmOrderScreen() {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="min-h-full bg-white pb-8">
        {/* Snorkeltje Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[#E8ECF4]">
          <SnorkeltjeLogo size="small" />
        </div>

        {/* Breadcrumb */}
        <div className="bg-[#F8FAFC] px-4 py-2">
          <p className="text-[#4A6072]" style={{ fontSize: 11 }}>🏠 / Gegevens</p>
        </div>

        <div className="px-4 pt-4">
          <div className="bg-[#C7D1D1] rounded px-3 py-1.5 mb-4">
            <p className="text-[#26323F]" style={{ fontSize: 13, fontWeight: 700 }}>BEVESTIG</p>
          </div>

          {/* Form fields */}
          <div className="space-y-3">
            {fields.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <p className="text-[#4A6072] w-[155px] flex-shrink-0" style={{ fontSize: 11 }}>{f.label}</p>
                <div className="flex-1 border border-[#DBE6F0] rounded bg-white h-[36px] flex items-center px-2">
                  <p className="text-[#26323F]" style={{ fontSize: 13 }}>{f.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Auto-conversion choice */}
          <p className="text-[#0380D0] mt-5" style={{ fontSize: 10, fontWeight: 700 }}>KEUZE ALS ANDERE KIND(EREN) NIET AANWEZIG ZIJN?</p>
          <p className="text-[#4A6072] mt-0.5" style={{ fontSize: 11 }}>Indien 1-op-2, 1-op-3 of 1-op-4 les</p>
          <div className="bg-white border border-[#DBE6F0] rounded h-[36px] flex items-center px-2 mt-1">
            <p className="text-[#4A6072]" style={{ fontSize: 11 }}>Graag GEEN ander kind naast laten zwemmen ▼</p>
          </div>

          {/* Punch card info */}
          <p className="text-[#4A6072] mt-4" style={{ fontSize: 11 }}>Knipkaart  :  Knipkaart voor 10x 1-op-1 zwemles</p>
          <p className="text-[#4A6072] mt-1" style={{ fontSize: 11 }}>Knipkaart prijs  :  380</p>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button onClick={() => navigate(-1)} className="border border-[#DBE6F0] rounded h-[40px] px-6 bg-white">
              <span className="text-[#26323F]" style={{ fontSize: 13 }}>← Terug</span>
            </button>
            <button onClick={() => navigate('/booking-success')} className="bg-[#5492B5] rounded h-[40px] px-6">
              <span className="text-white" style={{ fontSize: 13, fontWeight: 700 }}>✓ Bevestig</span>
            </button>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}
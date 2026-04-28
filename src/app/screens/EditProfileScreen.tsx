import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';

const fields = [
  { label: 'Voornaam', value: 'Ahmed' },
  { label: 'Achternaam', value: 'Khilji' },
  { label: 'E-mail', value: 'ahmed@snorkeltje.nl' },
  { label: 'Telefoon', value: '+31 6 12345678' },
  { label: 'Woonplaats', value: 'Bunschoten' },
];

export function EditProfileScreen() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    Object.fromEntries(fields.map(f => [f.label, f.value]))
  );

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-24">
        {/* Header */}
        <div className="bg-white px-5 pt-14 pb-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-[#131827]" style={{ fontSize: 22 }}>←</button>
          <p className="text-[#131827] flex-1 text-center" style={{ fontSize: 18, fontWeight: 700 }}>Profiel bewerken</p>
          <div style={{ width: 22 }} />
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mt-4 mb-4">
          <div className="relative">
            <div className="w-[80px] h-[80px] rounded-full bg-[#E8F4FD] flex items-center justify-center">
              <span className="text-[#0365C4]" style={{ fontSize: 24, fontWeight: 700 }}>SK</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-[26px] h-[26px] rounded-[13px] bg-[#0365C4] flex items-center justify-center">
              <span className="text-white" style={{ fontSize: 14 }}>✏️</span>
            </div>
          </div>
        </div>

        <div className="px-5">
          {fields.map((field) => (
            <div key={field.label} className="mb-3">
              <p className="text-[#44516B] mb-1" style={{ fontSize: 13, fontWeight: 500 }}>{field.label}</p>
              <div className="bg-white rounded-[10px] border border-[#E5E7EB] h-[52px] flex items-center px-4">
                <input
                  value={formData[field.label]}
                  onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                  className="w-full bg-transparent text-[#131827] focus:outline-none"
                  style={{ fontSize: 14 }}
                />
              </div>
            </div>
          ))}

          <button
            onClick={() => navigate(-1)}
            className="w-full h-[52px] rounded-[12px] bg-[#0365C4] text-white mt-8"
            style={{ fontSize: 15, fontWeight: 700 }}
          >
            Wijzigingen opslaan
          </button>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

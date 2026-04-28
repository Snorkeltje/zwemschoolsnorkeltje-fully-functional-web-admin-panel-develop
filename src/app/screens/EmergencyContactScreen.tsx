import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { ChevronLeft, Phone, User, Plus, Trash2, AlertTriangle, Heart, Edit3, Check, X } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  phone: string;
  relation: string;
}

const initialContacts: Contact[] = [
  { id: 1, name: 'Ahmed Khilji', phone: '+31 6 12345678', relation: 'Vader' },
  { id: 2, name: 'Fatima Khilji', phone: '+31 6 87654321', relation: 'Moeder' },
];

export function EmergencyContactScreen() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [editing, setEditing] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relation: '' });
  const [medicalNotes, setMedicalNotes] = useState('Geen bekende allergieën. Kan goed zwemmen met contactlenzen.');
  const [editingMedical, setEditingMedical] = useState(false);

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, { id: Date.now(), ...newContact }]);
      setNewContact({ name: '', phone: '', relation: '' });
      setAdding(false);
    }
  };

  const deleteContact = (id: number) => setContacts(contacts.filter(c => c.id !== id));

  const relations = ['Vader', 'Moeder', 'Opa', 'Oma', 'Oom', 'Tante', 'Buurman/vrouw', 'Anders'];

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-10">
        {/* Header */}
        <div
          className="relative px-5 pt-[58px] pb-6"
          style={{ background: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)', borderRadius: '0 0 28px 28px' }}
        >
          <div className="flex items-center gap-3 relative z-10">
            <button onClick={() => navigate(-1)} className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <ChevronLeft size={20} color="#fff" />
            </button>
            <div className="flex-1">
              <p className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>Noodcontacten</p>
              <p className="text-white/60" style={{ fontSize: 12 }}>Sami Khilji — Veiligheid bij het zwembad</p>
            </div>
            <AlertTriangle size={24} color="rgba(255,255,255,0.3)" />
          </div>
        </div>

        {/* Important notice */}
        <div className="px-5 mt-5">
          <div className="bg-[#FEF0E7] rounded-[16px] p-4 flex items-start gap-3">
            <AlertTriangle size={18} color="#FF5C00" className="flex-shrink-0 mt-0.5" />
            <p className="text-[#8B5E3C]" style={{ fontSize: 12, lineHeight: 1.6 }}>
              Zorg ervoor dat minimaal 2 noodcontacten zijn ingevuld. Deze worden gecontacteerd bij een noodgeval tijdens de zwemles.
            </p>
          </div>
        </div>

        {/* Contacts list */}
        <div className="px-5 mt-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>
              Contactpersonen ({contacts.length})
            </p>
            <button onClick={() => setAdding(true)} className="flex items-center gap-1 text-[#0365C4]">
              <Plus size={14} />
              <span style={{ fontSize: 12, fontWeight: 600 }}>Toevoegen</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {contacts.map(c => (
              <div key={c.id} className="bg-white rounded-[16px] px-4 py-4 flex items-center gap-3" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E74C3C, #FF6B6B)' }}>
                  <User size={20} color="#fff" />
                </div>
                <div className="flex-1">
                  <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</p>
                  <p className="text-[#8E9BB3]" style={{ fontSize: 12 }}>{c.relation}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Phone size={11} color="#0365C4" />
                    <span className="text-[#0365C4]" style={{ fontSize: 12, fontWeight: 500 }}>{c.phone}</span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button className="w-[32px] h-[32px] rounded-[8px] bg-[#F4F7FC] flex items-center justify-center">
                    <Edit3 size={13} color="#6B7B94" />
                  </button>
                  {contacts.length > 1 && (
                    <button onClick={() => deleteContact(c.id)} className="w-[32px] h-[32px] rounded-[8px] bg-[#FEE4E4] flex items-center justify-center">
                      <Trash2 size={13} color="#E74C3C" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add new contact form */}
          {adding && (
            <div className="bg-white rounded-[16px] p-4 mt-3" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: '2px solid #0365C4' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[#0365C4]" style={{ fontSize: 14, fontWeight: 700 }}>Nieuw contact</p>
                <button onClick={() => setAdding(false)}>
                  <X size={18} color="#8E9BB3" />
                </button>
              </div>
              <input
                placeholder="Volledige naam"
                value={newContact.name}
                onChange={e => setNewContact({ ...newContact, name: e.target.value })}
                className="w-full h-[44px] px-3 rounded-[10px] bg-[#F4F7FC] text-[#1A1A2E] placeholder:text-[#A0AEC0] outline-none mb-2"
                style={{ fontSize: 13, border: '1.5px solid #E8ECF4' }}
              />
              <input
                placeholder="Telefoonnummer"
                value={newContact.phone}
                onChange={e => setNewContact({ ...newContact, phone: e.target.value })}
                className="w-full h-[44px] px-3 rounded-[10px] bg-[#F4F7FC] text-[#1A1A2E] placeholder:text-[#A0AEC0] outline-none mb-2"
                style={{ fontSize: 13, border: '1.5px solid #E8ECF4' }}
              />
              <div className="flex flex-wrap gap-1.5 mb-3">
                {relations.map(r => (
                  <button
                    key={r}
                    onClick={() => setNewContact({ ...newContact, relation: r })}
                    className="rounded-full px-3 py-1.5 transition-all"
                    style={{
                      fontSize: 11, fontWeight: 600,
                      background: newContact.relation === r ? '#0365C4' : '#F4F7FC',
                      color: newContact.relation === r ? '#fff' : '#6B7B94',
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <button
                onClick={addContact}
                className="w-full h-[44px] rounded-[12px] text-white flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)', fontSize: 13, fontWeight: 700 }}
              >
                <Check size={16} /> Opslaan
              </button>
            </div>
          )}
        </div>

        {/* Medical notes */}
        <div className="px-5 mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Heart size={16} color="#E74C3C" />
              <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>Medische bijzonderheden</p>
            </div>
            <button onClick={() => setEditingMedical(!editingMedical)} className="text-[#0365C4]" style={{ fontSize: 12, fontWeight: 600 }}>
              {editingMedical ? 'Opslaan' : 'Bewerken'}
            </button>
          </div>
          <div className="bg-white rounded-[16px] p-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            {editingMedical ? (
              <textarea
                value={medicalNotes}
                onChange={e => setMedicalNotes(e.target.value)}
                className="w-full h-[100px] bg-[#F4F7FC] rounded-[10px] p-3 text-[#1A1A2E] outline-none resize-none"
                style={{ fontSize: 13, border: '1.5px solid #0365C4' }}
              />
            ) : (
              <p className="text-[#4A5568]" style={{ fontSize: 13, lineHeight: 1.6 }}>{medicalNotes}</p>
            )}
          </div>
        </div>

        {/* Allergy tags */}
        <div className="px-5 mt-4">
          <p className="text-[#1A1A2E] mb-2" style={{ fontSize: 14, fontWeight: 700 }}>Allergieën</p>
          <div className="flex flex-wrap gap-2">
            {['Geen allergieën', 'Chloor-gevoelig'].map((a, i) => (
              <span key={i} className="rounded-full px-3 py-1.5" style={{ fontSize: 11, fontWeight: 600, background: i === 0 ? '#E8F8F0' : '#F4F7FC', color: i === 0 ? '#27AE60' : '#8E9BB3' }}>
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Save button */}
        <div className="px-5 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="w-full h-[52px] rounded-[16px] text-white active:scale-[0.98] transition-all"
            style={{ background: 'linear-gradient(135deg, #E74C3C, #C0392B)', fontSize: 15, fontWeight: 700, boxShadow: '0 8px 24px rgba(231,76,60,0.3)' }}
          >
            Wijzigingen opslaan
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}

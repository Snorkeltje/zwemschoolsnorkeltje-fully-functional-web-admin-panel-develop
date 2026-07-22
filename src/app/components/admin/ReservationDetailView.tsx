import { useState } from 'react';
import { AdminView } from './AdminLayout';
import {
  ArrowLeft, ClipboardList, Clock, X as XIcon, RefreshCw, Mail, FileText,
  Eye, Trash2, Star, Check, Edit2, Send, Calendar, MapPin, Phone, Users,
  CreditCard, Hash, CheckCircle2, AlertTriangle, Target, BookOpen,
} from 'lucide-react';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl ${className}`} style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.04)', border: '1px solid #E8ECF4' }}>{children}</div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, { bg: string; text: string }> = {
    'Actief': { bg: '#ECFDF5', text: '#065F46' }, 'Bevestigd': { bg: '#ECFDF5', text: '#065F46' }, 'Betaald': { bg: '#ECFDF5', text: '#065F46' }, 'Voltooid': { bg: '#ECFDF5', text: '#065F46' },
    'Geannuleerd': { bg: '#FEF2F2', text: '#991B1B' }, 'No-show': { bg: '#FEF2F2', text: '#991B1B' }, 'Vervallen': { bg: '#FEF2F2', text: '#991B1B' },
    'Nieuw': { bg: '#EFF6FF', text: '#1E40AF' }, 'In behandeling': { bg: '#FFF7ED', text: '#9A3412' },
  };
  const c = colors[status] || { bg: '#F3F4F6', text: '#6B7280' };
  return <span className="px-2.5 py-1 rounded-full inline-block" style={{ background: c.bg, color: c.text, fontSize: 11, fontWeight: 600 }}>{status}</span>;
};

interface Reservation {
  id: string; product: string; date: string; timeFrom: string; timeTo: string;
  customer: string; status: string; paidWith: string; amount: number;
}

interface ReservationDetailViewProps {
  reservation: Reservation;
  goTo: (v: AdminView) => void;
  showToast: (msg: string) => void;
}

const SectionHeader = ({ title, id }: { title: string; id?: string }) => (
  <div className="flex items-center justify-between px-5 py-2.5 rounded-t-xl" style={{ background: '#2C3E50' }}>
    <span className="text-white" style={{ fontSize: 13, fontWeight: 700 }}>{title}{id ? `: ${id}` : ''}</span>
    <div className="flex items-center gap-1.5">
      <button className="p-1 rounded hover:bg-white/10"><Edit2 size={12} className="text-white/60" /></button>
      <button className="p-1 rounded hover:bg-white/10"><Eye size={12} className="text-white/60" /></button>
    </div>
  </div>
);

const DetailRow = ({ label, value, isLink }: { label: string; value: string; isLink?: boolean }) => (
  <div className="flex items-start py-2.5 px-5 border-b border-[#F0F4FA] last:border-0">
    <span className="text-[#1A1A2E] w-[180px] flex-shrink-0" style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
    <span className="text-[#6B7B94] mx-2">:</span>
    <span className={`${isLink ? 'text-[#0365C4] underline cursor-pointer hover:text-[#024ea0]' : 'text-[#1A1A2E]'}`} style={{ fontSize: 13 }}>{value}</span>
  </div>
);

export function ReservationDetailView({ reservation, goTo, showToast }: ReservationDetailViewProps) {
  const [bottomTab, setBottomTab] = useState<'opmerkingen' | 'geschiedenis' | 'emails' | 'taken'>('opmerkingen');
  const [newComment, setNewComment] = useState('');
  const [extraQuestion, setExtraQuestion] = useState('A');

  const resNum = reservation.id.replace('RES-2026-', '');
  const customerData = {
    parentName: 'Muriel Smit-Bakkenes',
    childFirst: 'Kyana', childLast: 'Smit',
    dob: 'wo mei 02, 2018', city: 'Zeewolde',
    email: 'Muriel.bakkenes@hotmail.com',
    phone1: '0629776424', phone2: '0640157917',
    day: 'Zaterdag',
    waitlistChoice: 'Lessen samenvoegen',
    oneOnXChoice: 'Er mag (ongeacht niveau) een ander kind naast zwemmen',
    progress: 'Level 2 - Drijven', progressExtended: 'Diploma A — Stap 4/8',
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <button onClick={() => goTo('reservations')} className="p-2 rounded-lg hover:bg-white text-[#6B7B94]"><ArrowLeft size={18} /></button>
          <div className="w-10 h-10 rounded-lg bg-[#2C3E50] flex items-center justify-center"><Calendar size={20} className="text-white" /></div>
          <div>
            <h1 className="text-[#1A1A2E]" style={{ fontSize: 22, fontWeight: 700 }}>Reservering {resNum}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"><Star size={18} /></button>
          <select className="px-3 py-2 rounded-lg bg-white border border-[#E8ECF4] text-[#1A1A2E]" style={{ fontSize: 13 }}>
            <option>Weergaves</option><option>Compact</option><option>Uitgebreid</option>
          </select>
          <button onClick={() => goTo('reservation-new')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white" style={{ background: '#27AE60', fontSize: 13, fontWeight: 600 }}>+ Nieuw via kalender</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* ── Left Column (3/5) ── */}
        <div className="lg:col-span-3 space-y-4">
          {/* RESERVERING section */}
          <Card className="overflow-hidden">
            <SectionHeader title="RESERVERING" id={resNum} />
            <div className="px-0">
              <div className="px-5 py-2 text-[#6B7B94] border-b border-[#F0F4FA]" style={{ fontSize: 12 }}>Details van de reservering:</div>
              <DetailRow label="Product" value={`*${reservation.product}`} isLink />
              <DetailRow label="Datum" value={reservation.date} />
              <DetailRow label="Tijd vanaf" value={reservation.timeFrom} />
              <DetailRow label="Tijd tot" value={reservation.timeTo} />
              <DetailRow label="Aantal plaatsen" value="1" />
              <DetailRow label="Opmerkingen" value="" />
              <DetailRow label="Interne opmerkingen" value="" />
              <div className="px-5 py-3 border-t border-[#E8ECF4] bg-[#F8FAFC] space-y-1" style={{ fontSize: 12 }}>
                <p className="text-[#6B7B94]"><span className="text-[#1A1A2E]" style={{ fontWeight: 600 }}>Status#</span> : 30-BETAALD</p>
                <p className="text-[#6B7B94]"><span className="text-[#FF5C00]" style={{ fontWeight: 600 }}>Aanmaak datum</span> : zo mrt. 15, 2026 07:44 a.m.</p>
                <p className="text-[#6B7B94]"><span className="text-[#FF5C00]" style={{ fontWeight: 600 }}>Laatst bijgewerkt</span> : zo mrt. 15, 2026 07:45 a.m.</p>
              </div>
            </div>
          </Card>

          {/* KLANTGEGEVENS section */}
          <Card className="overflow-hidden">
            <SectionHeader title="KLANTGEGEVENS" />
            <div className="px-0">
              <DetailRow label="Voor+achternaam ouder" value={customerData.parentName} />
              <DetailRow label="Voornaam kind" value={customerData.childFirst} />
              <DetailRow label="Achternaam kind" value={customerData.childLast} />
              <DetailRow label="Geboortedatum kind" value={customerData.dob} />
              <DetailRow label="Woonplaats" value={customerData.city} />
              <DetailRow label="E-mail" value={customerData.email} isLink />
              <DetailRow label="Mobiel (1e contactpersoon)" value={customerData.phone1} isLink />
              <DetailRow label="Extra tel. nr (2e contactpersoon)" value={customerData.phone2} />
              <DetailRow label="Dag" value={customerData.day} />
              <DetailRow label="Waar kiezen jullie voor bij uitval collega?" value={customerData.waitlistChoice} />
              <DetailRow label="Voorkeur bij duo / trio / groepsles:" value={customerData.oneOnXChoice} />
              <DetailRow label="VOORTGANG" value={customerData.progress} />
              <DetailRow label="VOORTGANG (uitgebreid)" value={customerData.progressExtended} />
              <div className="px-5 py-2 border-t border-[#E8ECF4]">
                <button onClick={() => goTo('customer-detail')} className="text-[#0365C4] underline hover:text-[#024ea0]" style={{ fontSize: 12 }}>ga naar dashboard klant</button>
              </div>
            </div>
          </Card>

          {/* PRIJS RESERVERING section */}
          <Card className="overflow-hidden">
            <SectionHeader title={`PRIJS RESERVERING: ${resNum}`} />
            <div className="overflow-x-auto">
              <table className="w-full" style={{ fontSize: 13 }}>
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E8ECF4]">
                    {['Detail', 'Omschrijving', 'Vanaf datum', 'Vanaf tijd', 'Tot datum', 'Tot tijd', 'Subtotaal', ''].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-[#6B7B94]" style={{ fontWeight: 600, fontSize: 11 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#F0F4FA]">
                    <td className="px-4 py-2.5 text-[#1A1A2E]">Detail</td>
                    <td className="px-4 py-2.5 text-[#0365C4] underline cursor-pointer">*{reservation.product}</td>
                    <td className="px-4 py-2.5">{reservation.date}</td>
                    <td className="px-4 py-2.5">{reservation.timeFrom}</td>
                    <td className="px-4 py-2.5">{reservation.date}</td>
                    <td className="px-4 py-2.5">{reservation.timeTo}</td>
                    <td className="px-4 py-2.5" style={{ fontWeight: 600 }}>{'\u20AC'} {reservation.amount},00</td>
                    <td className="px-4 py-2.5"></td>
                  </tr>
                  <tr className="border-b border-[#F0F4FA]">
                    <td className="px-4 py-2.5 text-[#1A1A2E]">Detail</td>
                    <td className="px-4 py-2.5 text-[#6B7B94]">Betaald met tegoed</td>
                    <td className="px-4 py-2.5" colSpan={4}></td>
                    <td className="px-4 py-2.5 text-[#E74C3C]" style={{ fontWeight: 600 }}>{'\u20AC'} -{reservation.amount},00</td>
                    <td className="px-4 py-2.5">
                      <div className="flex gap-1">
                        <button className="p-1 rounded hover:bg-[#F4F7FC] text-[#0365C4]"><Edit2 size={13} /></button>
                        <button className="p-1 rounded hover:bg-[#FEF2F2] text-[#E74C3C]"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-[#F8FAFC]" style={{ fontWeight: 700 }}>
                    <td className="px-4 py-2.5 text-[#1A1A2E]">Totaal</td>
                    <td className="px-4 py-2.5 text-[#1A1A2E]">*{reservation.product}</td>
                    <td className="px-4 py-2.5">{reservation.date}</td>
                    <td className="px-4 py-2.5">{reservation.timeFrom}</td>
                    <td className="px-4 py-2.5">{reservation.date}</td>
                    <td className="px-4 py-2.5">{reservation.timeTo}</td>
                    <td className="px-4 py-2.5 text-[#27AE60]">{'\u20AC'} 0,00</td>
                    <td className="px-4 py-2.5"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* RESERVERING BETALINGEN */}
          <Card className="overflow-hidden">
            <SectionHeader title={`RESERVERING BETALINGEN: ${resNum}`} />
            <div className="overflow-x-auto">
              <table className="w-full" style={{ fontSize: 13 }}>
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E8ECF4]">
                    {['Type', 'Methode', 'Status#', 'Bedrag', 'Datum'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-[#6B7B94]" style={{ fontWeight: 600, fontSize: 11 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#F0F4FA]">
                    <td className="px-4 py-3 text-[#A0AEC0]" colSpan={5} style={{ fontSize: 12 }}>Geen betalingen gevonden</td>
                  </tr>
                </tbody>
              </table>
              <div className="px-4 py-2.5 border-t border-[#E8ECF4] bg-[#F8FAFC]">
                <span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 700 }}>Totaal openstaand</span>
                <span className="ml-3 text-[#27AE60]" style={{ fontSize: 13, fontWeight: 700 }}>{'\u20AC'} 0,00</span>
              </div>
            </div>
          </Card>

          {/* STATUSOVERGANGEN */}
          <Card className="overflow-hidden">
            <SectionHeader title={`STATUSOVERGANGEN RESERVERING: ${resNum}`} />
            <div className="overflow-x-auto">
              <table className="w-full" style={{ fontSize: 12 }}>
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E8ECF4]">
                    {['Status oud', 'Status nieuw', 'Email J/N', 'SMS J/N', 'Aan adres', 'Template', 'Opmerkingen', 'Gebruikersnaam', 'Datum', 'Tijdstip'].map(h => (
                      <th key={h} className="text-left px-3 py-2 text-[#6B7B94]" style={{ fontWeight: 600, fontSize: 10 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#F0F4FA]">
                    <td className="px-3 py-2.5"></td>
                    <td className="px-3 py-2.5">10-Nieuw</td>
                    <td className="px-3 py-2.5">Nee</td>
                    <td className="px-3 py-2.5">Nee</td>
                    <td className="px-3 py-2.5"></td>
                    <td className="px-3 py-2.5"></td>
                    <td className="px-3 py-2.5"></td>
                    <td className="px-3 py-2.5">{customerData.parentName}</td>
                    <td className="px-3 py-2.5">15-03-2026</td>
                    <td className="px-3 py-2.5">07:44</td>
                  </tr>
                  <tr className="border-b border-[#F0F4FA]">
                    <td className="px-3 py-2.5">10-Nieuw</td>
                    <td className="px-3 py-2.5" style={{ fontWeight: 600 }}>30-Betaald</td>
                    <td className="px-3 py-2.5">Ja <Mail size={10} className="inline text-[#0365C4]" /></td>
                    <td className="px-3 py-2.5">Nee</td>
                    <td className="px-3 py-2.5 text-[#0365C4] underline" style={{ fontSize: 11 }}>{customerData.email}</td>
                    <td className="px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 10 }}>E1_bevestiging_SNORKEL_RESERVERING</td>
                    <td className="px-3 py-2.5 text-[#6B7B94]" style={{ fontSize: 10 }}>Automatische overgang - zet betaald (10 {'>'} 30) [14588]</td>
                    <td className="px-3 py-2.5">Anonymous</td>
                    <td className="px-3 py-2.5">15-03-2026</td>
                    <td className="px-3 py-2.5">07:45</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Bottom tabs: Opmerkingen, Geschiedenis, Emails, Taken */}
          <Card className="overflow-hidden">
            <div className="flex border-b border-[#E8ECF4]">
              {(['opmerkingen', 'geschiedenis', 'emails', 'taken'] as const).map(tab => (
                <button key={tab} onClick={() => setBottomTab(tab)}
                  className={`px-5 py-3 transition-all ${bottomTab === tab ? 'text-[#0365C4] border-b-2 border-[#0365C4]' : 'text-[#6B7B94] hover:text-[#1A1A2E]'}`}
                  style={{ fontSize: 13, fontWeight: bottomTab === tab ? 700 : 500 }}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="p-5">
              {bottomTab === 'opmerkingen' && (
                <div>
                  <div className="space-y-3 mb-4">
                    <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#F0F4FA]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>Walter Van De Geest</span>
                        <span className="text-[#A0AEC0]" style={{ fontSize: 11 }}>15-03-2026 07:44</span>
                      </div>
                      <p className="text-[#6B7B94]" style={{ fontSize: 13 }}>Reservering aangemaakt via website. Tegoed automatisch afgeboekt.</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Voeg opmerking toe..." className="flex-1 px-3 py-2.5 rounded-lg border border-[#E8ECF4] outline-none focus:border-[#0365C4] text-[#1A1A2E]" style={{ fontSize: 13 }} />
                    <button onClick={() => { showToast('Opmerking toegevoegd'); setNewComment(''); }} className="px-4 py-2.5 rounded-lg text-white" style={{ background: '#27AE60', fontSize: 13, fontWeight: 600 }}>Toevoegen</button>
                  </div>
                </div>
              )}
              {bottomTab === 'geschiedenis' && (
                <div className="space-y-2">
                  {[
                    { time: '15-03-2026 07:45', action: 'Status gewijzigd: 10-Nieuw → 30-Betaald', user: 'System' },
                    { time: '15-03-2026 07:44', action: 'Reservering aangemaakt', user: customerData.parentName },
                    { time: '15-03-2026 07:44', action: 'Tegoed afgeboekt (-€39)', user: 'System' },
                  ].map((h, i) => (
                    <div key={i} className="flex items-start gap-3 py-2 border-b border-[#F0F4FA] last:border-0">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#0365C4' }} />
                      <div className="flex-1">
                        <p className="text-[#1A1A2E]" style={{ fontSize: 13 }}>{h.action}</p>
                        <p className="text-[#A0AEC0]" style={{ fontSize: 11 }}>{h.user} — {h.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {bottomTab === 'emails' && (
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#F0F4FA]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-[#0365C4]" />
                        <span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>E1_bevestiging_SNORKEL_RESERVERING</span>
                      </div>
                      <span className="text-[#A0AEC0]" style={{ fontSize: 11 }}>15-03-2026 07:45</span>
                    </div>
                    <p className="text-[#6B7B94] mt-1" style={{ fontSize: 12 }}>Verstuurd naar: {customerData.email}</p>
                    <p className="text-[#27AE60]" style={{ fontSize: 11, fontWeight: 600 }}>Afgeleverd</p>
                  </div>
                </div>
              )}
              {bottomTab === 'taken' && (
                <div>
                  <p className="text-[#A0AEC0]" style={{ fontSize: 13 }}>Geen gekoppelde taken</p>
                  <button onClick={() => showToast('Taak aangemaakt')} className="mt-3 flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#0365C4] bg-[#0365C4]/10" style={{ fontSize: 13, fontWeight: 600 }}>
                    <ClipboardList size={14} /> Taak aanmaken
                  </button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* ── Right Column (2/5) ── */}
        <div className="lg:col-span-2 space-y-4">
          {/* ACTIE RESERVERING */}
          <Card className="overflow-hidden">
            <SectionHeader title={`ACTIE RESERVERING ${resNum}`} />
            <div className="p-4 space-y-1">
              {[
                { label: 'AANMAKEN TAAK', icon: ClipboardList, color: '#1A1A2E', action: () => showToast('Taak aangemaakt voor reservering') },
                { label: 'WIJZIGEN DATUM & TIJD', icon: Clock, color: '#0365C4', action: () => showToast('Datum/tijd wijzigen dialoog') },
                { label: 'ANNULEER → 71 - GEANNULEERDBEHEEER', icon: XIcon, color: '#6B7B94', action: () => showToast('Annulering verwerkt') },
                { label: 'WIJZIG STATUS', icon: RefreshCw, color: '#6B7B94', action: () => showToast('Status gewijzigd') },
                { label: 'VERSTUUR EMAIL', icon: Mail, color: '#6B7B94', action: () => showToast('Email verzonden') },
                { label: 'MAAK PDF', icon: FileText, color: '#6B7B94', action: () => showToast('PDF gegenereerd') },
                { label: 'TOON RESOURCES', icon: Eye, color: '#6B7B94', action: () => showToast('Resources geladen') },
                { label: 'VERWIJDEREN', icon: Trash2, color: '#E74C3C', action: () => showToast('Reservering verwijderd') },
              ].map(a => {
                const Icon = a.icon;
                return (
                  <button key={a.label} onClick={a.action} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F4F7FC] transition-all text-left">
                    <Icon size={16} color={a.color} />
                    <span className={`${a.color === '#0365C4' || a.color === '#E74C3C' ? '' : ''}`} style={{ fontSize: 13, fontWeight: 600, color: a.color, textDecoration: a.label.includes('ANNULEER') ? 'line-through' : a.label !== 'AANMAKEN TAAK' ? 'underline' : 'none', textUnderlineOffset: 2 }}>
                      {a.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* EXTRA VRAGEN */}
          <Card className="overflow-hidden">
            <SectionHeader title={`EXTRA VRAGEN VOOR: ${resNum}`} />
            <div className="p-5">
              <p className="text-[#1A1A2E] mb-3" style={{ fontSize: 13 }}>
                Wanneer er geen kind naast jullie kind komt zwemmen dan willen jullie:
              </p>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="extraQ" value="A" checked={extraQuestion === 'A'} onChange={() => setExtraQuestion('A')} className="w-4 h-4 accent-[#0365C4]" />
                  <span className="text-[#1A1A2E]" style={{ fontSize: 13 }}>A. De les laten omzetten naar een privéles</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="extraQ" value="B" checked={extraQuestion === 'B'} onChange={() => setExtraQuestion('B')} className="w-4 h-4 accent-[#0365C4]" />
                  <span className="text-[#1A1A2E]" style={{ fontSize: 13 }}>B. De les laten annuleren</span>
                </label>
              </div>
            </div>
          </Card>

          {/* AANGEPASTE VELDEN */}
          <Card className="overflow-hidden">
            <SectionHeader title="AANGEPASTE VELDEN RESERVERING" />
            <div className="px-0">
              <DetailRow label="Instructeur" value="" />
              <DetailRow label="Teller" value="29" />
            </div>
          </Card>

          {/* Quick info card */}
          <Card className="p-5">
            <h4 className="text-[#1A1A2E] mb-3" style={{ fontSize: 14, fontWeight: 700 }}>Snel overzicht</h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] flex items-center justify-center"><CheckCircle2 size={16} className="text-[#27AE60]" /></div>
                <div>
                  <p className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>Status</p>
                  <StatusBadge status={reservation.status} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0365C4]/10 flex items-center justify-center"><CreditCard size={16} className="text-[#0365C4]" /></div>
                <div>
                  <p className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>Betaalmethode</p>
                  <p className="text-[#6B7B94]" style={{ fontSize: 12 }}>{reservation.paidWith}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FF5C00]/10 flex items-center justify-center"><Target size={16} className="text-[#FF5C00]" /></div>
                <div>
                  <p className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>Voortgang leerling</p>
                  <p className="text-[#6B7B94]" style={{ fontSize: 12 }}>{customerData.progress}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

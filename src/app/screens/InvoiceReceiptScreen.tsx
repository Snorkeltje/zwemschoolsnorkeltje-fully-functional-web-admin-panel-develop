import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';
import { ChevronLeft, Download, Share2, FileText, Check, CreditCard } from 'lucide-react';

const invoices = [
  { id: 'INV-2026-042', date: '15 mrt 2026', description: '1-op-1 Knipkaart (10 lessen)', amount: 380.00, status: 'paid', method: 'iDEAL' },
  { id: 'INV-2026-038', date: '1 feb 2026', description: '1-op-2 Knipkaart (10 lessen)', amount: 190.00, status: 'paid', method: 'Creditcard' },
  { id: 'INV-2025-091', date: '15 dec 2025', description: '1-op-1 Knipkaart (10 lessen)', amount: 380.00, status: 'paid', method: 'iDEAL' },
  { id: 'INV-2025-067', date: '3 okt 2025', description: 'Vakantie-zwemles pakket', amount: 114.00, status: 'paid', method: 'Bancontact' },
  { id: 'INV-2025-045', date: '12 aug 2025', description: '1-op-3 Knipkaart (10 lessen)', amount: 114.00, status: 'refunded', method: 'iDEAL' },
];

export function InvoiceReceiptScreen() {
  const navigate = useNavigate();
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const invoice = invoices.find(i => i.id === selectedInvoice);

  if (invoice) {
    return (
      <MobileFrame>
        <div className="min-h-full bg-[#F4F7FC] pb-28">
          {/* Header */}
          <div className="px-5 pt-[58px] pb-4 bg-white" style={{ borderBottom: '1px solid #F0F4FA' }}>
            <div className="flex items-center justify-between">
              <button onClick={() => setSelectedInvoice(null)} className="w-[40px] h-[40px] rounded-[12px] bg-[#F4F7FC] flex items-center justify-center">
                <ChevronLeft size={20} color="#1A1A2E" />
              </button>
              <p className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>Factuur</p>
              <div className="flex gap-2">
                <button className="w-[40px] h-[40px] rounded-[12px] bg-[#F4F7FC] flex items-center justify-center">
                  <Share2 size={17} color="#0365C4" />
                </button>
                <button className="w-[40px] h-[40px] rounded-[12px] bg-[#0365C4] flex items-center justify-center">
                  <Download size={17} color="#fff" />
                </button>
              </div>
            </div>
          </div>

          {/* Invoice preview */}
          <div className="px-5 mt-5">
            <div className="bg-white rounded-[20px] p-6" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              {/* Logo & title */}
              <div className="flex items-start justify-between mb-6">
                <SnorkeltjeLogo size="small" />
                <div className="text-right">
                  <p className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>FACTUUR</p>
                  <p className="text-[#8E9BB3]" style={{ fontSize: 11 }}>{invoice.id}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#E8ECF4] mb-4" />

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <p className="text-[#8E9BB3]" style={{ fontSize: 10, fontWeight: 600 }}>DATUM</p>
                  <p className="text-[#1A1A2E] mt-0.5" style={{ fontSize: 13, fontWeight: 600 }}>{invoice.date}</p>
                </div>
                <div>
                  <p className="text-[#8E9BB3]" style={{ fontSize: 10, fontWeight: 600 }}>STATUS</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-[6px] h-[6px] rounded-full" style={{ background: invoice.status === 'paid' ? '#27AE60' : '#E74C3C' }} />
                    <p style={{ fontSize: 13, fontWeight: 600, color: invoice.status === 'paid' ? '#27AE60' : '#E74C3C' }}>
                      {invoice.status === 'paid' ? 'Betaald' : 'Teruggestort'}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[#8E9BB3]" style={{ fontSize: 10, fontWeight: 600 }}>KLANT</p>
                  <p className="text-[#1A1A2E] mt-0.5" style={{ fontSize: 13, fontWeight: 600 }}>Ahmed Khilji</p>
                </div>
                <div>
                  <p className="text-[#8E9BB3]" style={{ fontSize: 10, fontWeight: 600 }}>BETAALMETHODE</p>
                  <p className="text-[#1A1A2E] mt-0.5" style={{ fontSize: 13, fontWeight: 600 }}>{invoice.method}</p>
                </div>
              </div>

              {/* Line items */}
              <div className="bg-[#F4F7FC] rounded-[12px] p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[#8E9BB3]" style={{ fontSize: 10, fontWeight: 600 }}>OMSCHRIJVING</p>
                  <p className="text-[#8E9BB3]" style={{ fontSize: 10, fontWeight: 600 }}>BEDRAG</p>
                </div>
                <div className="flex items-start justify-between">
                  <p className="text-[#1A1A2E] flex-1 pr-4" style={{ fontSize: 13, fontWeight: 500 }}>{invoice.description}</p>
                  <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 700 }}>€{invoice.amount.toFixed(2)}</p>
                </div>
                <div className="h-px bg-[#E8ECF4] my-3" />
                <div className="flex justify-between">
                  <span className="text-[#8E9BB3]" style={{ fontSize: 12 }}>BTW (0%)</span>
                  <span className="text-[#1A1A2E]" style={{ fontSize: 12 }}>€0,00</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between bg-[#0365C4] rounded-[12px] px-4 py-3">
                <span className="text-white/80" style={{ fontSize: 13, fontWeight: 600 }}>Totaal</span>
                <span className="text-white" style={{ fontSize: 20, fontWeight: 800 }}>€{invoice.amount.toFixed(2)}</span>
              </div>

              {/* Footer */}
              <div className="text-center mt-5">
                <p className="text-[#A0AEC0]" style={{ fontSize: 10 }}>Zwemschool Snorkeltje — KvK: 12345678 — BTW: NL001234567B01</p>
                <p className="text-[#A0AEC0] mt-0.5" style={{ fontSize: 10 }}>De Bilt, Utrecht, Nederland</p>
              </div>
            </div>
          </div>
        </div>
        <BottomNav />
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-28">
        {/* Header */}
        <div
          className="relative px-5 pt-[58px] pb-6"
          style={{ background: 'linear-gradient(135deg, #0365C4 0%, #0D7FE8 60%, #00C1FF 100%)', borderRadius: '0 0 28px 28px' }}
        >
          <div className="flex items-center gap-3 relative z-10">
            <button onClick={() => navigate(-1)} className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <ChevronLeft size={20} color="#fff" />
            </button>
            <div className="flex-1">
              <p className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>Facturen & Bonnen</p>
              <p className="text-white/60" style={{ fontSize: 12 }}>Alle betalingsoverzichten</p>
            </div>
            <FileText size={24} color="rgba(255,255,255,0.3)" />
          </div>
        </div>

        {/* Summary */}
        <div className="px-5 -mt-3">
          <div className="bg-white rounded-[18px] p-4 flex items-center justify-around" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            <div className="text-center">
              <p className="text-[#0365C4]" style={{ fontSize: 20, fontWeight: 800 }}>€1.178</p>
              <p className="text-[#8E9BB3]" style={{ fontSize: 10 }}>Totaal betaald</p>
            </div>
            <div className="w-px h-10 bg-[#E8ECF4]" />
            <div className="text-center">
              <p className="text-[#27AE60]" style={{ fontSize: 20, fontWeight: 800 }}>5</p>
              <p className="text-[#8E9BB3]" style={{ fontSize: 10 }}>Facturen</p>
            </div>
            <div className="w-px h-10 bg-[#E8ECF4]" />
            <div className="text-center">
              <p className="text-[#FF5C00]" style={{ fontSize: 20, fontWeight: 800 }}>1</p>
              <p className="text-[#8E9BB3]" style={{ fontSize: 10 }}>Teruggestort</p>
            </div>
          </div>
        </div>

        {/* Invoice list */}
        <div className="px-5 mt-5">
          <p className="text-[#1A1A2E] mb-3" style={{ fontSize: 14, fontWeight: 700 }}>Alle facturen</p>
          <div className="space-y-2.5">
            {invoices.map(inv => (
              <button
                key={inv.id}
                onClick={() => setSelectedInvoice(inv.id)}
                className="w-full bg-white rounded-[16px] px-4 py-4 flex items-center gap-3 active:scale-[0.99] transition-all"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}
              >
                <div
                  className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center"
                  style={{ background: inv.status === 'paid' ? '#E8F8F0' : '#FEE4E4' }}
                >
                  {inv.status === 'paid' ? <Check size={18} color="#27AE60" /> : <CreditCard size={18} color="#E74C3C" />}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 700 }}>{inv.id}</p>
                  <p className="text-[#8E9BB3]" style={{ fontSize: 11 }}>{inv.description}</p>
                  <p className="text-[#A0AEC0]" style={{ fontSize: 10 }}>{inv.date} · {inv.method}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#1A1A2E]" style={{ fontSize: 15, fontWeight: 700 }}>€{inv.amount.toFixed(2)}</p>
                  <p style={{ fontSize: 10, fontWeight: 600, color: inv.status === 'paid' ? '#27AE60' : '#E74C3C' }}>
                    {inv.status === 'paid' ? 'Betaald' : 'Teruggestort'}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

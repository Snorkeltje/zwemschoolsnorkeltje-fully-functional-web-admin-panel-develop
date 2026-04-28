import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { ChevronLeft, ThumbsUp, ThumbsDown, MessageCircle, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const relatedFaqs = [
  'Hoe kan ik een extra les boeken?',
  'Wat is het verschil tussen 1-op-1 en 1-op-2?',
  'Kan ik van locatie wisselen?',
];

export function FAQDetailScreen() {
  const navigate = useNavigate();
  const [helpful, setHelpful] = useState<'yes' | 'no' | null>(null);

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] flex flex-col">
        {/* Header */}
        <div className="bg-white px-4 pt-4 pb-3 flex items-center gap-3" style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.06)' }}>
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#F4F7FC] flex items-center justify-center">
            <ChevronLeft size={20} className="text-[#1A1A2E]" />
          </button>
          <div>
            <p className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>FAQ</p>
            <p className="text-[#8E8EA0]" style={{ fontSize: 11 }}>Annulering & Terugbetaling</p>
          </div>
        </div>

        <div className="flex-1 px-4 pt-5">
          {/* Category badge */}
          <div className="bg-[#FEF3DC] rounded-full px-3 py-1 inline-flex">
            <span className="text-[#F39C12]" style={{ fontSize: 11, fontWeight: 600 }}>📅 Annulering</span>
          </div>

          {/* Question */}
          <p className="text-[#1A1A2E] mt-3" style={{ fontSize: 20, fontWeight: 700 }}>
            Hoe kan ik een zwemles annuleren?
          </p>

          {/* Answer */}
          <div className="bg-white rounded-[16px] p-5 mt-4" style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.08)' }}>
            <p className="text-[#4A4A6A]" style={{ fontSize: 14, lineHeight: '22px' }}>
              Je kunt een zwemles annuleren via de app of door contact op te nemen met Zwemschool Snorkeltje. Houd rekening met de volgende regels:
            </p>

            <div className="mt-4 space-y-3">
              <div className="bg-[#E8F4FD] rounded-[12px] p-3">
                <p className="text-[#1A6FBF]" style={{ fontSize: 13, fontWeight: 700 }}>📋 Standaard lessen</p>
                <p className="text-[#4A4A6A] mt-1" style={{ fontSize: 13 }}>
                  Gratis annuleren tot <strong>24 uur</strong> voor aanvang van de les. Binnen 24 uur is annulering helaas niet meer mogelijk.
                </p>
              </div>

              <div className="bg-[#FEF3DC] rounded-[12px] p-3">
                <p className="text-[#F39C12]" style={{ fontSize: 13, fontWeight: 700 }}>🏖️ Vakantielessen</p>
                <p className="text-[#4A4A6A] mt-1" style={{ fontSize: 13 }}>
                  Gratis annuleren tot <strong>4 dagen (96 uur)</strong> voor aanvang van de les. Dit geldt voor alle lessen tijdens schoolvakanties.
                </p>
              </div>
            </div>

            <div className="mt-4 border-t border-[#F0F0F0] pt-4">
              <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>Terugbetaling:</p>
              <ul className="mt-2 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#27AE60] mt-0.5">✓</span>
                  <p className="text-[#4A4A6A]" style={{ fontSize: 13 }}>
                    <strong>Knipkaart:</strong> Credits worden automatisch teruggestort.
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#27AE60] mt-0.5">✓</span>
                  <p className="text-[#4A4A6A]" style={{ fontSize: 13 }}>
                    <strong>Online betaling:</strong> Stuur de annuleringsbevestiging naar info@zwemschoolsnorkeltje.nl voor terugbetaling.
                  </p>
                </li>
              </ul>
            </div>

            <div className="mt-4 border-t border-[#F0F0F0] pt-4">
              <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>Zo annuleer je via de app:</p>
              <ol className="mt-2 space-y-1.5">
                {[
                  'Ga naar "Mijn Reserveringen"',
                  'Tik op de les die je wilt annuleren',
                  'Tik op "Annuleren"',
                  'Bevestig de annulering',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#1A6FBF] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white" style={{ fontSize: 10, fontWeight: 700 }}>{i + 1}</span>
                    </div>
                    <p className="text-[#4A4A6A]" style={{ fontSize: 13 }}>{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Helpful? */}
          <div className="bg-white rounded-[16px] p-4 mt-4 text-center" style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.06)' }}>
            <p className="text-[#4A4A6A]" style={{ fontSize: 13 }}>Was dit antwoord nuttig?</p>
            <div className="flex items-center justify-center gap-4 mt-3">
              <button
                onClick={() => setHelpful('yes')}
                className={`flex items-center gap-2 px-5 h-[40px] rounded-full transition-all ${
                  helpful === 'yes' ? 'bg-[#E8F8F0] border border-[#27AE60]' : 'bg-[#F4F7FC]'
                }`}
              >
                <ThumbsUp size={16} className={helpful === 'yes' ? 'text-[#27AE60]' : 'text-[#8E8EA0]'} />
                <span style={{ fontSize: 13, color: helpful === 'yes' ? '#27AE60' : '#8E8EA0' }}>Ja</span>
              </button>
              <button
                onClick={() => setHelpful('no')}
                className={`flex items-center gap-2 px-5 h-[40px] rounded-full transition-all ${
                  helpful === 'no' ? 'bg-[#FDE8E8] border border-[#E74C3C]' : 'bg-[#F4F7FC]'
                }`}
              >
                <ThumbsDown size={16} className={helpful === 'no' ? 'text-[#E74C3C]' : 'text-[#8E8EA0]'} />
                <span style={{ fontSize: 13, color: helpful === 'no' ? '#E74C3C' : '#8E8EA0' }}>Nee</span>
              </button>
            </div>
          </div>

          {/* Related */}
          <div className="mt-5">
            <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>Gerelateerde vragen</p>
            <div className="space-y-2 mt-2">
              {relatedFaqs.map(q => (
                <button key={q} className="w-full bg-white rounded-[12px] px-4 py-3.5 flex items-center justify-between" style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.04)' }}>
                  <span className="text-[#1A1A2E] text-left" style={{ fontSize: 13 }}>{q}</span>
                  <ChevronRight size={16} className="text-[#BDC3C7] flex-shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <button
            onClick={() => navigate('/chat')}
            className="w-full h-[52px] border-2 border-[#1A6FBF] rounded-[12px] mt-5 mb-6 flex items-center justify-center gap-2"
          >
            <MessageCircle size={18} className="text-[#1A6FBF]" />
            <span className="text-[#1A6FBF]" style={{ fontSize: 14, fontWeight: 600 }}>Stel een vraag</span>
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}

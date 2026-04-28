import { useState } from 'react';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';
import { ChevronLeft, Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../config/LanguageContext';

const locations = [
  { name: 'De Bilt - Utrecht', address: 'Sportpark De Bilt, Utrecht', phone: '+31 6 12345678' },
  { name: 'Garderen', address: 'Zwembad Garderen', phone: '+31 6 12345678' },
  { name: 'Mierlo', address: 'Sportcentrum Mierlo', phone: '+31 6 12345678' },
  { name: 'Nijkerk', address: 'Zwembad De Druppel, Nijkerk', phone: '+31 6 12345678' },
  { name: 'Wolfheze', address: 'Zwembad Wolfheze', phone: '+31 6 12345678' },
  { name: 'Dordrecht', address: 'Sportboulevard Dordrecht', phone: '+31 6 12345678' },
  { name: 'Soest', address: 'Zwembad Soest', phone: '+31 6 12345678' },
];

export function ContactScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [showLocations, setShowLocations] = useState(false);

  const handleSend = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-28">
        {/* Header */}
        <div
          className="relative px-5 pt-[58px] pb-8 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0365C4 0%, #0D7FE8 60%, #00C1FF 100%)',
            borderRadius: '0 0 32px 32px',
          }}
        >
          <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 430 30" fill="none" style={{ opacity: 0.12 }}>
            <path d="M0 15 Q107 0 215 15 Q322 30 430 15 L430 30 L0 30 Z" fill="#fff" />
          </svg>
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-[12px] flex items-center justify-center mb-3"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
          >
            <ChevronLeft size={20} color="#fff" />
          </button>
          <p className="text-white relative z-10" style={{ fontSize: 22, fontWeight: 700 }}>{t('contact.title')}</p>
          <p className="text-white/70 mt-1 relative z-10" style={{ fontSize: 13 }}>{t('contact.subtitle')}</p>
        </div>

        {/* Quick contact cards */}
        <div className="px-5 -mt-4">
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { icon: Phone, label: t('contact.call'), value: '+31 6 1234', color: '#27AE60', bg: '#E8F8F0' },
              { icon: Mail, label: t('contact.email'), value: 'info@', color: '#0365C4', bg: '#E8F0FE' },
              { icon: MessageCircle, label: t('contact.whatsapp'), value: 'Chat', color: '#25D366', bg: '#E8F8F0' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button key={item.label} className="bg-white rounded-[16px] p-3.5 flex flex-col items-center gap-2 active:scale-[0.97] transition-all" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                  <div className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center" style={{ backgroundColor: item.bg }}>
                    <Icon size={18} color={item.color} />
                  </div>
                  <span className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 700 }}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Openingstijden */}
        <div className="px-5 mt-5">
          <div className="bg-white rounded-[18px] p-4" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Clock size={16} color="#FF5C00" />
              <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{t('contact.hours')}</p>
            </div>
            <div className="space-y-2">
              {[
                { day: t('contact.mon_fri'), time: '09:00 – 20:00' },
                { day: t('contact.saturday'), time: '09:00 – 17:00' },
                { day: t('contact.sunday'), time: t('contact.closed') },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-1" style={{ borderTop: i > 0 ? '1px solid #F0F4FA' : 'none' }}>
                  <span className="text-[#4A5568]" style={{ fontSize: 13 }}>{item.day}</span>
                  <span className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Locaties */}
        <div className="px-5 mt-5">
          <button
            onClick={() => setShowLocations(!showLocations)}
            className="w-full bg-white rounded-[18px] p-4 flex items-center justify-between active:scale-[0.99] transition-all"
            style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}
          >
            <div className="flex items-center gap-2">
              <MapPin size={16} color="#0365C4" />
              <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{t('contact.our_locations')}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-[#E8F0FE] rounded-full px-2 py-0.5 text-[#0365C4]" style={{ fontSize: 11, fontWeight: 700 }}>{locations.length}</span>
              <ExternalLink size={14} color="#8E9BB3" />
            </div>
          </button>

          {showLocations && (
            <div className="mt-2 bg-white rounded-[16px] overflow-hidden" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
              {locations.map((loc, i) => (
                <div key={i} className="px-4 py-3 flex items-center gap-3" style={{ borderTop: i > 0 ? '1px solid #F0F4FA' : 'none' }}>
                  <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)' }}>
                    <MapPin size={14} color="#fff" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#1A1A2E]" style={{ fontSize: 13, fontWeight: 600 }}>{loc.name}</p>
                    <p className="text-[#8E9BB3]" style={{ fontSize: 11 }}>{loc.address}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Form */}
        <div className="px-5 mt-5">
          <p className="text-[#1A1A2E] mb-3" style={{ fontSize: 16, fontWeight: 700 }}>{t('contact.send_message')}</p>
          <div className="bg-white rounded-[18px] p-5" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
            {sent ? (
              <div className="flex flex-col items-center py-8">
                <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center mb-3" style={{ background: '#E8F8F0' }}>
                  <CheckCircle size={28} color="#27AE60" />
                </div>
                <p className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>{t('contact.sent')}</p>
                <p className="text-[#8E9BB3] text-center mt-1" style={{ fontSize: 13 }}>{t('contact.sent_desc')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  { key: 'name' as const, label: t('contact.name'), placeholder: t('contact.name_placeholder'), type: 'text' },
                  { key: 'email' as const, label: t('contact.email'), placeholder: t('contact.email_placeholder'), type: 'email' },
                  { key: 'subject' as const, label: t('contact.subject'), placeholder: t('contact.subject_placeholder'), type: 'text' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="text-[#4A5568] mb-1 block" style={{ fontSize: 12, fontWeight: 600 }}>{field.label}</label>
                    <input
                      type={field.type}
                      value={form[field.key]}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full h-[44px] rounded-[12px] px-3.5 text-[#1A1A2E] placeholder-[#C4CDD9] outline-none"
                      style={{ fontSize: 14, background: '#F4F7FC', border: '1.5px solid #E8F0FE' }}
                    />
                  </div>
                ))}
                <div>
                  <label className="text-[#4A5568] mb-1 block" style={{ fontSize: 12, fontWeight: 600 }}>{t('contact.message')}</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder={t('contact.message_placeholder')}
                    rows={4}
                    className="w-full rounded-[12px] px-3.5 py-3 text-[#1A1A2E] placeholder-[#C4CDD9] outline-none resize-none"
                    style={{ fontSize: 14, background: '#F4F7FC', border: '1.5px solid #E8F0FE' }}
                  />
                </div>
                <button
                  onClick={handleSend}
                  className="w-full h-[50px] rounded-[14px] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  style={{
                    background: form.name && form.email && form.message
                      ? 'linear-gradient(135deg, #FF5C00, #F5A623)'
                      : '#E0E5EC',
                    boxShadow: form.name && form.email && form.message
                      ? '0 8px 20px rgba(255,92,0,0.3)'
                      : 'none',
                  }}
                >
                  <Send size={18} color={form.name && form.email && form.message ? '#fff' : '#A0AEC0'} />
                  <span style={{ fontSize: 15, fontWeight: 700, color: form.name && form.email && form.message ? '#fff' : '#A0AEC0' }}>{t('common.send')}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center pt-5 pb-4 opacity-40">
          <SnorkeltjeLogo size="tiny" />
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { InstructorBottomNav } from '../components/layout/InstructorBottomNav';
import { Search, ChevronRight, Check, CheckCheck, Paperclip } from 'lucide-react';
import { useLanguage } from '../config/LanguageContext';

const conversations = [
  {
    id: 1,
    parentName: 'Ahmed Khilji',
    initial: 'A',
    studentName: 'Sami & Noor',
    lastMessage: 'Bedankt voor de feedback! We gaan thuis oefenen.',
    lastMessageEn: 'Thanks for the feedback! We will practice at home.',
    time: '14:32',
    unread: 2,
    online: true,
    gradient: 'linear-gradient(135deg, #0365C4, #00C1FF)',
    isFromMe: false,
  },
  {
    id: 2,
    parentName: 'Maria Bos',
    initial: 'M',
    studentName: 'Lisa',
    lastMessage: 'Lisa is volgende week op vakantie, kunnen we de les verplaatsen?',
    lastMessageEn: 'Lisa is on holiday next week, can we reschedule the lesson?',
    time: '13:15',
    unread: 1,
    online: false,
    gradient: 'linear-gradient(135deg, #27AE60, #2ECC71)',
    isFromMe: false,
  },
  {
    id: 3,
    parentName: 'Kees van Dijk',
    initial: 'K',
    studentName: 'Tim',
    lastMessage: 'Video van de oefeningen gestuurd',
    lastMessageEn: 'Sent video of the exercises',
    time: '11:40',
    unread: 0,
    online: true,
    gradient: 'linear-gradient(135deg, #9B59B6, #8E44AD)',
    isFromMe: true,
    hasAttachment: true,
  },
  {
    id: 4,
    parentName: 'Pieter Jansen',
    initial: 'P',
    studentName: 'Emma',
    lastMessage: 'Emma heeft echt geweldig gezwommen vandaag! Trots op haar.',
    lastMessageEn: 'Emma swam really great today! Proud of her.',
    time: 'Gisteren',
    unread: 0,
    online: false,
    gradient: 'linear-gradient(135deg, #E74C3C, #C0392B)',
    isFromMe: true,
  },
  {
    id: 5,
    parentName: 'Anna Bakker',
    initial: 'An',
    studentName: 'Daan',
    lastMessage: 'Daan is een beetje verkouden, hij komt wel maar misschien wat rustiger.',
    lastMessageEn: 'Daan has a slight cold, he will come but maybe a bit calmer.',
    time: 'Gisteren',
    unread: 0,
    online: false,
    gradient: 'linear-gradient(135deg, #F39C12, #E67E22)',
    isFromMe: false,
  },
  {
    id: 6,
    parentName: 'Jan de Wit',
    initial: 'J',
    studentName: 'Sophie',
    lastMessage: 'Super, we zien u maandag!',
    lastMessageEn: 'Great, see you Monday!',
    time: 'Ma',
    unread: 0,
    online: false,
    gradient: 'linear-gradient(135deg, #1ABC9C, #16A085)',
    isFromMe: false,
  },
];

export function InstructorChatListScreen() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [search, setSearch] = useState('');

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  const filtered = conversations.filter(c =>
    search === '' ||
    c.parentName.toLowerCase().includes(search.toLowerCase()) ||
    c.studentName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#0F1117] pb-28">
        {/* Header */}
        <div
          className="relative px-5 pt-[58px] pb-5 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1A1D27 0%, #252836 100%)' }}
        >
          <div className="absolute top-0 right-0 w-[180px] h-[180px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,193,255,0.06), transparent 70%)', transform: 'translate(30%, -30%)' }} />

          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-white" style={{ fontSize: 22, fontWeight: 700 }}>
                {lang === 'en' ? 'Messages' : 'Berichten'}
              </p>
              <p className="text-[#8E9BB3] mt-0.5" style={{ fontSize: 13 }}>
                {totalUnread > 0
                  ? `${totalUnread} ${lang === 'en' ? 'unread messages' : 'ongelezen berichten'}`
                  : lang === 'en' ? 'All caught up' : 'Alles bijgewerkt'
                }
              </p>
            </div>
            {totalUnread > 0 && (
              <div
                className="w-[36px] h-[36px] rounded-[12px] flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)', boxShadow: '0 4px 12px rgba(255,92,0,0.3)' }}
              >
                <span className="text-white" style={{ fontSize: 14, fontWeight: 700 }}>{totalUnread}</span>
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="px-5 -mt-2">
          <div
            className="rounded-[16px] h-[48px] flex items-center px-4 gap-3"
            style={{ background: '#1A1D27', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <Search size={18} color="#8E9BB3" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={lang === 'en' ? 'Search conversations...' : 'Zoek gesprekken...'}
              className="flex-1 bg-transparent text-[#E2E8F0] placeholder-[#4A5568] outline-none"
              style={{ fontSize: 14 }}
            />
          </div>
        </div>

        {/* Online parents quick access */}
        <div className="px-5 mt-4">
          <p className="text-[#8E9BB3] mb-2.5" style={{ fontSize: 11, fontWeight: 600 }}>
            {lang === 'en' ? 'ONLINE NOW' : 'NU ONLINE'}
          </p>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {conversations.filter(c => c.online).map(c => (
              <button
                key={c.id}
                onClick={() => navigate(`/instructor/chat/${c.id}`)}
                className="flex flex-col items-center flex-shrink-0"
              >
                <div className="relative">
                  <div
                    className="w-[48px] h-[48px] rounded-[14px] flex items-center justify-center"
                    style={{ background: c.gradient }}
                  >
                    <span className="text-white" style={{ fontSize: 18, fontWeight: 700 }}>{c.initial}</span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-[14px] h-[14px] rounded-full bg-[#27AE60] border-[2.5px] border-[#0F1117]" />
                </div>
                <span className="text-[#8E9BB3] mt-1.5" style={{ fontSize: 10, fontWeight: 500 }}>
                  {c.parentName.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Conversations */}
        <div className="px-5 mt-4">
          <p className="text-[#8E9BB3] mb-2.5" style={{ fontSize: 11, fontWeight: 600 }}>
            {lang === 'en' ? 'ALL CONVERSATIONS' : 'ALLE GESPREKKEN'}
          </p>
          <div className="space-y-1.5">
            {filtered.map(conv => (
              <button
                key={conv.id}
                onClick={() => navigate(`/instructor/chat/${conv.id}`)}
                className="w-full rounded-[16px] px-4 py-3.5 flex items-center gap-3 text-left transition-all active:scale-[0.98]"
                style={{
                  background: conv.unread > 0 ? 'rgba(255,92,0,0.06)' : '#1A1D27',
                  border: conv.unread > 0 ? '1px solid rgba(255,92,0,0.15)' : '1px solid transparent',
                }}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-[50px] h-[50px] rounded-[15px] flex items-center justify-center"
                    style={{ background: conv.gradient }}
                  >
                    <span className="text-white" style={{ fontSize: 18, fontWeight: 700 }}>{conv.initial}</span>
                  </div>
                  {conv.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-[14px] h-[14px] rounded-full bg-[#27AE60] border-[2.5px] border-[#0F1117]" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-[#E2E8F0]" style={{ fontSize: 14, fontWeight: conv.unread > 0 ? 700 : 500 }}>
                      {conv.parentName}
                    </p>
                    <span
                      className={conv.unread > 0 ? 'text-[#FF5C00]' : 'text-[#4A5568]'}
                      style={{ fontSize: 11, fontWeight: conv.unread > 0 ? 600 : 400 }}
                    >
                      {conv.time}
                    </span>
                  </div>
                  <p className="text-[#4A5568] mt-0.5" style={{ fontSize: 11 }}>
                    {conv.studentName}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {conv.isFromMe && (
                      <CheckCheck size={12} color={conv.unread === 0 ? '#0365C4' : '#4A5568'} />
                    )}
                    {conv.hasAttachment && (
                      <Paperclip size={10} color="#4A5568" />
                    )}
                    <p
                      className="truncate"
                      style={{
                        fontSize: 12,
                        color: conv.unread > 0 ? '#E2E8F0' : '#4A5568',
                        fontWeight: conv.unread > 0 ? 600 : 400,
                      }}
                    >
                      {lang === 'en' ? conv.lastMessageEn : conv.lastMessage}
                    </p>
                  </div>
                </div>

                {/* Unread badge */}
                {conv.unread > 0 && (
                  <div
                    className="w-[24px] h-[24px] rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #FF5C00, #F5A623)', boxShadow: '0 2px 8px rgba(255,92,0,0.3)' }}
                  >
                    <span className="text-white" style={{ fontSize: 11, fontWeight: 700 }}>{conv.unread}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      <InstructorBottomNav />
    </MobileFrame>
  );
}

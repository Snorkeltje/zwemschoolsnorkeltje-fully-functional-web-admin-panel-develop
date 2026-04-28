import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { InstructorBottomNav } from '../components/layout/InstructorBottomNav';
import { ChevronLeft, Send, Paperclip, Image, Smile, Phone, MoreVertical, CheckCheck, ArrowUp } from 'lucide-react';
import { useLanguage } from '../config/LanguageContext';

interface Message {
  id: number;
  from: 'parent' | 'instructor';
  text: string;
  time: string;
  read: boolean;
}

const initialMessages: Message[] = [
  { id: 1, from: 'parent', text: 'Hoi Jan! Hoe ging de les vandaag met Sami?', time: '14:20', read: true },
  { id: 2, from: 'instructor', text: 'Hoi Ahmed! Het ging echt heel goed vandaag. Sami heeft voor het eerst 10 meter vrije slag zonder stoppen gezwommen! 🎉', time: '14:22', read: true },
  { id: 3, from: 'parent', text: 'Wauw, wat geweldig! Daar zijn we echt blij mee!', time: '14:24', read: true },
  { id: 4, from: 'instructor', text: 'Ja, hij doet het echt fantastisch. Zijn ademhaling wordt steeds beter. Ik stuur zo de thuisoefeningen door.', time: '14:26', read: true },
  { id: 5, from: 'instructor', text: 'Tip voor thuis: laat Sami in bad oefenen met blazen in het water. 3x per dag 10 keer. Dit helpt enorm met de ademhaling.', time: '14:28', read: true },
  { id: 6, from: 'parent', text: 'Bedankt voor de feedback! We gaan thuis oefenen. Tot maandag! 👍', time: '14:32', read: true },
];

export function InstructorChatScreen() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [showActions, setShowActions] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: messages.length + 1,
      from: 'instructor',
      text: input,
      time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    setMessages([...messages, newMsg]);
    setInput('');
  };

  const quickReplies = lang === 'en'
    ? ['Great progress today!', 'See you next lesson!', 'Practice at home please', 'Lesson rescheduled ✓']
    : ['Goede voortgang vandaag!', 'Tot de volgende les!', 'Thuis oefenen a.u.b.', 'Les verplaatst ✓'];

  return (
    <MobileFrame>
      <div className="h-full flex flex-col bg-[#0F1117]">
        {/* Header */}
        <div
          className="px-5 pt-[54px] pb-3 flex items-center gap-3 relative z-10"
          style={{ background: 'linear-gradient(135deg, #1A1D27, #252836)', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}
        >
          <button
            onClick={() => navigate('/instructor/messages')}
            className="w-[38px] h-[38px] rounded-[12px] flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <ChevronLeft size={20} color="#E2E8F0" />
          </button>
          <div
            className="w-[42px] h-[42px] rounded-[13px] flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)' }}
          >
            <span className="text-white" style={{ fontSize: 17, fontWeight: 700 }}>A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[#E2E8F0]" style={{ fontSize: 15, fontWeight: 700 }}>Ahmed Khilji</p>
            <div className="flex items-center gap-1.5">
              <div className="w-[7px] h-[7px] rounded-full bg-[#27AE60]" />
              <span className="text-[#27AE60]" style={{ fontSize: 11 }}>Online</span>
              <span className="text-[#4A5568]" style={{ fontSize: 11 }}>· Sami & Noor</span>
            </div>
          </div>
          <button className="w-[38px] h-[38px] rounded-[12px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <Phone size={18} color="#E2E8F0" />
          </button>
          <button className="w-[38px] h-[38px] rounded-[12px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <MoreVertical size={18} color="#E2E8F0" />
          </button>
        </div>

        {/* Messages area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ paddingBottom: 180 }}>
          {/* Date separator */}
          <div className="flex justify-center mb-2">
            <span className="bg-[#1A1D27] text-[#8E9BB3] rounded-full px-4 py-1" style={{ fontSize: 11 }}>
              {lang === 'en' ? 'Today' : 'Vandaag'}
            </span>
          </div>

          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.from === 'instructor' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="max-w-[80%] rounded-[18px] px-4 py-3 relative"
                style={{
                  background: msg.from === 'instructor'
                    ? 'linear-gradient(135deg, #FF5C00, #F5A623)'
                    : '#1A1D27',
                  borderBottomRightRadius: msg.from === 'instructor' ? 6 : 18,
                  borderBottomLeftRadius: msg.from === 'parent' ? 6 : 18,
                  boxShadow: msg.from === 'instructor'
                    ? '0 4px 12px rgba(255,92,0,0.2)'
                    : '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                <p className="text-white" style={{ fontSize: 13, lineHeight: 1.5 }}>{msg.text}</p>
                <div className={`flex items-center gap-1 mt-1 ${msg.from === 'instructor' ? 'justify-end' : 'justify-start'}`}>
                  <span style={{ fontSize: 10, color: msg.from === 'instructor' ? 'rgba(255,255,255,0.6)' : '#4A5568' }}>
                    {msg.time}
                  </span>
                  {msg.from === 'instructor' && (
                    <CheckCheck size={12} color={msg.read ? '#00C1FF' : 'rgba(255,255,255,0.4)'} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick replies */}
        <div className="absolute bottom-[152px] left-0 right-0 px-5">
          <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {quickReplies.map(reply => (
              <button
                key={reply}
                onClick={() => setInput(reply)}
                className="flex-shrink-0 rounded-full px-3.5 py-2 transition-all active:scale-95"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span className="text-[#8E9BB3]" style={{ fontSize: 11, fontWeight: 500 }}>{reply}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input area */}
        <div
          className="absolute bottom-[82px] left-0 right-0 px-5 py-3"
          style={{ background: 'linear-gradient(180deg, transparent, #0F1117 20%)', paddingTop: 20 }}
        >
          <div
            className="rounded-[20px] flex items-end gap-2 p-1.5 pl-4"
            style={{ background: '#1A1D27', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <button onClick={() => setShowActions(!showActions)} className="pb-2.5">
              <Paperclip size={20} color="#4A5568" />
            </button>
            <div className="flex-1 py-2">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
                placeholder={lang === 'en' ? 'Type a message...' : 'Typ een bericht...'}
                rows={1}
                className="w-full bg-transparent text-[#E2E8F0] placeholder-[#4A5568] outline-none resize-none"
                style={{ fontSize: 14, maxHeight: 80 }}
              />
            </div>
            <button
              onClick={sendMessage}
              className="w-[40px] h-[40px] rounded-[14px] flex items-center justify-center flex-shrink-0 transition-all active:scale-90"
              style={{
                background: input.trim()
                  ? 'linear-gradient(135deg, #FF5C00, #F5A623)'
                  : 'rgba(255,255,255,0.06)',
                boxShadow: input.trim() ? '0 4px 12px rgba(255,92,0,0.3)' : 'none',
              }}
            >
              <ArrowUp size={20} color={input.trim() ? '#fff' : '#4A5568'} />
            </button>
          </div>
        </div>

        <InstructorBottomNav />
      </div>
    </MobileFrame>
  );
}

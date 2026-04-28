import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';

const messages = [
  { id: 1, from: 'instructor', text: 'Hoi! Sami deed het vandaag erg goed. De ademhaling verbetert', time: '14:30' },
  { id: 2, from: 'parent', text: 'Dat is fijn! Moeten we daar volgende week ook op focussen?', time: '14:32' },
  { id: 3, from: 'instructor', text: 'Ja, ook de thuisoefeningen die ik stuurde helpen hierbij.', time: '14:33' },
  { id: 4, from: 'parent', text: 'Perfect, we gaan zeker oefenen! Bedankt!', time: '14:35' },
  { id: 5, from: 'instructor', text: 'Tot maandag om 15:00 🏊', time: '14:36' },
];

export function ChatScreen() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  return (
    <MobileFrame>
      <div className="h-full flex flex-col bg-[#F4F7FC]">
        {/* Header */}
        <div className="bg-white px-5 pt-14 pb-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-[#131827]" style={{ fontSize: 22 }}>←</button>
          <div className="w-10 h-10 rounded-full bg-[#F0F4FC] flex items-center justify-center flex-shrink-0">
            <span className="text-[#0365C4]" style={{ fontSize: 18, fontWeight: 700 }}>J</span>
          </div>
          <div>
            <p className="text-[#131827]" style={{ fontSize: 15, fontWeight: 700 }}>Jan de Vries</p>
            <p className="text-[#18BB68]" style={{ fontSize: 12 }}>Instructeur · Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.from === 'parent' ? 'items-end' : 'items-start'}`}>
              <div
                className={`max-w-[70%] rounded-[14px] px-4 py-3 ${
                  msg.from === 'parent' ? 'bg-[#0365C4] text-white' : 'bg-white text-[#131827]'
                }`}
              >
                <p style={{ fontSize: 12 }}>{msg.text}</p>
              </div>
              <p className={`mt-1 ${msg.from === 'parent' ? 'text-[#B2D9FF]' : 'text-[#818EA6]'}`} style={{ fontSize: 10 }}>
                {msg.time}
              </p>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white px-5 py-3 flex items-center gap-3">
          <div className="flex-1 h-[44px] bg-[#F0F4FC] rounded-full px-4 flex items-center">
            <input
              placeholder="Typ een bericht..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-transparent text-[#131827] placeholder-[#818EA6] focus:outline-none"
              style={{ fontSize: 14 }}
            />
          </div>
          <button className="w-[44px] h-[44px] rounded-full bg-[#0365C4] flex items-center justify-center flex-shrink-0">
            <span className="text-white" style={{ fontSize: 20, fontWeight: 700 }}>→</span>
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}

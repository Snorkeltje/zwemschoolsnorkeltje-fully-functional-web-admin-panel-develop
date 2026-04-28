import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';

const chats = [
  { initial: 'J', name: 'Jan de Vries', role: 'Uw Instructeur', msg: 'See you Monday at 15:00 🏊', time: '14:33', unread: 2, color: '#1A6FBF', bg: '#E8F4FD' },
  { initial: 'M', name: 'Maria Jansen', role: 'Extra Les Instructeur', msg: 'Great session today! Sami really...', time: 'Gisteren', unread: 0, color: '#27AE60', bg: '#E8F7ED' },
  { initial: 'S', name: 'Snorkeltje Admin', role: 'Schooladministratie', msg: 'Uw knipkaart verloopt over 30 dagen.', time: '2d', unread: 1, color: '#F5A623', bg: '#FEF3DB' },
];

export function ChatListScreen() {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F8F9FA] pb-24">
        {/* Header */}
        <div className="bg-white px-5 pt-14 pb-3 flex items-center justify-between">
          <div style={{ width: 22 }} />
          <p className="text-[#1A1A2E]" style={{ fontSize: 18, fontWeight: 700 }}>Berichten</p>
          <span className="text-[#1A6FBF]" style={{ fontSize: 20 }}>✏️</span>
        </div>

        <div className="px-5 pt-2 space-y-0">
          {chats.map((chat, i) => (
            <div key={i}>
              <button
                onClick={() => navigate('/chat')}
                className="w-full bg-white rounded-[10px] px-4 py-3 flex items-start gap-3 text-left"
              >
                <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: chat.bg }}>
                  <span style={{ fontSize: 22, fontWeight: 700, color: chat.color }}>{chat.initial}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{chat.name}</p>
                    <span className="text-[#8E8EA0] flex-shrink-0" style={{ fontSize: 11 }}>{chat.time}</span>
                  </div>
                  <p className="text-[#8E8EA0]" style={{ fontSize: 11 }}>{chat.role}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-[#4A4A6A] truncate" style={{ fontSize: 12 }}>{chat.msg}</p>
                    {chat.unread > 0 && (
                      <div className="w-[22px] h-[22px] rounded-full bg-[#1A6FBF] flex items-center justify-center flex-shrink-0 ml-2">
                        <span className="text-white" style={{ fontSize: 11, fontWeight: 700 }}>{chat.unread}</span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
              {i < chats.length - 1 && <div className="h-px bg-[#E5E7EB] mx-4" />}
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}

import { useState } from 'react';
import { AdminView } from './AdminLayout';
import { Plus, Search, Users, Calendar, MoreHorizontal, Send, MessageSquare } from 'lucide-react';

const Card = ({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div className={`bg-white rounded-xl ${className}`} style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.04)', border: '1px solid #E8ECF4', ...style }}>{children}</div>
);

const PageHeader = ({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
    <div><h1 className="text-[#1A1A2E]" style={{ fontSize: 22, fontWeight: 700 }}>{title}</h1>{subtitle && <p className="text-[#6B7B94] mt-0.5" style={{ fontSize: 13 }}>{subtitle}</p>}</div>
    {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
  </div>
);

interface MessagesViewProps {
  goTo: (v: AdminView) => void;
  showToast: (msg: string) => void;
  setSelectedCustomer: (c: any) => void;
}

const conversations = [
  { name: 'Walter Van de Geest', role: 'Ouder', lastMsg: 'Bedankt! Tot dinsdag dan.', time: '09:15', unread: 0, avatar: 'WG' },
  { name: 'Jan De Vries', role: 'Ouder', lastMsg: 'Kunnen we de les verzetten naar woensdag?', time: '08:30', unread: 2, avatar: 'JV' },
  { name: 'Marleen Bakker', role: 'Ouder', lastMsg: 'Noah is ziek, we annuleren vandaag', time: 'Gisteren', unread: 1, avatar: 'MB' },
  { name: 'Maaike van Dijk', role: 'Instructeur', lastMsg: 'Rooster voor volgende week klopt!', time: 'Gisteren', unread: 0, avatar: 'MD' },
  { name: 'Pieter Jansen', role: 'Ouder', lastMsg: 'Hoe gaat het met Sophie haar voortgang?', time: '23-03', unread: 3, avatar: 'PJ' },
  { name: 'Lisa Visser', role: 'Ouder', lastMsg: 'Daan heeft zijn diploma A gehaald!', time: '22-03', unread: 0, avatar: 'LV' },
  { name: 'Robert Smit', role: 'Ouder', lastMsg: 'De betaling is gedaan via iDEAL', time: '21-03', unread: 0, avatar: 'RS' },
  { name: 'Anke Bos', role: 'Ouder', lastMsg: 'Wanneer begint survival training?', time: '20-03', unread: 1, avatar: 'AB' },
  { name: 'Jeroen Peters', role: 'Instructeur', lastMsg: 'Ik ben volgende week ma-do beschikbaar', time: '19-03', unread: 0, avatar: 'JP' },
];

const chatMessages: Record<string, { from: string; text: string; time: string; isAdmin: boolean }[]> = {
  'Walter Van de Geest': [
    { from: 'Walter', text: 'Hallo! Hoe gaat het met Liam zijn zwemles voortgang?', time: '09:00', isAdmin: false },
    { from: 'Admin', text: 'Hoi Walter! Liam doet het heel goed. Hij is nu bezig met Level 2 - Drijven. Bijna klaar met de drijfoefeningen!', time: '09:05', isAdmin: true },
    { from: 'Walter', text: 'Geweldig! Wanneer denk je dat hij klaar is voor Level 3?', time: '09:08', isAdmin: false },
    { from: 'Admin', text: 'Op dit tempo nog ongeveer 3-4 lessen. Ik raad aan om een extra les per week te overwegen om sneller vooruit te gaan.', time: '09:10', isAdmin: true },
    { from: 'Walter', text: 'Dat is een goed idee. Kunnen we een extra les op donderdag inplannen?', time: '09:12', isAdmin: false },
    { from: 'Admin', text: 'Ja! Er is ruimte op donderdag 10:00 in Nijkerk. Zal ik een reservering aanmaken?', time: '09:13', isAdmin: true },
    { from: 'Walter', text: 'Bedankt! Tot dinsdag dan.', time: '09:15', isAdmin: false },
  ],
  'Jan De Vries': [
    { from: 'Jan', text: 'Hallo, Emma heeft woensdag een schooluitje. Kunnen we de les verzetten?', time: '08:20', isAdmin: false },
    { from: 'Jan', text: 'Kunnen we de les verzetten naar woensdag?', time: '08:30', isAdmin: false },
  ],
  'Marleen Bakker': [
    { from: 'Marleen', text: 'Noah is ziek, we annuleren vandaag', time: 'Gisteren 16:30', isAdmin: false },
  ],
};

export function MessagesView({ goTo, showToast }: MessagesViewProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>('Walter Van de Geest');
  const [messageInput, setMessageInput] = useState('');

  const totalUnread = conversations.reduce((s, c) => s + c.unread, 0);
  const currentChat = conversations.find(c => c.name === selectedChat);
  const currentMessages = selectedChat ? (chatMessages[selectedChat] || []) : [];

  return (
    <>
      <PageHeader title="Berichten" subtitle={`${conversations.length} gesprekken • ${totalUnread} ongelezen`} actions={
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white" style={{ background: '#0365C4', fontSize: 13, fontWeight: 600 }}><Plus size={15} /> Nieuw bericht</button>
      } />
      <Card className="overflow-hidden" style={{ height: 'calc(100vh - 220px)', minHeight: 500 }}>
        <div className="flex h-full">
          <div className="w-[320px] border-r border-[#E8ECF4] flex flex-col flex-shrink-0">
            <div className="p-3 border-b border-[#F0F4FA]">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]" />
                <input placeholder="Zoek gesprek..." className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#F4F7FC] border border-transparent outline-none text-[#1A1A2E]" style={{ fontSize: 13 }} />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map(c => (
                <button key={c.name} onClick={() => setSelectedChat(c.name)}
                  className={`w-full text-left px-4 py-3 border-b border-[#F0F4FA] transition-colors flex items-start gap-3 ${selectedChat === c.name ? 'bg-[#0365C4]/5 border-l-2 border-l-[#0365C4]' : 'hover:bg-[#F8FAFC]'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white ${c.role === 'Instructeur' ? 'bg-gradient-to-br from-[#27AE60] to-[#2ECC71]' : 'bg-gradient-to-br from-[#0365C4] to-[#00C1FF]'}`} style={{ fontSize: 12, fontWeight: 700 }}>{c.avatar}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[#1A1A2E] truncate" style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</p>
                      <span className="text-[#A0AEC0] flex-shrink-0" style={{ fontSize: 10 }}>{c.time}</span>
                    </div>
                    <p className="text-[#A0AEC0] truncate" style={{ fontSize: 11 }}>{c.role}</p>
                    <p className="text-[#6B7B94] truncate mt-0.5" style={{ fontSize: 12 }}>{c.lastMsg}</p>
                  </div>
                  {c.unread > 0 && <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FF5C00] text-white flex items-center justify-center" style={{ fontSize: 10, fontWeight: 700 }}>{c.unread}</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            {selectedChat && currentChat ? (
              <>
                <div className="px-5 py-3 border-b border-[#E8ECF4] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${currentChat.role === 'Instructeur' ? 'bg-gradient-to-br from-[#27AE60] to-[#2ECC71]' : 'bg-gradient-to-br from-[#0365C4] to-[#00C1FF]'}`} style={{ fontSize: 12, fontWeight: 700 }}>{currentChat.avatar}</div>
                    <div>
                      <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{currentChat.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[#6B7B94]" style={{ fontSize: 11 }}>{currentChat.role}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        <span className="text-[#27AE60]" style={{ fontSize: 11 }}>Online</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => goTo('customer-detail')} className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"><Users size={16} /></button>
                    <button onClick={() => goTo('reservation-new')} className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"><Calendar size={16} /></button>
                    <button className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"><MoreHorizontal size={16} /></button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ background: '#FAFBFD' }}>
                  <div className="text-center"><span className="text-[#A0AEC0] px-3 py-1 rounded-full bg-white" style={{ fontSize: 11 }}>Vandaag</span></div>
                  {currentMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.isAdmin ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${msg.isAdmin ? 'bg-[#0365C4] text-white rounded-br-sm' : 'bg-white text-[#1A1A2E] rounded-bl-sm shadow-sm'}`} style={{ border: msg.isAdmin ? 'none' : '1px solid #F0F4FA' }}>
                        <p style={{ fontSize: 13 }}>{msg.text}</p>
                        <p className={`mt-1 ${msg.isAdmin ? 'text-white/60' : 'text-[#A0AEC0]'}`} style={{ fontSize: 10 }}>{msg.time} {msg.isAdmin && '\u2713\u2713'}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-5 py-3 border-t border-[#E8ECF4] bg-white">
                  <div className="flex items-end gap-2">
                    <button className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]"><Plus size={18} /></button>
                    <div className="flex-1">
                      <textarea value={messageInput} onChange={e => setMessageInput(e.target.value)} placeholder="Typ een bericht..." rows={1}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F4F7FC] border border-transparent outline-none focus:border-[#0365C4] text-[#1A1A2E] resize-none" style={{ fontSize: 14 }}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (messageInput.trim()) { showToast('Bericht verzonden!'); setMessageInput(''); } } }}
                      />
                    </div>
                    <button onClick={() => { if (messageInput.trim()) { showToast('Bericht verzonden!'); setMessageInput(''); } }}
                      className={`p-2.5 rounded-xl text-white transition-all ${messageInput.trim() ? 'bg-[#0365C4] hover:bg-[#024ea0]' : 'bg-[#C0C8D4]'}`}>
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare size={48} color="#C0C8D4" className="mx-auto mb-3" />
                  <p className="text-[#6B7B94]" style={{ fontSize: 16, fontWeight: 600 }}>Selecteer een gesprek</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}

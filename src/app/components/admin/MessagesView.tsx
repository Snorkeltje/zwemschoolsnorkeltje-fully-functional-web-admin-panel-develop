import { useEffect, useMemo, useRef, useState } from 'react';
import { AdminView } from './AdminLayout';
import { Search, Users, Calendar as CalIcon, Send, MessageSquare, RefreshCw } from 'lucide-react';
import { fetchAdminConversations, fetchConversationMessages, sendAdminMessage } from '../../../lib/data/admin-repository';
import type { AdminConversation, AdminMessage } from '../../../lib/data/admin-repository';
import { supabase } from '../../../lib/supabase';

const Card = ({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div className={`bg-white rounded-xl ${className}`} style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.04)', border: '1px solid #E8ECF4', ...style }}>{children}</div>
);

const PageHeader = ({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
    <div>
      <h1 className="text-[#1A1A2E]" style={{ fontSize: 22, fontWeight: 700 }}>{title}</h1>
      {subtitle && <p className="text-[#6B7B94] mt-0.5" style={{ fontSize: 13 }}>{subtitle}</p>}
    </div>
    {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
  </div>
);

interface MessagesViewProps {
  goTo: (v: AdminView) => void;
  showToast: (msg: string) => void;
  setSelectedCustomer: (c: unknown) => void;
}

const initials = (name: string) =>
  name.split(/\s+/).map(n => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();

const fmtTime = (iso: string | null): string => {
  if (!iso) return '';
  const d = new Date(iso);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay) return d.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
  const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return 'Gisteren';
  return d.toLocaleDateString('nl-NL', { day: '2-digit', month: 'short' });
};

export function MessagesView({ showToast }: MessagesViewProps) {
  const [conversations, setConversations] = useState<AdminConversation[]>([]);
  const [convsLoading, setConvsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [msgsLoading, setMsgsLoading] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [search, setSearch] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const loadConvs = async () => {
    setConvsLoading(true);
    const c = await fetchAdminConversations();
    setConversations(c);
    setConvsLoading(false);
    if (!selectedId && c.length > 0) setSelectedId(c[0].id);
  };

  useEffect(() => {
    loadConvs();
    // Realtime: refresh conversations when new message arrives
    const channel = supabase.channel('admin-messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, () => {
        loadConvs();
        if (selectedId) loadMessages(selectedId);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMessages = async (convId: string) => {
    setMsgsLoading(true);
    const m = await fetchConversationMessages(convId);
    setMessages(m);
    setMsgsLoading(false);
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    });
  };

  useEffect(() => {
    if (selectedId) loadMessages(selectedId);
  }, [selectedId]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return conversations;
    return conversations.filter(c =>
      c.participantName.toLowerCase().includes(q) ||
      (c.lastMessage ?? '').toLowerCase().includes(q));
  }, [conversations, search]);

  const totalUnread = conversations.reduce((s, c) => s + c.unreadCount, 0);
  const currentChat = conversations.find(c => c.id === selectedId) ?? null;

  const onSend = async () => {
    if (!selectedId || !messageInput.trim() || sending) return;
    setSending(true);
    const r = await sendAdminMessage(selectedId, messageInput.trim());
    setSending(false);
    if (!r.ok) {
      showToast(`❌ Niet verzonden: ${r.error}`);
      return;
    }
    setMessageInput('');
    await loadMessages(selectedId);
    await loadConvs();
  };

  return (
    <>
      <PageHeader
        title="Berichten met ouders"
        subtitle={convsLoading
          ? 'Laden…'
          : `${conversations.length} ${conversations.length === 1 ? 'gesprek' : 'gesprekken'} · ${totalUnread} ongelezen`}
        actions={
          <button onClick={loadConvs} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#6B7B94] bg-white border border-[#E8ECF4]" style={{ fontSize: 13, fontWeight: 600 }}>
            <RefreshCw size={15} /> Vernieuwen
          </button>
        }
      />
      <Card className="overflow-hidden" style={{ height: 'calc(100vh - 220px)', minHeight: 500 }}>
        <div className="flex h-full">
          {/* Conversation list */}
          <div className="w-[320px] border-r border-[#E8ECF4] flex flex-col flex-shrink-0">
            <div className="p-3 border-b border-[#F0F4FA]">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]" />
                <input
                  placeholder="Zoek gesprek…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#F4F7FC] border border-transparent outline-none text-[#1A1A2E]"
                  style={{ fontSize: 13 }}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {convsLoading ? (
                <div className="p-6 text-center text-[#A0AEC0]" style={{ fontSize: 12 }}>Laden…</div>
              ) : filtered.length === 0 ? (
                <div className="p-6 text-center">
                  <MessageSquare size={28} className="mx-auto mb-2 text-[#C4CDD9]" />
                  <p className="text-[#A0AEC0]" style={{ fontSize: 12 }}>{search ? 'Geen resultaten' : 'Nog geen gesprekken'}</p>
                </div>
              ) : (
                filtered.map(c => {
                  const isSel = selectedId === c.id;
                  const isInstr = c.participantRole === 'instructor';
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedId(c.id)}
                      className={`w-full text-left px-4 py-3 border-b border-[#F0F4FA] transition-colors flex items-start gap-3 ${isSel ? 'bg-[#0365C4]/5 border-l-2 border-l-[#0365C4]' : 'hover:bg-[#F8FAFC]'}`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white ${isInstr ? 'bg-gradient-to-br from-[#27AE60] to-[#2ECC71]' : 'bg-gradient-to-br from-[#0365C4] to-[#00C1FF]'}`} style={{ fontSize: 12, fontWeight: 700 }}>
                        {initials(c.participantName)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-[#1A1A2E] truncate" style={{ fontSize: 13, fontWeight: 600 }}>{c.participantName}</p>
                          <span className="text-[#A0AEC0] flex-shrink-0 ml-2" style={{ fontSize: 10 }}>{fmtTime(c.lastMessageAt)}</span>
                        </div>
                        <p className="text-[#A0AEC0] truncate" style={{ fontSize: 11 }}>{isInstr ? 'Instructeur' : 'Ouder'}</p>
                        <p className="text-[#6B7B94] truncate mt-0.5" style={{ fontSize: 12 }}>{c.lastMessage || <span className="italic text-[#C4CDD9]">Geen berichten</span>}</p>
                      </div>
                      {c.unreadCount > 0 && (
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FF5C00] text-white flex items-center justify-center" style={{ fontSize: 10, fontWeight: 700 }}>
                          {c.unreadCount}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Chat panel */}
          <div className="flex-1 flex flex-col">
            {currentChat ? (
              <>
                <div className="px-5 py-3 border-b border-[#E8ECF4] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${currentChat.participantRole === 'instructor' ? 'bg-gradient-to-br from-[#27AE60] to-[#2ECC71]' : 'bg-gradient-to-br from-[#0365C4] to-[#00C1FF]'}`} style={{ fontSize: 12, fontWeight: 700 }}>
                      {initials(currentChat.participantName)}
                    </div>
                    <div>
                      <p className="text-[#1A1A2E]" style={{ fontSize: 14, fontWeight: 700 }}>{currentChat.participantName}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[#6B7B94]" style={{ fontSize: 11 }}>{currentChat.participantRole === 'instructor' ? 'Instructeur' : 'Ouder'}</span>
                        {currentChat.subject && <span className="text-[#A0AEC0]" style={{ fontSize: 11 }}>· {currentChat.subject}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => showToast('Klant-profiel link komt snel')} className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]" title="Open klant-profiel">
                      <Users size={16} />
                    </button>
                    <button onClick={() => showToast('Reservering link komt snel')} className="p-2 rounded-lg hover:bg-[#F4F7FC] text-[#6B7B94]" title="Maak reservering">
                      <CalIcon size={16} />
                    </button>
                  </div>
                </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ background: '#FAFBFD' }}>
                  {msgsLoading ? (
                    <div className="text-center py-12 text-[#A0AEC0]" style={{ fontSize: 12 }}>Berichten laden…</div>
                  ) : messages.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageSquare size={32} className="mx-auto mb-2 text-[#C4CDD9]" />
                      <p className="text-[#A0AEC0]" style={{ fontSize: 12 }}>Nog geen berichten in dit gesprek</p>
                      <p className="text-[#A0AEC0] mt-1" style={{ fontSize: 11 }}>Begin het gesprek hieronder</p>
                    </div>
                  ) : (
                    messages.map(m => (
                      <div key={m.id} className={`flex ${m.isAdmin ? 'justify-end' : 'justify-start'}`}>
                        <div
                          className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${m.isAdmin ? 'bg-[#0365C4] text-white rounded-br-sm' : 'bg-white text-[#1A1A2E] rounded-bl-sm shadow-sm'}`}
                          style={{ border: m.isAdmin ? 'none' : '1px solid #F0F4FA' }}
                        >
                          <p style={{ fontSize: 13, whiteSpace: 'pre-wrap' }}>{m.body}</p>
                          <p className={`mt-1 ${m.isAdmin ? 'text-white/60' : 'text-[#A0AEC0]'}`} style={{ fontSize: 10 }}>
                            {new Date(m.createdAt).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}
                            {m.isAdmin && ' ✓✓'}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="px-5 py-3 border-t border-[#E8ECF4] bg-white">
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <textarea
                        value={messageInput}
                        onChange={e => setMessageInput(e.target.value)}
                        placeholder="Typ een bericht…"
                        rows={1}
                        disabled={sending}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F4F7FC] border border-transparent outline-none focus:border-[#0365C4] text-[#1A1A2E] resize-none disabled:opacity-50"
                        style={{ fontSize: 14 }}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend(); } }}
                      />
                    </div>
                    <button
                      onClick={onSend}
                      disabled={sending || !messageInput.trim()}
                      className="p-2.5 rounded-xl text-white transition-all disabled:opacity-40"
                      style={{ background: messageInput.trim() && !sending ? '#0365C4' : '#C0C8D4' }}
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare size={48} color="#C0C8D4" className="mx-auto mb-3" />
                  <p className="text-[#6B7B94]" style={{ fontSize: 16, fontWeight: 600 }}>
                    {convsLoading ? 'Laden…' : conversations.length === 0 ? 'Nog geen gesprekken' : 'Selecteer een gesprek'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}

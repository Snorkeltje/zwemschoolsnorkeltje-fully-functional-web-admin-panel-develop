import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Smartphone, Globe, LayoutDashboard, Waves, ChevronRight, Code2, CheckCircle2, Zap, Shield, Clock, Server, Palette, Database, ArrowRight, Star, Award, Monitor, Tablet, Smartphone as PhoneIcon } from 'lucide-react';
import { SnorkeltjeLogo } from '../components/SnorkeltjeLogo';

export function PortalScreen() {
  const navigate = useNavigate();
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);

  const portals = [
    {
      phase: '1st',
      phaseLabel: 'Phase 1 — I will start develop this',
      title: 'iOS / Android / iPad Mobile APP Design Sample',
      subtitle: 'Complete swimming school mobile app with 71+ screens',
      icon: Smartphone,
      status: 'live' as const,
      gradient: 'linear-gradient(135deg, #0365C4 0%, #00C1FF 100%)',
      shadowColor: 'rgba(3,101,196,0.35)',
      phaseColor: '#0365C4',
      features: ['71+ Fully Functional Screens', 'Parent + Instructor Interfaces', 'Bilingual (NL/EN)', 'Offline Support'],
      onClick: () => navigate('/splash'),
    },
    {
      phase: '2nd',
      phaseLabel: 'Phase 2 — I will develop this',
      title: 'Website Design Sample',
      subtitle: 'Public website for zwemschoolsnorkeltje.nl',
      icon: Globe,
      status: 'live' as const,
      gradient: 'linear-gradient(135deg, #FF5C00 0%, #F5A623 100%)',
      shadowColor: 'rgba(255,92,0,0.35)',
      phaseColor: '#FF5C00',
      features: ['11 Professional Pages', 'SEO Optimized', 'Mobile Responsive', 'Online Inschrijving'],
      onClick: () => navigate('/website'),
    },
    {
      phase: '3rd',
      phaseLabel: 'Phase 3 — Final Phase I will develop',
      title: 'Admin Dashboard',
      subtitle: 'Complete platform management system at snorkeltje.nl/admin',
      icon: LayoutDashboard,
      status: 'live' as const,
      gradient: 'linear-gradient(135deg, #1A1A2E 0%, #2D2B55 100%)',
      shadowColor: 'rgba(26,26,46,0.35)',
      phaseColor: '#8E44AD',
      features: ['i-Reserve Style Calendar', 'Student Progress Tracking', 'Financial Reports', 'Full Business Rules'],
      onClick: () => navigate('/admin'),
    },
  ];

  const benefits = [
    { icon: Shield, title: 'No Third-Party Dependency', desc: 'No more i-Reserve, no monthly fees to external platforms. You OWN your software 100%.', color: '#27AE60' },
    { icon: Zap, title: 'All-in-One Solution', desc: 'Mobile App + Website + Admin — everything connected through one single database.', color: '#FF5C00' },
    { icon: Database, title: 'Your Data, Your Control', desc: 'All data stays in YOUR Supabase database. Same login works across all platforms.', color: '#0365C4' },
    { icon: Clock, title: 'Permanent Solution', desc: 'This is not a subscription — it is a permanent software system built specifically for you.', color: '#8E44AD' },
  ];

  const platforms = [
    { icon: PhoneIcon, label: 'iPhone', color: '#0365C4' },
    { icon: Smartphone, label: 'Android', color: '#27AE60' },
    { icon: Tablet, label: 'iPad', color: '#FF5C00' },
    { icon: Globe, label: 'Web App', color: '#00C1FF' },
    { icon: Monitor, label: 'Website', color: '#E67E22' },
    { icon: LayoutDashboard, label: 'Admin', color: '#8E44AD' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#F4F7FC' }}>
      {/* Background decorations */}
      <div className="absolute top-0 left-0 right-0 h-[500px]" style={{ background: 'linear-gradient(180deg, #0365C4 0%, #00C1FF 50%, transparent 100%)', opacity: 0.05 }} />
      <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,193,255,0.08), transparent 70%)' }} />
      <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,92,0,0.06), transparent 70%)' }} />
      
      {/* Floating wave decorations */}
      <div className="absolute top-[120px] right-[60px] opacity-[0.04]">
        <Waves size={120} color="#0365C4" />
      </div>
      <div className="absolute bottom-[80px] left-[40px] opacity-[0.04]">
        <Waves size={80} color="#FF5C00" />
      </div>

      <div className="relative z-10 max-w-[820px] mx-auto px-6 py-10">
        {/* ═══════ HEADER ═══════ */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-5">
            <SnorkeltjeLogo size="large" />
          </div>
          
          <p className="text-[#1A1A2E] mt-3" style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.6 }}>
            Overview sample of the complete Platform that we are going to Develop for you.
          </p>
          <p className="text-[#6B7B94] mt-2 max-w-[550px] mx-auto" style={{ fontSize: 13, lineHeight: 1.6 }}>
            Once you are satisfied with the complete design, I will start development. This is just a design and sample to show you what your complete system will look like after development.
          </p>
          
          {/* Client & Developer info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(3,101,196,0.06)', border: '1px solid rgba(3,101,196,0.1)' }}>
              <span className="text-[#0365C4]" style={{ fontSize: 12, fontWeight: 600 }}>
                Client: Walter Van De Geest
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(255,92,0,0.06)', border: '1px solid rgba(255,92,0,0.1)' }}>
              <Code2 size={13} color="#FF5C00" />
              <span className="text-[#FF5C00]" style={{ fontSize: 12, fontWeight: 600 }}>
                Your Software Engineer & Developer: Sami
              </span>
            </div>
          </div>
        </div>

        {/* ═══════ END-TO-END SOLUTION BANNER ═══════ */}
        <div className="mb-10 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #0365C4, #00C1FF)', boxShadow: '0 8px 32px rgba(3,101,196,0.25)' }}>
          <div className="px-6 sm:px-8 py-7">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Award size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-white mb-2" style={{ fontSize: 20, fontWeight: 800 }}>
                  End-to-End Software System Solution
                </h2>
                <p className="text-white" style={{ fontSize: 14, fontWeight: 600, opacity: 0.95 }}>
                  For your: <span className="underline">Zwemschool Snorkeltje</span>
                </p>
                <div className="h-px bg-white/15 my-4" />
                <p className="text-white/85" style={{ fontSize: 13, lineHeight: 1.7 }}>
                  Once I create this complete system, you will <strong style={{ color: '#FFD700' }}>not need any third party</strong> like i-Reserve.io or anything else. This will be a <strong style={{ color: '#FFD700' }}>permanent software solution</strong> that I will create for you, which includes:
                </p>
                
                {/* Platform icons */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-5">
                  {platforms.map(p => {
                    const Icon = p.icon;
                    return (
                      <div key={p.label} className="flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl bg-white/10 backdrop-blur-sm">
                        <Icon size={20} className="text-white" />
                        <span className="text-white/90" style={{ fontSize: 10, fontWeight: 600 }}>{p.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ DEVELOPMENT PHASES ═══════ */}
        <div className="mb-4">
          <p className="text-center text-[#6B7B94] mb-6" style={{ fontSize: 13, fontWeight: 600 }}>
            DEVELOPMENT ROADMAP — 3 PHASES
          </p>
        </div>

        <div className="flex flex-col gap-5 mb-10">
          {portals.map((portal, i) => {
            const Icon = portal.icon;
            const isLive = portal.status === 'live';
            const isHovered = hoveredPhase === i;
            
            return (
              <div key={i} className="relative">
                {/* Phase label */}
                <div className="flex items-center gap-3 mb-2.5 pl-1">
                  <span className="text-white px-3 py-1 rounded-lg" style={{ background: portal.phaseColor, fontSize: 12, fontWeight: 800 }}>
                    {portal.phase}
                  </span>
                  <span style={{ color: portal.phaseColor, fontSize: 13, fontWeight: 700 }}>
                    {portal.phaseLabel}
                  </span>
                </div>

                {/* Connector line */}
                {i < portals.length - 1 && (
                  <div className="absolute left-[22px] top-[calc(100%+2px)] w-0.5 h-5 z-0" style={{ background: `linear-gradient(to bottom, ${portal.phaseColor}40, ${portals[i+1].phaseColor}40)` }} />
                )}

                <button
                  onClick={portal.onClick}
                  disabled={!isLive}
                  className="w-full text-left rounded-[24px] p-[2px] transition-all group"
                  style={{
                    background: isLive ? portal.gradient : '#E2E8F0',
                    boxShadow: isHovered ? `0 12px 40px ${portal.shadowColor}` : `0 6px 24px ${portal.shadowColor}`,
                    cursor: isLive ? 'pointer' : 'default',
                    transform: isHovered ? 'scale(1.015)' : 'scale(1)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={() => setHoveredPhase(i)}
                  onMouseLeave={() => setHoveredPhase(null)}
                >
                  <div className="bg-white rounded-[22px] p-6 flex items-center gap-5">
                    {/* Icon */}
                    <div className="w-[64px] h-[64px] rounded-[18px] flex items-center justify-center flex-shrink-0" style={{ background: portal.gradient }}>
                      <Icon size={28} color="#fff" />
                    </div>
                    
                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#1A1A2E]" style={{ fontSize: 16, fontWeight: 700 }}>
                        {portal.title}
                      </h3>
                      <p className="text-[#6B7B94] mt-0.5" style={{ fontSize: 13 }}>
                        {portal.subtitle}
                      </p>
                      
                      {/* Feature chips - visible on hover/always on mobile */}
                      <div className={`flex flex-wrap gap-1.5 mt-2.5 transition-all ${isHovered ? 'opacity-100 max-h-[40px]' : 'opacity-0 max-h-0 sm:opacity-0 sm:max-h-0'} overflow-hidden`}
                        style={{ transition: 'all 0.3s ease' }}>
                        {portal.features.map(f => (
                          <span key={f} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F4F7FC] text-[#6B7B94]" style={{ fontSize: 10, fontWeight: 600 }}>
                            <CheckCircle2 size={9} color={portal.phaseColor} /> {f}
                          </span>
                        ))}
                      </div>
                      
                      {/* Status badge */}
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full" style={{ background: 'rgba(3,101,196,0.1)' }}>
                          <span className="w-[6px] h-[6px] rounded-full bg-[#0365C4]" />
                          <span className="text-[#0365C4]" style={{ fontSize: 11, fontWeight: 700 }}>Design Ready</span>
                        </span>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex-shrink-0">
                      <ChevronRight size={22} color="#A0AEC0" className={`transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* ═══════ WHY THIS IS BETTER ═══════ */}
        <div className="mb-10">
          <div className="text-center mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF5C00]/8 text-[#FF5C00]" style={{ fontSize: 12, fontWeight: 700 }}>
              WHY THIS SOLUTION?
            </span>
            <h3 className="text-[#1A1A2E] mt-3" style={{ fontSize: 20, fontWeight: 800 }}>
              What makes this different from i-Reserve
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map(b => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="bg-white rounded-2xl p-5 transition-all hover:translate-y-[-2px]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #F0F4FA' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${b.color}10` }}>
                    <Icon size={20} color={b.color} />
                  </div>
                  <h4 className="text-[#1A1A2E] mb-1.5" style={{ fontSize: 14, fontWeight: 700 }}>{b.title}</h4>
                  <p className="text-[#6B7B94]" style={{ fontSize: 12, lineHeight: 1.6 }}>{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══════ COMPARISON TABLE ═══════ */}
        <div className="mb-10 bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid #F0F4FA' }}>
          <div className="px-6 py-4" style={{ background: 'linear-gradient(135deg, #1A1A2E, #2D2B55)' }}>
            <h4 className="text-white" style={{ fontSize: 15, fontWeight: 700 }}>Quick Comparison</h4>
          </div>
          <div className="divide-y divide-[#F0F4FA]">
            {[
              { feature: 'Monthly subscription fees', ours: 'No — One-time investment', win: true },
              { feature: 'Custom mobile app (iOS/Android)', ours: 'Yes — 71+ screens', win: true },
              { feature: 'Custom branding & design', ours: 'Fully customized to your brand', win: true },
              { feature: 'Your own database', ours: 'Yes — your Supabase', win: true },
              { feature: 'Bilingual (NL/EN)', ours: 'Full — 250+ translation keys', win: true },
              { feature: 'Student progress tracking', ours: 'Yes — Level > Skill > Steps', win: true },
              { feature: 'Auto-conversion (1op1→1op2)', ours: 'Yes — with auto refund', win: true },
              { feature: 'Ownership', ours: 'YOU own it forever', win: true },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-2 gap-2 px-5 py-3 items-center">
                <span className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 600 }}>{row.feature}</span>
                <span className="text-[#27AE60] text-center flex items-center justify-center gap-1" style={{ fontSize: 12, fontWeight: 600 }}>
                  <CheckCircle2 size={12} /> {row.ours}
                </span>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-2 px-5 py-2.5 bg-[#F8FAFC]">
              <span className="text-[#A0AEC0]" style={{ fontSize: 11, fontWeight: 600 }}></span>
              <span className="text-[#27AE60] text-center" style={{ fontSize: 11, fontWeight: 700 }}>Your Custom Solution</span>
            </div>
          </div>
        </div>

        {/* ═══════ WHAT'S INCLUDED ═══════ */}
        <div className="mb-10 bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #F0F4FA' }}>
          <h4 className="text-[#1A1A2E] mb-4" style={{ fontSize: 16, fontWeight: 700 }}>Everything included in your system:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {[
              '14-day booking rule enforcement',
              'Auto-conversion 1-op-1 \u2192 1-op-2 with refunds',
              'Punch card system (\u20AC380/\u20AC190/\u20AC114)',
              'Student progress (Level \u2192 Skill \u2192 Steps)',
              'Cancellation policies (24h / 96h holiday)',
              'Bilingual support (NL \uD83C\uDDF3\uD83C\uDDF1 / EN \uD83C\uDDEC\uD83C\uDDE7)',
              '7 locations with individual settings',
              'Push notifications & email templates',
              'Stripe/Mollie payment integration ready',
              'Instructor interface (7 screens)',
              'Parent interface (64 screens)',
              'Admin dashboard with calendar & reports',
              'Waitlist management system',
              'Holiday lesson scheduling',
              'Offline mode support',
              'Branded login & onboarding flow',
            ].map(item => (
              <div key={item} className="flex items-start gap-2 py-1.5">
                <CheckCircle2 size={14} className="text-[#27AE60] flex-shrink-0 mt-0.5" />
                <span className="text-[#4A5568]" style={{ fontSize: 13 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ QUICK ACCESS ═══════ */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {portals.map((p, i) => {
            const Icon = p.icon;
            return (
              <button key={i} onClick={p.onClick} className="bg-white rounded-xl p-4 text-center transition-all hover:translate-y-[-2px]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #F0F4FA' }}>
                <div className="w-10 h-10 rounded-lg mx-auto flex items-center justify-center mb-2" style={{ background: p.gradient }}>
                  <Icon size={18} color="#fff" />
                </div>
                <p className="text-[#1A1A2E]" style={{ fontSize: 12, fontWeight: 700 }}>{p.phase === '1st' ? 'Open App' : p.phase === '2nd' ? 'Open Website' : 'Open Admin'}</p>
                <div className="flex items-center justify-center gap-1 mt-1 text-[#0365C4]">
                  <span style={{ fontSize: 11, fontWeight: 600 }}>View</span>
                  <ArrowRight size={11} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-[#A0AEC0]" style={{ fontSize: 12 }}>
            Zwemschool Snorkeltje — Complete Swimming School Platform Design Look Sample
          </p>
          <p className="text-[#C8D1DC] mt-1" style={{ fontSize: 11 }}>
            Built with React, TypeScript, Tailwind CSS & Supabase
          </p>
        </div>
      </div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </div>
  );
}
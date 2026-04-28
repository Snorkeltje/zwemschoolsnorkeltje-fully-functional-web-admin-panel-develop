import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/layout/MobileFrame';
import { CalendarCheck, BarChart3, MessageCircle } from 'lucide-react';

export function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  const slides = [
    {
      icon: CalendarCheck,
      iconBg: 'linear-gradient(135deg, #0365C4, #00C1FF)',
      decorColor: '#00C1FF',
      title: 'Boek lessen',
      titleHighlight: 'wanneer je wilt.',
      subtitle: 'Vaste tijdslots, extra lessen en vakantie-\nzwemlessen — alles op één plek.',
      color: '#0365C4',
      features: ['Vast tijdstip reserveren', 'Extra & inhaallessen', 'Vakantie-zwemles'],
    },
    {
      icon: BarChart3,
      iconBg: 'linear-gradient(135deg, #FF5C00, #F5A623)',
      decorColor: '#FF5C00',
      title: 'Volg de voortgang',
      titleHighlight: 'van uw kind.',
      subtitle: 'Zie vaardigheden, doelen en feedback\nna elke les van de instructeur.',
      color: '#FF5C00',
      features: ['Zwemniveau tracking', 'Skill-per-skill voortgang', 'Instructeur feedback'],
    },
    {
      icon: MessageCircle,
      iconBg: 'linear-gradient(135deg, #27AE60, #00C1FF)',
      decorColor: '#27AE60',
      title: 'Blijf verbonden',
      titleHighlight: 'met de instructeur.',
      subtitle: 'Chat, ontvang oefeningen voor thuis\nen volg elke stap van de ontwikkeling.',
      color: '#27AE60',
      features: ['Direct chatten', 'Thuisoefeningen', 'Push notificaties'],
    },
  ];
  
  const slide = slides[currentSlide];
  const Icon = slide.icon;
  
  const handleNext = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
    else navigate('/login');
  };
  
  return (
    <MobileFrame>
      <div className="h-full flex flex-col bg-white relative overflow-hidden">
        {/* Skip */}
        <div className="flex justify-end px-6 pt-[60px]">
          <button onClick={() => navigate('/login')} className="text-[#8E9BB3] px-3 py-1 rounded-full bg-[#F4F7FC]" style={{ fontSize: 13, fontWeight: 500 }}>
            Overslaan
          </button>
        </div>
        
        {/* Illustration */}
        <div className="relative flex-shrink-0 flex items-center justify-center" style={{ height: '38%' }}>
          {/* Decorative ring */}
          <div className="absolute w-[220px] h-[220px] rounded-full border-2 border-dashed" style={{ borderColor: `${slide.decorColor}20` }} />
          <div className="absolute w-[280px] h-[280px] rounded-full" style={{ background: `radial-gradient(circle, ${slide.decorColor}08, transparent 70%)` }} />
          
          {/* Main icon */}
          <div 
            className="w-[120px] h-[120px] rounded-[32px] flex items-center justify-center relative z-10"
            style={{ 
              background: slide.iconBg,
              boxShadow: `0 20px 40px ${slide.decorColor}30`,
            }}
          >
            <Icon size={56} strokeWidth={1.5} color="#ffffff" />
          </div>
          
          {/* Floating feature pills */}
          {slide.features.map((f, i) => {
            const positions = [
              { top: '15%', left: '8%', rotate: -5 },
              { top: '10%', right: '5%', rotate: 3 },
              { bottom: '20%', left: '12%', rotate: 2 },
            ];
            const pos = positions[i];
            return (
              <div 
                key={f} 
                className="absolute bg-white rounded-full px-3 py-1.5 z-10"
                style={{ 
                  ...pos, 
                  transform: `rotate(${pos.rotate}deg)`,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  fontSize: 11,
                  fontWeight: 600,
                  color: slide.color,
                }}
              >
                ✓ {f}
              </div>
            );
          })}
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col justify-between px-6 pb-10">
          <div>
            <h2 className="text-[#1A1A2E]" style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2 }}>
              {slide.title}
              <br />
              <span style={{ color: slide.color }}>{slide.titleHighlight}</span>
            </h2>
            <p className="text-[#6B7B94] mt-3" style={{ fontSize: 15, whiteSpace: 'pre-line', lineHeight: 1.6 }}>
              {slide.subtitle}
            </p>
          </div>
          
          <div>
            {/* Dots */}
            <div className="flex justify-center gap-2 mb-6">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: i === currentSlide ? 28 : 8,
                    height: 8,
                    backgroundColor: i === currentSlide ? slide.color : '#E5E7EB',
                    transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
              ))}
            </div>
            
            {/* Button */}
            <button
              onClick={handleNext}
              className="w-full h-[56px] rounded-[16px] text-white transition-all active:scale-[0.98]"
              style={{ 
                background: slide.iconBg,
                fontSize: 16,
                fontWeight: 700,
                boxShadow: `0 8px 24px ${slide.color}30`,
                letterSpacing: 0.3,
              }}
            >
              {currentSlide === slides.length - 1 ? 'Aan de slag! 🏊‍♂️' : 'Volgende →'}
            </button>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}

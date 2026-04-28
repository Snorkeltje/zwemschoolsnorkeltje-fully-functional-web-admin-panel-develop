interface BadgeProps {
  children: React.ReactNode;
  variant?: 'booked' | 'attended' | 'cancelled' | 'no-show' | 'pending' | 'lesson-type';
  color?: string;
  bgColor?: string;
  className?: string;
}

export function Badge({ children, variant, color, bgColor, className = '' }: BadgeProps) {
  const variants = {
    booked: 'bg-[#E8F4FD] text-[#0365C4]',
    attended: 'bg-[#E0F9EC] text-[#18BB68]',
    cancelled: 'bg-[#FEE5E5] text-[#F03838]',
    'no-show': 'bg-[#FFF4DA] text-[#FCAA00]',
    pending: 'bg-[#F0F0F0] text-[#818EA6]',
    'lesson-type': 'bg-[#0365C4] text-white',
  };
  
  const variantStyle = variant ? variants[variant] : '';
  const customStyle = color && bgColor ? `bg-[${bgColor}] text-[${color}]` : '';
  
  return (
    <span 
      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${variantStyle} ${customStyle} ${className}`}
      style={color && bgColor ? { backgroundColor: bgColor, color: color } : undefined}
    >
      {children}
    </span>
  );
}

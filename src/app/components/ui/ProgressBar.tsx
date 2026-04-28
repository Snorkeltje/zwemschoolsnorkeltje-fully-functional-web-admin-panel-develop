interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ 
  progress, 
  color = '#0365C4', 
  showLabel = false,
  className = '' 
}: ProgressBarProps) {
  const safeProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-[#818EA6]">Voortgang</span>
          <span className="text-xs font-semibold text-[#444D6B]">{safeProgress}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-[#DCE4F0] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${safeProgress}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

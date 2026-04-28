import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';
import { Header } from '../components/layout/Header';
import { Construction } from 'lucide-react';

interface PlaceholderScreenProps {
  title: string;
  showBottomNav?: boolean;
  theme?: 'light' | 'dark';
}

export function PlaceholderScreen({ title, showBottomNav = true, theme = 'light' }: PlaceholderScreenProps) {
  return (
    <MobileFrame theme={theme}>
      <div className="min-h-full pb-24">
        <Header title={title} showBack theme={theme} />
        
        <div className="flex flex-col items-center justify-center px-6 py-20">
          <div className={`w-20 h-20 rounded-full ${theme === 'dark' ? 'bg-[#2E3347]' : 'bg-[#EFF5FC]'} flex items-center justify-center mb-4`}>
            <Construction size={40} className={theme === 'dark' ? 'text-[#FF5C00]' : 'text-[#0365C4]'} />
          </div>
          <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#131827]'}`}>
            {title}
          </h2>
          <p className={`text-center ${theme === 'dark' ? 'text-[#818EA6]' : 'text-[#444D6B]'}`}>
            Dit scherm wordt binnenkort toegevoegd.
          </p>
        </div>
      </div>
      
      {showBottomNav && <BottomNav />}
    </MobileFrame>
  );
}

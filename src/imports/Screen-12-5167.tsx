import { img } from "./svg-l5dp6";

export default function Screen() {
  return (
    <div className="bg-white overflow-clip relative rounded-[44px] size-full" data-name="Screen">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[175px] not-italic text-[#44516b] text-[52px] top-[200px] whitespace-nowrap">👨‍🏫</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[330px] not-italic text-[#818ea6] text-[14px] top-[52px] whitespace-nowrap">Skip</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[30px] not-italic text-[#131826] text-[28px] top-[470px] whitespace-nowrap">Blijf verbonden</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[30px] not-italic text-[#18bb67] text-[28px] top-[504px] whitespace-nowrap">met de instructeur.</p>
      <div className="absolute font-['Inter:Regular',sans-serif] font-normal h-[50px] leading-[normal] left-[30px] not-italic text-[#44516b] text-[15px] top-[548px] w-[330px]">
        <p className="mb-0">Chat, ontvang oefeningen voor thuis</p>
        <p>en volg elke stap van de ontwikkeling.</p>
      </div>
      <div className="absolute contents left-0 top-0" data-name="Mask group">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[163px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-163px_-110px] mask-size-[390px_440px] not-italic text-[#18bb67] text-[64px] top-[110px] whitespace-nowrap" style={{ maskImage: `url('${img}')` }}>
          💬
        </p>
        <div className="absolute bg-[#dce4f0] left-[165px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-165px_-652px] mask-size-[390px_440px] rounded-[4px] size-[8px] top-[652px]" data-name="Rectangle" style={{ maskImage: `url('${img}')` }} />
        <div className="absolute bg-[#dce4f0] left-[185px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-185px_-652px] mask-size-[390px_440px] rounded-[4px] size-[8px] top-[652px]" data-name="Rectangle" style={{ maskImage: `url('${img}')` }} />
        <div className="absolute bg-[#18bb67] h-[8px] left-[205px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-205px_-652px] mask-size-[390px_440px] rounded-[4px] top-[652px] w-[32px]" data-name="Rectangle" style={{ maskImage: `url('${img}')` }} />
        <div className="absolute bg-[#18bb67] h-[52px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-24px_-682px] mask-size-[390px_440px] rounded-[14px] top-[682px] w-[342px]" data-name="Rectangle" style={{ maskImage: `url('${img}')` }} />
      </div>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[151px] not-italic text-[15px] text-white top-[698px] whitespace-nowrap">Aan de slag!</p>
    </div>
  );
}
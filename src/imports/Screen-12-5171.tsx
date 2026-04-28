import clsx from "clsx";
import { imgWiFi } from "./svg-r9s8v";
type MaskGroupEllipseProps = {
  additionalClassNames?: string;
};

function MaskGroupEllipse({ children, additionalClassNames = "" }: React.PropsWithChildren<MaskGroupEllipseProps>) {
  return (
    <div style={{ maskImage: `url('${imgWiFi}')` }} className={clsx("absolute left-[30px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[29.269px_11.213px] size-[44px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
        {children}
      </svg>
    </div>
  );
}

export default function Screen() {
  return (
    <div className="bg-[#f4f7fc] overflow-clip relative rounded-[44px] size-full" data-name="Screen">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[133px] not-italic text-[#131826] text-[18px] top-[64px] whitespace-nowrap">Boek een les</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[20px] not-italic text-[#818ea6] text-[14px] top-[116px] whitespace-nowrap">Welk type les?</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[38px] not-italic text-[#0365c4] text-[26px] top-[168px] whitespace-nowrap">⏰</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[86px] not-italic text-[#131826] text-[15px] top-[160px] whitespace-nowrap">Vast tijdstip</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[86px] not-italic text-[#44516b] text-[12px] top-[182px] whitespace-nowrap">Uw vaste wekelijkse zwemles.</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[346px] not-italic text-[#0365c4] text-[20px] top-[172px] whitespace-nowrap">→</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[38px] not-italic text-[#ff5c00] text-[26px] top-[262px] whitespace-nowrap">🏊</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[86px] not-italic text-[#131826] text-[15px] top-[254px] whitespace-nowrap">Extra 1-op-1</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[86px] not-italic text-[#44516b] text-[12px] top-[276px] whitespace-nowrap">Extra of inhaalles — privé.</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[346px] not-italic text-[#ff5c00] text-[20px] top-[266px] whitespace-nowrap">→</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[38px] not-italic text-[#00c1ff] text-[26px] top-[356px] whitespace-nowrap">👥</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[86px] not-italic text-[#131826] text-[15px] top-[348px] whitespace-nowrap">Extra 1-op-2</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[86px] not-italic text-[#44516b] text-[12px] top-[370px] whitespace-nowrap">Extra of inhaalles — gedeeld.</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[346px] not-italic text-[#00c1ff] text-[20px] top-[360px] whitespace-nowrap">→</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[38px] not-italic text-[#18bb67] text-[26px] top-[450px] whitespace-nowrap">🌤️</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[86px] not-italic text-[#131826] text-[15px] top-[442px] whitespace-nowrap">Vakantie zwemles</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[86px] not-italic text-[#44516b] text-[12px] top-[464px] whitespace-nowrap">Zwemlessen in schoolvakantie.</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[346px] not-italic text-[#18bb67] text-[20px] top-[454px] whitespace-nowrap">→</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[28.75px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Thuis</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[126.25px] not-italic text-[#0365c4] text-[11px] top-[802px] whitespace-nowrap">Boeken</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[223.75px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Kaarten</p>
      <div className="absolute contents left-[20px] top-[16px]" data-name="Mask group">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[310px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-289.249px_0.936px] mask-size-[29.269px_11.213px] not-italic text-[#131826] text-[12px] top-[18px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          WiFi 🔋
        </p>
        <div className="absolute bg-white h-[100px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[20.751px_18.936px] mask-size-[29.269px_11.213px] top-0 w-[390px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-43.064px] mask-size-[29.269px_11.213px] not-italic text-[#131826] text-[22px] top-[62px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ←
        </p>
        <div className="absolute bg-[#f0f4fc] h-[80px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-125.064px] mask-size-[29.269px_11.213px] rounded-[16px] top-[144px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-9.249px_-143.064px] top-[162px]">
          <circle cx="22" cy="22" fill="var(--fill-0, #F0F4FC)" id="Ellipse" r="22" />
        </MaskGroupEllipse>
        <div className="absolute bg-[#fef0e7] h-[80px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-219.064px] mask-size-[29.269px_11.213px] rounded-[16px] top-[238px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-9.249px_-237.064px] top-[256px]">
          <circle cx="22" cy="22" fill="var(--fill-0, #FEF0E7)" id="Ellipse" r="22" />
        </MaskGroupEllipse>
        <div className="absolute bg-[#e5f3ff] h-[80px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-313.064px] mask-size-[29.269px_11.213px] rounded-[16px] top-[332px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-9.249px_-331.064px] top-[350px]">
          <circle cx="22" cy="22" fill="var(--fill-0, #E5F3FF)" id="Ellipse" r="22" />
        </MaskGroupEllipse>
        <div className="absolute bg-[#e0f9ec] h-[80px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-407.064px] mask-size-[29.269px_11.213px] rounded-[16px] top-[426px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-9.249px_-425.064px] top-[444px]">
          <circle cx="22" cy="22" fill="var(--fill-0, #E0F9EC)" id="Ellipse" r="22" />
        </MaskGroupEllipse>
        <div className="absolute bg-white h-[82px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[20.751px_-743.064px] mask-size-[29.269px_11.213px] top-[762px] w-[390px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#dce4f0] h-px left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[20.751px_-743.064px] mask-size-[29.269px_11.213px] top-[762px] w-[390px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular','Noto_Sans_Symbols:Regular',sans-serif] font-normal leading-[normal] left-[38.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-17.999px_-757.064px] mask-size-[29.269px_11.213px] not-italic text-[#818ea6] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ⌂
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[136.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-115.499px_-757.064px] mask-size-[29.269px_11.213px] not-italic text-[#0365c4] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          📅
        </p>
        <div className="absolute bg-[#0365c4] h-[3px] left-[128.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-107.499px_-743.064px] mask-size-[29.269px_11.213px] rounded-[2px] top-[762px] w-[36px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[233.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-212.999px_-757.064px] mask-size-[29.269px_11.213px] not-italic text-[#818ea6] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          🎫
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[331.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-310.499px_-757.064px] mask-size-[29.269px_11.213px] not-italic text-[#818ea6] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          👤
        </p>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[321.25px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Profiel</p>
    </div>
  );
}
import clsx from "clsx";
import { imgWiFi } from "./svg-2pbfr";
type MaskGroupEllipseProps = {
  additionalClassNames?: string;
};

function MaskGroupEllipse({ children, additionalClassNames = "" }: React.PropsWithChildren<MaskGroupEllipseProps>) {
  return (
    <div style={{ maskImage: `url('${imgWiFi}')` }} className={clsx("absolute left-[32px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[29.269px_11.213px] size-[52px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
        {children}
      </svg>
    </div>
  );
}

export default function Screen() {
  return (
    <div className="bg-[#f4f7fc] overflow-clip relative rounded-[44px] size-full" data-name="Screen">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[99px] not-italic text-[#131826] text-[18px] top-[64px] whitespace-nowrap">Oefeningen voor Thuis</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[36px] not-italic text-[#0365c4] text-[12px] top-[120px] whitespace-pre">{`📋  Op basis van Sami's niveau: Gevorderd Beginner`}</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[20px] not-italic text-[#131826] text-[15px] top-[168px] whitespace-nowrap">Oefeningen deze week</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[38px] not-italic text-[#0365c4] text-[28px] top-[232px] whitespace-nowrap">🛁</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[96px] not-italic text-[#131826] text-[14px] top-[218px] whitespace-nowrap">Ademhaling in bad</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[96px] not-italic text-[#818ea6] text-[12px] top-[240px] whitespace-nowrap">⏱ 5 min</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[32px] not-italic text-[#44516b] text-[12px] top-[284px] whitespace-nowrap">Doe je gezicht in het water, adem uit met bellen, til dan je hoofd op. Herhaal 10x.</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[38px] not-italic text-[#ff5c00] text-[28px] top-[374px] whitespace-nowrap">🪑</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[96px] not-italic text-[#131826] text-[14px] top-[360px] whitespace-nowrap">Scharrelschop op stoel</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[96px] not-italic text-[#818ea6] text-[12px] top-[382px] whitespace-nowrap">⏱ 3 min</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[32px] not-italic text-[#44516b] text-[12px] top-[426px] whitespace-nowrap">Zit op de rand, maak een flutter-schopbeweging 30 seconden aan elk been.</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[38px] not-italic text-[#18bb67] text-[28px] top-[516px] whitespace-nowrap">🏠</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[96px] not-italic text-[#131826] text-[14px] top-[502px] whitespace-nowrap">Arm zwaaioefening</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[96px] not-italic text-[#818ea6] text-[12px] top-[524px] whitespace-nowrap">⏱ 3 min</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[32px] not-italic text-[#44516b] text-[12px] top-[568px] whitespace-nowrap">Oefen de windmolenarmbeweging 20x per kant bij de spiegel.</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[20px] not-italic text-[#818ea6] text-[12px] top-[628px] whitespace-nowrap">✓ Toegewezen door Jan de Vries · 22 maart</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[28.75px] not-italic text-[#0365c4] text-[11px] top-[802px] whitespace-nowrap">Thuis</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[126.25px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Boeken</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[223.75px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Kaarten</p>
      <div className="absolute contents left-[20px] top-[16px]" data-name="Mask group">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[310px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-289.249px_0.937px] mask-size-[29.269px_11.213px] not-italic text-[#131826] text-[12px] top-[18px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          WiFi 🔋
        </p>
        <div className="absolute bg-white h-[100px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[20.751px_18.937px] mask-size-[29.269px_11.213px] top-0 w-[390px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-43.063px] mask-size-[29.269px_11.213px] not-italic text-[#131826] text-[22px] top-[62px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ←
        </p>
        <div className="absolute bg-[#f0f4fc] h-[44px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-89.063px] mask-size-[29.269px_11.213px] rounded-[10px] top-[108px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#0365c4] h-[44px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-89.063px] mask-size-[29.269px_11.213px] rounded-[2px] top-[108px] w-[4px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#f0f4fc] h-[128px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-181.063px] mask-size-[29.269px_11.213px] rounded-[16px] top-[200px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-11.249px_-201.063px] top-[220px]">
          <circle cx="26" cy="26" fill="var(--fill-0, #E1EDF8)" id="Ellipse" r="26" />
        </MaskGroupEllipse>
        <div className="absolute bg-[#fef0e7] h-[128px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-323.063px] mask-size-[29.269px_11.213px] rounded-[16px] top-[342px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-11.249px_-343.063px] top-[362px]">
          <circle cx="26" cy="26" fill="var(--fill-0, #FFEBE0)" id="Ellipse" r="26" />
        </MaskGroupEllipse>
        <div className="absolute bg-[#e0f9ec] h-[128px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-465.063px] mask-size-[29.269px_11.213px] rounded-[16px] top-[484px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-11.249px_-485.063px] top-[504px]">
          <circle cx="26" cy="26" fill="var(--fill-0, #E3F7ED)" id="Ellipse" r="26" />
        </MaskGroupEllipse>
        <div className="absolute bg-white h-[82px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[20.751px_-743.063px] mask-size-[29.269px_11.213px] top-[762px] w-[390px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#dce4f0] h-px left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[20.751px_-743.063px] mask-size-[29.269px_11.213px] top-[762px] w-[390px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular','Noto_Sans_Symbols:Regular',sans-serif] font-normal leading-[normal] left-[38.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-17.999px_-757.063px] mask-size-[29.269px_11.213px] not-italic text-[#0365c4] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ⌂
        </p>
        <div className="absolute bg-[#0365c4] h-[3px] left-[30.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-9.999px_-743.063px] mask-size-[29.269px_11.213px] rounded-[2px] top-[762px] w-[36px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[136.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-115.499px_-757.063px] mask-size-[29.269px_11.213px] not-italic text-[#818ea6] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          📅
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[233.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-212.999px_-757.063px] mask-size-[29.269px_11.213px] not-italic text-[#818ea6] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          🎫
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[331.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-310.499px_-757.063px] mask-size-[29.269px_11.213px] not-italic text-[#818ea6] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          👤
        </p>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[321.25px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Profiel</p>
    </div>
  );
}
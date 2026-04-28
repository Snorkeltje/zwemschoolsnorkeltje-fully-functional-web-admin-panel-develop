import clsx from "clsx";
import { imgWiFi } from "./svg-ue4oq";
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
    <div className="bg-[#0f1117] overflow-clip relative rounded-[44px] size-full" data-name="Screen">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[123px] not-italic text-[18px] text-white top-[64px] whitespace-nowrap">De Bilt — 15:00</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] not-italic text-[13px] text-white top-[122px] whitespace-pre">{`Maandag 28 april 2026  ·  15:00 – 15:30`}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#ffe5b2] text-[12px] top-[146px] whitespace-pre">{`1-op-2 Les  ·  De Bilt Zwembad  ·  2/2 lln`}</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[300px] not-italic text-[11px] text-white top-[130px] whitespace-nowrap">✓ Aanwezig</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[20px] not-italic text-[#818ea6] text-[14px] top-[202px] whitespace-nowrap">Leerlingen vandaag</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[50px] not-italic text-[22px] text-white top-[258px] whitespace-nowrap">S</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[92px] not-italic text-[15px] text-white top-[246px] whitespace-nowrap">Sami Khilji</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[92px] not-italic text-[#818ea6] text-[12px] top-[268px] whitespace-nowrap">7 jaar</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[100px] not-italic text-[#0365c4] text-[11px] top-[294px] whitespace-nowrap">Gev. Beginner</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#818ea6] text-[12px] top-[324px] whitespace-nowrap">Doel:</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[13px] text-white top-[342px] whitespace-nowrap">Ademhaling</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[115px] not-italic text-[13px] text-white top-[386px] whitespace-nowrap">Voortgang bijwerken →</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[50px] not-italic text-[22px] text-white top-[454px] whitespace-nowrap">L</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[92px] not-italic text-[15px] text-white top-[442px] whitespace-nowrap">Lisa Bos</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[92px] not-italic text-[#818ea6] text-[12px] top-[464px] whitespace-nowrap">8 jaar</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[100px] not-italic text-[#18bb67] text-[11px] top-[490px] whitespace-nowrap">Beginner</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#818ea6] text-[12px] top-[520px] whitespace-nowrap">Doel:</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[13px] text-white top-[538px] whitespace-nowrap">{`Drijven & schoppen`}</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[115px] not-italic text-[13px] text-white top-[582px] whitespace-nowrap">Voortgang bijwerken →</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[28.75px] not-italic text-[#ff5c00] text-[11px] top-[802px] whitespace-nowrap">Rooster</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[136.25px] not-italic text-[#818ea6] text-[22px] top-[776px] whitespace-nowrap">👥</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[126.25px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Leerlingen</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[223.75px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Berichten</p>
      <div className="absolute contents left-[20px] top-[16px]" data-name="Mask group">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[310px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-289.249px_0.937px] mask-size-[29.269px_11.213px] not-italic text-[12px] text-white top-[18px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          WiFi 🔋
        </p>
        <div className="absolute bg-[#1c1f27] h-[100px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[20.751px_18.937px] mask-size-[29.269px_11.213px] top-0 w-[390px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#ff5c00] h-[76px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-89.063px] mask-size-[29.269px_11.213px] rounded-[14px] top-[108px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#1c1f27] h-[180px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-209.063px] mask-size-[29.269px_11.213px] rounded-[16px] top-[228px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-11.249px_-225.063px] top-[244px]">
          <circle cx="26" cy="26" fill="var(--fill-0, #0365C4)" id="Ellipse" r="26" />
        </MaskGroupEllipse>
        <div className="absolute bg-[#1a293a] h-[24px] left-[92px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-71.249px_-269.063px] mask-size-[29.269px_11.213px] rounded-[12px] top-[288px] w-[107px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#ff5c00] h-[38px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.249px_-357.063px] mask-size-[29.269px_11.213px] rounded-[10px] top-[376px] w-[342px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#1c1f27] h-[180px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-405.063px] mask-size-[29.269px_11.213px] rounded-[16px] top-[424px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-11.249px_-421.063px] top-[440px]">
          <circle cx="26" cy="26" fill="var(--fill-0, #18BB67)" id="Ellipse" r="26" />
        </MaskGroupEllipse>
        <div className="absolute bg-[#1c3131] h-[24px] left-[92px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-71.249px_-465.063px] mask-size-[29.269px_11.213px] rounded-[12px] top-[484px] w-[72px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#ff5c00] h-[38px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.249px_-553.063px] mask-size-[29.269px_11.213px] rounded-[10px] top-[572px] w-[342px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#1c1f27] h-[82px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[20.751px_-743.063px] mask-size-[29.269px_11.213px] top-[762px] w-[390px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[38.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-17.999px_-757.063px] mask-size-[29.269px_11.213px] not-italic text-[#ff5c00] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          📅
        </p>
        <div className="absolute bg-[#ff5c00] h-[3px] left-[30.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-9.999px_-743.063px] mask-size-[29.269px_11.213px] rounded-[2px] top-[762px] w-[36px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[233.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-212.999px_-757.063px] mask-size-[29.269px_11.213px] not-italic text-[#818ea6] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          💬
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[331.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-310.499px_-757.063px] mask-size-[29.269px_11.213px] not-italic text-[#818ea6] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          👤
        </p>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[321.25px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Profiel</p>
    </div>
  );
}
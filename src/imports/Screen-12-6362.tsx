import clsx from "clsx";
import { imgWiFi } from "./svg-9u81h";
type MaskGroupEllipseProps = {
  additionalClassNames?: string;
};

function MaskGroupEllipse({ children, additionalClassNames = "" }: React.PropsWithChildren<MaskGroupEllipseProps>) {
  return (
    <div style={{ maskImage: `url('${imgWiFi}')` }} className={clsx("absolute mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[29.269px_11.213px] size-[30px] top-[258px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        {children}
      </svg>
    </div>
  );
}

export default function Screen() {
  return (
    <div className="bg-[#0f1117] overflow-clip relative rounded-[44px] size-full" data-name="Screen">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[34px] not-italic text-[18px] text-white top-[65px] whitespace-nowrap">J</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[72px] not-italic text-[#818ea6] text-[12px] top-[56px] whitespace-nowrap">Goedemorgen,</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[72px] not-italic text-[15px] text-white top-[72px] whitespace-nowrap">Jan de Vries</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[338px] not-italic text-[22px] text-white top-[58px] whitespace-nowrap">🔔</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] not-italic text-[13px] text-white top-[122px] whitespace-nowrap">Vandaag — Maandag 28 april</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] not-italic text-[36px] text-white top-[142px] whitespace-nowrap">8</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[80px] not-italic text-[#ffe5b2] text-[13px] top-[158px] whitespace-nowrap">lessen</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[195px] not-italic text-[36px] text-white top-[142px] whitespace-nowrap">12</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[241px] not-italic text-[#ffe5b2] text-[13px] top-[158px] whitespace-nowrap">leerlingen</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[200px] not-italic text-[12px] text-white top-[158px] whitespace-nowrap">Volgende over 45 min →</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[20px] not-italic text-[#818ea6] text-[14px] top-[224px] whitespace-nowrap">Volgende les</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] not-italic text-[#ff5c00] text-[14px] top-[260px] whitespace-nowrap">15:00 – 15:30</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[13px] text-white top-[284px] whitespace-nowrap">De Bilt Zwembad</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#818ea6] text-[12px] top-[304px] whitespace-nowrap">3 leerlingen</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[294px] not-italic text-[#ff5c00] text-[13px] top-[272px] whitespace-nowrap">Details →</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[318px] not-italic text-[14px] text-white top-[265px] whitespace-nowrap">S</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[336px] not-italic text-[14px] text-white top-[265px] whitespace-nowrap">K</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[354px] not-italic text-[14px] text-white top-[265px] whitespace-nowrap">L</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[20px] not-italic text-[#818ea6] text-[14px] top-[360px] whitespace-nowrap">Rooster Vandaag</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] not-italic text-[#ff5c00] text-[14px] top-[404px] whitespace-nowrap">13:00</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[88px] not-italic text-[13px] text-white top-[396px] whitespace-nowrap">De Bilt</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[88px] not-italic text-[#818ea6] text-[12px] top-[416px] whitespace-nowrap">2 lln</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[320px] not-italic text-[#818ea6] text-[11px] top-[405px] whitespace-nowrap">Actief</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] not-italic text-[#ff5c00] text-[14px] top-[462px] whitespace-nowrap">14:00</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[88px] not-italic text-[13px] text-white top-[454px] whitespace-nowrap">De Bilt</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[88px] not-italic text-[#818ea6] text-[12px] top-[474px] whitespace-nowrap">1 lln</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[320px] not-italic text-[#818ea6] text-[11px] top-[463px] whitespace-nowrap">Actief</p>
      <div className="absolute bg-[#1c1f27] h-[50px] left-[20px] rounded-[12px] top-[504px] w-[350px]" data-name="Rectangle" />
      <div className="absolute bg-[#ff5c00] h-[50px] left-[20px] rounded-[2px] top-[504px] w-[4px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] not-italic text-[#ff5c00] text-[14px] top-[520px] whitespace-nowrap">15:00</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[88px] not-italic text-[13px] text-white top-[512px] whitespace-nowrap">De Bilt</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[88px] not-italic text-[#818ea6] text-[12px] top-[532px] whitespace-nowrap">3 lln</p>
      <div className="absolute bg-[#2e333f] h-[24px] left-[308px] rounded-[12px] top-[516px] w-[58px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[320px] not-italic text-[#818ea6] text-[11px] top-[521px] whitespace-nowrap">Actief</p>
      <div className="absolute bg-[#1c1f27] h-[50px] left-[20px] rounded-[12px] top-[562px] w-[350px]" data-name="Rectangle" />
      <div className="absolute bg-[#ff5c00] h-[50px] left-[20px] rounded-[2px] top-[562px] w-[4px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] not-italic text-[#ff5c00] text-[14px] top-[578px] whitespace-nowrap">16:00</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[88px] not-italic text-[13px] text-white top-[570px] whitespace-nowrap">Bad H.</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[88px] not-italic text-[#818ea6] text-[12px] top-[590px] whitespace-nowrap">2 lln</p>
      <div className="absolute bg-[#2e333f] h-[24px] left-[308px] rounded-[12px] top-[574px] w-[58px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[320px] not-italic text-[#818ea6] text-[11px] top-[579px] whitespace-nowrap">Actief</p>
      <div className="absolute bg-[#0f331c] h-[36px] left-[20px] rounded-[10px] top-[628px] w-[350px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[36px] not-italic text-[#18bb67] text-[12px] top-[640px] whitespace-pre">{`📶  Online — Alle data gesynchroniseerd`}</p>
      <div className="absolute bg-[#1c1f27] h-[82px] left-0 top-[762px] w-[390px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[28.75px] not-italic text-[#ff5c00] text-[11px] top-[802px] whitespace-nowrap">Rooster</p>
      <div className="absolute bg-[#ff5c00] h-[3px] left-[30.75px] rounded-[2px] top-[762px] w-[36px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[136.25px] not-italic text-[#818ea6] text-[22px] top-[776px] whitespace-nowrap">👥</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[126.25px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Leerlingen</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[223.75px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Berichten</p>
      <div className="absolute contents left-[20px] top-[16px]" data-name="Mask group">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[310px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-289.249px_0.937px] mask-size-[29.269px_11.213px] not-italic text-[12px] text-white top-[18px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          WiFi 🔋
        </p>
        <div className="absolute bg-[#1c1f27] h-[96px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[20.751px_18.937px] mask-size-[29.269px_11.213px] top-0 w-[390px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-35.063px] mask-size-[29.269px_11.213px] size-[44px] top-[54px]" data-name="Ellipse" style={{ maskImage: `url('${imgWiFi}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
            <circle cx="22" cy="22" fill="var(--fill-0, #FF5C00)" id="Ellipse" r="22" />
          </svg>
        </div>
        <div className="absolute bg-[#ff5c00] h-[96px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-89.063px] mask-size-[29.269px_11.213px] rounded-[20px] top-[108px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#930] h-[96px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-89.063px] mask-size-[29.269px_11.213px] rounded-[20px] top-[108px] w-[100px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#1c1f27] h-[96px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-227.063px] mask-size-[29.269px_11.213px] rounded-[14px] top-[246px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="left-[310px] mask-position-[-289.249px_-239.063px]">
          <circle cx="15" cy="15" fill="var(--fill-0, #0365C4)" id="Ellipse" r="15" />
        </MaskGroupEllipse>
        <MaskGroupEllipse additionalClassNames="left-[328px] mask-position-[-307.249px_-239.063px]">
          <circle cx="15" cy="15" fill="var(--fill-0, #18BB67)" id="Ellipse" r="15" />
        </MaskGroupEllipse>
        <MaskGroupEllipse additionalClassNames="left-[346px] mask-position-[-325.249px_-239.063px]">
          <circle cx="15" cy="15" fill="var(--fill-0, #FCAA00)" id="Ellipse" r="15" />
        </MaskGroupEllipse>
        <div className="absolute bg-[#1c1f27] h-[50px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-369.063px] mask-size-[29.269px_11.213px] rounded-[12px] top-[388px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#ff5c00] h-[50px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-369.063px] mask-size-[29.269px_11.213px] rounded-[2px] top-[388px] w-[4px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#2e333f] h-[24px] left-[308px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-287.249px_-381.063px] mask-size-[29.269px_11.213px] rounded-[12px] top-[400px] w-[58px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#1c1f27] h-[50px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-427.063px] mask-size-[29.269px_11.213px] rounded-[12px] top-[446px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#ff5c00] h-[50px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-427.063px] mask-size-[29.269px_11.213px] rounded-[2px] top-[446px] w-[4px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#2e333f] h-[24px] left-[308px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-287.249px_-439.063px] mask-size-[29.269px_11.213px] rounded-[12px] top-[458px] w-[58px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[38.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-17.999px_-757.063px] mask-size-[29.269px_11.213px] not-italic text-[#ff5c00] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          📅
        </p>
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
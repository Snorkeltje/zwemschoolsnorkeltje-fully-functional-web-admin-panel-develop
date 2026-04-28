import clsx from "clsx";
import { imgWiFi } from "./svg-bcs68";
type MaskGroupEllipseProps = {
  additionalClassNames?: string;
};

function MaskGroupEllipse({ children, additionalClassNames = "" }: React.PropsWithChildren<MaskGroupEllipseProps>) {
  return (
    <div style={{ maskImage: `url('${imgWiFi}')` }} className={clsx("absolute left-[32px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[29.269px_11.212px] size-[22px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        {children}
      </svg>
    </div>
  );
}

export default function Screen() {
  return (
    <div className="bg-[#0f1117] overflow-clip relative rounded-[44px] size-full" data-name="Screen">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[107px] not-italic text-[18px] text-white top-[64px] whitespace-nowrap">Voortgang Bijwerken</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] not-italic text-[15px] text-white top-[122px] whitespace-pre">{`Sami Khilji  ·  7 jaar`}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#ffe5b2] text-[12px] top-[146px] whitespace-pre">{`Huidig: Gevorderd Beginner  ·  28 apr`}</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[20px] not-italic text-[#818ea6] text-[12px] top-[186px] whitespace-nowrap">Niveauupdate</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#ff5c00] text-[14px] top-[220px] whitespace-pre">{`Gevorderd Beginner  ▼`}</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[20px] not-italic text-[#818ea6] text-[12px] top-[264px] whitespace-nowrap">Gewerkte vaardigheden</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[62px] not-italic text-[13px] text-white top-[291px] whitespace-nowrap">Vrije slag armen</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[62px] not-italic text-[13px] text-white top-[333px] whitespace-nowrap">Ademhaling</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[62px] not-italic text-[#818ea6] text-[13px] top-[375px] whitespace-nowrap">Rugslag</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[20px] not-italic text-[#818ea6] text-[12px] top-[412px] whitespace-nowrap">Stappen afgerond</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] not-italic text-[13px] text-white top-[439px] whitespace-nowrap">✓</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[62px] not-italic text-[12px] text-white top-[439px] whitespace-nowrap">Beiderzijds ademen (links)</p>
      <div className="absolute bg-[#1c1f27] h-[34px] left-[20px] rounded-[8px] top-[472px] w-[350px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[62px] not-italic text-[#818ea6] text-[12px] top-[481px] whitespace-nowrap">10m vrije slag zonder stop</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[20px] not-italic text-[#818ea6] text-[12px] top-[528px] whitespace-nowrap">Notities (optioneel)</p>
      <div className="absolute bg-[#1c1f27] h-[60px] left-[20px] rounded-[10px] top-[546px] w-[350px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#818ea6] text-[12px] top-[564px] whitespace-nowrap">Geweldige sessie vandaag...</p>
      <div className="absolute bg-[#18bb67] h-[48px] left-[20px] rounded-[14px] top-[624px] w-[350px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[97px] not-italic text-[15px] text-white top-[640px] whitespace-pre">{`✓  Opslaan & Ouder Melden`}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[81px] not-italic text-[#818ea6] text-[12px] top-[680px] whitespace-nowrap">Ouder krijgt automatisch melding</p>
      <div className="absolute bg-[#1c1f27] h-[82px] left-0 top-[762px] w-[390px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[28.75px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Rooster</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[136.25px] not-italic text-[#ff5c00] text-[22px] top-[776px] whitespace-nowrap">👥</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[126.25px] not-italic text-[#ff5c00] text-[11px] top-[802px] whitespace-nowrap">Leerlingen</p>
      <div className="absolute bg-[#ff5c00] h-[3px] left-[128.25px] rounded-[2px] top-[762px] w-[36px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[223.75px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Berichten</p>
      <div className="absolute contents left-[20px] top-[16px]" data-name="Mask group">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[310px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-289.249px_0.937px] mask-size-[29.269px_11.212px] not-italic text-[12px] text-white top-[18px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          WiFi 🔋
        </p>
        <div className="absolute bg-[#1c1f27] h-[100px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[20.751px_18.937px] mask-size-[29.269px_11.212px] top-0 w-[390px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-43.063px] mask-size-[29.269px_11.212px] not-italic text-[22px] text-white top-[62px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ←
        </p>
        <div className="absolute bg-[#ff5c00] h-[60px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-89.063px] mask-size-[29.269px_11.212px] rounded-[14px] top-[108px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#1c1f27] h-[44px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-185.063px] mask-size-[29.269px_11.212px] rounded-[10px] top-[204px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#0f2e4f] h-[34px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-263.063px] mask-size-[29.269px_11.212px] rounded-[8px] top-[282px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#0365c4] left-[32px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-11.249px_-270.063px] mask-size-[29.269px_11.212px] rounded-[4px] size-[22px] top-[289px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-15.249px_-272.063px] mask-size-[29.269px_11.212px] not-italic text-[13px] text-white top-[291px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ✓
        </p>
        <div className="absolute bg-[#0f2e4f] h-[34px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-305.063px] mask-size-[29.269px_11.212px] rounded-[8px] top-[324px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#0365c4] left-[32px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-11.249px_-312.063px] mask-size-[29.269px_11.212px] rounded-[4px] size-[22px] top-[331px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-15.249px_-314.063px] mask-size-[29.269px_11.212px] not-italic text-[13px] text-white top-[333px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ✓
        </p>
        <div className="absolute bg-[#1c1f27] h-[34px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-347.063px] mask-size-[29.269px_11.212px] rounded-[8px] top-[366px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#2e333f] left-[32px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-11.249px_-354.063px] mask-size-[29.269px_11.212px] rounded-[4px] size-[22px] top-[373px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-15.249px_-356.063px] mask-size-[29.269px_11.212px] not-italic text-[13px] text-white top-[375px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          &nbsp;
        </p>
        <div className="absolute bg-[#0f2e17] h-[34px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-411.063px] mask-size-[29.269px_11.212px] rounded-[8px] top-[430px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-11.249px_-418.063px] top-[437px]">
          <circle cx="11" cy="11" fill="var(--fill-0, #18BB67)" id="Ellipse" r="11" />
        </MaskGroupEllipse>
        <MaskGroupEllipse additionalClassNames="mask-position-[-11.249px_-460.063px] top-[479px]">
          <circle cx="11" cy="11" fill="var(--fill-0, #2E333F)" id="Ellipse" r="11" />
        </MaskGroupEllipse>
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-15.249px_-462.063px] mask-size-[29.269px_11.212px] not-italic text-[13px] text-white top-[481px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          &nbsp;
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[38.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-17.999px_-757.063px] mask-size-[29.269px_11.212px] not-italic text-[#818ea6] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          📅
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[233.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-212.999px_-757.063px] mask-size-[29.269px_11.212px] not-italic text-[#818ea6] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          💬
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[331.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-310.499px_-757.063px] mask-size-[29.269px_11.212px] not-italic text-[#818ea6] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          👤
        </p>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[321.25px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Profiel</p>
    </div>
  );
}
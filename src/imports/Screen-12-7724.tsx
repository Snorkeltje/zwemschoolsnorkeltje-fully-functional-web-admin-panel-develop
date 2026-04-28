import clsx from "clsx";
import { imgWiFi } from "./svg-5xs51";
type MaskGroupEllipseProps = {
  additionalClassNames?: string;
};

function MaskGroupEllipse({ additionalClassNames = "" }: MaskGroupEllipseProps) {
  return (
    <div style={{ maskImage: `url('${imgWiFi}')` }} className={clsx("absolute left-[32px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[29.269px_11.212px] size-[28px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <circle cx="14" cy="14" fill="var(--fill-0, #18BB67)" id="Ellipse" r="14" />
      </svg>
    </div>
  );
}

export default function Screen() {
  return (
    <div className="bg-[#f4f7fc] overflow-clip relative rounded-[44px] size-full" data-name="Screen">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[119px] not-italic text-[#131826] text-[18px] top-[64px] whitespace-nowrap">Vrije slag armen</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] not-italic text-[#131826] text-[14px] top-[122px] whitespace-nowrap">Niveau: Gevorderd Beginner</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#818ea6] text-[12px] top-[146px] whitespace-nowrap">Voortgang: 3 van 4 stappen afgerond</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[20px] not-italic text-[#131826] text-[15px] top-[184px] whitespace-nowrap">Stappen</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[70px] not-italic text-[#131826] text-[13px] top-[226px] whitespace-nowrap">Vangfase met hoge elleboog</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[70px] not-italic text-[#131826] text-[13px] top-[284px] whitespace-nowrap">Trekfase met volledige extensie</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[70px] not-italic text-[#131826] text-[13px] top-[342px] whitespace-nowrap">Herstel over water</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[70px] not-italic text-[#818ea6] text-[13px] top-[400px] whitespace-nowrap">Beiderzijdse armcoördinatie 25m</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[20px] not-italic text-[#131826] text-[15px] top-[450px] whitespace-nowrap">Instructeursnotitie</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#818ea6] text-[12px] top-[486px] whitespace-pre">{`💬  Jan de Vries  ·  22 maart 2026`}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#44516b] text-[13px] top-[506px] whitespace-nowrap">Goede verbetering vandaag. Focus op hoge</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#44516b] text-[13px] top-[524px] whitespace-nowrap">elleboog in de vangfase.</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[20px] not-italic text-[#131826] text-[15px] top-[568px] whitespace-nowrap">Doel voor volgende les</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[36px] not-italic text-[#fcaa00] text-[13px] top-[606px] whitespace-pre">{`🎯  Beiderzijdse armcoördinatie 25m halen`}</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] not-italic text-[#18bb67] text-[14px] top-[672px] whitespace-pre">{`📚  Oefeningen voor thuis →`}</p>
      <div className="absolute bg-[#dce4f0] h-px left-0 top-[762px] w-[390px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[28.75px] not-italic text-[#0365c4] text-[11px] top-[802px] whitespace-nowrap">Thuis</p>
      <div className="absolute bg-[#0365c4] h-[3px] left-[30.75px] rounded-[2px] top-[762px] w-[36px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[126.25px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Boeken</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[223.75px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Kaarten</p>
      <div className="absolute contents left-[20px] top-[16px]" data-name="Mask group">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[310px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-289.249px_0.937px] mask-size-[29.269px_11.212px] not-italic text-[#131826] text-[12px] top-[18px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          WiFi 🔋
        </p>
        <div className="absolute bg-white h-[100px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[20.751px_18.937px] mask-size-[29.269px_11.212px] top-0 w-[390px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-43.063px] mask-size-[29.269px_11.212px] not-italic text-[#131826] text-[22px] top-[62px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ←
        </p>
        <div className="absolute bg-[#f0f4fc] h-[58px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-89.063px] mask-size-[29.269px_11.212px] rounded-[12px] top-[108px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#e0f9ec] h-[48px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-191.063px] mask-size-[29.269px_11.212px] rounded-[10px] top-[210px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-11.249px_-201.063px] top-[220px]" />
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[37px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-16.249px_-207.063px] mask-size-[29.269px_11.212px] not-italic text-[13px] text-white top-[226px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ✓
        </p>
        <div className="absolute bg-[#e0f9ec] h-[48px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-249.063px] mask-size-[29.269px_11.212px] rounded-[10px] top-[268px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-11.249px_-259.063px] top-[278px]" />
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[37px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-16.249px_-265.063px] mask-size-[29.269px_11.212px] not-italic text-[13px] text-white top-[284px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ✓
        </p>
        <div className="absolute bg-[#e0f9ec] h-[48px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-307.063px] mask-size-[29.269px_11.212px] rounded-[10px] top-[326px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-11.249px_-317.063px] top-[336px]" />
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[37px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-16.249px_-323.063px] mask-size-[29.269px_11.212px] not-italic text-[13px] text-white top-[342px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ✓
        </p>
        <div className="absolute bg-white h-[48px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-365.063px] mask-size-[29.269px_11.212px] rounded-[10px] top-[384px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute left-[32px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-11.249px_-375.063px] mask-size-[29.269px_11.212px] size-[28px] top-[394px]" data-name="Ellipse" style={{ maskImage: `url('${imgWiFi}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
            <circle cx="14" cy="14" fill="var(--fill-0, #DCE4F0)" id="Ellipse" r="14" />
          </svg>
        </div>
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[37px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-16.249px_-381.063px] mask-size-[29.269px_11.212px] not-italic text-[13px] text-white top-[400px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          &nbsp;
        </p>
        <div className="absolute bg-white h-[78px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-453.063px] mask-size-[29.269px_11.212px] rounded-[12px] top-[472px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#fef3db] h-[48px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-571.063px] mask-size-[29.269px_11.212px] rounded-[12px] top-[590px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#e0f9ec] h-[48px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-637.063px] mask-size-[29.269px_11.212px] rounded-[14px] top-[656px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-white h-[82px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[20.751px_-743.063px] mask-size-[29.269px_11.212px] top-[762px] w-[390px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular','Noto_Sans_Symbols:Regular',sans-serif] font-normal leading-[normal] left-[38.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-17.999px_-757.063px] mask-size-[29.269px_11.212px] not-italic text-[#0365c4] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ⌂
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[136.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-115.499px_-757.063px] mask-size-[29.269px_11.212px] not-italic text-[#818ea6] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          📅
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[233.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-212.999px_-757.063px] mask-size-[29.269px_11.212px] not-italic text-[#818ea6] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          🎫
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[331.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-310.499px_-757.063px] mask-size-[29.269px_11.212px] not-italic text-[#818ea6] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          👤
        </p>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[321.25px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Profiel</p>
    </div>
  );
}
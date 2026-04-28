import clsx from "clsx";
import { imgWiFi } from "./svg-6jdcf";
type ScreenEllipseProps = {
  additionalClassNames?: string;
};

function ScreenEllipse({ additionalClassNames = "" }: ScreenEllipseProps) {
  return (
    <div className={clsx("absolute left-[40px] size-[40px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <circle cx="20" cy="20" fill="var(--fill-0, #E3F7ED)" id="Ellipse" r="20" />
      </svg>
    </div>
  );
}

function Helper1() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 40 40" className="absolute block size-full">
      <circle cx="20" cy="20" fill="var(--fill-0, #E1EDF8)" id="Ellipse" r="20" />
    </svg>
  );
}

function Helper() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 8 8" className="absolute block size-full">
      <circle cx="4" cy="4" fill="var(--fill-0, #0365C4)" id="Ellipse" r="4" />
    </svg>
  );
}
type MaskGroupEllipseProps = {
  additionalClassNames?: string;
};

function MaskGroupEllipse({ additionalClassNames = "" }: MaskGroupEllipseProps) {
  return (
    <div style={{ maskImage: `url('${imgWiFi}')` }} className={clsx("absolute left-[26px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[29.269px_11.212px] size-[8px]", additionalClassNames)}>
      <Helper />
    </div>
  );
}

export default function Screen() {
  return (
    <div className="bg-[#f4f7fc] overflow-clip relative rounded-[44px] size-full" data-name="Screen">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[143px] not-italic text-[#131826] text-[18px] top-[64px] whitespace-nowrap">Meldingen</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[270px] not-italic text-[#0365c4] text-[13px] top-[66px] whitespace-nowrap">Alles gelezen</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[20px] not-italic text-[#818ea6] text-[12px] top-[110px] whitespace-nowrap">Vandaag</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[90px] not-italic text-[#131826] text-[13px] top-[144px] whitespace-nowrap">Lesherinnering</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[90px] not-italic text-[#818ea6] text-[11px] top-[164px] whitespace-nowrap">Morgen ma 15:00 — De Bilt Zwembad</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[338px] not-italic text-[#818ea6] text-[11px] top-[144px] whitespace-nowrap">Nu</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[44px] not-italic text-[#ff5c00] text-[22px] top-[228px] whitespace-nowrap">📊</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[90px] not-italic text-[#131826] text-[13px] top-[220px] whitespace-nowrap">Voortgang bijgewerkt</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[90px] not-italic text-[#818ea6] text-[11px] top-[240px] whitespace-nowrap">{`Jan heeft Sami's voortgang van vandaag`}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[338px] not-italic text-[#818ea6] text-[11px] top-[220px] whitespace-nowrap">2u</p>
      <div className="absolute left-[26px] size-[8px] top-[312px]" data-name="Ellipse">
        <Helper />
      </div>
      <div className="absolute left-[40px] size-[40px] top-[296px]" data-name="Ellipse">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <circle cx="20" cy="20" fill="var(--fill-0, #FDE7E7)" id="Ellipse" r="20" />
        </svg>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[44px] not-italic text-[#f03838] text-[22px] top-[304px] whitespace-nowrap">💳</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[90px] not-italic text-[#131826] text-[13px] top-[296px] whitespace-nowrap">Knipkaart bijna op</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[90px] not-italic text-[#818ea6] text-[11px] top-[316px] whitespace-nowrap">Knipkaart loopt af: nog 3 lessen reste</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[338px] not-italic text-[#818ea6] text-[11px] top-[296px] whitespace-nowrap">1d</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[20px] not-italic text-[#818ea6] text-[12px] top-[344px] whitespace-nowrap">Eerder</p>
      <ScreenEllipse additionalClassNames="top-[372px]" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[44px] not-italic text-[#18bb67] text-[22px] top-[380px] whitespace-nowrap">✅</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[90px] not-italic text-[#131826] text-[13px] top-[372px] whitespace-nowrap">Les geboekt</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[90px] not-italic text-[#818ea6] text-[11px] top-[392px] whitespace-nowrap">Extra 1-op-1 geboekt voor 30 apr om 16</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[338px] not-italic text-[#818ea6] text-[11px] top-[372px] whitespace-nowrap">2d</p>
      <ScreenEllipse additionalClassNames="top-[448px]" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[44px] not-italic text-[#18bb67] text-[22px] top-[456px] whitespace-nowrap">💰</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[90px] not-italic text-[#131826] text-[13px] top-[448px] whitespace-nowrap">Terugbetaling</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[90px] not-italic text-[#818ea6] text-[11px] top-[468px] whitespace-nowrap">{`€5,00 terugbetaald — les omgezet naar `}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[338px] not-italic text-[#818ea6] text-[11px] top-[448px] whitespace-nowrap">3d</p>
      <div className="absolute left-[40px] size-[40px] top-[524px]" data-name="Ellipse">
        <Helper1 />
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[90px] not-italic text-[#131826] text-[13px] top-[524px] whitespace-nowrap">Nieuw bericht</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[90px] not-italic text-[#818ea6] text-[11px] top-[544px] whitespace-nowrap">Jan de Vries: Tot maandag om 15:00 🏊</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[338px] not-italic text-[#818ea6] text-[11px] top-[524px] whitespace-nowrap">3d</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[28.75px] not-italic text-[#0365c4] text-[11px] top-[802px] whitespace-nowrap">Thuis</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[126.25px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Boeken</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[223.75px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Kaarten</p>
      <div className="absolute contents left-[20px] top-[16px]" data-name="Mask group">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[310px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-289.249px_0.937px] mask-size-[29.269px_11.212px] not-italic text-[#131826] text-[12px] top-[18px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          WiFi 🔋
        </p>
        <div className="absolute bg-white h-[100px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[20.751px_18.937px] mask-size-[29.269px_11.212px] top-0 w-[390px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#f4f7fd] h-[64px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-113.063px] mask-size-[29.269px_11.212px] rounded-[12px] top-[132px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-5.249px_-141.063px] top-[160px]" />
        <div className="absolute left-[40px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-19.249px_-125.063px] mask-size-[29.269px_11.212px] size-[40px] top-[144px]" data-name="Ellipse" style={{ maskImage: `url('${imgWiFi}')` }}>
          <Helper1 />
        </div>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[44px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-23.249px_-133.063px] mask-size-[29.269px_11.212px] not-italic text-[#0365c4] text-[22px] top-[152px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          📅
        </p>
        <div className="absolute bg-[#f4f7fd] h-[64px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-189.063px] mask-size-[29.269px_11.212px] rounded-[12px] top-[208px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-5.249px_-217.063px] top-[236px]" />
        <div className="absolute left-[40px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-19.249px_-201.063px] mask-size-[29.269px_11.212px] size-[40px] top-[220px]" data-name="Ellipse" style={{ maskImage: `url('${imgWiFi}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
            <circle cx="20" cy="20" fill="var(--fill-0, #FFEBE0)" id="Ellipse" r="20" />
          </svg>
        </div>
        <div className="absolute bg-[#f4f7fd] h-[64px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-265.063px] mask-size-[29.269px_11.212px] rounded-[12px] top-[284px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-white h-[64px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-341.063px] mask-size-[29.269px_11.212px] rounded-[12px] top-[360px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-white h-[64px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-417.063px] mask-size-[29.269px_11.212px] rounded-[12px] top-[436px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-white h-[64px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-493.063px] mask-size-[29.269px_11.212px] rounded-[12px] top-[512px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[44px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-23.249px_-513.063px] mask-size-[29.269px_11.212px] not-italic text-[#0365c4] text-[22px] top-[532px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          💬
        </p>
        <div className="absolute bg-white h-[82px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[20.751px_-743.063px] mask-size-[29.269px_11.212px] top-[762px] w-[390px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#dce4f0] h-px left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[20.751px_-743.063px] mask-size-[29.269px_11.212px] top-[762px] w-[390px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular','Noto_Sans_Symbols:Regular',sans-serif] font-normal leading-[normal] left-[38.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-17.999px_-757.063px] mask-size-[29.269px_11.212px] not-italic text-[#0365c4] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ⌂
        </p>
        <div className="absolute bg-[#0365c4] h-[3px] left-[30.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-9.999px_-743.063px] mask-size-[29.269px_11.212px] rounded-[2px] top-[762px] w-[36px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
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
import clsx from "clsx";
import { imgWiFi } from "./svg-wx8m0";

function Helper() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 40 40" className="absolute block size-full">
      <circle cx="20" cy="20" fill="var(--fill-0, #F0F4FC)" id="Ellipse" r="20" />
    </svg>
  );
}
type MaskGroupEllipseProps = {
  additionalClassNames?: string;
};

function MaskGroupEllipse({ additionalClassNames = "" }: MaskGroupEllipseProps) {
  return (
    <div style={{ maskImage: `url('${imgWiFi}')` }} className={clsx("absolute left-[32px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[29.269px_11.212px] size-[40px]", additionalClassNames)}>
      <Helper />
    </div>
  );
}

export default function Screen() {
  return (
    <div className="bg-[#f4f7fc] overflow-clip relative rounded-[44px] size-full" data-name="Screen">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[151px] not-italic text-[#131826] text-[18px] top-[64px] whitespace-nowrap">Betalingen</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[30px] not-italic text-[11px] text-white top-[114px] whitespace-nowrap">Alle</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[82px] not-italic text-[#818ea6] text-[11px] top-[114px] whitespace-nowrap">Lessen</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[146px] not-italic text-[#818ea6] text-[11px] top-[114px] whitespace-nowrap">Kaarten</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[220px] not-italic text-[#818ea6] text-[11px] top-[114px] whitespace-nowrap">Terugbet.</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[20px] not-italic text-[#818ea6] text-[12px] top-[150px] whitespace-nowrap">Maart – April 2026</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#131826] text-[22px] top-[188px] whitespace-nowrap">💳</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[82px] not-italic text-[#131826] text-[13px] top-[182px] whitespace-nowrap">Knipkaart gebruikt</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[82px] not-italic text-[#818ea6] text-[11px] top-[202px] whitespace-nowrap">1-op-1 · De Bilt · 28 apr</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[280px] not-italic text-[#0365c4] text-[13px] top-[190px] whitespace-nowrap">-1 credit</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#131826] text-[22px] top-[256px] whitespace-nowrap">💰</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[82px] not-italic text-[#131826] text-[13px] top-[250px] whitespace-nowrap">Knipkaartaankoop</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[82px] not-italic text-[#818ea6] text-[11px] top-[270px] whitespace-nowrap">10× 1-op-1 · 24 mrt 2026</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[280px] not-italic text-[#131826] text-[13px] top-[258px] whitespace-nowrap">-€ 380,00</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#131826] text-[22px] top-[324px] whitespace-nowrap">💚</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[82px] not-italic text-[#131826] text-[13px] top-[318px] whitespace-nowrap">Terugbetaling</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[82px] not-italic text-[#818ea6] text-[11px] top-[338px] whitespace-nowrap">1-op-1 → 1-op-2 omzetting</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[280px] not-italic text-[#18bb67] text-[13px] top-[326px] whitespace-nowrap">+€ 11,00</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#131826] text-[22px] top-[392px] whitespace-nowrap">💳</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[82px] not-italic text-[#131826] text-[13px] top-[386px] whitespace-nowrap">Knipkaart gebruikt</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[82px] not-italic text-[#818ea6] text-[11px] top-[406px] whitespace-nowrap">1-op-2 · Bad H. · 25 mrt</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[280px] not-italic text-[#0365c4] text-[13px] top-[394px] whitespace-nowrap">-1 credit</p>
      <div className="absolute left-[32px] size-[40px] top-[453px]" data-name="Ellipse">
        <Helper />
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#131826] text-[22px] top-[460px] whitespace-nowrap">💰</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[82px] not-italic text-[#131826] text-[13px] top-[454px] whitespace-nowrap">Stripe betaling</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[82px] not-italic text-[#818ea6] text-[11px] top-[474px] whitespace-nowrap">Extra 1-op-1 · 22 mrt 2026</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[280px] not-italic text-[#131826] text-[13px] top-[462px] whitespace-nowrap">-€ 38,00</p>
      <div className="absolute bg-white h-[58px] left-[20px] rounded-[12px] top-[512px] w-[350px]" data-name="Rectangle" />
      <div className="absolute left-[32px] size-[40px] top-[521px]" data-name="Ellipse">
        <Helper />
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#131826] text-[22px] top-[528px] whitespace-nowrap">💚</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[82px] not-italic text-[#131826] text-[13px] top-[522px] whitespace-nowrap">Terugbetaling</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[82px] not-italic text-[#818ea6] text-[11px] top-[542px] whitespace-nowrap">Tijdig geannuleerd · 20 mrt</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[280px] not-italic text-[#18bb67] text-[13px] top-[530px] whitespace-nowrap">+€ 38,00</p>
      <div className="absolute bg-white h-[82px] left-0 top-[762px] w-[390px]" data-name="Rectangle" />
      <div className="absolute bg-[#dce4f0] h-px left-0 top-[762px] w-[390px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[28.75px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Thuis</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[126.25px] not-italic text-[#818ea6] text-[11px] top-[802px] whitespace-nowrap">Boeken</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[223.75px] not-italic text-[#0365c4] text-[11px] top-[802px] whitespace-nowrap">Kaarten</p>
      <div className="absolute bg-[#0365c4] h-[3px] left-[225.75px] rounded-[2px] top-[762px] w-[36px]" data-name="Rectangle" />
      <div className="absolute contents left-[20px] top-[16px]" data-name="Mask group">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[310px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-289.249px_0.937px] mask-size-[29.269px_11.212px] not-italic text-[#131826] text-[12px] top-[18px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          WiFi 🔋
        </p>
        <div className="absolute bg-white h-[100px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[20.751px_18.937px] mask-size-[29.269px_11.212px] top-0 w-[390px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-43.063px] mask-size-[29.269px_11.212px] not-italic text-[#131826] text-[22px] top-[62px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ←
        </p>
        <div className="absolute bg-[#0365c4] h-[28px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-89.063px] mask-size-[29.269px_11.212px] rounded-[14px] top-[108px] w-[52px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-white h-[28px] left-[72px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-51.249px_-89.063px] mask-size-[29.269px_11.212px] rounded-[14px] top-[108px] w-[68px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-white h-[28px] left-[136px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-115.249px_-89.063px] mask-size-[29.269px_11.212px] rounded-[14px] top-[108px] w-[76px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-white h-[28px] left-[210px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-189.249px_-89.063px] mask-size-[29.269px_11.212px] rounded-[14px] top-[108px] w-[92px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-white h-[58px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-153.063px] mask-size-[29.269px_11.212px] rounded-[12px] top-[172px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-11.249px_-162.063px] top-[181px]" />
        <div className="absolute bg-white h-[58px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-221.063px] mask-size-[29.269px_11.212px] rounded-[12px] top-[240px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-11.249px_-230.063px] top-[249px]" />
        <div className="absolute bg-white h-[58px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-289.063px] mask-size-[29.269px_11.212px] rounded-[12px] top-[308px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-11.249px_-298.063px] top-[317px]" />
        <div className="absolute bg-white h-[58px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-357.063px] mask-size-[29.269px_11.212px] rounded-[12px] top-[376px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-11.249px_-366.063px] top-[385px]" />
        <div className="absolute bg-white h-[58px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-425.063px] mask-size-[29.269px_11.212px] rounded-[12px] top-[444px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular','Noto_Sans_Symbols:Regular',sans-serif] font-normal leading-[normal] left-[38.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-17.999px_-757.063px] mask-size-[29.269px_11.212px] not-italic text-[#818ea6] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ⌂
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[136.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-115.499px_-757.063px] mask-size-[29.269px_11.212px] not-italic text-[#818ea6] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          📅
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[233.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-212.999px_-757.063px] mask-size-[29.269px_11.212px] not-italic text-[#0365c4] text-[22px] top-[776px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
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
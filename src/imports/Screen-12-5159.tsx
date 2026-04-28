import clsx from "clsx";
import { imgWiFi } from "./svg-ftbf9";
type ScreenEllipseProps = {
  additionalClassNames?: string;
};

function ScreenEllipse({ children, additionalClassNames = "" }: React.PropsWithChildren<ScreenEllipseProps>) {
  return (
    <div className={clsx("absolute size-[10px] top-[500px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        {children}
      </svg>
    </div>
  );
}

function Helper() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 36 36" className="absolute block size-full">
      <circle cx="18" cy="18" fill="var(--fill-0, #E0F9EC)" id="Ellipse" r="18" />
    </svg>
  );
}
type MaskGroupEllipseProps = {
  additionalClassNames?: string;
};

function MaskGroupEllipse({ additionalClassNames = "" }: MaskGroupEllipseProps) {
  return (
    <div style={{ maskImage: `url('${imgWiFi}')` }} className={clsx("absolute mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[29.269px_11.213px] size-[36px]", additionalClassNames)}>
      <Helper />
    </div>
  );
}

export default function Screen() {
  return (
    <div className="bg-[#f4f7fc] overflow-clip relative rounded-[44px] size-full" data-name="Screen">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[137px] not-italic text-[#131826] text-[18px] top-[64px] whitespace-nowrap">Vast Tijdstip</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] not-italic text-[#0365c4] text-[13px] top-[120px] whitespace-nowrap">Uw vast tijdstip: Maandag 15:00</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#818ea6] text-[12px] top-[138px] whitespace-nowrap">📍 De Bilt Zwembad</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[151px] not-italic text-[#131826] text-[16px] top-[180px] whitespace-nowrap">april 2026</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[350px] not-italic text-[#818ea6] text-[18px] top-[180px] whitespace-nowrap">→</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[24px] not-italic text-[#818ea6] text-[12px] top-[206px] whitespace-nowrap">Ma</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[74px] not-italic text-[#818ea6] text-[12px] top-[206px] whitespace-nowrap">Di</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[124px] not-italic text-[#818ea6] text-[12px] top-[206px] whitespace-nowrap">Wo</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[174px] not-italic text-[#818ea6] text-[12px] top-[206px] whitespace-nowrap">Do</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[224px] not-italic text-[#818ea6] text-[12px] top-[206px] whitespace-nowrap">Vr</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[274px] not-italic text-[#818ea6] text-[12px] top-[206px] whitespace-nowrap">Za</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[324px] not-italic text-[#818ea6] text-[12px] top-[206px] whitespace-nowrap">Zo</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[127px] not-italic text-[#131826] text-[14px] top-[237px] whitespace-nowrap">1</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[177px] not-italic text-[#131826] text-[14px] top-[237px] whitespace-nowrap">2</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[227px] not-italic text-[#131826] text-[14px] top-[237px] whitespace-nowrap">3</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[277px] not-italic text-[#131826] text-[14px] top-[237px] whitespace-nowrap">4</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[327px] not-italic text-[#131826] text-[14px] top-[237px] whitespace-nowrap">5</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[27px] not-italic text-[#131826] text-[14px] top-[283px] whitespace-nowrap">6</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[77px] not-italic text-[#18bb67] text-[14px] top-[283px] whitespace-nowrap">7</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[127px] not-italic text-[#131826] text-[14px] top-[283px] whitespace-nowrap">8</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[177px] not-italic text-[#131826] text-[14px] top-[283px] whitespace-nowrap">9</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[227px] not-italic text-[#131826] text-[14px] top-[283px] whitespace-nowrap">10</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[277px] not-italic text-[#131826] text-[14px] top-[283px] whitespace-nowrap">11</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[327px] not-italic text-[#131826] text-[14px] top-[283px] whitespace-nowrap">12</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[27px] not-italic text-[#131826] text-[14px] top-[329px] whitespace-nowrap">13</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[77px] not-italic text-[#18bb67] text-[14px] top-[329px] whitespace-nowrap">14</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[127px] not-italic text-[#131826] text-[14px] top-[329px] whitespace-nowrap">15</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[177px] not-italic text-[#131826] text-[14px] top-[329px] whitespace-nowrap">16</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[227px] not-italic text-[#131826] text-[14px] top-[329px] whitespace-nowrap">17</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[277px] not-italic text-[#131826] text-[14px] top-[329px] whitespace-nowrap">18</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[327px] not-italic text-[#131826] text-[14px] top-[329px] whitespace-nowrap">19</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[27px] not-italic text-[#131826] text-[14px] top-[375px] whitespace-nowrap">20</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[77px] not-italic text-[14px] text-white top-[375px] whitespace-nowrap">21</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[127px] not-italic text-[#18bb67] text-[14px] top-[375px] whitespace-nowrap">22</p>
      <div className="absolute left-[170px] size-[36px] top-[366px]" data-name="Ellipse">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
          <circle cx="18" cy="18" fill="var(--fill-0, #FEE4E4)" id="Ellipse" r="18" />
        </svg>
      </div>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[177px] not-italic text-[#f03838] text-[14px] top-[375px] whitespace-nowrap">23</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[227px] not-italic text-[#131826] text-[14px] top-[375px] whitespace-nowrap">24</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[277px] not-italic text-[#131826] text-[14px] top-[375px] whitespace-nowrap">25</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[327px] not-italic text-[#131826] text-[14px] top-[375px] whitespace-nowrap">26</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[27px] not-italic text-[#131826] text-[14px] top-[421px] whitespace-nowrap">27</p>
      <div className="absolute left-[70px] size-[36px] top-[412px]" data-name="Ellipse">
        <Helper />
      </div>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[77px] not-italic text-[#18bb67] text-[14px] top-[421px] whitespace-nowrap">28</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[127px] not-italic text-[#131826] text-[14px] top-[421px] whitespace-nowrap">29</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[177px] not-italic text-[#131826] text-[14px] top-[421px] whitespace-nowrap">30</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[28px] not-italic text-[#818ea6] text-[10px] top-[484px] whitespace-nowrap">LEGENDA</p>
      <ScreenEllipse additionalClassNames="left-[28px]">
        <circle cx="5" cy="5" fill="var(--fill-0, #E0F9EC)" id="Ellipse" r="5" />
      </ScreenEllipse>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[42px] not-italic text-[#818ea6] text-[10px] top-[498px] whitespace-nowrap">Beschikbaar</p>
      <ScreenEllipse additionalClassNames="left-[140px]">
        <circle cx="5" cy="5" fill="var(--fill-0, #0365C4)" id="Ellipse" r="5" />
      </ScreenEllipse>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[154px] not-italic text-[#818ea6] text-[10px] top-[498px] whitespace-nowrap">Geselecteerd</p>
      <ScreenEllipse additionalClassNames="left-[252px]">
        <circle cx="5" cy="5" fill="var(--fill-0, #FEE4E4)" id="Ellipse" r="5" />
      </ScreenEllipse>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[266px] not-italic text-[#818ea6] text-[10px] top-[498px] whitespace-nowrap">Vol</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] not-italic text-[#131826] text-[14px] top-[554px] whitespace-nowrap">Maandag, 21 april 2026</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#44516b] text-[13px] top-[576px] whitespace-pre">{`⏰  15:00 – 15:30 (30 min)`}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#44516b] text-[13px] top-[596px] whitespace-pre">{`📍  De Bilt Zwembad`}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#44516b] text-[13px] top-[616px] whitespace-pre">{`👨‍🏫  Jan de Vries`}</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[135px] not-italic text-[15px] text-white top-[676px] whitespace-nowrap">Deze les boeken</p>
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
        <div className="absolute bg-[#f0f4fc] h-[52px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-89.064px] mask-size-[29.269px_11.213px] rounded-[12px] top-[108px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#0365c4] h-[52px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-89.064px] mask-size-[29.269px_11.213px] rounded-[2px] top-[108px] w-[4px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-161.064px] mask-size-[29.269px_11.213px] not-italic text-[#818ea6] text-[18px] top-[180px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ←
        </p>
        <MaskGroupEllipse additionalClassNames="left-[70px] mask-position-[-49.249px_-255.064px] top-[274px]" />
        <MaskGroupEllipse additionalClassNames="left-[70px] mask-position-[-49.249px_-301.064px] top-[320px]" />
        <div className="absolute left-[70px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-49.249px_-347.064px] mask-size-[29.269px_11.213px] size-[36px] top-[366px]" data-name="Ellipse" style={{ maskImage: `url('${imgWiFi}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
            <circle cx="18" cy="18" fill="var(--fill-0, #0365C4)" id="Ellipse" r="18" />
          </svg>
        </div>
        <MaskGroupEllipse additionalClassNames="left-[120px] mask-position-[-99.249px_-347.064px] top-[366px]" />
        <div className="absolute bg-white h-[52px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-455.064px] mask-size-[29.269px_11.213px] rounded-[10px] top-[474px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-white h-[104px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-521.064px] mask-size-[29.269px_11.213px] rounded-[16px] top-[540px] w-[350px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#0365c4] h-[104px] left-[20px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-521.064px] mask-size-[29.269px_11.213px] rounded-[2px] top-[540px] w-[4px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#0365c4] h-[48px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.249px_-641.064px] mask-size-[29.269px_11.213px] rounded-[14px] top-[660px] w-[342px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
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
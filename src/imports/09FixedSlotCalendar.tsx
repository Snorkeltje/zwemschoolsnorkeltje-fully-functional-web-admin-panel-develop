import clsx from "clsx";
import { imgWiFi } from "./svg-3rm2i";
type Component09FixedSlotCalendarEllipseProps = {
  additionalClassNames?: string;
};

function Component09FixedSlotCalendarEllipse({ children, additionalClassNames = "" }: React.PropsWithChildren<Component09FixedSlotCalendarEllipseProps>) {
  return (
    <div className={clsx("absolute size-[8px] top-[493px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        {children}
      </svg>
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div style={{ maskImage: `url('${imgWiFi}')` }} className={additionalClassNames}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        {children}
      </svg>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return <Wrapper1 additionalClassNames={clsx("absolute mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[29.269px_11.213px] size-[36px] top-[390px]", additionalClassNames)}>{children}</Wrapper1>;
}
type MaskGroupEllipseProps = {
  additionalClassNames?: string;
};

function MaskGroupEllipse({ additionalClassNames = "" }: MaskGroupEllipseProps) {
  return (
    <Wrapper1 additionalClassNames={clsx("absolute mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[29.269px_11.213px] size-[36px]", additionalClassNames)}>
      <circle cx="18" cy="18" fill="var(--fill-0, #E8F7ED)" id="Ellipse" r="18" />
    </Wrapper1>
  );
}

export default function Component09FixedSlotCalendar() {
  return (
    <div className="bg-[#f8f9fa] overflow-clip relative rounded-[44px] size-full" data-name="09 - Fixed Slot Calendar">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[147px] not-italic text-[#1a1a2e] text-[18px] top-[66px] whitespace-nowrap">My Fixed Slot</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[40px] not-italic text-[#1a6fbf] text-[13px] top-[128px] whitespace-nowrap">Your fixed slot: Monday at 15:00 - De Bilt</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[40px] not-italic text-[#4a4a6a] text-[12px] top-[150px] whitespace-nowrap">📍 De Bilt Swimming Pool</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[165px] not-italic text-[#1a1a2e] text-[16px] top-[200px] whitespace-nowrap">April 2026</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[388px] not-italic text-[#4a4a6a] text-[18px] top-[200px] whitespace-nowrap">→</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[24px] not-italic text-[#8e8ea0] text-[13px] top-[230px] whitespace-nowrap">Mo</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[78px] not-italic text-[#8e8ea0] text-[13px] top-[230px] whitespace-nowrap">Tu</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[132px] not-italic text-[#8e8ea0] text-[13px] top-[230px] whitespace-nowrap">We</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[186px] not-italic text-[#8e8ea0] text-[13px] top-[230px] whitespace-nowrap">Th</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[240px] not-italic text-[#8e8ea0] text-[13px] top-[230px] whitespace-nowrap">Fr</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[294px] not-italic text-[#8e8ea0] text-[13px] top-[230px] whitespace-nowrap">Sa</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[348px] not-italic text-[#8e8ea0] text-[13px] top-[230px] whitespace-nowrap">Su</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[136px] not-italic text-[#1a1a2e] text-[14px] top-[262px] whitespace-nowrap">1</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[190px] not-italic text-[#1a1a2e] text-[14px] top-[262px] whitespace-nowrap">2</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[244px] not-italic text-[#1a1a2e] text-[14px] top-[262px] whitespace-nowrap">3</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[298px] not-italic text-[#1a1a2e] text-[14px] top-[262px] whitespace-nowrap">4</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[352px] not-italic text-[#1a1a2e] text-[14px] top-[262px] whitespace-nowrap">5</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[28px] not-italic text-[#1a1a2e] text-[14px] top-[308px] whitespace-nowrap">6</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[82px] not-italic text-[#1a1a2e] text-[14px] top-[308px] whitespace-nowrap">7</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[136px] not-italic text-[#1a1a2e] text-[14px] top-[308px] whitespace-nowrap">8</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[190px] not-italic text-[#1a1a2e] text-[14px] top-[308px] whitespace-nowrap">9</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[244px] not-italic text-[#1a1a2e] text-[14px] top-[308px] whitespace-nowrap">10</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[298px] not-italic text-[#1a1a2e] text-[14px] top-[308px] whitespace-nowrap">11</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[352px] not-italic text-[#1a1a2e] text-[14px] top-[308px] whitespace-nowrap">12</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[28px] not-italic text-[#1a1a2e] text-[14px] top-[354px] whitespace-nowrap">13</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[82px] not-italic text-[#1a1a2e] text-[14px] top-[354px] whitespace-nowrap">14</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[136px] not-italic text-[#1a1a2e] text-[14px] top-[354px] whitespace-nowrap">15</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[190px] not-italic text-[#1a1a2e] text-[14px] top-[354px] whitespace-nowrap">16</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[244px] not-italic text-[#1a1a2e] text-[14px] top-[354px] whitespace-nowrap">17</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[298px] not-italic text-[#1a1a2e] text-[14px] top-[354px] whitespace-nowrap">18</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[352px] not-italic text-[#1a1a2e] text-[14px] top-[354px] whitespace-nowrap">19</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[28px] not-italic text-[#1a1a2e] text-[14px] top-[400px] whitespace-nowrap">20</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[82px] not-italic text-[14px] text-white top-[400px] whitespace-nowrap">21</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[136px] not-italic text-[#27ae60] text-[14px] top-[400px] whitespace-nowrap">22</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[190px] not-italic text-[#e74c3c] text-[14px] top-[400px] whitespace-nowrap">23</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[244px] not-italic text-[#1a1a2e] text-[14px] top-[400px] whitespace-nowrap">24</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[298px] not-italic text-[#1a1a2e] text-[14px] top-[400px] whitespace-nowrap">25</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[352px] not-italic text-[#1a1a2e] text-[14px] top-[400px] whitespace-nowrap">26</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[28px] not-italic text-[#1a1a2e] text-[14px] top-[446px] whitespace-nowrap">27</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[82px] not-italic text-[#27ae60] text-[14px] top-[446px] whitespace-nowrap">28</p>
      <div className="absolute left-[128px] size-[36px] top-[436px]" data-name="Ellipse">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
          <circle cx="18" cy="18" fill="var(--fill-0, #FEF3DB)" id="Ellipse" r="18" />
        </svg>
      </div>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[136px] not-italic text-[#f5a623] text-[14px] top-[446px] whitespace-nowrap">29</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[190px] not-italic text-[#1a1a2e] text-[14px] top-[446px] whitespace-nowrap">30</p>
      <Component09FixedSlotCalendarEllipse additionalClassNames="left-[24px]">
        <circle cx="4" cy="4" fill="var(--fill-0, #27AE60)" id="Ellipse" r="4" />
      </Component09FixedSlotCalendarEllipse>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[36px] not-italic text-[#8e8ea0] text-[12px] top-[490px] whitespace-nowrap">Available</p>
      <Component09FixedSlotCalendarEllipse additionalClassNames="left-[124px]">
        <circle cx="4" cy="4" fill="var(--fill-0, #E74C3C)" id="Ellipse" r="4" />
      </Component09FixedSlotCalendarEllipse>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[136px] not-italic text-[#8e8ea0] text-[12px] top-[490px] whitespace-nowrap">Full</p>
      <Component09FixedSlotCalendarEllipse additionalClassNames="left-[224px]">
        <circle cx="4" cy="4" fill="var(--fill-0, #F5A623)" id="Ellipse" r="4" />
      </Component09FixedSlotCalendarEllipse>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[236px] not-italic text-[#8e8ea0] text-[12px] top-[490px] whitespace-nowrap">Few left</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[40px] not-italic text-[#1a1a2e] text-[14px] top-[532px] whitespace-nowrap">Monday, 21 April 2026</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[40px] not-italic text-[#4a4a6a] text-[13px] top-[556px] whitespace-pre">{`⏰  15:00 - 15:30 (30 min)`}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[40px] not-italic text-[#4a4a6a] text-[13px] top-[578px] whitespace-pre">{`📍  De Bilt Swimming Pool`}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[40px] not-italic text-[#4a4a6a] text-[13px] top-[600px] whitespace-pre">{`👨‍🏫  Instructor Jan`}</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[151px] not-italic text-[15px] text-white top-[682px] whitespace-nowrap">Book this lesson</p>
      <div className="absolute contents left-[24px] top-[18px]" data-name="Mask group">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[350px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-325.249px_2.936px] mask-size-[29.269px_11.213px] not-italic text-[#1a1a2e] text-[13px] top-[18px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          WiFi 🔋
        </p>
        <div className="absolute bg-white h-[100px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[24.751px_20.936px] mask-size-[29.269px_11.213px] top-0 w-[430px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-43.064px] mask-size-[29.269px_11.213px] not-italic text-[#1a1a2e] text-[22px] top-[64px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ←
        </p>
        <div className="absolute bg-[#e8f4fd] h-[64px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-91.064px] mask-size-[29.269px_11.213px] rounded-[12px] top-[112px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-179.064px] mask-size-[29.269px_11.213px] not-italic text-[#4a4a6a] text-[18px] top-[200px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ←
        </p>
        <Wrapper additionalClassNames="left-[74px] mask-position-[-49.249px_-369.064px]">
          <circle cx="18" cy="18" fill="var(--fill-0, #1A6FBF)" id="Ellipse" r="18" />
        </Wrapper>
        <MaskGroupEllipse additionalClassNames="left-[128px] mask-position-[-103.249px_-369.064px] top-[390px]" />
        <Wrapper additionalClassNames="left-[182px] mask-position-[-157.249px_-369.064px]">
          <circle cx="18" cy="18" fill="var(--fill-0, #FCE8E8)" id="Ellipse" r="18" />
        </Wrapper>
        <MaskGroupEllipse additionalClassNames="left-[74px] mask-position-[-49.249px_-415.064px] top-[436px]" />
        <div className="absolute bg-white h-[120px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-499.064px] mask-size-[29.269px_11.213px] rounded-[12px] top-[520px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#1a6fbf] h-[52px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-645.064px] mask-size-[29.269px_11.213px] rounded-[12px] top-[666px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-white h-[84px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[24.751px_-827.064px] mask-size-[29.269px_11.213px] top-[848px] w-[430px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#e5e7eb] h-px left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[24.751px_-827.064px] mask-size-[29.269px_11.213px] top-[848px] w-[430px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular','Noto_Sans_Symbols:Regular',sans-serif] font-normal leading-[normal] left-[41.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-16.999px_-839.064px] mask-size-[29.269px_11.213px] not-italic text-[#8e8ea0] text-[22px] top-[860px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ⌂
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[35.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10.999px_-865.064px] mask-size-[29.269px_11.213px] not-italic text-[#8e8ea0] text-[11px] top-[886px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          Home
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[149.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-124.499px_-839.064px] mask-size-[29.269px_11.213px] not-italic text-[#1a6fbf] text-[22px] top-[860px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          📅
        </p>
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[143.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-118.499px_-865.064px] mask-size-[29.269px_11.213px] not-italic text-[#1a6fbf] text-[11px] top-[886px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          Book
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[256.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-231.999px_-839.064px] mask-size-[29.269px_11.213px] not-italic text-[#8e8ea0] text-[22px] top-[860px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          🎫
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[250.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-225.999px_-865.064px] mask-size-[29.269px_11.213px] not-italic text-[#8e8ea0] text-[11px] top-[886px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          Tickets
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[364.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-339.499px_-839.064px] mask-size-[29.269px_11.213px] not-italic text-[#8e8ea0] text-[22px] top-[860px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          👤
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[358.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-333.499px_-865.064px] mask-size-[29.269px_11.213px] not-italic text-[#8e8ea0] text-[11px] top-[886px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          Profile
        </p>
      </div>
    </div>
  );
}
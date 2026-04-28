import clsx from "clsx";
import { imgWiFi } from "./svg-qh4wd";
type MaskGroupEllipseProps = {
  additionalClassNames?: string;
};

function MaskGroupEllipse({ children, additionalClassNames = "" }: React.PropsWithChildren<MaskGroupEllipseProps>) {
  return (
    <div style={{ maskImage: `url('${imgWiFi}')` }} className={clsx("absolute left-[36px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[29.269px_11.212px] size-[52px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
        {children}
      </svg>
    </div>
  );
}

function Helper() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 22 22" className="absolute block size-full">
      <circle cx="11" cy="11" fill="var(--fill-0, #1A6FBF)" id="Ellipse" r="11" />
    </svg>
  );
}

export default function Component38ChatList() {
  return (
    <div className="bg-[#f8f9fa] overflow-clip relative rounded-[44px] size-full" data-name="38 - Chat List">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[165px] not-italic text-[#1a1a2e] text-[18px] top-[66px] whitespace-nowrap">Messages</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[374px] not-italic text-[#1a6fbf] text-[20px] top-[66px] whitespace-nowrap">✏️</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[52px] not-italic text-[#1a6fbf] text-[22px] top-[136px] whitespace-nowrap">J</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[100px] not-italic text-[#1a1a2e] text-[14px] top-[126px] whitespace-nowrap">Jan de Vries</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[100px] not-italic text-[#8e8ea0] text-[11px] top-[146px] whitespace-nowrap">Your Instructor</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[100px] not-italic text-[#4a4a6a] text-[12px] top-[166px] whitespace-nowrap">See you Monday at 15:00 🏊</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[354px] not-italic text-[#8e8ea0] text-[11px] top-[126px] whitespace-nowrap">14:33</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[381px] not-italic text-[11px] text-white top-[153px] whitespace-nowrap">2</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[52px] not-italic text-[#27ae60] text-[22px] top-[224px] whitespace-nowrap">M</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[100px] not-italic text-[#1a1a2e] text-[14px] top-[214px] whitespace-nowrap">Maria Jansen</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[100px] not-italic text-[#8e8ea0] text-[11px] top-[234px] whitespace-nowrap">Extra Lesson Instructor</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[100px] not-italic text-[#4a4a6a] text-[12px] top-[254px] whitespace-nowrap">Great session today! Sami really...</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[354px] not-italic text-[#8e8ea0] text-[11px] top-[214px] whitespace-nowrap">Yesterday</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[52px] not-italic text-[#f5a623] text-[22px] top-[312px] whitespace-nowrap">S</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[100px] not-italic text-[#1a1a2e] text-[14px] top-[302px] whitespace-nowrap">Snorkeltje Admin</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[100px] not-italic text-[#8e8ea0] text-[11px] top-[322px] whitespace-nowrap">School Administration</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[100px] not-italic text-[#4a4a6a] text-[12px] top-[342px] whitespace-nowrap">Your punch card expires in 30 days.</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[354px] not-italic text-[#8e8ea0] text-[11px] top-[302px] whitespace-nowrap">2d</p>
      <div className="absolute left-[374px] size-[22px] top-[326px]" data-name="Ellipse">
        <Helper />
      </div>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[382px] not-italic text-[11px] text-white top-[329px] whitespace-nowrap">1</p>
      <div className="absolute contents left-[24px] top-[18px]" data-name="Mask group">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[350px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-325.249px_2.937px] mask-size-[29.269px_11.212px] not-italic text-[#1a1a2e] text-[13px] top-[18px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          WiFi 🔋
        </p>
        <div className="absolute bg-white h-[100px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[24.751px_20.937px] mask-size-[29.269px_11.212px] top-0 w-[430px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-white h-[78px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-91.063px] mask-size-[29.269px_11.212px] rounded-[10px] top-[112px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#e5e7eb] h-px left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-169.063px] mask-size-[29.269px_11.212px] top-[190px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-11.249px_-103.063px] top-[124px]">
          <circle cx="26" cy="26" fill="var(--fill-0, #E8F4FD)" id="Ellipse" r="26" />
        </MaskGroupEllipse>
        <div className="absolute left-[374px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-349.249px_-129.063px] mask-size-[29.269px_11.212px] size-[22px] top-[150px]" data-name="Ellipse" style={{ maskImage: `url('${imgWiFi}')` }}>
          <Helper />
        </div>
        <div className="absolute bg-white h-[78px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-179.063px] mask-size-[29.269px_11.212px] rounded-[10px] top-[200px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#e5e7eb] h-px left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-257.063px] mask-size-[29.269px_11.212px] top-[278px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-11.249px_-191.063px] top-[212px]">
          <circle cx="26" cy="26" fill="var(--fill-0, #E8F7ED)" id="Ellipse" r="26" />
        </MaskGroupEllipse>
        <div className="absolute bg-white h-[78px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-267.063px] mask-size-[29.269px_11.212px] rounded-[10px] top-[288px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#e5e7eb] h-px left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-345.063px] mask-size-[29.269px_11.212px] top-[366px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-11.249px_-279.063px] top-[300px]">
          <circle cx="26" cy="26" fill="var(--fill-0, #FEF3DB)" id="Ellipse" r="26" />
        </MaskGroupEllipse>
        <div className="absolute bg-white h-[84px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[24.751px_-827.063px] mask-size-[29.269px_11.212px] top-[848px] w-[430px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#e5e7eb] h-px left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[24.751px_-827.063px] mask-size-[29.269px_11.212px] top-[848px] w-[430px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular','Noto_Sans_Symbols:Regular',sans-serif] font-normal leading-[normal] left-[43.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-18.999px_-839.063px] mask-size-[29.269px_11.212px] not-italic text-[#1a6fbf] text-[22px] top-[860px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ⌂
        </p>
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[37.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-12.999px_-865.063px] mask-size-[29.269px_11.212px] not-italic text-[#1a6fbf] text-[11px] top-[886px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          Home
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[151.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-126.499px_-839.063px] mask-size-[29.269px_11.212px] not-italic text-[#8e8ea0] text-[22px] top-[860px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          📅
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[145.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-120.499px_-865.063px] mask-size-[29.269px_11.212px] not-italic text-[#8e8ea0] text-[11px] top-[886px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          Book
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[258.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-233.999px_-839.063px] mask-size-[29.269px_11.212px] not-italic text-[#8e8ea0] text-[22px] top-[860px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          🎫
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[252.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-227.999px_-865.063px] mask-size-[29.269px_11.212px] not-italic text-[#8e8ea0] text-[11px] top-[886px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          Tickets
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[366.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-341.499px_-839.063px] mask-size-[29.269px_11.212px] not-italic text-[#8e8ea0] text-[22px] top-[860px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          👤
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[360.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-335.499px_-865.063px] mask-size-[29.269px_11.212px] not-italic text-[#8e8ea0] text-[11px] top-[886px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          Profile
        </p>
      </div>
    </div>
  );
}
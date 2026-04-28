import clsx from "clsx";
import { imgWiFi } from "./svg-cwo04";
type Component20NotificationsEllipseProps = {
  additionalClassNames?: string;
};

function Component20NotificationsEllipse({ additionalClassNames = "" }: Component20NotificationsEllipseProps) {
  return (
    <div className={clsx("absolute left-[44px] size-[40px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <circle cx="20" cy="20" fill="var(--fill-0, #DFF3E7)" id="Ellipse" r="20" />
      </svg>
    </div>
  );
}

function Helper1() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 40 40" className="absolute block size-full">
      <circle cx="20" cy="20" fill="var(--fill-0, #DDE9F5)" id="Ellipse" r="20" />
    </svg>
  );
}

function Helper() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 8 8" className="absolute block size-full">
      <circle cx="4" cy="4" fill="var(--fill-0, #1A6FBF)" id="Ellipse" r="4" />
    </svg>
  );
}
type MaskGroupEllipseProps = {
  additionalClassNames?: string;
};

function MaskGroupEllipse({ additionalClassNames = "" }: MaskGroupEllipseProps) {
  return (
    <div style={{ maskImage: `url('${imgWiFi}')` }} className={clsx("absolute left-[30px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[29.269px_11.213px] size-[8px]", additionalClassNames)}>
      <Helper />
    </div>
  );
}

export default function Component20Notifications() {
  return (
    <div className="bg-[#f8f9fa] overflow-clip relative rounded-[44px] size-full" data-name="20 - Notifications">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[143px] not-italic text-[#1a1a2e] text-[18px] top-[66px] whitespace-nowrap">Notifications</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[320px] not-italic text-[#1a6fbf] text-[13px] top-[68px] whitespace-nowrap">Mark all read</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[24px] not-italic text-[#8e8ea0] text-[13px] top-[110px] whitespace-nowrap">Today</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[96px] not-italic text-[#1a1a2e] text-[13px] top-[146px] whitespace-nowrap">Lesson Reminder</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[96px] not-italic text-[#4a4a6a] text-[11px] top-[168px] whitespace-nowrap">Tomorrow Monday at 15:00 — De Bilt</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[366px] not-italic text-[#8e8ea0] text-[11px] top-[146px] whitespace-nowrap">Now</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[48px] not-italic text-[#f5a623] text-[20px] top-[230px] whitespace-nowrap">📊</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[96px] not-italic text-[#1a1a2e] text-[13px] top-[224px] whitespace-nowrap">Progress Updated</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[96px] not-italic text-[#4a4a6a] text-[11px] top-[246px] whitespace-nowrap">{`Jan updated Sami's progress for today's lesson`}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[366px] not-italic text-[#8e8ea0] text-[11px] top-[224px] whitespace-nowrap">2h</p>
      <div className="absolute left-[30px] size-[8px] top-[316px]" data-name="Ellipse">
        <Helper />
      </div>
      <div className="absolute left-[44px] size-[40px] top-[300px]" data-name="Ellipse">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <circle cx="20" cy="20" fill="var(--fill-0, #FBE4E2)" id="Ellipse" r="20" />
        </svg>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[48px] not-italic text-[#e74c3c] text-[20px] top-[308px] whitespace-nowrap">💳</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[96px] not-italic text-[#1a1a2e] text-[13px] top-[302px] whitespace-nowrap">Punch Card</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[96px] not-italic text-[#4a4a6a] text-[11px] top-[324px] whitespace-nowrap">Punch card is running low: 3 lessons remaining</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[366px] not-italic text-[#8e8ea0] text-[11px] top-[302px] whitespace-nowrap">1d</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[24px] not-italic text-[#8e8ea0] text-[13px] top-[348px] whitespace-nowrap">Earlier</p>
      <Component20NotificationsEllipse additionalClassNames="top-[378px]" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[48px] not-italic text-[#27ae60] text-[20px] top-[386px] whitespace-nowrap">✅</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[96px] not-italic text-[#1a1a2e] text-[13px] top-[380px] whitespace-nowrap">Lesson Booked</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[96px] not-italic text-[#4a4a6a] text-[11px] top-[402px] whitespace-nowrap">Extra 1-on-1 lesson booked for 30 April at 16:00</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[366px] not-italic text-[#8e8ea0] text-[11px] top-[380px] whitespace-nowrap">2d</p>
      <Component20NotificationsEllipse additionalClassNames="top-[456px]" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[48px] not-italic text-[#27ae60] text-[20px] top-[464px] whitespace-nowrap">💰</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[96px] not-italic text-[#1a1a2e] text-[13px] top-[458px] whitespace-nowrap">Refund Received</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[96px] not-italic text-[#4a4a6a] text-[11px] top-[480px] whitespace-nowrap">€5.00 refund — lesson converted to 1-on-2</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[366px] not-italic text-[#8e8ea0] text-[11px] top-[458px] whitespace-nowrap">3d</p>
      <div className="absolute left-[44px] size-[40px] top-[534px]" data-name="Ellipse">
        <Helper1 />
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[96px] not-italic text-[#1a1a2e] text-[13px] top-[536px] whitespace-nowrap">New Message</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[96px] not-italic text-[#4a4a6a] text-[11px] top-[558px] whitespace-nowrap">Jan de Vries: See you Monday at 15:00 🏊</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[366px] not-italic text-[#8e8ea0] text-[11px] top-[536px] whitespace-nowrap">3d</p>
      <div className="absolute contents left-[24px] top-[18px]" data-name="Mask group">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[350px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-325.249px_2.937px] mask-size-[29.269px_11.213px] not-italic text-[#1a1a2e] text-[13px] top-[18px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          WiFi 🔋
        </p>
        <div className="absolute bg-white h-[100px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[24.751px_20.937px] mask-size-[29.269px_11.213px] top-0 w-[430px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#f5f7fc] h-[66px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-111.063px] mask-size-[29.269px_11.213px] rounded-[10px] top-[132px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-5.249px_-139.063px] top-[160px]" />
        <div className="absolute left-[44px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-19.249px_-123.063px] mask-size-[29.269px_11.213px] size-[40px] top-[144px]" data-name="Ellipse" style={{ maskImage: `url('${imgWiFi}')` }}>
          <Helper1 />
        </div>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[48px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-23.249px_-131.063px] mask-size-[29.269px_11.213px] not-italic text-[#1a6fbf] text-[20px] top-[152px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          📅
        </p>
        <div className="absolute bg-[#f5f7fc] h-[66px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-189.063px] mask-size-[29.269px_11.213px] rounded-[10px] top-[210px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-5.249px_-217.063px] top-[238px]" />
        <div className="absolute left-[44px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-19.249px_-201.063px] mask-size-[29.269px_11.213px] size-[40px] top-[222px]" data-name="Ellipse" style={{ maskImage: `url('${imgWiFi}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
            <circle cx="20" cy="20" fill="var(--fill-0, #FEF2DE)" id="Ellipse" r="20" />
          </svg>
        </div>
        <div className="absolute bg-[#f5f7fc] h-[66px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-267.063px] mask-size-[29.269px_11.213px] rounded-[10px] top-[288px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-white h-[66px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-345.063px] mask-size-[29.269px_11.213px] rounded-[10px] top-[366px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-white h-[66px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-423.063px] mask-size-[29.269px_11.213px] rounded-[10px] top-[444px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-white h-[66px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-501.063px] mask-size-[29.269px_11.213px] rounded-[10px] top-[522px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[48px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-23.249px_-521.063px] mask-size-[29.269px_11.213px] not-italic text-[#1a6fbf] text-[20px] top-[542px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          💬
        </p>
        <div className="absolute bg-white h-[84px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[24.751px_-827.063px] mask-size-[29.269px_11.213px] top-[848px] w-[430px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#e5e7eb] h-px left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[24.751px_-827.063px] mask-size-[29.269px_11.213px] top-[848px] w-[430px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular','Noto_Sans_Symbols:Regular',sans-serif] font-normal leading-[normal] left-[43.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-18.999px_-839.063px] mask-size-[29.269px_11.213px] not-italic text-[#1a6fbf] text-[22px] top-[860px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ⌂
        </p>
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[37.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-12.999px_-865.063px] mask-size-[29.269px_11.213px] not-italic text-[#1a6fbf] text-[11px] top-[886px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          Home
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[151.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-126.499px_-839.063px] mask-size-[29.269px_11.213px] not-italic text-[#8e8ea0] text-[22px] top-[860px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          📅
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[145.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-120.499px_-865.063px] mask-size-[29.269px_11.213px] not-italic text-[#8e8ea0] text-[11px] top-[886px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          Book
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[258.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-233.999px_-839.063px] mask-size-[29.269px_11.213px] not-italic text-[#8e8ea0] text-[22px] top-[860px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          🎫
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[252.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-227.999px_-865.063px] mask-size-[29.269px_11.213px] not-italic text-[#8e8ea0] text-[11px] top-[886px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          Tickets
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[366.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-341.499px_-839.063px] mask-size-[29.269px_11.213px] not-italic text-[#8e8ea0] text-[22px] top-[860px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          👤
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[360.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-335.499px_-865.063px] mask-size-[29.269px_11.213px] not-italic text-[#8e8ea0] text-[11px] top-[886px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          Profile
        </p>
      </div>
    </div>
  );
}
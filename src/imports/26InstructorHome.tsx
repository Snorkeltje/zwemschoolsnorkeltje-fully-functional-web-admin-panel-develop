import clsx from "clsx";
import { imgWiFi } from "./svg-ymqzh";
type MaskGroupEllipseProps = {
  additionalClassNames?: string;
};

function MaskGroupEllipse({ children, additionalClassNames = "" }: React.PropsWithChildren<MaskGroupEllipseProps>) {
  return (
    <div style={{ maskImage: `url('${imgWiFi}')` }} className={clsx("absolute mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[29.269px_11.212px] size-[32px] top-[266px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        {children}
      </svg>
    </div>
  );
}

export default function Component26InstructorHome() {
  return (
    <div className="bg-[#0f1117] overflow-clip relative rounded-[44px] size-full" data-name="26 - Instructor Home">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[38px] not-italic text-[18px] text-white top-[65px] whitespace-nowrap">J</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[78px] not-italic text-[#808c99] text-[12px] top-[56px] whitespace-nowrap">Good morning,</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[78px] not-italic text-[15px] text-white top-[72px] whitespace-nowrap">Jan de Vries</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[374px] not-italic text-[22px] text-white top-[62px] whitespace-nowrap">🔔</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[40px] not-italic text-[13px] text-white top-[124px] whitespace-nowrap">Today — Monday 28 April</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[40px] not-italic text-[32px] text-white top-[146px] whitespace-nowrap">8</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[86px] not-italic text-[#ffe5b2] text-[13px] top-[162px] whitespace-nowrap">lessons</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[215px] not-italic text-[32px] text-white top-[146px] whitespace-nowrap">12</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[261px] not-italic text-[#ffe5b2] text-[13px] top-[162px] whitespace-nowrap">students</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[270px] not-italic text-[13px] text-white top-[150px] whitespace-nowrap">Next in 45 min →</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[24px] not-italic text-[#808c99] text-[14px] top-[232px] whitespace-nowrap">Next Lesson</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[40px] not-italic text-[#f5a623] text-[14px] top-[266px] whitespace-nowrap">15:00 - 15:30</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[40px] not-italic text-[13px] text-white top-[290px] whitespace-nowrap">De Bilt Swimming Pool</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[40px] not-italic text-[#808c99] text-[12px] top-[312px] whitespace-nowrap">3 students</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[286px] not-italic text-[#f5a623] text-[13px] top-[290px] whitespace-nowrap">View Details →</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[358px] not-italic text-[14px] text-white top-[275px] whitespace-nowrap">S</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[376px] not-italic text-[14px] text-white top-[275px] whitespace-nowrap">K</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[394px] not-italic text-[14px] text-white top-[275px] whitespace-nowrap">L</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[24px] not-italic text-[#808c99] text-[14px] top-[374px] whitespace-nowrap">{`Today's Schedule`}</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] not-italic text-[#f5a623] text-[14px] top-[418px] whitespace-nowrap">13:00</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[88px] not-italic text-[13px] text-white top-[410px] whitespace-nowrap">De Bilt</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[88px] not-italic text-[#808c99] text-[11px] top-[430px] whitespace-nowrap">2 students</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[348px] not-italic text-[#f5a623] text-[11px] top-[419px] whitespace-nowrap">1-on-2</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] not-italic text-[#f5a623] text-[14px] top-[480px] whitespace-nowrap">14:00</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[88px] not-italic text-[13px] text-white top-[472px] whitespace-nowrap">De Bilt</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[88px] not-italic text-[#808c99] text-[11px] top-[492px] whitespace-nowrap">1 student</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[348px] not-italic text-[#f5a623] text-[11px] top-[481px] whitespace-nowrap">1-on-1</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] not-italic text-[#f5a623] text-[14px] top-[542px] whitespace-nowrap">15:00</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[88px] not-italic text-[13px] text-white top-[534px] whitespace-nowrap">De Bilt</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[88px] not-italic text-[#808c99] text-[11px] top-[554px] whitespace-nowrap">3 students</p>
      <div className="absolute bg-[#333847] h-[22px] left-[340px] rounded-[11px] top-[538px] w-[58px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[348px] not-italic text-[#f5a623] text-[11px] top-[543px] whitespace-nowrap">Group</p>
      <div className="absolute bg-[#1a1f29] h-[54px] left-[24px] rounded-[10px] top-[586px] w-[382px]" data-name="Rectangle" />
      <div className="absolute bg-[#f5a623] h-[54px] left-[24px] rounded-[2px] top-[586px] w-[4px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[36px] not-italic text-[#f5a623] text-[14px] top-[604px] whitespace-nowrap">16:00</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[88px] not-italic text-[13px] text-white top-[596px] whitespace-nowrap">Bad Hulckesteijn</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[88px] not-italic text-[#808c99] text-[11px] top-[616px] whitespace-nowrap">2 students</p>
      <div className="absolute bg-[#333847] h-[22px] left-[340px] rounded-[11px] top-[600px] w-[58px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[348px] not-italic text-[#f5a623] text-[11px] top-[605px] whitespace-nowrap">1-on-2</p>
      <div className="absolute bg-[#4d260d] h-[36px] left-[24px] rounded-[8px] top-[660px] w-[382px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[40px] not-italic text-[#27ae60] text-[13px] top-[671px] whitespace-pre">{`📶  Online — All data synced`}</p>
      <div className="absolute bg-[#0f1117] h-[84px] left-0 top-[848px] w-[430px]" data-name="Rectangle" />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[33.75px] not-italic text-[#f5a623] text-[11px] top-[886px] whitespace-nowrap">Schedule</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[151.25px] not-italic text-[#808c99] text-[22px] top-[860px] whitespace-nowrap">👥</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[141.25px] not-italic text-[#808c99] text-[11px] top-[886px] whitespace-nowrap">Students</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[248.75px] not-italic text-[#808c99] text-[11px] top-[886px] whitespace-nowrap">Messages</p>
      <div className="absolute contents left-[24px] top-[18px]" data-name="Mask group">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[350px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-325.249px_2.937px] mask-size-[29.269px_11.212px] not-italic text-[13px] text-white top-[18px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          WiFi 🔋
        </p>
        <div className="absolute left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-33.063px] mask-size-[29.269px_11.212px] size-[44px] top-[54px]" data-name="Ellipse" style={{ maskImage: `url('${imgWiFi}')` }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
            <circle cx="22" cy="22" fill="var(--fill-0, #F5A623)" id="Ellipse" r="22" />
          </svg>
        </div>
        <div className="absolute bg-[#f5a623] h-[100px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-91.063px] mask-size-[29.269px_11.212px] rounded-[14px] top-[112px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#1a1f29] h-[100px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-233.063px] mask-size-[29.269px_11.212px] rounded-[12px] top-[254px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="left-[350px] mask-position-[-325.249px_-245.063px]">
          <circle cx="16" cy="16" fill="var(--fill-0, #1A6FBF)" id="Ellipse" r="16" />
        </MaskGroupEllipse>
        <MaskGroupEllipse additionalClassNames="left-[368px] mask-position-[-343.249px_-245.063px]">
          <circle cx="16" cy="16" fill="var(--fill-0, #27AE60)" id="Ellipse" r="16" />
        </MaskGroupEllipse>
        <MaskGroupEllipse additionalClassNames="left-[386px] mask-position-[-361.249px_-245.063px]">
          <circle cx="16" cy="16" fill="var(--fill-0, #F5A623)" id="Ellipse" r="16" />
        </MaskGroupEllipse>
        <div className="absolute bg-[#1a1f29] h-[54px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-379.063px] mask-size-[29.269px_11.212px] rounded-[10px] top-[400px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#f5a623] h-[54px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-379.063px] mask-size-[29.269px_11.212px] rounded-[2px] top-[400px] w-[4px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#333847] h-[22px] left-[340px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-315.249px_-393.063px] mask-size-[29.269px_11.212px] rounded-[11px] top-[414px] w-[58px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#1a1f29] h-[54px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-441.063px] mask-size-[29.269px_11.212px] rounded-[10px] top-[462px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#f5a623] h-[54px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-441.063px] mask-size-[29.269px_11.212px] rounded-[2px] top-[462px] w-[4px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#333847] h-[22px] left-[340px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-315.249px_-455.063px] mask-size-[29.269px_11.212px] rounded-[11px] top-[476px] w-[58px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#1a1f29] h-[54px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-503.063px] mask-size-[29.269px_11.212px] rounded-[10px] top-[524px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#f5a623] h-[54px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-503.063px] mask-size-[29.269px_11.212px] rounded-[2px] top-[524px] w-[4px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[43.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-18.999px_-839.063px] mask-size-[29.269px_11.212px] not-italic text-[#f5a623] text-[22px] top-[860px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          📅
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[258.75px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-233.999px_-839.063px] mask-size-[29.269px_11.212px] not-italic text-[#808c99] text-[22px] top-[860px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          💬
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[366.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-341.499px_-839.063px] mask-size-[29.269px_11.212px] not-italic text-[#808c99] text-[22px] top-[860px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          👤
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[356.25px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-331.499px_-865.063px] mask-size-[29.269px_11.212px] not-italic text-[#808c99] text-[11px] top-[886px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          Profile
        </p>
      </div>
    </div>
  );
}
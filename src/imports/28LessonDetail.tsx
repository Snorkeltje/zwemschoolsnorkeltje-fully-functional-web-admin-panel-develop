import clsx from "clsx";
import { imgWiFi } from "./svg-eliir";
type MaskGroupEllipseProps = {
  additionalClassNames?: string;
};

function MaskGroupEllipse({ children, additionalClassNames = "" }: React.PropsWithChildren<MaskGroupEllipseProps>) {
  return (
    <div style={{ maskImage: `url('${imgWiFi}')` }} className={clsx("absolute left-[40px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[29.269px_11.212px] size-[48px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        {children}
      </svg>
    </div>
  );
}

export default function Component28LessonDetail() {
  return (
    <div className="bg-[#0f1117] overflow-clip relative rounded-[44px] size-full" data-name="28 - Lesson Detail">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[143px] not-italic text-[18px] text-white top-[66px] whitespace-nowrap">De Bilt — 15:00</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[40px] not-italic text-[13px] text-white top-[122px] whitespace-pre">{`Monday 28 April 2026  ·  15:00 - 15:30`}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[40px] not-italic text-[#ffe5b2] text-[12px] top-[146px] whitespace-pre">{`1-on-2 Lesson  ·  De Bilt Swimming Pool`}</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[320px] not-italic text-[12px] text-white top-[130px] whitespace-nowrap">2/2 students</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[24px] not-italic text-[#808c99] text-[14px] top-[210px] whitespace-nowrap">Students today</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[56px] not-italic text-[22px] text-white top-[264px] whitespace-nowrap">S</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[100px] not-italic text-[15px] text-white top-[256px] whitespace-nowrap">Sami Khilji</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[100px] not-italic text-[#808c99] text-[12px] top-[278px] whitespace-nowrap">Age 7</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[112px] not-italic text-[11px] text-white top-[303px] whitespace-nowrap">Intermediate</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[40px] not-italic text-[#808c99] text-[12px] top-[330px] whitespace-nowrap">{`Today's Goal:`}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[40px] not-italic text-[13px] text-white top-[348px] whitespace-nowrap">Breathing coordination</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[40px] not-italic text-[13px] text-white top-[401px] whitespace-nowrap">Update Progress →</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[56px] not-italic text-[22px] text-white top-[464px] whitespace-nowrap">L</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[100px] not-italic text-[15px] text-white top-[456px] whitespace-nowrap">Lisa Bos</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[100px] not-italic text-[#808c99] text-[12px] top-[478px] whitespace-nowrap">Age 8</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[112px] not-italic text-[11px] text-white top-[503px] whitespace-nowrap">Beginner</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[40px] not-italic text-[#808c99] text-[12px] top-[530px] whitespace-nowrap">{`Today's Goal:`}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[40px] not-italic text-[13px] text-white top-[548px] whitespace-nowrap">Floating and kicks</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[40px] not-italic text-[13px] text-white top-[601px] whitespace-nowrap">Update Progress →</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[33.75px] not-italic text-[#f5a623] text-[11px] top-[886px] whitespace-nowrap">Schedule</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[151.25px] not-italic text-[#808c99] text-[22px] top-[860px] whitespace-nowrap">👥</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[141.25px] not-italic text-[#808c99] text-[11px] top-[886px] whitespace-nowrap">Students</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[248.75px] not-italic text-[#808c99] text-[11px] top-[886px] whitespace-nowrap">Messages</p>
      <div className="absolute contents left-[24px] top-[18px]" data-name="Mask group">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[350px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-325.249px_2.937px] mask-size-[29.269px_11.212px] not-italic text-[13px] text-white top-[18px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          WiFi 🔋
        </p>
        <div className="absolute bg-[#1a1f29] h-[100px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[24.751px_20.937px] mask-size-[29.269px_11.212px] top-0 w-[430px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-43.063px] mask-size-[29.269px_11.212px] not-italic text-[22px] text-white top-[64px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ←
        </p>
        <div className="absolute bg-[#f5a623] h-[80px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-89.063px] mask-size-[29.269px_11.212px] rounded-[12px] top-[110px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#1a1f29] h-[180px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-217.063px] mask-size-[29.269px_11.212px] rounded-[14px] top-[238px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-15.249px_-233.063px] top-[254px]">
          <circle cx="24" cy="24" fill="var(--fill-0, #1A6FBF)" id="Ellipse" r="24" />
        </MaskGroupEllipse>
        <div className="absolute bg-[#1a6fbf] h-[22px] left-[100px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-75.249px_-277.063px] mask-size-[29.269px_11.212px] rounded-[11px] top-[298px] w-[100px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#f5a623] h-[40px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-371.063px] mask-size-[29.269px_11.212px] rounded-[8px] top-[392px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#1a1f29] h-[180px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-417.063px] mask-size-[29.269px_11.212px] rounded-[14px] top-[438px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <MaskGroupEllipse additionalClassNames="mask-position-[-15.249px_-433.063px] top-[454px]">
          <circle cx="24" cy="24" fill="var(--fill-0, #27AE60)" id="Ellipse" r="24" />
        </MaskGroupEllipse>
        <div className="absolute bg-[#27ae60] h-[22px] left-[100px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-75.249px_-477.063px] mask-size-[29.269px_11.212px] rounded-[11px] top-[498px] w-[100px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#f5a623] h-[40px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-571.063px] mask-size-[29.269px_11.212px] rounded-[8px] top-[592px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#0f1117] h-[84px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[24.751px_-827.063px] mask-size-[29.269px_11.212px] top-[848px] w-[430px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
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
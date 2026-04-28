import { img } from "./svg-es9np";

export default function Component02Onboarding() {
  return (
    <div className="bg-white overflow-clip relative rounded-[44px] size-full" data-name="02 - Onboarding 1">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[255px] not-italic text-[#1a6fbf] text-[50px] top-[200px] whitespace-nowrap">🏊</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[125px] not-italic text-[#27ae60] text-[44px] top-[180px] whitespace-nowrap">✅</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[360px] not-italic text-[#8e8ea0] text-[15px] top-[60px] whitespace-nowrap">Skip</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[19px] not-italic text-[#1a1a2e] text-[26px] top-[454px] whitespace-nowrap">Book lessons anytime</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[19px] not-italic text-[#4a4a6a] text-[14px] top-[499px] whitespace-nowrap">Fixed slots, extra lessons, and holiday classes all in one app.</p>
      <div className="absolute contents left-0 top-0" data-name="Mask group">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[175px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-175px_-120px] mask-size-[430px_420px] not-italic text-[#1a6fbf] text-[80px] top-[120px] whitespace-nowrap" style={{ maskImage: `url('${img}')` }}>
          📅
        </p>
        <div className="absolute bg-[#1a6fbf] h-[8px] left-[195px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-195px_-636px] mask-size-[430px_420px] rounded-[4px] top-[636px] w-[24px]" data-name="Rectangle" style={{ maskImage: `url('${img}')` }} />
        <div className="absolute bg-[#e5e7eb] left-[211px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-211px_-636px] mask-size-[430px_420px] rounded-[4px] size-[8px] top-[636px]" data-name="Rectangle" style={{ maskImage: `url('${img}')` }} />
        <div className="absolute bg-[#e5e7eb] left-[227px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-227px_-636px] mask-size-[430px_420px] rounded-[4px] size-[8px] top-[636px]" data-name="Rectangle" style={{ maskImage: `url('${img}')` }} />
        <div className="absolute bg-[#1a6fbf] h-[52px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-24px_-700px] mask-size-[430px_420px] rounded-[12px] top-[700px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${img}')` }} />
      </div>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[191px] not-italic text-[15px] text-white top-[716px] whitespace-nowrap">Next →</p>
    </div>
  );
}
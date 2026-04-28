import { imgRectangle } from "./svg-2rc7x";

export default function Component03Onboarding() {
  return (
    <div className="bg-white overflow-clip relative rounded-[44px] size-full" data-name="03 - Onboarding 2">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[155px] not-italic text-[#f5a623] text-[70px] top-[130px] whitespace-nowrap">📊</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[255px] not-italic text-[#f5a623] text-[55px] top-[160px] whitespace-nowrap">🏅</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[195px] not-italic text-[#1a1a2e] text-[55px] top-[210px] whitespace-nowrap">👦</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[360px] not-italic text-[#8e8ea0] text-[15px] top-[60px] whitespace-nowrap">Skip</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[40px] not-italic text-[#1a1a2e] text-[26px] top-[455px] whitespace-nowrap">{`Track your child's progress`}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[40px] not-italic text-[#4a4a6a] text-[14px] top-[495px] whitespace-nowrap">See skills, goals and feedback after every lesson.</p>
      <div className="absolute contents left-0 top-0" data-name="Mask group">
        <div className="absolute bg-[#e5e7eb] h-[10px] left-[115px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-115px_-340px] mask-size-[430px_420px] rounded-[5px] top-[340px] w-[200px]" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle}')` }} />
        <div className="absolute bg-[#f5a623] h-[10px] left-[115px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-115px_-340px] mask-size-[430px_420px] rounded-[5px] top-[340px] w-[140px]" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle}')` }} />
        <div className="absolute bg-[#e5e7eb] left-[195px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-195px_-636px] mask-size-[430px_420px] rounded-[4px] size-[8px] top-[636px]" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle}')` }} />
        <div className="absolute bg-[#f5a623] h-[8px] left-[211px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-211px_-636px] mask-size-[430px_420px] rounded-[4px] top-[636px] w-[24px]" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle}')` }} />
        <div className="absolute bg-[#e5e7eb] left-[227px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-227px_-636px] mask-size-[430px_420px] rounded-[4px] size-[8px] top-[636px]" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle}')` }} />
        <div className="absolute bg-[#f5a623] h-[52px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-24px_-700px] mask-size-[430px_420px] rounded-[12px] top-[700px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle}')` }} />
      </div>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[191px] not-italic text-[15px] text-white top-[716px] whitespace-nowrap">Next →</p>
    </div>
  );
}
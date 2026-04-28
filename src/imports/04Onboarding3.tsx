import { img } from "./svg-j35nm";

export default function Component04Onboarding() {
  return (
    <div className="bg-white overflow-clip relative rounded-[44px] size-full" data-name="04 - Onboarding 3">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[255px] not-italic text-[#27ae60] text-[55px] top-[160px] whitespace-nowrap">🏊‍♀️</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[195px] not-italic text-[#1a1a2e] text-[55px] top-[220px] whitespace-nowrap">👨‍🏫</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[360px] not-italic text-[#8e8ea0] text-[15px] top-[60px] whitespace-nowrap">Skip</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[40px] not-italic text-[#1a1a2e] text-[26px] top-[455px] whitespace-nowrap">Stay connected</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[40px] not-italic text-[#4a4a6a] text-[14px] top-[495px] whitespace-nowrap">Chat with your instructor and get practice tips for home.</p>
      <div className="absolute contents left-0 top-0" data-name="Mask group">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[145px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-145px_-120px] mask-size-[430px_420px] not-italic text-[#27ae60] text-[70px] top-[120px] whitespace-nowrap" style={{ maskImage: `url('${img}')` }}>
          💬
        </p>
        <div className="absolute bg-[#e5e7eb] left-[195px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-195px_-636px] mask-size-[430px_420px] rounded-[4px] size-[8px] top-[636px]" data-name="Rectangle" style={{ maskImage: `url('${img}')` }} />
        <div className="absolute bg-[#e5e7eb] left-[211px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-211px_-636px] mask-size-[430px_420px] rounded-[4px] size-[8px] top-[636px]" data-name="Rectangle" style={{ maskImage: `url('${img}')` }} />
        <div className="absolute bg-[#27ae60] h-[8px] left-[227px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-227px_-636px] mask-size-[430px_420px] rounded-[4px] top-[636px] w-[24px]" data-name="Rectangle" style={{ maskImage: `url('${img}')` }} />
        <div className="absolute bg-[#27ae60] h-[52px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-24px_-700px] mask-size-[430px_420px] rounded-[12px] top-[700px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${img}')` }} />
      </div>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[171px] not-italic text-[15px] text-white top-[716px] whitespace-nowrap">Get Started</p>
    </div>
  );
}
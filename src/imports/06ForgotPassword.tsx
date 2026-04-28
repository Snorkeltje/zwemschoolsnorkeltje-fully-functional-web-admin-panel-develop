import { imgWiFi } from "./svg-k46wq";

export default function Component06ForgotPassword() {
  return (
    <div className="bg-white overflow-clip relative rounded-[44px] size-full" data-name="06 - Forgot Password">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[175px] not-italic text-[#1a6fbf] text-[80px] top-[140px] whitespace-nowrap">🔒</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[40px] not-italic text-[#1a1a2e] text-[26px] top-[260px] whitespace-nowrap">Forgot password?</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[40px] not-italic text-[#4a4a6a] text-[14px] top-[296px] whitespace-nowrap">{`Enter your email and we'll send a reset link.`}</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[24px] not-italic text-[#4a4a6a] text-[13px] top-[364px] whitespace-nowrap">Email address</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[40px] not-italic text-[#8e8ea0] text-[14px] top-[401px] whitespace-nowrap">your@email.com</p>
      <div className="absolute contents left-[24px] top-[18px]" data-name="Mask group">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[350px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-325.249px_2.936px] mask-size-[29.269px_11.213px] not-italic text-[#1a1a2e] text-[13px] top-[18px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          WiFi 🔋
        </p>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-49.064px] mask-size-[29.269px_11.213px] not-italic text-[#1a1a2e] text-[24px] top-[70px] whitespace-nowrap" style={{ maskImage: `url('${imgWiFi}')` }}>
          ←
        </p>
        <div className="absolute bg-white h-[52px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-363.064px] mask-size-[29.269px_11.213px] rounded-[12px] top-[384px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute border border-[#e5e7eb] border-solid h-[52px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-363.064px] mask-size-[29.269px_11.213px] rounded-[12px] top-[384px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
        <div className="absolute bg-[#1a6fbf] h-[52px] left-[24px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.751px_-435.064px] mask-size-[29.269px_11.213px] rounded-[12px] top-[456px] w-[382px]" data-name="Rectangle" style={{ maskImage: `url('${imgWiFi}')` }} />
      </div>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[155px] not-italic text-[15px] text-white top-[472px] whitespace-nowrap">Send Reset Link</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[155px] not-italic text-[#1a6fbf] text-[14px] top-[540px] whitespace-nowrap">← Back to Login</p>
    </div>
  );
}
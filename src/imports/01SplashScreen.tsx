export default function Component01SplashScreen() {
  return (
    <div className="bg-[#1a6fbf] overflow-clip relative rounded-[44px] size-full" data-name="01 - Splash Screen">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[185px] not-italic text-[56px] text-white top-[295px] whitespace-nowrap">🐟</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[135px] not-italic text-[32px] text-white top-[430px] whitespace-nowrap">Snorkeltje</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[155px] not-italic text-[#cce5ff] text-[18px] top-[468px] whitespace-nowrap">Zwemschool</p>
      <div className="absolute h-[300px] left-[-97px] top-[-192px] w-[600px]" data-name="Mask group">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 600 300">
          <g id="Mask group">
            <mask height="300" id="mask0_10_4546" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="600" x="0" y="0">
              <rect fill="var(--fill-0, #3366B3)" height="300" id="Rectangle" rx="150" width="600" />
            </mask>
            <g mask="url(#mask0_10_4546)">
              <circle cx="312" cy="532" fill="var(--fill-0, #3366B3)" id="Ellipse" r="60" />
              <circle cx="300" cy="1016" fill="var(--fill-0, #B3CCE6)" id="Ellipse_2" r="4" />
              <circle cx="316" cy="1016" fill="var(--fill-0, white)" id="Ellipse_3" r="4" />
              <circle cx="332" cy="1016" fill="var(--fill-0, #B3CCE6)" id="Ellipse_4" r="4" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
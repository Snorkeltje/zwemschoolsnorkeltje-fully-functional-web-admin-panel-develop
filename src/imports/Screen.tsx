import clsx from "clsx";
type SnorkeltjeLogoEllipse3Props = {
  additionalClassNames?: string;
};

function SnorkeltjeLogoEllipse3({ additionalClassNames = "" }: SnorkeltjeLogoEllipse3Props) {
  return (
    <div className={clsx("absolute h-[8px] top-[55px] w-[12px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
        <ellipse cx="6" cy="4" fill="var(--fill-0, #FF5C00)" id="Ellipse" rx="6" ry="4" />
      </svg>
    </div>
  );
}
type SnorkeltjeLogoEllipse2Props = {
  additionalClassNames?: string;
};

function SnorkeltjeLogoEllipse2({ additionalClassNames = "" }: SnorkeltjeLogoEllipse2Props) {
  return (
    <div className={clsx("absolute h-[10px] w-[14px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 10">
        <ellipse cx="7" cy="5" fill="var(--fill-0, #FF5C00)" id="Ellipse" rx="7" ry="5" />
      </svg>
    </div>
  );
}
type SnorkeltjeLogoEllipse1Props = {
  additionalClassNames?: string;
};

function SnorkeltjeLogoEllipse1({ additionalClassNames = "" }: SnorkeltjeLogoEllipse1Props) {
  return (
    <div className={clsx("absolute size-[5px] top-[24px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
        <circle cx="2.5" cy="2.5" fill="var(--fill-0, #0365C4)" id="Ellipse" r="2.5" />
      </svg>
    </div>
  );
}
type SnorkeltjeLogoEllipseProps = {
  additionalClassNames?: string;
};

function SnorkeltjeLogoEllipse({ additionalClassNames = "" }: SnorkeltjeLogoEllipseProps) {
  return (
    <div className={clsx("absolute size-[10px] top-[20px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <circle cx="5" cy="5" fill="var(--fill-0, #CCE0F2)" id="Ellipse" r="5" />
      </svg>
    </div>
  );
}

export default function Screen() {
  return (
    <div className="bg-[#0365c4] overflow-clip relative rounded-[44px] size-full" data-name="Screen">
      <div className="absolute h-[88px] left-[95px] top-[302px] w-[200px]" data-name="Snorkeltje Logo">
        <div className="absolute left-0 size-[52px] top-[8px]" data-name="Ellipse">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
            <circle cx="26" cy="26" fill="var(--fill-0, #FF5C00)" id="Ellipse" r="26" />
          </svg>
        </div>
        <div className="absolute bg-[#0365c4] h-[14px] left-[10px] rounded-[7px] top-[18px] w-[32px]" data-name="Rectangle" />
        <SnorkeltjeLogoEllipse additionalClassNames="left-[12px]" />
        <SnorkeltjeLogoEllipse additionalClassNames="left-[26px]" />
        <div className="absolute bg-[#ff5c00] h-[28px] left-[2px] rounded-[2px] top-[10px] w-[4px]" data-name="Rectangle" />
        <div className="absolute bg-[#ff5c00] h-[4px] left-0 rounded-[2px] top-[10px] w-[16px]" data-name="Rectangle" />
        <SnorkeltjeLogoEllipse1 additionalClassNames="left-[16px]" />
        <SnorkeltjeLogoEllipse1 additionalClassNames="left-[27px]" />
        <div className="absolute h-[6px] left-[20px] top-[32px] w-[12px]" data-name="Ellipse">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 6">
            <ellipse cx="6" cy="3" fill="var(--fill-0, #E68073)" id="Ellipse" rx="6" ry="3" />
          </svg>
        </div>
        <SnorkeltjeLogoEllipse2 additionalClassNames="left-[5px] top-[4px]" />
        <SnorkeltjeLogoEllipse2 additionalClassNames="left-[16px] top-[2px]" />
        <div className="absolute h-[10px] left-[27px] top-[4px] w-[12px]" data-name="Ellipse">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
            <ellipse cx="6" cy="5" fill="var(--fill-0, #FF5C00)" id="Ellipse" rx="6" ry="5" />
          </svg>
        </div>
        <SnorkeltjeLogoEllipse3 additionalClassNames="left-[8px]" />
        <SnorkeltjeLogoEllipse3 additionalClassNames="left-[28px]" />
        <div className="absolute bg-[#5bc1db] h-[4px] left-0 rounded-[2px] top-[68px] w-[52px]" data-name="Rectangle" />
        <div className="absolute bg-[#00c1ff] h-[3px] left-0 rounded-[2px] top-[74px] w-[52px]" data-name="Rectangle" />
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[62px] not-italic text-[#ff5c00] text-[14px] top-[8px] whitespace-nowrap">ZWEMSCHOOL</p>
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[62px] not-italic text-[#0365c4] text-[16px] top-[28px] whitespace-nowrap">SNORKELTJE</p>
        <div className="absolute bg-[#00c1ff] h-[3px] left-[62px] rounded-[2px] top-[50px] w-[110px]" data-name="Rectangle" />
        <div className="absolute bg-[#5bc1db] h-[3px] left-[62px] rounded-[2px] top-[55px] w-[90px]" data-name="Rectangle" />
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[24px] not-italic text-[#cce5ff] text-[16px] top-[432px] whitespace-nowrap">Jouw zwemlessen, altijd bij je.</p>
      <div className="absolute h-[280px] left-[-80px] top-[-40px] w-[550px]" data-name="Mask group">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 550 280">
          <g id="Mask group">
            <mask height="280" id="mask0_10_4563" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="550" x="0" y="0">
              <ellipse cx="275" cy="140" fill="var(--fill-0, #033587)" id="Ellipse" rx="275" ry="140" />
            </mask>
            <g mask="url(#mask0_10_4563)">
              <ellipse cx="275" cy="844" fill="var(--fill-0, #004EA5)" id="Ellipse_2" rx="235" ry="120" />
              <circle cx="256" cy="789" fill="var(--fill-0, #80A6D9)" id="Ellipse_3" r="5" />
              <circle cx="276" cy="789" fill="var(--fill-0, white)" id="Ellipse_4" r="5" />
            </g>
          </g>
        </svg>
      </div>
      <div className="absolute left-[211px] size-[10px] top-[744px]" data-name="Ellipse">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #80A6D9)" id="Ellipse" r="5" />
        </svg>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[138px] not-italic text-[#668cbf] text-[11px] top-[769px] whitespace-nowrap">i-Reserve Mobile v2.0</p>
    </div>
  );
}
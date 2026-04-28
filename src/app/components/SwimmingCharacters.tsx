/**
 * Swimming characters from Snorkeltje brand illustration (file-1.svg).
 * Uses the exact client-provided SVG artwork, split into left/right characters
 * via overflow + positioning.
 */
import swimCharsSvg from '../../imports/file-1.svg';

interface CharacterProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Left character (roughly left half of the 1080x1350 SVG)
export function SwimCharacterLeft({ size = 120, className = '', style }: CharacterProps) {
  const h = size * (1350 / 540);
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size * 1.4,
        overflow: 'hidden',
        flexShrink: 0,
        ...style,
      }}
    >
      <img
        src={swimCharsSvg}
        alt="Zwemmer 1"
        draggable={false}
        style={{
          width: size * 2,
          height: h,
          maxWidth: 'none',
          objectFit: 'cover',
          objectPosition: 'left center',
        }}
      />
    </div>
  );
}

// Right character (roughly right half of the 1080x1350 SVG)
export function SwimCharacterRight({ size = 120, className = '', style }: CharacterProps) {
  const h = size * (1350 / 540);
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size * 1.4,
        overflow: 'hidden',
        flexShrink: 0,
        ...style,
      }}
    >
      <img
        src={swimCharsSvg}
        alt="Zwemmer 2"
        draggable={false}
        style={{
          width: size * 2,
          height: h,
          maxWidth: 'none',
          objectFit: 'cover',
          objectPosition: 'right center',
          marginLeft: -(size),
        }}
      />
    </div>
  );
}

// Both characters together (full SVG)
export function SwimCharactersBoth({ size = 200, className = '', style }: CharacterProps) {
  return (
    <img
      src={swimCharsSvg}
      alt="Zwemmers Snorkeltje"
      draggable={false}
      style={{
        width: size,
        height: 'auto',
        ...style,
      }}
      className={className}
    />
  );
}

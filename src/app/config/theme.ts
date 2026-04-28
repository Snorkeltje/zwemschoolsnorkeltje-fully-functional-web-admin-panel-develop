// Zwemschool Snorkeltje Brand Colors (from logo SVG)
export const colors = {
  // Primary Brand Colors
  primary: {
    orange: '#FF5C00',      // Logo orange - CTAs, accents
    blue: '#0365C4',        // Logo dark blue - main UI, headers
    lightBlue: '#00C1FF',   // Logo light blue - highlights
    mediumBlue: '#00AEFF',  // Secondary blue
    teal: '#5BC1DB',        // Wave color
    darkBlue: '#034DA9',    // Deep blue
  },
  
  // UI Tokens
  background: '#F4F7FC',    // Very light blue-gray page bg
  cardWhite: '#FFFFFF',
  cardAlt: '#EFF5FC',       // Light blue-tinted cards
  
  // Text Colors
  text: {
    heading: '#131827',     // Almost black
    body: '#444D6B',
    secondary: '#818EA6',
  },
  
  // Border & Dividers
  border: '#DCE4F0',
  
  // Status Colors
  success: {
    main: '#18BB68',
    bg: '#E0F9EC',
  },
  error: {
    main: '#F03838',
    bg: '#FEE5E5',
  },
  warning: {
    main: '#FCAA00',
    bg: '#FFF4DA',
  },
  purple: {
    main: '#7F4BE0',
    bg: '#F1E8FF',
  },
  
  // Instructor Dark Theme
  dark: {
    bg: '#0F1117',
    card: '#1C1F28',
    border: '#2E3347',
  },
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  'sm+': '12px',
  md: '16px',
  'md+': '20px',
  lg: '24px',
  xl: '32px',
  xxl: '40px',
  xxxl: '48px',
};

export const borderRadius = {
  small: '4px',
  default: '8px',
  large: '12px',
  modal: '16px',
  pill: '24px',
  round: '50%',
};

export const shadows = {
  card: '0px 2px 8px rgba(0,0,0,0.08)',
  modal: '0px 8px 24px rgba(0,0,0,0.12)',
  button: '0px 2px 4px rgba(3, 101, 196, 0.3)',
};

export const typography = {
  display: { size: '32px', weight: 'bold' },
  h1: { size: '24px', weight: 'bold' },
  h2: { size: '20px', weight: '600' },
  h3: { size: '16px', weight: '600' },
  body: { size: '14px', weight: 'normal' },
  small: { size: '12px', weight: 'normal' },
  tiny: { size: '10px', weight: '500' },
};

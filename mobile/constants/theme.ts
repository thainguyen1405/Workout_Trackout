// Define your color palette
export const COLORS = {
  primary: '#2725b8',
  accent: '#c6ee4d',
  secondary: '#4D626C',
  white: '#FFFFFF',
  gray: '#757575',
};

// Define font family names
export const FONT_FAMILIES = {
  regular: 'Montserrat_400Regular',
  medium: 'Montserrat_500Medium',
  semiBold: 'Montserrat_600SemiBold',
  bold: 'Montserrat_700Bold',
};

// Define your font sizes
export const SIZES = {
  // Global sizes
  base: 8,
  font: 12,
  radius: 12,
  padding: 24,

  // Font sizes
  h1: 28,
  h2: 17,
  h3: 16,
  body: 14,
};

// Define your font families with sizes
export const FONTS = {
  // Titles and headings use bold/semiBold
  h1: { fontFamily: FONT_FAMILIES.bold, fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: FONT_FAMILIES.semiBold, fontSize: SIZES.h2, lineHeight: 25 },
  h3: { fontFamily: FONT_FAMILIES.semiBold, fontSize: SIZES.h3, lineHeight: 22 },

  // Body text uses regular
  body: { fontFamily: FONT_FAMILIES.regular, fontSize: SIZES.body, lineHeight: 22 },
};

// Export a default theme object for convenience
const appTheme = { COLORS, SIZES, FONTS, FONT_FAMILIES };
export default appTheme;
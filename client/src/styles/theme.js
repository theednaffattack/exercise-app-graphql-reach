import { theme } from 'rebass';

export const colors = {
  text: '#000e1a',
  black: '#000e1a',
  white: '#fff',
  blue: '#007ce0',
  navy: '#004175',
  gray: '#eee',
  darken: 'rgba(0, 0, 0, 0.25)',
  fuchsia: '#ee00de',
  indigo: '#1000ee',
  violet: '#8700ee',
  pink: '#ee0067',
  red: '#ee1000',
};

export const fontSizes = [12, 14, 16, 24, 32, 48, 64, 96];

export default {
  ...theme,
  colors,
  fontSizes,
};

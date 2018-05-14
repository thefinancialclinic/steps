import * as Color from 'color';

export const black = '#464646';
export const blue = '#5AC4F9';
export const brown = '#BDA480';
export const darkBlue = '#1E41A5';
export const darkPink = '#F7337B';
export const green = '#01BF8D';
export const grey = '#999999';
export const mediumBlue = '#C4E6F7';
export const lightBlue = '#E8F5F9';
export const pink = '#EC98C0';
export const white = '#ffffff';
export const yellow = '#F7DB35';

export default {
  black,
  blue,
  brown,
  darkBlue,
  darkPink,
  green,
  grey,
  lightBlue,
  mediumBlue,
  pink,
  white,
  yellow,
};

export const colorFromString = (text: string, colors: string[]): string => {
  let n = 0;
  for (var i = 0; i < text.length; ++i) {
    n = (n + text.charCodeAt(i)) % colors.length;
  }

  return colors[n];
};

export const darken = (color: string, value: number): string => {
  return Color(color).darken(value).hex();
};

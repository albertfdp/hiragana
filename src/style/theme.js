import { createGlobalStyle } from 'styled-components';

const baseColors = {
  colorRed: '#F8262A',
  colorWhite: '#FDF9FA',
  colorGreen: '#0E2D2A',
  colorGray: '#B6B6C6',
  colorBlack: '#251422',
  colorRedLight: '#E65559',
  colorRedLighter: '#F9A1A5'
};

const fontSizes = {
  fontSizeHuge: 128,
  fontSizeLarge: 21,
  fontSizeBase: 16
};

const theme = {
  ...baseColors,
  colorText: baseColors.colorBlack,
  colorRight: 'green',
  colorWrong: baseColors.colorRed,

  fontFamily: `'Noto Sans JP', sans-serif`,
  fontFamilyRomanji: `'Roboto', sans-serif`,

  ...fontSizes
};

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
  }

  body {
    font-family: ${props => props.theme.fontFamilyRomanji};
    background-color: ${props => props.theme.colorWhite};
    color: ${props => props.theme.colorText};
  }

  html, body, #root {
    height: 100%;
  }

  #root {
    display: flex;
  }
`;

export default theme;

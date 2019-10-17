import { createGlobalStyle } from 'styled-components';

const baseColors = {
  colorRed: '#F8262A',
  colorWhite: '#FDF9FA',
  colorGray: '#B6B6C6',
  colorBlack: '#251422',
  colorRedLight: '#E65559',
  colorRedLighter: '#F9A1A5'
};

const theme = {
  ...baseColors,
  colorText: baseColors.colorBlack,
  fontFamily: `'Noto Sans JP', sans-serif`,
  fontFamilyRomanji: `'Roboto', sans-serif`
};

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
  }

  body {
    font-family: ${props => props.theme.fontFamily};
    background-color: ${props => props.theme.colorWhite};
    color: ${props => props.theme.colorText};
  }

  html, body, #root {
    height: 100%;
  }
`;

export default theme;

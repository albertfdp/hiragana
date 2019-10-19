import React from 'react';
import { render } from 'react-dom';

import { ThemeProvider } from 'styled-components';

import Quiz from './components/Quiz';

import theme, { GlobalStyle } from './style/theme';

render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Quiz level="easy" />
  </ThemeProvider>,
  document.getElementById('root')
);

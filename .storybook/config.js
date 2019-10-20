import { addDecorator, configure } from '@storybook/react';
import '@storybook/addon-actions/register';

import React from 'react';

import { ThemeProvider } from 'styled-components';
import theme, { GlobalStyle } from '../src/style/theme';

function withGlobalStyle(storyFn) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {storyFn()}
    </ThemeProvider>
  );
}

addDecorator(withGlobalStyle);

// automatically import all files ending in *.stories.js
configure(require.context('../src/components', true, /stories\.js$/), module);

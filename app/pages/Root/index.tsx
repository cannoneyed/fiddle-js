import React from 'react';
import { ThemeProvider } from 'styled-components';
import { hot } from 'react-hot-loader';

import MainPage from 'pages/Main';

import theme from 'styles/theme';

export const Root = () => (
  <ThemeProvider theme={theme}>
    <div className="pt-dark">
      <MainPage />
    </div>
  </ThemeProvider>
);

export default hot(module)(Root);

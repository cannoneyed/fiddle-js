import React from 'react';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import { hot } from 'react-hot-loader';

import MainPage from 'pages/Main';

import theme from 'styles/theme';

export const Root = () => (
  <Provider>
    <ThemeProvider theme={theme}>
      <div className="pt-dark">
        <MainPage />
        <DevTools />
      </div>
    </ThemeProvider>
  </Provider>
);

export default hot(module)(Root);

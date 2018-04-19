import React from 'react';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import { hot } from 'react-hot-loader';

import SequencerPage from 'pages/Sequencer';

import * as interactions from 'core/interactions';
import * as stores from 'core/stores';

import theme from 'styles/theme';

export const Root = () => (
  <Provider {...stores} {...interactions}>
    <ThemeProvider theme={theme}>
      <div className="pt-dark">
        <SequencerPage />
        <DevTools />
      </div>
    </ThemeProvider>
  </Provider>
);

export default hot(module)(Root);

import React from 'react';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';
import { hot } from 'react-hot-loader';

import SequencerPage from 'pages/Sequencer';

import * as interactions from 'core/interactions';
import * as stores from 'core/stores';

export const Root = () => (
  <Provider {...stores} {...interactions}>
    <div className="pt-dark">
      <SequencerPage />
      <DevTools />
    </div>
  </Provider>
);

export default hot(module)(Root);

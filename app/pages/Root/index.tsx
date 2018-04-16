import React from 'react';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';
import { SequencerPage } from 'pages/Sequencer';
import { hot } from 'react-hot-loader';

import { sequencerLayout } from 'core/stores/sequencer/layout';
import { trackStore } from 'core/stores/tracks';

const stores = {
  sequencerLayout,
  trackStore,
};

export const Root = () => (
  <Provider {...stores}>
    <div className="pt-dark">
      <SequencerPage />
      <DevTools />
    </div>
  </Provider>
);

export default hot(module)(Root);

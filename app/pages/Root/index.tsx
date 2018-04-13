import React from 'react';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';
import { SequencerPage } from 'pages/Sequencer';

export const Root = () => (
  <Provider>
    <div className="pt-dark">
      <SequencerPage />
      <DevTools />
    </div>
  </Provider>
);

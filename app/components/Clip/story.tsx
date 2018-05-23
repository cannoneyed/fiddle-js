import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import Clip from './index';

import { Clip as ClipModel } from 'core/models/clip';
import { TimelineVector } from 'core/primitives/timeline-vector';

storiesOf('Clip', module).add('Basic', () => {
  const clip = new ClipModel({
    trackId: '1',
    position: new TimelineVector(0),
    length: new TimelineVector(4),
  });
  return <Clip clip={clip} height={100} />;
});

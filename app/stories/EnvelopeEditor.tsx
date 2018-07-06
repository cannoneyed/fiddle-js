import React from 'react';
import { storiesOf } from '@storybook/react';
import { EnvelopeEditor } from 'features/EnvelopeEditor/EnvelopeEditor';

import { Envelope } from 'core/models/envelope';

storiesOf('Envelope Editor', module).add('default', () => {
  const envelope = new Envelope();
  const height = 500;
  return <EnvelopeEditor height={height} envelope={envelope} />;
});

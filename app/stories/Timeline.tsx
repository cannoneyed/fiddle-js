import React from 'react';
import { KonvaWrapper } from './helpers';

import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { Timeline as TimelineModel } from 'core/models/timeline';

import Timeline from 'components/Timeline';

const stories = storiesOf('Timeline', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const width = number('width', 1000, {
    range: true,
    min: 100,
    max: 2000,
    step: 100,
  });

  const offsetX = number('offsetX', 0, {
    range: true,
    min: 0,
    max: 1000,
    step: 1,
  });

  const primaryDivisionWidth = number('primaryDivisionWidth', 25, {
    range: true,
    min: 1,
    max: 500,
    step: 1,
  });

  const getOffset = () => offsetX;

  const dimensions = {
    height: 30,
    width,
  };

  const timeline = new TimelineModel();
  timeline.primaryWidth = primaryDivisionWidth;
  const props = {
    dimensions,
    getOffset,
    timeline,
  };

  return (
    <KonvaWrapper dimensions={dimensions}>
      <Timeline {...props} />
    </KonvaWrapper>
  );
});

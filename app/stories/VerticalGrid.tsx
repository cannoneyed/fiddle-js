import React from 'react';
import { KonvaWrapper } from './helpers';

import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { VerticalGrid } from 'components/VerticalGrid';

const stories = storiesOf('VerticalGrid', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const gridSegmentWidth = number('gridSegmentWidth', 100, {
    range: true,
    min: 1,
    max: 500,
    step: 1,
  });

  const width = number('width', 1000, {
    range: true,
    min: 100,
    max: 2000,
    step: 100,
  });

  const height = number('height', 300, {
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

  const dimensions = {
    width: width,
    height: height,
  };

  return (
    <KonvaWrapper dimensions={dimensions}>
      <VerticalGrid
        dimensions={dimensions}
        colWidth={gridSegmentWidth}
        getOffsetX={() => offsetX}
      />
    </KonvaWrapper>
  );
});

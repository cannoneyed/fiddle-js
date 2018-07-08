import React from 'react';
import theme from 'styles/theme';

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

  const offset = number('offset', 0, {
    range: true,
    min: 0,
    max: 500,
    step: 1,
  });

  const gridWrapperStyle = {
    backgroundColor: theme.colors.darkGray.toRgbString(),
    width: width,
    height: height,
  };

  const gridColor = theme.colors.mediumGray.toRgbString();

  return (
    <div style={gridWrapperStyle}>
      <VerticalGrid
        gridColor={gridColor}
        gridSegmentWidth={gridSegmentWidth}
        height={height}
        offset={offset}
        width={width}
      />
    </div>
  );
});
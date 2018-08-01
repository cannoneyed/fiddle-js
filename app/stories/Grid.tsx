import React from 'react';
import theme from 'styles/theme';
import { Wrapper } from './helpers';

import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { Grid } from 'components/Grid';

const stories = storiesOf('Grid', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const colWidth = number('colWidth', 100, {
    range: true,
    min: 5,
    max: 500,
    step: 1,
  });

  const rowHeight = number('rowHeight', 20, {
    range: true,
    min: 5,
    max: 100,
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

  const offsetY = number('offsetY', 0, {
    range: true,
    min: 0,
    max: 1000,
    step: 1,
  });

  const gridWrapperStyle = {
    backgroundColor: theme.colors.darkGray.toRgbString(),
    width: width,
    height: height,
  };

  return (
    <Wrapper>
      <div style={gridWrapperStyle}>
        <Grid
          dimensions={{ height, width }}
          colWidth={colWidth}
          rowHeight={rowHeight}
          offsetX={offsetX}
          offsetY={offsetY}
        />
      </div>
    </Wrapper>
  );
});

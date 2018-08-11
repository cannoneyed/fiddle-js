import React from 'react';
import theme from 'styles/theme';
import { Wrapper } from './helpers';
import { Layer, Rect, Stage } from 'react-konva';

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

  const dimensions = {
    width: width,
    height: height,
  };

  const getOffset = () => ({
    x: offsetX,
    y: offsetY,
  });

  return (
    <Wrapper>
      <Stage {...dimensions}>
        <Layer>
          <Rect {...dimensions} fill={theme.colors.darkGray.toRgbString()} />
        </Layer>
        <Grid
          dimensions={dimensions}
          colWidth={colWidth}
          rowHeight={rowHeight}
          getOffset={getOffset}
        />
      </Stage>
    </Wrapper>
  );
});

import React from 'react';
import theme from 'styles/theme';
import { Wrapper } from './helpers';
import { Layer, Rect, Stage } from 'react-konva';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { Fraction } from 'core/primitives/fraction';

import Timeline from 'components/Timeline';

const stories = storiesOf('Timeline', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const division = new Fraction(1, 2);
  const divisionWidth = 50;
  const getOffset = () => 0;
  const nDivisions = 20;
  const width = 1000;

  const dimensions = {
    height: 30,
    width,
  };

  const props = {
    dimensions,
    division,
    divisionWidth,
    getOffset,
    nDivisions,
  };

  return (
    <Wrapper>
      <Stage {...dimensions}>
        <Layer>
          <Rect {...dimensions} fill={theme.colors.black.toRgbString()} />
        </Layer>
        <Timeline {...props} />
      </Stage>
    </Wrapper>
  );
});

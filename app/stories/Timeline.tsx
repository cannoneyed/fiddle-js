import React from 'react';
import { KonvaWrapper } from './helpers';

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
    <KonvaWrapper dimensions={dimensions}>
      <Timeline {...props} />
    </KonvaWrapper>
  );
});

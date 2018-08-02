import React from 'react';
import theme from 'styles/theme';
import { Wrapper } from './helpers';

import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { PianoRoll } from 'components/PianoRoll';
import { getKeyColor } from 'components/PianoRoll/utils';

const stories = storiesOf('PianoRoll', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const keyHeight = number('keyHeight', 20, {
    range: true,
    min: 10,
    max: 50,
    step: 1,
  });

  const width = number('width', 25, {
    range: true,
    min: 10,
    max: 50,
    step: 5,
  });

  const height = number('height', 500, {
    range: true,
    min: 100,
    max: 2000,
    step: 100,
  });

  const offsetY = number('offsetY', 0, {
    range: true,
    min: 0,
    max: 1000,
    step: 1,
  });

  const containerStyle = {
    backgroundColor: theme.colors.darkGray.toRgbString(),
    width: width,
    height: height,
  };

  const dimensions = { height, width };
  const props = { dimensions, getKeyColor, keyHeight, offsetY, nKeys: 88 };

  return (
    <Wrapper>
      <div style={containerStyle}>
        <PianoRoll {...props} />
      </div>
    </Wrapper>
  );
});

import React from 'react';
import theme from 'styles/theme';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('Notes Editor', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const gridWrapperStyle = {
    backgroundColor: theme.colors.darkGray.toRgbString(),
  };

  return <div style={gridWrapperStyle} />;
});

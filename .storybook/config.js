import { configure } from '@storybook/react';

function loadStories() {
  require('../app/stories/EnvelopeEditor');
  require('../app/stories/Grid');
  require('../app/stories/VerticalGrid');
}

configure(loadStories, module);

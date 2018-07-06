import { configure } from '@storybook/react';

function loadStories() {
  require('../app/stories/EnvelopeEditor');
  require('../app/stories/Grid');
}

configure(loadStories, module);

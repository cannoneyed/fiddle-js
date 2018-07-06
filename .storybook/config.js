import { configure } from '@storybook/react';

function loadStories() {
  require('../app/stories/EnvelopeEditor');
}

configure(loadStories, module);

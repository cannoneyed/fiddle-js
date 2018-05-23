import { configure } from '@storybook/react';

function loadStories() {
  require('../app/components/Clip/story.tsx');
}

configure(loadStories, module);

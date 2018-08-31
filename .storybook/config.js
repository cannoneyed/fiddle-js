import { configure } from '@storybook/react';

function loadStories() {
  require('../app/stories/EnvelopeEditor');
  require('../app/stories/Graph');
  require('../app/stories/Grid');
  require('../app/stories/NotesEditor');
  require('../app/stories/PianoRoll');
  require('../app/stories/Timeline');
  require('../app/stories/VerticalGrid');
}

configure(loadStories, module);

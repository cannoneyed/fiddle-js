import * as React from 'react';

import { EnvelopeEditor } from './index';
import { Envelope } from 'core/models/envelope';
import { SnapToGrid } from 'core/models/snap-to-grid';
import { mount } from 'enzyme';

describe('Envelope Editor', () => {
  it('constructs an envelope editor', () => {
    const envelope = new Envelope();
    const dimensions = { width: 500, height: 100 };
    const snapToGrid = new SnapToGrid();

    const wrapper = mount(
      <EnvelopeEditor envelope={envelope} dimensions={dimensions} snapToGrid={snapToGrid} />
    );
    expect(wrapper).toBeDefined();
  });
});

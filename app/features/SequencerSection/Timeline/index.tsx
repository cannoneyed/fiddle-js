import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import Timeline from 'components/Timeline';

import { SequencerLayout } from 'core/state/layouts/sequencer';

@observer
export default class TimelineContainer extends React.Component<{}, {}> {
  sequencerLayout = Container.get(SequencerLayout);

  render() {
    const { sequencerLayout } = this;
    const { division, divisionWidth, nDivisions } = sequencerLayout.grid;

    return <Timeline division={division} divisionWidth={divisionWidth} nDivisions={nDivisions} />;
  }
}

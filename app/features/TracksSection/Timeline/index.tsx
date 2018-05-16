import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import Timeline from 'components/Timeline';

import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

@observer
export default class TimelineContainer extends React.Component<{}, {}> {
  tracksSectionLayout = Container.get(TracksSectionLayout);

  render() {
    const { tracksSectionLayout } = this;
    const { division, divisionWidth, nDivisions } = tracksSectionLayout.grid;

    return <Timeline division={division} divisionWidth={divisionWidth} nDivisions={nDivisions} />;
  }
}

import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import Timeline from 'components/Timeline';

import { GridLayout } from 'core/state/layouts/sequencer/grid';

@observer
export default class TimelineContainer extends React.Component<{}, {}> {
  gridLayout = Container.get(GridLayout);

  render() {
    const { division, divisionWidth, nDivisions } = this.gridLayout;

    return <Timeline division={division} divisionWidth={divisionWidth} nDivisions={nDivisions} />;
  }
}

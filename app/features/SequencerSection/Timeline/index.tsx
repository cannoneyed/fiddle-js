import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Fraction } from 'core/primitives/fraction';
import Timeline from 'components/Timeline';

import { GridLayout } from 'core/state/layouts/sequencer/grid';
import { TracksLayout } from 'core/state/layouts/sequencer/tracks';

interface Props {}
interface InjectedProps {
  division: Fraction;
  divisionWidth: number;
  nDivisions: number;
  scrolledX: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const gridLayout = Container.get(GridLayout);
  const tracksLayout = Container.get(TracksLayout);
  const { division, divisionWidth, nDivisions } = gridLayout;
  return {
    division,
    divisionWidth,
    nDivisions,
    scrolledX: tracksLayout.tracksScrolledX,
  };
});

@observer
export class TimelineContainer extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { division, divisionWidth, nDivisions, scrolledX } = this.props;

    return (
      <Timeline
        division={division}
        divisionWidth={divisionWidth}
        nDivisions={nDivisions}
        offsetX={scrolledX}
      />
    );
  }
}

export default inject(TimelineContainer);

import * as React from 'react';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Fraction } from 'core/primitives/fraction';

import Timeline from 'components/Timeline';

import { get, GridLayout, TracksLayout } from 'features/SequencerSection/core';

interface Props {}
interface InjectedProps {
  division: Fraction;
  divisionWidth: number;
  getOffset: () => number;
  nDivisions: number;
  width: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const gridLayout = get(GridLayout);
  const tracksLayout = get(TracksLayout);
  const { division, divisionWidth, nDivisions } = gridLayout;

  const getOffset = () => tracksLayout.tracksScrolledX;

  return {
    division,
    divisionWidth,
    getOffset,
    nDivisions,
    width: tracksLayout.tracksDimensions.width,
  };
});

@observer
export class TimelineContainer extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { division, divisionWidth, getOffset, nDivisions, width } = this.props;

    const dimensions = {
      width,
      height: 30,
    };

    return (
      <Timeline
        dimensions={dimensions}
        division={division}
        divisionWidth={divisionWidth}
        getOffset={getOffset}
        nDivisions={nDivisions}
      />
    );
  }
}

export default inject(TimelineContainer);

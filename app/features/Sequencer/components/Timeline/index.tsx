import * as React from 'react';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Timeline as TimelineModel } from 'core/models/timeline';

import Timeline from 'components/Timeline';

import { get, SequencerLayout, TracksLayout, TimelineState } from 'features/Sequencer/core';

interface Props {}
interface InjectedProps {
  getOffset: () => number;
  timeline: TimelineModel;
  width: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const { timeline } = get(TimelineState);
  const sequencerLayout = get(SequencerLayout);
  const tracksLayout = get(TracksLayout);

  const getOffset = () => tracksLayout.tracksScrolledX;

  return {
    getOffset,
    timeline,
    width: sequencerLayout.tracksDimensions.width,
  };
});

@observer
export class TimelineContainer extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { getOffset, timeline, width } = this.props;

    const dimensions = {
      width,
      height: 30,
    };

    return <Timeline dimensions={dimensions} getOffset={getOffset} timeline={timeline} />;
  }
}

export default inject(TimelineContainer);

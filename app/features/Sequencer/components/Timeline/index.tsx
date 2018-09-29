import * as React from 'react';
import { observer } from 'mobx-react';
import { hot, injector } from 'utils/injector';

import { Timeline as TimelineModel } from 'core/models/timeline';

import Timeline from 'components/Timeline';

import {
  get,
  SequencerLayout,
  SequencerState,
  TracksLayout,
  TimelineState,
} from 'features/Sequencer/core';

interface Props {}
interface InjectedProps {
  getOffset: () => number;
  handleTimelineBottomClick: (offsetX: number) => void;
  timeline: TimelineModel;
  width: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const { timeline } = get(TimelineState);
  const sequencerLayout = get(SequencerLayout);
  const sequencerState = get(SequencerState);
  const tracksLayout = get(TracksLayout);

  const getOffset = () => tracksLayout.tracksScrolledX;
  const handleTimelineBottomClick = (offsetX: number) => {
    sequencerState.setPlayheadPositionFromOffsetX(offsetX);
  };

  return {
    getOffset,
    handleTimelineBottomClick,
    timeline,
    width: sequencerLayout.tracksDimensions.width,
  };
});

@observer
export class TimelineContainer extends React.Component<Props & InjectedProps, {}> {
  handleTimelineBottomClick = (event: MouseEvent) => {
    const { offsetX } = event;
    this.props.handleTimelineBottomClick(offsetX);
  };

  render() {
    const { getOffset, timeline, width } = this.props;

    const dimensions = {
      width,
      height: 30,
    };

    return (
      <Timeline
        dimensions={dimensions}
        getOffset={getOffset}
        timeline={timeline}
        onBottomClick={this.handleTimelineBottomClick}
      />
    );
  }
}

export default inject(hot(module)(TimelineContainer));

import * as React from 'react';
import { observer } from 'mobx-react';
import { hot, injector } from 'utils/injector';

import { Timeline as TimelineModel } from 'core/models/timeline';

import Timeline from 'components/Timeline';

import {
  get,
  PlayheadDragInteraction,
  SequencerLayout,
  TracksLayout,
  TimelineState,
} from 'features/Sequencer/core';

interface Props {}
interface InjectedProps {
  beginDragPlayhead: (mouseDown: MouseEvent) => void;
  getOffset: () => number;
  timeline: TimelineModel;
  width: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const { timeline } = get(TimelineState);
  const sequencerLayout = get(SequencerLayout);
  const playheadDrag = get(PlayheadDragInteraction);
  const tracksLayout = get(TracksLayout);

  const getOffset = () => tracksLayout.tracksScrolledX;

  return {
    beginDragPlayhead: playheadDrag.beginDrag,
    getOffset,
    timeline,
    width: sequencerLayout.tracksDimensions.width,
  };
});

@observer
export class TimelineContainer extends React.Component<Props & InjectedProps, {}> {
  handleTimelineBottomMouseDown = (event: MouseEvent) => {
    this.props.beginDragPlayhead(event);
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
        onBottomMouseDown={this.handleTimelineBottomMouseDown}
      />
    );
  }
}

export default inject(hot(module)(TimelineContainer));

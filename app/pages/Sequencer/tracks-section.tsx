import * as React from 'react';
import { Container } from 'typedi';
import { IReactionDisposer } from 'mobx';
import { observer } from 'mobx-react';
import * as trackScrollHandlers from 'core/interactions/tracks/scroll/handlers';
import { observeTracksScroll } from 'core/observers/tracks-scroll';

import Timeline from 'features/TracksSection/Timeline';
import TimelineGutter from 'features/TracksSection/TimelineGutter';
import TracksGutter from 'features/TracksSection/TracksGutter';
import TracksArea from 'features/TracksSection/TracksArea';
import VerticalScrollbar from 'features/TracksSection/VerticalScrollbar';

import { SequencerPageLayout } from 'core/layouts/sequencer/page';

import {
  TimelineWrapper,
  TracksAreaWrapper,
  TracksSectionWrapper,
  VerticalScrollbarWrapper,
} from './styled-components';

@observer
export default class TracksSection extends React.Component<{}, {}> {
  sequencerPageLayout = Container.get(SequencerPageLayout);

  disposeObserver: IReactionDisposer;
  disposeHandlers: trackScrollHandlers.Unregister;

  componentDidMount() {
    this.disposeHandlers = trackScrollHandlers.register();
    this.disposeObserver = observeTracksScroll();
  }

  componentWillUnmount() {
    this.disposeHandlers();
    this.disposeObserver();
  }

  handleTracksSectionDividerDrag = (deltaY: number) => {
    const { sequencerPageLayout } = this;
    sequencerPageLayout.deltaTracksAreaHeight(deltaY);
  };

  render() {
    const { sequencerPageLayout } = this;

    const tracksSectionStyle = {
      height: sequencerPageLayout.tracksSectionHeight,
    };

    const timelineWrapperStyle = {
      height: sequencerPageLayout.timelineHeight,
      width: sequencerPageLayout.tracksSectionWidth,
    };

    const tracksAreaWrapperStyle = {
      height: sequencerPageLayout.tracksAreaHeight,
      width: sequencerPageLayout.tracksSectionWidth,
    };

    const verticalScrollbarWrapperStyle = {
      height: sequencerPageLayout.tracksSectionHeight,
      width: sequencerPageLayout.tracksVerticalScrollbarWidth,
    };

    return (
      <TracksSectionWrapper style={tracksSectionStyle}>
        <TimelineWrapper style={timelineWrapperStyle}>
          <TimelineGutter />
          <Timeline />
        </TimelineWrapper>
        <TracksAreaWrapper style={tracksAreaWrapperStyle}>
          <TracksGutter />
          <TracksArea />
        </TracksAreaWrapper>
        <VerticalScrollbarWrapper style={verticalScrollbarWrapperStyle}>
          <VerticalScrollbar />
        </VerticalScrollbarWrapper>
      </TracksSectionWrapper>
    );
  }
}

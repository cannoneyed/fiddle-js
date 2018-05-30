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

import { MainPageLayout } from 'core/layouts/main/page';

import {
  TimelineWrapper,
  TracksAreaWrapper,
  TracksSectionWrapper,
  VerticalScrollbarWrapper,
} from './styled-components';

@observer
export default class TracksSection extends React.Component<{}, {}> {
  mainPageLayout = Container.get(MainPageLayout);

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
    const { mainPageLayout } = this;
    mainPageLayout.deltaTracksAreaHeight(deltaY);
  };

  render() {
    const { mainPageLayout } = this;

    const tracksSectionStyle = {
      height: mainPageLayout.tracksSectionHeight,
    };

    const timelineWrapperStyle = {
      height: mainPageLayout.timelineHeight,
      width: mainPageLayout.tracksSectionWidth,
    };

    const tracksAreaWrapperStyle = {
      height: mainPageLayout.tracksAreaHeight,
      width: mainPageLayout.tracksSectionWidth,
    };

    const verticalScrollbarWrapperStyle = {
      height: mainPageLayout.tracksSectionHeight,
      width: mainPageLayout.tracksVerticalScrollbarWidth,
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

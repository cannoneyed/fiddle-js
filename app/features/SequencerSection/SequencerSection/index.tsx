import * as React from 'react';
import { Container } from 'typedi';
import { IReactionDisposer } from 'mobx';
import { observer } from 'mobx-react';
import * as trackScrollHandlers from 'core/interactions/tracks/scroll/handlers';
import { observeTracksScroll } from 'core/observers/tracks-scroll';

import Minimap from 'features/Minimap';
import Timeline from 'features/SequencerSection/Timeline';
import TimelineGutter from 'features/SequencerSection/TimelineGutter';
import TracksGutter from 'features/SequencerSection/TracksGutter';
import TracksArea from 'features/SequencerSection/TracksArea';
import VerticalScrollbar from 'features/SequencerSection/VerticalScrollbar';

import { MainPageLayout } from 'core/state/layouts/pages/main';

import {
  MinimapWrapper,
  TimelineWrapper,
  TracksAreaWrapper,
  SequencerSectionWrapper,
  VerticalScrollbarWrapper,
} from './styled-components';

@observer
export default class SequencerSection extends React.Component<{}, {}> {
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

  render() {
    const { mainPageLayout } = this;

    const sequencerSectionStyle = {
      height: mainPageLayout.sequencerSectionHeight,
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
      height: mainPageLayout.sequencerSectionHeight,
      width: mainPageLayout.tracksVerticalScrollbarWidth,
    };

    const minimapWrapperStyle = {
      height: mainPageLayout.minimapHeight,
    };

    return (
      <SequencerSectionWrapper style={sequencerSectionStyle}>
        <MinimapWrapper style={minimapWrapperStyle}>
          <Minimap />
        </MinimapWrapper>
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
      </SequencerSectionWrapper>
    );
  }
}

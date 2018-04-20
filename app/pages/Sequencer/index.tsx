import * as React from 'react';
import { Container } from 'typedi';
import { IReactionDisposer } from 'mobx';
import { observer } from 'mobx-react';
import * as trackScrollHandlers from 'core/interactions/tracks/scroll/handlers';
import { observeTracksScroll } from 'core/observers/tracks-scroll';

// import EditArea from 'features/EditSection/EditArea';
import Minimap from 'features/Minimap';
// import SectionDivider from 'features/SectionDivider';
import Timeline from 'features/Timeline';
import TimelineGutter from 'features/TimelineGutter';
import Toolbar from 'features/Toolbar';
import TracksGutter from 'features/TracksSection/TracksGutter';
import TracksArea from 'features/TracksSection/TracksArea';
import VerticalScrollbar from 'features/TracksSection/VerticalScrollbar';

import { SequencerPageLayout } from 'core/layouts/sequencer/page';

import {
  // EditSectionWrapper,
  PageWrapper,
  MinimapWrapper,
  TimelineWrapper,
  ToolbarWrapper,
  TracksAreaWrapper,
  TracksSectionWrapper,
  VerticalScrollbarWrapper,
} from './styled-components';

interface ComponentProps {}

@observer
export default class SequencerPage extends React.Component<ComponentProps, {}> {
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

    const toolbarWrapperStyle = {
      height: sequencerPageLayout.toolbarHeight,
    };

    const minimapWrapperStyle = {
      height: sequencerPageLayout.minimapHeight,
    };

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

    // const editSectionWrapperStyle = {
    //   height: sequencerPageLayout.editSectionHeight,
    // };

    return (
      <PageWrapper id="sequencerPage">
        <ToolbarWrapper style={toolbarWrapperStyle}>
          <Toolbar />
        </ToolbarWrapper>
        <MinimapWrapper style={minimapWrapperStyle}>
          <Minimap />
        </MinimapWrapper>
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
        {/* <SectionDivider onDrag={this.handleTracksSectionDividerDrag} /> */}
        {/* <EditSectionWrapper style={editSectionWrapperStyle}>
          <EditArea />
        </EditSectionWrapper> */}
      </PageWrapper>
    );
  }
}

import * as React from 'react';
import { IReactionDisposer } from 'mobx';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';
import * as trackScrollHandlers from 'core/interactions/tracks/scroll/handlers';
import { observeTracksScroll } from 'core/observers/tracks-scroll';

import EditArea from 'features/EditSection/EditArea';
import Minimap from 'features/Minimap';
import SectionDivider from 'features/SectionDivider';
import Timeline from 'features/Timeline';
import TimelineGutter from 'features/TimelineGutter';
import Toolbar from 'features/Toolbar';
import TracksGutter from 'features/TracksSection/TracksGutter';
import TracksArea from 'features/TracksSection/TracksArea';

import VerticalScrollbar from 'features/TracksSection/VerticalScrollbar';

import { SequencerLayout } from 'core/stores/sequencer/layout';

import {
  EditSectionWrapper,
  PageWrapper,
  MinimapWrapper,
  TimelineWrapper,
  ToolbarWrapper,
  TracksAreaWrapper,
  TracksSectionWrapper,
  VerticalScrollbarWrapper,
} from './styled-components';

interface ComponentProps {
  sequencerLayout: SequencerLayout;
}

@observer
export class SequencerPage extends React.Component<ComponentProps, {}> {
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
    const { sequencerLayout } = this.props;
    sequencerLayout.deltaTracksAreaHeight(deltaY);
  };

  render() {
    const { sequencerLayout } = this.props;

    const toolbarWrapperStyle = {
      height: sequencerLayout.toolbarHeight,
    };

    const minimapWrapperStyle = {
      height: sequencerLayout.minimapHeight,
    };

    const tracksSectionStyle = {
      height: sequencerLayout.tracksSectionHeight,
    };

    const timelineWrapperStyle = {
      height: sequencerLayout.timelineHeight,
      width: sequencerLayout.tracksSectionWidth,
    };

    const tracksAreaWrapperStyle = {
      height: sequencerLayout.tracksAreaHeight,
      width: sequencerLayout.tracksSectionWidth,
    };

    const verticalScrollbarWrapperStyle = {
      height: sequencerLayout.tracksSectionHeight,
      width: sequencerLayout.tracksVerticalScrollbarWidth,
    };

    const editSectionWrapperStyle = {
      height: sequencerLayout.editSectionHeight,
    };

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
        <SectionDivider onDrag={this.handleTracksSectionDividerDrag} />
        <EditSectionWrapper style={editSectionWrapperStyle}>
          <EditArea />
        </EditSectionWrapper>
      </PageWrapper>
    );
  }
}

export default connect(SequencerPage, 'sequencerLayout');

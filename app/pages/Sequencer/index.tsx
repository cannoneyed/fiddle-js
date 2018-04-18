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

  render() {
    const { sequencerLayout } = this.props;
    const {
      editSectionHeight,
      minimapHeight,
      timelineHeight,
      toolbarHeight,
      tracksAreaHeight,
      tracksSectionHeight,
      tracksSectionWidth,
      tracksVerticalScrollbarWidth,
    } = sequencerLayout;

    return (
      <PageWrapper id="sequencerPage">
        <ToolbarWrapper height={toolbarHeight}>
          <Toolbar />
        </ToolbarWrapper>
        <MinimapWrapper height={minimapHeight}>
          <Minimap />
        </MinimapWrapper>
        <TracksSectionWrapper height={tracksSectionHeight}>
          <TimelineWrapper height={timelineHeight} width={tracksSectionWidth}>
            <TimelineGutter />
            <Timeline />
          </TimelineWrapper>
          <TracksAreaWrapper height={tracksAreaHeight} width={tracksSectionWidth}>
            <TracksGutter />
            <TracksArea />
          </TracksAreaWrapper>
          <VerticalScrollbarWrapper
            height={tracksSectionHeight}
            width={tracksVerticalScrollbarWidth}
          >
            <VerticalScrollbar />
          </VerticalScrollbarWrapper>
        </TracksSectionWrapper>
        <SectionDivider handleDrag={(deltaY: number) => {}} />
        <EditSectionWrapper height={editSectionHeight}>
          <EditArea />
        </EditSectionWrapper>
      </PageWrapper>
    );
  }
}

export default connect(SequencerPage, 'sequencerLayout');

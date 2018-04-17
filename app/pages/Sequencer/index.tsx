import * as React from 'react';
import { IReactionDisposer } from 'mobx';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';
import * as trackScrollHandlers from 'core/interactions/tracks/scroll/handlers';
import { observeTracksScroll } from 'core/observers/tracks-scroll';

import EditArea from 'features/EditArea';
import Minimap from 'features/Minimap';
import Timeline from 'features/Timeline';
import TimelineGutter from 'features/TimelineGutter';
import Toolbar from 'features/Toolbar';
import TracksGutter from 'features/TracksSection/TracksGutter';
import TracksArea from 'features/TracksSection/TracksArea';

import VerticalScrollbar from 'features/TracksSection/VerticalScrollbar';

import { SequencerLayout } from 'core/stores/sequencer/layout';

import {
  EditAreaWrapper,
  PageWrapper,
  MinimapWrapper,
  TimelineWrapper,
  ToolbarWrapper,
  TracksAreaWrapper,
  WorkspaceWrapper,
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
      editAreaHeight,
      minimapHeight,
      timelineHeight,
      toolbarHeight,
      tracksAreaHeight,
      workspaceAreaHeight,
      workspaceAreaWidth,
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
        <WorkspaceWrapper height={workspaceAreaHeight}>
          <TimelineWrapper height={timelineHeight} width={workspaceAreaWidth}>
            <TimelineGutter />
            <Timeline />
          </TimelineWrapper>
          <TracksAreaWrapper height={tracksAreaHeight} width={workspaceAreaWidth}>
            <TracksGutter />
            <TracksArea />
          </TracksAreaWrapper>
          <VerticalScrollbarWrapper
            height={workspaceAreaHeight}
            width={tracksVerticalScrollbarWidth}
          >
            <VerticalScrollbar />
          </VerticalScrollbarWrapper>
        </WorkspaceWrapper>
        <EditAreaWrapper height={editAreaHeight}>
          <EditArea />
        </EditAreaWrapper>
      </PageWrapper>
    );
  }
}

export default connect(SequencerPage, 'sequencerLayout');

import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import EditSection from './edit-section';
import TracksSection from './tracks-section';

import Minimap from 'features/Minimap';
import SectionDivider from 'features/SectionDivider';
import Toolbar from 'features/Toolbar';

import { SequencerPageLayout } from 'core/layouts/sequencer/page';

import { PageWrapper, MinimapWrapper, ToolbarWrapper } from './styled-components';

@observer
export default class SequencerPage extends React.Component<{}, {}> {
  sequencerPageLayout = Container.get(SequencerPageLayout);

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

    return (
      <PageWrapper id="sequencerPage">
        <ToolbarWrapper style={toolbarWrapperStyle}>
          <Toolbar />
        </ToolbarWrapper>
        <MinimapWrapper style={minimapWrapperStyle}>
          <Minimap />
        </MinimapWrapper>
        <TracksSection />
        <SectionDivider onDrag={this.handleTracksSectionDividerDrag} />
        <EditSection />
      </PageWrapper>
    );
  }
}

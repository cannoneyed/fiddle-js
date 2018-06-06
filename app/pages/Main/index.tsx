import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import EditSection from './edit-section';
import TracksSection from './tracks-section';

import Minimap from 'features/Minimap';
import SectionDivider from 'features/SectionDivider';
import Toolbar from 'features/Toolbar';

import { MainPageLayout } from 'core/state/layouts/main/page';

import { PageWrapper, MinimapWrapper, ToolbarWrapper } from './styled-components';

@observer
export default class SequencerPage extends React.Component<{}, {}> {
  mainPageLayout = Container.get(MainPageLayout);

  handleTracksSectionDividerDrag = (deltaY: number) => {
    const { mainPageLayout } = this;
    mainPageLayout.deltaTracksAreaHeight(deltaY);
  };

  render() {
    const { mainPageLayout } = this;

    const toolbarWrapperStyle = {
      height: mainPageLayout.toolbarHeight,
    };

    const minimapWrapperStyle = {
      height: mainPageLayout.minimapHeight,
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

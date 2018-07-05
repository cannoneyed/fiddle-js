import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import ClipEditorSection from 'features/ClipEditorSection/ClipEditorSection';
import SequencerSection from 'features/SequencerSection/SequencerSection';

import Minimap from 'features/Minimap';
import SectionDivider from 'features/SectionDivider';
import Toolbar from 'features/Toolbar';

import { MainPageLayout } from 'core/state/layouts/pages/main';

import { MinimapWrapper, PageWrapper, ToolbarWrapper } from './styled-components';

@observer
export default class SequencerPage extends React.Component<{}, {}> {
  mainPageLayout = Container.get(MainPageLayout);

  handleSequencerSectionDividerDrag = (deltaY: number) => {
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
        <SequencerSection />
        <SectionDivider onDrag={this.handleSequencerSectionDividerDrag} />
        <ClipEditorSection />
      </PageWrapper>
    );
  }
}

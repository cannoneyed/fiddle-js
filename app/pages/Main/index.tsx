import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import ClipEditorSection from 'features/ClipEditorSection/ClipEditorSection';
import SequencerSection from 'features/SequencerSection/SequencerSection';

import SectionDivider from 'features/SectionDivider';
import Toolbar from 'features/Toolbar';

import { MainPageLayout } from 'core/state/layouts/pages/main';

import { PageWrapper, ToolbarWrapper } from './styled-components';

@observer
export default class SequencerPage extends React.Component<{}, {}> {
  mainPageLayout = Container.get(MainPageLayout);

  handleSectionDividerDrag = (deltaY: number) => {
    const { mainPageLayout } = this;
    mainPageLayout.deltaSectionDivider(deltaY);
  };

  render() {
    const { mainPageLayout } = this;

    const toolbarWrapperStyle = {
      height: mainPageLayout.toolbarHeight,
    };

    return (
      <PageWrapper id="sequencerPage">
        <ToolbarWrapper style={toolbarWrapperStyle}>
          <Toolbar />
        </ToolbarWrapper>
        <SequencerSection />
        <SectionDivider onDrag={this.handleSectionDividerDrag} />
        <ClipEditorSection />
      </PageWrapper>
    );
  }
}

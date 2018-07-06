import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import theme from 'styles/theme';

// import ClipEditorSection from 'features/ClipEditorSection/ClipEditorSection';
import SequencerSection from 'features/SequencerSection/SequencerSection';
// import SectionDivider from 'features/SectionDivider';

import { MainPageLayout } from 'core/state/layouts/pages/main';

@observer
export default class SequencerPage extends React.Component<{}, {}> {
  mainPageLayout = Container.get(MainPageLayout);

  handleSectionDividerDrag = (deltaY: number) => {
    const { mainPageLayout } = this;
    mainPageLayout.deltaSectionDivider(deltaY);
  };

  render() {
    return (
      <PageWrapper>
        <SequencerSection />
        {/* <SectionDivider onDrag={this.handleSectionDividerDrag} /> */}
        {/* <ClipEditorSection /> */}
      </PageWrapper>
    );
  }
}

export const PageWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.darkGray.toRgbString()};
`;

import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { injector } from 'utils/injector';

import { Dimensions } from 'core/interfaces';

import ClipEditorSection from 'features/ClipEditorSection';
import SequencerSection from 'features/SequencerSection';
import SectionDivider from 'features/SectionDivider';

import { MainPageLayout } from 'core/state/layouts/pages/main';

interface Props {}
interface InjectedProps {
  clipEditorDimensions: Dimensions;
  deltaSectionDivider: (delta: number) => void;
}

const inject = injector<Props, InjectedProps>(props => {
  const mainPageLayout = Container.get(MainPageLayout);
  return {
    clipEditorDimensions: mainPageLayout.clipEditorDimensions,
    deltaSectionDivider: mainPageLayout.deltaSectionDivider,
  };
});

@observer
export class MainPage extends React.Component<Props & InjectedProps, {}> {
  handleSectionDividerDrag = (deltaY: number) => {
    this.props.deltaSectionDivider(deltaY);
  };

  render() {
    const { clipEditorDimensions } = this.props;

    return (
      <PageWrapper>
        <SequencerSection />
        <SectionDivider onDrag={this.handleSectionDividerDrag} />
        <ClipEditorSection dimensions={clipEditorDimensions} />
      </PageWrapper>
    );
  }
}

export default inject(MainPage);

export const PageWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.darkGray.toRgbString()};
`;

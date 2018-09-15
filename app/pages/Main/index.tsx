import * as React from 'react';
import { Container } from 'libs/typedi';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { injector } from 'utils/injector';

import { Dimensions } from 'core/interfaces';

import Sequencer from 'features/Sequencer';
import SectionDivider from 'features/SectionDivider';

import { MainPageLayout } from 'core';

interface Props {}
interface InjectedProps {
  clipEditorDimensions: Dimensions;
  deltaSectionDivider: (delta: number) => void;
  sequencerDimensions: Dimensions;
}

const inject = injector<Props, InjectedProps>(props => {
  const mainPageLayout = Container.get(MainPageLayout);
  return {
    clipEditorDimensions: mainPageLayout.clipEditorDimensions,
    deltaSectionDivider: mainPageLayout.deltaSectionDivider,
    sequencerDimensions: mainPageLayout.sequencerDimensions,
  };
});

@observer
export class MainPage extends React.Component<Props & InjectedProps, {}> {
  handleSectionDividerDrag = (deltaY: number) => {
    this.props.deltaSectionDivider(deltaY);
  };

  render() {
    const { sequencerDimensions } = this.props;

    return (
      <PageWrapper>
        <Sequencer dimensions={sequencerDimensions} />
        <SectionDivider onDrag={this.handleSectionDividerDrag} />
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

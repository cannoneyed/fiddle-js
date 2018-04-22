import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import { SequencerPageLayout } from 'core/layouts/sequencer/page';

@observer
export default class TimelineGutter extends React.Component<{}, {}> {
  sequencerPageLayout = Container.get(SequencerPageLayout);

  render() {
    const { sequencerPageLayout } = this;
    const { gutterWidth } = sequencerPageLayout;

    const style = {
      minWidth: gutterWidth,
    };

    return <TimelineGutterContainer style={style} />;
  }
}

const TimelineGutterContainer = styled.div`
  position: relative;
  height: ${theme.timelineHeight.toString()};
  padding: 0;
  z-index: ${theme.tracksZIndex};
  flex-grow: 0;
  background-color: ${theme.colors.darkGray.toRgbString()};
`;

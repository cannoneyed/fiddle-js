import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { SequencerPositionService } from 'core/services/sequencer/position';

import { SequencerSectionLayout } from 'core/state/layouts/sequencer/section';
import { TimelineLayout } from 'core/state/layouts/sequencer/timeline';

interface Props {}
interface InjectedProps {
  height: number;
  offsetX: number;
  visible: boolean;
}

const inject = injector<Props, InjectedProps>(props => {
  const sequencerSectionLayout = Container.get(SequencerSectionLayout);
  const timelineLayout = Container.get(TimelineLayout);
  const sequencerPositionService = Container.get(SequencerPositionService);
  const { dropTargetPosition } = timelineLayout;
  return {
    visible: !!dropTargetPosition,
    offsetX: dropTargetPosition ? sequencerPositionService.getOffsetX(dropTargetPosition) : 0,
    height: sequencerSectionLayout.tracksAreaDimensions.height,
  };
});

@observer
export class DragToMarker extends React.Component<{} & InjectedProps, {}> {
  render() {
    const { height, offsetX, visible } = this.props;
    const style = {
      left: offsetX - 1,
      height,
    };
    return visible ? <DragToMarkerBar style={style} /> : null;
  }
}

export default inject(DragToMarker);

const DragToMarkerBar = styled.div`
  position: absolute;
  z-index: 999;
  position: absolute;
  width: 1px;
  background-color: ${theme.colors.white.toRgbString()};
`;

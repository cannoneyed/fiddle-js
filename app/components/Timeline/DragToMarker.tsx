import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import Caret from 'components/Caret';

export interface Props {
  offsetX: number;
  timelineHeight: number;
}

@observer
export default class DragToMarker extends React.Component<Props, {}> {
  render() {
    const { offsetX, timelineHeight } = this.props;

    const caretSize = 10;

    const style = {
      left: offsetX - caretSize / 2 - 0.75,
      top: timelineHeight - caretSize + 2,
    };

    return (
      <DragToMarkerContainer style={style}>
        <Caret size={caretSize} />
      </DragToMarkerContainer>
    );
  }
}

const DragToMarkerContainer = styled.div`
  position: absolute;
  display: flex;
`;

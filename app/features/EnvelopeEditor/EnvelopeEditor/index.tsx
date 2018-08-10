import * as React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Envelope as EnvelopeModel } from 'core/models/envelope';
import { SnapToGrid } from 'core/models/snap-to-grid';

import VerticalGrid from 'components/VerticalGrid';
import Envelope from 'features/EnvelopeEditor/Envelope';

interface Props {
  envelope: EnvelopeModel;
  dimensions: Dimensions;
  snapToGrid: SnapToGrid;
}

@observer
export class EnvelopeEditor extends React.Component<Props, {}> {
  render() {
    const { dimensions, envelope, snapToGrid } = this.props;

    const editorWrapperStyle = {
      ...dimensions,
    };

    const gridSegmentWidth = SnapToGrid.getDivisionWidth(
      envelope.length,
      dimensions.width,
      snapToGrid
    );

    return (
      <EnvelopeEditorWrapper style={editorWrapperStyle}>
        <EnvelopeWrapper>
          <Envelope
            envelope={envelope}
            dimensions={dimensions}
            snapToGrid={snapToGrid}
            gridSegmentWidth={gridSegmentWidth}
          />
        </EnvelopeWrapper>
        <GridWrapper>
          <VerticalGrid dimensions={dimensions} colWidth={gridSegmentWidth} getOffsetX={() => 0} />
        </GridWrapper>
      </EnvelopeEditorWrapper>
    );
  }
}

export default EnvelopeEditor;

const EnvelopeEditorWrapper = styled.div`
  position: relative;
  background-color: ${theme.colors.darkGray.toRgbString()};
`;

const absolute = css`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const EnvelopeWrapper = styled.div`
  ${absolute};
  z-index: 10;
`;

const GridWrapper = styled.div`
  ${absolute};
  z-index: 0;
`;

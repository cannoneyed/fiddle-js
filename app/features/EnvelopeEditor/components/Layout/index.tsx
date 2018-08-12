import * as React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { Stage } from 'react-konva';
import { injector } from 'utils/injector';

import { Dimensions } from 'core/interfaces';
import { Envelope as EnvelopeModel } from 'core/models/envelope';

import VerticalGrid from 'components/VerticalGrid';
import Envelope from 'features/EnvelopeEditor/components/Envelope';

import { getCore } from 'features/EnvelopeEditor/core';

interface Props {
  envelope: EnvelopeModel;
}
interface InjectedProps {
  dimensions: Dimensions;
  gridSegmentWidth: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const core = getCore(props.envelope);
  return {
    dimensions: core.layout.dimensions,
    gridSegmentWidth: core.layout.gridSegmentWidth,
  };
});

@observer
export class Layout extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { dimensions, envelope, gridSegmentWidth } = this.props;

    const editorWrapperStyle = {
      ...dimensions,
    };

    return (
      <EnvelopeEditorWrapper style={editorWrapperStyle}>
        <EnvelopeWrapper>
          <Envelope envelope={envelope} />
        </EnvelopeWrapper>
        <GridWrapper>
          <Stage {...dimensions}>
            <VerticalGrid
              dimensions={dimensions}
              colWidth={gridSegmentWidth}
              getOffsetX={() => 0}
            />
          </Stage>
        </GridWrapper>
      </EnvelopeEditorWrapper>
    );
  }
}

export default inject(Layout);

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

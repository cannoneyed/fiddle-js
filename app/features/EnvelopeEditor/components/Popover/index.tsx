import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { hot, injector } from 'utils/injector';
import Portal from 'libs/react-portal';

import { Envelope as EnvelopeModel } from 'core/models/envelope';
import { ScreenVector } from 'core/primitives/screen-vector';
import { Point as PointModel } from 'core/models/envelope/point';

import { get, EnvelopeEditorInteractions } from 'features/EnvelopeEditor/core';

const BORDER_WIDTH = 1;
const CARET_SIZE = 8;
const HEIGHT = 60;
const WIDTH = 120;
const OFFSET_Y = 20;

export interface Props {
  envelope: EnvelopeModel;
}
interface InjectedProps {
  point: PointModel;
  screenVector: ScreenVector;
}

const inject = injector<Props, InjectedProps>(props => {
  const interactions = get(props.envelope, EnvelopeEditorInteractions);
  return {
    point: interactions.draggingPoint!,
    screenVector: interactions.getPopoverScreenVector(),
  };
});

@observer
export class Popover extends React.Component<Props & InjectedProps, {}> {
  renderPosition() {
    const { point } = this.props;
    const { bars, primary, secondary, ticks } = point.position;
    const string = ` ${bars} ${primary} ${secondary} ${ticks}`;
    return <PositionText>{string}</PositionText>;
  }

  renderValue() {
    const { point } = this.props;
    const string = ` ${point.value.toFixed(2)}`;
    return <ValueText>{string}</ValueText>;
  }

  render() {
    const { screenVector } = this.props;

    const offsetY = OFFSET_Y;
    const offsetX = -WIDTH / 2;

    const style = {
      top: screenVector.y + offsetY + CARET_SIZE,
      left: screenVector.x + offsetX,
    };
    return (
      <Portal isOpened={true}>
        <PopoverWrapper style={style}>
          <ArrowBox>
            <Row>
              <Label>pos:</Label>
              {this.renderPosition()}
            </Row>
            <Row>
              <ValueText>
                <Label>val:</Label>
                {this.renderValue()}
              </ValueText>
            </Row>
          </ArrowBox>
        </PopoverWrapper>
      </Portal>
    );
  }
}

export default inject(hot(module)(Popover));

const PopoverWrapper = styled.div`
  position: fixed;
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  user-select: none;
  z-index: 999;
`;

const Row = styled.div``;

const Label = styled.span`
  color: ${theme.colors.lightGray.toRgbString()};
`;

const PositionText = styled.span`
  color: ${theme.colors.white.toRgbString()};
`;

const ValueText = styled.span`
  color: ${theme.colors.white.toRgbString()};
`;

const ArrowBox = styled.div`
  position: relative;
  background: ${theme.colors.black.toRgbString()};
  border: ${BORDER_WIDTH}px solid ${theme.colors.white.toRgbString()};
  border-radius: 3px;

  font-family: monospace;
  font-size: 12px;
  color: ${theme.colors.white.toRgbString()};
  padding: 10px;

  &:after,
  &:before {
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-bottom-color: ${theme.colors.black.toRgbString()};
    border-width: ${CARET_SIZE}px;
    margin-left: ${-CARET_SIZE}px;
  }

  &:before {
    border-bottom-color: ${theme.colors.white.toRgbString()};
    border-width: ${CARET_SIZE + BORDER_WIDTH}px;
    margin-left: -${CARET_SIZE + BORDER_WIDTH}px;
  }
`;

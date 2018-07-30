import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { ScreenVector } from 'core/primitives/screen-vector';

import { Point as PointModel } from 'core/models/envelope/point';

interface Props {
  point: PointModel;
  screenVector: ScreenVector;
}

@observer
export class Popover extends React.Component<Props, {}> {
  render() {
    const { screenVector } = this.props;
    const offsetY = 30;
    const style = {
      top: screenVector.y + offsetY,
      left: screenVector.x,
    };
    return (
      <PopoverWrapper style={style}>
        <ArrowBox>hey</ArrowBox>
      </PopoverWrapper>
    );
  }
}

export default Popover;

const PopoverWrapper = styled.div`
  position: fixed;
  width: 100px;
  height: 100px;
  user-select: none;
  z-index: 999;
`;

const ArrowBox = styled.div`
  position: relative;
  background: #636363;
  border: 2px solid #f5f5f5;

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
    border-color: rgba(99, 99, 99, 0);
    border-bottom-color: #636363;
    border-width: 10px;
    margin-left: -10px;
  }

  &:before {
    border-color: rgba(245, 245, 245, 0);
    border-bottom-color: #f5f5f5;
    border-width: 13px;
    margin-left: -13px;
  }
`;

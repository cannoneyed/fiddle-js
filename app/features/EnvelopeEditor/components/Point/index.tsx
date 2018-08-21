import * as React from 'react';
import { observer } from 'mobx-react';
import theme from 'styles/theme';
import { Circle } from 'react-konva';
import { makeHandler } from 'utils/konva';

import { ScreenVector } from 'core/primitives/screen-vector';

import { Point as PointModel } from 'core/models/envelope/point';

interface Props {
  point: PointModel;
  getScreenVector: (point: PointModel) => ScreenVector;
  onDoubleClick: (event: MouseEvent, position: ScreenVector) => void;
  onMouseDown: (event: MouseEvent, position: ScreenVector) => void;
}

@observer
export class Point extends React.Component<Props, {}> {
  render() {
    const { point, getScreenVector } = this.props;
    const screenVector = getScreenVector(point);
    const { x, y } = screenVector;

    const color = point.selected ? 'red' : theme.colors.white.toRgbString();

    const onMouseDown = (event: MouseEvent) => {
      this.props.onMouseDown(event, screenVector);
    };

    const onDoubleClick = (event: MouseEvent) => {
      this.props.onMouseDown(event, screenVector);
    };

    return (
      <Circle
        radius={5}
        x={x}
        y={y}
        fill={color}
        onMouseDown={makeHandler(onMouseDown)}
        onDblClick={makeHandler(onDoubleClick)}
      />
    );
  }
}

export default Point;

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
  onDoubleClick: (event: MouseEvent) => void;
  onMouseDown: (event: MouseEvent) => void;
}

@observer
export class Point extends React.Component<Props, {}> {
  render() {
    const { point, getScreenVector } = this.props;
    const { x, y } = getScreenVector(point);

    const color = point.selected ? 'red' : theme.colors.white.toRgbString();
    return (
      <Circle
        radius={5}
        x={x}
        y={y}
        fill={color}
        onMouseDown={makeHandler(this.props.onMouseDown)}
        onDblClick={makeHandler(this.props.onDoubleClick)}
      />
    );
  }
}

export default Point;

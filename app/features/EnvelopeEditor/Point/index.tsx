import * as React from 'react';
import { observer } from 'mobx-react';
import theme from 'styles/theme';

import { ScreenVector } from 'core/primitives/screen-vector';

import { Point as PointModel } from 'core/models/envelope/point';

interface Props {
  point: PointModel;
  getScreenVector: (point: PointModel) => ScreenVector;
  onDoubleClick: (event: React.MouseEvent) => void;
  onMouseDown: (event: React.MouseEvent) => void;
}

@observer
export class Point extends React.Component<Props, {}> {
  render() {
    const { point, getScreenVector } = this.props;
    const { x, y } = getScreenVector(point);

    const color = point.selected ? 'red' : theme.colors.white.toRgbString();
    return (
      <circle
        r="5"
        cx={x}
        cy={y}
        fill={color}
        onMouseDown={this.props.onMouseDown}
        onDoubleClick={this.props.onDoubleClick}
      />
    );
  }
}

export default Point;

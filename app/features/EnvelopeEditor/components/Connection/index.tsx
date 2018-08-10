import * as React from 'react';
import { observer } from 'mobx-react';
import theme from 'styles/theme';

import { ScreenVector } from 'core/primitives/screen-vector';

import { Connection as ConnectionModel } from 'core/models/envelope/connection';
import { Point as PointModel } from 'core/models/envelope/point';

interface Props {
  connection: ConnectionModel;
  getScreenVector: (point: PointModel) => ScreenVector;
  onDoubleClick: (event: React.MouseEvent) => void;
  onMouseDown: (event: React.MouseEvent) => void;
}

@observer
export class Connection extends React.Component<Props, {}> {
  static strokeWidth = 2;

  render() {
    const { connection, getScreenVector } = this.props;
    const { start, end } = connection;
    const startPosition = getScreenVector(start);
    const endPosition = getScreenVector(end);

    const style = {
      stroke: theme.colors.white.toRgbString(),
      strokeWidth: Connection.strokeWidth,
    };

    return (
      <line
        x1={startPosition.x}
        x2={endPosition.x}
        y1={startPosition.y}
        y2={endPosition.y}
        style={style}
        onMouseDown={this.props.onMouseDown}
        onDoubleClick={this.props.onDoubleClick}
      />
    );
  }
}

export default Connection;

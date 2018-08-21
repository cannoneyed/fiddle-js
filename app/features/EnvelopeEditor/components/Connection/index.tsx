import * as React from 'react';
import { observer } from 'mobx-react';
import theme from 'styles/theme';
import { Line } from 'react-konva';
import { makePoints, makeHandler } from 'utils/konva';

import { ScreenVector } from 'core/primitives/screen-vector';

import { Connection as ConnectionModel } from 'core/models/envelope/connection';
import { Point as PointModel } from 'core/models/envelope/point';

interface Props {
  connection: ConnectionModel;
  getScreenVector: (point: PointModel) => ScreenVector;
  onDoubleClick: (event: MouseEvent, position: ScreenVector) => void;
  onMouseDown: (event: MouseEvent, position: ScreenVector) => void;
}

@observer
export class Connection extends React.Component<Props, {}> {
  static strokeWidth = 2;

  render() {
    const { connection, getScreenVector } = this.props;
    const { start, end } = connection;
    const startPosition = getScreenVector(start);
    const endPosition = getScreenVector(end);

    const points = makePoints([startPosition, endPosition]);

    const onMouseDown = (event: MouseEvent) => {
      const screenVector = new ScreenVector(event.offsetX, event.offsetY);
      this.props.onMouseDown(event, screenVector);
    };

    const onDoubleClick = (event: MouseEvent) => {
      const screenVector = new ScreenVector(event.offsetX, event.offsetY);
      this.props.onMouseDown(event, screenVector);
    };

    return (
      <Line
        points={points}
        stroke={theme.colors.white.toRgbString()}
        strokeWidth={Connection.strokeWidth}
        onMouseDown={makeHandler(onMouseDown)}
        onDblClick={makeHandler(onDoubleClick)}
      />
    );
  }
}

export default Connection;

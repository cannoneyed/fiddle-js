import * as React from 'react';
import { observer } from 'mobx-react';
import { range } from 'lodash';
import theme from 'styles/theme';
import { Group, Line } from 'react-konva';
import { makePoints } from 'utils/konva';

import { Coordinates, Dimensions } from 'core/interfaces';

interface Props {
  dimensions: Dimensions;
  colWidth: number;
  position: Coordinates;
  rowHeight: number;
  getOffset: () => { x: number; y: number };
}

@observer
export class Grid extends React.Component<Props, {}> {
  static defaultProps = {
    position: { x: 0, y: 0 },
  };

  renderHorizontalLines() {
    const { dimensions } = this.props;
    const { getOffset, rowHeight } = this.props;
    const offsetY = getOffset().y;

    const offsetRow = rowHeight - (offsetY % rowHeight);
    const nHorizontalLines = Math.ceil((dimensions.height - offsetRow) / rowHeight);

    return range(nHorizontalLines).map((i: number) => {
      const y = i * rowHeight + offsetRow;
      const { width } = this.props.dimensions;
      const color = theme.colors.mediumGray.toRgbString();

      const start = { x: 0, y };
      const end = { x: width, y };
      const points = makePoints([start, end]);
      return <Line key={i} points={points} strokeWidth={1} stroke={color} />;
    });
  }

  renderVerticalLines = () => {
    const { dimensions } = this.props;
    const { colWidth, getOffset } = this.props;
    const offsetX = getOffset().x;

    const offsetCol = colWidth - (offsetX % colWidth);
    const nVerticalLines = Math.ceil((dimensions.width - offsetCol) / colWidth);

    return range(nVerticalLines).map((i: number) => {
      const x = i * colWidth + offsetCol;
      const { height } = this.props.dimensions;
      const color = theme.colors.mediumGray.toRgbString();

      const start = { x, y: 0 };
      const end = { x, y: height };
      const points = makePoints([start, end]);
      return <Line key={i} points={points} strokeWidth={1} stroke={color} />;
    });
  };

  render() {
    const { dimensions, position } = this.props;

    return (
      <Group {...dimensions} {...position}>
        {this.renderHorizontalLines()}
        {this.renderVerticalLines()}
      </Group>
    );
  }
}

export default Grid;

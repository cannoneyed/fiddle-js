import * as React from 'react';
import { observer } from 'mobx-react';
import { range } from 'lodash';
import theme from 'styles/theme';
import { clear, drawHorizontalLine, drawVerticalLine, resizeCanvas } from 'core/canvas';

import { Dimensions } from 'core/interfaces';

interface Props {
  dimensions: Dimensions;
  colWidth: number;
  rowHeight: number;
  offsetX: number;
  offsetY: number;
}

@observer
export class Grid extends React.Component<Props, {}> {
  private canvas: React.RefObject<HTMLCanvasElement> = React.createRef();
  private ctx: CanvasRenderingContext2D;

  getCanvasElement() {
    return this.canvas.current as HTMLCanvasElement;
  }

  componentDidMount() {
    const canvasElement = this.getCanvasElement();
    this.ctx = canvasElement.getContext('2d')!;
    this.resizeCanvas();
    this.updateCanvas();
  }

  componentDidUpdate(prevProps: Props) {
    const { dimensions } = this.props;
    const { dimensions: prevDimensions } = prevProps;
    if (dimensions.width !== prevDimensions.width || dimensions.height !== prevDimensions.height) {
      this.resizeCanvas();
    }
    this.updateCanvas();
  }

  resizeCanvas() {
    resizeCanvas(this.getCanvasElement(), this.props.dimensions);
  }

  updateCanvas() {
    const { dimensions } = this.props;
    clear(this.ctx, 0, 0, dimensions.width, dimensions.height);
    const { colWidth, rowHeight, offsetX, offsetY } = this.props;

    const offsetCol = colWidth - (offsetX % colWidth);
    const offsetRow = rowHeight - (offsetY % rowHeight);

    const nHorizontalLines = Math.ceil((dimensions.height - offsetRow) / rowHeight);
    const nVerticalLines = Math.ceil((dimensions.width - offsetCol) / colWidth);

    range(nVerticalLines).forEach((i: number) => {
      this.drawVerticalLine(i * colWidth + offsetCol);
    });

    range(nHorizontalLines).forEach((i: number) => {
      this.drawHorizontalLine(i * rowHeight + offsetRow);
    });
  }

  drawHorizontalLine(y: number) {
    const { width } = this.props.dimensions;
    const color = theme.colors.mediumGray.toRgbString();
    drawHorizontalLine(this.ctx, y, width, color);
  }

  drawVerticalLine(x: number) {
    const { height } = this.props.dimensions;
    const color = theme.colors.mediumGray.toRgbString();
    drawVerticalLine(this.ctx, x, height, color);
  }

  render() {
    const { dimensions } = this.props;
    const canvasStyle = {
      width: dimensions.width,
      height: dimensions.height,
    };

    return <canvas style={canvasStyle} ref={this.canvas} />;
  }
}

export default Grid;

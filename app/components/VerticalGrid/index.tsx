import * as React from 'react';
import { observer } from 'mobx-react';
import { range } from 'lodash';
import { Dimensions } from 'core/interfaces';

interface Props {
  dimensions: Dimensions;
  gridColor: string;
  gridSegmentWidth: number;
  offsetX: number;
}

@observer
export class VerticalGrid extends React.Component<Props, {}> {
  private canvas: React.RefObject<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  constructor(props: Props) {
    super(props);
    this.canvas = React.createRef();
  }

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
    const { dimensions } = this.props;
    const canvasElement = this.getCanvasElement();
    const scale = window.devicePixelRatio;
    canvasElement.width = dimensions.width * scale;
    canvasElement.height = dimensions.height * scale;
    this.ctx.scale(scale, scale);
  }

  updateCanvas() {
    const { dimensions } = this.props;
    this.ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    const { gridSegmentWidth, offsetX } = this.props;

    const offset = gridSegmentWidth - (offsetX % gridSegmentWidth);

    const nVerticalLines = Math.ceil((dimensions.width - offset) / gridSegmentWidth);
    range(nVerticalLines).forEach((i: number) => {
      this.drawVerticalLine(i * gridSegmentWidth + offset);
    });
  }

  drawVerticalLine(x: number) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.strokeStyle = this.props.gridColor;
    ctx.lineTo(x, this.props.dimensions.height);
    ctx.stroke();
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

export default VerticalGrid;

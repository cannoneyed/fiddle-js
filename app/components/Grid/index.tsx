import * as React from 'react';
import { observer } from 'mobx-react';
import { range } from 'lodash';

interface Props {
  gridColor: string;
  gridSegmentWidth: number;
  height: number;
  offset: number;
  width: number;
}

@observer
export class Grid extends React.Component<Props, {}> {
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
    if (this.props.width !== prevProps.width || this.props.height !== prevProps.height) {
      this.resizeCanvas();
    }
    this.updateCanvas();
  }

  resizeCanvas() {
    const canvasElement = this.getCanvasElement();
    const scale = window.devicePixelRatio;
    canvasElement.width = this.props.width * scale;
    canvasElement.height = this.props.height * scale;
    this.ctx.scale(scale, scale);
  }

  updateCanvas() {
    this.ctx.clearRect(0, 0, this.props.width, this.props.height);
    const { gridSegmentWidth, width, offset } = this.props;

    const nVerticalLines = Math.floor((width - offset) / gridSegmentWidth);
    range(nVerticalLines).forEach((i: number) => {
      this.drawVerticalLine(i * gridSegmentWidth + offset);
    });
  }

  drawVerticalLine(x: number) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.strokeStyle = this.props.gridColor;
    ctx.lineTo(x, this.props.height);
    ctx.stroke();
  }

  render() {
    const canvasStyle = {
      width: this.props.width,
      height: this.props.height,
    };

    return <canvas style={canvasStyle} ref={this.canvas} />;
  }
}

export default Grid;

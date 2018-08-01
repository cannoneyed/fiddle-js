import * as React from 'react';
import { observer } from 'mobx-react';
import { range } from 'lodash';
import theme from 'styles/theme';
import { shallowEqual } from 'utils/shallow-equal';

import { clear, drawHorizontalLine, drawRectangle, resizeCanvas } from 'core/canvas';
import { Dimensions } from 'core/interfaces';

interface Props {
  dimensions: Dimensions;
  keyHeight: number;
  offsetY: number;
  getKeyColor: (index: number) => string;
}

@observer
export class PianoRoll extends React.Component<Props, {}> {
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
    if (!shallowEqual(this.props.dimensions, prevProps.dimensions)) {
      this.resizeCanvas();
    }
    this.updateCanvas();
  }

  resizeCanvas() {
    resizeCanvas(this.getCanvasElement(), this.props.dimensions);
  }

  updateCanvas() {
    const { dimensions, keyHeight, offsetY } = this.props;
    clear(this.ctx, 0, 0, dimensions.width, dimensions.height);

    const startKeyIndex = Math.floor(offsetY / keyHeight);
    const offsetRow = keyHeight - (offsetY % keyHeight);

    const nToDraw = Math.ceil(dimensions.height / keyHeight) + 1;

    range(nToDraw).forEach((i: number) => {
      const y = dimensions.height - (i * keyHeight + offsetRow);
      const keyIndex = startKeyIndex + i;
      this.drawKey(y, keyIndex);
    });
  }

  drawKey(y: number, keyIndex: number) {
    const { dimensions, getKeyColor, keyHeight } = this.props;
    const corner = { x: 0, y };
    const size = { height: keyHeight, width: dimensions.width };
    const borderColor = theme.colors.mediumGray.toRgbString();
    const fillColor = getKeyColor(keyIndex);
    drawRectangle(this.ctx, corner, size, fillColor);
    drawHorizontalLine(this.ctx, y, dimensions.width, borderColor);
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

export default PianoRoll;

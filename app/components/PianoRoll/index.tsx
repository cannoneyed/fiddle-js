import * as React from 'react';
import { observer } from 'mobx-react';
import { range } from 'lodash';
import theme from 'styles/theme';
import { Group, Layer, Line, Rect, Stage } from 'react-konva';
import { makePoints } from 'utils/konva';

import { Dimensions } from 'core/interfaces';
import { KeyLayout } from 'core/models/notes/key-layout';

interface Props {
  dimensions: Dimensions;
  keyHeight: number;
  keyLayout: KeyLayout;
  offsetY: number;
  getKeyColor: (index: number) => string;
}

@observer
export class PianoRoll extends React.Component<Props, {}> {
  handleKeyClick = (keyIndex: number) => {
    console.log(keyIndex);
  };

  renderKey = (y: number, keyIndex: number) => {
    const { dimensions, getKeyColor, keyHeight } = this.props;
    const keyProps = {
      height: keyHeight,
      width: dimensions.width,
      fill: getKeyColor(keyIndex),
    };

    const lineStart = { x: 0, y: 0 };
    const lineEnd = { x: dimensions.width, y: 0 };
    const linePoints = makePoints([lineStart, lineEnd]);

    const lineProps = {
      points: linePoints,
      strokeWidth: 1,
      stroke: theme.colors.darkGray.toRgbString(),
    };

    return (
      <Group key={keyIndex} y={y}>
        <Line {...lineProps} />
        <Rect {...keyProps} />
      </Group>
    );
  };

  render() {
    const { dimensions, keyHeight, keyLayout, offsetY } = this.props;

    const nVisible = Math.floor(dimensions.height / keyHeight) + 2;
    const startKeyIndex = keyLayout.nRows - Math.floor(offsetY / keyHeight);
    const offsetRow = offsetY % keyHeight;

    const keys = range(nVisible).map(i => {
      const y = i * keyHeight - offsetRow;
      const keyIndex = startKeyIndex - i;
      return this.renderKey(y, keyIndex);
    });

    const { height, width } = dimensions;

    return (
      <Stage width={width} height={height}>
        <Layer>{keys}</Layer>
      </Stage>
    );
  }
}

export default PianoRoll;

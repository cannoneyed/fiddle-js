import * as React from 'react';
import { observer } from 'mobx-react';
import { range } from 'lodash';
import theme from 'styles/theme';
import { Group, Layer, Line, Rect } from 'react-konva';
import { makePoints } from 'utils/konva';

import { Coordinates, Dimensions } from 'core/interfaces';
import { KeyLayout } from 'core/models/notes/key-layout';

interface Props {
  dimensions: Dimensions;
  keyHeight: number;
  keyLayout: KeyLayout;
  position: Coordinates;
  getOffsetY: () => number;
}

@observer
export class PianoRoll extends React.Component<Props, {}> {
  static defaultProps = {
    position: { x: 0, y: 0 },
  };

  handleKeyClick = (keyIndex: number) => {
    console.log(keyIndex);
  };

  renderKey = (y: number, keyIndex: number) => {
    const { dimensions, keyHeight, keyLayout } = this.props;
    const keyProps = {
      height: keyHeight,
      width: dimensions.width,
      fill: keyLayout.getKeyColor(keyIndex),
      onClick: () => this.handleKeyClick(keyIndex),
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
    const { dimensions, getOffsetY, keyHeight, keyLayout, position } = this.props;
    const offsetY = getOffsetY();

    const nVisible = Math.floor(dimensions.height / keyHeight) + 2;
    const startKeyIndex = keyLayout.nRows - Math.floor(offsetY / keyHeight);

    const keyIndices = range(nVisible)
      .map(i => startKeyIndex - i)
      .filter(index => index >= 0 && index < keyLayout.nRows);

    const keys = keyIndices.map(keyIndex => {
      const y = (keyLayout.nRows - 1 - keyIndex) * keyHeight;
      return this.renderKey(y, keyIndex);
    });

    return (
      <Layer>
        <Group {...dimensions} {...position}>
          <Group y={-offsetY}>{keys}</Group>
        </Group>
      </Layer>
    );
  }
}

export default PianoRoll;

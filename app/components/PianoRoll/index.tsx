import * as React from 'react';
import { observer } from 'mobx-react';
import { range } from 'lodash';
import theme from 'styles/theme';

import { Dimensions } from 'core/interfaces';

interface Props {
  dimensions: Dimensions;
  keyHeight: number;
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
    const keyStyle = {
      position: 'absolute' as 'absolute',
      boxSizing: 'border-box' as 'border-box',
      top: y,
      height: keyHeight,
      width: dimensions.width,
      backgroundColor: getKeyColor(keyIndex),
      borderTop: `1px solid ${theme.colors.darkGray.toRgbString()}`,
    };

    return <div key={keyIndex} style={keyStyle} onClick={() => this.handleKeyClick(keyIndex)} />;
  };

  render() {
    const { dimensions, keyHeight, offsetY } = this.props;

    const nKeys = Math.floor(dimensions.height / keyHeight) + 2;
    const startKeyIndex = Math.floor(offsetY / keyHeight);
    const offsetRow = keyHeight - (offsetY % keyHeight);

    const keys = range(nKeys).map(i => {
      const y = dimensions.height - (i * keyHeight + offsetRow);
      const keyIndex = startKeyIndex + i;
      return this.renderKey(y, keyIndex);
    });

    const wrapperStyle = {
      position: 'relative' as 'relative',
      overflow: 'hidden' as 'hidden',
      width: dimensions.width,
      height: dimensions.height,
    };

    return <div style={wrapperStyle}>{keys}</div>;
  }
}

export default PianoRoll;

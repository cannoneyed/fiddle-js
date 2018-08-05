import * as React from 'react';
import { observer } from 'mobx-react';
import { range } from 'lodash';
import styled from 'styled-components';
import theme from 'styles/theme';

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
    const keyStyle = {
      top: y,
      height: keyHeight,
      width: dimensions.width,
      backgroundColor: getKeyColor(keyIndex),
      borderTop: `1px solid ${theme.colors.darkGray.toRgbString()}`,
    };

    return <Key key={keyIndex} style={keyStyle} onClick={() => this.handleKeyClick(keyIndex)} />;
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

    const wrapperStyle = {
      width: dimensions.width,
      height: dimensions.height,
    };

    return <KeyWrapper style={wrapperStyle}>{keys}</KeyWrapper>;
  }
}

export default PianoRoll;

const KeyWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const Key = styled.div`
  position: absolute;
  box-sizing: border-box;
`;

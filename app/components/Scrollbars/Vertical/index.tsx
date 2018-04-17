import * as React from 'react';

import {
  ScrollbarArea,
  ScrollBackButton,
  ScrollForwardButton,
  ScrollbarThumb,
  ScrollbarWrapper,
} from './styled-components';

interface Props {
  scrollPositionPercent: number;
  scrollViewPercent: number;
  onThumbDrag?: (delta: number) => void;
  onThumbResize?: (delta: number) => void;
}

export class VerticalScrollbar extends React.Component<Props, {}> {
  render() {
    const { scrollPositionPercent, scrollViewPercent } = this.props;

    // We need to compute the relative top position of the scroll container since the scrollPercentY
    // is a normalized 0 to 1 value.
    const topPercent = scrollPositionPercent * (1 - scrollViewPercent);

    // Use inline style because it's much faster than using styled components
    const thumbStyle = {
      top: `${topPercent * 100}%`,
      height: `${scrollViewPercent * 100}%`,
    };

    console.log(scrollViewPercent);

    return (
      <ScrollbarWrapper>
        <ScrollBackButton />
        <ScrollbarArea>
          <ScrollbarThumb style={thumbStyle} />
        </ScrollbarArea>
        <ScrollForwardButton />
      </ScrollbarWrapper>
    );
  }
}

export default VerticalScrollbar;

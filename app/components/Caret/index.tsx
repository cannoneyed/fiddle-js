import * as React from 'react';
import theme from 'styles/theme';

interface Props {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export default class Caret extends React.Component<Props, {}> {
  static defaultProps = {
    size: 10,
    fillColor: theme.colors.white.toRgbString(),
    strokeColor: theme.colors.white.toRgbString(),
    strokeWidth: 1,
  };

  render() {
    const { size, fillColor, strokeColor, strokeWidth } = this.props;

    const svgStyle = {
      width: size,
      height: size,
    };

    const polygonStyle = {
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth,
    };

    return (
      <svg style={svgStyle} viewBox="0 0 100 100">
        <polygon style={polygonStyle} points="0,0 100,0 50,75" />
      </svg>
    );
  }
}

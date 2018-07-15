import * as React from 'react';
import { observer } from 'mobx-react';
import theme from 'styles/theme';

import { ScreenVector } from 'core/primitives/screen-vector';

interface Props {
  position: ScreenVector;
  onMouseDown: (event: React.MouseEvent) => void;
  selected: boolean;
}

@observer
export class Point extends React.Component<Props, {}> {
  render() {
    const { x, y } = this.props.position;
    const { selected } = this.props;

    const color = selected ? 'red' : theme.colors.white.toRgbString();
    return <circle r="5" cx={x} cy={y} fill={color} onMouseDown={this.props.onMouseDown} />;
  }
}

export default Point;

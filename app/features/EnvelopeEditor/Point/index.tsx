import * as React from 'react';
import { observer } from 'mobx-react';

interface Props {
  x: number;
  y: number;
}

interface State {
  x: number;
  y: number;
}

@observer
export class Point extends React.Component<Props, State> {
  state = {
    x: this.props.x,
    y: this.props.y,
  };

  render() {
    const { x, y } = this.state;
    return (
      <circle
        r="5"
        cx={x}
        cy={y}
        onMouseDown={console.log.bind(null, '🔥 down')}
        onMouseUp={console.log.bind(null, '🔥 up')}
      />
    );
  }
}

export default Point;

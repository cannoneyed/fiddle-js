import * as React from 'react';
import { observer } from 'mobx-react';
import { Line } from 'react-konva';
import { makePoints } from 'utils/konva';
import { hot, injector } from 'utils/injector';

import { Coordinates } from 'core/interfaces';
import { Graph } from 'core/models/graph';

import { get, PortInteractions } from 'features/GraphEditor/core';

export interface Props {
  graph: Graph;
}
export interface InjectedProps {
  isDragging: boolean;
  startPosition: Coordinates;
  endPosition: Coordinates;
}

const inject = injector<Props, InjectedProps>(props => {
  const portInteractions = get(props.graph, PortInteractions);
  return {
    isDragging: portInteractions.isDragging,
    startPosition: portInteractions.startPosition,
    endPosition: portInteractions.endPosition,
  };
});

@observer
export class _DraggingConnection extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { isDragging, startPosition, endPosition } = this.props;
    const points = makePoints([startPosition, endPosition]);

    return isDragging ? (
      <Line points={points} dashEnabled={true} dash={[7, 4]} strokeWidth={2} stroke="white" />
    ) : null;
  }
}

export default inject(hot(module)(_DraggingConnection));

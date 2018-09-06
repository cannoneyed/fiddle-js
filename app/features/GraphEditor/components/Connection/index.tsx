import * as React from 'react';
import { observer } from 'mobx-react';
import { Line } from 'react-konva';
import { makePoints } from 'utils/konva';

import { getInputConnectionPosition, getOutputConnectionPosition } from '../../helpers/layout';

import { Node } from 'core/models/graph';

export interface Props {
  from: Node;
  outputIndex: number;
  to: Node;
  inputIndex: number;
}

@observer
export class Connection extends React.Component<Props, {}> {
  render() {
    const { from, to, outputIndex, inputIndex } = this.props;

    const startPosition = getOutputConnectionPosition(from, outputIndex);
    const endPosition = getInputConnectionPosition(to, inputIndex);
    const points = makePoints([startPosition, endPosition]);
    const key = `${from.id}:${outputIndex}-${to.id}:${inputIndex}`;

    return <Line key={key} points={points} strokeWidth={2} stroke="white" />;
  }
}

export default Connection;

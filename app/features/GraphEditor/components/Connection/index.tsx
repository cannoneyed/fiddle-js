import * as React from 'react';
import { observer } from 'mobx-react';
import { Line } from 'react-konva';
import { makePoints } from 'utils/konva';

import { getInputConnectionPosition, getOutputConnectionPosition } from '../../helpers/layout';

import { Link } from 'core/models/graph';

export interface Props {
  from: Link;
  to: Link;
}

@observer
export class Connection extends React.Component<Props, {}> {
  render() {
    const { from, to } = this.props;

    const startPosition = getOutputConnectionPosition(from);
    const endPosition = getInputConnectionPosition(to);
    const points = makePoints([startPosition, endPosition]);
    const key = `${from.node.id}:${from.index}-${from.node.id}:${from.index}`;

    return <Line key={key} points={points} strokeWidth={2} stroke="white" />;
  }
}

export default Connection;

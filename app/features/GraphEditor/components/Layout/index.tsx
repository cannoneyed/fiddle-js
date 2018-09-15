import * as React from 'react';
import { observer } from 'mobx-react';
import { Group } from 'react-konva';
import { hot, injector } from 'utils/injector';

import { Dimensions } from 'core/interfaces';
import { Graph as GraphModel } from 'core/models/graph';

import { Graph } from 'features/GraphEditor/components/Graph';

import { get, GraphEditorLayout } from 'features/GraphEditor/core';

export interface Props {
  graph: GraphModel;
}
export interface InjectedProps {
  dimensions: Dimensions;
}

const inject = injector<Props, InjectedProps>(props => {
  const layout = get(props.graph, GraphEditorLayout);
  return {
    dimensions: layout.dimensions,
  };
});

@observer
export class Layout extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { dimensions, graph } = this.props;

    return (
      <Group {...dimensions}>
        <Graph dimensions={dimensions} graph={graph} />
      </Group>
    );
  }
}

export default inject(hot(module)(Layout));

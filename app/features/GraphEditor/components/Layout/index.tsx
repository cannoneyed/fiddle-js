import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { hot, injector } from 'utils/injector';

import { Dimensions } from 'core/interfaces';
import { Clip } from 'core/models/clip';

import { get, GraphEditorLayout } from 'features/GraphEditor/core';

export interface Props {
  clip: Clip;
}
export interface InjectedProps {
  dimensions: Dimensions;
}

const inject = injector<Props, InjectedProps>(props => {
  const layout = get(props.clip, GraphEditorLayout);
  return {
    dimensions: layout.dimensions,
  };
});

@observer
export class Layout extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { clip } = this.props;

    const graphEditorWrapperStyle = {
      height: this.props.dimensions.height,
    };

    return (
      <GraphEditorWrapper style={graphEditorWrapperStyle}>{<h1>{clip.id}</h1>}</GraphEditorWrapper>
    );
  }
}

export default inject(hot(module)(Layout));

const GraphEditorWrapper = styled.div`
  position: absolute;
  width: 100%;
`;

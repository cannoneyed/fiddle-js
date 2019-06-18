import * as React from 'react';
import { autorun, IReactionDisposer } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { hot, injector } from 'utils/injector';

import { Clip as ClipModel } from 'core/models/clip';
import { Dimensions } from 'core/interfaces';

import { get, ClipEditorLayout } from 'features/ClipEditorSection/core';

export interface Props {
  clip: ClipModel;
}
export interface InjectedProps {
  dimensions: Dimensions;
  getOffset: () => number;
  handleScroll: (deltaX: number, deltaY: number) => void;
}

const inject = injector<Props, InjectedProps>(props => {
  const clipEditorLayout = get(props.clip, ClipEditorLayout);

  const dimensions = {
    height: clipEditorLayout.dimensions.height,
    width: clipEditorLayout.gutterWidth,
  };

  return {
    dimensions,
    getOffset: () => 0,
    handleScroll: () => console.log('scroll'),
  };
});

@observer
export class TracksGutter extends React.Component<Props & InjectedProps, {}> {
  private disposeScrollObserver: IReactionDisposer;
  private layersGutterContainerRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.disposeScrollObserver = autorun(this.handleScrollChange);
  }

  componentWillUnmount() {
    this.disposeScrollObserver();
  }

  handleMouseWheel = (event: React.WheelEvent) => {
    const { deltaY } = event;
    event.preventDefault();
    this.props.handleScroll(0, deltaY);
  };

  handleScrollChange = () => {
    const y = this.props.getOffset();
    const transform = `translate3d(0px,${-Math.round(y)}px,0px)`;
    const layersGutterContainer = this.layersGutterContainerRef.current as HTMLDivElement;
    layersGutterContainer.style.transform = transform;
  };

  render() {
    const { height, width } = this.props.dimensions;

    const tracksGutterStyle = {
      height,
      width,
    };

    return (
      <LayersGutterContainer
        style={tracksGutterStyle}
        ref={this.layersGutterContainerRef}
        onWheel={this.handleMouseWheel}
      />
    );
  }
}

export default inject(hot(module)(TracksGutter));

const LayersGutterContainer = styled.div`
  position: relative;
  padding: 0;

  box-sizing: border-box;
  background-color: ${theme.colors.darkGray.toRgbString()};
  border-right: 1px solid ${theme.colors.mediumGray.toRgbString()};
  flex-grow: 0;
  z-index: ${theme.tracksZIndex};

  transform: translate3D(0, 0, 0);
  backface-visibility: hidden;
`;

import * as React from 'react';
import { observer } from 'mobx-react';
import { hot, injector } from 'utils/injector';

import { Clip } from 'core/models/clip';

import EditArea from 'features/ClipEditorSection/components/EditArea';
import LayersGutter from 'features/ClipEditorSection/components/LayersGutter';
import TimelineGutter from 'features/ClipEditorSection/components/TimelineGutter';
import Toolbar from 'features/ClipEditorSection/components/Toolbar';

import { get, ClipEditorLayout } from 'features/ClipEditorSection/core';

import {
  BottomWrapper,
  ClipEditorSectionWrapper,
  EditAreaWrapper,
  GutterWrapper,
  ToolbarWrapper,
  TopWrapper,
} from './styled-components';

import { Dimensions } from 'core/interfaces';

interface Props {
  clip: Clip;
}
interface InjectedProps {
  dimensions: Dimensions;
  editAreaDimensions: Dimensions;
  gutterWidth: number;
  timelineHeight: number;
  toolbarHeight: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const layout = get(props.clip, ClipEditorLayout);
  return {
    dimensions: layout.dimensions,
    editAreaDimensions: layout.editAreaDimensions,
    gutterWidth: layout.gutterWidth,
    timelineHeight: layout.timelineHeight,
    toolbarHeight: layout.toolbarHeight,
  };
});

@observer
export class Layout extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { clip, dimensions, editAreaDimensions } = this.props;

    const topWrapperStyle = {
      height: this.props.toolbarHeight,
    };

    const toolbarWrapperStyle = {
      height: this.props.toolbarHeight,
    };

    const bottomWrapperStyle = {
      top: topWrapperStyle.height,
      height: dimensions.height - topWrapperStyle.height,
    };

    const gutterWrapperStyle = {
      height: bottomWrapperStyle.height,
      width: this.props.gutterWidth,
    };

    const clipEditorSectionWrapperStyle = {
      height: this.props.dimensions.height,
    };

    const editAreaWrapperStyle = {
      left: this.props.gutterWidth,
      height: this.props.editAreaDimensions.height,
      width: this.props.editAreaDimensions.width,
    };

    return (
      <ClipEditorSectionWrapper style={clipEditorSectionWrapperStyle}>
        <TopWrapper style={topWrapperStyle}>
          <ToolbarWrapper style={toolbarWrapperStyle}>
            <Toolbar />
          </ToolbarWrapper>
        </TopWrapper>
        <BottomWrapper style={bottomWrapperStyle}>
          <GutterWrapper style={gutterWrapperStyle}>
            <TimelineGutter />
            <LayersGutter clip={clip} />
          </GutterWrapper>
          <EditAreaWrapper style={editAreaWrapperStyle}>
            <EditArea clip={clip} dimensions={editAreaDimensions} />
          </EditAreaWrapper>
        </BottomWrapper>
      </ClipEditorSectionWrapper>
    );
  }
}

export default inject(hot(module)(Layout));

import * as React from 'react';
import { observer } from 'mobx-react';

import EditArea from 'features/ClipEditorSection/components/EditArea';
import Timeline from 'features/ClipEditorSection/components/Timeline';
import TimelineGutter from 'features/ClipEditorSection/components/TimelineGutter';
import Toolbar from 'features/ClipEditorSection/components/Toolbar';

import { injectCore } from 'features/ClipEditorSection/core';

import {
  ClipEditorSectionWrapper,
  EditAreaWrapper,
  TimelineWrapper,
  ToolbarWrapper,
} from './styled-components';

import { Dimensions } from 'core/interfaces';

interface Props {}
interface InjectedProps {
  editAreaDimensions: Dimensions;
  sectionHeight: number;
  timelineHeight: number;
  toolbarHeight: number;
}

const inject = injectCore<Props, InjectedProps>((_, core) => {
  return {
    editAreaDimensions: core.layout.editAreaDimensions,
    sectionHeight: core.layout.dimensions.height,
    timelineHeight: core.layout.timelineHeight,
    toolbarHeight: core.layout.toolbarHeight,
  };
});

@observer
export class Layout extends React.Component<Props & InjectedProps, {}> {
  render() {
    const clipEditorSectionWrapperStyle = {
      height: this.props.sectionHeight,
    };

    const editAreaWrapperStyle = {
      height: this.props.editAreaDimensions.height,
      width: this.props.editAreaDimensions.width,
    };

    const timelineWrapperStyle = {
      height: this.props.timelineHeight,
      width: this.props.editAreaDimensions.width,
    };

    const toolbarWrapperStyle = {
      height: this.props.toolbarHeight,
    };

    return (
      <ClipEditorSectionWrapper style={clipEditorSectionWrapperStyle}>
        <ToolbarWrapper style={toolbarWrapperStyle}>
          <Toolbar />
        </ToolbarWrapper>
        <TimelineWrapper style={timelineWrapperStyle}>
          <TimelineGutter />
          <Timeline />
        </TimelineWrapper>
        <EditAreaWrapper style={editAreaWrapperStyle}>
          <EditArea />
        </EditAreaWrapper>
      </ClipEditorSectionWrapper>
    );
  }
}

export default inject(Layout);

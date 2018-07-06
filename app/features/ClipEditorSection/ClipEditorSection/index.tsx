import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import EditArea from 'features/ClipEditorSection/EditArea';
import Timeline from 'features/ClipEditorSection/Timeline';
import TimelineGutter from 'features/ClipEditorSection/TimelineGutter';
import Toolbar from 'features/ClipEditorSection/Toolbar';

import {
  ClipEditorSectionWrapper,
  EditAreaWrapper,
  TimelineWrapper,
  ToolbarWrapper,
} from './styled-components';

import { ClipEditorSectionLayout } from 'core/state/layouts/clip-editor/section';
import { Dimensions } from 'core/interfaces';

interface Props {}
interface InjectedProps {
  editAreaDimensions: Dimensions;
  sectionHeight: number;
  timelineHeight: number;
  toolbarHeight: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const clipEditorLayout = Container.get(ClipEditorSectionLayout);
  return {
    editAreaDimensions: clipEditorLayout.editAreaDimensions,
    sectionHeight: clipEditorLayout.sectionHeight,
    timelineHeight: clipEditorLayout.timelineHeight,
    toolbarHeight: clipEditorLayout.toolbarHeight,
  };
});

@observer
export class ClipEditorSection extends React.Component<Props & InjectedProps, {}> {
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

export default inject(ClipEditorSection);

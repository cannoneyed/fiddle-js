import * as React from 'react';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Clip } from 'core/models/clip';

import EditArea from 'features/ClipEditorSection/components/EditArea';
import Timeline from 'features/ClipEditorSection/components/Timeline';
import TimelineGutter from 'features/ClipEditorSection/components/TimelineGutter';
import Toolbar from 'features/ClipEditorSection/components/Toolbar';

import { get, ClipEditorLayout } from 'features/ClipEditorSection/core';

import {
  ClipEditorSectionWrapper,
  EditAreaWrapper,
  TimelineWrapper,
  ToolbarWrapper,
} from './styled-components';

import { Dimensions } from 'core/interfaces';

interface Props {
  clip: Clip;
}
interface InjectedProps {
  editAreaDimensions: Dimensions;
  sectionHeight: number;
  timelineHeight: number;
  toolbarHeight: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const layout = get(props.clip, ClipEditorLayout);
  return {
    editAreaDimensions: layout.editAreaDimensions,
    sectionHeight: layout.dimensions.height,
    timelineHeight: layout.timelineHeight,
    toolbarHeight: layout.toolbarHeight,
  };
});

@observer
export class Layout extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { clip } = this.props;
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
          <Toolbar clip={clip} />
        </ToolbarWrapper>
        <TimelineWrapper style={timelineWrapperStyle}>
          <TimelineGutter clip={clip} />
          <Timeline clip={clip} />
        </TimelineWrapper>
        <EditAreaWrapper style={editAreaWrapperStyle}>
          <EditArea clip={clip} />
        </EditAreaWrapper>
      </ClipEditorSectionWrapper>
    );
  }
}

export default inject(Layout);

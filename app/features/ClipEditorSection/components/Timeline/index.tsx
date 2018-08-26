import * as React from 'react';
import { observer } from 'mobx-react';
import { Group } from 'react-konva';
import { hot, injector } from 'utils/injector';

import { Dimensions } from 'core/interfaces';
import { Clip } from 'core/models/clip';
import { Timeline as TimelineModel } from 'core/models/timeline';

import Timeline from 'components/Timeline';

import { get, ClipEditorTimeline } from 'features/ClipEditorSection/core';

interface Props {
  clip: Clip;
  dimensions: Dimensions;
}
interface InjectedProps {
  timeline: TimelineModel;
}

const inject = injector<Props, InjectedProps>(props => {
  const { timeline } = get(props.clip, ClipEditorTimeline);
  return {
    timeline,
  };
});

@observer
export class TimelineContainer extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { dimensions, timeline } = this.props;

    return (
      <Group>
        <Timeline dimensions={dimensions} getOffset={() => 0} timeline={timeline} />
      </Group>
    );
  }
}

export default inject(hot(module)(TimelineContainer));

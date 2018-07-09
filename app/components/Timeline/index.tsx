import * as React from 'react';
import { autorun, IReactionDisposer } from 'mobx';
import { noop, range } from 'lodash';
import { observer } from 'mobx-react';

import { Fraction } from 'core/primitives/fraction';

import {
  TimelineContainer,
  TimelineDivider,
  TimelineLabel,
  TimelineSegment,
  TimelineSegmentsContainer,
} from './styled-components';

export interface Props {
  division: Fraction;
  divisionWidth: number;
  getOffset: () => number;
  nDivisions: number;
  width: number;
}

@observer
export default class Timeline extends React.Component<Props, {}> {
  private disposeScrollObserver: IReactionDisposer;
  private timelineContainer: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.timelineContainer = React.createRef<HTMLDivElement>();
  }

  private getTimelineContainer() {
    return this.timelineContainer.current as HTMLDivElement;
  }

  componentDidMount() {
    this.disposeScrollObserver = autorun(this.observeOffsetChange);
  }

  componentWillUnmount() {
    this.disposeScrollObserver();
  }

  observeOffsetChange = () => {
    const x = this.props.getOffset();
    const transform = `translate3d(${-Math.round(x)}px,0px,0px)`;
    const timelineContainer = this.getTimelineContainer();
    timelineContainer.style.transform = transform;
  };

  renderTimelineSegments() {
    const { division, divisionWidth, nDivisions } = this.props;

    return range(nDivisions).map(n => {
      const { numerator, denominator } = division.multiply(n, 1).reduce();
      noop(numerator, denominator);

      const timelineSegmentStyle = {
        minWidth: divisionWidth,
      };

      const isMajorDivision = denominator === 1 && n % 2 == 0;
      const timelineLabel = isMajorDivision ? numerator + 1 : null;

      return (
        <TimelineSegment key={n} style={timelineSegmentStyle}>
          <TimelineDivider className="timelineDivider" />
          {timelineLabel && <TimelineLabel>{timelineLabel}</TimelineLabel>}
        </TimelineSegment>
      );
    });
  }

  render() {
    const { width } = this.props;

    const timelineContainerStyle = {
      width,
    };

    return (
      <TimelineContainer style={timelineContainerStyle} innerRef={this.timelineContainer}>
        <TimelineSegmentsContainer>{this.renderTimelineSegments()}</TimelineSegmentsContainer>
      </TimelineContainer>
    );
  }
}

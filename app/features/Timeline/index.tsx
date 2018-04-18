import * as React from 'react';
import { noop, range } from 'lodash';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';

import DragToMarker from './DragToMarker';

import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

const styles = require('./styles.less');

interface Props {
  tracksSectionLayout: TracksSectionLayout;
}

@observer
export class Timeline extends React.Component<Props, {}> {
  renderTimelineSegments() {
    const { tracksSectionLayout } = this.props;
    const { division, divisionWidth, nDivisions } = tracksSectionLayout.grid;

    return range(nDivisions).map(n => {
      const { numerator, denominator } = division.multiply(n, 1).reduce();
      noop(numerator, denominator);

      const timelineSegmentStyle = {
        minWidth: divisionWidth,
      };

      const timelineDividerStyle = {
        height: 10,
        width: 1,
        borderLeft: `1px solid white`,
        marginLeft: -1,
      };

      const isMajorDivision = denominator === 1 && n % 2 == 0;

      const timelineLabel = isMajorDivision ? numerator + 1 : null;
      const timelineLabelStyle = {
        marginLeft: 2,
        fontSize: 10,
      };

      return (
        <div key={n} className={styles.timelineSegment} style={timelineSegmentStyle}>
          <div style={timelineDividerStyle} />
          {timelineLabel && <div style={timelineLabelStyle}>{timelineLabel}</div>}
        </div>
      );
    });
  }

  render() {
    return (
      <div className={styles.timelineContainer} id="timeline">
        <DragToMarker />
        <div className={styles.timelineSegmentsContainer}>{this.renderTimelineSegments()}</div>
      </div>
    );
  }
}

export default connect(Timeline, 'tracksSectionLayout');

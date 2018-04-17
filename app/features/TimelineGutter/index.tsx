import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';

import { SequencerLayout } from 'core/stores/sequencer/layout';

const styles = require('./styles.less');

interface Props {
  sequencerLayout: SequencerLayout;
}

@observer
export class TimelineGutter extends React.Component<Props, {}> {
  render() {
    const { sequencerLayout } = this.props;
    const { gutterWidth } = sequencerLayout;

    const style = {
      minWidth: gutterWidth,
    };

    return <div style={style} className={styles.timelineGutterContainer} />;
  }
}

export default connect(TimelineGutter, 'sequencerLayout');

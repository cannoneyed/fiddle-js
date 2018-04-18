import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';

import { SequencerPageLayout } from 'core/layouts/sequencer/page';

const styles = require('./styles.less');

interface Props {
  sequencerPageLayout: SequencerPageLayout;
}

@observer
export class TimelineGutter extends React.Component<Props, {}> {
  render() {
    const { sequencerPageLayout } = this.props;
    const { gutterWidth } = sequencerPageLayout;

    const style = {
      minWidth: gutterWidth,
    };

    return <div style={style} className={styles.timelineGutterContainer} />;
  }
}

export default connect(TimelineGutter, 'sequencerPageLayout');

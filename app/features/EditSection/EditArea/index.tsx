import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';

import { SequencerPageLayout } from 'core/layouts/sequencer/page';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

const styles = require('./styles.less');

interface Props {
  sequencerPageLayout: SequencerPageLayout;
  tracksSectionLayout: TracksSectionLayout;
}

@observer
export class EditArea extends React.Component<Props, {}> {
  render() {
    return <div className={styles.editAreaContainer} id="editArea" />;
  }
}

export default connect(EditArea, 'sequencerPageLayout', 'tracksSectionLayout');

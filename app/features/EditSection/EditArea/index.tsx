import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';

import { SequencerPageLayout } from 'core/layouts/sequencer/page';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

const styles = require('./styles.less');

interface Props {
  tracksSectionLayout: TracksSectionLayout;
}

@observer
export class EditArea extends React.Component<Props, {}> {
  sequencerPageLayout = Container.get(SequencerPageLayout);

  render() {
    return <div className={styles.editAreaContainer} id="editArea" />;
  }
}

export default connect(EditArea, 'tracksSectionLayout');

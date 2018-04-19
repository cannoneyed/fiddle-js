import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import { SequencerPageLayout } from 'core/layouts/sequencer/page';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

const styles = require('./styles.less');

interface Props {}

@observer
export default class EditArea extends React.Component<Props, {}> {
  tracksSectionLayout = Container.get(TracksSectionLayout);
  sequencerPageLayout = Container.get(SequencerPageLayout);

  render() {
    return <div className={styles.editAreaContainer} id="editArea" />;
  }
}

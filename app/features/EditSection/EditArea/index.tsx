import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';

import { SequencerLayout } from 'core/stores/sequencer/layout';
import { SequencerView } from 'core/stores/sequencer/view';

const styles = require('./styles.less');

interface Props {
  sequencerLayout: SequencerLayout;
  sequencerView: SequencerView;
}

@observer
export class EditArea extends React.Component<Props, {}> {
  render() {
    return <div className={styles.editAreaContainer} id="editArea" />;
  }
}

export default connect(EditArea, 'sequencerLayout', 'sequencerView');

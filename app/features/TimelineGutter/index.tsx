import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import { SequencerPageLayout } from 'core/layouts/sequencer/page';

const styles = require('./styles.less');

interface Props {}

@observer
export default class TimelineGutter extends React.Component<Props, {}> {
  sequencerPageLayout = Container.get(SequencerPageLayout);

  render() {
    const { sequencerPageLayout } = this;
    const { gutterWidth } = sequencerPageLayout;

    const style = {
      minWidth: gutterWidth,
    };

    return <div style={style} className={styles.timelineGutterContainer} />;
  }
}
